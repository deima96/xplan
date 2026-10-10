import type { Metadata, Viewport } from "next";
import "@fontsource/rubik/300.css";
import "@fontsource/rubik/400.css";
import "@fontsource/rubik/500.css";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "XPLAN — Planning & Constructing", template: "%s — XPLAN" },
  description:
    "XPLAN: we're doing what we do best. Planning & Constructing. Reach out to us.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
