import { createElement, type CSSProperties, type ReactNode } from "react";
import { ImageResponse } from "next/og";

import { getCoverDefinition, type CoverTheme } from "@/lib/covers";
import { DeveloperWorkbench } from "@/lib/cover-artworks/developer-workbench";

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

function renderKnowledgeMap() {
  const nodes = [
    { left: 112, top: 122, size: 118, color: "#55e6d1", kind: "browser" },
    { left: 314, top: 78, size: 138, color: "#ff6b57", kind: "code" },
    { left: 520, top: 254, size: 154, color: "#b8ed58", kind: "database" },
    { left: 766, top: 92, size: 132, color: "#55e6d1", kind: "cloud" },
    { left: 932, top: 294, size: 148, color: "#ff6b57", kind: "ai" },
    { left: 248, top: 430, size: 126, color: "#f3ce55", kind: "deploy" },
  ];

  const connections = [
    { left: 206, top: 164, width: 166, rotate: -11, color: "#55e6d1" },
    { left: 407, top: 182, width: 185, rotate: 36, color: "#ff6b57" },
    { left: 643, top: 255, width: 190, rotate: -36, color: "#b8ed58" },
    { left: 858, top: 196, width: 178, rotate: 40, color: "#55e6d1" },
    { left: 340, top: 458, width: 222, rotate: -28, color: "#f3ce55" },
    { left: 665, top: 360, width: 305, rotate: 10, color: "#ff6b57" },
  ].map((connection, index) =>
    panel(
      {
        position: "absolute",
        left: connection.left,
        top: connection.top,
        width: connection.width,
        height: 4,
        borderRadius: 2,
        background: connection.color,
        opacity: 0.72,
        transform: `rotate(${connection.rotate}deg)`,
        transformOrigin: "left center",
      },
      undefined,
      `connection-${index}`,
    ),
  );

  const artwork = nodes.map((node, index) => {
    const glyph =
      node.kind === "browser"
        ? [
            panel({ position: "absolute", left: 24, top: 29, width: node.size - 48, height: node.size - 54, border: "4px solid #071517", borderRadius: 5 }, undefined, "window"),
            panel({ position: "absolute", left: 24, top: 46, width: node.size - 48, height: 4, background: "#071517" }, undefined, "bar"),
          ]
        : node.kind === "code"
          ? [
              panel({ position: "absolute", left: 31, top: 48, width: 32, height: 32, borderLeft: "5px solid #071517", borderBottom: "5px solid #071517", transform: "rotate(45deg)" }, undefined, "open"),
              panel({ position: "absolute", right: 31, top: 48, width: 32, height: 32, borderRight: "5px solid #071517", borderTop: "5px solid #071517", transform: "rotate(45deg)" }, undefined, "close"),
            ]
          : node.kind === "database"
            ? [0, 1, 2].map((row) => panel({ position: "absolute", left: 31, top: 35 + row * 28, width: node.size - 62, height: 34, border: "4px solid #071517", borderRadius: "50%" }, undefined, `disk-${row}`))
            : node.kind === "cloud"
              ? [
                  panel({ position: "absolute", left: 28, top: 55, width: node.size - 56, height: 42, borderRadius: 22, background: "#071517" }, undefined, "cloud-base"),
                  panel({ position: "absolute", left: 48, top: 36, width: 54, height: 54, borderRadius: 27, background: "#071517" }, undefined, "cloud-cap"),
                ]
              : node.kind === "ai"
                ? [
                    panel({ position: "absolute", left: 36, top: 36, width: node.size - 72, height: node.size - 72, border: "5px solid #071517", transform: "rotate(45deg)" }, undefined, "core"),
                    panel({ position: "absolute", left: node.size / 2 - 9, top: node.size / 2 - 9, width: 18, height: 18, borderRadius: 9, background: "#071517" }, undefined, "center"),
                  ]
                : [
                    panel({ position: "absolute", left: node.size / 2 - 5, top: 25, width: 10, height: 55, background: "#071517" }, undefined, "stem"),
                    panel({ position: "absolute", left: node.size / 2 - 22, top: 60, width: 44, height: 44, borderRight: "10px solid #071517", borderBottom: "10px solid #071517", transform: "rotate(45deg)" }, undefined, "arrow"),
                  ];

    return panel(
      {
        position: "absolute",
        display: "flex",
        left: node.left,
        top: node.top,
        width: node.size,
        height: node.size,
        borderRadius: index % 2 === 0 ? 8 : node.size / 2,
        background: node.color,
        border: "5px solid #071517",
        boxShadow: "10px 10px 0 #071517",
      },
      glyph,
      `node-${node.kind}`,
    );
  });

  return panel(
    { position: "relative", display: "flex", width: "100%", height: "100%", overflow: "hidden", background: "#0b2023" },
    [
      ...Array.from({ length: 9 }, (_, index) => panel({ position: "absolute", left: 30 + index * 146, top: 0, width: 1, height: "100%", background: "#17383c" }, undefined, `grid-${index}`)),
      panel({ position: "absolute", left: 62, top: 54, width: 34, height: 34, background: "#ff6b57" }, undefined, "marker"),
      ...connections,
      ...artwork,
    ],
  );
}

