# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static personal portfolio website. No build step — edit files directly and open `index.html` in a browser. Deployed via GitHub Pages at [benringia.github.io/projects](https://benringia.github.io/projects).

## Active Files

- `index.html` — single-page layout, all sections
- `style.css` — **the active stylesheet** (ignore `style.scss`, it is not compiled or used)
- `js/app.js` — all runtime JS: preloader, mobile nav, scroll-to-top, hero typewriter, load-more

## Architecture

### Layout

Sticky top `<nav class="navbar">` + full-page scroll. Below the navbar sits a `.hero-section` (fixed height), then a `<div class="content">` that wraps all project sections.

### Sections

Each project section follows this pattern:

```html
<section class="section" id="[id]">
  <h2 class="title02">Section Name<span class="underscore">_</span></h2>
  <div class="margin-btm20"><small>// subtitle</small></div>
  <div class="flex-container">
    <div class="flex-item4 card-item">...</div>
  </div>
</section>
```

Section IDs (in order): `recents`, `godotgames`, `claudecode`, `fswebsites`, `websites`, `games`, `jsapps`, `phpapps`

### Load More

`initLoadMore()` in `app.js` runs at page load. It hides cards beyond the threshold and injects a `<button class="load-more-btn">` after each `.flex-container` that exceeds it. Threshold: **5 cards** on desktop, **3 cards** on mobile (≤540px).

- Cards use class `.card-item` — required for load-more to target them
- Hidden cards get class `.card-hidden { display: none }`
- The button is self-removing on click (reveals all, then `btn.remove()`)

### Hero Typewriter

`initCodeTyper()` in `app.js` animates a fake JS object into `.code-card__body code` character by character. The token array is defined inline in `app.js` — edit there to update displayed stack/tools. Speed is controlled by `BASE = 15` (ms per character).

### Theme / Design Tokens

All colours and sizing via CSS custom properties in `:root` (top of `style.css`):

| Variable | Value | Use |
|---|---|---|
| `--bg` | `#080b10` | Page background |
| `--surface` / `--surface-2` / `--surface-3` | dark greys | Cards, elevated surfaces |
| `--accent` | `#00d9ff` | Cyan highlights, borders, links |
| `--navbar-height` | `60px` | Used in offset calculations |

Fonts: **Inter** (body) + **JetBrains Mono** (code, BC logo, accents) — loaded from Google Fonts.

### Mobile Breakpoints

- `≤768px` — navbar collapses to hamburger + `#mobileMenu` dropdown
- `≤540px` — cards go 1-per-row, load-more threshold drops to 3

### Dependencies (all local/vendored)

- `fontawesome/` — icon set (CSS + webfonts, no CDN)
- `carousel/` — Owl Carousel files are present but **not loaded** in the current HTML
- `js/jquery-3.4.1.min.js` — present but **not loaded** in the current HTML


## Adding Project Cards

- Always inspect existing cards in the target section before writing new markup
- Match class names exactly from the existing cards, not from the section template above
- New projects go first in both `#recents` and their category section
- Only edit `index.html` unless the task explicitly involves styles or JS

## Claude Code Section (#claudecode)

Cards in this section use a special layout variant (`.card--claudecode`) that differs from other sections.

Each card must include:
- Thumbnail/logo image (stored in `images/<filename>`)
- Project title
- Short description (1–2 sentences)
- Tech stack as inline pills styled with `--accent`
- Live link (+ GitHub link if available)

Thumbnail guidelines:
- Use an `<img>` tag inside the card, above the title
- Add a fallback: `onerror="this.style.display='none'"`
- Use `loading="lazy"` attribute
- Style with `object-fit: contain` and a fixed height so logos don't stretch

When adding a new project here, always provide:
- `thumbnail:` path relative to root (e.g. `images/virtual-pet-fitness.svg`)
- `description:` 1–2 sentences
- `stack:` comma-separated list of technologies
- `live:` URL
- `github:` URL (if available)

Always keep `.card-item` on the card wrapper for load-more compatibility.

Thumbnail display style — **Glowing Badge**:
- Center the logo in a `--surface-2` background container with fixed height (e.g. `120px`)
- Apply a soft cyan glow: `box-shadow: 0 0 20px var(--accent)`
- Use `object-fit: contain` so logos aren't stretched
- Add `loading="lazy"` and `onerror="this.style.display='none'"`