---
name: buat dutdut
description: Editorial Monochrome Light & Dark design system pairing Baskervville serif, Manrope sans, and JetBrains Mono in pure grayscale with bidirectional scroll choreography.
colors:
  mono-black: "#09090b"
  mono-charcoal: "#141417"
  mono-slate: "#1c1c21"
  mono-border-dark: "#27272c"
  mono-muted-dark: "#a1a1aa"
  mono-silver-light: "#d4d4d8"
  mono-zinc-mid: "#71717a"
  mono-white: "#fafafa"
  mono-paper: "#ffffff"
  mono-surface-light: "#f4f4f5"
  mono-border-light: "#e4e4e7"
  mono-muted-light: "#52525b"
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
    backgroundColor: "{colors.mono-slate}"
    textColor: "{colors.mono-white}"
    rounded: "{rounded.full}"
    padding: "10px 20px"
  card-surface:
    backgroundColor: "{colors.mono-charcoal}"
    textColor: "{colors.mono-white}"
    rounded: "{rounded.lg}"
    padding: "28px"
---

# Design System: buat dutdut (Monochrome)

## Overview

**Creative North Star: "Silver Gelatin Gallery"**

**buat dutdut** uses a pure achromatic monochrome palette across both **Dark** (`#09090b`) and **Light** (`#fafafa`) modes. Inspired by silver-gelatin darkroom prints and architectural monographs, hierarchy comes strictly from typographic scale, hairline borders, and tonal contrast—never chromatic accents.

**Key Characteristics:**
- 100% monochrome grayscale across Dark and Light themes (`data-theme="dark" | "light"`).
- Bidirectional scroll choreography: sections and cards glide into focus smoothly on both scroll-down and scroll-up, paired with a hairline top scroll-progress indicator.
- Realistic 3D monochrome planetary orbit with dynamic terminator lighting, perspective depth sorting, and drag-to-tilt.
- Zero emojis, zero chromatic accents, crisp inline SVGs.

## Colors

### Primary
- **Pure Ink / Highlight**: `#fafafa` in Dark mode, `#09090b` in Light mode. Used for primary headings, active controls, and primary CTA fills.

### Neutral
- **Canvas**: `#09090b` (Dark) / `#fafafa` (Light).
- **Surface**: `#141417` (Dark) / `#ffffff` (Light).
- **Elevated**: `#1c1c21` (Dark) / `#f4f4f5` (Light).
- **Muted Ink**: `#a1a1aa` (Dark) / `#52525b` (Light).
- **Hairline Border**: `#27272c` (Dark) / `#e4e4e7` (Light).

**The Achromatic Rule.** Zero chromatic colors (no pink, no gold, no blue). Contrast and emphasis rely solely on lightness, weight, and spacing.

## Typography

**Display Font:** `Baskervville` (fallback: `Georgia, serif`)
**Body Font:** `Manrope` (fallback: `system-ui, sans-serif`)
**Mono Font:** `JetBrains Mono` (fallback: `monospace`)

## Layout & Motion

- Bidirectional scroll-reveal transitions (`cubic-bezier(0.16, 1, 0.3, 1)`) triggered smoothly on both scroll-down and scroll-up, plus a 2px scroll-progress hairline at the top of the viewport.
- Full `prefers-reduced-motion: reduce` support.
