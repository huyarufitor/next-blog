import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { GiscusComments } from "@/components/comments/giscus-comments";
import { PostCard } from "@/components/post/post-card";
import { PostCover } from "@/components/post/post-cover";
import { PostToc } from "@/components/post/post-toc";
import { renderMdx } from "@/lib/mdx";
import {
  getAllPosts,
  getPostBySlug,
  getPreviousNextPosts,
  getRelatedPosts,
} from "@/lib/posts";
import { siteConfig } from "@/lib/site-config";

type PostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "未找到文章",
    };
  }

  const openGraphImage = `/posts/${post.slug}/opengraph-image`;

  return {
    title: post.title,
    description: post.summary,
    alternates: {
      canonical: `/posts/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      url: `${siteConfig.url}/posts/${post.slug}`,
      publishedTime: post.date,
      tags: post.tags.map((tag) => tag.name),
      images: [
        {
          url: openGraphImage,
          width: 1200,
          height: 630,
          alt: `《${post.title}》分享图`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: [openGraphImage],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const mdxContent = await renderMdx(post.content);
  const { previous, next } = await getPreviousNextPosts(post.slug);
  const relatedPosts = await getRelatedPosts(post, 3);

  return (
    <article className="space-y-12">
      <header className="mx-auto max-w-5xl space-y-8">
        <div className="max-w-3xl space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
            <span>{post.formattedDate}</span>
            <span aria-hidden="true">/</span>
            <span>{post.readingTime}</span>
          </div>
          <h1 className="text-5xl font-semibold text-strong sm:text-6xl">
            {post.title}
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-muted">
            {post.summary}
          </p>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link key={tag.slug} className="tag-chip" href={`/tags/${tag.slug}`}>
                {tag.name}
              </Link>
            ))}
          </div>
        </div>

        <PostCover
          src={post.cover}
          title={post.title}
          sizes="(min-width: 1280px) 1024px, (min-width: 768px) calc(100vw - 6rem), calc(100vw - 2rem)"
          preload
          decorative
        />
      </header>

      <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="surface-panel rounded-lg px-6 py-8 sm:px-10">
          <div className="post-content">{mdxContent}</div>
        </div>

        <aside className="xl:sticky xl:top-24 xl:self-start">
          <PostToc toc={post.toc} />
        </aside>
      </div>

      <nav className="grid gap-4 md:grid-cols-2">
        {previous ? (
          <Link
            className="surface-panel rounded-lg p-6"
            href={`/posts/${previous.slug}`}
          >
            <p className="eyebrow">上一篇</p>
            <h2 className="mt-3 text-2xl font-semibold text-strong">
              {previous.title}
            </h2>
            <p className="mt-2 text-sm leading-7 text-muted">
              {previous.summary}
            </p>
          </Link>
        ) : (
          <div className="rounded-lg border border-dashed border-border p-6 text-sm text-muted">
            没有更早的文章了。
          </div>
        )}

        {next ? (
          <Link
            className="surface-panel rounded-lg p-6"
            href={`/posts/${next.slug}`}
          >
            <p className="eyebrow">下一篇</p>
            <h2 className="mt-3 text-2xl font-semibold text-strong">
              {next.title}
            </h2>
            <p className="mt-2 text-sm leading-7 text-muted">
              {next.summary}
            </p>
          </Link>
        ) : (
          <div className="rounded-lg border border-dashed border-border p-6 text-sm text-muted">
            没有更新的文章了。
          </div>
        )}
      </nav>

      <section className="space-y-6">
        <div className="section-heading">
          <div>
            <p className="eyebrow">相关文章</p>
            <h2 className="section-title">继续阅读</h2>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {relatedPosts.map((relatedPost) => (
            <PostCard key={relatedPost.slug} post={relatedPost} />
          ))}
        </div>
      </section>

      <section className="surface-panel rounded-lg p-8">
        <p className="eyebrow">评论</p>
        <h2 className="mt-2 text-2xl font-semibold text-strong">
          参与讨论
        </h2>
        <div className="mt-6">
          <GiscusComments />
        </div>
      </section>
    </article>
  );
}
