"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { navLinks } from "@/data/navigation";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const progress = useScrollProgress();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-[#60A5FA] to-[#818CF8] z-[100]"
        style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
      />

      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-background-secondary/90 backdrop-blur-xl border-b border-border-default"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span
              className="text-xl font-display font-bold text-text-primary glitch-text"
              data-text="TrinityDev"
            >
              TrinityDev
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-1/2 w-0 h-[1px] bg-accent-primary group-hover:w-full transition-all duration-300 -translate-x-1/2" />
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/contact"
              className="btn-glow px-5 py-2 text-sm"
            >
              Start Project
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-text-primary"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background-base/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={link.href}
                  className="text-2xl font-display font-bold text-text-primary"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.1 }}
            >
              <Link
                href="/contact"
                className="btn-glow px-6 py-3 text-base mt-4"
                onClick={() => setMobileOpen(false)}
              >
                Start Project
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
