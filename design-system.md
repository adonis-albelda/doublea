# Double A Digital Solutions — Design System
Built for shadcn/ui · v1.0

## 1. Brand thesis

The mark shows two peaks built from discrete squares that dissolve into a single
smooth ascending line — **pixels resolving into momentum.** That's the whole
business: you assemble discrete, engineered pieces (code, components, workflows)
into something that moves a client's numbers up and to the right. The design
system leans on that tension everywhere: **grid vs. curve, discrete vs. fluid,
built vs. running.**

Audience: founders/ops leads evaluating a dev shop for custom software, sites,
web apps, or automation. The site's job is to prove technical competence fast
and make "start a project" the obvious next click — so the palette stays
restrained and quiet, with one warm accent doing all the persuading.

## 2. Color

Pulled directly from the logo (sampled `#8CA377`), then extended to a full
functional range. Deliberately **not** the AI-default terracotta-on-cream —
this leans cooler, quieter, and more engineered.

| Token | Hex | HSL | Use |
|---|---|---|---|
| `sage-700` (**Primary**) | `#5E744E` | `94 20% 38%` | Buttons, links, headings, focus ring |
| `sage-500` (**Brand**) | `#8CA377` | `91 19% 55%` | Logo, icons, chart lines, decorative |
| `sage-300` | `#C9D6BE` | `93 23% 79%` | Hover tints, chart fills |
| `sage-100` | `#EEF2E9` | `87 26% 93%` | Section backgrounds, subtle cards |
| `ink` (**Foreground**) | `#3C4536` | `93 12% 24%` | Body text, dark-mode background |
| `paper` (**Background**) | `#F6F7F2` | `72 24% 96%` | Page background (sage-tinted white, not cream) |
| `clay` (**Signal/Accent**) | `#B8582F` | `18 59% 45%` | The *one* warm accent — primary CTA, key stat, active state |
| `slate-sage` (**Muted**) | `#7A8271` | `88 7% 48%` | Secondary text, captions |
| `border-sage` | `#D8DED1` | `88 17% 85%` | Borders, dividers, input outlines |

**Rule:** clay appears once per screen, max twice per section. It marks the
single most important action — never used decoratively, or it stops meaning
anything.

### shadcn CSS variables — drop into `globals.css`

```css
:root {
  --background: 72 24% 96%;
  --foreground: 93 16% 11%;
  --card: 0 0% 100%;
  --card-foreground: 93 16% 11%;
  --popover: 0 0% 100%;
  --popover-foreground: 93 16% 11%;
  --primary: 94 20% 38%;
  --primary-foreground: 72 24% 96%;
  --secondary: 87 26% 93%;
  --secondary-foreground: 94 20% 38%;
  --muted: 87 26% 93%;
  --muted-foreground: 88 7% 40%;
  --accent: 18 59% 45%;
  --accent-foreground: 72 24% 96%;
  --destructive: 6 74% 52%;
  --destructive-foreground: 0 0% 98%;
  --border: 88 17% 85%;
  --input: 88 17% 85%;
  --ring: 94 20% 38%;
  --radius: 0.5rem;
}

.dark {
  --background: 93 16% 15%;
  --foreground: 87 20% 94%;
  --card: 93 15% 19%;
  --card-foreground: 87 20% 94%;
  --popover: 93 15% 19%;
  --popover-foreground: 87 20% 94%;
  --primary: 91 30% 65%;
  --primary-foreground: 93 16% 15%;
  --secondary: 93 13% 22%;
  --secondary-foreground: 87 20% 94%;
  --muted: 93 13% 22%;
  --muted-foreground: 88 10% 62%;
  --accent: 18 59% 45%;
  --accent-foreground: 87 20% 94%;
  --destructive: 6 60% 45%;
  --destructive-foreground: 0 0% 98%;
  --border: 93 12% 27%;
  --input: 93 12% 27%;
  --ring: 91 30% 65%;
}
```

All text/background pairs above meet WCAG AA (4.5:1) at minimum — verified,
not eyeballed (`sage-700` on white = 5.13:1, `paper` on `clay` = 5.8:1).

## 3. Typography

