import { promises as fs } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

type PostMetadata = {
  title?: string;
  summary: string;
  category: "技术实践" | "工作手记" | "音乐学习" | "生活切片" | "人生思考";
  tags?: string[];
  date: string;
  draft?: boolean;
};

type NoteMetadata = {
  title?: string;
  summary: string;
  section: string;
  tags?: string[];
  updated: string;
};

export type MigrationEntry =
  | { source: string; target: "post"; destination: string; metadata: PostMetadata }
  | {
      source: string;
      target: "note" | "local-note";
      destination: string;
      metadata: NoteMetadata;
    };

export type MigrationManifest = {
  sourceRoot: string;
  entries: MigrationEntry[];
};

export type InspectionIssue = {
  code:
    | "missing-title"
    | "vuepress-container"
    | "vue-component"
    | "relative-asset"
    | "mdx-angle-bracket"
    | "suspected-secret";
  message: string;
};

export type MigrationResult = {
  source: string;
  destination: string;
  status: "ready" | "needs-review" | "written" | "exists";
  issues: InspectionIssue[];
};

const targetDirectories = {
  post: path.join("content", "posts"),
  note: path.join("content", "notes"),
  "local-note": path.join("content", "notes-local"),
} as const;

function quote(value: string) {
  return JSON.stringify(value);
}

function serializeTags(tags: string[] = []) {
  return tags.length === 0
    ? ["tags: []"]
    : ["tags:", ...tags.map((tag) => `  - ${quote(tag)}`)];
}

function isContained(root: string, candidate: string) {
  const relative = path.relative(root, candidate);
  return relative !== "" && !relative.startsWith(`..${path.sep}`) && relative !== ".." && !path.isAbsolute(relative);
}

export function resolveContainedFile(root: string, relativePath: string) {
  const resolvedRoot = path.resolve(root);
  const candidate = path.resolve(resolvedRoot, relativePath);

  if (!isContained(resolvedRoot, candidate)) {
    throw new Error(`Source path is outside the configured docs root: ${relativePath}`);
  }

  return candidate;
}

