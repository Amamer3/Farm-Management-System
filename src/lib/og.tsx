import { ImageResponse } from "next/og"

export const ogSize = { width: 1200, height: 630 }
export const ogContentType = "image/png"

export function renderOgImage({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string
  title: string
  subtitle: string
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#173528",
          padding: "72px",
          color: "#F4F7F2",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: "-0.04em",
          }}
        >
          {eyebrow}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 84,
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-0.05em",
              maxWidth: 920,
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: 28, color: "#C5D4C8", maxWidth: 760, lineHeight: 1.35 }}>
            {subtitle}
          </div>
        </div>
      </div>
    ),
    { ...ogSize }
  )
}
