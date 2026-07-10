# TrinityDev "Editorial Ink & Paper" Rebuild — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the TrinityDev company-profile site from scratch as an editorial, type-driven, awwwards-grade experience per `docs/superpowers/specs/2026-07-10-trinitydev-editorial-rebuild-design.md`.

**Architecture:** Clean-slate UI inside the existing Next.js 14 App Router repo. One early "demolition" task deletes all old UI and installs the new data layer so every later task is purely additive and every commit builds green. GSAP (+ScrollTrigger+SplitText) with Lenis is the single motion system; a CSS-variable "world" (`--world-bg`/`--world-fg`) tweens the whole page between Ink and Paper.

**Tech Stack:** Next.js 14 (App Router, TS strict), Tailwind CSS 3, GSAP ≥3.13 (SplitText/ScrollTrigger are free since 3.13), Lenis (`lenis` package — NOT the deprecated `@studio-freight/lenis`), next/font.

## Global Constraints

Every task's requirements implicitly include all of these:

- Colors, exact: Ink `#111110` · Paper `#F2EFE9` · Vermilion `#E8390E`. Vermilion is NEVER used for body-size text (<18px); display text, borders, badges and UI accents only (AA large-text/non-text = 3:1).
- Fonts: display `var(--font-clash)`, body `var(--font-general)`, serif accent `var(--font-instrument)` (italic), meta/labels `var(--font-jetbrains)` (mono, uppercase, `text-meta`).
- All site copy is **English**. All four portfolio projects carry `status: "Concept"` and a visible `CONCEPT` badge — never presented as client work.
- **No framer-motion imports anywhere.** All motion goes through the re-exports in `src/lib/motion/index.ts` (`import { gsap, ScrollTrigger, SplitText } from "@/lib/motion"`).
- **Reduced motion:** animation setup ONLY inside `gsap.matchMedia().add(MOTION_OK, …)`. Content must be fully visible with zero JS/motion — never hide content with CSS classes (no `opacity-0` utilities for animation); initial hidden states are set by GSAP inside the matchMedia callback.
- Animate `transform` and `opacity` only (plus CSS custom props for the world tween). No layout-property animation.
- Never disable focus outlines. `:focus-visible` ring is defined globally in `globals.css`.
- Internal navigation ALWAYS uses `TransitionLink` from `@/components/global/PageTransition` (after Task 5). External links use plain `<a target="_blank" rel="noopener noreferrer">`.
- Every full-width page section declares `data-world="ink"` or `data-world="paper"`.
- Path alias `@/*` → `./src/*` (verify in Task 1).
- Shell is **Windows PowerShell 5.1** — no `&&` chaining; use `;`.
- Per-task quality gate: `npm run build` and `npm run lint` pass. There is no unit-test infra in this repo (deliberate: marketing site, no logic worth a test harness yet); the TDD cycle is replaced by build/lint gates per task + the full manual verification protocol in Task 11.
- Commits: conventional messages as given per task; end every commit message with the `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>` trailer.

## Final File Map

```
src/
├── app/
│   ├── layout.tsx                  # fonts, metadata, providers (Task 2 stub → Task 5 final)
│   ├── page.tsx                    # Home (Task 2 stub → Task 7 final)
│   ├── globals.css                 # tokens/base/utilities (Task 1)
│   ├── not-found.tsx               # editorial 404 (Task 2 stub → Task 10 final)
│   ├── opengraph-image.tsx         # OG card (Task 11)
│   ├── work/page.tsx  work/[slug]/page.tsx   # Task 8
│   ├── studio/page.tsx             # Task 9
│   └── contact/page.tsx            # Task 10
├── components/
│   ├── global/  # SmoothScroll, WorldColor (T3) · PageTransition, Nav, MenuOverlay, LocalTime, Footer (T5) · Preloader, Cursor (T6)
│   ├── home/    # Hero, Manifesto, SelectedWork, Capabilities, CtaMarquee (T7)
│   ├── work/    # WorkList (T7, shared home+/work), CaseMeta (T8)
│   ├── contact/ # ContactForm, CopyEmail (T10)
│   └── ui/      # Magnetic, Marquee, Reveal, ImageReveal, underline (T4)
├── data/        # site.ts, projects.ts, capabilities.ts, studio.ts, navigation.ts (T2)
├── fonts/       # ClashDisplay-Variable.woff2, GeneralSans-Variable.woff2 (T1)
└── lib/
    ├── cn.ts                       # existing, keep
    ├── fonts.ts                    # next/font setup (T1)
    └── motion/index.ts  motion/lenis-store.ts   # (T3)
```

Deleted in Task 2: `src/components/sections/*`, `src/components/layout/*`, `src/app/blog/**`, `src/app/services/page.tsx`, `src/app/team/page.tsx`, old `src/app/work/**` + `src/app/contact/page.tsx`, `src/hooks/*`, `src/lib/animations/*`, `src/lib/utils.ts`, `src/data/{testimonials,blog,team,services}.ts`; deps `framer-motion`, `@studio-freight/lenis`, `lucide-react`.

---

### Task 1: Foundation — dependencies, fonts, design tokens

**Files:**
- Modify: `package.json` (via npm commands)
- Create: `src/fonts/ClashDisplay-Variable.woff2`, `src/fonts/GeneralSans-Variable.woff2` (downloads)
- Create: `src/lib/fonts.ts`
- Rewrite: `tailwind.config.ts`, `src/app/globals.css`
- Read/verify: `tsconfig.json` (`@/*` alias), `next.config.ts` (Unsplash remote pattern)

**Interfaces:**
- Produces: font exports `clash`, `general`, `instrument`, `jetbrains` (each with `.variable`) from `@/lib/fonts`; Tailwind tokens `ink/paper/vermilion`, `font-display/body/serif/mono`, `text-display-2xl/xl/lg/md`, `text-meta`; CSS utilities `.hairline`, `.animate-marquee`; CSS vars `--world-bg`, `--world-fg`.

- [ ] **Step 1: Install new deps (old ones stay until Task 2)**

Run:
```powershell
npm install gsap@^3.13.0 lenis@^1.3.0
```
Expected: both appear in `package.json` dependencies. Verify SplitText exists: `Test-Path node_modules\gsap\SplitText.js` → `True`.

- [ ] **Step 2: Download variable fonts from Fontshare**

```powershell
New-Item -ItemType Directory -Force src\fonts | Out-Null
Invoke-WebRequest -Uri "https://api.fontshare.com/v2/fonts/download/clash-display" -OutFile "$env:TEMP\clash.zip"
Expand-Archive "$env:TEMP\clash.zip" "$env:TEMP\clash" -Force
Get-ChildItem "$env:TEMP\clash" -Recurse -Filter "ClashDisplay-Variable.woff2" | Select-Object -First 1 | Copy-Item -Destination "src\fonts\ClashDisplay-Variable.woff2"
Invoke-WebRequest -Uri "https://api.fontshare.com/v2/fonts/download/general-sans" -OutFile "$env:TEMP\general.zip"
Expand-Archive "$env:TEMP\general.zip" "$env:TEMP\general" -Force
Get-ChildItem "$env:TEMP\general" -Recurse -Filter "GeneralSans-Variable.woff2" | Select-Object -First 1 | Copy-Item -Destination "src\fonts\GeneralSans-Variable.woff2"
Test-Path src\fonts\ClashDisplay-Variable.woff2; Test-Path src\fonts\GeneralSans-Variable.woff2
```
Expected: `True` / `True`. (Fallback if the API changes: download the family zips manually from fontshare.com and copy the `*-Variable.woff2` files from the `Variable`/`WEB` folder.)

- [ ] **Step 3: Create `src/lib/fonts.ts`**

```ts
import localFont from "next/font/local";
import { Instrument_Serif, JetBrains_Mono } from "next/font/google";

export const clash = localFont({
  src: "../fonts/ClashDisplay-Variable.woff2",
  variable: "--font-clash",
  weight: "200 700",
  display: "swap",
});

export const general = localFont({
  src: "../fonts/GeneralSans-Variable.woff2",
  variable: "--font-general",
  weight: "200 700",
  display: "swap",
});

export const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

export const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});
```

