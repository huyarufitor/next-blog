import type { Metadata } from "next";

import { SearchPanel } from "@/components/search/search-panel";
import { getSearchDocuments } from "@/lib/posts";

export const metadata: Metadata = {
  title: "搜索",
  description: "按标题、摘要、标签或正文搜索文章。",
};

export default async function SearchPage() {
  const documents = await getSearchDocuments();

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <header className="space-y-4">
        <p className="eyebrow">搜索</p>
        <h1 className="text-5xl font-semibold text-strong">
          搜索全部文章。
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-muted">
          搜索索引会在构建时从 MDX 内容生成，查询完全在浏览器本地完成。
        </p>
      </header>

      <SearchPanel documents={documents} />
    </div>
  );
}
