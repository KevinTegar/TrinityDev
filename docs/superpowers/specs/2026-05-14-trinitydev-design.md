# TrinityDev Company Profile — Design Specification

**Date:** 2026-05-14
**Version:** 1.0
**Status:** Approved
**Architect:** Claude Opus 4.6 (Lead/Architect Developer)

---

## Context

TrinityDev is a web development agency startup operating in Indonesia. The current React+Vite company profile website exists but is unsatisfactory in every dimension — design, animation, UX, brand identity, and content strategy. The founder wants a world-class rebuild that impresses visitors and converts them into clients.

**Target Audience:** Startup & Tech Companies + Individual Entrepreneurs / Freelancers
**Services:** Full-Stack Web Development, UI/UX Design + Development, Mobile App Development, SEO & Digital Marketing
**Assets:** Partial — some real portfolio projects exist, team section partially empty, testimonials need verification
**Tech Stack Decision:** Next.js 14+ (App Router) — full rebuild

---

## 1. Design System

### 1.1 Design Direction: "Futuristic Luxe"

Premium dark aesthetic with sophisticated accents. Experience-first — animations and visual effects are rewards for interaction, not noise. Feels like a high-end tech showroom, not an arcade.

### 1.2 Color Palette

```
Background Base:      #050508 — Deep Void (primary background)
Background Secondary: #0d0d12 — Dark Surface (cards, sections)
Background Elevated:  #1a1a24 — Elevated Surface (hover states)

Primary Accent:       #60A5FA — Calm Blue (CTAs, primary actions)
Secondary Accent:    #818CF8 — Soft Indigo (gradients, secondary elements)
Tertiary Accent:     #34D399 — Muted Emerald (success, code, live indicators)
Quaternary Accent:   #F472B6 — Soft Pink (highlights, special callouts)

Text Primary:        #F8FAFC — Light (headings, body)
Text Secondary:      #94A3B8 — Muted (descriptions, captions)
Text Tertiary:       #64748B — Subtle (placeholders, disabled)

Border Default:      #1a1a24 — Default border
Border Hover:        #60A5FA30 — Glow border on interaction

Gradient Primary:    linear-gradient(135deg, #60A5FA, #818CF8)
Gradient Dark:       linear-gradient(135deg, #0d0d12, #1a1a24)
```

**Accent Philosophy:** Glow effects are **earned** — they appear only on hover, scroll-into-view, or focus states. This creates a "reward" sensation for engaged visitors without visual fatigue.

### 1.3 Typography

```
Display:   "Space Grotesk" (weights: 500, 600, 700, 800)
           — Hero headlines, section titles, large callouts
           — Geometric, techy, bold presence

Mono:      "JetBrains Mono" (weights: 400, 500, 600)
           — Code snippets, labels, tags, status indicators
           — Glitch/scan-line decorative text elements

Body:      "Inter" (weights: 300, 400, 500, 600)
           — Paragraph text, descriptions, UI copy
           — Clean, highly readable at all sizes

Fallbacks: system-ui, -apple-system, sans-serif
```

### 1.4 Spacing System

```
--space-1:   4px   --space-10: 40px
--space-2:   8px   --space-12: 48px
--space-3:   12px  --space-16: 64px
--space-4:   16px  --space-20: 80px
--space-5:   20px  --space-24: 96px
--space-6:   24px  --space-32: 128px
--space-8:   32px
```

### 1.5 Component Styles

**Glassmorphism Cards:**
```css
background: rgba(13, 13, 18, 0.7);
backdrop-filter: blur(20px);
border: 1px solid #1a1a24;
border-radius: 16px;
transition: border-color 0.3s ease, box-shadow 0.3s ease;
```
Hover state: `border-color: #60A5FA30; box-shadow: 0 0 30px #60A5FA10`

**Neon Glow Buttons:**
```css
background: linear-gradient(135deg, #60A5FA, #818CF8);
color: #050508;
font-weight: 600;
border-radius: 8px;
box-shadow: 0 4px 20px #60A5FA40;
transition: all 0.3s ease;
```
Hover: `box-shadow: 0 6px 30px #60A5FA60; transform: translateY(-2px);`

**Grid Overlay:** Subtle CSS grid pattern (1px lines at low opacity) as decorative background element.

**Scroll Progress Bar:** 2px fixed bar at top of page showing scroll progress.

---

## 2. Page Architecture

### 2.1 Routes

| Route | Page | Type |
|---|---|---|
| `/` | Home — Company Profile | Landing |
| `/work` | Portfolio Showcase | Main |
| `/work/[slug]` | Case Study Detail | Dynamic |
| `/services` | Services Breakdown | Main |
| `/team` | Team Profiles | Main |
| `/blog` | Blog Index | Content |
| `/blog/[slug]` | Blog Post | Dynamic |
| `/contact` | Contact + Conversion | Main |

### 2.2 Navigation Flow

```
Primary conversion path: Home → Work → Case Study → Contact
Trust-building path:     Home → Services → Team → Blog → Contact
```

