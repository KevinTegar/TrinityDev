import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function fadeUpOnScroll(element: string | Element, delay = 0) {
  gsap.fromTo(
    element,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    }
  );
}

export function staggerFadeUp(elements: string | Element[], staggerDelay = 0.1) {
  gsap.fromTo(
    elements,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: staggerDelay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: elements[0] as Element,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    }
  );
}

export function parallaxScroll(element: string | Element, speed = 0.5) {
  gsap.to(element, {
    yPercent: -30 * speed,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
}

export { gsap, ScrollTrigger };