import path from "node:path";

import { describe, expect, it } from "vitest";

import { getAllNotes, getNoteBySlug } from "@/lib/notes";

const fixturesDirectory = path.join(process.cwd(), "tests", "fixtures", "notes");
const directories = {
  publicDirectory: path.join(fixturesDirectory, "public"),
  localDirectory: path.join(fixturesDirectory, "local"),
};

describe("note content", () => {
  it("recursively turns a public Markdown path into a stable slug", async () => {
    const notes = await getAllNotes({ ...directories, includeLocal: false });

    expect(notes).toHaveLength(1);
    expect(notes[0]).toMatchObject({
      slug: "vue/reactivity",
      title: "Vue 响应式原理",
      section: "Vue",
      visibility: "public",
    });
  });

  it("includes local notes only when explicitly requested", async () => {
    const publicNotes = await getAllNotes({ ...directories, includeLocal: false });
    const developmentNotes = await getAllNotes({ ...directories, includeLocal: true });

    expect(publicNotes.map((note) => note.slug)).not.toContain("private-plan");
    expect(developmentNotes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          slug: "private-plan",
          visibility: "local",
        }),
      ]),
    );
  });

  it("returns nested note content by slug segments", async () => {
    const note = await getNoteBySlug(["vue", "reactivity"], {
      ...directories,
      includeLocal: false,
    });

    expect(note?.content).toContain("Observer 与 Watcher");
    expect(note?.tags).toEqual(["Vue"]);
  });
});
