import { promises as fs } from "node:fs";
import type { Dirent } from "node:fs";
import path from "node:path";

import GithubSlugger from "github-slugger";
import matter from "gray-matter";
import { z } from "zod";

import { readPublicContentSource } from "@/lib/content-source";
import type { Note, NoteSummary, NoteVisibility } from "@/types/note";
import type { TocEntry } from "@/types/post";

const defaultPublicDirectory = path.join(process.cwd(), "content", "notes");
const defaultLocalDirectory = path.join(process.cwd(), "content", "notes-local");

const noteFrontmatterSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  section: z.string().min(1),
  tags: z.array(z.string()).default([]),
  updated: z.iso.date(),
});

export type NoteQueryOptions = {
  publicDirectory?: string;
  localDirectory?: string;
  includeLocal?: boolean;
};

function extractToc(source: string): TocEntry[] {
  const headingExpression = /^(##|###)\s+(.+)$/gm;
  const slugger = new GithubSlugger();

  return Array.from(source.matchAll(headingExpression), (match) => ({
    id: slugger.slug(
      match[2]
        .replace(/`/g, "")
        .replace(/\[(.*?)\]\(.*?\)/g, "$1")
        .trim(),
    ),
    text: match[2]
      .replace(/`/g, "")
      .replace(/\[(.*?)\]\(.*?\)/g, "$1")
      .trim(),
    level: match[1] === "##" ? 2 : 3,
  }));
}

async function listMarkdownFiles(
  directory: string,
  excludedDirectories = new Set<string>(),
): Promise<string[]> {
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

      if (entry.isDirectory()) {
        if (excludedDirectories.has(entry.name)) return [];
        return listMarkdownFiles(entryPath, excludedDirectories);
      }
      if (entry.isFile() && /\.mdx?$/.test(entry.name)) return [entryPath];
      return [];
    }),
  );

  return files.flat();
}

function filePathToSlug(filePath: string, rootDirectory: string) {
  return path
    .relative(rootDirectory, filePath)
    .replace(/\\/g, "/")
    .replace(/\.mdx?$/, "")
    .replace(/(^|\/)README$/i, "$1index");
}

async function readNotesFromDirectory(
  directory: string,
  visibility: NoteVisibility,
  excludedDirectories?: Set<string>,
): Promise<Note[]> {
  const files = await listMarkdownFiles(directory, excludedDirectories);

  return Promise.all(
    files.map(async (filePath) => {
      const source =
        visibility === "public" && directory === defaultPublicDirectory
          ? await readPublicContentSource(
              `notes/${path.relative(directory, filePath).replace(/\\/g, "/")}`,
            )
          : await fs.readFile(filePath, "utf8");
      const { data, content } = matter(source);
      const frontmatter = noteFrontmatterSchema.parse(data);

      return {
        slug: filePathToSlug(filePath, directory),
        ...frontmatter,
        visibility,
        content,
        toc: extractToc(content),
      };
    }),
  );
}

export async function getAllNotes(options: NoteQueryOptions = {}): Promise<NoteSummary[]> {
  const publicDirectory = options.publicDirectory ?? defaultPublicDirectory;
  const localDirectory = options.localDirectory ?? defaultLocalDirectory;
  const includeLocal = options.includeLocal ?? process.env.NODE_ENV !== "production";
  const notes = await readNotesFromDirectory(publicDirectory, "public");

  if (includeLocal) {
    notes.push(
      ...(await readNotesFromDirectory(
        localDirectory,
        "local",
        new Set(["interviews"]),
      )),
    );
  }

  return notes
    .sort((left, right) => right.updated.localeCompare(left.updated))
    .map((note) => ({
      slug: note.slug,
      title: note.title,
      summary: note.summary,
      section: note.section,
      tags: note.tags,
      updated: note.updated,
      visibility: note.visibility,
    }));
}

export async function getNoteBySlug(
  slugSegments: string[],
  options: NoteQueryOptions = {},
): Promise<Note | null> {
  const slug = slugSegments.join("/");
  const publicDirectory = options.publicDirectory ?? defaultPublicDirectory;
  const localDirectory = options.localDirectory ?? defaultLocalDirectory;
  const includeLocal = options.includeLocal ?? process.env.NODE_ENV !== "production";
  const notes = await readNotesFromDirectory(publicDirectory, "public");

  if (includeLocal) {
    notes.push(
      ...(await readNotesFromDirectory(
        localDirectory,
        "local",
        new Set(["interviews"]),
      )),
    );
  }

  return notes.find((note) => note.slug === slug) ?? null;
}
