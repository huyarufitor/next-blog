import type { Metadata } from "next";
import Link from "next/link";

import { getArchiveGroups } from "@/lib/posts";

export const metadata: Metadata = {
  title: "归档",
  description: "按年份浏览全部已发布文章。",
};

export default async function ArchivesPage() {
  const archives = await getArchiveGroups();

  return (
    <div className="mx-auto max-w-4xl space-y-10">
      <header className="space-y-4">
        <p className="eyebrow">归档</p>
        <h1 className="text-5xl font-semibold text-strong">
          按年份回看每一篇文章。
        </h1>
      </header>

      <div className="space-y-8">
        {archives.map((group) => (
          <section key={group.year} className="surface-panel rounded-lg p-8">
            <h2 className="text-3xl font-semibold text-strong">
              {group.year}
            </h2>
            <div className="mt-6 space-y-4">
              {group.posts.map((post) => (
                <article
                  key={post.slug}
                  className="rounded-lg border border-border bg-panel-solid p-5"
                >
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
                    <span>{post.formattedDate}</span>
                    <span aria-hidden="true">/</span>
                    <span>{post.readingTime}</span>
                  </div>
                  <h3 className="mt-2 text-2xl font-semibold text-strong">
                    <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="mt-3 text-base leading-7 text-muted">
                    {post.summary}
                  </p>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
