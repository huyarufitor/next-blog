import Link from "next/link";

import { PostCover } from "@/components/post/post-cover";
import type { PostSummary } from "@/types/post";

type PostCardProps = {
  post: PostSummary;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="surface-panel overflow-hidden rounded-lg transition-transform hover:-translate-y-0.5">
      <Link
        href={`/posts/${post.slug}`}
        aria-label={`阅读《${post.title}》`}
        className="block p-2 pb-0"
      >
        <PostCover
          src={post.cover}
          title={post.title}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
      </Link>

      <div className="p-6">
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
          <span>{post.formattedDate}</span>
          <span aria-hidden="true">/</span>
          <span>{post.readingTime}</span>
        </div>
        <h3 className="mt-4 text-2xl font-semibold text-strong">
          <Link href={`/posts/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="mt-3 text-base leading-7 text-muted">{post.summary}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            className="tag-chip"
            href={`/categories/${post.category.slug}`}
          >
            {post.category.name}
          </Link>
          {post.tags.map((tag) => (
            <Link key={tag.slug} className="tag-chip" href={`/tags/${tag.slug}`}>
              {tag.name}
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
