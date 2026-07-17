import Link from "next/link";

import { createPageMetadata } from "@/lib/metadata";
import { getCategorySummaries } from "@/lib/posts";

export const metadata = createPageMetadata({
  title: "分类",
  description: "按主分类浏览博客中的技术实践、工作手记、音乐学习、生活切片与人生思考。",
  path: "/categories",
});

export default async function CategoriesPage() {
  const categories = await getCategorySummaries();

  return (
    <div className="mx-auto max-w-4xl space-y-10">
      <header className="space-y-4">
        <p className="eyebrow">分类</p>
        <h1 className="text-5xl font-semibold text-strong">
          先按主线，再慢慢走进细节。
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-muted">
          这里把博客内容分成 5 条长期主线：技术实践、工作手记、音乐学习、生活切片和人生思考。
          分类负责给内容定大方向，标签则继续保留更细的主题索引。
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {categories.map((category) => (
          <Link
            key={category.slug}
            className="surface-panel rounded-lg p-6 transition-transform hover:-translate-y-0.5"
            href={`/categories/${category.slug}`}
          >
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold text-strong">
                {category.name}
              </h2>
              <span className="text-sm text-muted">{category.count} 篇文章</span>
            </div>
            <p className="mt-4 text-base leading-7 text-muted">
              {category.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
