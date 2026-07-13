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
      : renderSignalSystems();

  return new ImageResponse(artwork, {
    ...imageSize,
    headers: {
      "Cache-Control": cacheControl,
    },
  });
}