- [ ] **Step 4: Rewrite `tailwind.config.ts` (full replacement)**

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#111110",
        paper: "#F2EFE9",
        vermilion: "#E8390E",
      },
      fontFamily: {
        display: ["var(--font-clash)", "sans-serif"],
        body: ["var(--font-general)", "sans-serif"],
        serif: ["var(--font-instrument)", "serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      fontSize: {
        "display-2xl": ["clamp(3.25rem, 11vw, 10rem)", { lineHeight: "0.92", letterSpacing: "-0.02em" }],
        "display-xl": ["clamp(2.75rem, 7.5vw, 6.5rem)", { lineHeight: "0.95", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(1.9rem, 4.5vw, 3.6rem)", { lineHeight: "1.05", letterSpacing: "-0.01em" }],
        "display-md": ["clamp(1.4rem, 2.6vw, 2.1rem)", { lineHeight: "1.15" }],
        meta: ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.14em" }],
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 5: Rewrite `src/app/globals.css` (full replacement — all old utilities die here)**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --ink: #111110;
  --paper: #f2efe9;
  --vermilion: #e8390e;
  --world-bg: var(--ink);
  --world-fg: var(--paper);
}

@layer base {
  body {
    background-color: var(--world-bg);
    color: var(--world-fg);
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  ::selection {
    background: var(--vermilion);
    color: var(--paper);
  }

  :focus-visible {
    outline: 2px solid var(--vermilion);
    outline-offset: 3px;
  }

  /* Lenis (https://github.com/darkroomengineering/lenis) */
  html.lenis,
  html.lenis body {
    height: auto;
  }
  .lenis.lenis-smooth {
    scroll-behavior: auto !important;
  }
  .lenis.lenis-smooth [data-lenis-prevent] {
    overscroll-behavior: contain;
  }
  .lenis.lenis-stopped {
    overflow: hidden;
  }
}

@layer utilities {
  /* 18% currentColor border — the editorial hairline used on every rule line */
  .hairline {
    border-color: color-mix(in srgb, currentColor 18%, transparent);
  }

  .animate-marquee {
    animation: marquee linear infinite;
  }
}

@keyframes marquee {
  to {
    transform: translateX(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .animate-marquee {
    animation: none;
  }
}
```

- [ ] **Step 6: Verify config files**

Read `tsconfig.json` — confirm `"paths": { "@/*": ["./src/*"] }` exists (add if missing). Read `next.config.ts` — confirm `images.remotePatterns` (or `domains`) allows `images.unsplash.com` (keep as-is).

- [ ] **Step 7: Build gate**

Run: `npm run build`
Expected: compiles successfully. The old pages will look unstyled/broken visually (old tokens gone) — that is expected and fine; only compilation matters here.

- [ ] **Step 8: Commit**

```powershell
git add -A; git commit -m "feat: foundation - fonts, design tokens, gsap+lenis for editorial rebuild"
```

---

### Task 2: Demolition + new data layer

Delete the entire old UI in one sweep and install the new data layer, so the tree is clean-slate and every later task is additive. The site becomes a bare stub after this task — intentional.

**Files:**
- Delete: `src/components/sections/` (all), `src/components/layout/` (all), `src/app/blog/` (all), `src/app/services/page.tsx`, `src/app/team/page.tsx`, `src/app/work/page.tsx`, `src/app/work/[slug]/page.tsx`, `src/app/contact/page.tsx`, `src/hooks/` (all), `src/lib/animations/` (all), `src/lib/utils.ts`, `src/data/testimonials.ts`, `src/data/blog.ts`, `src/data/team.ts`, `src/data/services.ts`
- Create: `src/data/site.ts`, `src/data/capabilities.ts`, `src/data/studio.ts`
- Rewrite: `src/data/projects.ts`, `src/data/navigation.ts`, `src/app/layout.tsx` (stub), `src/app/page.tsx` (stub), `src/app/not-found.tsx` (stub)
- Modify: `package.json` (uninstall old deps)

**Interfaces:**
- Produces (consumed by all later tasks):
  - `@/data/site`: `SITE = { name, wordmark, tagline, description, email, whatsappUrl, location, coords, est, github, url }` (all `string`)
  - `@/data/projects`: `type Project = { slug: string; title: string; category: string; year: string; status: "Concept"; summary: string; role: string[]; stack: string[]; cover: string; images: string[]; body: { heading: string; text: string }[] }`; `projects: Project[]` (4 items)
  - `@/data/capabilities`: `type Capability = { index: string; title: string; description: string; items: string[] }`; `capabilities: Capability[]` (3 items)
  - `@/data/studio`: `studio = { intro: string; story: string[]; principles: { title: string; text: string }[] }`
  - `@/data/navigation`: `navLinks: { label: string; href: string }[]`

- [ ] **Step 1: Delete old UI wholesale**

(Folder-level recursive deletes only — never pass `src\app\work\[slug]\...` to `Remove-Item` without `-LiteralPath`, because `[` is a PowerShell wildcard.)

```powershell
Remove-Item -Recurse -Force src\components\sections, src\components\layout, src\hooks, src\lib\animations
Remove-Item -Recurse -Force src\app\blog, src\app\services, src\app\team, src\app\work, src\app\contact
Remove-Item -Force src\lib\utils.ts, src\data\testimonials.ts, src\data\blog.ts, src\data\team.ts, src\data\services.ts
```
(`/work` and `/contact` get recreated fresh in Tasks 8/10.)

- [ ] **Step 2: Create `src/data/site.ts`**

```ts
export const SITE = {
  name: "TrinityDev",
  wordmark: "TrinityDev",
  tagline: "Digital experiences that refuse to blend in.",
  description:
    "TrinityDev is an independent web studio in Jakarta. Strategy, design, engineering — digital experiences that refuse to blend in.",
  email: "hello@trinitydev.io",
  whatsappUrl: "https://wa.me/6289615219160",
  location: "Jakarta, ID",
  coords: "6.2°S 106.8°E",
  est: "EST. 2026",
  github: "https://github.com/KevinTegar",
  url: "https://trinitydev.io",
} as const;
```

- [ ] **Step 3: Rewrite `src/data/projects.ts`**

```ts
export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  status: "Concept";
  summary: string;
  role: string[];
  stack: string[];
  cover: string;
  images: string[];
  body: { heading: string; text: string }[];
};

export const projects: Project[] = [
  {
    slug: "vortal-commerce",
    title: "Vortal",
    category: "E-commerce",
    year: "2026",
    status: "Concept",
    summary:
      "A concept storefront that treats shopping like editorial browsing — zero clutter, full focus on the product.",
    role: ["Strategy", "UX/UI Design", "Development"],
    stack: ["Next.js", "Tailwind CSS", "Stripe (mock)"],
    cover:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1600&auto=format&fit=crop",
    ],
    body: [
      {
        heading: "The premise",
        text: "Most storefronts bury the product under chrome — banners, badges, popups fighting for attention. Vortal strips commerce back to its essentials: typography, photography, and a checkout that never pulls you out of the flow.",
      },
      {
        heading: "The build",
        text: "Static-first Next.js with edge-cached product pages, optimistic cart state, and a component system tuned for conversion without a single dark pattern. Sub-second loads on mid-range phones was the acceptance bar.",
      },
    ],
  },
  {
    slug: "healthease-app",
    title: "HealthEase",
    category: "Product design",
    year: "2026",
    status: "Concept",
    summary:
      "A concept patient portal that makes booking a doctor feel as easy as ordering coffee.",
    role: ["Strategy", "Product Design", "Prototyping"],
    stack: ["Figma", "Next.js", "PostgreSQL (schema)"],
    cover:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=1600&auto=format&fit=crop",
    ],
    body: [
      {
        heading: "The premise",
        text: "Healthcare UX punishes the people who need it most. HealthEase reframes the patient portal around one job — get me in front of the right doctor, fast — and pushes everything else behind progressive disclosure.",
      },
      {
        heading: "The design",
        text: "A three-tap booking flow, plain-language medical copy, and an interface that stays calm under stress: high contrast, generous targets, zero decorative noise. Prototyped end-to-end and validated against WCAG AA.",
      },
    ],
  },
  {
    slug: "fintrack-dashboard",
    title: "FinTrack",
    category: "SaaS dashboard",
    year: "2026",
    status: "Concept",
    summary:
      "A concept finance dashboard where clarity beats decoration — dense data, calm interface.",
    role: ["UX Architecture", "UI Design", "Development"],
    stack: ["Next.js", "TypeScript", "Recharts"],
    cover:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1600&auto=format&fit=crop",
    ],
    body: [
      {
        heading: "The premise",
        text: "Finance tools confuse density with depth. FinTrack bets the other way: fewer numbers, better hierarchy. Every screen answers one question first — am I okay? — before offering the drill-down.",
      },
      {
        heading: "The build",
        text: "A typed design system where every chart, table and stat tile shares one visual grammar. Built with server components for instant first paint and client interactivity only where data actually moves.",
      },
    ],
  },
  {
    slug: "groceria-redesign",
    title: "Groceria",
    category: "Brand & web",
    year: "2026",
    status: "Concept",
    summary:
      "A concept rebrand for a neighborhood grocery chain — warm, honest, and unmistakably Indonesian.",
    role: ["Brand Identity", "Design System", "Development"],
    stack: ["Identity", "Design tokens", "Next.js"],
    cover:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534723452862-4c874018d66d?q=80&w=1600&auto=format&fit=crop",
    ],
    body: [
      {
        heading: "The premise",
        text: "Local chains keep borrowing the visual language of global retail and losing themselves in it. Groceria goes the opposite way: market-stall warmth, honest pricing typography, photography that smells like morning produce.",
      },
      {
        heading: "The system",
        text: "One identity that scales from shelf labels to the web storefront — shared color tokens, one type family, and a component library the in-house team could actually maintain.",
      },
    ],
  },
];
```

- [ ] **Step 4: Create `src/data/capabilities.ts`**

```ts
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
```

- [ ] **Step 5: Create `src/data/studio.ts`**

```ts
export const studio = {
  intro:
    "TrinityDev is an independent, founder-led web studio in Jakarta — three disciplines, one obsession.",
  story: [
    "TrinityDev started with a simple irritation: most business websites are interchangeable. Same templates, same stock energy, same forgettable scroll. We think the web deserves better — and that ambitious businesses deserve world-class work without flying in a world-class agency.",
    "The studio is founder-led by design. Every project gets senior attention from first call to launch — no account managers, no hand-offs, no juniors learning on your budget. When a project needs more hands, we pull from a small network of trusted specialists.",
  ],
  principles: [
    {
      title: "Craft over volume",
      text: "We take on few projects and go deep. The goal is work we would sign publicly — because we do.",
    },
    {
      title: "Honest by default",
      text: "Concept work is labeled concept. Timelines are real. If something will not move the needle, we say so before you pay for it.",
    },
    {
      title: "Performance is design",
      text: "A beautiful site that loads slowly is a broken site. Speed, accessibility and SEO are part of the design brief, not an afterthought.",
    },
    {
      title: "Small team, senior work",
      text: "You talk to the person building your site. Decisions happen in days, not steering committees.",
    },
  ],
} as const;
```

- [ ] **Step 6: Rewrite `src/data/navigation.ts`**

```ts
export const navLinks = [
  { label: "Work", href: "/work" },
  { label: "Studio", href: "/studio" },
  { label: "Contact", href: "/contact" },
];
```

- [ ] **Step 7: Stub `src/app/layout.tsx` (full file — replaced with the real chrome in Task 5)**

```tsx
import type { Metadata, Viewport } from "next";
import { clash, general, instrument, jetbrains } from "@/lib/fonts";
import { SITE } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} — Digital Studio`, template: `%s — ${SITE.name}` },
  description: SITE.description,
};

export const viewport: Viewport = { themeColor: "#111110" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${clash.variable} ${general.variable} ${instrument.variable} ${jetbrains.variable}`}
    >
      <body className="font-body">
        <main id="main">{children}</main>
      </body>
    </html>
  );
}
```

- [ ] **Step 8: Stub `src/app/page.tsx` (full file — replaced in Task 7)**

```tsx
export default function Home() {
  return (
    <section data-world="ink" className="flex min-h-svh items-end px-4 pb-10 md:px-10">
      <h1 className="font-display text-display-2xl uppercase">TrinityDev</h1>
    </section>
  );
}
```

- [ ] **Step 9: Stub `src/app/not-found.tsx` (full file — replaced in Task 10)**

```tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <section data-world="ink" className="flex min-h-svh flex-col items-start justify-end px-4 pb-10 md:px-10">
      <h1 className="font-display text-display-2xl uppercase">404</h1>
      <Link href="/" className="mt-6 font-mono text-meta uppercase underline">
        Back home
      </Link>
    </section>
  );
}
```

- [ ] **Step 10: Uninstall dead dependencies**

```powershell
npm uninstall framer-motion @studio-freight/lenis lucide-react
```
Then verify nothing still imports them:
```powershell
Get-ChildItem src -Recurse -Include *.tsx,*.ts | Select-String -Pattern "framer-motion|@studio-freight|lucide-react"
```
Expected: no output.

- [ ] **Step 11: Build gate**

Run: `npm run build`
Expected: compiles successfully; routes `/` and `/_not-found` only.

- [ ] **Step 12: Commit**

```powershell
git add -A; git commit -m "feat!: demolish old UI, install Editorial Ink & Paper data layer"
```

---

### Task 3: Motion core — GSAP setup, Lenis, World color system

**Files:**
- Create: `src/lib/motion/index.ts`, `src/lib/motion/lenis-store.ts`
- Create: `src/components/global/SmoothScroll.tsx`, `src/components/global/WorldColor.tsx`
- Modify: `src/app/layout.tsx` (mount both)

**Interfaces:**
- Consumes: Tailwind tokens + CSS vars from Task 1.
- Produces:
  - `@/lib/motion`: `gsap`, `ScrollTrigger`, `SplitText` (registered), `EASE = { out: "expo.out", inOut: "expo.inOut", soft: "power2.out" }`, `DUR = { fast: 0.5, base: 0.9, slow: 1.2 }`, `MOTION_OK` / `POINTER_FINE` (matchMedia strings), `INTRO_DONE_EVENT = "td:intro-done"`, `INTRO_SEEN_KEY = "td-intro-seen"`, `WORLD = { ink, paper }`, `prefersReducedMotion(): boolean`
  - `@/lib/motion/lenis-store`: `lenisStore: { current: Lenis | null }`, `scrollToTop(immediate?: boolean): void`
  - `<SmoothScroll />`, `<WorldColor />` — render-null client components mounted once in layout.

- [ ] **Step 1: Create `src/lib/motion/index.ts`**

```ts
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
```

- [ ] **Step 2: Create `src/lib/motion/lenis-store.ts`**

```ts
import type Lenis from "lenis";

