import { ImageResponse } from "next/og";

export const alt = "Wildan Syukri Niam, Researcher and Builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#f5f0e8",
        color: "#1a1714",
        padding: "72px 80px",
        fontFamily: "serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div
          style={{
            width: 58,
            height: 58,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 999,
            background: "#1a1714",
            color: "#f5f0e8",
            fontFamily: "sans-serif",
            fontSize: 18,
          }}
        >
          WN
        </div>
        <div style={{ fontFamily: "sans-serif", fontSize: 26, fontWeight: 650 }}>
          Wildan Syukri Niam
        </div>
      </div>
      <div style={{ maxWidth: 980, fontSize: 76, lineHeight: 1.02, letterSpacing: -3 }}>
        I research and build autonomous systems people can verify.
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          color: "#686057",
          fontFamily: "sans-serif",
          fontSize: 21,
        }}
      >
        <span>AI agents / Web3 trust / On-chain intelligence</span>
        <span style={{ color: "#943e1b" }}>Evidence over assertion</span>
      </div>
    </div>,
    size,
  );
}
