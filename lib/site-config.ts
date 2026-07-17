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
    "记录技术实践、工作手记、音乐学习、生活切片与人生思考的个人博客。",
  url: getSiteUrl(),
  author: {
    name: "fitorhu",
    role: "开发者 / 音乐学习者",
    summary:
      "一个热爱生活的女开发者，做过 4 年音视频、2 年音乐相关 Web，也喜欢健身、游泳和羽毛球。这里会记录技术、音乐学习与日常思考，也认真寻找 AI 时代里依然值得长期投入的方向。",
  },
} as const;
