import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PostToc } from "@/components/post/post-toc";
import { renderMdx } from "@/lib/mdx";
import { getAllNotes, getNoteBySlug } from "@/lib/notes";
import { siteConfig } from "@/lib/site-config";

type NotePageProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateStaticParams() {
  const notes = await getAllNotes();
  return notes.map((note) => ({ slug: note.slug.split("/") }));
}

export async function generateMetadata({ params }: NotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = await getNoteBySlug(slug);

  if (!note) return { title: "未找到笔记" };

  const path = `/notes/${note.slug}`;
  return {
    title: note.title,
    description: note.summary,
    alternates: { canonical: path },
    openGraph: {
      title: note.title,
      description: note.summary,
      type: "article",
      url: `${siteConfig.url}${path}`,
      modifiedTime: note.updated,
    },
  };
}

export default async function NoteDetailPage({ params }: NotePageProps) {
  const { slug } = await params;
  const note = await getNoteBySlug(slug);

  if (!note) notFound();

  const content = await renderMdx(note.content);

  return (
    <article className="space-y-10">
      <header className="mx-auto max-w-5xl space-y-5">
        <Link className="text-sm font-medium text-accent-strong" href="/notes">
          返回知识库
        </Link>
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
          <span className="tag-chip">{note.section}</span>
          <span>更新于 {note.updated}</span>
          {note.visibility === "local" ? <span className="tag-chip">仅本地</span> : null}
        </div>
        <h1 className="text-5xl font-semibold text-strong sm:text-6xl">{note.title}</h1>
        <p className="max-w-2xl text-lg leading-8 text-muted">{note.summary}</p>
        <div className="flex flex-wrap gap-2">
          {note.tags.map((tag) => (
            <span key={tag} className="tag-chip">#{tag}</span>
          ))}
        </div>
      </header>

      <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="surface-panel rounded-lg px-6 py-8 sm:px-10">
          <div className="post-content">{content}</div>
        </div>
        <aside className="xl:sticky xl:top-24 xl:self-start">
          <PostToc toc={note.toc} />
        </aside>
      </div>
    </article>
  );
}
