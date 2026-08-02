export type Tag = {
  name: string;
  slug: string;
};

export type Category = {
  name: string;
  slug: string;
  description: string;
};

export type TocEntry = {
  id: string;
  text: string;
  level: 2 | 3;
};

export type PostSummary = {
  slug: string;
  title: string;
  date: string;
  formattedDate: string;
  summary: string;
  category: Category;
  tags: Tag[];
  draft: boolean;
  cover: string;
  readingTime: string;
};

export type Post = PostSummary & {
  toc: TocEntry[];
  content: string;
};

export type TagSummary = Tag & {
  count: number;
};

export type CategorySummary = Category & {
  count: number;
};

export type ArchiveGroup = {
  year: string;
  posts: PostSummary[];
};

export type SearchDocument = {
  id: string;
  kind: "post" | "note";
  url: string;
  slug: string;
  title: string;
  summary: string;
  date: string;
  formattedDate: string;
  category: string;
  categorySlug?: string;
  tags: string[];
  text: string;
};
