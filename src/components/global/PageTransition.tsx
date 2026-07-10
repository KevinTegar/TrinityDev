"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useRef } from "react";
import { gsap, ScrollTrigger, EASE, prefersReducedMotion } from "@/lib/motion";
import { scrollToTop } from "@/lib/motion/lenis-store";

const TransitionContext = createContext<{ navigate: (href: string) => void }>({
  navigate: () => {},
});

export function useTransition() {
  return useContext(TransitionContext);
}

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const curtainRef = useRef<HTMLDivElement>(null);
  const coveredRef = useRef(false);
  const router = useRouter();
  const pathname = usePathname();

  const navigate = useCallback(
    (href: string) => {
      if (href === pathname) return;
      const curtain = curtainRef.current;
      if (prefersReducedMotion() || !curtain) {
        router.push(href);
        return;
      }
      const panels = curtain.querySelectorAll("[data-curtain-panel]");
      coveredRef.current = true;
      gsap
        .timeline({ onComplete: () => router.push(href) })
        .set(curtain, { autoAlpha: 1 })
        .fromTo(
          panels,
          { yPercent: 100 },
          { yPercent: 0, duration: 0.5, ease: EASE.inOut, stagger: 0.06 }
        );
    },
    [pathname, router]
  );

  useEffect(() => {
    const curtain = curtainRef.current;
    if (!coveredRef.current || !curtain) return;
    coveredRef.current = false;
    scrollToTop();
    ScrollTrigger.refresh();
    const panels = curtain.querySelectorAll("[data-curtain-panel]");
    gsap
      .timeline({ delay: 0.1 })
      .to(panels, { yPercent: -100, duration: 0.6, ease: EASE.inOut, stagger: 0.06 })
      .set(curtain, { autoAlpha: 0 })
      .set(panels, { yPercent: 100 });
  }, [pathname]);

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      <div
        ref={curtainRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[80] flex opacity-0"
      >
        {[0, 1, 2, 3].map((i) => (
          <div key={i} data-curtain-panel className="h-full flex-1 bg-ink" />
        ))}
      </div>
    </TransitionContext.Provider>
  );
}

type TransitionLinkProps = React.ComponentProps<typeof Link>;

export function TransitionLink({ href, onClick, ...rest }: TransitionLinkProps) {
  const { navigate } = useTransition();
  return (
    <Link
      href={href}
      onClick={(e) => {
        onClick?.(e);
        if (
          e.defaultPrevented ||
          e.metaKey ||
          e.ctrlKey ||
          e.shiftKey ||
          e.altKey ||
          e.button !== 0
        )
          return;
        const url = typeof href === "string" ? href : href.pathname ?? "";
        if (url.startsWith("/")) {
          e.preventDefault();
          navigate(url);
        }
      }}
      {...rest}
    />
  );
}
