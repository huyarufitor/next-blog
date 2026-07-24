import { promises as fs } from "node:fs";
import path from "node:path";

import GithubSlugger from "github-slugger";
import matter from "gray-matter";
import readingTime from "reading-time";
import { z } from "zod";

import {
  categoryNames,
  getAllCategories,
  getCategoryByName,
} from "@/lib/categories";
import { getAllNotes, getNoteBySlug } from "@/lib/notes";
import type {
  ArchiveGroup,
  CategorySummary,
  Post,
  PostSummary,
  SearchDocument,
  TagSummary,
  TocEntry,
} from "@/types/post";

const postsDirectory = path.join(process.cwd(), "content", "posts");

function parseCalendarDate(date: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);

  if (!match) {
    throw new Error(`Invalid calendar date: ${date}`);
  }

  return {
    year: match[1],
    month: Number(match[2]),
    day: Number(match[3]),
  };
}

export function formatPostDate(date: string) {
  const { year, month, day } = parseCalendarDate(date);
  return `${year}年${month}月${day}日`;
}

export function getPostYear(date: string) {
  return parseCalendarDate(date).year;
}

export function formatReadingTime(minutes: number) {
  const roundedMinutes =
    Number.isFinite(minutes) && minutes > 0 ? Math.ceil(minutes) : 1;

  return `约 ${roundedMinutes} 分钟阅读`;
}

const frontmatterSchema = z.object({
  title: z.string().min(1),
  date: z.string().min(1),
  summary: z.string().min(1),
  category: z.enum(categoryNames),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().optional().default(false),
  cover: z.string().optional(),
});

function normalizeTag(tag: string) {
  return new GithubSlugger().slug(tag);
}

function stripMdx(source: string) {
  return source
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]+`/g, " ")
    .replace(/!\[[^\]]*]\([^)]+\)/g, " ")
    .replace(/\[[^\]]+]\([^)]+\)/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractToc(source: string): TocEntry[] {
  const headingExpression = /^(##|###)\s+(.+)$/gm;
  const toc: TocEntry[] = [];
  const slugger = new GithubSlugger();
  let match: RegExpExecArray | null;

  while ((match = headingExpression.exec(source)) !== null) {
    const level = match[1] === "##" ? 2 : 3;
    const text = match[2]
      .replace(/`/g, "")
      .replace(/\[(.*?)\]\(.*?\)/g, "$1")
      .trim();

    toc.push({
      id: slugger.slug(text),
      text,
      level,
    });
  }

  return toc;
}

function sortPosts(posts: PostSummary[]) {
  return [...posts].sort(
    (left, right) =>
      new Date(right.date).getTime() - new Date(left.date).getTime(),
  );
}

function toSummary(slug: string, source: string): Post {
  const { data, content } = matter(source);
  const frontmatter = frontmatterSchema.parse(data);
  const category = getCategoryByName(frontmatter.category);
  const tags = frontmatter.tags.map((tag) => ({
    name: tag,
    slug: normalizeTag(tag),
  }));

  return {
    slug,
    title: frontmatter.title,
    date: frontmatter.date,
    formattedDate: formatPostDate(frontmatter.date),
    summary: frontmatter.summary,
    category,
    tags,
    draft: frontmatter.draft,
    cover: frontmatter.cover,
    readingTime: formatReadingTime(readingTime(content).minutes),
    toc: extractToc(content),
    content,
  };
}

async function getPostFilenames() {
  const entries = await fs.readdir(postsDirectory, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => entry.name);
}

export async function getAllPosts(options?: { includeDrafts?: boolean }) {
  const filenames = await getPostFilenames();
  const posts = await Promise.all(
    filenames.map(async (filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const source = await fs.readFile(path.join(postsDirectory, filename), "utf8");
      return toSummary(slug, source);
    }),
  );

  return sortPosts(
    posts
      .filter((post) => (options?.includeDrafts ? true : !post.draft))
      .map((post) => ({
        slug: post.slug,
        title: post.title,
        date: post.date,
        formattedDate: post.formattedDate,
        summary: post.summary,
        category: post.category,
        tags: post.tags,
        draft: post.draft,
        cover: post.cover,
        readingTime: post.readingTime,
      })),
  );
}

export async function getPostBySlug(slug: string) {
  try {
    const source = await fs.readFile(
      path.join(postsDirectory, `${slug}.mdx`),
      "utf8",
    );
    const post = toSummary(slug, source);
    return post.draft ? null : post;
  } catch {
    return null;
  }
}

