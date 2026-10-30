import { promises as fs } from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { validateOpenSpec } from "@/scripts/validate-openspec";

const temporaryDirectories: string[] = [];

async function createTemporaryDirectory() {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), "openspec-") );
  temporaryDirectories.push(directory);
  return directory;
}

async function writeChange(root: string, changeId = "content-workflow") {
  const directory = path.join(root, "changes", changeId);
  await fs.mkdir(directory, { recursive: true });
  await Promise.all([
    fs.writeFile(path.join(directory, "proposal.md"), "# Proposal\n\n## Why\n\n背景\n\n## Scope\n\n范围\n"),
    fs.writeFile(path.join(directory, "spec.md"), "# Specification\n\n## Requirements\n\n系统 SHALL 检查规格。\n"),
    fs.writeFile(path.join(directory, "design.md"), "# Design\n\n## Approach\n\n采用轻量方案。\n"),
    fs.writeFile(path.join(directory, "tasks.md"), "# Tasks\n\n- [x] 完成校验器\n"),
  ]);
}

afterEach(async () => {
  await Promise.all(
    temporaryDirectories.splice(0).map((directory) =>
      fs.rm(directory, { recursive: true, force: true }),
    ),
  );
});

describe("OpenSpec validator", () => {
  it("accepts a complete change with required headings", async () => {
    const root = await createTemporaryDirectory();
    await writeChange(root);

    expect(await validateOpenSpec(root)).toEqual([]);
  });

  it("reports missing files and invalid change ids", async () => {
    const root = await createTemporaryDirectory();
    await fs.mkdir(path.join(root, "changes", "Bad Change"), { recursive: true });

    const errors = await validateOpenSpec(root);

    expect(errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ code: "invalid-change-id" }),
        expect.objectContaining({ code: "missing-file", file: "proposal.md" }),
      ]),
    );
  });

  it("reports unfinished tasks and suspected credentials without echoing values", async () => {
    const root = await createTemporaryDirectory();
    await writeChange(root);
    const tasks = path.join(root, "changes", "content-workflow", "tasks.md");
    await fs.writeFile(tasks, "# Tasks\n\n- [ ] 待完成\n\n状态：已完成\n\nAPI_KEY=sk-example-do-not-report");

    const errors = await validateOpenSpec(root);
    const report = JSON.stringify(errors);

    expect(errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ code: "unfinished-task" }),
        expect.objectContaining({ code: "suspicious-secret" }),
      ]),
    );
    expect(report).not.toContain("sk-example-do-not-report");
  });
});
