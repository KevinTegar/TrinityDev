import type Lenis from "lenis";

export const lenisStore: { current: Lenis | null } = { current: null };

export function scrollToTop(immediate = true) {
  if (lenisStore.current) {
    lenisStore.current.scrollTo(0, { immediate });
  } else {
    window.scrollTo(0, 0);
  }
}