export const lenisStore: { current: Lenis | null } = { current: null };

export function scrollToTop(immediate = true) {
  if (lenisStore.current) {
    lenisStore.current.scrollTo(0, { immediate });
  } else {
    window.scrollTo(0, 0);
  }
}
```

- [ ] **Step 3: Create `src/components/global/SmoothScroll.tsx`**

```tsx
"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/motion";
import { lenisStore } from "@/lib/motion/lenis-store";

export default function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({ lerp: 0.12 });
    lenisStore.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisStore.current = null;
    };
  }, []);

  return null;
}
```

- [ ] **Step 4: Create `src/components/global/WorldColor.tsx`**

Tweens `--world-bg`/`--world-fg` on `<html>` whenever a `[data-world]` section crosses the viewport midline. Re-scans on every route change.

```tsx
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
```

- [ ] **Step 5: Mount in `src/app/layout.tsx`**

Add imports and render both just before `</body>`:

```tsx
import SmoothScroll from "@/components/global/SmoothScroll";
import WorldColor from "@/components/global/WorldColor";
```
```tsx
      <body className="font-body">
        <main id="main">{children}</main>
        <SmoothScroll />
        <WorldColor />
      </body>
```

- [ ] **Step 6: Build gate + smoke check**

Run: `npm run build` → compiles.
Run `npm run dev`, open `http://localhost:3000` — smooth scroll active (stub page), no console errors. Stop server.

- [ ] **Step 7: Commit**

```powershell
git add -A; git commit -m "feat: motion core - gsap/lenis setup and ink-paper world color system"
```

---

### Task 4: UI primitives — Magnetic, Marquee, Reveal, ImageReveal, underline

**Files:**
- Create: `src/components/ui/Magnetic.tsx`, `src/components/ui/Marquee.tsx`, `src/components/ui/Reveal.tsx`, `src/components/ui/ImageReveal.tsx`, `src/components/ui/underline.ts`

**Interfaces:**
- Consumes: `@/lib/motion`, `@/lib/cn` (existing `cn()` helper).
- Produces:
  - `<Magnetic strength?: number className?: string>{children}</Magnetic>` — pointer-magnet wrapper (desktop + motion-ok only)
  - `<Marquee duration?: number className?: string>{children}</Marquee>` — seamless loop; content is rendered twice internally (second copy `aria-hidden`)
  - `<Reveal y?: number delay?: number className?: string as?: "div"|"section"|"li">{children}</Reveal>` — fade/slide-in on scroll, once
  - `<ImageReveal className parallax?: number>{<Image fill/>}</ImageReveal>` — clip-reveal (inset bottom→top) + scale 1.15→1, optional scrub parallax; `className` MUST carry the aspect/size (e.g. `aspect-[16/10]`)
  - `underline: string` — className string for the slide-underline hover effect

- [ ] **Step 1: Create `src/components/ui/Magnetic.tsx`**

```tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap, MOTION_OK, POINTER_FINE } from "@/lib/motion";
import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  strength?: number;
  className?: string;
};

export default function Magnetic({ children, strength = 0.35, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add(`${MOTION_OK} and ${POINTER_FINE}`, () => {
      const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });

      const onMove = (e: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        xTo((e.clientX - (rect.left + rect.width / 2)) * strength);
        yTo((e.clientY - (rect.top + rect.height / 2)) * strength);
      };
      const onLeave = () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
      };

      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      };
    });

    return () => mm.revert();
  }, [strength]);

  return (
    <div ref={ref} className={cn("inline-block", className)}>
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Create `src/components/ui/Marquee.tsx`**

```tsx
import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  duration?: number;
  className?: string;
};

