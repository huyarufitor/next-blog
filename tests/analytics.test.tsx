import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@vercel/analytics/react", () => ({
  Analytics: () => <span data-vercel-analytics="enabled" />,
}));

import {
  isAnalyticsEnabled,
  SiteAnalytics,
} from "@/components/analytics/site-analytics";

describe("isAnalyticsEnabled", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("enables analytics for a Vercel production deployment", () => {
    expect(isAnalyticsEnabled("production", "production")).toBe(true);
  });

  it.each([
    ["development", "production"],
    ["test", "production"],
    ["production", "preview"],
    ["production", "development"],
  ] as const)(
    "disables analytics for NODE_ENV=%s and VERCEL_ENV=%s",
    (nodeEnvironment, vercelEnvironment) => {
      expect(
        isAnalyticsEnabled(nodeEnvironment, vercelEnvironment),
      ).toBe(false);
    },
  );

  it("reads NODE_ENV and VERCEL_ENV by default", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("VERCEL_ENV", "production");

    expect(isAnalyticsEnabled()).toBe(true);
  });
});

describe("SiteAnalytics", () => {
  it("renders nothing outside Vercel production", () => {
    const markup = renderToStaticMarkup(
      <SiteAnalytics
        nodeEnvironment="production"
        vercelEnvironment="preview"
      />,
    );

    expect(markup).toBe("");
  });

  it("renders the Vercel Analytics component in production", () => {
    const markup = renderToStaticMarkup(
      <SiteAnalytics
        nodeEnvironment="production"
        vercelEnvironment="production"
      />,
    );

    expect(markup).toContain('data-vercel-analytics="enabled"');
  });
});
