import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import PageTransition from "@/components/layout/PageTransition";

export const metadata: Metadata = {
  title: {
    default: "TrinityDev — We Build Exceptional Digital Experiences",
    template: "%s | TrinityDev",
  },
  description:
    "TrinityDev is a web development agency based in Indonesia, specializing in full-stack web development, UI/UX design, mobile apps, and digital marketing.",
  openGraph: {
    title: "TrinityDev — We Build Exceptional Digital Experiences",
    description:
      "TrinityDev is a web development agency based in Indonesia.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background-base text-text-primary font-body antialiased">
        <Navbar />
        <PageTransition>
          <main>{children}</main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}