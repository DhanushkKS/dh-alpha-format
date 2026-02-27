import { ImageResponse } from "next/og";

// Image metadata
export const alt = "AlphaFormat - Professional LinkedIn Post Formatter";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff",
          backgroundImage:
            "radial-gradient(circle at 25px 25px, lightgray 2%, transparent 0%), radial-gradient(circle at 75px 75px, lightgray 2%, transparent 0%)",
          backgroundSize: "100px 100px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            padding: "40px 80px",
            borderRadius: "20px",
            border: "2px solid #0070f3",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* App Title */}
          <h1
            style={{
              fontSize: "80px",
              fontWeight: "bold",
              color: "#0070f3",
              margin: "0 0 20px 0",
              letterSpacing: "-0.05em",
              lineHeight: "1",
            }}
          >
            AlphaFormat
          </h1>

          {/* Tagline */}
          <p
            style={{
              fontSize: "32px",
              color: "#4a5568",
              margin: "0",
              textAlign: "center",
              maxWidth: "800px",
            }}
          >
            Elevate your personal branding with professional LinkedIn posts.
          </p>

          {/* Visual Decoration (Optional) */}
          <div
            style={{
              display: "flex",
              marginTop: "40px",
              gap: "20px",
            }}
          >
            <div style={{ fontSize: "40px" }}>Bold</div>
            <div style={{ fontSize: "40px", fontStyle: "italic" }}>Italic</div>
            <div style={{ fontSize: "40px", fontFamily: "monospace" }}>
              Monospace
            </div>
          </div>
        </div>
      </div>
    ),
    // Image options
    {
      ...size,
    },
  );
}
