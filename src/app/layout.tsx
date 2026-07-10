import type { Metadata, Viewport } from "next";
import { clash, general, instrument, jetbrains } from "@/lib/fonts";
import { SITE } from "@/data/site";
import { TransitionProvider } from "@/components/global/PageTransition";
import Nav from "@/components/global/Nav";
import Footer from "@/components/global/Footer";
import SmoothScroll from "@/components/global/SmoothScroll";
import WorldColor from "@/components/global/WorldColor";
import Preloader from "@/components/global/Preloader";
import Cursor from "@/components/global/Cursor";
import SkewOnScroll from "@/components/global/SkewOnScroll";
import Grain from "@/components/global/Grain";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} — Digital Studio`, template: `%s — ${SITE.name}` },
  description: SITE.description,
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: `${SITE.name} — Digital Studio`,
    description: SITE.tagline,
    url: SITE.url,
    siteName: SITE.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Digital Studio`,
    description: SITE.tagline,
  },
};

export const viewport: Viewport = { themeColor: "#111110" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${clash.variable} ${general.variable} ${instrument.variable} ${jetbrains.variable}`}
    >
      <body className="font-body">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-vermilion focus:px-4 focus:py-2 focus:font-mono focus:text-meta focus:uppercase focus:text-paper"
        >
          Skip to content
        </a>
        <TransitionProvider>
          <Preloader />
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </TransitionProvider>
        <SmoothScroll />
        <WorldColor />
        <SkewOnScroll />
        <Grain />
        <Cursor />
      </body>
    </html>
  );
}
