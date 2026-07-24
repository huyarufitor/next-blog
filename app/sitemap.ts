import type { MetadataRoute } from "next";

import { getAllCategories } from "@/lib/categories";
import { getAllPosts, getTagSummaries } from "@/lib/posts";
import { getAllNotes } from "@/lib/notes";
import { siteConfig } from "@/lib/site-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, tags, notes] = await Promise.all([
    getAllPosts(),
    getTagSummaries(),
    getAllNotes({ includeLocal: false }),
  ]);
  const categories = getAllCategories();

  const staticRoutes = ["", "/about", "/archives", "/categories", "/notes", "/search", "/tags"].map(
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

  const categoryRoutes = categories.map((category) => ({
    url: `${siteConfig.url}/categories/${category.slug}`,
    lastModified: new Date(),
  }));

  const noteRoutes = notes.map((note) => ({
    url: `${siteConfig.url}/notes/${note.slug}`,
    lastModified: new Date(note.updated),
  }));

  return [...staticRoutes, ...postRoutes, ...noteRoutes, ...categoryRoutes, ...tagRoutes];
}
