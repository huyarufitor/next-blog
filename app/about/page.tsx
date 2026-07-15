import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata = createPageMetadata({
  title: "关于",
  description: `了解 ${siteConfig.author.name}，以及 ${siteConfig.name} 使用的技术栈。`,
  path: "/about",
});

const stack = [
  "基于 Next.js 16 与 App Router 构建",
  "使用仓库内的 MDX 文件管理内容",
  "构建时生成搜索索引、RSS 与 Sitemap",
  "使用 Giscus 提供评论，并在未配置时平稳降级",
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-10">
      <header className="space-y-4">
        <p className="eyebrow">关于</p>
        <h1 className="text-5xl font-semibold text-strong">
          为认真、持久的技术写作而建。
        </h1>
        <p className="text-lg leading-8 text-muted">
          {siteConfig.author.summary}
        </p>
      </header>

      <section className="surface-panel rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-strong">
          为什么建立这个网站
        </h2>
        <div className="mt-5 space-y-4 text-base leading-8 text-muted">
          <p>
            这里更关注内容的长期价值，而不是追逐信息流中的短暂热度。文章会记录架构思考、
            实现过程和取舍依据，希望在发布数月之后依然值得查阅。
          </p>
          <p>
            内容系统有意保持文件驱动：发布流程足够轻，修改可以在 Git 中审阅；未来确实需要
            可视化 CMS 时，也能在不重做页面体系的前提下迁移。
          </p>
        </div>
      </section>

      <section className="surface-panel rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-strong">
          当前技术栈
        </h2>
        <ul className="mt-5 space-y-3 text-base leading-8 text-muted">
          {stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
