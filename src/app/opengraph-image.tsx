import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#f6f4ef",
          color: "#1a1a1a",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ fontSize: 28, color: "#6b6b6b", marginBottom: 24 }}>
          EU Blue Card eligible · Open to relocation within the EU
        </div>
        <div style={{ fontSize: 56, fontWeight: 600, lineHeight: 1.2, maxWidth: 980 }}>
          Marti Soura Vamseekar
        </div>
        <div style={{ fontSize: 34, color: "#3a3a3a", marginTop: 16, maxWidth: 980 }}>
          AI &amp; data platform engineer — production systems, EU analytics,
          research in software
        </div>
        <div style={{ fontSize: 24, color: "#6b6b6b", marginTop: 20, maxWidth: 980 }}>
          Open to AI Engineer and Data Platform Engineer roles in the European Union
        </div>
        <div style={{ fontSize: 26, color: "#6b6b6b", marginTop: 40 }}>
          souravamseekar.com
        </div>
      </div>
    ),
    { ...size }
  );
}
