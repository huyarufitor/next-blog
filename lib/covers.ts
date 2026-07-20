export type CoverTheme =
  | "warm-architecture"
  | "signal-systems"
  | "dependency-flow";

export type CoverDefinition = {
  name: string;
  title: string;
  theme: CoverTheme;
};

const coverDefinitions = new Map<string, CoverDefinition>([
  [
    "blog-foundation.png",
    {
      name: "blog-foundation.png",
      title: "从零搭建这个技术博客",
      theme: "warm-architecture",
    },
  ],
  [
    "static-first.png",
    {
      name: "static-first.png",
      title: "静态优先的博客，不必过度设计",
      theme: "signal-systems",
    },
  ],
  [
    "dont-memorize-dependencies.png",
    {
      name: "dont-memorize-dependencies.png",
      title: "别再死记硬背 dependencies 和 devDependencies 了",
      theme: "dependency-flow",
    },
  ],
]);

export function getCoverDefinition(name: string) {
  return coverDefinitions.get(name) ?? null;
}
