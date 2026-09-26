# Criyx Homepage — Project Context

Last updated: 25 September 2026  
Production: https://criyx-in-full-flow.criyx-ai.chatgpt.site  
Sites project ID: `appgprj_6ab11a50a5688191a36d52be7cb0cfc8`

## 1. Project goal

This is the current Criyx parent-company homepage. It positions Criyx as an AI automation and custom software company, then introduces the product line, industry use cases, company, delivery method, FAQs, and contact call to action.

The visual direction is minimal, editorial, precise, and premium. Keep generous space, strong typography, pale blue-white surfaces, deep navy backgrounds, fine rules, and restrained motion. Avoid bright multicolour gradients, red accents, generic glass cards, dense copy, excessive rounded containers, and visual effects that compete with the content.

## 2. Current page structure

The homepage is composed in `app/page.tsx`:

1. Fixed navigation with desktop and mobile states.
2. Hero: “Intelligence, put to work.”
3. Flow convergence section (`id="systems"`): dark “from chaos to flow” visual with pain-point pills, converging lines, central Criyx logo, and three outcome cards. (Replaced the old product index on 25 Sept 2026 — see §12.)
4. Industry solutions: real estate, jewellery, and healthcare/services.
5. About Criyx.
6. Four-step approach: Map, Model, Build, Improve.
7. FAQ accordion.
8. Contact section with the oversized Criyx wordmark.
9. Footer.

The current hero and flow-convergence section are the most deliberately refined parts. Preserve their hierarchy unless a new brief explicitly changes it.

## 3. Hero implementation

The hero combines three transparent visual layers behind centered copy:

- `components/ui/waves-background.tsx`: animated blue wave shader and the base atmosphere.
- `components/ui/orbiting-circles-02.tsx`: large edge-to-edge orbital composition.
- `components/ui/orbiting-circles-02-utils/particalsphear.tsx`: rotating Canvas 2D particle globe placed partly below the viewport edge.
- `components/ui/ripple-distortion.tsx`: pointer-driven transparent ripple overlay, styled by `components/ui/ripple-distortion.css`.

Layering is controlled near the end of `app/refinements.css`: waves at `z-index: -4`, globe/orbits at `-3`, ripple at `-2`, and hero content above them. The ripple uses OGL/WebGL where available and a Canvas 2D ring fallback when WebGL cannot initialize. The visual must remain transparent so the existing waves and globe stay visible.

The opening sequence is `LaunchSequence` in `app/page.tsx`. It uses six staggered shutters, the Criyx identity, and a progress rule. It runs once per browser session through the `criyx-intro-v2` session-storage key. The main hero elements enter after the loader completes.

The fixed header remains white and transparent while the hero is visible. It switches to a light blurred header when `#systems` reaches the navigation area. This is calculated from the product section position, not an arbitrary scroll value.

## 4. Product index (retired 25 Sept 2026 — replaced by §12 Flow convergence)

> Status: `components/product-index.tsx` and `app/product-index.css` are no longer imported. They are retained for reference only, like the product-theatre experiment.

The section directly below the hero used to be intentionally a product directory rather than a set of explanatory cards. Notes on the old design are kept below for reference.

Files:

- `components/product-index.tsx`
- `app/product-index.css`

Products currently listed:

1. Voice Agents
2. WhatsApp Agent
3. Criyx CRM
4. Review Automation
5. SEO Agent
6. Card Collector
7. Avatar Cloning
8. Video Workflow
9. Partner Voice API

Each row contains only an ordinal, product name, and Lucide icon. There are no descriptions or card containers. Rows reveal with `IntersectionObserver`; icons float subtly and respond on hover. Reduced-motion users receive a static version. Keep this section simple and scannable because future product detail pages will carry the full explanations.

## 5. References and how they were used

- **Current Criyx website (`criyx.com`)**: brand context and the preference for the Criyx identity/wordmark. The project uses a locally recreated mark and the text wordmark rather than hotlinking the old site.
- **User-provided globe reference screenshot**: informed the edge-to-edge globe horizon at the bottom of the hero and the centered placement of the hero copy.
- **21st.dev Globe component**: inspired the early rotating-earth exploration. The final production hero evolved into a lighter particle globe so it integrates with the blue wave background.
- **21st.dev Orbiting Circles 02 component**: supplied the base orbit idea. It was rebuilt for this hero with local icon assets, transparent rendering, a much larger scale, alternating orbit directions, and slower motion.
- **User-provided React Bits RippleDistortion component**: adapted into a transparent interaction layer rather than its original opaque image treatment. OGL is used only for this effect.
- **Framer showcase sites**: informed the restrained hero typography, centered hierarchy, and motion pacing.
- **Atlassian product presentation and Know AI Club references**: informed the product-system exploration. The final direction was simplified into the current editorial index after feedback that descriptive cards and long scroll sequences felt over-designed.
- **User-provided whiteboard/product context**: established the nine product names above.

These references are direction only. Do not paste external layouts or reintroduce the discarded card carousel without a new instruction.

## 6. Brand and typography

