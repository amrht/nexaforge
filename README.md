# NexaForge

A premium B2B enterprise AI and IT services marketing website — built as a full-stack developer assignment with Next.js 16, Three.js, GSAP, and Sanity.io.

**Live demo:** [nexaforge-fawn.vercel.app](https://nexaforge-fawn.vercel.app/)

---

## Overview

NexaForge is a fictional company, but the engineering is real. The brief asked for a site that feels like [Dala](https://dala.craftedbygc.com), [Isidor](https://isidor.ai), or [Nfinite Paper](https://nfinitepaper.com) — cinematic dark canvas, scroll-driven storytelling, and motion that earns its place rather than decorating a template.

The creative direction is **dark-first minimalism with indigo accents**: near-black surfaces (`#0a0a0b`), Poppins typography, a subtle film-grain overlay, and generous negative space. Scroll sections tell a narrative arc — problem → solution → platform depth → services → proof → contact — instead of dumping feature cards above the fold.

Every technical choice below has a reason. If something looks like polish, it probably cost bundle size or complexity, and we accepted that trade-off consciously.

### What this repo delivers

| Assignment task | What we built |
|-----------------|---------------|
| **T1 — Immersive Hero** | Three.js particle field with cursor parallax, GSAP stagger entrance + ScrollTrigger pin, CSS gradient fallback under 768px |
| **T2 — Scroll Narrative** | Problem (horizontal scrub), Solution (progressive SVG), Services (6-card bento + lift), Social proof (marquee + testimonials) — plus Platform Technology, Pillars, and Delivery as depth sections |
| **T3 — Micro-interactions** | Custom cursor, magnetic CTAs (`quickTo`), scroll-aware nav, GSAP curtain page transitions, validated contact form |
| **T4 — Headless CMS** | Sanity.io v3, Portable Text renderer, ISR + on-demand revalidation, `nuqs` tag filtering on `/blog` |
| **T5 — API Routes** | Contact (Resend + rate limit), services (cached GET), newsletter (ConvertKit), consistent error envelope |
| **T6 — Perf + DevOps** | GitHub Actions (lint, typecheck, build, Lighthouse CI), Vercel deploy, `next/font`, dynamic OG images |

---

## AI Tool Usage Disclosure

This project was built with assistance from **AI coding tools** (Cursor / Claude) for:

- Scaffolding the Next.js App Router structure, API routes, and Sanity schemas
- Drafting GSAP ScrollTrigger timelines and Three.js particle scene setup
- Generating mock CMS content and Portable Text renderer blocks
- Writing initial README documentation and Zod validation schemas

All architectural decisions, visual direction, animation choreography, and final code were reviewed and edited manually. AI was used as a productivity accelerator — not as a substitute for engineering judgment.

---

## Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | **Next.js 16** (App Router) | Server Components for CMS pages, Route Handlers for APIs, ISR, edge OG images |
| 3D | **Three.js + React Three Fiber** | Particle hero with cursor parallax; isolated in a dynamically loaded chunk |
| Animation | **GSAP 3 + ScrollTrigger** | Scroll-pinned narratives, scrub timelines, `quickTo` magnetic effects — industry standard for scroll choreography |
| CMS | **Sanity.io v3** | Pure headless, GROQ, Portable Text, real-time Studio, CDN images — no PHP runtime |
| Styling | **Tailwind CSS v4** | Utility-first with design tokens; fast iteration on dark-theme spacing and typography |
| Forms | **React Hook Form + Zod** | Shared schemas between client and server; inline validation without full-page reload |
| URL State | **nuqs** | Tag filtering on `/blog` via search params — shareable URLs, no navigation flash |
| Email | **Resend** | Simple transactional API for contact form delivery |
| Rate Limiting | **Upstash Redis** | IP-based limits in production; in-memory `Map` fallback for local dev |
| Deployment | **Vercel + GitHub Actions** | Preview deploys per PR, Lighthouse CI gating on `main` |

### Why Sanity.io over WordPress headless?

WordPress headless (WPGraphQL) is solid, but for a greenfield marketing site we wanted:

- **No server runtime** — Sanity is API-only; nothing to patch or host beyond the Next.js app
- **Structured schemas** — blog posts and case studies are typed documents, not page-builder blocks
- **Portable Text** — rich body content with custom blocks (code, callouts, embeds) rendered in React
- **On-demand ISR** — publish webhook hits `/api/revalidate` and busts cache immediately
- **Developer experience** — `npm run sanity` spins up Studio locally; images served from `cdn.sanity.io` with `next/image`

### Why GSAP over Framer Motion for scroll work?

Framer Motion is excellent for component-level enter/exit animations. This site’s signature moments — horizontal scrub panels, ScrollTrigger pins, SVG stroke reveals — are GSAP’s core strength. We use GSAP exclusively for scroll choreography and `quickTo` physics; no direct Framer Motion dependency in app code.

### Why Tailwind over CSS Modules?

Speed and consistency. A dark marketing site has dozens of one-off opacity, blur, and spacing values. Tailwind keeps them co-located with components and makes responsive tweaks fast without hunting through global stylesheets.

---

## Getting Started

### Prerequisites

| Tool | Version | Purpose |
|------|---------|---------|
| Node.js | 20+ | Runtime |
| npm | 10+ | Package manager |
| Sanity account | free tier | CMS ([sanity.io/manage](https://www.sanity.io/manage)) |
| Resend account | optional | Contact form email ([resend.com](https://resend.com)) |
| ConvertKit / Kit account | optional | Newsletter ([kit.com](https://kit.com)) |
| Upstash account | optional | Production rate limiting ([upstash.com](https://upstash.com)) |
| Vercel account | optional | Deployment ([vercel.com](https://vercel.com)) |

### Installation

```bash
git clone <repository-url>
cd nexaforge
npm install
cp .env.example .env.local
```

Edit `.env.local` with your credentials. **The site runs locally without external services** — mock blog posts and case studies load automatically when Sanity is not configured.

### Environment Variables

Copy `.env.example` → `.env.local`. Never commit `.env.local`.

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Production | Sanity project ID ([sanity.io/manage](https://www.sanity.io/manage)) |
| `NEXT_PUBLIC_SANITY_DATASET` | No | Dataset name (default: `production`) |
| `NEXT_PUBLIC_SANITY_API_VERSION` | No | API version date (default: `2024-01-01`) |
| `SANITY_API_TOKEN` | For writes | Editor token for Studio and webhook writes |
| `NEXT_PUBLIC_SITE_URL` | No | Canonical site URL for metadata (default: `https://nexaforge.vercel.app`) |
| `RESEND_API_KEY` | For email | Sends contact form emails |
| `CONTACT_EMAIL_TO` | For email | Destination inbox for contact submissions |
| `CONTACT_EMAIL_FROM` | No | Sender address (default: `onboarding@resend.dev` for testing) |
| `CONVERTKIT_API_KEY` | For newsletter | Newsletter API key |
| `CONVERTKIT_FORM_ID` | No | Optional form ID |
| `UPSTASH_REDIS_REST_URL` | No | Redis REST URL for rate limiting |
| `UPSTASH_REDIS_REST_TOKEN` | No | Redis REST token |
| `REVALIDATE_SECRET` | For ISR | Secret for `/api/revalidate` (generate with `openssl rand -hex 32`) |

**Local fallbacks:** contact form accepts submissions and returns success without Resend (no email sent); newsletter uses in-memory storage without ConvertKit; rate limiting uses an in-memory store without Upstash.

### Development Commands

```bash
npm run dev        # Dev server → http://localhost:3000
npm run build      # Production build
npm run start      # Serve production build
npm run lint       # ESLint
npm run typecheck  # TypeScript strict check
npm run sanity     # Sanity Studio → http://localhost:3333
```

> **Lighthouse tip:** Always audit against `npm run build && npm run start`, not `npm run dev`. Dev mode serves unminified bundles with HMR overhead — scores will look much worse than production.

---

## CMS Setup

### Sanity Studio

1. Create a project at [sanity.io/manage](https://www.sanity.io/manage)
2. Set `NEXT_PUBLIC_SANITY_PROJECT_ID` in `.env.local`
3. Create an API token (Editor role) → `SANITY_API_TOKEN`
4. Start the studio:

```bash
npm run sanity        # Local studio at http://localhost:3333
npm run sanity:deploy # Deploy studio to *.sanity.studio
```

### Content Types

| Type | Fields |
|------|--------|
| **Blog Post** | title, slug, cover image, author, tags, published_at, rich body (Portable Text) |
| **Case Study** | client, industry, challenge, solution, results, metrics[] |

Rich body content renders through `PortableTextRenderer` with support for images (captions), code blocks, callout boxes, and embeds.

### ISR Revalidation

Blog and case study pages use time-based ISR (`revalidate: 60`). For immediate updates when content is published in Sanity, configure an on-demand webhook:

1. Set `REVALIDATE_SECRET` in `.env.local` and Vercel
2. In Sanity → **API → Webhooks → Create**:
   - **URL:** `https://your-domain.vercel.app/api/revalidate`
   - **Dataset:** production
   - **Trigger on:** Create, Update, Delete
   - **Filter:** `_type in ["blogPost", "caseStudy"]`
   - **HTTP method:** POST
   - **Headers:** `x-revalidate-secret: <REVALIDATE_SECRET>`
   - **Body:** `{}` to revalidate all CMS paths, or `{"path": "/blog"}` for a specific path

Verify locally:

```bash
curl -X POST http://localhost:3000/api/revalidate \
  -H "Content-Type: application/json" \
  -H "x-revalidate-secret: YOUR_SECRET" \
  -d '{}'
```

Expected response: `{ "revalidated": true, "now": <timestamp> }`

### Blog tag filtering

The `/blog` index uses `nuqs` to read `?tag=` from the URL. Clicking a tag updates the query string client-side — no full page reload, and filtered URLs are shareable.

---

## Deployment

1. Push the repository to GitHub (public repo with clear commit history)
2. Import the project in [vercel.com/new](https://vercel.com/new)
3. Add all environment variables in Vercel → Settings → Environment Variables
4. Production deploys from `main`; preview deploys run on every pull request
5. Point the Sanity revalidation webhook to your production domain
6. Manage secrets via Vercel dashboard or CLI — never commit `.env.local`

---

## Architecture

```
src/
├── app/                         # Next.js App Router pages & API routes
│   ├── api/
│   │   ├── contact/             # POST — form submission + rate limiting
│   │   ├── services/            # GET — services data with query params
│   │   ├── newsletter/          # POST — email subscription
│   │   └── revalidate/          # POST — on-demand ISR
│   ├── blog/
│   │   ├── page.tsx             # ISR index + tag filtering
│   │   └── [slug]/
│   │       ├── page.tsx         # ISR post detail
│   │       └── opengraph-image.tsx  # Edge OG image per post
│   └── case-studies/            # ISR case study pages
├── components/
│   ├── hero/                    # Three.js particle scene + GSAP entrance
│   ├── sections/                # Scroll-driven narrative sections
│   ├── cursor/                  # Custom SVG cursor (code-split)
│   ├── navigation/              # Scroll-aware nav + GSAP underline
│   ├── transitions/             # GSAP curtain page transitions
│   └── forms/                   # Contact + newsletter
├── lib/
│   ├── sanity/                  # Client, queries, mock data
│   ├── gsap.ts                  # Plugin registration, sectionContext, reduced-motion
│   ├── validations.ts           # Zod schemas (shared client/server)
│   └── rate-limit.ts            # Upstash + in-memory fallback
└── types/
sanity/
└── schemas/                     # Sanity content type definitions
```

---

## GSAP & Animation Strategy

GSAP and ScrollTrigger are the soul of this site — but they are also ~50KB+ of parse-and-execute cost on the main thread. The goal was to keep the choreography intact while making sure GSAP only runs where and when it matters.

### Central module (`src/lib/gsap.ts`)

All animation code imports from a single hub:

- **`registerGSAP()`** — registers ScrollTrigger once per page load (guarded by a `registered` flag so multiple components do not double-register)
- **`prefersReducedMotion()`** — checked before every timeline; falls back to `gsap.set()` final states
- **`sectionContext()`** — wraps `gsap.context()` for scoped setup and returns a `ctx.revert()` cleanup function

This pattern matters because ScrollTrigger instances survive component unmounts if you are not careful. Every section calls `ctx.revert()` in its `useEffect` return, and `PageTransition` kills all ScrollTriggers on route change to prevent orphaned pins.

### How we keep GSAP off the critical path

| Technique | What it does | Why |
|-----------|--------------|-----|
| **`next/dynamic()` per section** | Each homepage section (`ProblemSection`, `SolutionSection`, etc.) is a separate async chunk in `page.tsx` | The browser only downloads GSAP-powered section code when that chunk is requested — not in one monolithic homepage bundle |
| **`LazySection` + IntersectionObserver** | Sections mount only when within 300px of the viewport | GSAP `useEffect` hooks do not run for below-fold content until the user scrolls near it — no ScrollTrigger setup for invisible sections |
| **`DeferredCustomCursor`** | `dynamic(() => import('./CustomCursor'), { ssr: false })` | Cursor + its `quickTo` loops live in a separate chunk; layout stays lean |
| **Hero WebGL deferral** | `ParticleScene` loads on first `pointermove` or after 5s timeout; skipped entirely on mobile | Three.js is heavier than GSAP — we defer it independently while keeping the GSAP entrance timeline on the hero shell |
| **`optimizePackageImports: ["gsap"]`** | Next.js tree-shakes GSAP subpath imports | Only the modules we actually import (`gsap`, `gsap/ScrollTrigger`) end up in the bundle |
| **`transpilePackages: ["three"]`** | Ensures Three.js ESM interop with the App Router | Prevents duplicate or broken Three builds in production |

### What each section does with GSAP

| Section | GSAP technique |
|---------|----------------|
| **Hero** | Staggered timeline on load (label → headline → sub → CTA); ScrollTrigger pin with `anticipatePin: 1` |
| **Problem** | Horizontal scrub — `scrollTrigger.scrub: true` drives a translating card track |
| **Solution** | SVG `strokeDashoffset` reveal synced to scroll progress |
| **Platform Technology** | Pinned sub-sections with layered SVG diagrams (dots transform, stream, layer stack) |
| **Services** | Staggered card entrance + `y` lift on hover via `gsap.to` |
| **Social Proof** | Infinite CSS marquee for logos; GSAP stagger fade-in for testimonial cards |
| **Navigation** | `gsap.to` animates active link underline width and position |
| **Magnetic buttons** | `gsap.quickTo` for smooth cursor-tracking with `power3.out` easing |
| **Page transitions** | Curtain wipe timeline on `pathname` change; kills existing ScrollTriggers first |

### Accessibility

- **JavaScript:** `prefersReducedMotion()` short-circuits every timeline to final visible states
- **CSS:** `@media (prefers-reduced-motion: reduce)` in `globals.css` collapses animation durations and disables smooth scroll
- **Touch devices:** Custom cursor returns `null` on `(pointer: coarse)` — no invisible overlay blocking taps
- **Keyboard:** All interactive elements are native links/buttons with visible focus; scroll sections do not trap focus

---

## Performance

Animation libraries are powerful and expensive. The first pass imported GSAP and Three.js statically across layout, hero, and every section — Total Blocking Time spiked and Lighthouse Performance dropped. The current architecture keeps heavy code split and deferred while preserving the full animation experience above the fold.

### Optimisation decisions

| Decision | Impact |
|----------|--------|
| `next/font` (Poppins, `display: swap`) | Zero layout shift from web fonts |
| CSS gradient hero fallback (`<768px`) | No WebGL on mobile — saves GPU and ~200KB+ of Three.js |
| `next/image` with Sanity CDN + gradient placeholders | Optimised images; no broken layout while loading |
| ISR `revalidate: 60` on CMS pages | Fresh content without full rebuilds |
| On-demand `/api/revalidate` | Instant cache bust when Sanity publishes |
| `Cache-Control` on `/api/services` | `s-maxage=3600, stale-while-revalidate=86400` for edge caching |
| Dynamic OG images (`next/og` edge runtime) | Unique `og:image` per blog post without a build step |
| Homepage code splitting + lazy mount | Each scroll section in its own chunk, mounted on approach |

**Core Web Vitals targets:** LCP < 2.5s · CLS < 0.1 · INP < 200ms

### Quality assurance

GitHub Actions (`.github/workflows/ci.yml`) runs on every push to `main` and every PR:

1. ESLint
2. TypeScript (`tsc --noEmit`)
3. Production build
4. Lighthouse CI (3 runs, desktop preset)

Thresholds in `lighthouserc.json`:

| Category | CI threshold |
|----------|-------------|
| Performance | ≥ 85 (error) |
| Accessibility | ≥ 90 (error) |
| Best Practices | ≥ 85 (warn) |
| SEO | ≥ 85 (warn) |

Run Lighthouse locally:

```bash
npm run build && npm run start
npx lighthouse http://localhost:3000 --preset=desktop --view
```

---

## API Reference

All routes return a consistent error envelope on failure: `{ "error": string, "code": string }`.

### `POST /api/contact`

```json
{ "name": "Jane", "email": "jane@co.com", "company": "Acme", "message": "Hello" }
```

- Validates with `contactSchema` (Zod)
- Rate limited to **5 requests per 10 minutes per IP** (Upstash or in-memory)
- Sends via Resend when configured; returns `{ success: true }` without sending when Resend is absent

### `GET /api/services?category=ai&limit=3`

Returns filtered services array with `Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400`.

### `POST /api/newsletter`

```json
{ "email": "user@example.com" }
```

Subscribes via ConvertKit when configured; handles duplicate emails gracefully.

### `POST /api/revalidate`

```bash
curl -X POST https://your-domain.vercel.app/api/revalidate \
  -H "x-revalidate-secret: YOUR_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"path": "/blog"}'
```

Requires `x-revalidate-secret` header matching `REVALIDATE_SECRET`.

---

## Known Limitations

- **Mock CMS data** is served when `NEXT_PUBLIC_SANITY_PROJECT_ID` is not set or Sanity is unreachable
- **Newsletter** falls back to in-memory storage without ConvertKit credentials (resets on server restart)
- **Contact form** returns success without sending email when Resend is not configured
- **Hash anchor links** (`/#technology`, `/#services`, `/#delivery`) do not update the active nav underline — only route-based pages (`/blog`, `/contact`, etc.) trigger the GSAP underline animation
- **Lighthouse in dev mode** will always flag unminified JS and unused code — audit production builds only

---

## License

MIT
