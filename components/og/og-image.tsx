type OgImageProps =
  | {
      variant: "site";
    }
  | {
      variant: "article";
      slug: string;
      date: string;
      theme: "warm" | "signal";
    };

const articlePalettes = {
  warm: {
    background: "#f3eee4",
    foreground: "#1d211d",
    accent: "#e24d2e",
    secondary: "#d5a839",
  },
  signal: {
    background: "#e6f0ed",
    foreground: "#102a32",
    accent: "#007d8a",
    secondary: "#b6d63d",
  },
} as const;

function SiteImage() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background: "#17241d",
        color: "#f6f3ea",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 410,
          height: 410,
          right: 70,
          top: 110,
          display: "flex",
          border: "38px solid #d9e44c",
          borderRadius: 205,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 210,
          height: 210,
          right: 170,
          top: 210,
          display: "flex",
          background: "#e45234",
          transform: "rotate(45deg)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 72,
          top: 62,
          display: "flex",
          alignItems: "center",
          fontSize: 23,
          fontWeight: 700,
          letterSpacing: 4,
        }}
      >
        ENGINEERING / SYSTEMS / WRITING
      </div>
      <div
        style={{
          position: "absolute",
          left: 72,
          top: 180,
          display: "flex",
          flexDirection: "column",
          fontSize: 104,
          fontWeight: 800,
          lineHeight: 0.88,
          letterSpacing: 2,
        }}
      >
        <span>STACK</span>
        <span>NOTES</span>
      </div>
      <div
        style={{
          position: "absolute",
          left: 76,
          bottom: 64,
          display: "flex",
          alignItems: "center",
          fontSize: 25,
          color: "#d6dbd1",
        }}
      >
        STATIC-FIRST IDEAS FOR THE MODERN WEB
      </div>
    </div>
  );
}

function ArticleImage({
  slug,
  date,
  theme,
}: Extract<OgImageProps, { variant: "article" }>) {
  const palette = articlePalettes[theme];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background: palette.background,
        color: palette.foreground,
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 38,
          display: "flex",
          border: `3px solid ${palette.foreground}`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 38,
          height: 630,
          display: "flex",
          background: palette.accent,
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 38,
          top: 38,
          width: 300,
          height: 118,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: palette.foreground,
          color: palette.background,
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: 5,
        }}
      >
        STACK NOTES
      </div>
      <div
        style={{
          position: "absolute",
          left: 78,
          top: 74,
          display: "flex",
          alignItems: "center",
          fontSize: 24,
          fontWeight: 800,
          letterSpacing: 5,
          color: palette.accent,
        }}
      >
        ARTICLE / {date}
      </div>
      <div
        style={{
          position: "absolute",
          left: 76,
          top: 190,
          width: 970,
          display: "flex",
          fontSize: slug.length > 32 ? 61 : 72,
          fontWeight: 800,
          lineHeight: 1.02,
          overflowWrap: "anywhere",
          letterSpacing: 1,
        }}
      >
        {slug.toUpperCase()}
      </div>
      <div
        style={{
          position: "absolute",
          left: 76,
          bottom: 70,
          width: 780,
          height: 16,
          display: "flex",
          background: palette.accent,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 872,
          bottom: 70,
          width: 174,
          height: 16,
          display: "flex",
          background: palette.secondary,
        }}
      />
    </div>
  );
}

export function OgImage(props: OgImageProps) {
  return props.variant === "site" ? <SiteImage /> : <ArticleImage {...props} />;
}
