import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export type OpenSpecErrorCode =
  | "invalid-change-id"
  | "missing-file"
  | "missing-heading"
  | "unfinished-task"
  | "suspicious-secret";

export type OpenSpecError = {
  code: OpenSpecErrorCode;
  changeId: string;
  file?: string;
  message: string;
};

const REQUIRED_FILES = ["proposal.md", "spec.md", "design.md", "tasks.md"] as const;
const REQUIRED_HEADINGS: Record<(typeof REQUIRED_FILES)[number], RegExp> = {
  "proposal.md": /^#\s+Proposal\b/im,
  "spec.md": /^#\s+Specification\b/im,
  "design.md": /^#\s+Design\b/im,
  "tasks.md": /^#\s+Tasks\b/im,
};
const CHANGE_ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const SECRET_PATTERNS = [
  /(?:api[_-]?key|secret|token|password)\s*[:=]\s*['"`]?(?:sk|pk|gh[pousr]|xox[baprs]-)[a-z0-9_\-]{8,}/i,
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/i,
];

function error(
  code: OpenSpecErrorCode,
  changeId: string,
  message: string,
  file?: string,
): OpenSpecError {
  return { code, changeId, ...(file ? { file } : {}), message };
}

async function readText(filePath: string): Promise<string | undefined> {
  try {
    return await fs.readFile(filePath, "utf8");
  } catch (cause) {
    if ((cause as NodeJS.ErrnoException).code === "ENOENT") return undefined;
    throw cause;
  }
}

function hasSuspiciousSecret(text: string): boolean {
  return SECRET_PATTERNS.some((pattern) => pattern.test(text));
}

async function validateChange(changesRoot: string, changeId: string): Promise<OpenSpecError[]> {
  const changeRoot = path.join(changesRoot, changeId);
  const errors: OpenSpecError[] = [];

  if (!CHANGE_ID_PATTERN.test(changeId)) {
    errors.push(
      error("invalid-change-id", changeId, "change ID 只能包含小写字母、数字和连字符"),
    );
  }

  for (const file of REQUIRED_FILES) {
    const filePath = path.join(changeRoot, file);
    const text = await readText(filePath);
    if (text === undefined) {
      errors.push(error("missing-file", changeId, `缺少必需文件 ${file}`, file));
      continue;
    }

    if (!REQUIRED_HEADINGS[file].test(text)) {
      errors.push(error("missing-heading", changeId, `缺少一级标题 ${file}`, file));
    }
    if (hasSuspiciousSecret(text)) {
      errors.push(error("suspicious-secret", changeId, "文档包含疑似凭据模式，请移除真实值", file));
    }
    if (file === "tasks.md" && /-\s*\[\s*\]/.test(text)) {
      errors.push(error("unfinished-task", changeId, "任务清单仍有未勾选任务", file));
    }
  }

  return errors;
}

export async function validateOpenSpec(rootDir: string): Promise<OpenSpecError[]> {
  const changesRoot = path.join(rootDir, "changes");
  let entries;
  try {
    entries = await fs.readdir(changesRoot, { withFileTypes: true });
  } catch (cause) {
    if ((cause as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw cause;
  }

  const changes = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
  const errors = await Promise.all(changes.map((changeId) => validateChange(changesRoot, changeId)));
  return errors.flat();
}

async function main() {
  const rootDir = path.resolve(process.argv[2] ?? "openspec");
  const errors = await validateOpenSpec(rootDir);
  if (errors.length === 0) {
    console.log(`OpenSpec 校验通过：${rootDir}`);
    return;
  }

  for (const item of errors) {
    const location = item.file ? `${item.changeId}/${item.file}` : item.changeId;
    console.error(`[${item.code}] ${location}: ${item.message}`);
  }
  process.exitCode = 1;
}

if (process.argv[1] && path.resolve(fileURLToPath(import.meta.url)) === path.resolve(process.argv[1])) {
  await main();
}