export default function Marquee({ children, duration = 24, className }: Props) {
  return (
    <div className={cn("flex overflow-hidden whitespace-nowrap", className)}>
      <div
        className="animate-marquee flex shrink-0 items-center"
        style={{ animationDuration: `${duration}s` }}
      >
        <span className="flex items-center">{children}</span>
        <span className="flex items-center" aria-hidden="true">
          {children}
        </span>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create `src/components/ui/Reveal.tsx`**

```tsx
"use client";

import { createElement, useEffect, useRef } from "react";
import { gsap, EASE, DUR, MOTION_OK } from "@/lib/motion";

type Props = {
  children: React.ReactNode;
  y?: number;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li";
};

export default function Reveal({ children, y = 32, delay = 0, className, as = "div" }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const tween = gsap.from(el, {
        opacity: 0,
        y,
        duration: DUR.base,
        delay,
        ease: EASE.out,
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, [y, delay]);

  return createElement(as, { ref, className }, children);
}
```

- [ ] **Step 4: Create `src/components/ui/ImageReveal.tsx`**

Clip-reveal + inner scale per the spec's image motion. With `parallax > 0` the inner layer rests at scale 1.08 so the vertical drift never exposes edges.

```tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap, EASE, MOTION_OK } from "@/lib/motion";
import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  className?: string;
  parallax?: number;
};

export default function ImageReveal({ children, className, parallax = 0 }: Props) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const restScale = parallax > 0 ? 1.08 : 1;
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const reveal = gsap.timeline({
        scrollTrigger: { trigger: outer, start: "top 85%", once: true },
      });
      reveal
        .fromTo(
          outer,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: EASE.inOut }
        )
        .fromTo(inner, { scale: 1.15 }, { scale: restScale, duration: 1.1, ease: EASE.inOut }, 0);

      let drift: gsap.core.Tween | undefined;
      if (parallax > 0) {
        drift = gsap.fromTo(
          inner,
          { yPercent: -parallax },
          {
            yPercent: parallax,
            ease: "none",
            scrollTrigger: { trigger: outer, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      }
      return () => {
        reveal.scrollTrigger?.kill();
        reveal.kill();
        drift?.scrollTrigger?.kill();
        drift?.kill();
      };
    });

    return () => mm.revert();
  }, [parallax]);

  return (
    <div ref={outerRef} className={cn("relative overflow-hidden", className)}>
      <div ref={innerRef} className="absolute inset-0">
        {children}
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Create `src/components/ui/underline.ts`**

```ts
/** Slide-in underline on hover/focus — append to any inline link's className. */
export const underline =
  "relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-full " +
  "after:origin-right after:scale-x-0 after:bg-current after:transition-transform " +
  "after:duration-500 after:ease-out hover:after:origin-left hover:after:scale-x-100 " +
  "focus-visible:after:origin-left focus-visible:after:scale-x-100";
```

- [ ] **Step 6: Build gate**

Run: `npm run build` → compiles (components exist but are not yet consumed).

- [ ] **Step 7: Commit**

```powershell
git add -A; git commit -m "feat: ui primitives - magnetic, marquee, reveal, image-reveal, underline"
```

---

### Task 5: Global chrome — PageTransition, Nav, MenuOverlay, LocalTime, Footer, real layout

**Files:**
- Create: `src/components/global/PageTransition.tsx`, `src/components/global/Nav.tsx`, `src/components/global/MenuOverlay.tsx`, `src/components/global/LocalTime.tsx`, `src/components/global/Footer.tsx`
- Rewrite: `src/app/layout.tsx` (final version)

**Interfaces:**
- Consumes: `@/lib/motion`, `@/lib/motion/lenis-store`, `@/data/site`, `@/data/navigation`, `underline` from `@/components/ui/underline`, `Magnetic`.
- Produces:
  - `TransitionProvider` (wraps app), `useTransition(): { navigate(href: string): void }`, `TransitionLink` (drop-in `next/link` replacement; props = `React.ComponentProps<typeof Link>`)
  - `<Nav />`, `<Footer />`, `<LocalTime />` (renders `HH:MM:SS JKT`, hydration-safe)
  - `MenuOverlay` is internal to Nav (props `{ open: boolean; onClose: () => void }`).

- [ ] **Step 1: Create `src/components/global/PageTransition.tsx`**

```tsx
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
```

- [ ] **Step 2: Create `src/components/global/LocalTime.tsx`**

```tsx
"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Jakarta",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

export default function LocalTime({ className }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className={className} suppressHydrationWarning>
      {time ?? "--:--:--"} JKT
    </span>
  );
}
```

- [ ] **Step 3: Create `src/components/global/MenuOverlay.tsx`**

Stays mounted; toggled with `autoAlpha` (GSAP manages `visibility`, which also removes it from the tab order when closed).

```tsx
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
```

- [ ] **Step 4: Create `src/components/global/Nav.tsx`**

```tsx
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
```

- [ ] **Step 5: Create `src/components/global/Footer.tsx`**

```tsx
import { navLinks } from "@/data/navigation";
import { SITE } from "@/data/site";
import { TransitionLink } from "@/components/global/PageTransition";
import LocalTime from "@/components/global/LocalTime";
import Magnetic from "@/components/ui/Magnetic";
import { underline } from "@/components/ui/underline";
import { cn } from "@/lib/cn";

export default function Footer() {
  return (
    <footer data-world="ink" className="relative overflow-hidden px-4 pt-24 md:px-10">
      <div className="grid gap-12 border-t hairline pt-12 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <p className="font-mono text-meta uppercase">Have a project in mind?</p>
          <Magnetic className="mt-4">
            <TransitionLink
              href="/contact"
              className="inline-block font-display text-display-lg uppercase text-vermilion"
            >
              Start a project ↗
            </TransitionLink>
          </Magnetic>
        </div>
        <nav aria-label="Footer">
          <p className="font-mono text-meta uppercase opacity-60">Sitemap</p>
          <ul className="mt-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <TransitionLink href={link.href} className={cn("text-sm uppercase", underline)}>
                  {link.label}
                </TransitionLink>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="font-mono text-meta uppercase opacity-60">Reach us</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={`mailto:${SITE.email}`} className={cn(underline)}>
                {SITE.email}
              </a>
            </li>
            <li>
              <a
                href={SITE.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(underline)}
              >
                WhatsApp ↗
              </a>
            </li>
            <li>
              <a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(underline)}
              >
                GitHub ↗
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-16 flex flex-wrap items-center justify-between gap-3 border-t hairline py-5 font-mono text-meta uppercase">
        <span>© 2026 {SITE.name} — {SITE.location}</span>
        <LocalTime />
        <span>
          {SITE.est} <span aria-hidden="true">△</span> {SITE.coords}
        </span>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none -mb-[7vw] translate-y-[24%] select-none whitespace-nowrap font-display text-[19vw] font-medium uppercase leading-none"
      >
        {SITE.wordmark}
      </div>
    </footer>
  );
}
```

- [ ] **Step 6: Rewrite `src/app/layout.tsx` (final)**

```tsx
import type { Metadata, Viewport } from "next";
import { clash, general, instrument, jetbrains } from "@/lib/fonts";
import { SITE } from "@/data/site";
import { TransitionProvider } from "@/components/global/PageTransition";
import Nav from "@/components/global/Nav";
import Footer from "@/components/global/Footer";
import SmoothScroll from "@/components/global/SmoothScroll";
import WorldColor from "@/components/global/WorldColor";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} — Digital Studio`, template: `%s — ${SITE.name}` },
  description: SITE.description,
  openGraph: {
    title: `${SITE.name} — Digital Studio`,
    description: SITE.tagline,
    url: SITE.url,
    siteName: SITE.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Digital Studio`,
    description: SITE.tagline,
  },
};