---

## 3. Home Page Sections (in order)

### 3.1 Navigation Bar
- Fixed position, transparent on top → blur-glass on scroll
- Left: Logo ("TrinityDev" with subtle glow)
- Center: Nav links (Work, Services, Team, Blog)
- Right: Theme toggle (dark/light) + CTA button ("Start Project")
- Scroll progress indicator: 2px bar at very top
- Mobile: Hamburger menu with full-screen overlay

### 3.2 Hero Section
- Background: Animated particle/grid effect (CSS-based, subtle)
- Headline: Large display font, split-text animation, characters reveal sequentially (30ms delay per character)
- Subheadline: 1-2 sentences, fade-up entrance (delayed after headline)
- CTAs: Primary ("View Our Work") + Secondary ("Book a Call" / WhatsApp)
- Floating 3D Device: Browser/phone mockup with subtle rotation (CSS 3D transforms)
- Stats badges: Pill-shaped chips (e.g., "100+ Projects", "5 Years")
- Scroll indicator: Animated chevron down

### 3.3 About Section
- Left column: Company story (2-3 paragraphs, fade-in on scroll)
- Right column: 4 feature cards (staggered entrance)
  - Total Projects (animated counter)
  - Years Experience (animated counter)
  - Client Satisfaction %
  - Technologies Mastered
- Timeline: Horizontal animated timeline (2020 → 2024) with milestone dots
- Founder: Optional founder photo + quote block

### 3.4 Services Section
- Section header: "What We Build" with accent underline
- 4 service cards (grid 2x2):
  1. Full-Stack Web Development
  2. UI/UX Design + Development
  3. Mobile App Development
  4. SEO & Digital Marketing
- Card behavior: Default shows icon + title + 1-line description. Hover expands to show 4-5 bullet features + "Learn More" link
- Animation: Staggered fade-up on scroll-into-view

### 3.5 Interactive Demo Section (Component Gallery)
- Headline: "What We Can Build For You"
- 5-6 showcase components in an interactive grid:
  - Animated Button (multiple variants)
  - Glassmorphism Card
  - Navigation Bar
  - Form Input (with validation states)
  - Testimonial Card
  - Stats Counter
- Interaction: User can hover/click each component to see animation
- Each component labeled with tech used (React, CSS, Framer Motion, etc.)
- CTA below: "Want something like this? Let's talk."
- Purpose: Tangible proof of TrinityDev's capabilities

### 3.6 Portfolio Preview Section
- Section header: "Selected Work"
- 3-4 featured projects in a grid (2-column)
- Each project card: Thumbnail + title + category tag + brief description
- Hover: overlay with "View Case Study" CTA
- Animation: Staggered reveal, parallax on scroll
- CTA: "View All Work" → `/work`

### 3.7 Statistics Section
- Background: Gradient card with glass effect
- 4 animated counters: 100+ Projects, 50+ Clients, 5 Years, 24/7 Support
- Animation: Count up when scrolled into view (Intersection Observer)
- Subtle glow around section

### 3.8 Testimonials Section
- Auto-sliding carousel (6 second interval)
- 5 client testimonials: Star rating + quote + name + role + company + avatar
- Navigation: Dots + auto-advance
- Section header: "What Clients Say"

### 3.9 Team Preview Section
- Section header: "Meet the Team"
- 3-4 team member cards: Photo + name + role + tech badges + intro/fun fact
- Hover: Subtle tilt effect (CSS 3D transform)
- CTA: "Meet the Full Team" → `/team`

### 3.10 Blog/Insights Preview Section
- Section header: "Latest Insights"
- 3 article cards: Cover image + category tag + title + read time + date
- Card hover: Image scale + overlay
- CTA: "Read All Articles" → `/blog`

### 3.11 CTA Section (Pre-Footer)
- Bold headline: "Ready to Build Something Great?"
- Subtext: "Let's discuss your project. Free consultation."
- Dual CTA: "Start a Project" (primary) + WhatsApp (secondary)
- Background: Gradient accent or subtle animated mesh

### 3.12 Footer
- 4-column layout:
  1. Logo + tagline + social icons
  2. Quick links (Work, Services, Team, Blog)
  3. Services (Web, Mobile, Design, SEO)
  4. Contact (email, WhatsApp, address)
- Newsletter signup: Email input + subscribe button
- Bottom bar: Copyright + "Made with ❤️ by TrinityDev"

---

## 4. Additional Pages

### 4.1 /work — Portfolio Showcase
- Filter tabs: All | Web | Mobile | Design | Marketing
- Grid layout of all project cards
- Each card links to `/work/[slug]`

### 4.2 /work/[slug] — Case Study
- Hero: Project title + hero image
- Problem: What challenge did the client face?
- Process: How TrinityDev approached it
- Solution: What was built
- Results: Measurable metrics (conversion %, load time, revenue increase, etc.)
- Gallery: Multiple project screenshots
- Next Project CTA: "Next Case Study →"

