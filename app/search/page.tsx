import { SearchPanel } from "@/components/search/search-panel";
import { createPageMetadata } from "@/lib/metadata";
import { getSearchDocuments } from "@/lib/posts";

export const metadata = createPageMetadata({
  title: "搜索",
  description: "按标题、摘要、分类、标签或正文搜索文章和公开笔记。",
  path: "/search",
});

export default async function SearchPage() {
  const documents = await getSearchDocuments();

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <header className="space-y-4">
        <p className="eyebrow">搜索</p>
        <h1 className="text-5xl font-semibold text-strong">
          搜索文章与知识库。
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-muted">
          搜索索引会在构建时从文章与公开笔记生成，支持按专题、分类、标签与正文全文检索，查询完全在浏览器本地完成。
        </p>
      </header>

      <SearchPanel documents={documents} />
    </div>
  );
}
