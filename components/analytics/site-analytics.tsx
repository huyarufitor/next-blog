import { Analytics } from "@vercel/analytics/react";

type SiteAnalyticsProps = {
  nodeEnvironment?: string;
  vercelEnvironment?: string;
};

export function isAnalyticsEnabled(
  nodeEnvironment: string | undefined = process.env.NODE_ENV,
  vercelEnvironment: string | undefined = process.env.VERCEL_ENV,
) {
  return (
    nodeEnvironment === "production" &&
    vercelEnvironment === "production"
  );
}

export function SiteAnalytics({
  nodeEnvironment,
  vercelEnvironment,
}: SiteAnalyticsProps = {}) {
  if (!isAnalyticsEnabled(nodeEnvironment, vercelEnvironment)) {
    return null;
  }

  return <Analytics />;
}
