import type { TocEntry } from "@/types/post";

export type NoteVisibility = "public" | "local";

export type NoteSummary = {
  slug: string;
  title: string;
  summary: string;
  section: string;
  tags: string[];
  updated: string;
  visibility: NoteVisibility;
};

export type Note = NoteSummary & {
  content: string;
  toc: TocEntry[];
};