Three roles, three families — a geometric technical display face (echoes the
mark's angular peaks), a neutral workhorse for reading, and a mono for
anything that looks like code or data, because this is a company that ships code.

| Role | Family | Weights | Use |
|---|---|---|---|
| Display | **Space Grotesk** | 500, 700 | H1–H3, nav wordmark, big stats |
| Body | **Inter** | 400, 500, 600 | Paragraphs, UI labels, buttons |
| Mono | **JetBrains Mono** | 400, 500 | Code snippets, tech-stack tags, timestamps, `01 /` style eyebrows only where content is genuinely sequential |

```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

--font-display: 'Space Grotesk', ui-sans-serif, system-ui;
--font-body: 'Inter', ui-sans-serif, system-ui;
--font-mono: 'JetBrains Mono', ui-monospace, monospace;
```

### Scale (1.25 ratio, 16px base)

| Token | Size | Line | Weight | Family |
|---|---|---|---|---|
| `display-xl` | 60px / 3.75rem | 1.05 | 700 | Space Grotesk |
| `display-lg` | 44px / 2.75rem | 1.1 | 700 | Space Grotesk |
| `h2` | 32px / 2rem | 1.15 | 500 | Space Grotesk |
| `h3` | 24px / 1.5rem | 1.25 | 500 | Space Grotesk |
| `body-lg` | 18px / 1.125rem | 1.6 | 400 | Inter |
| `body` | 16px / 1rem | 1.6 | 400 | Inter |
| `caption` | 13px / 0.8125rem | 1.4 | 500 | JetBrains Mono, uppercase, tracked +0.04em |

## 4. Layout, spacing, radius

- **Spacing scale:** 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 (px), Tailwind default scale — no need to override.
- **Radius:** `--radius: 0.5rem` (8px) on cards/inputs, `9999px` (pill) on badges and the primary CTA only — the pill CTA is the one rounded outlier that draws the eye, everything else stays crisp/rectangular to read as "engineered."
- **Container:** max-width `1200px`, 24px gutter mobile / 64px desktop.
- **Grid:** 12-col desktop, 4-col mobile.

## 5. Signature element — "Pixel Ascent"

The one motif carried through the whole site, taken straight from the mark:
a scatter of small squares (4–8px, `sage-300`/`sage-500`, random opacity)
that thins out and resolves into a single clean 1–2px line or curve.

Where it shows up (sparingly — this is the one bold move, everything else stays quiet):
- **Section dividers**: instead of a plain `<hr>`, a dotted-to-solid gradient line.
- **Hero background**: a faint scatter of squares in the lower-left, matching the logo's dust, that a thin animated line sweeps up through on load (once, respects `prefers-reduced-motion`).
- **Loading/hover states**: a card's border briefly "pixelates" in from corners on hover instead of a generic shadow lift.

Don't use it as a repeating background pattern or on every card — it's a
punctuation mark, not wallpaper.

## 6. Components (shadcn mapping)

| Component | Notes |
|---|---|
| `Button` | `default` = sage-700 fill, `paper` text, pill radius. `secondary` = sage-100 fill, sage-700 text. `outline`/`ghost` = for tertiary actions. Reserve **clay fill** for exactly one CTA per page ("Start a project"). |
| `Card` | White surface on `paper` background (not sage-100, so cards actually lift), 8px radius, 1px `border-sage`, no shadow at rest — shadow only on hover. |
| `Badge` | Mono caps, used for tech-stack tags (`React`, `n8n`, `Next.js`) and status (`Live`, `In build`). Tech-stack tags include the tool's real brand mark (via `simple-icons`) rendered in `currentColor`, not brand color — keeps a recognizable logo without breaking the restrained, single-accent palette. Tools with no brand mark (e.g. "REST APIs") stay text-only. |
| `Tabs` | For switching between service categories, or between grouped content within one section (e.g. Client Work / Personal Products) instead of separate pages. |
| `Accordion` | FAQ and process breakdown. |
| `Input` / `Textarea` | Contact form — sage-700 focus ring, border-sage default. |
| `Avatar` | Team section, square-rounded not circular, to stay on-brand with the mark's geometry. |

## 7. Site structure (recommended)

```
┌────────────────────────────────────┐
│ Nav: wordmark · Work · Services ·   │
│      About · Contact  [Start CTA]   │
├────────────────────────────────────┤
│ HERO — one-line thesis + pixel→line │
│ motif + clay CTA                    │
├────────────────────────────────────┤
│ SERVICES — 4 cards: Software,       │
│ Websites, Web Apps, Automation      │
├────────────────────────────────────┤
│ PRODUCTS — client work + personal   │
│ products (tabs), tech-stack badges  │
├────────────────────────────────────┤
│ PROCESS — only numbered if it's a   │
│ real sequence (e.g. Discover →      │
│ Build → Ship → Support)             │
├────────────────────────────────────┤
│ ABOUT / WHY US                      │
├────────────────────────────────────┤
│ CTA band — clay, "Start a project"  │
├────────────────────────────────────┤
│ Footer                              │
└────────────────────────────────────┘
```
