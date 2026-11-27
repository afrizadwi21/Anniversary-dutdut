---
name: Anniversary Terus
description: Dual-theme romantic floral keepsake design system pairing Cormorant Garamond editorial serif with Raleway humanist sans across Sweet Pink and Romantic Dark moods.
colors:
  rose-primary: "#d9406b"
  rose-glow: "#ff96b4"
  blush-soft: "#ffc8dc"
  sakura-surface: "#ffeef2"
  sakura-surface-alt: "#ffdcdb"
  burgundy-bg: "#180410"
  burgundy-deep: "#0e0208"
  cream-ink: "#fff8f3"
  crimson-ink: "#4a0e17"
  crimson-muted: "#7c243c"
  gold-accent: "#f7c873"
typography:
  display:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(2.75rem, 6vw, 4.75rem)"
    fontWeight: 300
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(2rem, 4vw, 3rem)"
    fontWeight: 300
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "1.375rem"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "0em"
  body:
    fontFamily: "Raleway, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 300
    lineHeight: 1.7
    letterSpacing: "0.01em"
  label:
    fontFamily: "Raleway, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.16em"
rounded:
  sm: "8px"
  md: "16px"
  lg: "24px"
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
    backgroundColor: "{colors.sakura-surface}"
    textColor: "{colors.crimson-ink}"
    rounded: "{rounded.full}"
    padding: "8px 16px"
  card-surface:
    backgroundColor: "{colors.sakura-surface}"
    textColor: "{colors.crimson-ink}"
    rounded: "{rounded.lg}"
    padding: "24px"
---

# Design System: Anniversary Terus

## Overview

**Creative North Star: "The Pressed-Flower Keepsake"**

Anniversary Terus is an intimate, editorial romantic keepsake designed to feel like a handwritten letter pressed between silk-textured pages. Rather than a generic dashboard or loud neon template, it pairs airy Cormorant Garamond serif typography with light-weight Raleway body copy over two cohesive atmospheric moods: **Sweet Pink** (default daylight sakura paper) and **Romantic Dark** (evening burgundy velvet).

Motion is gentle and natural—drifting petals, smooth exponential reveals, and subtle 3D card tilt—never bouncy or jarring. Every surface uses semantic CSS custom properties so components adapt cleanly between themes without brittle utility overrides.

**Key Characteristics:**
- Editorial serif display voice (`Cormorant Garamond`, weight 300, italic accents) paired with clean humanist sans (`Raleway`).
- Dual-theme semantic token architecture (`[data-theme="pink"]` and `[data-theme="dark"]`).
- Tinted translucent surfaces with crisp hairline borders and soft ambient shadows.
- Purposeful, reduced-motion-safe interactivity (gift box reveal, LoveLoom orbit, floral wish tooltips, audio visualizer).

## Colors

The palette balances warm rose accents against high-contrast ink tones tailored to each theme's ambient light.

### Primary
- **Rose Primary** (`#d9406b`): Primary accent for italic display emphasis, active borders, and interactive focus indicators in Sweet Pink mode.
- **Rose Glow** (`#ff96b4`): Primary luminous accent in Romantic Dark mode, used for active borders, orbit rings, and focus rings.
- **Gold Accent** (`#f7c873`): Reserved exclusively for the gift-box ribbon/bow and the central sun in the LoveLoom orbit.

### Neutral
- **Sakura Surface** (`#ffeef2`): Base canvas background in Sweet Pink mode.
- **Sakura Surface Alt** (`#ffdcdb`): Secondary gradient stop and scrollbar track in Sweet Pink mode.
- **Crimson Ink** (`#4a0e17`): Primary heading and high-emphasis body ink in Sweet Pink mode (high contrast ≥ 10:1 on `#ffeef2`).
- **Crimson Muted** (`#7c243c`): Secondary body copy, labels, and captions in Sweet Pink mode (≥ 5.5:1 on `#ffeef2`).
- **Burgundy Background** (`#180410`): Base canvas background in Romantic Dark mode.
- **Burgundy Deep** (`#0e0208`): Deepest backdrop and selection ink in Romantic Dark mode.
- **Cream Ink** (`#fff8f3`): Primary heading and display ink in Romantic Dark mode.
- **Blush Soft** (`#ffc8dc`): Secondary body copy and muted labels in Romantic Dark mode.

**The Single-Accent Discipline Rule.** Rose Primary (`#d9406b`) and Rose Glow (`#ff96b4`) are the sole interactive accent colors per theme. Never introduce unrelated blue, purple, or neon hues.

## Typography

**Display Font:** `Cormorant Garamond` (fallback: `Georgia, serif`)
**Body Font:** `Raleway` (fallback: `system-ui, -apple-system, sans-serif`)

**Character:** Delicate, literary, and unhurried. Light-weight serif headings (`300`) with italicised emotional phrases create a handwritten-letter cadence, grounded by crisp `Raleway` body text.

### Hierarchy
- **Display** (`300`, `clamp(2.75rem, 6vw, 4.75rem)`, `1.05`): Hero title (`Happy Anniversary, Dutdut`).
- **Headline** (`300`, `clamp(2rem, 4vw, 3rem)`, `1.15`): Section titles (`Menapaki Setiap Detik`, `Pusat Gravitasi`, `Our Beautiful Pictures`).
- **Title** (`400`, `1.375rem`, `1.3`): Card headings, timeline milestone titles, and modal headers.
- **Body** (`300`–`400`, `1rem`, `1.7`): Narrative paragraphs and milestone descriptions, constrained to `65ch` max measure for comfortable reading.
- **Label** (`500`, `0.75rem`, `0.16em` tracking, uppercase): Dates, countdown units, theme toggle, and audio timestamps.

