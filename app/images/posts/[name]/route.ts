import { createElement, type CSSProperties, type ReactNode } from "react";
import { ImageResponse } from "next/og";

import { getCoverDefinition } from "@/lib/covers";

type CoverRouteContext = {
  params: Promise<{
    name: string;
  }>;
};

const imageSize = {
  width: 1200,
  height: 675,
};

const cacheControl =
  "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800";

function panel(
  style: CSSProperties,
  children?: ReactNode,
  key?: string | number,
) {
  return createElement("div", { key, style }, children);
}

function renderWarmArchitecture() {
  const verticalGuides = [0, 1, 2, 3, 4].map((index) =>
    panel(
      {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 132 + index * 214,
        width: 1,
        background: "#d7ccba",
      },
      undefined,
      `vertical-${index}`,
    ),
  );
  const horizontalGuides = [0, 1, 2].map((index) =>
    panel(
      {
        position: "absolute",
        left: 0,
        right: 0,
        top: 170 + index * 170,
        height: 1,
        background: "#d7ccba",
      },
      undefined,
      `horizontal-${index}`,
    ),
  );

  return panel(
    {
      position: "relative",
      display: "flex",
      width: "100%",
      height: "100%",
      overflow: "hidden",
      background: "#f1eadc",
    },
    [
      ...verticalGuides,
      ...horizontalGuides,
      panel(
        {
          position: "absolute",
          left: 64,
          top: 52,
          display: "flex",
          alignItems: "center",
          gap: 14,
        },
        [
          panel(
            {
              width: 22,
              height: 22,
              background: "#e34d2f",
            },
            undefined,
            "marker",
          ),
          panel(
            {
              width: 184,
              height: 8,
              background: "#211e1a",
            },
            undefined,
            "rail",
          ),
          panel(
            {
              width: 18,
              height: 18,
              borderRadius: 9,
              border: "3px solid #211e1a",
            },
            undefined,
            "node",
          ),
        ],
        "top-rail",
      ),
      panel(
        {
          position: "absolute",
          left: 68,
          top: 142,
          display: "flex",
          width: 624,
          height: 414,
          border: "3px solid #211e1a",
          background: "#eadfce",
        },
        [
          panel(
            {
              position: "absolute",
              left: 38,
              top: 34,
              width: 76,
              height: 340,
              background: "#e34d2f",
            },
            undefined,
            "red-column",
          ),
          panel(
            {
              position: "absolute",
              left: 146,
              top: 34,
              width: 428,
              height: 76,
              background: "#211e1a",
            },
            undefined,
            "top-beam",
          ),
          panel(
            {
              position: "absolute",
              left: 146,
              top: 144,
              width: 194,
              height: 94,
              border: "3px solid #211e1a",
              background: "#f1eadc",
            },
            undefined,
            "open-module",
          ),
          panel(
            {
              position: "absolute",
              right: 48,
              top: 144,
              width: 186,
              height: 230,
              background: "#d4c2a5",
              border: "3px solid #211e1a",
            },
            undefined,
            "solid-module",
          ),
          panel(
            {
              position: "absolute",
              left: 146,
              bottom: 36,
              width: 194,
              height: 98,
              background: "#f2c94c",
            },
            undefined,
            "yellow-foundation",
          ),
        ],
        "architecture-frame",
      ),
      panel(
        {
          position: "absolute",
          right: 72,
          top: 86,
          display: "flex",
          width: 346,
          height: 474,
          border: "3px solid #211e1a",
          background: "#211e1a",
        },
        [
          panel(
            {
              position: "absolute",
              left: 34,
              top: 36,
              width: 278,
              height: 114,
              background: "#f1eadc",
            },
            undefined,
            "light-slab",
          ),
          panel(
            {
              position: "absolute",
              left: 34,
              top: 178,
              width: 114,
              height: 258,
              background: "#e34d2f",
            },
            undefined,
            "red-slab",
          ),
          panel(
            {
              position: "absolute",
              right: 34,
              top: 178,
              width: 136,
              height: 136,
              borderRadius: 68,
              background: "#f2c94c",
            },
            undefined,
            "sun",
          ),
          panel(
            {
              position: "absolute",
              right: 34,
              bottom: 38,
              width: 136,
              height: 86,
              background: "#9b8e7d",
            },
            undefined,
            "base-block",
          ),
        ],
        "monolith",
      ),
      panel(
        {
          position: "absolute",
          left: 68,
          right: 72,
          bottom: 48,
          height: 10,
          background: "#211e1a",
        },
        undefined,
        "baseline",
      ),
    ],
  );
}

