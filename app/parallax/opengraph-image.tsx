import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Parallax — CTEM platform by Photon Security";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Same light blobs as the page backdrop, as radial gradients (no CSS blur here).
const BACKDROP = [
  "radial-gradient(circle at 92% 6%, rgba(34,211,238,0.55), transparent 38%)",
  "radial-gradient(circle at 100% 55%, rgba(37,99,235,0.6), transparent 35%)",
  "radial-gradient(circle at 4% 96%, rgba(109,74,255,0.6), transparent 42%)",
  "radial-gradient(circle at 0% 100%, rgba(246,160,77,0.5), transparent 26%)",
  "radial-gradient(ellipse at 45% 45%, #2a2a2e, #141416 70%)",
].join(", ");

export default async function OpengraphImage() {
  const wordmark = await readFile(join(process.cwd(), "public/parallax/parallax-wordmark-white.svg"));
  const wordmarkSrc = `data:image/svg+xml;base64,${wordmark.toString("base64")}`;

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
          gap: 36,
          background: "#121214",
          backgroundImage: BACKDROP,
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={wordmarkSrc} width={560} height={116} alt="" />

        <div style={{ display: "flex", fontSize: 40, fontWeight: 600, letterSpacing: -1 }}>
          Shift your perspective,&nbsp;<span style={{ color: "rgba(255,255,255,0.55)" }}>secure your perimeter.</span>
        </div>

        <div style={{ display: "flex", fontSize: 20, color: "rgba(255,255,255,0.7)" }}>
          Continuous threat exposure management by&nbsp;<b style={{ color: "#fff", letterSpacing: 1 }}>PHOTON SECURITY</b>
        </div>
      </div>
    ),
    size,
  );
}
