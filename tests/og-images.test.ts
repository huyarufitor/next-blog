import { describe, expect, it, vi } from "vitest";

vi.mock("next/font/google", () => ({
  Geist: () => ({ variable: "font-sans" }),
  Geist_Mono: () => ({ variable: "font-mono" }),
}));

import PostOpenGraphImage, {
  alt as postAlt,
  contentType as postContentType,
  size as postSize,
} from "@/app/posts/[slug]/opengraph-image";
import SiteOpenGraphImage, {
  alt as siteAlt,
  contentType as siteContentType,
  size as siteSize,
} from "@/app/opengraph-image";
import { metadata as siteMetadata } from "@/app/layout";
import { generateMetadata as generatePostMetadata } from "@/app/posts/[slug]/page";

const PNG_SIGNATURE = [
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
];

function inspectPng(buffer: ArrayBuffer) {
  const bytes = new Uint8Array(buffer);
  const view = new DataView(buffer);

  return {
    bytes,
    width: view.getUint32(16),
    height: view.getUint32(20),
  };
}

async function renderImage(response: Response) {
  expect(response.headers.get("content-type")).toBe("image/png");

  const image = inspectPng(await response.arrayBuffer());

  expect([...image.bytes.subarray(0, 8)]).toEqual(PNG_SIGNATURE);
  expect(image.width).toBe(1200);
  expect(image.height).toBe(630);
  expect(image.bytes.byteLength).toBeGreaterThan(1_000);

  return image.bytes;
}

describe("site Open Graph image", () => {
  it("exports the metadata image contract and renders a complete PNG", async () => {
    expect(siteAlt).toBe("Stack Notes site preview");
    expect(siteSize).toEqual({ width: 1200, height: 630 });
    expect(siteContentType).toBe("image/png");

    await renderImage(await SiteOpenGraphImage());
  });
});

describe("post Open Graph images", () => {
  it("exports the metadata image contract", () => {
    expect(postAlt).toBe("Stack Notes article preview");
    expect(postSize).toEqual({ width: 1200, height: 630 });
    expect(postContentType).toBe("image/png");
  });

  it("renders both current articles as distinct complete PNGs", async () => {
    const foundation = await renderImage(
      await PostOpenGraphImage({
        params: Promise.resolve({ slug: "getting-started-with-this-blog" }),
      }),
    );
    const staticFirst = await renderImage(
      await PostOpenGraphImage({
        params: Promise.resolve({ slug: "static-first-blogging" }),
      }),
    );

    expect(Buffer.compare(foundation, staticFirst)).not.toBe(0);
  });

  it("uses Next.js 404 behavior for an unknown slug", async () => {
    await expect(
      PostOpenGraphImage({
        params: Promise.resolve({ slug: "missing-article" }),
      }),
    ).rejects.toHaveProperty("digest", "NEXT_HTTP_ERROR_FALLBACK;404");
  });
});

describe("Open Graph metadata", () => {
  it("points the site metadata at the site image", () => {
    expect(siteMetadata.openGraph).toMatchObject({
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: siteAlt,
        },
      ],
    });
    expect(siteMetadata.twitter).toMatchObject({
      images: ["/opengraph-image"],
    });
  });

  it("keeps Chinese article copy and points metadata at its article image", async () => {
    const metadata = await generatePostMetadata({
      params: Promise.resolve({ slug: "getting-started-with-this-blog" }),
    });

    expect(metadata).toMatchObject({
      title: "从零搭建这个技术博客",
      description:
        "从内容存储到构建流程，说明这个博客为什么从本地 MDX 与静态生成起步。",
      openGraph: {
        images: [
          {
            url: "/posts/getting-started-with-this-blog/opengraph-image",
            width: 1200,
            height: 630,
            alt: "《从零搭建这个技术博客》分享图",
          },
        ],
      },
      twitter: {
        images: ["/posts/getting-started-with-this-blog/opengraph-image"],
      },
    });
  });
});