export async function getTagSummaries(): Promise<TagSummary[]> {
  const posts = await getAllPosts();
  const tags = new Map<string, TagSummary>();

  for (const post of posts) {
    for (const tag of post.tags) {
      const existing = tags.get(tag.slug);

      if (existing) {
        existing.count += 1;
      } else {
        tags.set(tag.slug, {
          ...tag,
          count: 1,
        });
      }
    }
  }

  return [...tags.values()].sort((left, right) =>
    left.name.localeCompare(right.name),
  );
}

export async function getCategorySummaries(): Promise<CategorySummary[]> {
  const posts = await getAllPosts();
  const categories = new Map<string, CategorySummary>(
    getAllCategories().map((category) => [
      category.slug,
      {
        ...category,
        count: 0,
      },
    ]),
  );

  for (const post of posts) {
    const existing = categories.get(post.category.slug);

    if (existing) {
      existing.count += 1;
    }
  }

  return getAllCategories().map((category) => categories.get(category.slug)!);
}

export async function getPostsByTag(tagSlug: string) {
  const posts = await getAllPosts();
  return posts.filter((post) => post.tags.some((tag) => tag.slug === tagSlug));
}

export async function getPostsByCategory(categorySlug: string) {
  const posts = await getAllPosts();
  return posts.filter((post) => post.category.slug === categorySlug);
}

export async function getArchiveGroups(): Promise<ArchiveGroup[]> {
  const posts = await getAllPosts();
  const groups = new Map<string, PostSummary[]>();

  for (const post of posts) {
    const year = getPostYear(post.date);
    const existing = groups.get(year) ?? [];
    existing.push(post);
    groups.set(year, existing);
  }

  return [...groups.entries()]
    .sort(([leftYear], [rightYear]) => Number(rightYear) - Number(leftYear))
    .map(([year, yearPosts]) => ({
      year,
      posts: yearPosts,
    }));
}

export async function getPreviousNextPosts(slug: string) {
  const posts = await getAllPosts();
  const index = posts.findIndex((post) => post.slug === slug);

  return {
    previous: index >= 0 ? posts[index + 1] : undefined,
    next: index > 0 ? posts[index - 1] : undefined,
  };
}

export async function getRelatedPosts(post: Post, count = 3) {
  const posts = await getAllPosts();
  const currentTags = new Set(post.tags.map((tag) => tag.slug));

  return posts
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => ({
      candidate,
      score:
        candidate.tags.reduce(
          (total, tag) => total + (currentTags.has(tag.slug) ? 1 : 0),
          0,
        ) + (candidate.category.slug === post.category.slug ? 2 : 0),
    }))
    .filter((item) => item.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, count)
    .map((item) => item.candidate);
}

export async function getSearchDocuments(): Promise<SearchDocument[]> {
  const filenames = await getPostFilenames();
  const posts = await Promise.all(
    filenames.map(async (filename): Promise<SearchDocument | null> => {
      const slug = filename.replace(/\.mdx$/, "");
      const source = await fs.readFile(path.join(postsDirectory, filename), "utf8");
      const post = toSummary(slug, source);

      return post.draft
        ? null
        : {
            id: slug,
            kind: "post" as const,
            url: `/posts/${slug}`,
            slug,
            title: post.title,
            summary: post.summary,
            date: post.date,
            formattedDate: post.formattedDate,
            category: post.category.name,
            categorySlug: post.category.slug,
            tags: post.tags.map((tag) => tag.name),
            text: `${post.category.name} ${stripMdx(post.content)}`,
          };
    }),
  );

  const publicNotes = await getAllNotes({ includeLocal: false });
  const notes = await Promise.all(
    publicNotes.map(async (summary): Promise<SearchDocument | null> => {
      const note = await getNoteBySlug(summary.slug.split("/"), {
        includeLocal: false,
      });

      if (!note) return null;

      return {
        id: `note:${note.slug}`,
        kind: "note" as const,
        url: `/notes/${note.slug}`,
        slug: note.slug,
        title: note.title,
        summary: note.summary,
        date: note.updated,
        formattedDate: formatPostDate(note.updated),
        category: note.section,
        tags: note.tags,
        text: `${note.section} ${stripMdx(note.content)}`,
      };
    }),
  );

  return [...posts, ...notes].filter(
    (document): document is SearchDocument => document !== null,
  );
}
