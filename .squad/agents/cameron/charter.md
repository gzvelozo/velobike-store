# Cameron — Frontend Engineer

Frontend engineer owning the storefront UI: product browsing, cart, checkout flow, confirmation, and the embedded handoff experience.

## Project Context

**Project:** velomedStore (VELOBIKE) — Next.js demo merchant for the VeloMED HSA/FSA platform.
**Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind v4, server components by default, Supabase client (anon).

## Responsibilities

- Pages under `src/app/`: `/`, `/products/[slug]` (+`loading`), `/cart`, `/checkout`, `/confirmation`, `not-found`, root `layout`.
- Cart context with localStorage persistence (`cart-context.tsx`).
- Accessibility: focus traps, ARIA roles, ESC handlers, focus rings — WCAG 2.1 AA.
- Loading skeletons, 404 page, OG / social metadata.
- SVG illustrations, trust strip, responsive design.
- Tailwind config, design tokens, theming.

## Domain Knowledge

- Cart state lives in `localStorage`; rehydrates on mount.
- The confirmation page is the natural handoff trigger — invites the shopper to qualify on VeloMED.
- Product catalog is currently hardcoded; future migration to a Supabase `products` table.
- HSA/FSA-eligible products must surface the eligibility hint at the PDP (product detail page).

## Work Style

- Type-check with `tsc --noEmit` before committing.
- Run `npm run lint` (ESLint flat config) before opening a PR.
- Test in Chrome + Safari; verify keyboard navigation and screen reader announcements.
- Default to server components; opt into client components only when state, effects, or browser APIs are required.