function renderInterviewEvidence() {
  const scoreTicks = Array.from({ length: 7 }, (_, index) =>
    panel(
      { position: "absolute", left: 765 + index * 46, top: 525 - index * 8, width: 22, height: 5 + index * 8, background: index < 4 ? "#245bd6" : "#ff6755" },
      undefined,
      `tick-${index}`,
    ),
  );

  return panel(
    { position: "relative", display: "flex", width: "100%", height: "100%", overflow: "hidden", background: "#f5f0e7" },
    [
      ...Array.from({ length: 6 }, (_, index) => panel({ position: "absolute", left: 92, top: 85 + index * 92, width: 1016, height: 1, background: "#d8cfc1" }, undefined, `guide-${index}`)),
      panel(
        { position: "absolute", display: "flex", left: 105, top: 72, width: 354, height: 500, border: "5px solid #1b1b1b", borderRadius: 7, background: "#fffdf8", boxShadow: "14px 14px 0 #1b1b1b" },
        [
          panel({ position: "absolute", left: 38, top: 40, width: 84, height: 84, borderRadius: 42, background: "#245bd6" }, undefined, "avatar"),
          panel({ position: "absolute", left: 150, top: 53, width: 154, height: 15, background: "#1b1b1b" }, undefined, "name"),
          panel({ position: "absolute", left: 150, top: 88, width: 102, height: 9, background: "#ff6755" }, undefined, "role"),
          ...Array.from({ length: 5 }, (_, index) => panel({ position: "absolute", left: 38, top: 170 + index * 56, width: index % 2 === 0 ? 262 : 220, height: 12, background: index === 2 ? "#245bd6" : "#1b1b1b" }, undefined, `resume-line-${index}`)),
          ...Array.from({ length: 4 }, (_, index) => panel({ position: "absolute", left: 38 + index * 67, bottom: 36, width: 42, height: 42, borderRadius: 21, border: `5px solid ${index % 2 === 0 ? "#ff6755" : "#245bd6"}` }, undefined, `skill-${index}`)),
        ],
        "resume",
      ),
      panel({ position: "absolute", left: 463, top: 304, width: 190, height: 5, background: "#ff6755", transform: "rotate(-10deg)", transformOrigin: "left center" }, undefined, "evidence-line-a"),
      panel({ position: "absolute", left: 627, top: 185, width: 205, height: 5, background: "#245bd6", transform: "rotate(22deg)", transformOrigin: "left center" }, undefined, "evidence-line-b"),
      panel(
        { position: "absolute", display: "flex", left: 564, top: 176, width: 250, height: 174, border: "5px solid #1b1b1b", borderRadius: 7, background: "#ff6755", transform: "rotate(-5deg)", boxShadow: "10px 10px 0 #1b1b1b" },
        [
          panel({ position: "absolute", left: 34, top: 40, width: 176, height: 13, background: "#1b1b1b" }, undefined, "question-a"),
          panel({ position: "absolute", left: 34, top: 79, width: 130, height: 13, background: "#1b1b1b" }, undefined, "question-b"),
          panel({ position: "absolute", left: 34, top: 118, width: 76, height: 13, background: "#fffdf8" }, undefined, "question-c"),
        ],
        "question-card",
      ),
      panel({ position: "absolute", left: 832, top: 112, width: 188, height: 188, borderRadius: 94, border: "16px solid #245bd6", background: "rgba(255, 253, 248, 0.45)" }, undefined, "lens"),
      panel({ position: "absolute", left: 990, top: 274, width: 34, height: 184, borderRadius: 17, background: "#1b1b1b", transform: "rotate(-42deg)", transformOrigin: "top center" }, undefined, "handle"),
      panel({ position: "absolute", left: 873, top: 170, width: 84, height: 16, background: "#1b1b1b" }, undefined, "lens-line-a"),
      panel({ position: "absolute", left: 873, top: 212, width: 56, height: 16, background: "#ff6755" }, undefined, "lens-line-b"),
      panel({ position: "absolute", left: 735, top: 470, width: 390, height: 5, background: "#1b1b1b" }, undefined, "score-baseline"),
      ...scoreTicks,
    ],
  );
}

