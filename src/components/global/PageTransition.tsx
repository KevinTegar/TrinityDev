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
      coveredRef.current = true;
      gsap
        .timeline()
        .set(curtain, { yPercent: 100, autoAlpha: 1 })
        .to(curtain, {
          yPercent: 0,
          duration: 0.55,
          ease: EASE.inOut,
          onComplete: () => router.push(href),
        });
    },
    [pathname, router]
  );

  useEffect(() => {
    const curtain = curtainRef.current;
    if (!coveredRef.current || !curtain) return;
    coveredRef.current = false;
    scrollToTop();
    ScrollTrigger.refresh();
    gsap.to(curtain, {
      yPercent: -100,
      duration: 0.7,
      ease: EASE.inOut,
      delay: 0.1,
      onComplete: () => gsap.set(curtain, { yPercent: 100, autoAlpha: 0 }),
    });
  }, [pathname]);

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      <div
        ref={curtainRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[80] bg-ink opacity-0"
      />
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
