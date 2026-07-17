import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { PostCover } from "@/components/post/post-cover";
import { PostCard } from "@/components/post/post-card";
import { GET } from "@/app/images/posts/[name]/route";
import { getCoverDefinition } from "@/lib/covers";

describe("getCoverDefinition", () => {
  it("maps the blog foundation cover to its warm architecture theme", () => {
    expect(getCoverDefinition("blog-foundation.png")).toMatchObject({
      name: "blog-foundation.png",
      title: "从零搭建这个技术博客",
      theme: "warm-architecture",
    });
  });

  it("maps the static-first cover to a distinct systems theme", () => {
    expect(getCoverDefinition("static-first.png")).toMatchObject({
      name: "static-first.png",
      title: "静态优先的博客，不必过度设计",
      theme: "signal-systems",
    });
  });

  it("returns null for an unknown cover name", () => {
    expect(getCoverDefinition("unknown.png")).toBeNull();
  });
});

describe("PostCover", () => {
  it("renders a responsive cover with a Chinese alt description", () => {
    const markup = renderToStaticMarkup(
      createElement(PostCover, {
        src: "/images/posts/blog-foundation.png",
        title: "从零搭建这个技术博客",
        sizes: "(min-width: 1024px) 50vw, 100vw",
      }),
    );

    expect(markup).toContain("aspect-video");
    expect(markup).toContain('alt="《从零搭建这个技术博客》文章封面"');
    expect(markup).toContain('sizes="(min-width: 1024px) 50vw, 100vw"');
    expect(markup).toContain("object-cover");
  });

  it("keeps a stable solid-color fallback when no cover is configured", () => {
    const markup = renderToStaticMarkup(
      createElement(PostCover, { title: "没有封面的文章" }),
    );

    expect(markup).toContain("aspect-video");
    expect(markup).toContain("bg-stone-200");
    expect(markup).not.toContain("<img");
  });

  it("uses an empty alt when the cover is decorative", () => {
    const markup = renderToStaticMarkup(
      createElement(PostCover, {
        src: "/images/posts/blog-foundation.png",
        title: "从零搭建这个技术博客",
        decorative: true,
      }),
    );

    expect(markup).toContain('alt=""');
    expect(markup).not.toContain("文章封面");
  });
});

describe("post cover image route", () => {
  it.each(["blog-foundation.png", "static-first.png"])(
    "returns a complete PNG body for %s",
    async (name) => {
    const response = await GET(new Request("http://localhost"), {
        params: Promise.resolve({ name }),
    });
    const body = new Uint8Array(await response.arrayBuffer());

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe("image/png");
    expect([...body.subarray(0, 8)]).toEqual([
      0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
    ]);
    expect(body.byteLength).toBeGreaterThan(1_000);
    expect(response.headers.get("cache-control")).toBe(
      "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
    );
    },
  );

  it("returns 404 for an unknown cover name", async () => {
    const response = await GET(new Request("http://localhost"), {
      params: Promise.resolve({ name: "unknown.png" }),
    });

    expect(response.status).toBe(404);
  });
});

describe("PostCard cover", () => {
  it("places the cover before metadata and keeps the card radius at eight pixels", () => {
    const markup = renderToStaticMarkup(
      createElement(PostCard, {
        post: {
          slug: "getting-started-with-this-blog",
          title: "从零搭建这个技术博客",
          date: "2026-07-11",
          formattedDate: "2026年7月11日",
          summary: "文章摘要",
          category: {
            name: "技术实践",
            slug: "technical-practice",
            description: "前端工程、架构取舍、实现细节与技术复盘。",
          },
          tags: [],
          draft: false,
          cover: "/images/posts/blog-foundation.png",
          readingTime: "约 3 分钟阅读",
        },
      }),
    );

    expect(markup.indexOf("文章封面")).toBeGreaterThan(-1);
    expect(markup.indexOf("文章封面")).toBeLessThan(
      markup.indexOf("2026年7月11日"),
    );
    expect(markup).toContain("surface-panel overflow-hidden rounded-lg");
    expect(markup).not.toContain("rounded-[1.75rem]");
  });
});