Fonts are loaded in `app/layout.tsx` with `next/font/google`:

- Manrope: primary interface and body type.
- Geist: large product names and selected display text.
- Geist Mono: section labels, counters, and technical metadata.
- Instrument Serif: editorial italic emphasis.

Core colours are defined in `app/globals.css`. The working palette centers on deep navy (`#030914`, `#07111e`), Criyx blue (`#2457ff`), pale blue-grey (`#edf2f3`), and white. Red is deliberately excluded from the visual system.

The brand icon is built with CSS through `.brand-icon`. `public/criyx-mark-black.png` also exists for uses that require an image asset. The footer/contact wordmark should remain oversized.

## 7. Assets

Active visual assets in `public/`:

- `criyx-flow.png`: sculptural blue loop in the About section.
- `og.png`: social preview image.
- `favicon.svg`: browser icon.
- `criyx-mark-black.png`: raster Criyx mark.
- `orbit-icons/*.svg`: local logos for Supabase, Gemini, Make, Figma, Slack, Claude, React, and Python.

Legacy/experimental hero media are retained for reference but are not part of the current hero composition: `criyx-earth-clear.mp4`, `criyx-earth-motion-v2.mp4`, `criyx-hero-motion.mp4`, `criyx-hero-poster.jpg`, and `earth-texture.jpg`.

## 8. Active and legacy code

Active global styles load in this order from `app/layout.tsx`:

1. `app/globals.css`
2. `app/refinements.css`
3. `app/product-index.css`

`components/product-theatre.tsx` and `app/product-theatre.css` are older product-showcase experiments. They are not imported and can be removed after confirming they are no longer needed. `components/ui/globe.tsx` is also an earlier globe experiment. The large shadcn component set is scaffolded under `components/ui/`; only a subset is used on the homepage.

## 9. Technical stack and local setup

- React 19 + TypeScript
- vinext/Vite application structure
- Tailwind CSS 4 and shadcn structure (`components/ui`)
- Lucide React icons
- OGL `1.0.11` for the hero ripple
- Cloudflare Workers/Sites build tooling

Requirements: Node.js `>=22.13.0`.

```bash
npm install
npm run dev
```

Local development uses Vite. Production build:

```bash
npx tsc --noEmit
npm run build
```

The latest checked production source commit at the time this file was created is `3e0c91069d06ad4fba8b2242b90ae60a794c1376`. The repository may gain a later commit containing this context file.

## 10. Interaction, accessibility, and performance rules

- Preserve `prefers-reduced-motion` fallbacks in the loader, product index, particle globe, and ripple.
- Keep decorative canvases and orbit graphics `aria-hidden` and pointer transparent.
- Maintain keyboard focus styles, the skip link, semantic headings, and Escape-to-close behavior for the mobile menu.
- Canvas animations pause when off screen or when the document is hidden.
- Keep the hero effects local and transparent; avoid loading remote media at runtime.
- Check both wide desktop and approximately 390 px mobile after layout edits.
- Keep the hero readable before adding more decoration. The main headline, short supporting line, and two calls to action are the priority.

## 11. Links and publishing

- Discovery call: `https://cal.com/criyx.ai/discovery-call`
- Contact: `info@criyx.com`
- Hosting configuration: `.openai/hosting.json`
- The published site is currently owner-private through Sites.
- `robots.index` and `robots.follow` are both disabled in `app/layout.tsx`. Change this only when the site is ready for public indexing.

When another agent continues the project, it should first read this file, then inspect `app/page.tsx`, `app/refinements.css`, `components/flow-convergence.tsx`, `app/flow-convergence.css`, and the hero components listed above before changing the layout.

## 12. Checkpoint — 25 September 2026 (hero tune-up + flow convergence section)

Where we left off: hero refinements done, old product index replaced, dev server running. Continue here.

### 12a. Hero tune-up (same session)
- Particle globe enlarged: desktop `clamp(620px, 66vw, 1080px)`, mobile `min(128vw, 640px)` (`app/refinements.css`).
- Ripple strengthened: `strength` `1` → `1.35` (`app/page.tsx`), WebGL alpha cap `0.42` → `0.55`, Canvas 2D fallback now honours `strength` (`components/ui/ripple-distortion.tsx`).
- Wave background deepened: `intensity` `0.620` → `0.700`, `warp` `0.240` → `0.300` (`components/ui/waves-background.tsx`).

