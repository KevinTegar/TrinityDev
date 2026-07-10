import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "TrinityDev — Digital Studio";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#111110",
          color: "#F2EFE9",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 5, color: "#E8390E" }}>
          JAKARTA, ID — EST. 2026
        </div>
        <div style={{ display: "flex", fontSize: 118, fontWeight: 700, letterSpacing: -4 }}>
          TrinityDev®
        </div>
        <div style={{ display: "flex", fontSize: 30, opacity: 0.7 }}>
          Digital experiences that refuse to blend in.
        </div>
      </div>
    ),
    size
  );
}
