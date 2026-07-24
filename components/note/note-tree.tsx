import Link from "next/link";

import type { NoteSummary } from "@/types/note";

type NoteTreeProps = {
  notes: NoteSummary[];
};

export function NoteTree({ notes }: NoteTreeProps) {
  const sections = Map.groupBy(notes, (note) => note.section);

  if (notes.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border p-6 text-sm text-muted">
        知识库中还没有内容。
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {[...sections.entries()].map(([section, sectionNotes]) => (
        <section key={section} className="surface-panel rounded-lg p-6">
          <p className="eyebrow">专题</p>
          <h2 className="mt-2 text-2xl font-semibold text-strong">{section}</h2>
          <div className="mt-5 divide-y divide-border">
            {sectionNotes.map((note) => (
              <article key={`${note.visibility}:${note.slug}`} className="py-4 first:pt-0 last:pb-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-semibold text-strong">
                    <Link href={`/notes/${note.slug}`}>{note.title}</Link>
                  </h3>
                  {note.visibility === "local" ? (
                    <span className="tag-chip">仅本地</span>
                  ) : null}
                </div>
                <p className="mt-2 text-sm leading-6 text-muted">{note.summary}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted">
                  <span>更新于 {note.updated}</span>
                  {note.tags.map((tag) => (
                    <span key={tag}>#{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
