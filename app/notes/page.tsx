import { NoteTree } from "@/components/note/note-tree";
import { createPageMetadata } from "@/lib/metadata";
import { getAllNotes } from "@/lib/notes";

export const metadata = createPageMetadata({
  title: "知识库",
  description: "按专题浏览公开学习笔记与本地知识沉淀。",
  path: "/notes",
});

export default async function NotesPage() {
  const notes = await getAllNotes();

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <header className="space-y-4">
        <p className="eyebrow">知识库</p>
        <h1 className="text-5xl font-semibold text-strong">持续整理的学习记录。</h1>
        <p className="max-w-2xl text-lg leading-8 text-muted">
          这里保留过程型笔记和专题资料；经过完整整理的长文仍然发布在博客文章中。
        </p>
      </header>

      <NoteTree notes={notes} />
    </div>
  );
}
