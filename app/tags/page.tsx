import type { Metadata } from "next";
import Link from "next/link";

import { getTagSummaries } from "@/lib/posts";

export const metadata: Metadata = {
  title: "标签",
  description: "浏览博客的全部文章标签。",
};

export default async function TagsPage() {
  const tags = await getTagSummaries();

  return (
    <div className="mx-auto max-w-4xl space-y-10">
      <header className="space-y-4">
        <p className="eyebrow">标签</p>
        <h1 className="text-5xl font-semibold text-strong">
          按主题找到感兴趣的内容。
        </h1>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {tags.map((tag) => (
          <Link
            key={tag.slug}
            className="surface-panel rounded-lg p-6 transition-transform hover:-translate-y-0.5"
            href={`/tags/${tag.slug}`}
          >
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold text-strong">
                {tag.name}
              </h2>
              <span className="text-sm text-muted">{tag.count} 篇文章</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
