import QRCode from "qrcode";

import { getSiteUrl } from "@/lib/seo/site-url";

export const dynamic = "force-static";

export async function GET() {
  const aboutUrl = new URL("/about", getSiteUrl()).toString();
  const svg = await QRCode.toString(aboutUrl, {
    type: "svg",
    errorCorrectionLevel: "M",
    margin: 1,
    width: 216,
    color: {
      dark: "#1A1714FF",
      light: "#F5F0E8FF",
    },
  });

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