### 4.3 /services — Services Detail
- Full page for each service area
- Features list, process breakdown, FAQ accordion

### 4.4 /team — Team Profiles
- Grid of team member cards
- Each card expands to full profile: bio, tech specialties, projects worked on

### 4.5 /blog — Blog Index
- Article cards with pagination, category filter, featured article hero

### 4.6 /blog/[slug] — Blog Post
- Rich layout: hero, table of contents, code blocks, images
- Author card, related posts

### 4.7 /contact — Contact
- Contact form: Name, Email, Project Type (dropdown), Budget Range, Message
- WhatsApp direct link
- Response time SLA: "We respond within 24 hours"
- Location info

---

## 5. Animation Specification

### 5.1 Scroll Animations (GSAP ScrollTrigger)
- Fade-up: `opacity: 0 → 1`, `y: 40px → 0`, `duration: 0.8s`, `ease: power3.out`
- Stagger: 0.1s delay between sibling elements
- Parallax: Background elements move at 0.5x scroll speed
- Text reveal: Characters split and animate individually

### 5.2 Micro-Interactions
- Button hover: Scale 1.02 + glow intensification + slight lift
- Card hover: Border glow + subtle scale 1.01 + shadow deepens
- Link hover: Underline grows from center
- Image hover: Scale 1.05 + overlay opacity change

### 5.3 Page Transitions
- Exit: Fade to `#050508` (0.3s)
- Enter: Fade from `#050508` (0.3s)
- Using Framer Motion's `AnimatePresence`

### 5.4 Loading Screen
- Minimal: Logo animation → progress bar → fade out
- Duration: Max 2 seconds, or skip if page is ready

### 5.5 Glitch Effect
- Applied ONLY to the logo on the Hero section
- CSS-only: `clip-path` animation on text-shadow layers
- Subtle: 2-3% visibility, not garish

### 5.6 Counter Animation
- Triggered by Intersection Observer
- Duration: 2 seconds, ease-out
- Format: Number increments smoothly

---

## 6. Technical Architecture

### 6.1 Framework & Build
- Next.js 14+ with App Router
- TypeScript for all components
- Tailwind CSS for styling (with custom design tokens)
- Framer Motion for React animations
- GSAP + ScrollTrigger for scroll-based animations
- Lenis for smooth scrolling
- Shadcn/UI as component base (customized to design system)

### 6.2 Project Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Home
│   ├── work/
│   ├── services/
│   ├── team/
│   ├── blog/
│   └── contact/
├── components/
│   ├── ui/                 # Base UI components (shadcn)
│   ├── sections/           # Home page sections
│   └── layout/             # Navbar, Footer, etc.
├── lib/
│   ├── animations/
│   ├── utils.ts
│   └── cn.ts
├── hooks/
├── data/
└── styles/
    └── globals.css
```

### 6.3 Performance Targets
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1
- Lighthouse Performance > 95

---

## 7. Content Strategy

### 7.1 Portfolio Data
- Real projects: Use actual screenshots and case study data
- Placeholder projects: Use realistic mock data for design purposes
- Each project: Title, category, thumbnail, description, metrics, process photos

### 7.2 Testimonials
- Use real testimonials if available
- Generate high-quality placeholder testimonials
- Include: 5-star rating, name, role, company

### 7.3 Blog Content
- Start with 3-5 articles on topics relevant to target audience
- Topics: "Why Startups Need a Strong Web Presence", "How to Choose a Web Development Partner", "The Cost of a Website in 2026", etc.

---

## 8. Implementation Phases

### Phase 1: Foundation
- Initialize Next.js 14 project with TypeScript
- Set up Tailwind CSS with custom design tokens
- Configure design system (colors, typography, spacing)
- Set up Framer Motion + GSAP + Lenis
- Create base UI component library (Button, Card, Input, Badge)

### Phase 2: Layout & Navigation
- Global layout (Navbar + Footer)
- Smooth scroll configuration
- Theme toggle (dark/light)
- Page transition wrapper
- Loading screen

### Phase 3: Home Page
- Build all 12 home sections sequentially
- Implement all scroll animations
- Interactive Demo section (Component Gallery)
- Statistics counter animation
- Testimonials carousel

### Phase 4: Supporting Pages
- `/work`, `/work/[slug]`, `/services`, `/team`, `/blog`, `/blog/[slug]`, `/contact`

### Phase 5: Content & Polish
- Populate with real portfolio data
- Write testimonials and blog content
- SEO optimization
- Performance optimization
- Accessibility audit

---

## 9. Verification Plan

1. `npm run dev` — site loads at localhost:3000, no errors
2. All sections render correctly, animations trigger on scroll
3. Responsive test: mobile (375px), tablet (768px), desktop (1280px)
4. Lighthouse score > 90 on Performance, Accessibility, Best Practices
5. All routes work, page transitions are smooth
6. Contact form validates and shows success state
7. Keyboard navigation works, screen reader compatible
8. All placeholder content is realistic, no "lorem ipsum"
9. Mobile menu: Hamburger opens, links work, overlay dismisses