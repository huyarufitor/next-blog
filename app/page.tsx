import Link from "next/link";

import { PostCard } from "@/components/post/post-card";
import { createPageMetadata } from "@/lib/metadata";
import { getAllPosts, getTagSummaries } from "@/lib/posts";
import { siteConfig } from "@/lib/site-config";

export const metadata = createPageMetadata({
  title: siteConfig.name,
  description: siteConfig.description,
  path: "/",
  absoluteTitle: true,
});

export default async function Home() {
  const posts = await getAllPosts();
  const tags = await getTagSummaries();
  const featuredPosts = posts.slice(0, 3);
  const recentPosts = posts.slice(3);

  return (
    <div className="space-y-16">
      <section className="grid gap-10 lg:grid-cols-[1.4fr_0.9fr] lg:items-end">
        <div className="space-y-6">
          <p className="text-sm font-medium uppercase text-teal">
            {siteConfig.name}
          </p>
          <h1 className="max-w-3xl text-5xl font-semibold text-strong sm:text-6xl">
            {siteConfig.description}
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-muted">
            记录经得起时间检验的工程实践：从架构取舍到实现细节，把复杂问题讲清楚。
          </p>
          <div className="flex flex-wrap gap-3">
            <Link className="button-primary" href="/search">
              搜索文章
            </Link>
            <Link className="button-secondary" href="/archives">
              浏览归档
            </Link>
          </div>
        </div>

        <aside className="surface-panel rounded-lg p-6">
          <p className="text-sm font-medium uppercase text-teal">
            内容方向
          </p>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-muted">
            <li>面向内容型产品的静态优先架构</li>
            <li>前端基础设施、DX 与可维护的 UI 系统</li>
            <li>重视实现细节与真实取舍的工程记录</li>
          </ul>
        </aside>
      </section>

      <section className="space-y-6">
        <div className="section-heading">
          <div>
            <p className="eyebrow">精选</p>
            <h2 className="section-title">近期文章</h2>
          </div>
          <Link className="text-sm font-medium text-muted hover:text-accent-strong" href="/archives">
            查看全部文章
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {featuredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-5">
          <div className="section-heading">
            <div>
              <p className="eyebrow">最新</p>
              <h2 className="section-title">更多内容</h2>
            </div>
          </div>

          <div className="space-y-4">
            {recentPosts.length > 0 ? (
              recentPosts.map((post) => (
                <article
                  key={post.slug}
                  className="surface-panel rounded-lg p-6"
                >
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
                    <span>{post.formattedDate}</span>
                    <span aria-hidden="true">/</span>
                    <span>{post.readingTime}</span>
                  </div>
                  <h3 className="mt-3 text-2xl font-semibold text-strong">
                    <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
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
              ))
            ) : (
              <div className="rounded-lg border border-dashed border-border p-6 text-sm text-muted">
                在 <code>content/posts</code> 中添加更多 MDX 文件后，文章会自动出现在这里。
              </div>
            )}
          </div>
        </div>

        <aside className="space-y-6">
          <div className="surface-panel rounded-lg p-6">
            <p className="eyebrow">主题</p>
            <h2 className="mt-2 text-2xl font-semibold text-strong">
              按标签浏览
            </h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {tags.map((tag) => (
                <Link
                  key={tag.slug}
                  className="tag-chip"
                  href={`/tags/${tag.slug}`}
                >
                  {tag.name} <span className="text-muted">({tag.count})</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-border bg-inverse p-6 text-inverse-text shadow-sm">
            <p className="eyebrow-inverse">关于</p>
            <h2 className="mt-2 text-2xl font-semibold">
              作者：{siteConfig.author.name}
            </h2>
            <p className="mt-4 text-sm leading-7 text-inverse-muted">
              {siteConfig.author.summary}
            </p>
            <Link className="mt-5 inline-flex text-sm font-medium text-inverse-text" href="/about">
              查看完整介绍
            </Link>
          </div>
        </aside>
      </section>
    </div>
  );
}