export function inspectMarkdown(source: string) {
  const title = source.match(/^#\s+(.+)$/m)?.[1].trim();
  const issues: InspectionIssue[] = [];
  const prose = source
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`\n]*`/g, "");

  if (!title) {
    issues.push({ code: "missing-title", message: "No level-one heading was found." });
  }
  if (/^:{3,4}\s+(tip|warning|danger|details|note)\b/im.test(source)) {
    issues.push({
      code: "vuepress-container",
      message: "VuePress container syntax requires manual conversion.",
    });
  }
  if (/<(?:Badge|ClientOnly|Content|TOC)\b/.test(source)) {
    issues.push({
      code: "vue-component",
      message: "Vue component markup cannot be rendered by the React MDX pipeline.",
    });
  }
  if (/!\[[^\]]*]\((?!https?:\/\/|\/|data:|#)[^)]+\)/i.test(source)) {
    issues.push({
      code: "relative-asset",
      message: "Relative image assets must be copied and their URLs rewritten manually.",
    });
  }
  if (/<\/?[A-Z\u3400-\u9fff][^>\n]*>/.test(prose)) {
    issues.push({
      code: "mdx-angle-bracket",
      message: "Angle-bracket placeholders outside code are parsed as MDX tags.",
    });
  }
  const hasKnownSecretPrefix = /\b(?:figd|gh[opsu]|github_pat|sk-(?:proj-)?)[_-][A-Za-z\d_-]{16,}\b/.test(source);
  const hasAssignedSecret =
    /(?:api[_-]?key|access[_-]?token|auth[_-]?token|client[_-]?secret|password)\s*["']?\s*[:=]\s*["'][^"'\s]{16,}["']/i.test(
      source,
    );
  const hasPrivateKey = /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/.test(source);

  if (hasKnownSecretPrefix || hasAssignedSecret || hasPrivateKey) {
    issues.push({
      code: "suspected-secret",
      message: "A possible credential was found. Revoke it if real and remove it before migration.",
    });
  }

  return { title, issues };
}

export function buildMigratedSource(source: string, entry: MigrationEntry) {
  const inspection = inspectMarkdown(source);
  const title = entry.metadata.title ?? inspection.title;

  if (!title) throw new Error(`A title is required for ${entry.source}`);

  const body = source.replace(/^#\s+.+(?:\r?\n)+/m, "").trimStart();
  const lines = ["---", `title: ${quote(title)}`];

  if (entry.target === "post") {
    lines.push(
      `date: ${quote(entry.metadata.date)}`,
      `summary: ${quote(entry.metadata.summary)}`,
      `category: ${quote(entry.metadata.category)}`,
      ...serializeTags(entry.metadata.tags),
      `draft: ${entry.metadata.draft ?? true}`,
    );
  } else {
    lines.push(
      `summary: ${quote(entry.metadata.summary)}`,
      `section: ${quote(entry.metadata.section)}`,
      ...serializeTags(entry.metadata.tags),
      `updated: ${quote(entry.metadata.updated)}`,
    );
  }

  return `${lines.join("\n")}\n---\n\n${body}`;
}

function resolveDestination(outputRoot: string, entry: MigrationEntry) {
  const targetRoot = path.resolve(outputRoot, targetDirectories[entry.target]);
  const destination = path.resolve(targetRoot, entry.destination);

  if (!isContained(targetRoot, destination)) {
    throw new Error(`Destination path is outside ${targetDirectories[entry.target]}: ${entry.destination}`);
  }

  return destination;
}

export async function runMigration(
  manifest: MigrationManifest,
  options: { outputRoot?: string; write?: boolean } = {},
): Promise<MigrationResult[]> {
  const outputRoot = options.outputRoot ?? process.cwd();
  const results: MigrationResult[] = [];

  for (const entry of manifest.entries) {
    const sourcePath = resolveContainedFile(manifest.sourceRoot, entry.source);
    const sourceStat = await fs.stat(sourcePath);
    if (!sourceStat.isFile()) throw new Error(`Migration source must be a file: ${entry.source}`);
    if (!/\.mdx?$/i.test(sourcePath)) throw new Error(`Migration source must be Markdown: ${entry.source}`);

    const source = await fs.readFile(sourcePath, "utf8");
    const inspection = inspectMarkdown(source);
    const destination = resolveDestination(outputRoot, entry);

    try {
      await fs.access(destination);
      results.push({ source: sourcePath, destination, status: "exists", issues: [] });
      continue;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    }

    if (inspection.issues.length > 0) {
      results.push({ source: sourcePath, destination, status: "needs-review", issues: inspection.issues });
      continue;
    }

    if (options.write) {
      await fs.mkdir(path.dirname(destination), { recursive: true });
      await fs.writeFile(destination, buildMigratedSource(source, entry), { flag: "wx" });
    }

    results.push({
      source: sourcePath,
      destination,
      status: options.write ? "written" : "ready",
      issues: [],
    });
  }

  return results;
}

function assertManifest(value: unknown): asserts value is MigrationManifest {
  if (!value || typeof value !== "object") throw new Error("Manifest must be an object.");
  const manifest = value as Partial<MigrationManifest>;
  if (typeof manifest.sourceRoot !== "string" || !Array.isArray(manifest.entries)) {
    throw new Error("Manifest requires sourceRoot and entries.");
  }
  for (const entry of manifest.entries as MigrationEntry[]) {
    if (!entry || typeof entry.source !== "string" || typeof entry.destination !== "string") {
      throw new Error("Every manifest entry requires source and destination file paths.");
    }
    if (!Object.hasOwn(targetDirectories, entry.target) || !entry.metadata) {
      throw new Error(`Unsupported migration target for ${entry.source}.`);
    }
  }
}

async function main() {
  const args = process.argv.slice(2);
  const manifestFlag = args.indexOf("--manifest");
  if (manifestFlag === -1 || !args[manifestFlag + 1]) {
    throw new Error("Usage: migrate:vuepress -- --manifest <file> [--write]");
  }

  const manifestPath = path.resolve(args[manifestFlag + 1]);
  const manifestValue: unknown = JSON.parse(await fs.readFile(manifestPath, "utf8"));
  assertManifest(manifestValue);
  const results = await runMigration(manifestValue, { write: args.includes("--write") });

  for (const result of results) {
    console.log(`[${result.status}] ${result.source} -> ${result.destination}`);
    for (const issue of result.issues) console.log(`  - ${issue.code}: ${issue.message}`);
  }

  const counts = Object.groupBy(results, (result) => result.status);
  console.log(
    `Summary: ${results.length} selected, ${counts.ready?.length ?? 0} ready, ${counts.written?.length ?? 0} written, ${counts["needs-review"]?.length ?? 0} need review, ${counts.exists?.length ?? 0} already exist.`,
  );
}

const isDirectExecution = process.argv[1]
  ? import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href
  : false;

if (isDirectExecution) {
  main().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}
