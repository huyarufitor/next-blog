import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getCategoryBySlug, getAllCategories } from "@/lib/categories";
import { createPageMetadata } from "@/lib/metadata";
import { getPostsByCategory } from "@/lib/posts";

type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

export async function generateStaticParams() {
  return getAllCategories().map((category) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    return {
      title: "未找到分类",
    };
  }

  return createPageMetadata({
    title: `分类：${category.name}`,
    description: `浏览“${category.name}”分类下的文章。${category.description}`,
    path: `/categories/${category.slug}`,
  });
}

export default async function CategoryDetailPage({
  params,
}: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  const posts = await getPostsByCategory(category.slug);

  return (
    <div className="mx-auto max-w-4xl space-y-10">
      <header className="space-y-4">
        <p className="eyebrow">分类</p>
        <h1 className="text-5xl font-semibold text-strong">
          {category.name}
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-muted">
          {category.description}
        </p>
        <p className="text-sm text-muted">
          当前共有 {posts.length} 篇文章归入这个分类。
        </p>
      </header>

      {posts.length > 0 ? (
        <div className="space-y-4">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="surface-panel rounded-lg p-6"
            >
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
                <span>{post.formattedDate}</span>
                <span aria-hidden="true">/</span>
                <span>{post.readingTime}</span>
              </div>
              <h2 className="mt-2 text-2xl font-semibold text-strong">
                <Link href={`/posts/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="mt-3 text-base leading-7 text-muted">
                {post.summary}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag.slug}
                    className="tag-chip"
                    href={`/tags/${tag.slug}`}
                  >
                    {tag.name}
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-border p-6 text-base leading-7 text-muted">
          这个分类的内容还在整理中。先留一个明确入口，等后续文章慢慢长出来。
        </div>
      )}
    </div>
  );
}
