# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Product Overview

**Anniversary Terus** is a bespoke, interactive anniversary web experience created by **Jaja** for **Dutdut** (targeting their June 9th anniversary). It transforms personal memories, love letters, milestones, music, and photography into a sequential, atmospheric digital keepsake.

## Users

- **Primary User (Recipient):** Dutdut, experiencing the anniversary gift on mobile or desktop in a private, unhurried setting.
- **Secondary User (Creator / Maintainer):** Jaja, maintaining and extending the experience with new memories, photos, and copy over future anniversaries.

## User Needs and Pain Points

- **Emotional Resonance:** Generic greeting cards or static photo albums feel impersonal and fail to capture the depth of shared history.
- **Effortless Discovery:** The recipient should be guided naturally from an intimate reveal moment into the letter, timeline, interactive galaxy, garden, and gallery without UI clutter or confusion.
- **Device Flexibility & Accessibility:** The experience must work smoothly on both mobile touchscreens and desktop browsers, with legible typography, clear contrast across both themes, keyboard support, and respect for reduced-motion preferences.

## Product Purpose

Deliver a memorable, deeply personal anniversary celebration in the browser that feels handcrafted, intimate, and cohesive—preserving every shared story, photo, and interactive surprise.

## Positioning

Unlike generic anniversary templates or social media posts, Anniversary Terus pairs bilingual (Indonesian & English) personal storytelling with custom interactive moments—a Web Audio chime gift-box reveal, an orbital photo-memory galaxy (*LoveLoom*), an interactive floral wish garden, and an integrated serenade audio visualizer.

## Primary User Journeys

1. **The Reveal (Intro):** Visitor arrives at a dark, focused stage with an interactive gift box (`tap to open your gift`), clicks/activates it to trigger a Web Audio chime arpeggio, floral burst, and petal rain, transitioning into the main experience and starting the background serenade (`You and I` by One Direction).
2. **Hero & Countdown:** Visitor sees the anniversary greeting (`Jaja & Dutdut — Happy Anniversary, Dutdut`) and a live countdown to June 9th (or a celebration banner on June 9th itself), then scrolls down to the letter.
3. **The Letter (`#message`):** Visitor reads the three-paragraph personal anniversary letter inside a 3D-tilting surface.
4. **Galaxy of Us (`#loveloom`):** Visitor explores four orbiting photo planets around a central sun and clicks/taps any planet to open a modal with its secret memory note.
5. **Timeline (`#timeline`) & Cherished Qualities (`#reasons`):** Visitor scrolls through four relationship milestones and six tribute cards.
6. **Anniversary Garden (`#garden`):** Visitor hovers or taps seven flowers to reveal hidden anniversary wishes.
7. **Memories (`#memories`) & Finale (`#finale`):** Visitor views the four-photo gallery and reaches the closing message, while optionally toggling between **Sweet Pink** (`pink`) and **Romantic Dark** (`dark`) themes or controlling playback via the floating music player.

## Operating Context

- **Environment:** Modern desktop and mobile web browsers (touch and pointer devices).
- **Audio Context:** Browser autoplay policies require user interaction (opening the gift box) before Web Audio API chimes and HTML5 `<audio>` playback unlock.
- **Language:** Bilingual Indonesian (casual/affectionate) and English copy.

## Capabilities and Constraints

- **Framework:** Next.js 16 (App Router), React 19, TypeScript 5, Tailwind CSS v4.
- **Static Assets:** Local images in `public/assets/images/img1.jpeg`–`img4.jpeg` and audio in `public/music/song1.mp3`.
- **Dual Theme Support:** Must support both `data-theme="pink"` (Sweet Pink, default) and `data-theme="dark"` (Romantic Dark / Burgundy) without contrast regressions.
- **No Backend / Database:** Purely client-side static/rendered experience; no server mutations or external API dependencies.

## Brand Commitments

- **Title & Names:** "Anniversary Terus", "Jaja & Dutdut", signature "— You and I" / "kamu baong".
- **Preserved Copy & Assets:** All personal Indonesian/English messages, milestone dates/stories, photo assets (`img1.jpeg`–`img4.jpeg`), and soundtrack (`song1.mp3`) must be preserved faithfully.
- **Dual-Mood Aesthetic:** Soft Dreamy Sakura Pink (`pink`) and Deep Burgundy Wine (`dark`) themes.

## Evidence on Hand

- `app/page.tsx`: Complete single-page narrative flow with 8 sections.
- `components/`: 8 interactive React components (`GiftBox`, `CountdownTimer`, `InteractiveCard`, `LoveLoomOrbit`, `TimelineMilestones`, `MusicPlayer`, `PetalCanvas`, `CursorTrail`).
- `public/assets/images/img1.jpeg`–`img4.jpeg` and `public/music/song1.mp3`.
- `temp_assets/css/`: Legacy stylesheets (`style.css`, `dark-romantic.css`, `animations.css`, `performance.css`, `gpu-optimization.css`).

## Product Principles

1. **Intimacy Over Spectacle:** Every animation, particle, and interaction serves the personal story rather than distracting from it.
2. **Dual-Theme Parity:** Both Sweet Pink and Romantic Dark must maintain clear visual hierarchy and WCAG-compliant text contrast.
3. **Touch & Keyboard First-Class:** Every interactive surprise (gift box, orbiting planets, flower wishes, music player) must work via tap, click, and keyboard.
4. **Restrained Craft:** Smooth exponential motion, unified semantic tokens, and zero broken artifacts or visual clutter.

## Accessibility & Inclusion

- Semantic HTML landmarks (`<main>`, `<section>`, `<header>`, `<button>`) and accessible names (`aria-label`) for all icon/emoji controls.
- Keyboard navigation (`Enter`/`Space` activation, `Escape` to close modals, visible `:focus-visible` rings).
- Minimum 4.5:1 contrast for body copy and 3:1 for large display headings across both `pink` and `dark` themes.
- Full `prefers-reduced-motion: reduce` support disabling continuous particle/orbit/tilt/cursor-trail animations.
