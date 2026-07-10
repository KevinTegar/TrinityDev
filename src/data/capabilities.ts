export type Capability = {
  index: string;
  title: string;
  description: string;
  items: string[];
};

export const capabilities: Capability[] = [
  {
    index: "01",
    title: "Strategy",
    description:
      "Before pixels: we interrogate the problem. Positioning, user flows, information architecture — the unglamorous work that decides whether a site performs.",
    items: ["Positioning & messaging", "UX architecture", "Content strategy", "Technical consulting"],
  },
  {
    index: "02",
    title: "Design",
    description:
      "Identity and interface as one system. We design brands that survive contact with real screens — and interfaces with a point of view.",
    items: ["Brand identity", "Interface design", "Design systems", "Motion design"],
  },
  {
    index: "03",
    title: "Engineering",
    description:
      "Fast, accessible, obsessively tuned. We hand-build with Next.js and modern tooling — no page builders, no bloat, no excuses.",
    items: ["Next.js development", "E-commerce", "CMS integration", "Performance & SEO"],
  },
];
