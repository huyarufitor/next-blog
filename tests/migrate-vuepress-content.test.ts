import { promises as fs } from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import {
  buildMigratedSource,
  inspectMarkdown,
  resolveContainedFile,
  runMigration,
  type MigrationManifest,
} from "@/scripts/migrate-vuepress-content";

const temporaryDirectories: string[] = [];

async function createTemporaryDirectory() {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), "vuepress-migration-"));
  temporaryDirectories.push(directory);
  return directory;
}

afterEach(async () => {
  await Promise.all(
    temporaryDirectories.splice(0).map((directory) =>
      fs.rm(directory, { recursive: true, force: true }),
    ),
  );
});

describe("VuePress migration inspection", () => {
  it("extracts the first H1 and reports syntax that requires manual review", () => {
    const inspection = inspectMarkdown(`# TypeScript 泛型\n\n::: tip\n提示\n:::\n\n![图](./generic.png)\n\n-P<范本样式>\n`);

    expect(inspection.title).toBe("TypeScript 泛型");
    expect(inspection.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ code: "vuepress-container" }),
        expect.objectContaining({ code: "relative-asset" }),
        expect.objectContaining({ code: "mdx-angle-bracket" }),
      ]),
    );
  });

  it("builds a draft blog article with normalized frontmatter", () => {
    const source = buildMigratedSource("# 响应式原理\n\n正文", {
      source: "vue/reactivity.md",
      target: "post",
      destination: "vue-reactivity.mdx",
      metadata: {
        summary: "梳理 Vue 响应式原理。",
        category: "技术实践",
        tags: ["Vue"],
        date: "2026-07-21",
      },
    });

    expect(source).toContain('title: "响应式原理"');
    expect(source).toContain("draft: true");
    expect(source).not.toContain("# 响应式原理");
  });
});

describe("migration path safety", () => {
  it("rejects source paths outside the configured docs root", async () => {
    const root = await createTemporaryDirectory();

    expect(() => resolveContainedFile(root, "../secret.md")).toThrow(/outside/i);
  });

  it("does not write during dry-run and writes only explicit clean entries", async () => {
    const root = await createTemporaryDirectory();
    const outputRoot = await createTemporaryDirectory();
    await fs.mkdir(path.join(root, "vue"), { recursive: true });
    await fs.writeFile(path.join(root, "vue", "reactivity.md"), "# 响应式原理\n\n正文");

    const manifest: MigrationManifest = {
      sourceRoot: root,
      entries: [
        {
          source: "vue/reactivity.md",
          target: "note",
          destination: "vue/reactivity.md",
          metadata: {
            summary: "响应式学习记录。",
            section: "Vue",
            tags: ["Vue"],
            updated: "2026-07-21",
          },
        },
      ],
    };

    const dryRun = await runMigration(manifest, { outputRoot, write: false });
    const destination = path.join(outputRoot, "content", "notes", "vue", "reactivity.md");

    expect(dryRun).toEqual([
      expect.objectContaining({ status: "ready", destination }),
    ]);
    await expect(fs.stat(destination)).rejects.toMatchObject({ code: "ENOENT" });

    const written = await runMigration(manifest, { outputRoot, write: true });
    expect(written[0]).toMatchObject({ status: "written" });
    await expect(fs.readFile(destination, "utf8")).resolves.toContain('title: "响应式原理"');
  });
});