### 12b. New section below hero: FlowConvergence
- Replaces the nine-row editorial product index. Reference: `/home/uttkarsh/Pictures/Screenshot_2026-09-25_17-55-33.png` (user chose same labels/cards as the reference).
- New files: `components/flow-convergence.tsx`, `app/flow-convergence.css`.
- Edited: `app/page.tsx` (imports/uses `FlowConvergence`), `app/layout.tsx` (loads `flow-convergence.css` instead of `product-index.css`).
- Content: centered lede + “Book a Discovery Call” (`https://cal.com/criyx.ai/discovery-call`); left pills (Manual spreadsheets, Repetitive tasks, Generic tools, Repetitive data entry, Drowning in emails, Missed follow-ups) with floating app tiles; six gradient SVG curves + trunk line converging on a large free-floating Criyx logo (navbar `brand-icon` asset, glow halo, sonar pulses, dashed orbit ring, `criyx` wordmark); glowing dots travel every curve and the trunk via SMIL `animateMotion` (skipped under `prefers-reduced-motion`); right cards Autonomous Operations / Predictive Analytics / AI Infrastructure with the reference bullets, index numbers, top hairline, hover lift+glow; bottom blue glow.
- Keeps `id="systems"` so nav anchors and the header scroll switch keep working.
- Retired but retained: `components/product-index.tsx`, `app/product-index.css` (unused, not imported).

### 12c. Local dev
- `npm install` completed (567 packages). Dev server: `http://127.0.0.1:5174` (also `http://localhost:5174`); port 5173 died mid-session, use 5174.
- `tsc --noEmit` passes. No tests exist in the repo.

### 12d. Likely next tweaks (user reviewing visually)
- Logo size vs cards, dot speed/subtlety, orbit ring on/off, pill positions on narrow desktop.

## 13. Checkpoint — 26 September 2026 (product showcase section)

### 13a. New third section: ProductShowcase
- Sits between FlowConvergence and the industry solutions. Immersive scroll: nine sticky-stacking cards (one per product) with a live `01–09` counter + progress bar.
- New files: `components/product-showcase.tsx`, `app/product-showcase.css`.
- Edited: `app/page.tsx` (renders `<ProductShowcase />` after `<FlowConvergence />`), `app/layout.tsx` (loads `product-showcase.css`).
- Copy reuses the nine product names/icons plus the category/tagline/description lines from the retired `product-theatre.tsx` experiment.

### 13b. Section renumbering
- FlowConvergence eyebrow is now `01 / FROM CHAOS TO FLOW`; showcase is `02 / THE PRODUCT LINE`; industries `03`, about `04`, approach `05`, FAQ `06` (`app/page.tsx`).

### 13c. Validation
- `tsc --noEmit` passes. Dev server `http://127.0.0.1:5174` verified HTTP 200.

## 14. Checkpoint — 26 September 2026 (showcase gradient + real imagery)

- Showcase now sits on the same `#04070e` gradient canvas as FlowConvergence, with a mirrored top glow so the two dark sections read as one continuous canvas (plus a matching bottom glow into the industries section).
- Each of the nine cards carries a local relatable photo in `public/products/` (voice.jpg studio mic, whatsapp.jpg messaging phone, crm.jpg dashboard, reviews.jpg customer, seo.jpg marketing analytics, event.jpg conference audience, avatar.jpg portrait, video.jpg cinema, api.jpg code). All served locally — no remote media at runtime. Card layout is split copy/media with alternating sides and hover zoom.
- `tsc --noEmit` passes. Dev server `http://127.0.0.1:5174` verified HTTP 200.

## 15. Checkpoint — 26 September 2026 (logo-only core, seamless seam, cinematic panels)

- FlowConvergence core is now the bare Criyx mark only — `criyx` wordmark removed. Logo center sits exactly on the stage anchor (`left: 44%`, `top: 50%`) where all wires converge and the trunk originates.
- Seamless 2→3 transition: convergence bottom padding tightened, showcase top padding tightened, both glows peak at the shared boundary on the same `#04070e` canvas.
- Showcase rebuilt as full-bleed cinematic sticky panels (no more boxed cards): each product gets a full-panel local photo with gradient scrim, alternating text sides, slow zoom-out on reveal, ghost numbers, sticky `top: 0`, live counter retained. Copy frames the nine items as the SaaS line being built.
- `tsc --noEmit` passes. Dev server `http://127.0.0.1:5174` verified HTTP 200.

## 16. Checkpoint — 26 September 2026 (interactive index + 9 product pages)

- Third section redesigned again: interactive editorial index (`components/product-showcase.tsx`, `app/product-showcase.css`). Nine large rows (number, name, category, arrow); hovering a row shows a cursor-following photo preview with the product image; every row links to its product page. Touch/reduced-motion fallbacks hide the preview. Copy frames the nine as the SaaS line being built.
- Single source of truth: `lib/products.ts` (slug, name, category, line, description, image, alt, icon, 4 features, outcome + `neighbours()` helper).
- Nine static product routes `app/products/<slug>/page.tsx` sharing `components/product-page.tsx` + `app/product-page.css` (loaded from root layout): sticky mini-nav, hero with photo, “What’s inside” features, outcome banner, prev/next product pager (full 1→9→1 loop), mini footer, per-page metadata. Plain `<a>` used (no `next` package installed, so no `next/link`).
- Homepage “Products” links (desktop/mobile/footer nav, hero CTA + scroll cue) now point to `#products`; header scroll trigger still uses `#systems`.
- Verified: `tsc --noEmit` passes; all 10 routes return HTTP 200; `/products/voice-agents` HTML confirmed server-rendered with correct content, title, and CSS.