function renderAiFullStack() {
  const nodes = [
    { left: 104, top: 118, size: 116, color: "#52d6c7", shape: "circle" },
    { left: 154, top: 430, size: 126, color: "#f1c84c", shape: "square" },
    { left: 924, top: 112, size: 132, color: "#ff725e", shape: "square" },
    { left: 946, top: 430, size: 112, color: "#a9df62", shape: "circle" },
  ];

  const connectors = [
    { left: 200, top: 181, width: 330, rotate: 20, color: "#52d6c7" },
    { left: 252, top: 453, width: 300, rotate: -20, color: "#f1c84c" },
    { left: 674, top: 296, width: 310, rotate: -22, color: "#ff725e" },
    { left: 672, top: 368, width: 320, rotate: 20, color: "#a9df62" },
  ].map((connector, index) =>
    panel(
      {
        position: "absolute",
        left: connector.left,
        top: connector.top,
        width: connector.width,
        height: 5,
        borderRadius: 3,
        background: connector.color,
        transform: `rotate(${connector.rotate}deg)`,
        transformOrigin: "left center",
      },
      undefined,
      `ai-connector-${index}`,
    ),
  );

  return panel(
    {
      position: "relative",
      display: "flex",
      width: "100%",
      height: "100%",
      overflow: "hidden",
      background: "#101b1d",
    },
    [
      ...Array.from({ length: 8 }, (_, index) =>
        panel(
          {
            position: "absolute",
            left: 72 + index * 152,
            top: 0,
            width: 1,
            height: "100%",
            background: "#244044",
          },
          undefined,
          `ai-grid-${index}`,
        ),
      ),
      ...connectors,
      ...nodes.map((node, index) =>
        panel(
          {
            position: "absolute",
            display: "flex",
            left: node.left,
            top: node.top,
            width: node.size,
            height: node.size,
            borderRadius: node.shape === "circle" ? node.size / 2 : 8,
            border: "5px solid #071011",
            background: node.color,
            boxShadow: "10px 10px 0 #071011",
          },
          [
            panel(
              {
                position: "absolute",
                left: node.size * 0.27,
                top: node.size * 0.27,
                width: node.size * 0.46,
                height: node.size * 0.46,
                border: "5px solid #071011",
                borderRadius: index % 2 === 0 ? 4 : node.size,
              },
              undefined,
              `ai-node-core-${index}`,
            ),
          ],
          `ai-node-${index}`,
        ),
      ),
      panel(
        {
          position: "absolute",
          display: "flex",
          left: 455,
          top: 152,
          width: 290,
          height: 370,
          border: "6px solid #071011",
          borderRadius: 12,
          background: "#e9eee7",
          boxShadow: "18px 18px 0 #071011",
        },
        [
          panel({ position: "absolute", left: 54, top: 48, width: 182, height: 182, borderRadius: 91, border: "18px solid #3068e8" }, undefined, "ai-ring"),
          panel({ position: "absolute", left: 115, top: 109, width: 60, height: 60, borderRadius: 8, background: "#ff725e", transform: "rotate(45deg)" }, undefined, "ai-core"),
          ...Array.from({ length: 5 }, (_, index) =>
            panel({ position: "absolute", left: 48 + index * 40, bottom: 62, width: 24, height: 24 + index * 10, background: index % 2 === 0 ? "#52d6c7" : "#f1c84c" }, undefined, `ai-meter-${index}`),
          ),
        ],
        "ai-mainframe",
      ),
    ],
  );
}

