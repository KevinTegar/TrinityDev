"use client";

import { useEffect, useRef } from "react";
import { gsap, EASE, prefersReducedMotion } from "@/lib/motion";
import { navLinks } from "@/data/navigation";
import { SITE } from "@/data/site";
import { TransitionLink } from "@/components/global/PageTransition";
import LocalTime from "@/components/global/LocalTime";

type Props = { open: boolean; onClose: () => void };

export default function MenuOverlay({ open, onClose }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (firstRender.current) {
      firstRender.current = false;
      gsap.set(root, { autoAlpha: 0, yPercent: -100 });
      return;
    }

    const reduced = prefersReducedMotion();
    if (open) {
      document.documentElement.style.overflow = "hidden";
      if (reduced) {
        gsap.set(root, { autoAlpha: 1, yPercent: 0 });
      } else {
        gsap
          .timeline()
          .set(root, { autoAlpha: 1 })
          .fromTo(root, { yPercent: -100 }, { yPercent: 0, duration: 0.6, ease: EASE.inOut })
          .fromTo(
            root.querySelectorAll("[data-menu-link]"),
            { yPercent: 110 },
            { yPercent: 0, duration: 0.7, ease: EASE.out, stagger: 0.06 },
            "-=0.2"
          );
      }
      root.querySelector<HTMLElement>("[data-menu-close]")?.focus();
    } else {
      document.documentElement.style.overflow = "";
      if (reduced) {
        gsap.set(root, { autoAlpha: 0, yPercent: -100 });
      } else {
        gsap
          .timeline()
          .to(root, { yPercent: -100, duration: 0.5, ease: EASE.inOut })
          .set(root, { autoAlpha: 0 });
      }
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[70] flex flex-col justify-between bg-ink px-4 pb-8 pt-24 text-paper opacity-0 md:px-10"
      aria-hidden={!open}
    >
      <button
        type="button"
        data-menu-close
        onClick={onClose}
        className="absolute right-4 top-5 font-mono text-meta uppercase md:right-10"
      >
        Close
      </button>
      <nav aria-label="Menu">
        <ul className="flex flex-col gap-2">
          <li className="overflow-hidden">
            <TransitionLink
              href="/"
              data-menu-link
              onClick={onClose}
              className="block font-display text-display-xl uppercase"
            >
              Home
            </TransitionLink>
          </li>
          {navLinks.map((link) => (
            <li key={link.href} className="overflow-hidden">
              <TransitionLink
                href={link.href}
                data-menu-link
                onClick={onClose}
                className="block font-display text-display-xl uppercase"
              >
                {link.label}
              </TransitionLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex flex-wrap items-end justify-between gap-4 border-t hairline pt-5 font-mono text-meta uppercase">
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        <span>
          {SITE.location} — <LocalTime />
        </span>
      </div>
    </div>
  );
}
