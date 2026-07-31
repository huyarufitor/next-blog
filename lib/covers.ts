export type CoverTheme =
  | "warm-architecture"
  | "signal-systems"
  | "dependency-flow"
  | "knowledge-map"
  | "interview-evidence";

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
  [
    "complete-frontend-question-bank.png",
    {
      name: "complete-frontend-question-bank.png",
      title:
        "2026 前端面试题大全：从基础到全栈、AI 与运维，240 道题一次讲透",
      theme: "knowledge-map",
    },
  ],
  [
    "interviewer-evidence-chain.png",
    {
      name: "interviewer-evidence-chain.png",
      title:
        "看了 40+份中高级前端简历后，我整理了这套能问出真实水平的面试题",
      theme: "interview-evidence",
    },
  ],
]);

export function getCoverDefinition(name: string) {
  return coverDefinitions.get(name) ?? null;
}