export const viewport: Viewport = { themeColor: "#111110" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${clash.variable} ${general.variable} ${instrument.variable} ${jetbrains.variable}`}
    >
      <body className="font-body">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-vermilion focus:px-4 focus:py-2 focus:font-mono focus:text-meta focus:uppercase focus:text-paper"
        >
          Skip to content
        </a>
        <TransitionProvider>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </TransitionProvider>
        <SmoothScroll />
        <WorldColor />
      </body>
    </html>
  );
}
```

- [ ] **Step 7: Build gate + smoke check**

Run: `npm run build` → compiles.
Run `npm run dev` → nav renders with blend-difference over the stub page, footer with giant cropped wordmark, mobile menu opens/closes (Escape works), local time ticks. Stop server.

- [ ] **Step 8: Commit**

```powershell
git add -A; git commit -m "feat: global chrome - nav, menu overlay, footer, curtain page transitions"
```

---

### Task 6: Preloader + custom Cursor

**Files:**
- Create: `src/components/global/Preloader.tsx`, `src/components/global/Cursor.tsx`
- Modify: `src/app/layout.tsx` (mount both)

**Interfaces:**
- Consumes: `@/lib/motion` (`INTRO_SEEN_KEY`, `INTRO_DONE_EVENT`, `EASE`, `prefersReducedMotion`), `@/data/site`.
- Produces: `<Preloader />` — plays once per browser session, sets `sessionStorage[INTRO_SEEN_KEY]="1"`, dispatches `window` event `INTRO_DONE_EVENT` when finished (Task 7's Hero listens for it). `<Cursor />` — desktop-only dot; any element with a `data-cursor="<label>"` attribute grows the dot and shows the label.

- [ ] **Step 1: Create `src/components/global/Preloader.tsx`**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, EASE, INTRO_DONE_EVENT, INTRO_SEEN_KEY, prefersReducedMotion } from "@/lib/motion";
import { SITE } from "@/data/site";

export default function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const finish = () => {
      sessionStorage.setItem(INTRO_SEEN_KEY, "1");
      window.dispatchEvent(new Event(INTRO_DONE_EVENT));
      document.documentElement.style.overflow = "";
      setDone(true);
    };

    if (sessionStorage.getItem(INTRO_SEEN_KEY) === "1" || prefersReducedMotion()) {
      finish();
      return;
    }

    document.documentElement.style.overflow = "hidden";
    const counter = { v: 0 };
    const tl = gsap.timeline({ onComplete: finish });
    tl.to(counter, {
      v: 100,
      duration: 1.4,
      ease: "power2.inOut",
      onUpdate: () => {
        if (countRef.current) {
          countRef.current.textContent = String(Math.round(counter.v)).padStart(3, "0");
        }
      },
    }).to(rootRef.current, { yPercent: -100, duration: 0.9, ease: EASE.inOut }, "+=0.15");

    return () => {
      tl.kill();
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="fixed inset-0 z-[90] flex items-end justify-between bg-ink p-6 text-paper md:p-10"
    >
      <span className="font-display text-display-md uppercase">
        {SITE.wordmark}
        <span className="align-super text-[0.5em]">®</span>
      </span>
      <span ref={countRef} className="font-mono text-meta">
        000
      </span>
    </div>
  );
}
```

Note: on repeat visits SSR paints the overlay for one frame before the effect removes it — acceptable; do not "fix" this with `opacity-0` classes (that would hide it forever under reduced motion).

- [ ] **Step 2: Create `src/components/global/Cursor.tsx`**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, MOTION_OK, POINTER_FINE } from "@/lib/motion";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    const mm = gsap.matchMedia();
    mm.add(`${MOTION_OK} and ${POINTER_FINE}`, () => {
      gsap.set(dot, { xPercent: -50, yPercent: -50 });
      const xTo = gsap.quickTo(dot, "x", { duration: 0.25, ease: "power3.out" });
      const yTo = gsap.quickTo(dot, "y", { duration: 0.25, ease: "power3.out" });

      const onMove = (e: PointerEvent) => {
        gsap.to(dot, { autoAlpha: 1, duration: 0.2 });
        xTo(e.clientX);
        yTo(e.clientY);
      };
      const onOver = (e: Event) => {
        const target = (e.target as HTMLElement).closest?.("[data-cursor]") as HTMLElement | null;
        setLabel(target?.dataset.cursor ?? null);
      };
      const onLeaveWindow = () => gsap.to(dot, { autoAlpha: 0, duration: 0.2 });

      window.addEventListener("pointermove", onMove);
      document.addEventListener("mouseover", onOver);
      document.documentElement.addEventListener("mouseleave", onLeaveWindow);
      return () => {
        window.removeEventListener("pointermove", onMove);
        document.removeEventListener("mouseover", onOver);
        document.documentElement.removeEventListener("mouseleave", onLeaveWindow);
      };
    });

    return () => mm.revert();
  }, []);

  useEffect(() => {
    if (dotRef.current) {
      gsap.to(dotRef.current, { scale: label ? 6 : 1, duration: 0.35, ease: "power3.out" });
    }
  }, [label]);

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[95] hidden h-3 w-3 items-center justify-center rounded-full bg-paper opacity-0 mix-blend-difference md:flex"
    >
      {label && (
        <span className="font-mono text-[2.5px] uppercase tracking-widest text-ink">{label}</span>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Mount both in `src/app/layout.tsx`**

Add imports and render `<Preloader />` as the first child inside `<TransitionProvider>` (before `<Nav />`), and `<Cursor />` next to `<SmoothScroll />`:

```tsx
import Preloader from "@/components/global/Preloader";
import Cursor from "@/components/global/Cursor";
```
```tsx
        <TransitionProvider>
          <Preloader />
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </TransitionProvider>
        <SmoothScroll />
        <WorldColor />
        <Cursor />
```

- [ ] **Step 4: Build gate + smoke check**

`npm run build` → compiles. `npm run dev`: hard-refresh in a fresh tab → counter runs 000→100, curtain lifts; reload again → no preloader (sessionStorage). Cursor dot follows pointer on desktop. Stop server.

- [ ] **Step 5: Commit**

```powershell
git add -A; git commit -m "feat: preloader with session gate and custom cursor"
```

---

### Task 7: Home page — Hero, Manifesto, WorkList, SelectedWork, Capabilities, CtaMarquee

**Files:**
- Create: `src/components/home/Hero.tsx`, `src/components/home/Manifesto.tsx`, `src/components/work/WorkList.tsx`, `src/components/home/SelectedWork.tsx`, `src/components/home/Capabilities.tsx`, `src/components/home/CtaMarquee.tsx`
- Rewrite: `src/app/page.tsx` (final)

**Interfaces:**
- Consumes: everything produced in Tasks 2–6.
- Produces: `<WorkList projects={Project[]} />` (client; reused by `/work` in Task 8). All other components take no props.

- [ ] **Step 1: Create `src/components/home/Hero.tsx`**

Waits for the preloader on first visit (via `INTRO_DONE_EVENT`), plays immediately on subsequent navigations. Under reduced motion the text is simply visible (no hidden states are ever applied).

```tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap, EASE, MOTION_OK, INTRO_DONE_EVENT, INTRO_SEEN_KEY } from "@/lib/motion";
import { SITE } from "@/data/site";

