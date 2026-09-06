# Design — Aarav Sharma Portfolio (aaravsharma.dev)

A locked design system for this site. Every page reads this file before emitting code. Do not regenerate per page — extend or amend this file when the system needs to grow.

/* Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V5 */
/* Hallmark · macrostructure: Marquee Hero · genre: atmospheric · theme: Liquid Chrome · nav: N5 Floating Pill · footer: Ft5 Statement */

## Genre
atmospheric (obsidian liquid chrome, specular ice-cyan reflections, tactile glass cards)

## Macrostructure family
- Marketing pages (index): Marquee Hero with parallax liquid chrome ribbon, live capability ticker, and frosted glass modules
- Repertory pages (projects): Filterable obsidian glass grid with live release metrics
- Profile & FAQ pages (about): Editorial two-column with live coordinates, career narrative, and Google Knowledge Panel FAQ
- Interaction pages (contact): Tactile glass coordinates with 1-click UPI drawer (`ghanshyamsharma.nlu@okicici`)

## Theme — "Liquid Chrome & Obsidian"
- `--paper`:        oklch(10% 0.02 255) deep obsidian
- `--paper-2`:      oklch(14% 0.025 255) card obsidian
- `--paper-3`:      oklch(18% 0.03 255) elevated obsidian
- `--ink`:          oklch(98% 0.005 250) pure specular silver-white
- `--ink-2`:        oklch(78% 0.025 250) metallic steel
- `--ink-3`:        oklch(58% 0.02 250) deep chrome gray
- `--accent`:       oklch(82% 0.14 225) specular ice-cyan (#70c8ff)
- `--accent-2`:     oklch(92% 0.03 240) liquid mercury silver
- `--accent-glow`:  rgba(112, 200, 255, 0.28)
- Glass:            `rgba(15, 20, 30, 0.65)` with `backdrop-filter: blur(24px) saturate(160%)`
- Hairlines:        `rgba(255, 255, 255, 0.12)` with specular edge highlight

## Typography
- Display: Clash Display & Syne, weights 700-800, roman only (italic headers strictly forbidden)
- Body: Manrope, weights 400, 500, 600
- Mono: JetBrains Mono, weights 500, 600 (metrics, labels, coordinates, UPI code)
- Headline sizing: clamp(2.8rem, 7.5vw, 5.5rem) with -0.03em tracking

## Motion
- Parallax: Hardware-accelerated RAF drift on the liquid-chrome ribbon backdrop
- Reveals: IntersectionObserver `.reveal` with 20px translation and subtle cubic-bezier easing
- Microinteractions: Magnetic button hover, cursor spotlight reflection on cards
- Reduced Motion: Spatial movement collapses instantly; fades only