function renderSignalSystems() {
  const signalBars = [70, 118, 168, 220, 156, 96].map((height, index) =>
    panel(
      {
        width: 24,
        height,
        background: index % 2 === 0 ? "#b9e84f" : "#43c9b8",
      },
      undefined,
      `bar-${index}`,
    ),
  );
  const matrix = Array.from({ length: 12 }, (_, index) =>
    panel(
      {
        width: index % 4 === 3 ? 78 : 24,
        height: 24,
        background:
          index === 2 || index === 7
            ? "#b9e84f"
            : index === 5 || index === 11
              ? "#43c9b8"
              : "#273a31",
      },
      undefined,
      `cell-${index}`,
    ),
  );

  return panel(
    {
      position: "relative",
      display: "flex",
      width: "100%",
      height: "100%",
      overflow: "hidden",
      background: "#101713",
    },
    [
      panel(
        {
          position: "absolute",
          left: 64,
          top: 54,
          display: "flex",
          alignItems: "center",
          gap: 14,
        },
        [
          panel(
            {
              width: 16,
              height: 16,
              borderRadius: 8,
              background: "#b9e84f",
            },
            undefined,
            "status",
          ),
          panel(
            {
              width: 236,
              height: 8,
              background: "#43c9b8",
            },
            undefined,
            "signal-line",
          ),
          panel(
            {
              width: 42,
              height: 8,
              background: "#273a31",
            },
            undefined,
            "tail",
          ),
        ],
        "top-signal",
      ),
      panel(
        {
          position: "absolute",
          left: 66,
          top: 148,
          display: "flex",
          width: 560,
          height: 310,
          border: "2px solid #43c9b8",
        },
        [
          panel(
            {
              position: "absolute",
              left: 38,
              top: 38,
              width: 290,
              height: 52,
              background: "#b9e84f",
            },
            undefined,
            "primary-signal",
          ),
          panel(
            {
              position: "absolute",
              left: 38,
              top: 116,
              width: 442,
              height: 24,
              background: "#43c9b8",
            },
            undefined,
            "secondary-signal",
          ),
          panel(
            {
              position: "absolute",
              left: 38,
              top: 168,
              width: 220,
              height: 98,
              background: "#1e3028",
              border: "2px solid #b9e84f",
            },
            undefined,
            "data-module",
          ),
          panel(
            {
              position: "absolute",
              right: 38,
              bottom: 42,
              width: 148,
              height: 98,
              background: "#43c9b8",
            },
            undefined,
            "output-module",
          ),
        ],
        "signal-board",
      ),
      panel(
        {
          position: "absolute",
          right: 66,
          top: 74,
          display: "flex",
          width: 410,
          height: 410,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 205,
          border: "3px solid #43c9b8",
        },
        [
          panel(
            {
              display: "flex",
              width: 302,
              height: 302,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 151,
              border: "32px solid #1d3d34",
            },
            panel(
              {
                display: "flex",
                width: 146,
                height: 146,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 73,
                background: "#b9e84f",
              },
              panel({
                width: 38,
                height: 38,
                background: "#101713",
              }),
            ),
            "rings",
          ),
          panel(
            {
              position: "absolute",
              left: -30,
              top: 192,
              width: 470,
              height: 14,
              background: "#43c9b8",
            },
            undefined,
            "axis",
          ),
        ],
        "radar",
      ),
      panel(
        {
          position: "absolute",
          right: 80,
          bottom: 48,
          display: "flex",
          height: 220,
          alignItems: "flex-end",
          gap: 18,
        },
        signalBars,
        "levels",
      ),
      panel(
        {
          position: "absolute",
          left: 66,
          bottom: 56,
          display: "flex",
          width: 420,
          flexWrap: "wrap",
          gap: 12,
        },
        matrix,
        "matrix",
      ),
    ],
  );
}

function textLabel(
  content: string,
  style: CSSProperties,
  key?: string | number,
) {
  return createElement(
    "div",
    {
      key,
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        whiteSpace: "nowrap",
        ...style,
      },
    },
    content,
  );
}

