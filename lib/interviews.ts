import { promises as fs } from "node:fs";
import type { Dirent } from "node:fs";
import path from "node:path";

import GithubSlugger from "github-slugger";

import type { TocEntry } from "@/types/post";

const defaultDirectory = path.join(
  process.cwd(),
  "content",
  "notes-local",
  "interviews",
);

export type InterviewDocumentSummary = {
  slug: string;
  title: string;
  summary: string;
  group: string;
};

export type InterviewDocument = InterviewDocumentSummary & {
  content: string;
  toc: TocEntry[];
};

export type InterviewQueryOptions = {
  directory?: string;
  enabled?: boolean;
};

export function isInterviewReaderEnabled(environment = process.env.NODE_ENV) {
  return environment !== "production";
}

async function listMarkdownFiles(directory: string): Promise<string[]> {
  let entries: Dirent[];

  try {
    entries = await fs.readdir(directory, { withFileTypes: true });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }

  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);

      if (entry.isDirectory()) return listMarkdownFiles(entryPath);
      if (entry.isFile() && /\.mdx?$/.test(entry.name)) return [entryPath];
      return [];
    }),
  );

  return files.flat().sort();
}

function filePathToSlug(filePath: string, rootDirectory: string) {
  return path
    .relative(rootDirectory, filePath)
    .replace(/\\/g, "/")
    .replace(/\.mdx?$/, "")
    .replace(/(^|\/)README$/i, "$1index");
}

function extractTitle(source: string) {
  return source.match(/^#\s+(.+)$/m)?.[1].trim() ?? "未命名资料";
}

function removeTitle(source: string) {
  return source.replace(/^#\s+.+(?:\r?\n)+/, "").trim();
}

function extractSummary(source: string) {
  const paragraph = removeTitle(source)
    .split(/\r?\n\r?\n/)
    .map((part) => part.trim())
    .find((part) => part && !part.startsWith("#") && !part.startsWith("|"));

  return paragraph?.replace(/[*_`]/g, "").slice(0, 160) ?? "本地面试资料";
}

function extractToc(source: string): TocEntry[] {
  const headingExpression = /^(##|###)\s+(.+)$/gm;
  const slugger = new GithubSlugger();

  return Array.from(source.matchAll(headingExpression), (match) => {
    const text = match[2]
      .replace(/`/g, "")
      .replace(/\[(.*?)\]\(.*?\)/g, "$1")
      .trim();

    return {
      id: slugger.slug(text),
      text,
      level: match[1] === "##" ? 2 : 3,
    };
  });
}

function resolveGroup(slug: string) {
  return slug.startsWith("candidates/") ? "候选人" : "资料";
}

async function readDocuments(
  directory: string,
): Promise<InterviewDocument[]> {
  const files = await listMarkdownFiles(directory);
  const documents = await Promise.all(
    files.map(async (filePath) => {
      const source = await fs.readFile(filePath, "utf8");
      const slug = filePathToSlug(filePath, directory);
      const content = removeTitle(source);

      return {
        slug,
        title: extractTitle(source),
        summary: extractSummary(source),
        group: resolveGroup(slug),
        content,
        toc: extractToc(content),
      };
    }),
  );

  return documents.sort((left, right) => {
    if (left.slug === "index") return -1;
    if (right.slug === "index") return 1;
    return left.slug.localeCompare(right.slug, "zh-CN");
  });
}

export async function getAllInterviewDocuments(
  options: InterviewQueryOptions = {},
): Promise<InterviewDocumentSummary[]> {
  const enabled = options.enabled ?? isInterviewReaderEnabled();
  if (!enabled) return [];

  const documents = await readDocuments(options.directory ?? defaultDirectory);
  return documents.map(({ slug, title, summary, group }) => ({
    slug,
    title,
    summary,
    group,
  }));
}

export async function getInterviewDocument(
  slugSegments: string[],
  options: InterviewQueryOptions = {},
): Promise<InterviewDocument | null> {
  const enabled = options.enabled ?? isInterviewReaderEnabled();
  if (!enabled || slugSegments.some((segment) => !segment || segment === "." || segment === "..")) {
    return null;
  }

  const slug = slugSegments.join("/");
  const documents = await readDocuments(options.directory ?? defaultDirectory);
  return documents.find((document) => document.slug === slug) ?? null;
}
