export type CoverTheme =
  | "warm-architecture"
  | "signal-systems"
  | "dependency-flow"
  | "knowledge-map"
  | "interview-evidence"
  | "ai-full-stack"
  | "event-throttle"
  | "local-gateway"
  | "score-modes"
  | "developer-workbench";

export type CoverDefinition = {
  name: string;
  title: string;
  theme: CoverTheme;
};

const coverDefinitions = new Map<string, CoverDefinition>([
  [
    "liberlive-score-modes.png",
    {
      name: "liberlive-score-modes.png",
      title: "和弦谱还是多维曲谱？无弦吉他弹唱前，先选对一首歌的打开方式",
      theme: "score-modes",
    },
  ],
  [
    "female-developer-self-positioning.png",
    {
      name: "female-developer-self-positioning.png",
      title: "女性开发者的自我定位",
      theme: "developer-workbench",
    },
  ],
  [
    "sub2api-local-gateway.png",
    {
      name: "sub2api-local-gateway.png",
      title: "在 Mac 本地搭建 Sub2API：从 ChatGPT 授权到 API 转发",
      theme: "local-gateway",
    },
  ],
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
  [
    "2026-ai-full-stack-frontend-interview-questions.png",
    {
      name: "2026-ai-full-stack-frontend-interview-questions.png",
      title: "2026 年，AI 全栈时代到了，前端面试题你该会的还是要会",
      theme: "ai-full-stack",
    },
  ],
  [
    "javascript-throttle.png",
    {
      name: "javascript-throttle.png",
      title: "节流",
      theme: "event-throttle",
    },
  ],
]);

export function getCoverDefinition(name: string) {
  return coverDefinitions.get(name) ?? null;
}

export function getAllCoverDefinitions() {
  return [...coverDefinitions.values()];
}