function renderEventThrottle() {
  const pulses = Array.from({ length: 11 }, (_, index) => {
    const allowed = index % 3 === 0;
    return panel(
      {
        position: "absolute",
        left: 104 + index * 88,
        top: allowed ? 245 : 318,
        width: allowed ? 24 : 12,
        height: allowed ? 190 : 92,
        borderRadius: 6,
        background: allowed ? "#e8533f" : "#273238",
      },
      undefined,
      `throttle-pulse-${index}`,
    );
  });

  return panel(
    {
      position: "relative",
      display: "flex",
      width: "100%",
      height: "100%",
      overflow: "hidden",
      background: "#f1eee6",
    },
    [
      ...Array.from({ length: 6 }, (_, index) =>
        panel({ position: "absolute", left: 70, top: 90 + index * 92, width: 1060, height: 1, background: "#d2cbbb" }, undefined, `throttle-guide-${index}`),
      ),
      ...[0, 1, 2, 3].map((index) =>
        panel({ position: "absolute", left: 78 + index * 264, top: 218, width: 232, height: 244, border: "3px solid #69b8ad", borderRadius: 8, background: index % 2 === 0 ? "#dceae5" : "#f7d968", opacity: 0.55 }, undefined, `throttle-window-${index}`),
      ),
      panel({ position: "absolute", left: 74, right: 70, top: 421, height: 8, borderRadius: 4, background: "#101718" }, undefined, "throttle-baseline"),
      ...pulses,
      panel(
        { position: "absolute", display: "flex", right: 78, top: 50, width: 178, height: 178, borderRadius: 89, border: "12px solid #3068e8", background: "#fffdf7", boxShadow: "10px 10px 0 #101718" },
        [
          panel({ position: "absolute", left: 78, top: 28, width: 8, height: 58, borderRadius: 4, background: "#101718", transform: "rotate(18deg)", transformOrigin: "bottom center" }, undefined, "clock-hour"),
          panel({ position: "absolute", left: 79, top: 80, width: 55, height: 8, borderRadius: 4, background: "#e8533f", transform: "rotate(-28deg)", transformOrigin: "left center" }, undefined, "clock-minute"),
          panel({ position: "absolute", left: 72, top: 72, width: 20, height: 20, borderRadius: 10, background: "#101718" }, undefined, "clock-center"),
        ],
        "throttle-clock",
      ),
      panel({ position: "absolute", left: 76, top: 62, width: 310, height: 42, background: "#101718" }, undefined, "throttle-title-block"),
      panel({ position: "absolute", left: 76, top: 128, width: 194, height: 18, background: "#e8533f" }, undefined, "throttle-accent-block"),
    ],
  );
}

