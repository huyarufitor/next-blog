import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { metadata as aboutMetadata } from "@/app/about/page";
import { metadata as archivesMetadata } from "@/app/archives/page";
import CategoryDetailPage, {
  generateMetadata as generateCategoryMetadata,
} from "@/app/categories/[category]/page";
import { metadata as categoriesMetadata } from "@/app/categories/page";
import { metadata as homeMetadata } from "@/app/page";
import NoteDetailPage, {
  generateMetadata as generateNoteMetadata,
} from "@/app/notes/[...slug]/page";
import { metadata as notesMetadata } from "@/app/notes/page";
import { metadata as searchMetadata } from "@/app/search/page";
import TagDetailPage, {
  decodeTagParam,
  generateMetadata as generateTagMetadata,
} from "@/app/tags/[tag]/page";
import { metadata as tagsMetadata } from "@/app/tags/page";
import { siteConfig } from "@/lib/site-config";

const staticPages = [
  ["/", homeMetadata],
  ["/about", aboutMetadata],
  ["/archives", archivesMetadata],
  ["/categories", categoriesMetadata],
  ["/notes", notesMetadata],
  ["/search", searchMetadata],
  ["/tags", tagsMetadata],
] as const;

describe("static page metadata", () => {
  it.each(staticPages)("sets canonical and Open Graph URL for %s", (path, metadata) => {
    expect(metadata.alternates).toMatchObject({ canonical: path });
    expect(metadata.openGraph).toMatchObject({
      url: `${siteConfig.url}${path === "/" ? "" : path}`,
    });
  });
});

describe("encoded Chinese tag routes", () => {
  const encodedTag = encodeURIComponent("性能");

  it("decodes a valid route segment and tolerates malformed escapes", () => {
    expect(decodeTagParam(encodedTag)).toBe("性能");
    expect(decodeTagParam("broken%value")).toBe("broken%value");
  });

  it("generates canonical metadata for an encoded Chinese tag", async () => {
    const metadata = await generateTagMetadata({
      params: Promise.resolve({ tag: encodedTag }),
    });

    expect(metadata).toMatchObject({
      title: "标签：性能",
      alternates: { canonical: `/tags/${encodedTag}` },
      openGraph: { url: `${siteConfig.url}/tags/${encodedTag}` },
    });
  });

  it("renders posts for an encoded Chinese tag", async () => {
    const page = await TagDetailPage({
      params: Promise.resolve({ tag: encodedTag }),
    });
    const markup = renderToStaticMarkup(page);

    expect(markup).toContain("性能");
    expect(markup).toContain("静态优先的博客，不必过度设计");
  });
});

describe("category routes", () => {
  it("generates canonical metadata for a category detail page", async () => {
    const metadata = await generateCategoryMetadata({
      params: Promise.resolve({ category: "technical-practice" }),
    });

    expect(metadata).toMatchObject({
      title: "分类：技术实践",
      alternates: { canonical: "/categories/technical-practice" },
      openGraph: { url: `${siteConfig.url}/categories/technical-practice` },
    });
  });

  it("renders posts for a populated category", async () => {
    const page = await CategoryDetailPage({
      params: Promise.resolve({ category: "technical-practice" }),
    });
    const markup = renderToStaticMarkup(page);

    expect(markup).toContain("技术实践");
    expect(markup).toContain("从零搭建这个技术博客");
  });
});

describe("knowledge base routes", () => {
  const slug = ["knowledge-base", "getting-started"];

  it("generates canonical metadata for a nested public note", async () => {
    const metadata = await generateNoteMetadata({
      params: Promise.resolve({ slug }),
    });

    expect(metadata).toMatchObject({
      title: "知识库使用说明",
      alternates: { canonical: "/notes/knowledge-base/getting-started" },
      openGraph: {
        url: `${siteConfig.url}/notes/knowledge-base/getting-started`,
      },
    });
  });

  it("renders a nested public note", async () => {
    const page = await NoteDetailPage({
      params: Promise.resolve({ slug }),
    });
    const markup = renderToStaticMarkup(page);

    expect(markup).toContain("知识库使用说明");
    expect(markup).toContain("迁移前先审核");
  });
});
