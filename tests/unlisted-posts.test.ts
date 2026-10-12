import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

import PostPage, {
  generateMetadata as generatePostMetadata,
} from "@/app/posts/[slug]/page";
import { GET as getRss } from "@/app/rss.xml/route";
import sitemap from "@/app/sitemap";
import {
  getAllPosts,
  getPostBySlug,
  getSearchDocuments,
} from "@/lib/posts";

const unlistedSlug = "2026-thailand-honeymoon";

describe("unlisted posts", () => {
  it("allows direct lookup while keeping the post out of default collections", async () => {
    const [post, listedPosts, allPublishedPosts] = await Promise.all([
      getPostBySlug(unlistedSlug),
      getAllPosts(),
      getAllPosts({ includeUnlisted: true }),
    ]);

    expect(post).toMatchObject({ slug: unlistedSlug, unlisted: true });
    expect(listedPosts.some((item) => item.slug === unlistedSlug)).toBe(false);
    expect(allPublishedPosts.some((item) => item.slug === unlistedSlug)).toBe(true);
  });

  it("keeps the post out of search, RSS, and Sitemap", async () => {
    const [documents, rssResponse, routes] = await Promise.all([
      getSearchDocuments(),
      getRss(),
      sitemap(),
    ]);
    const rss = await rssResponse.text();

    expect(documents.some((document) => document.slug === unlistedSlug)).toBe(false);
    expect(rss).not.toContain(`/posts/${unlistedSlug}`);
    expect(routes.some((route) => route.url.endsWith(`/posts/${unlistedSlug}`))).toBe(
      false,
    );
  });

  it("asks crawlers not to index or follow the direct page", async () => {
    const metadata = await generatePostMetadata({
      params: Promise.resolve({ slug: unlistedSlug }),
    });

    expect(metadata.robots).toEqual({ index: false, follow: false });
  });

  it("does not expose a public comments entry point", async () => {
    const page = await PostPage({
      params: Promise.resolve({ slug: unlistedSlug }),
    });
    const markup = renderToStaticMarkup(page);

    expect(markup).toContain("中秋与国庆之间，我们去了泰兰德");
    expect(markup).not.toContain("参与讨论");
  });
});
