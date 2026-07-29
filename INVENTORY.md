# VELOBIKE / velomedStore — Master Inventory

**Last updated:** 2026-07-09
**Prior snapshot:** (none)

> ⚠️ **This file contains NO secrets** — only coordinates, IDs, hostnames, prefixes, and locations. Sensitive values live in Vercel env, `.env.*.local` (gitignored), provider dashboards, or local secret storage. Do NOT paste secret values here.

---

## Table of contents

1. [Identities](#1-identities)
2. [Domains & DNS](#2-domains--dns)
3. [Applications & products](#3-applications--products)
4. [Git repositories](#4-git-repositories)
5. [Vercel projects](#5-vercel-projects)
6. [Auth provider](#6-auth-provider)
7. [Data layer](#7-data-layer)
8. [Background jobs](#8-background-jobs)
9. [LLM services](#9-llm-services)
10. [Payments — Stripe](#10-payments--stripe)
11. [Third-party API integrations](#11-third-party-api-integrations)
12. [VS Code Marketplace publisher](#12-vs-code-marketplace-publisher)
13. [npm publishing](#13-npm-publishing)
14. [Corporate entity](#14-corporate-entity)
15. [Local file layout](#15-local-file-layout)
16. [Session artifacts & backups](#16-session-artifacts--backups)
17. [Third-party services matrix](#17-third-party-services-matrix)
18. [Deploy gotchas & rules](#18-deploy-gotchas--rules)

---

## 1. Identities

### 1.1 Personal / owner

| Field | Value |
|---|---|
| Primary GitHub identity | `gzvelozo` (id `35510328`) |
| Git commit email (canonical) | `35510328+gzvelozo@users.noreply.github.com` |
| ⚠️ Email never to use for commits/deploy attribution | `gzvelozo@gmail.com` (Vercel blocks this identity) |
| Local project owner context | Gustavo / VeloMED separate business venture |

**Rule:** Never commit or deploy under `gzvelozo@gmail.com`. Use the noreply email above.

### 1.2 Business / product identity

| Field | Value |
|---|---|
| Business context | **VeloMED** behavioral-health / healthcare marketplace venture |
| Storefront brand used in code/docs | **VELOBIKE** |
| Local folder | `C:\Users\gzvel\OneDrive\Claude\velomedStore\` |
| Public repo owner | Personal GitHub account `gzvelozo` |
| Relationship to VELOSEC | Not applicable — separate venture; do not conflate with VELOSEC |

### 1.3 GitHub

| Field | Value |
|---|---|
| Repository | `gzvelozo/velobike-store` |
| URL | https://github.com/gzvelozo/velobike-store |
| Visibility | Public |
| Default branch | `main` |
| Created | 2026-05-31T02:03:25Z |
| Last pushed (GitHub) | 2026-06-23T16:08:34Z |

### 1.4 Vercel

| Field | Value |
|---|---|
| Team slug | `gustavos-projects-4503ab0e` |
| Team ID | `team_qRJDjarozXcaDNcsofCDNii4` |
| Owner login | `gzvelozo-2381` |
| Linked project | `velobike-store` |
| Project ID | `prj_goDBR0DtVHqfiZfJHYEGxlDI4pFS` |

### 1.5 External provider accounts referenced by the app

| Provider | Account / coordinate visible here | Purpose |
|---|---|---|
| Stripe | Test-mode key prefixes in local env; encrypted production vars in Vercel | Checkout and payment webhook |
| Supabase | Project host `pahggbdxcpgqzjmtoqjb.supabase.co` in local env | Postgres `orders` table + RLS |
| VeloMED API | `localhost:5000` locally; Azure Container Apps host documented for production | HSA/FSA qualification handoff |
| GitHub Actions | Workflows in `.github\workflows\` | Squad issue triage/labels only, not app deploy |

---

## 2. Domains & DNS

| Domain / host | Provider | Points to | Purpose |
|---|---|---|---|
| `velobike-store-one.vercel.app` | Vercel-managed | Current production alias for `velobike-store` | Public storefront |
| `velobike-store-gustavos-projects-4503ab0e.vercel.app` | Vercel-managed | Current production alias | Team-scoped alias |
| `velobike-store-gzvelozo-2381-gustavos-projects-4503ab0e.vercel.app` | Vercel-managed | Current production alias | Owner/team-scoped alias |
| `velobike-store-itrm02a4u-gustavos-projects-4503ab0e.vercel.app` | Vercel deployment URL | Deployment `dpl_HytYenKhEyYsPkRYnxokx4NbH6wJ` | Current ready production deployment |
| `velomed-marketplace.vercel.app` | Vercel-managed | Separate VeloMED marketplace project | Post-checkout qualification page target |
| `velomed-dev-api.delightfulbeach-298473ed.eastus2.azurecontainerapps.io` | Azure Container Apps | VeloMED API | Production handoff API documented in `.env.example` |
| Custom apex domain | Not applicable | Not applicable | No custom `velobike` domain found in Vercel alias output |

---

## 3. Applications & products

### 3.1 Product: VELOBIKE storefront (`velomedStore`)

| Field | Value |
|---|---|
| Package name | `velobike-temp` |
| Version | `0.1.0` |
| Vercel project name | `velobike-store` |
| Product name used in app copy | VELOBIKE |
| Purpose | Demo merchant storefront selling HSA/FSA-eligible cycling, recovery, wellness, and nutrition products with a VeloMED reimbursement/qualification handoff |
| README purpose | Default create-next-app README; project-specific purpose is inferred from app copy, `.env.example`, and Squad charters |
| Stack | Next.js 16 App Router, React 19, TypeScript 5, Tailwind CSS v4, Supabase JS, Stripe SDK |
| Runtime target | Node.js 24.x on Vercel |
| Main routes | `/`, `/products/[slug]`, `/cart`, `/checkout`, `/confirmation` |
| API routes | `/api/checkout`, `/api/checkout/session`, `/api/webhooks/stripe`, `/api/handoff` |

### 3.2 Product catalog

Catalog is currently hardcoded in `src\lib\products.ts`; there is no `products` database table in this repo.

| Slug | Product | Brand | Category | Price |
|---|---|---|---|---|
| `canyon-grail-cf` | Canyon Grail CF SLX 8 | Canyon | Bikes / fitness equipment | `$3,499.00` |
| `garmin-edge-1050` | Garmin Edge 1050 | Garmin | Health monitoring / tech | `$599.99` |
| `ag1-athletic-greens` | AG1 by Athletic Greens | Athletic Greens | Supplements / nutrition | `$79.00` |
| `theragun-pro` | Theragun PRO Plus | Therabody | Recovery devices | `$399.00` |

### 3.3 User flow

1. Shopper browses hardcoded HSA/FSA-eligible products.
2. Cart state is client-side via React context/local storage.
3. `/api/checkout` validates slugs/prices server-side and creates a Stripe Checkout Session.
4. `/confirmation` reads Stripe session details and clears cart.
5. If HSA items are present, `/api/handoff` mints or requests a VeloMED token and links to `NEXT_PUBLIC_VELOMED_QUALIFY_URL?token=...`.
6. Stripe webhook persists paid orders to Supabase when webhook and Supabase service-role env vars are present.

---

## 4. Git repositories

| Repo | Remote | Visibility | Local path | Branch | HEAD (2026-07-09) |
|---|---|---|---|---|---|
| `velobike-store` | `origin` = https://github.com/gzvelozo/velobike-store.git | Public | `C:\Users\gzvel\OneDrive\Claude\velomedStore\` | `main` | `7488d87` |

Recent local commits:

| Commit | Message |
|---|---|
| `7488d87` | `dashboard: add protocol skill pointing at VeloMED canonical dashboard` |
| `e194e3b` | `docs(env): add .env.example with full setup guide` |
| `dc4dc85` | `chore(squad): hire VELOBIKE team — Donna, Cameron, Gordon, Bos` |
| `e8bff36` | `chore: initialize Squad AI agent team (v0.10.0)` |
| `6b6dd2c` | `fix: lazy-init Supabase admin client to prevent build crash` |

### Deploy triggers

| Source | Trigger | Notes |
|---|---|---|
| Vercel project | Production deployments exist for `main`-era code | Current ready deployment is 35 days old as of this inventory |
| GitHub Actions | Not applicable for app deployment | Workflows are Squad issue/label automation only |
| Manual CLI | Supported by local Vercel link | `vercel --prod` deploys linked project `gustavos-projects-4503ab0e/velobike-store` |

---

## 5. Vercel projects

### 5.1 `velobike-store`

| Attribute | Value |
|---|---|
| Project name | `velobike-store` |
| Project ID | `prj_goDBR0DtVHqfiZfJHYEGxlDI4pFS` |
| Org/team ID | `team_qRJDjarozXcaDNcsofCDNii4` |
| Team slug | `gustavos-projects-4503ab0e` |
| Owner shown by Vercel | `Gustavo's projects` |
| Created | 2026-05-30 22:24:29 |
| Root directory | `.` |
| Framework preset | Next.js |
| Node.js version | 24.x |
| Build command | `npm run build` or `next build` |
| Install command | Vercel default package-manager install |
| Output directory | Next.js default |
| Current ready deployment | `dpl_HytYenKhEyYsPkRYnxokx4NbH6wJ` |
| Current ready deployment URL | https://velobike-store-itrm02a4u-gustavos-projects-4503ab0e.vercel.app |
| Production aliases | `velobike-store-one.vercel.app`, `velobike-store-gustavos-projects-4503ab0e.vercel.app`, `velobike-store-gzvelozo-2381-gustavos-projects-4503ab0e.vercel.app` |

### 5.2 Vercel environment variables observed

Vercel has these encrypted **Production** variables for `velobike-store`:

| Name | Purpose |
|---|---|
| `VELOMED_API_KEY` | Server-to-server VeloMED handoff auth |
| `NEXT_PUBLIC_APP_URL` | Stripe success/cancel URL base |
| `NEXT_PUBLIC_VELOMED_QUALIFY_URL` | Client-visible VeloMED qualification URL |
| `VELOMED_API_URL` | Server-side VeloMED handoff API base |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client-visible Supabase anon key |
| `NEXT_PUBLIC_SUPABASE_URL` | Client-visible Supabase project URL |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Client-visible Stripe publishable key |
| `STRIPE_SECRET_KEY` | Server-side Stripe API key |

**Important missing production vars from Vercel output:** `STRIPE_WEBHOOK_SECRET` and `SUPABASE_SERVICE_ROLE_KEY`. The webhook route requires both indirectly/directly to verify events and write orders.

---

## 6. Auth provider

| Attribute | Value |
|---|---|
| End-user auth provider | Not applicable |
| Clerk/Auth0/NextAuth | Not applicable |
| Supabase Auth usage | Not applicable — `@supabase/supabase-js` is used for database access, not sign-in flows |
| Server-to-server auth | `VELOMED_API_KEY` sent as `X-Api-Key` to VeloMED handoff API |
| Data-access auth | Supabase anon key for public client; service-role key is expected server-side only for webhook writes |

---

## 7. Data layer

### 7.1 Supabase Postgres

| Attribute | Value |
|---|---|
| Provider | Supabase |
| Local env host | `pahggbdxcpgqzjmtoqjb.supabase.co` |
| Client library | `@supabase/supabase-js` `^2.106.2` |
| Main table observed | `public.orders` |
| RLS | Enabled by migration `supabase\migrations\20260601_enable_rls_orders.sql` |
| Public policies | Existing permissive public/anon policies are dropped by migration |
| Server write path | `/api/webhooks/stripe` uses `getSupabaseAdmin()` with `SUPABASE_SERVICE_ROLE_KEY` |
| Idempotency | Unique constraint on `orders.stripe_session_id` from `20260604_orders_unique_session_id.sql` |

### 7.2 Local/client state

| State | Location | Notes |
|---|---|---|
| Product catalog | `src\lib\products.ts` | Hardcoded product list |
| Cart | `src\lib\cart-context.tsx` | Client-side React context/local persistence |
| Checkout session metadata | Stripe Checkout Session metadata | `itemSlugs`, `hasHsaItems` |

### 7.3 Caches and object storage

| Layer | Value |
|---|---|
| Redis / Upstash | Not applicable |
| Vercel Blob / S3 / R2 | Not applicable |
| File uploads | Not applicable |

---

## 8. Background jobs

| Mechanism | Value |
|---|---|
| Inngest / queue worker | Not applicable |
| Cron jobs | Not applicable |
| App background processing | Stripe webhook `/api/webhooks/stripe` handles asynchronous `checkout.session.completed` events |
| GitHub Actions | Squad automation only: issue triage, issue assignment, heartbeat, label sync |

---

## 9. LLM services

| Attribute | Value |
|---|---|
| Runtime LLM integration | Not applicable |
| OpenAI / Anthropic app dependency | Not applicable |
| Repo-local AI tooling | `.copilot\` skills and `.squad\` agent/process files exist for development workflow only |
| MCP note | `.copilot\mcp-config.json` references `@anthropic/github-mcp-server`; not part of storefront runtime |

---

## 10. Payments — Stripe

| Attribute | Value |
|---|---|
| Provider | Stripe |
| SDK | `stripe` `^22.2.0` |
| Mode observed locally | Test mode (`pk_test_…`, `sk_test_…` prefixes) |
| Checkout route | `POST /api/checkout` |
| Session lookup route | `GET /api/checkout/session?session_id=...` |
| Webhook route | `POST /api/webhooks/stripe` |
| Webhook event handled | `checkout.session.completed` |
| Payment methods | Card |
| Currency | USD |
| Success URL | `${NEXT_PUBLIC_APP_URL}/confirmation?session_id={CHECKOUT_SESSION_ID}` |
| Cancel URL | `${NEXT_PUBLIC_APP_URL}/checkout` |
| Webhook production endpoint documented | `https://velobike-store-one.vercel.app/api/webhooks/stripe` |
| Webhook signing secret in Vercel | Not applicable — not present in `vercel env ls` output |

**Payment gotcha:** Checkout can create sessions with `STRIPE_SECRET_KEY`, but paid orders will not persist unless `STRIPE_WEBHOOK_SECRET` and `SUPABASE_SERVICE_ROLE_KEY` are configured in Vercel Production.

---

## 11. Third-party API integrations

| Integration | Location | Env vars | Purpose |
|---|---|---|---|
| Stripe | `src\lib\stripe.ts`, `src\app\api\checkout\*`, `src\app\api\webhooks\stripe\route.ts` | `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` | Checkout sessions, session lookup, webhook verification |
| Supabase | `src\lib\supabase.ts`, webhook route, `supabase\migrations\` | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` | Persist paid orders with RLS |
| VeloMED handoff API | `src\app\api\handoff\route.ts`, `src\app\confirmation\page.tsx` | `VELOMED_API_URL`, `VELOMED_API_KEY`, `NEXT_PUBLIC_VELOMED_QUALIFY_URL` | Mint qualification handoff token; redirect shopper to VeloMED |
| Vercel | `.vercel\project.json`, Vercel env/project settings | Vercel-managed | Hosting/deployment/env encryption |
| GitHub | `.github\workflows\*.yml` | `GITHUB_TOKEN`, optional `COPILOT_ASSIGN_TOKEN` | Squad issue automation only |

---

## 12. VS Code Marketplace publisher

| Attribute | Value |
|---|---|
| Marketplace extension | Not applicable |
| Publisher | Not applicable |
| `.vsix` artifacts | Not applicable |

---

## 13. npm publishing

| Attribute | Value |
|---|---|
| Published package | Not applicable |
| npm scope | Not applicable |
| Package privacy | `private: true` in `package.json` |
| Publish workflow | Not applicable |

---

## 14. Corporate entity

| Attribute | Value |
|---|---|
| Legal entity details in repo | Not applicable |
| Business context | VeloMED separate venture; healthcare marketplace / behavioral health context provided by user |
| Storefront role | E-commerce demo/merchant side for HSA/FSA-eligible purchases and VeloMED qualification handoff |

---

## 15. Local file layout

Root: `C:\Users\gzvel\OneDrive\Claude\velomedStore\`

| Path | Purpose |
|---|---|
| `.copilot\` | Copilot skills/MCP config for development workflow |
| `.github\agents\` | Squad agent metadata for GitHub/Copilot workflow |
| `.github\workflows\` | Squad issue triage/assignment/label workflows |
| `.squad\` | Squad AI team, charters, routing, memory, templates |
| `.vercel\project.json` | Local Vercel link to `velobike-store` project |
| `.env.example` | Safe environment variable template and setup guide |
| `.env.local` | Local secrets/config; gitignored; do not commit or paste values |
| `README.md` | Default create-next-app README |
| `package.json` / `package-lock.json` | npm manifest and lockfile |
| `next.config.ts` | Next.js config; currently default/empty |
| `src\app\` | Next.js App Router pages and API routes |
| `src\app\api\checkout\` | Stripe Checkout creation and session lookup |
| `src\app\api\webhooks\stripe\` | Stripe webhook handler and Supabase order write |
| `src\app\api\handoff\` | VeloMED handoff token proxy/demo fallback |
| `src\components\` | UI components (`Header`, `ProductCard`, `HsaBadge`, illustrations) |
| `src\lib\` | Product catalog, cart context, Stripe/Supabase clients |
| `supabase\migrations\` | RLS and idempotency migrations for `orders` |
| `public\` | Static SVG assets from default Next.js scaffold |
| `.next\`, `node_modules\`, `tsconfig.tsbuildinfo` | Generated/local build artifacts; gitignored |

---

## 16. Session artifacts & backups

| Attribute | Value |
|---|---|
| Prior inventory snapshot | Not applicable |
| Backup folders found for this inventory | Not applicable |
| Generated artifact | `C:\Users\gzvel\OneDrive\Claude\velomedStore\INVENTORY.md` |
| Runtime/build artifacts | `.next\`, `node_modules\`, `tsconfig.tsbuildinfo` |
| Local env artifact | `.env.local` exists; values intentionally not copied here |

---

## 17. Third-party services matrix

| Service | Purpose | Local/dev | Production | Login / owner coordinate |
|---|---|---|---|---|
| Vercel | Hosting/env/deployments | Linked through `.vercel\project.json` | `velobike-store` project, Node 24.x | Team `gustavos-projects-4503ab0e`, owner `gzvelozo-2381` |
| GitHub | Source control | Local repo on `main` | `gzvelozo/velobike-store` public repo | `gzvelozo` |
| Stripe | Payments | Test-mode prefixes in `.env.local` | Encrypted `STRIPE_SECRET_KEY` + publishable key present; webhook secret missing | Stripe dashboard |
| Supabase | Orders database | `pahggbdxcpgqzjmtoqjb.supabase.co` in `.env.local` | URL + anon key present; service-role key missing in Vercel output | Supabase dashboard |
| VeloMED API | Handoff to qualification flow | `http://localhost:5000` / `http://localhost:3001` | Azure API host + `velomed-marketplace.vercel.app/qualify` documented and env names present | VeloMED/Azure/Vercel ownership |
| GitHub Actions | Squad automation | Workflow files in repo | Issue/label automation when workflows enabled | GitHub repo actions |
| Clerk | Auth | Not applicable | Not applicable | Not applicable |
| Inngest | Background jobs | Not applicable | Not applicable | Not applicable |
| Upstash Redis | Cache/queue | Not applicable | Not applicable | Not applicable |
| Anthropic/OpenAI | Runtime LLM | Not applicable | Not applicable | Not applicable |

---

## 18. Deploy gotchas & rules

### Immutable rules

1. **Never use `gzvelozo@gmail.com` for commits/deploy attribution** — use `35510328+gzvelozo@users.noreply.github.com`.
2. **Do not conflate VeloMED/VELOBIKE with VELOSEC** — this storefront is a separate healthcare/e-commerce venture.
3. **Do not commit `.env.local` or provider secrets** — `.env*` is ignored except `.env.example`.
4. **Use the linked Vercel team/project** — `gustavos-projects-4503ab0e/velobike-store` (`prj_goDBR0DtVHqfiZfJHYEGxlDI4pFS`).
5. **Keep service-role keys server-only** — `SUPABASE_SERVICE_ROLE_KEY` must never be exposed to browser code.

### Known gotchas

- **Production webhook persistence is incomplete from observed env:** `STRIPE_WEBHOOK_SECRET` and `SUPABASE_SERVICE_ROLE_KEY` were absent from `vercel env ls`; `/api/webhooks/stripe` returns 500 without the webhook secret and cannot write orders without the Supabase service-role key.
- **`.env.example` says production VeloMED values are set in Vercel:** Vercel env names confirm the VeloMED API/qualify variables exist, but encrypted values were not read.
- **README is generic:** Do not rely on it for product purpose; use app copy, `.env.example`, and code paths.
- **Product catalog is hardcoded:** Changing products requires code changes in `src\lib\products.ts` until a products table is introduced.
- **Checkout validates prices server-side:** Do not trust client cart price data; slugs/quantities are resolved against `products.ts` in `/api/checkout`.
- **Stripe webhook idempotency depends on DB migration:** Ensure `orders_stripe_session_id_key` exists before relying on webhook retry safety.
- **Vercel project uses Node 24.x:** Keep local/tooling compatibility aligned with Vercel when debugging build/runtime issues.
- **GitHub workflows are not deploy workflows:** They manage Squad issue triage/labels/assignment only.
- **OneDrive path:** The repo lives under OneDrive; if `.next` or TypeScript artifacts lock during local dev, stop the dev server and remove generated artifacts before retrying.

---

## Related documents

- `README.md` — default Next.js quickstart.
- `.env.example` — environment variable setup guide.
- `.squad\team.md` and `.squad\routing.md` — local Squad roles and routing.
- `supabase\migrations\20260601_enable_rls_orders.sql` — RLS migration.
- `supabase\migrations\20260604_orders_unique_session_id.sql` — Stripe session idempotency migration.