export default function Hero() {
  const scopeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const lines = scope.querySelectorAll("[data-hero-line]");
      const meta = scope.querySelectorAll("[data-hero-meta]");
      gsap.set(lines, { yPercent: 110 });
      gsap.set(meta, { opacity: 0, y: 12 });

      const play = () => {
        gsap
          .timeline()
          .to(lines, { yPercent: 0, duration: 1.1, ease: EASE.out, stagger: 0.09 })
          .to(meta, { opacity: 1, y: 0, duration: 0.7, ease: EASE.soft, stagger: 0.08 }, "-=0.5");
      };

      if (sessionStorage.getItem(INTRO_SEEN_KEY) === "1") {
        play();
      } else {
        window.addEventListener(INTRO_DONE_EVENT, play, { once: true });
      }
      return () => window.removeEventListener(INTRO_DONE_EVENT, play);
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={scopeRef}
      data-world="ink"
      className="relative flex min-h-svh flex-col justify-end px-4 pb-8 md:px-10 md:pb-12"
    >
      <h1 className="font-display text-display-2xl font-medium uppercase">
        <span className="block overflow-hidden">
          <span data-hero-line className="block">
            We build
          </span>
        </span>
        <span className="block overflow-hidden">
          <span data-hero-line className="block">
            digital experiences
          </span>
        </span>
        <span className="block overflow-hidden">
          <span data-hero-line className="block">
            that <em className="font-serif normal-case italic text-vermilion">refuse</em> to blend in
          </span>
        </span>
      </h1>
      <div className="mt-10 flex items-end justify-between gap-6 border-t hairline pt-5">
        <p data-hero-meta className="font-mono text-meta uppercase">
          ( Scroll )
        </p>
        <p data-hero-meta className="hidden font-mono text-meta uppercase sm:block">
          Independent web studio
        </p>
        <p data-hero-meta className="font-mono text-meta uppercase">
          {SITE.location} — {SITE.coords}
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `src/components/home/Manifesto.tsx`**

```tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap, SplitText, MOTION_OK } from "@/lib/motion";

export default function Manifesto() {
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const split = new SplitText(el, { type: "words" });
      gsap.set(split.words, { opacity: 0.12 });
      const tween = gsap.to(split.words, {
        opacity: 1,
        stagger: 0.06,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
          end: "bottom 45%",
          scrub: true,
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        split.revert();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section data-world="paper" className="px-4 py-28 md:px-10 md:py-44">
      <p className="font-mono text-meta uppercase">(01) — Manifesto</p>
      <p ref={textRef} className="mt-8 max-w-4xl font-display text-display-lg font-medium">
        TrinityDev is an independent web studio from Jakarta. Three disciplines — strategy,
        design, engineering — one obsession: work that outperforms its category. No templates.
        No bloat. Just craft.
      </p>
    </section>
  );
}
```

- [ ] **Step 3: Create `src/components/work/WorkList.tsx`** (shared by home + `/work`)

```tsx
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";
import { TransitionLink } from "@/components/global/PageTransition";
import { gsap, MOTION_OK, POINTER_FINE } from "@/lib/motion";

export default function WorkList({ projects }: { projects: Project[] }) {
  const previewRef = useRef<HTMLDivElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    const el = previewRef.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add(`${MOTION_OK} and ${POINTER_FINE}`, () => {
      const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
      const onMove = (e: PointerEvent) => {
        xTo(e.clientX - 144);
        yTo(e.clientY - 108);
      };
      window.addEventListener("pointermove", onMove);
      return () => window.removeEventListener("pointermove", onMove);
    });

    return () => mm.revert();
  }, []);

  useEffect(() => {
    if (previewRef.current) {
      gsap.to(previewRef.current, {
        autoAlpha: preview ? 1 : 0,
        scale: preview ? 1 : 0.92,
        duration: 0.35,
        ease: "power3.out",
      });
    }
  }, [preview]);

  return (
    <div>
      <ul onMouseLeave={() => setPreview(null)}>
        {projects.map((project, i) => (
          <li key={project.slug} className="border-t hairline last:border-b">
            <TransitionLink
              href={`/work/${project.slug}`}
              data-cursor="view"
              onMouseEnter={() => setPreview(project.cover)}
              className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-3 py-6 md:grid-cols-[3.5rem_1fr_auto_5rem] md:gap-8 md:py-8"
            >
              <span className="font-mono text-meta">({String(i + 1).padStart(2, "0")})</span>
              <span className="font-display text-display-lg font-medium uppercase leading-none transition-transform duration-500 ease-out group-hover:translate-x-2">
                {project.title}
                <span className="ml-3 hidden rounded-full border border-current px-2 py-0.5 align-middle font-mono text-meta uppercase md:inline-block">
                  Concept
                </span>
              </span>
              <span className="font-mono text-meta uppercase">{project.category}</span>
              <span className="hidden text-right font-mono text-meta md:block">{project.year}</span>
            </TransitionLink>
          </li>
        ))}
      </ul>
      <div
        ref={previewRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-40 hidden aspect-[4/3] w-72 overflow-hidden opacity-0 md:block"
      >
        {preview && (
          <Image src={preview} alt="" fill sizes="288px" className="object-cover" />
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create `src/components/home/SelectedWork.tsx`**

```tsx
import { projects } from "@/data/projects";
import WorkList from "@/components/work/WorkList";
import { TransitionLink } from "@/components/global/PageTransition";
import { underline } from "@/components/ui/underline";
import { cn } from "@/lib/cn";

export default function SelectedWork() {
  return (
    <section data-world="paper" className="px-4 pb-28 md:px-10 md:pb-40">
      <div className="mb-10 flex items-end justify-between">
        <p className="font-mono text-meta uppercase">(02) — Selected work</p>
        <p className="font-mono text-meta uppercase opacity-60">
          Self-initiated concepts ({String(projects.length).padStart(2, "0")})
        </p>
      </div>
      <WorkList projects={projects} />
      <div className="mt-10 flex justify-end">
        <TransitionLink href="/work" className={cn("font-mono text-meta uppercase", underline)}>
          All work ↗
        </TransitionLink>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Create `src/components/home/Capabilities.tsx`**

Accessible accordion using the CSS `grid-template-rows` transition trick (no height animation, no JS measurement).

```tsx
"use client";

import { useState } from "react";
import { capabilities } from "@/data/capabilities";

export default function Capabilities() {
  const [open, setOpen] = useState(0);

  return (
    <section data-world="paper" className="px-4 pb-32 md:px-10 md:pb-48">
      <p className="mb-10 font-mono text-meta uppercase">(03) — Capabilities</p>
      <ul>
        {capabilities.map((cap, i) => {
          const isOpen = open === i;
          return (
            <li key={cap.index} className="border-t hairline last:border-b">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                aria-controls={`cap-panel-${cap.index}`}
                className="grid w-full grid-cols-[3.5rem_1fr_auto] items-baseline gap-3 py-7 text-left md:gap-8"
              >
                <span className="font-mono text-meta text-vermilion">{cap.index}</span>
                <span className="font-display text-display-md font-medium uppercase">
                  {cap.title}
                </span>
                <span
                  aria-hidden="true"
                  className={`font-mono text-meta transition-transform duration-500 ${isOpen ? "rotate-45" : ""}`}
                >
                  +
                </span>
              </button>
              <div
                id={`cap-panel-${cap.index}`}
                className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <div className="grid gap-6 pb-8 pl-[3.5rem] md:grid-cols-2 md:gap-8">
                    <p className="max-w-md text-sm leading-relaxed opacity-80">{cap.description}</p>
                    <ul className="space-y-2">
                      {cap.items.map((item) => (
                        <li key={item} className="border-b hairline pb-2 font-mono text-meta uppercase">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
```

- [ ] **Step 6: Create `src/components/home/CtaMarquee.tsx`**

```tsx
import Marquee from "@/components/ui/Marquee";
import Magnetic from "@/components/ui/Magnetic";
import { TransitionLink } from "@/components/global/PageTransition";

export default function CtaMarquee() {
  return (
    <section data-world="ink" className="py-28 md:py-40">
      <Marquee duration={28} className="border-y hairline py-6">
        <span className="px-6 font-display text-display-xl font-medium uppercase">
          Let&apos;s build something rare
        </span>
        <span aria-hidden="true" className="px-6 font-display text-display-xl text-vermilion">
          △
        </span>
      </Marquee>
      <div className="mt-16 flex flex-col items-center gap-6 px-4 text-center">
        <p className="font-mono text-meta uppercase opacity-60">Currently booking — Q4 2026</p>
        <Magnetic>
          <TransitionLink
            href="/contact"
            data-cursor="open"
            className="inline-block border border-current px-10 py-5 font-display text-display-md font-medium uppercase transition-colors duration-300 hover:bg-vermilion hover:text-paper hover:border-vermilion"
          >
            Start a project ↗
          </TransitionLink>
        </Magnetic>
      </div>
    </section>
  );
}
```

- [ ] **Step 7: Rewrite `src/app/page.tsx` (final)**

```tsx
import Hero from "@/components/home/Hero";
import Manifesto from "@/components/home/Manifesto";
import SelectedWork from "@/components/home/SelectedWork";
import Capabilities from "@/components/home/Capabilities";
import CtaMarquee from "@/components/home/CtaMarquee";

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <SelectedWork />
      <Capabilities />
      <CtaMarquee />
    </>
  );
}
```

- [ ] **Step 8: Build gate + smoke check**

`npm run build` → compiles. `npm run dev` walkthrough: preloader → hero lines rise → scrolling past the manifesto flips the page to paper (background tween) → work rows show floating preview on hover → accordion opens → marquee scrolls → page flips back to ink at CTA/footer. Stop server.

- [ ] **Step 9: Commit**

```powershell
git add -A; git commit -m "feat: home page - hero, manifesto, selected work, capabilities, cta marquee"
```

---

### Task 8: Work index + case study pages

**Files:**
- Create: `src/app/work/page.tsx`, `src/app/work/[slug]/page.tsx`

**Interfaces:**
- Consumes: `projects`/`Project` from `@/data/projects`, `WorkList`, `Reveal`, `ImageReveal`, `TransitionLink`, `underline`.
- Produces: routes `/work`, `/work/[slug]` (static via `generateStaticParams`).

- [ ] **Step 1: Create `src/app/work/page.tsx`**

```tsx
import type { Metadata } from "next";
import { projects } from "@/data/projects";
import WorkList from "@/components/work/WorkList";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Self-initiated concept projects by TrinityDev — production-grade builds while our client roster grows.",
};

export default function WorkPage() {
  return (
    <>
      <section data-world="ink" className="flex min-h-[60svh] flex-col justify-end px-4 pb-10 md:px-10">
        <p className="font-mono text-meta uppercase">
          (Work) — Self-initiated · {String(projects.length).padStart(2, "0")} projects
        </p>
        <h1 className="mt-4 font-display text-display-2xl font-medium uppercase">
          Concept <em className="font-serif normal-case italic text-vermilion">work</em>
        </h1>
        <p className="mt-6 max-w-md text-sm leading-relaxed opacity-80">
          Concept projects while our client roster grows. Every build is held to production
          standards — performance, accessibility, and craft included.
        </p>
      </section>
      <section data-world="paper" className="px-4 py-24 md:px-10 md:py-32">
        <WorkList projects={projects} />
      </section>
    </>
  );
}
```

- [ ] **Step 2: Create `src/app/work/[slug]/page.tsx`**

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { TransitionLink } from "@/components/global/PageTransition";
import Reveal from "@/components/ui/Reveal";
import ImageReveal from "@/components/ui/ImageReveal";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};
  return {
    title: `${project.title} (Concept)`,
    description: project.summary,
  };
}

export default function CaseStudyPage({ params }: Props) {
  const index = projects.findIndex((p) => p.slug === params.slug);
  if (index === -1) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <section data-world="ink" className="flex min-h-[70svh] flex-col justify-end px-4 pb-10 md:px-10">
        <p className="font-mono text-meta uppercase">
          (Work / {String(index + 1).padStart(2, "0")}) —{" "}
          <span className="text-vermilion">Concept project</span>
        </p>
        <h1 className="mt-4 font-display text-display-2xl font-medium uppercase">{project.title}</h1>
        <p className="mt-6 max-w-xl text-sm leading-relaxed opacity-80">{project.summary}</p>
      </section>

      <section data-world="paper" className="px-4 py-16 md:px-10 md:py-24">
        <ImageReveal className="aspect-[16/10] w-full" parallax={6}>
          <Image
            src={project.cover}
            alt={`${project.title} — cover visual`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </ImageReveal>

        <dl className="mt-12 grid grid-cols-2 gap-8 border-t hairline pt-8 md:grid-cols-4">
          <div>
            <dt className="font-mono text-meta uppercase opacity-60">Role</dt>
            <dd className="mt-2 space-y-1 font-mono text-meta uppercase">
              {project.role.map((r) => (
                <p key={r}>{r}</p>
              ))}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-meta uppercase opacity-60">Stack</dt>
            <dd className="mt-2 space-y-1 font-mono text-meta uppercase">
              {project.stack.map((s) => (
                <p key={s}>{s}</p>
              ))}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-meta uppercase opacity-60">Year</dt>
            <dd className="mt-2 font-mono text-meta uppercase">{project.year}</dd>
          </div>
          <div>
            <dt className="font-mono text-meta uppercase opacity-60">Status</dt>
            <dd className="mt-2 font-mono text-meta uppercase text-vermilion">{project.status}</dd>
          </div>
        </dl>

        {project.body.map((section, i) => (
          <Reveal key={section.heading} className="mt-20 grid gap-6 md:grid-cols-[1fr_2fr] md:gap-12">
            <h2 className="font-display text-display-md font-medium uppercase">
              <span className="mr-3 font-mono text-meta text-vermilion">
                {String(i + 1).padStart(2, "0")}
              </span>
              {section.heading}
            </h2>
            <p className="max-w-2xl leading-relaxed opacity-90">{section.text}</p>
          </Reveal>
        ))}

        <div className="mt-20 grid gap-6 md:grid-cols-2">
          {project.images.map((src, i) => (
            <ImageReveal key={src} className="aspect-[4/3]">
              <Image
                src={src}
                alt={`${project.title} — detail ${i + 1}`}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </ImageReveal>
          ))}
        </div>
      </section>

      <section data-world="ink" className="px-4 py-24 md:px-10 md:py-32">
        <p className="font-mono text-meta uppercase opacity-60">Next project</p>
        <TransitionLink
          href={`/work/${next.slug}`}
          data-cursor="view"
          className="group mt-4 flex items-baseline justify-between border-t hairline pt-6"
        >
          <span className="font-display text-display-xl font-medium uppercase transition-transform duration-500 ease-out group-hover:translate-x-2">
            {next.title}
          </span>
          <span className="font-mono text-meta uppercase">{next.category} ↗</span>
        </TransitionLink>
      </section>
    </>
  );
}
```

- [ ] **Step 3: Build gate + smoke check**

`npm run build` → compiles; `/work` + 4 static case-study routes appear in the route list. Dev-check `/work` and one case study: hero, meta table with vermilion CONCEPT, next-project link cycles. Stop server.

- [ ] **Step 4: Commit**

```powershell
git add -A; git commit -m "feat: work index and case study pages"
```

---

### Task 9: Studio page

**Files:**
- Create: `src/app/studio/page.tsx`

**Interfaces:**
- Consumes: `studio` from `@/data/studio`, `capabilities` from `@/data/capabilities`, `Reveal`, `TransitionLink`, `underline`, `SITE`.
- Produces: route `/studio`.

- [ ] **Step 1: Create `src/app/studio/page.tsx`**

```tsx
import type { Metadata } from "next";
import { studio } from "@/data/studio";
import { capabilities } from "@/data/capabilities";
import { SITE } from "@/data/site";
import { TransitionLink } from "@/components/global/PageTransition";
import Reveal from "@/components/ui/Reveal";
import { underline } from "@/components/ui/underline";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Studio",
  description: studio.intro,
};

