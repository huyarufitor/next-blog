import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { metadata as aboutMetadata } from "@/app/about/page";
import { metadata as archivesMetadata } from "@/app/archives/page";
import { metadata as homeMetadata } from "@/app/page";
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