function renderLocalGateway() {
  return panel(
    { display: "flex", position: "relative", width: "100%", height: "100%", background: "#102c31", overflow: "hidden" },
    [
      ...Array.from({ length: 9 }, (_, index) =>
        panel({ position: "absolute", left: 80 + index * 136, top: 0, width: 1, height: "100%", background: "#214046" }, undefined, `gateway-grid-${index}`),
      ),
      textLabel("SUB2API", { position: "absolute", left: 70, top: 52, color: "#e5f3e9", fontSize: 42, fontWeight: 700 }, "gateway-title"),
      textLabel("LOCAL API GATEWAY", { position: "absolute", left: 73, top: 112, color: "#83b7ab", fontSize: 18, letterSpacing: 4 }, "gateway-subtitle"),
      panel({ position: "absolute", left: 155, top: 335, width: 880, height: 7, background: "#70d6bf" }, undefined, "gateway-connection"),
      ...[350, 796].map((left) => panel({ position: "absolute", left, top: 322, width: 28, height: 28, borderTop: "7px solid #70d6bf", borderRight: "7px solid #70d6bf", transform: "rotate(45deg)" }, undefined, `gateway-arrow-${left}`)),
      panel(
        { display: "flex", position: "absolute", left: 66, top: 236, width: 244, height: 175, border: "5px solid #e6f0dd", borderRadius: 14, background: "#193d44" },
        [
          textLabel(">_", { position: "absolute", left: 24, top: 32, color: "#f0d776", fontSize: 64, fontWeight: 700 }, "gateway-terminal-prompt"),
          panel({ position: "absolute", left: 28, bottom: 30, width: 120, height: 8, background: "#79b4a6" }, undefined, "gateway-terminal-line"),
        ],
        "gateway-client",
      ),
      panel({ position: "absolute", left: 171, top: 414, width: 34, height: 36, background: "#e6f0dd" }, undefined, "gateway-stand"),
      panel({ position: "absolute", left: 124, top: 448, width: 128, height: 9, borderRadius: 4, background: "#e6f0dd" }, undefined, "gateway-foot"),
      panel(
        { display: "flex", position: "absolute", left: 440, top: 202, width: 290, height: 296, borderRadius: 22, border: "5px solid #091d21", background: "#e6f0dd", boxShadow: "14px 14px 0 #091d21" },
        [
          ...[0, 1, 2].map((index) => panel(
            { display: "flex", position: "absolute", left: 30, top: 34 + index * 78, width: 220, height: 54, borderRadius: 9, background: "#123b3c" },
            [
              panel({ position: "absolute", left: 16, top: 18, width: 18, height: 18, borderRadius: 9, background: index === 0 ? "#f0d776" : "#70d6bf" }, undefined, `gateway-led-${index}`),
              panel({ position: "absolute", left: 61, top: 23, width: 129, height: 8, background: "#568e82", borderRadius: 4 }, undefined, `gateway-slot-${index}`),
            ],
            `gateway-server-${index}`,
          )),
        ],
        "gateway-stack",
      ),
      ...[
        { left: 866, top: 246, size: 110 },
        { left: 924, top: 211, size: 157 },
        { left: 1030, top: 261, size: 100 },
      ].map((cloud, index) => panel({ position: "absolute", left: cloud.left, top: cloud.top, width: cloud.size, height: cloud.size, borderRadius: cloud.size, background: "#70d6bf" }, undefined, `gateway-cloud-${index}`)),
      panel({ position: "absolute", left: 886, top: 302, width: 221, height: 85, borderRadius: 26, background: "#70d6bf" }, undefined, "gateway-cloud-base"),
      textLabel("AI", { position: "absolute", left: 960, top: 280, color: "#123b3c", fontSize: 54, fontWeight: 700 }, "gateway-cloud-label"),
      textLabel("CLIENT", { position: "absolute", left: 143, top: 520, color: "#b9d6ca", fontSize: 22 }, "gateway-client-label"),
      textLabel("127.0.0.1 : 8888", { position: "absolute", left: 480, top: 545, color: "#f0d776", fontSize: 25 }, "gateway-address"),
      textLabel("UPSTREAM", { position: "absolute", left: 928, top: 440, color: "#b9d6ca", fontSize: 22 }, "gateway-upstream-label"),
    ],
  );
}

const coverRenderers: Record<CoverTheme, () => ReturnType<typeof panel>> = {
  "developer-workbench": () => panel(
    { display: "flex", width: "100%", height: "100%" },
    createElement(DeveloperWorkbench),
  ),
  "warm-architecture": renderWarmArchitecture,
  "signal-systems": renderSignalSystems,
  "dependency-flow": renderDependencyFlow,
  "knowledge-map": renderKnowledgeMap,
  "interview-evidence": renderInterviewEvidence,
  "ai-full-stack": renderAiFullStack,
  "event-throttle": renderEventThrottle,
  "local-gateway": renderLocalGateway,
};

export async function GET(
  _request: Request,
  { params }: CoverRouteContext,
) {
  const { name } = await params;
  const cover = getCoverDefinition(name);

  if (!cover) {
    return new Response("Not Found", { status: 404 });
  }

  const artwork = coverRenderers[cover.theme]();

  return new ImageResponse(artwork, {
    ...imageSize,
    headers: {
      "Cache-Control": cacheControl,
    },
  });
}
