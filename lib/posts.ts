import { promises as fs } from "node:fs";
import path from "node:path";

import GithubSlugger from "github-slugger";
import matter from "gray-matter";
import readingTime from "reading-time";
import { z } from "zod";

import type {
  ArchiveGroup,
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

export async function getPostsByTag(tagSlug: string) {
  const posts = await getAllPosts();
  return posts.filter((post) => post.tags.some((tag) => tag.slug === tagSlug));
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
      score: candidate.tags.reduce(
        (total, tag) => total + (currentTags.has(tag.slug) ? 1 : 0),
        0,
      ),
    }))
    .filter((item) => item.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, count)
    .map((item) => item.candidate);
}

export async function getSearchDocuments(): Promise<SearchDocument[]> {
  const filenames = await getPostFilenames();
  const posts = await Promise.all(
    filenames.map(async (filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const source = await fs.readFile(path.join(postsDirectory, filename), "utf8");
      const post = toSummary(slug, source);

      return post.draft
        ? null
        : {
            id: slug,
            slug,
            title: post.title,
            summary: post.summary,
            date: post.date,
            formattedDate: post.formattedDate,
            tags: post.tags.map((tag) => tag.name),
            text: stripMdx(post.content),
          };
    }),
  );

  return posts.filter((post): post is SearchDocument => post !== null);
}
