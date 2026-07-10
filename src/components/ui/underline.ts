/** Slide-in underline on hover/focus — append to any inline link's className. */
export const underline =
  "relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-full " +
  "after:origin-right after:scale-x-0 after:bg-current after:transition-transform " +
  "after:duration-500 after:ease-out hover:after:origin-left hover:after:scale-x-100 " +
  "focus-visible:after:origin-left focus-visible:after:scale-x-100";
