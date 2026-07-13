import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";

import { OgImage } from "@/components/og/og-image";
import { getCoverDefinition } from "@/lib/covers";
import { getPostBySlug } from "@/lib/posts";

export const alt = "Stack Notes article preview";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

type OpenGraphImageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function OpenGraphImage({ params }: OpenGraphImageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const coverName = post.cover?.split("/").at(-1);
  const cover = coverName ? getCoverDefinition(coverName) : null;
  const theme = cover?.theme === "signal-systems" ? "signal" : "warm";

  return new ImageResponse(
    <OgImage
      variant="article"
      slug={post.slug}
      date={post.date}
      theme={theme}
    />,
    size,
  );
}
