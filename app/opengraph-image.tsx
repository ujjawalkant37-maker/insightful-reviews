import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export const alt = "Insightful Reviews";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          padding: "70px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 800,
            color: "#111827",
            letterSpacing: "-3px",
          }}
        >
          Insightful Reviews
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 34,
            fontWeight: 500,
            color: "#4b5563",
          }}
        >
          Buy smarter. Trust the evidence.
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 50,
            padding: "18px 32px",
            borderRadius: 18,
            background: "#4f46e5",
            color: "#ffffff",
            fontSize: 28,
            fontWeight: 700,
          }}
        >
          AI-powered product reviews
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}