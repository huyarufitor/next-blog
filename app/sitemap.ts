import type { MetadataRoute } from "next";

import { getAllPosts, getTagSummaries } from "@/lib/posts";
import { siteConfig } from "@/lib/site-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, tags] = await Promise.all([getAllPosts(), getTagSummaries()]);

  const staticRoutes = ["", "/about", "/archives", "/search", "/tags"].map(
    (route) => ({
      url: `${siteConfig.url}${route}`,
      lastModified: new Date(),
    }),
  );

  const postRoutes = posts.map((post) => ({
    url: `${siteConfig.url}/posts/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  const tagRoutes = tags.map((tag) => ({
    url: `${siteConfig.url}/tags/${tag.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...postRoutes, ...tagRoutes];
}
