"use client";

import { useState } from "react";
import { navLinks } from "@/data/navigation";
import { SITE } from "@/data/site";
import { TransitionLink } from "@/components/global/PageTransition";
import LocalTime from "@/components/global/LocalTime";
import MenuOverlay from "@/components/global/MenuOverlay";
import { underline } from "@/components/ui/underline";
import { cn } from "@/lib/cn";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 mix-blend-difference">
        <nav
          aria-label="Primary"
          className="flex items-center justify-between px-4 py-4 text-paper md:px-10"
        >
          <TransitionLink
            href="/"
            className="font-display text-lg font-medium uppercase tracking-tight"
          >
            {SITE.wordmark}
            <span className="align-super text-[0.55em]">®</span>
          </TransitionLink>

          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <TransitionLink
                  href={link.href}
                  className={cn("font-mono text-meta uppercase", underline)}
                >
                  {link.label}
                </TransitionLink>
              </li>
            ))}
            <li>
              <LocalTime className="font-mono text-meta uppercase opacity-60" />
            </li>
          </ul>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-haspopup="dialog"
            className="font-mono text-meta uppercase md:hidden"
          >
            Menu
          </button>
        </nav>
      </header>
      <MenuOverlay open={open} onClose={() => setOpen(false)} />
    </>
  );
}
