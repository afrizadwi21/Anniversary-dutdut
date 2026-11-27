# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Product Overview

**buat dutdut** is a private, interactive digital keepsake created by **Jaja** for **Dutdut**. It presents personal letters, relationship milestones, a realistic 3D interactive memory orbit, curated photography, and an integrated soundtrack (`song1.mp3`) inside a calm, nocturnal observatory experience.

## Users

- **Primary User (Recipient):** Dutdut, opening the page on mobile or desktop to read, listen, and explore shared memories.
- **Secondary User (Creator / Maintainer):** Jaja, updating photos, milestone notes, and personal copy over time.

## User Needs and Pain Points

- **Direct Entry:** The experience should open immediately into the main story without a blocking gift-box intro screen.
- **Mature, Uncluttered Tone:** Avoid pink templates, emoji clutter, and generic card grids in favor of focused typography, spatial depth, and quiet atmosphere.
- **Tactile 3D Exploration:** The memory orbit should feel genuinely three-dimensional with depth, lighting, and smooth interaction on both touchscreens and desktops.

## Product Purpose

Deliver a cohesive, personal web keepsake titled **buat dutdut** where music, 3D orbital memories, milestones, and photography live together seamlessly.

## Positioning

Unlike generic greeting templates, **buat dutdut** combines a real-time 3D perspective planetary memory system, live June 9th countdown, personal Indonesian/English narrative, and an integrated Web Audio visualizer player.

## Primary User Journeys

1. **Immediate Arrival (`#hero`):** Visitor lands directly on the **buat dutdut** hero with a live countdown to June 9th and a direct invitation to explore or play music.
2. **3D Memory Orbit (`#orbit`):** Visitor drags or tilts a 3D orbital plane of photo-planets revolving around a luminous star, clicking any planet to read its hidden memory note.
3. **The Letter (`#letter`):** Visitor reads the three-paragraph personal message in a calm, distraction-free editorial column.
4. **Milestones (`#timeline`) & Qualities (`#qualities`):** Visitor scrolls through key relationship chapters and six numbered reflections.
5. **Photo Gallery (`#memories`) & Close (`#closing`):** Visitor views curated photography (with clean placeholder support for future swaps) and reaches the closing note while controlling playback in the floating music player.

## Capabilities and Constraints

- **Framework:** Next.js 16 (App Router), React 19, TypeScript 5, Tailwind CSS v4.
- **No Pink & No Emojis:** Strict ban on pink/rose palettes and Unicode emojis across all UI and copy.
- **No Gift Box Intro:** Direct entry to `<main>`.
- **Audio:** `public/music/song1.mp3` via `MusicPlayer` with Web Audio frequency visualizer.
- **Images:** Local photos in `public/assets/images/img1.jpeg`–`img4.jpeg` (gitignored) with clean SVG dummy placeholders in `public/assets/dummy/` as fallback/reference.
