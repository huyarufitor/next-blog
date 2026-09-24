import { promises as fs } from "node:fs";
import path from "node:path";

const publicContentPath = /^(posts|notes)\/[^/].*\.(md|mdx)$/;

export function normalizePublicContentPath(relativePath: string) {
  const normalizedPath = relativePath.replace(/\\/g, "/");

  if (!publicContentPath.test(normalizedPath)) {
    throw new Error(`Invalid public content path: ${relativePath}`);
  }

  return normalizedPath;
}

export async function readPublicContentSource(relativePath: string): Promise<string> {
  const normalizedPath = normalizePublicContentPath(relativePath);
  try {
    const contentModule = (normalizedPath.endsWith(".mdx")
      ? await import(`@/content/${normalizedPath.slice(0, -4)}.mdx`)
      : await import(`@/content/${normalizedPath.slice(0, -3)}.md`)) as {
      default?: unknown;
    };

    if (typeof contentModule.default === "string") return contentModule.default;
  } catch {
    // Vitest and newly added files may not have a loader context yet.
  }

  return fs.readFile(path.join(process.cwd(), "content", normalizedPath), "utf8");
}
