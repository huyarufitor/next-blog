import type { Category } from "@/types/post";

export const categoryNames = [
  "技术实践",
  "工作手记",
  "音乐学习",
  "生活切片",
  "人生思考",
] as const;

export const categories = [
  {
    name: "技术实践",
    slug: "technical-practice",
    description: "前端工程、架构取舍、实现细节与技术复盘。",
  },
  {
    name: "工作手记",
    slug: "work-notes",
    description: "真实项目里的方法、协作、判断与阶段性复盘。",
  },
  {
    name: "音乐学习",
    slug: "music-learning",
    description: "关于乐理、听感、练习过程与声音体验的记录。",
  },
  {
    name: "生活切片",
    slug: "life-slices",
    description: "运动、日常、情绪与那些值得留下的生活片段。",
  },
  {
    name: "人生思考",
    slug: "life-thinking",
    description: "关于成长、职业方向、长期热爱与时代变化的追问。",
  },
] as const satisfies readonly Category[];

const categoriesByName = new Map<string, Category>(
  categories.map((category) => [category.name, category]),
);
const categoriesBySlug = new Map<string, Category>(
  categories.map((category) => [category.slug, category]),
);

export function getAllCategories() {
  return [...categories] as Category[];
}

export function getCategoryByName(name: string) {
  const category = categoriesByName.get(name);

  if (!category) {
    throw new Error(`Unknown category: ${name}`);
  }

  return category;
}

export function getCategoryBySlug(slug: string) {
  return categoriesBySlug.get(slug) ?? null;
}
