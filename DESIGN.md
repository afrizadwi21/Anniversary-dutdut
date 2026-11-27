---
name: buat dutdut
description: Nocturne Observatory design system pairing Baskervville editorial serif, Manrope sans, and JetBrains Mono on obsidian slate with warm amber gold accents.
colors:
  obsidian-bg: "#090d14"
  void-shadow: "#04060b"
  slate-surface: "#111824"
  slate-elevated: "#182233"
  parchment-ink: "#f3efe7"
  silver-muted: "#9aa6b8"
  amber-accent: "#e2a856"
  amber-bright: "#f5cd82"
  amber-deep: "#8a5514"
  border-hairline: "#243044"
typography:
  display:
    fontFamily: "Baskervville, Georgia, serif"
    fontSize: "clamp(2.75rem, 6.5vw, 5rem)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Baskervville, Georgia, serif"
    fontSize: "clamp(2rem, 4vw, 3rem)"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Baskervville, Georgia, serif"
    fontSize: "1.375rem"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "0em"
  body:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "0.01em"
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.14em"
rounded:
  sm: "6px"
  md: "12px"
  lg: "18px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "48px"
  section: "96px"
components:
  button-pill:
    backgroundColor: "{colors.slate-elevated}"
    textColor: "{colors.parchment-ink}"
    rounded: "{rounded.full}"
    padding: "10px 20px"
  card-surface:
    backgroundColor: "{colors.slate-surface}"
    textColor: "{colors.parchment-ink}"
    rounded: "{rounded.lg}"
    padding: "28px"
---

# Design System: buat dutdut

## Overview

**Creative North Star: "The Nocturne Observatory"**

**buat dutdut** replaces the previous pink floral theme with a calm, nocturnal celestial aesthetic. Deep obsidian slate grounds (`#090d14`) frame warm parchment typography (`#f3efe7`) and a single warm amber-gold accent (`#e2a856`) inspired by starlight and brass observatory instruments.

**Key Characteristics:**
- Zero pink hues, zero emojis, zero generic glassmorphism cards.
- Editorial `Baskervville` serif display voice paired with `Manrope` body text and `JetBrains Mono` for orbital coordinates, dates, and timers.
- Realistic 3D orbital planetarium with perspective depth sorting, spherical terminator shading, atmospheric rim lighting, and interactive tilt.
- Restrained tonal layering (`#111824` over `#090d14`) with crisp `1px` hairline borders (`#243044`).

## Colors

### Primary
- **Amber Accent** (`#e2a856`): Primary interactive accent, active borders, orbital highlights, and focus rings.
- **Amber Bright** (`#f5cd82`): Specular starlight highlight and hover state accent.

### Neutral
- **Obsidian Background** (`#090d14`): Primary page canvas.
- **Slate Surface** (`#111824`): Tonal card and panel surface.
- **Slate Elevated** (`#182233`): Interactive control and modal surface.
- **Parchment Ink** (`#f3efe7`): Primary headings and high-emphasis body copy.
- **Silver Muted** (`#9aa6b8`): Secondary copy, descriptions, and metadata.
- **Border Hairline** (`#243044`): Subtle `1px` dividers and card outlines.

**The Single-Accent Discipline Rule.** Amber Gold (`#e2a856`) is the sole accent color across the entire experience. Never introduce pink, rose, purple, or neon hues.

## Typography

**Display Font:** `Baskervville` (fallback: `Georgia, serif`)
**Body Font:** `Manrope` (fallback: `system-ui, sans-serif`)
**Mono Font:** `JetBrains Mono` (fallback: `monospace`)

### Hierarchy
- **Display** (`400`, `clamp(2.75rem, 6.5vw, 5rem)`, `1.05`): Hero headline (`buat dutdut`).
- **Headline** (`400`, `clamp(2rem, 4vw, 3rem)`, `1.15`): Section titles.
- **Title** (`400`, `1.375rem`, `1.3`): Timeline and modal titles.
- **Body** (`400`, `1rem`, `1.75`): Narrative copy constrained to `65ch`.
- **Label** (`500`, `0.75rem`, `0.14em` tracking, uppercase): Dates, countdown units, and audio timestamps.

## Layout

- Direct entry into `<main>` with vertical section rhythm (`py-20 md:py-28`) and centered `max-w-5xl` containers.
- Asymmetric editorial reading column for the letter (`max-w-2xl`), 2-column numbered list for cherished qualities, alternating spine for milestones, and responsive 2–4 column photo gallery.

## Elevation & Depth

- Tonal layering (`#111824` on `#090d14`) with `1px` hairline borders (`#243044`) and subtle offset shadows (`0 12px 36px rgba(0, 0, 0, 0.35)`).

## Shapes

- Cards: `18px` (`rounded-[18px]`); media frames: `12px`; controls: `9999px` pill.

## Components

- **3D Planetarium (`LoveLoomOrbit`):** Real-time 3D perspective projection (`x, y, z` rotation + tilt), `z`-depth sorting around the central star, spherical shading + atmospheric rim on each planet, and accessible modal.
- **Music Player (`MusicPlayer`):** Compact floating control bar with SVG icons, Web Audio bar visualizer, and accessible seek/volume sliders.

## Do's and Don'ts

### Do:
- **Do** use the obsidian/slate/amber tokens consistently.
- **Do** use crisp inline SVGs (`1.5px` stroke) for all UI controls.
- **Do** respect `prefers-reduced-motion: reduce`.

### Don't:
- **Don't** use any pink/rose colors or Unicode emojis anywhere.
- **Don't** add a blocking intro screen or bounce/elastic easing.
