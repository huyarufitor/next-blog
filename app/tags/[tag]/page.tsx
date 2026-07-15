import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { createPageMetadata } from "@/lib/metadata";
import { getPostsByTag, getTagSummaries } from "@/lib/posts";

type TagPageProps = {
  params: Promise<{
    tag: string;
  }>;
};

export function decodeTagParam(tag: string) {
  try {
    return decodeURIComponent(tag);
  } catch {
    return tag;
  }
}

export async function generateStaticParams() {
  const tags = await getTagSummaries();
  return tags.map((tag) => ({
    tag: tag.slug,
  }));
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag: tagParam } = await params;
  const tag = decodeTagParam(tagParam);
  const posts = await getPostsByTag(tag);

  if (posts.length === 0) {
    return {
      title: "未找到标签",
    };
  }

  const tagName =
    posts[0].tags.find((item) => item.slug === tag)?.name ?? tag;
  const path = `/tags/${encodeURIComponent(tag)}`;

  return createPageMetadata({
    title: `标签：${posts[0].tags.find((item) => item.slug === tag)?.name ?? tag}`,
    description: `浏览归类到“${tagName}”的文章。`,
    path,
  });
}

export default async function TagDetailPage({ params }: TagPageProps) {
  const { tag: tagParam } = await params;
  const tag = decodeTagParam(tagParam);
  const posts = await getPostsByTag(tag);

  if (posts.length === 0) {
    notFound();
  }

  const title = posts[0].tags.find((item) => item.slug === tag)?.name ?? tag;

  return (
    <div className="mx-auto max-w-4xl space-y-10">
      <header className="space-y-4">
        <p className="eyebrow">标签</p>
        <h1 className="text-5xl font-semibold text-strong">
          {title}
        </h1>
        <p className="text-lg leading-8 text-muted">
          该标签下共有 {posts.length} 篇文章。
        </p>
      </header>

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
          </article>
        ))}
      </div>
    </div>
  );
}
