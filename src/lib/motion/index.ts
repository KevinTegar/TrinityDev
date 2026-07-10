import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

export { gsap, ScrollTrigger, SplitText };

export const EASE = {
  out: "expo.out",
  inOut: "expo.inOut",
  soft: "power2.out",
} as const;

export const DUR = {
  fast: 0.5,
  base: 0.9,
  slow: 1.2,
} as const;

/** gsap.matchMedia() condition strings */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const POINTER_FINE = "(pointer: fine)";

export const INTRO_DONE_EVENT = "td:intro-done";
export const INTRO_SEEN_KEY = "td-intro-seen";

export const WORLD = {
  ink: "#111110",
  paper: "#f2efe9",
} as const;

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