export default function StudioPage() {
  return (
    <>
      <section data-world="ink" className="flex min-h-[70svh] flex-col justify-end px-4 pb-10 md:px-10">
        <p className="font-mono text-meta uppercase">(The Studio) — {SITE.location}</p>
        <h1 className="mt-4 font-display text-display-2xl font-medium uppercase">
          Small studio. <em className="font-serif normal-case italic text-vermilion">Serious</em> craft.
        </h1>
      </section>

      <section data-world="paper" className="px-4 py-24 md:px-10 md:py-36">
        <p className="font-mono text-meta uppercase">(01) — Story</p>
        <div className="mt-8 max-w-3xl space-y-8">
          {studio.story.map((paragraph) => (
            <Reveal key={paragraph.slice(0, 24)}>
              <p className="text-lg leading-relaxed md:text-xl">{paragraph}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section data-world="paper" className="px-4 pb-24 md:px-10 md:pb-36">
        <p className="mb-10 font-mono text-meta uppercase">(02) — What we do</p>
        {capabilities.map((cap) => (
          <Reveal key={cap.index} className="grid gap-4 border-t hairline py-10 md:grid-cols-[3.5rem_1fr_1fr] md:gap-8">
            <span className="font-mono text-meta text-vermilion">{cap.index}</span>
            <div>
              <h2 className="font-display text-display-md font-medium uppercase">{cap.title}</h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed opacity-80">{cap.description}</p>
            </div>
            <ul className="space-y-2 self-end">
              {cap.items.map((item) => (
                <li key={item} className="border-b hairline pb-2 font-mono text-meta uppercase">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </section>

      <section data-world="ink" className="px-4 py-24 md:px-10 md:py-36">
        <p className="mb-10 font-mono text-meta uppercase">(03) — Principles</p>
        <div className="grid gap-x-12 md:grid-cols-2">
          {studio.principles.map((principle, i) => (
            <Reveal key={principle.title} delay={(i % 2) * 0.08} className="border-t hairline py-8">
              <h2 className="font-display text-display-md font-medium uppercase">
                <span className="mr-3 font-mono text-meta text-vermilion">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {principle.title}
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed opacity-80">{principle.text}</p>
            </Reveal>
          ))}
        </div>
        <div className="mt-16 border-t hairline pt-8">
          <TransitionLink
            href="/contact"
            className={cn("font-display text-display-lg font-medium uppercase", underline)}
          >
            Work with us ↗
          </TransitionLink>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Build gate + smoke check**

`npm run build` → compiles, `/studio` in route list. Dev-check: world flips ink→paper→ink down the page; no fictional team members anywhere.

- [ ] **Step 3: Commit**

```powershell
git add -A; git commit -m "feat: studio page - story, capabilities, principles"
```

---

### Task 10: Contact page, final 404, legacy redirects

**Files:**
- Create: `src/app/contact/page.tsx`, `src/components/contact/ContactForm.tsx`, `src/components/contact/CopyEmail.tsx`
- Rewrite: `src/app/not-found.tsx` (final)
- Modify: `next.config.ts` (redirects)

**Interfaces:**
- Consumes: `SITE`, `TransitionLink`, `Magnetic`, `underline`, `@/lib/cn`.
- Produces: route `/contact`; permanent redirects `/services`→`/studio`, `/team`→`/studio`, `/blog`→`/`, `/blog/:slug`→`/`.

- [ ] **Step 1: Create `src/components/contact/CopyEmail.tsx`**

```tsx
"use client";

import { useState } from "react";
import { SITE } from "@/data/site";

export default function CopyEmail() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (permissions/http) — the mailto link right next to this still works.
    }
  };

  return (
    <div className="flex flex-wrap items-baseline gap-4">
      <a
        href={`mailto:${SITE.email}`}
        className="break-all font-display text-display-lg font-medium uppercase transition-colors duration-300 hover:text-vermilion"
      >
        {SITE.email}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-live="polite"
        className="border border-current px-3 py-1 font-mono text-meta uppercase transition-colors duration-300 hover:bg-vermilion hover:text-paper hover:border-vermilion"
      >
        {copied ? "Copied ✓" : "Copy"}
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Create `src/components/contact/ContactForm.tsx`**

Submits by opening WhatsApp with a prefilled message — no fake "submitted" state, no dead backend.

```tsx
"use client";

import { useState } from "react";
import { SITE } from "@/data/site";

const BUDGETS = ["Under $2k", "$2k – $5k", "$5k – $10k", "$10k+"];

const field =
  "w-full border-b hairline bg-transparent py-3 text-base placeholder:opacity-40 focus:border-vermilion";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [budget, setBudget] = useState(BUDGETS[0]);
  const [message, setMessage] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text =
      `Hi TrinityDev — I'm ${name}${email ? ` (${email})` : ""}. ` +
      `Budget: ${budget}. ${message}`;
    window.open(
      `${SITE.whatsappUrl}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <form onSubmit={submit} className="space-y-8">
      <div>
        <label htmlFor="cf-name" className="font-mono text-meta uppercase opacity-60">
          Name
        </label>
        <input
          id="cf-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className={field}
        />
      </div>
      <div>
        <label htmlFor="cf-email" className="font-mono text-meta uppercase opacity-60">
          Email (optional)
        </label>
        <input
          id="cf-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className={field}
        />
      </div>
      <div>
        <label htmlFor="cf-budget" className="font-mono text-meta uppercase opacity-60">
          Budget
        </label>
        <select
          id="cf-budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className={field}
        >
          {BUDGETS.map((b) => (
            <option key={b} value={b} className="text-ink">
              {b}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="cf-message" className="font-mono text-meta uppercase opacity-60">
          About the project
        </label>
        <textarea
          id="cf-message"
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What are you building?"
          className={field}
        />
      </div>
      <button
        type="submit"
        data-cursor="open"
        className="border border-current px-8 py-4 font-display text-display-md font-medium uppercase transition-colors duration-300 hover:border-vermilion hover:bg-vermilion hover:text-paper"
      >
        Send via WhatsApp ↗
      </button>
    </form>
  );
}
```

- [ ] **Step 3: Create `src/app/contact/page.tsx`**

```tsx
import type { Metadata } from "next";
import { SITE } from "@/data/site";
import ContactForm from "@/components/contact/ContactForm";
import CopyEmail from "@/components/contact/CopyEmail";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project with TrinityDev. We reply within 24 hours — usually faster.",
};

export default function ContactPage() {
  return (
    <>
      <section data-world="ink" className="flex min-h-[60svh] flex-col justify-end px-4 pb-10 md:px-10">
        <p className="font-mono text-meta uppercase">(Start a project)</p>
        <h1 className="mt-4 font-display text-display-2xl font-medium uppercase">
          Let&apos;s <em className="font-serif normal-case italic text-vermilion">talk</em>
        </h1>
        <p className="mt-6 max-w-md text-sm leading-relaxed opacity-80">
          Tell us what you&apos;re building. We reply within 24 hours — usually faster.
        </p>
      </section>

      <section data-world="paper" className="grid gap-16 px-4 py-24 md:grid-cols-2 md:gap-12 md:px-10 md:py-36">
        <div className="space-y-12">
          <div>
            <p className="mb-4 font-mono text-meta uppercase opacity-60">Email</p>
            <CopyEmail />
          </div>
          <div>
            <p className="mb-4 font-mono text-meta uppercase opacity-60">WhatsApp</p>
            <a
              href={SITE.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display text-display-md font-medium uppercase transition-colors duration-300 hover:text-vermilion"
            >
              Chat with us ↗
            </a>
          </div>
          <dl className="grid grid-cols-2 gap-8 border-t hairline pt-8 font-mono text-meta uppercase">
            <div>
              <dt className="opacity-60">Based in</dt>
              <dd className="mt-2">
                {SITE.location}
                <br />
                {SITE.coords}
              </dd>
            </div>
            <div>
              <dt className="opacity-60">Response time</dt>
              <dd className="mt-2">Within 24 hours</dd>
            </div>
          </dl>
        </div>
        <ContactForm />
      </section>
    </>
  );
}
```

- [ ] **Step 4: Rewrite `src/app/not-found.tsx` (final)**

```tsx
import { TransitionLink } from "@/components/global/PageTransition";
import { underline } from "@/components/ui/underline";
import { cn } from "@/lib/cn";

export default function NotFound() {
  return (
    <section data-world="ink" className="flex min-h-svh flex-col items-start justify-end px-4 pb-12 md:px-10">
      <p className="font-mono text-meta uppercase">(404) — Lost</p>
      <h1 className="mt-4 font-display text-display-2xl font-medium uppercase">
        Nothing <em className="font-serif normal-case italic text-vermilion">here</em>
      </h1>
      <p className="mt-6 max-w-md text-sm leading-relaxed opacity-80">
        This page doesn&apos;t exist — or hasn&apos;t been built yet.
      </p>
      <TransitionLink href="/" className={cn("mt-8 font-mono text-meta uppercase", underline)}>
        Back home ↗
      </TransitionLink>
    </section>
  );
}
```

- [ ] **Step 5: Add legacy redirects to `next.config.ts`**

Read the existing file first; add (or extend) the `redirects` key inside the config object, preserving everything else (especially `images`):

```ts
  async redirects() {
    return [
      { source: "/services", destination: "/studio", permanent: true },
      { source: "/team", destination: "/studio", permanent: true },
      { source: "/blog", destination: "/", permanent: true },
      { source: "/blog/:slug", destination: "/", permanent: true },
    ];
  },
```

- [ ] **Step 6: Build gate + smoke check**

`npm run build` → compiles, `/contact` in route list. Dev-check: form submit opens `wa.me` with the prefilled text; copy button says "Copied ✓"; `/services`, `/team`, `/blog` all 308-redirect; unknown URL renders the editorial 404.

- [ ] **Step 7: Commit**

```powershell
git add -A; git commit -m "feat: contact page, editorial 404, legacy route redirects"
```

---

### Task 11: OG image, SEO polish, full verification protocol

**Files:**
- Create: `src/app/opengraph-image.tsx`
- Verify/clean: whole tree (grep sweeps), `package.json`

**Interfaces:**
- Consumes: everything.
- Produces: shippable site.

- [ ] **Step 1: Create `src/app/opengraph-image.tsx`**

```tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "TrinityDev — Digital Studio";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#111110",
          color: "#F2EFE9",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 5, color: "#E8390E" }}>
          JAKARTA, ID — EST. 2026
        </div>
        <div style={{ display: "flex", fontSize: 118, fontWeight: 700, letterSpacing: -4 }}>
          TrinityDev®
        </div>
        <div style={{ display: "flex", fontSize: 30, opacity: 0.7 }}>
          Digital experiences that refuse to blend in.
        </div>
      </div>
    ),
    size
  );
}
```

- [ ] **Step 2: Dead-code sweep**

```powershell
Get-ChildItem src -Recurse -Include *.tsx,*.ts | Select-String -Pattern "framer-motion|@studio-freight|lucide-react|glass-card|btn-glow|glitch-text|bg-grid|Space_Grotesk|Inter"
```
Expected: no output. Also confirm `package.json` no longer lists `framer-motion`, `@studio-freight/lenis`, `lucide-react`. Delete any orphaned files found.

- [ ] **Step 3: Lint + build**

Run: `npm run lint` → no errors. Run: `npm run build` → compiles; route list = `/`, `/work`, `/work/[slug]` (4 static), `/studio`, `/contact`, `/_not-found`, `/opengraph-image`.

- [ ] **Step 4: Full manual verification protocol (dev server + browser)**

1. Fresh tab → `/`: preloader counts to 100 once; reload → skipped.
2. Scroll the full home page: ink→paper tween at manifesto, word-scrub works, work-row hover shows floating image, accordion keyboard-operable (Tab + Enter), marquee loops, world returns to ink at CTA/footer.
3. Navigate `/` → `/work` → case study → next-project → `/studio` → `/contact` using on-page links only: curtain wipe on every transition, scroll restored to top, no console errors.
4. DevTools → Rendering → emulate `prefers-reduced-motion: reduce`, hard reload: no preloader, no smooth scroll, no parallax/scrub, ALL content visible and readable, marquee static, cursor is the system cursor.
5. Responsive check at 375px: no horizontal scroll on any page, menu overlay opens/closes (Escape too), touch: no custom cursor, no floating work preview.
6. Keyboard-only pass: skip-link appears on first Tab, every link/button reachable with a visible vermilion focus ring, menu overlay traps focus sensibly and closes with Escape.
7. Contrast spot-check (DevTools color picker): body text ink-on-paper and paper-on-ink ≥ AA; vermilion appears only at display sizes / borders / badges.
8. `/services`, `/team`, `/blog`, `/blog/anything` all redirect; `/nonsense` shows the 404.
9. Lighthouse (mobile) on `/`: Performance ≥ 90, Accessibility ≥ 95. If Performance misses: check font preloading (next/font handles it), image `sizes` props, and that no ScrollTrigger pins force layout.

Fix anything that fails before proceeding.

- [ ] **Step 5: Final commit**

```powershell
git add -A; git commit -m "feat: og image, seo polish, verification pass for editorial rebuild"
```

---

## Post-plan follow-ups (not part of this plan)

- Point the production deploy at the new build; update DNS/OG checks after deploy.
- Replace Unsplash concept imagery with real project screenshots as they exist.
- Add a `Journal` (blog) section only when there is real content to publish.