function renderDependencyFlow() {
  const stages = [
    {
      key: "source",
      title: "Source",
      subtitle: "app / components / lib",
      left: 74,
      top: 206,
      color: "#72e6dd",
      accent: "#133a43",
    },
    {
      key: "build",
      title: "Build",
      subtitle: "vite / tsc / sass / eslint",
      left: 332,
      top: 170,
      color: "#f4c84d",
      accent: "#423311",
    },
    {
      key: "deploy",
      title: "Deploy",
      subtitle: "dist / ci / cd",
      left: 602,
      top: 206,
      color: "#ff8b5e",
      accent: "#4b2115",
    },
    {
      key: "runtime",
      title: "Runtime",
      subtitle: "vue / axios / browser",
      left: 866,
      top: 170,
      color: "#9df067",
      accent: "#203f12",
    },
  ].map((stage) =>
    panel(
      {
        position: "absolute",
        left: stage.left,
        top: stage.top,
        display: "flex",
        width: 212,
        height: 150,
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: 28,
        border: "3px solid #d4eef0",
        background: "#10232a",
        boxShadow: "0 18px 36px rgba(2, 14, 17, 0.22)",
      },
      [
        panel(
          {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "18px 18px 0 18px",
          },
          [
            panel(
              {
                width: 28,
                height: 28,
                borderRadius: 14,
                background: stage.color,
              },
              undefined,
              `${stage.key}-dot`,
            ),
            panel(
              {
                width: 54,
                height: 8,
                borderRadius: 4,
                background: stage.accent,
              },
              undefined,
              `${stage.key}-rail`,
            ),
          ],
          `${stage.key}-header`,
        ),
        textLabel(
          stage.title,
          {
            justifyContent: "flex-start",
            padding: "0 18px",
            fontSize: 30,
            fontWeight: 700,
            color: "#f2fbfc",
          },
          `${stage.key}-title`,
        ),
        textLabel(
          stage.subtitle,
          {
            justifyContent: "flex-start",
            padding: "0 18px 20px 18px",
            fontSize: 16,
            color: "#a7c7ca",
          },
          `${stage.key}-subtitle`,
        ),
      ],
      stage.key,
    ),
  );

  const flowArrows = [
    { left: 286, top: 265, width: 68 },
    { left: 554, top: 265, width: 68 },
    { left: 820, top: 265, width: 66 },
  ].flatMap((arrow, index) => [
    panel(
      {
        position: "absolute",
        left: arrow.left,
        top: arrow.top,
        width: arrow.width,
        height: 6,
        borderRadius: 3,
        background: "#d4eef0",
      },
      undefined,
      `arrow-line-${index}`,
    ),
    panel(
      {
        position: "absolute",
        left: arrow.left + arrow.width - 8,
        top: arrow.top - 9,
        width: 0,
        height: 0,
        borderTop: "12px solid transparent",
        borderBottom: "12px solid transparent",
        borderLeft: "18px solid #d4eef0",
      },
      undefined,
      `arrow-head-${index}`,
    ),
  ]);

  const devDependencyCard = panel(
    {
      position: "absolute",
      left: 246,
      top: 66,
      display: "flex",
      width: 332,
      height: 116,
      flexDirection: "column",
      borderRadius: 24,
      border: "2px solid #f4c84d",
      background: "#1a2f36",
    },
    [
      textLabel(
        "devDependencies",
        {
          justifyContent: "flex-start",
          padding: "18px 20px 8px 20px",
          fontSize: 22,
          fontWeight: 700,
          color: "#f7d87b",
        },
        "dev-label",
      ),
      textLabel(
        "Build-time tools only",
        {
          justifyContent: "flex-start",
          padding: "0 20px",
          fontSize: 15,
          color: "#bfd1d3",
        },
        "dev-copy",
      ),
      panel(
        {
          display: "flex",
          gap: 12,
          padding: "12px 20px 0 20px",
        },
        [
          textLabel(
            "vite",
            {
              height: 28,
              padding: "0 12px",
              borderRadius: 999,
              background: "#f4c84d",
              color: "#2f2508",
              fontSize: 14,
              fontWeight: 700,
            },
            "dev-vite",
          ),
          textLabel(
            "tsc",
            {
              height: 28,
              padding: "0 12px",
              borderRadius: 999,
              background: "#72e6dd",
              color: "#11353c",
              fontSize: 14,
              fontWeight: 700,
            },
            "dev-tsc",
          ),
          textLabel(
            "sass",
            {
              height: 28,
              padding: "0 12px",
              borderRadius: 999,
              background: "#ff8b5e",
              color: "#442014",
              fontSize: 14,
              fontWeight: 700,
            },
            "dev-sass",
          ),
        ],
        "dev-tags",
      ),
    ],
    "dev-card",
  );

  const dependencyCard = panel(
    {
      position: "absolute",
      right: 68,
      bottom: 78,
      display: "flex",
      width: 316,
      height: 126,
      flexDirection: "column",
      borderRadius: 24,
      border: "2px solid #9df067",
      background: "#1a2f36",
    },
    [
      textLabel(
        "dependencies",
        {
          justifyContent: "flex-start",
          padding: "18px 20px 8px 20px",
          fontSize: 22,
          fontWeight: 700,
          color: "#c1f79d",
        },
        "dep-label",
      ),
      textLabel(
        "Needed after deploy",
        {
          justifyContent: "flex-start",
          padding: "0 20px",
          fontSize: 15,
          color: "#bfd1d3",
        },
        "dep-copy",
      ),
      panel(
        {
          display: "flex",
          gap: 12,
          padding: "12px 20px 0 20px",
        },
        [
          textLabel(
            "vue",
            {
              height: 28,
              padding: "0 12px",
              borderRadius: 999,
              background: "#9df067",
              color: "#183409",
              fontSize: 14,
              fontWeight: 700,
            },
            "dep-vue",
          ),
          textLabel(
            "axios",
            {
              height: 28,
              padding: "0 12px",
              borderRadius: 999,
              background: "#72e6dd",
              color: "#11353c",
              fontSize: 14,
              fontWeight: 700,
            },
            "dep-axios",
          ),
          textLabel(
            "ui",
            {
              height: 28,
              padding: "0 12px",
              borderRadius: 999,
              background: "#f4c84d",
              color: "#2f2508",
              fontSize: 14,
              fontWeight: 700,
            },
            "dep-ui",
          ),
        ],
        "dep-tags",
      ),
    ],
    "dependency-card",
  );

  const connectors = [
    panel(
      {
        position: "absolute",
        left: 488,
        top: 182,
        width: 6,
        height: 52,
        borderRadius: 3,
        background: "#f4c84d",
      },
      undefined,
      "dev-connector-line",
    ),
    panel(
      {
        position: "absolute",
        left: 481,
        top: 220,
        width: 0,
        height: 0,
        borderLeft: "10px solid transparent",
        borderRight: "10px solid transparent",
        borderTop: "16px solid #f4c84d",
      },
      undefined,
      "dev-connector-head",
    ),
    panel(
      {
        position: "absolute",
        right: 226,
        bottom: 204,
        width: 6,
        height: 54,
        borderRadius: 3,
        background: "#9df067",
      },
      undefined,
      "dep-connector-line",
    ),
    panel(
      {
        position: "absolute",
        right: 219,
        bottom: 242,
        width: 0,
        height: 0,
        borderLeft: "10px solid transparent",
        borderRight: "10px solid transparent",
        borderBottom: "16px solid #9df067",
      },
      undefined,
      "dep-connector-head",
    ),
  ];

  const gridLines = Array.from({ length: 8 }, (_, index) =>
    panel(
      {
        position: "absolute",
        left: 60 + index * 138,
        top: 0,
        bottom: 0,
        width: 1,
        background: index % 2 === 0 ? "#18323b" : "#13272f",
      },
      undefined,
      `grid-v-${index}`,
    ),
  );

  return panel(
    {
      position: "relative",
      display: "flex",
      width: "100%",
      height: "100%",
      overflow: "hidden",
      background:
        "linear-gradient(135deg, #09161b 0%, #0d2027 42%, #132b33 100%)",
    },
    [
      ...gridLines,
      panel(
        {
          position: "absolute",
          left: 64,
          top: 58,
          display: "flex",
          alignItems: "center",
          gap: 14,
        },
        [
          panel(
            {
              width: 18,
              height: 18,
              borderRadius: 9,
              background: "#72e6dd",
            },
            undefined,
            "status-dot",
          ),
          panel(
            {
              width: 172,
              height: 8,
              borderRadius: 4,
              background: "#d4eef0",
            },
            undefined,
            "status-line",
          ),
          textLabel(
            "npm dependency flow",
            {
              fontSize: 18,
              fontWeight: 600,
              color: "#d4eef0",
              letterSpacing: 0.4,
            },
            "status-copy",
          ),
        ],
        "status",
      ),
      ...flowArrows,
      ...connectors,
      ...stages,
      devDependencyCard,
      dependencyCard,
      panel(
        {
          position: "absolute",
          left: 70,
          right: 68,
          bottom: 48,
          height: 10,
          borderRadius: 6,
          background: "#d4eef0",
          opacity: 0.92,
        },
        undefined,
        "baseline",
      ),
    ],
  );
}

export async function GET(
  _request: Request,
  { params }: CoverRouteContext,
) {
  const { name } = await params;
  const cover = getCoverDefinition(name);

  if (!cover) {
    return new Response("Not Found", { status: 404 });
  }

  const artwork =
    cover.theme === "warm-architecture"
      ? renderWarmArchitecture()
      : cover.theme === "signal-systems"
        ? renderSignalSystems()
        : renderDependencyFlow();

  return new ImageResponse(artwork, {
    ...imageSize,
    headers: {
      "Cache-Control": cacheControl,
    },
  });
}
