import type { Metadata, Viewport } from "next";
import { clash, general, instrument, jetbrains } from "@/lib/fonts";
import { SITE } from "@/data/site";
import SmoothScroll from "@/components/global/SmoothScroll";
import WorldColor from "@/components/global/WorldColor";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} — Digital Studio`, template: `%s — ${SITE.name}` },
  description: SITE.description,
};

export const viewport: Viewport = { themeColor: "#111110" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${clash.variable} ${general.variable} ${instrument.variable} ${jetbrains.variable}`}
    >
      <body className="font-body">
        <main id="main">{children}</main>
        <SmoothScroll />
        <WorldColor />
      </body>
    </html>
  );
}
