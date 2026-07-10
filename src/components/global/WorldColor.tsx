"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, WORLD, prefersReducedMotion } from "@/lib/motion";

type World = "ink" | "paper";
const FG: Record<World, string> = { ink: WORLD.paper, paper: WORLD.ink };

export default function WorldColor() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reduced = prefersReducedMotion();

    const apply = (world: World, animate: boolean) => {
      const vars = { "--world-bg": WORLD[world], "--world-fg": FG[world] };
      if (animate) {
        gsap.to(root, { ...vars, duration: 0.6, ease: "power2.out", overwrite: "auto" });
      } else {
        gsap.set(root, vars);
      }
    };

    const sections = gsap.utils.toArray<HTMLElement>("[data-world]");
    const initial = (sections[0]?.dataset.world as World) ?? "ink";
    apply(initial, false);

    const triggers = sections.map((el) =>
      ScrollTrigger.create({
        trigger: el,
        start: "top 50%",
        end: "bottom 50%",
        onEnter: () => apply(el.dataset.world as World, !reduced),
        onEnterBack: () => apply(el.dataset.world as World, !reduced),
      })
    );

    return () => triggers.forEach((t) => t.kill());
  }, [pathname]);

  return null;
}
