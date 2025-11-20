import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "FilmFinder: Find your next favorite film";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#F5F4F2",
          padding: "80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Top Section - Branding */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {/* Icon/Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "80px",
              height: "80px",
              backgroundColor: "#202123",
              borderRadius: "16px",
              color: "white",
              fontSize: "32px",
              fontWeight: "700",
            }}
          >
            FF
          </div>

          {/* Title */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <h1
              style={{
                fontSize: "64px",
                fontWeight: "600",
                color: "#202123",
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              FilmFinder
            </h1>
            <p
              style={{
                fontSize: "32px",
                fontWeight: "400",
                color: "#6B6B6B",
                margin: 0,
                lineHeight: 1.3,
              }}
            >
              AI Movie Discovery
            </p>
          </div>
        </div>

        {/* Middle Section - Feature highlights */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            marginTop: "40px",
          }}
        >
          {[
            { text: "Smart Suggestions" },
            { text: "Rich Cards" },
            { text: "Real-time" },
          ].map((feature, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                backgroundColor: "white",
                padding: "16px 24px",
                borderRadius: "12px",
                border: "1px solid #E5E5E5",
              }}
            >
              <span
                style={{
                  fontSize: "22px",
                  color: "#202123",
                  fontWeight: "500",
                }}
              >
                {feature.text}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom Section - Tech stack badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 20px",
              backgroundColor: "#202123",
              borderRadius: "8px",
            }}
          >
            <span
              style={{
                fontSize: "18px",
                color: "white",
                fontWeight: "500",
              }}
            >
              Next.js 16 · Vercel AI SDK · OpenRouter
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
