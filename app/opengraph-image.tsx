import { ImageResponse } from "next/og";

import { OgImage } from "@/components/og/og-image";

export const alt = "Stack Notes site preview";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(<OgImage variant="site" />, size);
}
