# Pixel To AI — Portfolio Website

Single-page portfolio for **Manpreet Kaur / Pixel To AI** — "From Pixels To Intelligence."

## Files

```
index.html        Page structure (all sections)
style.css         Design system + all styling
script.js         Nav behavior, filters, case-study toggles, hero animation, form
assets/logo.svg       Icon-only mark (navbar, footer, favicon)
assets/logo-full.svg  Icon + wordmark lockup (use on documents, email signature, socials)
```

Open `index.html` directly in a browser to preview, or upload the whole folder to any static host
(Netlify, Vercel, GitHub Pages, cPanel, etc.) — no build step required.

## Color palette

| Token | Hex | Use |
|---|---|---|
| Ink | `#0A0E1A` | Dark section backgrounds, footer |
| Paper | `#F6F7FB` | Light section backgrounds |
| Slate | `#161F33` | Body text on light sections |
| Blue | `#2F6FED` | Primary accent |
| Violet | `#7C5CFC` | AI / "intelligence" accent |
| Cyan | `#22D3EE` | Highlights, glow, dark-section links |

All tokens live at the top of `style.css` under `:root` — change them once and the whole site updates.

Fonts: **Poppins** (headings), **Inter** (body), **JetBrains Mono** (labels/stats) — loaded from Google Fonts.

## Adding your own photos

Every image slot is currently a placeholder `<div>` so the site works with zero assets. To swap one in:

1. Drop your image into `assets/` (create an `assets/portfolio/` folder for project shots).
2. Find the placeholder in `index.html`, e.g.:
   ```html
   <div class="portfolio-media">
     <div class="portfolio-placeholder"><i class="fa-solid fa-image"></i></div>
   </div>
   ```
3. Replace the inner `<div class="portfolio-placeholder">…</div>` with:
   ```html
   <img src="assets/portfolio/your-image.jpg" alt="Project title" loading="lazy">
   ```

The same pattern applies to the hero profile photo (`.hero-image-placeholder`) — replace it with
`<img src="assets/manpreet-kaur.jpg" alt="Manpreet Kaur">`.

For the **Download Resume** button, add a real PDF at `assets/Manpreet-Kaur-Resume.pdf` (the link is
already wired up in `index.html`).

## How to add a Case Study

The Case Studies section (`#case-studies`) is built from repeatable cards. To add a new one:

1. Open `index.html` and find `<div class="case-study-list">`.
2. Copy one entire `<article class="case-study-card">…</article>` block.
3. Update these parts in your copy:
   - `case-study-tag` — the category label (e.g. "AI Storytelling")
   - `case-study-title` and `case-study-client`
   - `case-study-stat-number` / `case-study-stat-label` — your one headline result
   - The three `case-study-block` paragraphs: **Challenge**, **Approach**, **Result**
   - `case-study-tags` — short skill/tool tags
4. Give the card's `data-case-toggle` button and its details `<div>` a unique, matching `id`
   (e.g. `case-4`, with `aria-controls="case-4"` on the button).

No JavaScript changes are needed — `script.js` automatically wires up any element with
`data-case-toggle` to expand/collapse its matching panel.

## Contact section

- Email and WhatsApp are already live (`mailto:` and `wa.me` links), plus a floating WhatsApp
  button in the bottom-right corner.
- Instagram, YouTube, and LinkedIn links currently point to `#` — replace with real profile URLs.
- No Google Map is included, per request; the location card is a static text line
  ("Available Worldwide") you can edit directly in `index.html`.
- The contact form (`#contactForm`) is front-end only — it validates and shows a confirmation
  message, but needs to be connected to a form backend (e.g. Formspree, EmailJS, or your own PHP
  endpoint) to actually deliver messages to `lumoraofficials@gmail.com`.

## Notes

- Portfolio filtering, animated skill bars, animated stat counters, the case-study accordion, and
  the hero's pixel-to-network canvas animation are all handled in `script.js` with no dependencies
  beyond what's already linked (Bootstrap, AOS, GSAP is loaded and available for further motion work).
- All animations respect `prefers-reduced-motion`.
