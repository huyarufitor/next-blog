const LOCAL_SITE_URL = "http://localhost:3000";

export type SiteUrlEnvironment = {
  NEXT_PUBLIC_SITE_URL?: string;
  VERCEL_PROJECT_PRODUCTION_URL?: string;
  VERCEL_URL?: string;
  NODE_ENV?: string;
};

export type GiscusEnvironment = {
  NEXT_PUBLIC_GISCUS_REPO?: string;
  NEXT_PUBLIC_GISCUS_REPO_ID?: string;
  NEXT_PUBLIC_GISCUS_CATEGORY?: string;
  NEXT_PUBLIC_GISCUS_CATEGORY_ID?: string;
};

export type GiscusConfig = {
  repo: string;
  repoId: string;
  category: string;
  categoryId: string;
};

function resolveSiteUrl(
  source: keyof Pick<
    SiteUrlEnvironment,
    | "NEXT_PUBLIC_SITE_URL"
    | "VERCEL_PROJECT_PRODUCTION_URL"
    | "VERCEL_URL"
  >,
  value: string,
  addHttpsWhenMissing: boolean,
) {
  const candidate = value.trim();
  const hasProtocol = /^[a-z][a-z\d+.-]*:/i.test(candidate);
  const resolvedCandidate =
    addHttpsWhenMissing && !hasProtocol ? `https://${candidate}` : candidate;
  const invalidUrlMessage = `${source} must be an absolute HTTP(S) URL.`;

  let url: URL;

  try {
    url = new URL(resolvedCandidate);
  } catch {
    throw new Error(invalidUrlMessage);
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error(invalidUrlMessage);
  }

  return url.toString().replace(/\/+$/, "");
}

export function getSiteUrl(
  environment: SiteUrlEnvironment = process.env,
) {
  const candidates = [
    {
      source: "NEXT_PUBLIC_SITE_URL",
      value: environment.NEXT_PUBLIC_SITE_URL,
      addHttpsWhenMissing: false,
    },
    {
      source: "VERCEL_PROJECT_PRODUCTION_URL",
      value: environment.VERCEL_PROJECT_PRODUCTION_URL,
      addHttpsWhenMissing: true,
    },
    {
      source: "VERCEL_URL",
      value: environment.VERCEL_URL,
      addHttpsWhenMissing: true,
    },
  ] as const;

  for (const candidate of candidates) {
    if (candidate.value?.trim()) {
      return resolveSiteUrl(
        candidate.source,
        candidate.value,
        candidate.addHttpsWhenMissing,
      );
    }
  }

  return LOCAL_SITE_URL;
}

export function getGiscusConfig(
  environment: GiscusEnvironment = {
    NEXT_PUBLIC_GISCUS_REPO: process.env.NEXT_PUBLIC_GISCUS_REPO,
    NEXT_PUBLIC_GISCUS_REPO_ID: process.env.NEXT_PUBLIC_GISCUS_REPO_ID,
    NEXT_PUBLIC_GISCUS_CATEGORY: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
    NEXT_PUBLIC_GISCUS_CATEGORY_ID:
      process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
  },
): GiscusConfig | null {
  const repo = environment.NEXT_PUBLIC_GISCUS_REPO?.trim();
  const repoId = environment.NEXT_PUBLIC_GISCUS_REPO_ID?.trim();
  const category = environment.NEXT_PUBLIC_GISCUS_CATEGORY?.trim();
  const categoryId = environment.NEXT_PUBLIC_GISCUS_CATEGORY_ID?.trim();

  if (!repo || !repoId || !category || !categoryId) {
    return null;
  }

  return { repo, repoId, category, categoryId };
}

export const siteConfig = {
  name: "栈间笔记",
  description:
    "聚焦前端架构、工程效率与静态优先内容系统的技术博客。",
  url: getSiteUrl(),
  author: {
    name: "林默",
    role: "AI 技术写作者",
    summary:
      "林默是为本站演示而构造的 AI 作者身份，用于呈现技术博客的内容结构与阅读体验，并非真实人物。",
  },
} as const;