**The Measure Rule.** Long-form letter paragraphs and descriptions never exceed `65ch` in width so lines remain effortless to scan on wide viewports.

## Layout

- **Single-Column Narrative Flow:** Vertical storytelling across full-bleed atmospheric sections (`hero`, `message`, `loveloom`, `timeline`, `reasons`, `garden`, `memories`, `finale`).
- **Container & Rhythm:** Content sits inside centered containers (`max-w-4xl` / `max-w-5xl`) with `px-4 sm:px-6` horizontal gutters and generous vertical section padding (`py-20 md:py-28`).
- **Responsive Grids:**
  - Countdown timer: 4-column grid (`grid-cols-4 gap-3 md:gap-4`) with compact mobile padding.
  - Cherished qualities (`#reasons`): 1 column on mobile, 2 on tablet (`sm:grid-cols-2`), 3 on desktop (`lg:grid-cols-3`).
  - Photo gallery (`#memories`): 1–2 columns on mobile, 2–4 columns on desktop with uniform `aspect-square` framing.
  - Timeline (`#timeline`): Vertical stacked cards on mobile; alternating left/right around a central rose spine on `md+`.
- **Floating Chrome Clearance:** Bottom-left music player panel (`max-w-[calc(100vw-3rem)] sm:w-[320px]`) and bottom-right toggle button (`bottom-6 right-6`) never collide on 320px–375px viewports.

## Elevation & Depth

Surfaces use **translucent tonal layering** (`--surface-card`, `--surface-card-border`) paired with subtle ambient shadows that carry a vertical offset and soft blur.

### Shadow Vocabulary
- **Card Ambient** (`0 8px 32px rgba(74, 14, 23, 0.08)` in Pink / `0 8px 40px rgba(0, 0, 0, 0.45)` in Dark): Resting elevation for message, timeline, and reason cards.
- **Interactive Lift** (`0 16px 44px rgba(217, 64, 107, 0.16)` in Pink / `0 16px 48px rgba(255, 150, 180, 0.18)` in Dark): Hover/focus elevation for interactive cards and floating controls.
- **Modal Depth** (`0 24px 64px rgba(0, 0, 0, 0.35)`): Elevated secret-memory dialog over a dimmed backdrop.

**The Offset-Shadow Rule.** Every shadow includes a positive Y-offset and soft blur; avoid zero-offset neon halos on static containers.

## Shapes

- **Cards & Modals:** Softly rounded (`24px` / `rounded-3xl`) to echo organic flower petals.
- **Controls & Pills:** Full pill (`9999px` / `rounded-full`) for the theme toggle, scroll CTA, and floating music trigger.
- **Media Frames:** `16px` (`rounded-2xl`) for gallery photos and `9999px` for orbiting planet portraits.
- **Borders:** `1px solid` hairline borders using theme-aware `--border-subtle` / `--border-accent` tokens.

## Components

### Buttons & Floating Controls
- **Shape:** Pill (`9999px`) with `1px` border and subtle backdrop blur.
- **States:** Smooth `250ms cubic-bezier(0.16, 1, 0.3, 1)` transitions on hover, `:active` (`scale(0.97)`), and `:focus-visible` (`2px` solid ring with `2px` offset).

### Cards (`message-card`, `reason-card`, `TimelineMilestones`)
- **Shape:** `24px` radius, `1px` border, `24px–40px` internal padding.
- **Behavior:** Optional pointer-driven 3D tilt (`InteractiveCard`) disabled automatically when `prefers-reduced-motion: reduce` is active.

### LoveLoom Orbit & Secret Modal
- **Orbit:** Concentric dashed rings (`1px dashed`) with counter-rotating circular photo buttons (`role="button"`, `tabIndex={0}`, `aria-label`).
- **Modal:** Accessible dialog (`role="dialog"`, `aria-modal="true"`, Escape key support, explicit close button `aria-label`).

### Music Player
- **Panel:** Compact floating card (`max-w-[calc(100vw-3rem)] sm:w-[320px]`) with album art, Web Audio frequency bar visualizer, accessible seek/volume sliders (`aria-label`), and play/pause button.

### Interactive Flower Garden
- **Interaction:** Each flower is keyboard-focusable and tap/hover-interactive so wish tooltips work on both desktop hover and mobile tap/focus.

## Do's and Don'ts

### Do:
- **Do** use semantic CSS variables (`var(--text-primary)`, `var(--text-secondary)`, `var(--surface-card)`, `var(--accent-primary)`) so components work in both `pink` and `dark` themes automatically.
- **Do** use exponential ease-out curves (`cubic-bezier(0.16, 1, 0.3, 1)` or `cubic-bezier(0.22, 1, 0.36, 1)`) for all reveals, modals, and hover transitions.
- **Do** provide `aria-label`, keyboard activation (`Enter`/`Space`), and visible `:focus-visible` rings on all interactive elements.
- **Do** respect `prefers-reduced-motion: reduce` across CSS animations, canvas petals, and cursor trails.

### Don't:
- **Don't** use bounce or elastic easing (`cubic-bezier(0.34, 1.56, 0.64, 1)` or `animate-bounce`).
- **Don't** hardcode dark-only hex colors (`#ffc8dc`, `#fff8f3`) in components without semantic token mapping.
- **Don't** render raw debug text, git conflict markers, or unstyled browser defaults (scrollbars, range inputs, focus outlines).
- **Don't** rely on `:hover` alone for essential content like flower wishes on touch devices.
