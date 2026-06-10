# NexaForge

A premium B2B enterprise AI and IT services marketing website built with Next.js 16, Three.js, GSAP, and Sanity.io.

**Live demo:** [nexaforge.vercel.app](https://nexaforge.vercel.app)

---

## Overview

NexaForge is a production-grade marketing site that combines scroll-driven storytelling, a WebGL particle hero, and a headless CMS. It demonstrates modern frontend engineering practices: server-side rendering, incremental static regeneration, API route handlers, performance-conscious animation loading, and automated quality gates via GitHub Actions and Lighthouse CI.

### Key capabilities

- **Interactive homepage** — GSAP ScrollTrigger narratives, magnetic CTAs, custom cursor, and a Three.js particle field with mobile CSS fallback
- **Headless CMS** — Sanity.io for blog posts and case studies with Portable Text rich content
- **API layer** — Contact form (Resend), newsletter subscription (ConvertKit), services endpoint, and on-demand ISR revalidation
- **Performance** — Deferred loading of GSAP and Three.js; Lighthouse Performance ≥ 85 and Accessibility ≥ 90 in CI
- **Accessibility** — `prefers-reduced-motion` support, semantic markup, and keyboard-navigable UI

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

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Next.js 16 (App Router) | Server Components, ISR, Route Handlers, OG image generation |
| 3D | Three.js + React Three Fiber | Particle hero with cursor parallax; CSS gradient fallback on mobile |
| Animation | GSAP 3 + ScrollTrigger | Scroll-pinned narratives, magnetic buttons, page transitions |
| CMS | Sanity.io v3 | Headless CMS with GROQ queries, Portable Text, and ISR webhooks |
| Styling | Tailwind CSS v4 | Utility-first with custom design tokens |
| Forms | React Hook Form + Zod | Client/server validation with animated feedback |
| URL State | nuqs | Tag filtering on `/blog` without full page reload |
| Email | Resend | Transactional contact form delivery |
| Rate Limiting | Upstash Redis | IP-based rate limiting with in-memory fallback |
| Deployment | Vercel + GitHub Actions | Preview deploys, Lighthouse CI gating |

### Why Sanity.io?

- **Pure headless** — no PHP runtime or plugin surface area
- **Structured content** — GROQ queries, typed schemas, on-demand revalidation webhooks
- **Portable Text** — rich content with custom blocks (code, callouts, embeds)
- **Developer experience** — local Studio, real-time collaboration, CDN-backed images
- **Next.js integration** — first-class `next-sanity` package with ISR support

---

## Getting Started

### Prerequisites

| Tool | Version | Purpose |
|------|---------|---------|
| Node.js | 20+ | Runtime |
| npm | 10+ | Package manager |
| Sanity account | free tier | CMS ([sanity.io/manage](https://www.sanity.io/manage)) |
| Resend account | optional | Contact form email ([resend.com](https://resend.com)) |
| ConvertKit / Kit account | optional | Newsletter subscriptions ([kit.com](https://kit.com)) |
| Upstash account | optional | Production rate limiting ([upstash.com](https://upstash.com)) |
| Vercel account | optional | Deployment ([vercel.com](https://vercel.com)) |

### Installation

```bash
git clone <repository-url>
cd nexaforge
npm install
cp .env.example .env.local
```

Edit `.env.local` with your credentials (see table below). The site runs locally with mock blog and case-study data if Sanity is not configured.

### Environment Variables

Copy `.env.example` → `.env.local`. Never commit `.env.local`.

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Production | Sanity project ID ([sanity.io/manage](https://www.sanity.io/manage)) |
| `NEXT_PUBLIC_SANITY_DATASET` | No | Dataset name (default: `production`) |
| `NEXT_PUBLIC_SANITY_API_VERSION` | No | API version date (default: `2024-01-01`) |
| `SANITY_API_TOKEN` | For writes | Editor token for Studio and webhook writes |
| `RESEND_API_KEY` | For email | Sends contact form emails |
| `CONTACT_EMAIL_TO` | For email | Destination inbox for contact submissions |
| `CONTACT_EMAIL_FROM` | No | Sender address (default: `onboarding@resend.dev` for testing) |
| `CONVERTKIT_API_KEY` | For newsletter | Newsletter API key |
| `CONVERTKIT_FORM_ID` | No | Optional form ID |
| `UPSTASH_REDIS_REST_URL` | No | Redis REST URL for rate limiting |
| `UPSTASH_REDIS_REST_TOKEN` | No | Redis REST token |
| `REVALIDATE_SECRET` | For ISR | Secret for `/api/revalidate` (generate with `openssl rand -hex 32`) |

Without external services configured, the site still runs locally: contact form logs to console, newsletter uses in-memory storage, and rate limiting falls back to in-memory.

### Development Commands

```bash
npm run dev        # Dev server → http://localhost:3000
npm run build      # Production build
npm run start      # Serve production build
npm run lint       # ESLint
npm run typecheck  # TypeScript strict check
npm run sanity     # Sanity Studio → http://localhost:3333
```

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

### ISR Revalidation

Blog and case study pages use time-based ISR (`revalidate: 60`). For immediate updates when content is published in Sanity, configure an on-demand webhook:

1. Set `REVALIDATE_SECRET` in `.env.local` and Vercel
2. In Sanity → **API → Webhooks → Create**:
   - **URL:** `https://nexaforge.vercel.app/api/revalidate`
   - **Dataset:** production
   - **Trigger on:** Create, Update, Delete
   - **Filter:** `_type in ["blogPost", "caseStudy"]`
   - **HTTP method:** POST
   - **Headers:** `x-revalidate-secret: <REVALIDATE_SECRET>`
   - **Body:** `{}` to revalidate all CMS paths, or `{"path": "/blog"}` for a specific path

Verify the endpoint:

```bash
curl -X POST http://localhost:3000/api/revalidate \
  -H "Content-Type: application/json" \
  -H "x-revalidate-secret: YOUR_SECRET" \
  -d '{}'
```

Expected response: `{ "revalidated": true, "now": <timestamp> }`

---

## Deployment

1. Push the repository to GitHub
2. Import the project in [vercel.com/new](https://vercel.com/new)
3. Configure all environment variables in Vercel → Settings → Environment Variables
4. Production deploys from `main`; preview deploys run on every pull request
5. Point the Sanity revalidation webhook to the production domain

---

## Architecture

```
src/
├── app/                    # Next.js App Router pages & API routes
│   ├── api/
│   │   ├── contact/        # POST — form submission + rate limiting
│   │   ├── services/       # GET — services data with query params
│   │   ├── newsletter/     # POST — email subscription
│   │   └── revalidate/     # POST — on-demand ISR
│   ├── blog/               # ISR blog index + [slug] + OG images
│   └── case-studies/       # Case study pages
├── components/
│   ├── hero/               # Three.js particle scene
│   ├── sections/           # Scroll-driven narrative sections
│   ├── cursor/             # Custom SVG cursor
│   ├── navigation/         # Scroll-aware nav
│   └── forms/              # Contact + newsletter
├── lib/
│   ├── sanity/             # Client, queries, mock data
│   ├── load-gsap.ts        # Singleton dynamic import for GSAP + ScrollTrigger
│   ├── gsap.ts             # Plugin registration + sectionContext helper
│   ├── motion.ts           # prefers-reduced-motion helper
│   └── validations.ts      # Zod schemas
└── types/
sanity/
└── schemas/                # Sanity content type definitions
```

---

## Performance

Animation libraries (GSAP, Three.js) are intentionally kept off the initial load path. The first implementation imported them statically across the layout, hero, and scroll sections, which increased Total Blocking Time and hurt Lighthouse scores. The current architecture defers all heavy animation code until it is needed.

### Deferred loading strategy

| Layer | Technique |
|-------|-----------|
| **GSAP** | `loadGsap()` singleton — dynamic `import()` called only when an animation starts |
| **Hero WebGL** | `dynamic(ParticleScene)` — loads on first pointer move or after 5 s; skipped on mobile |
| **Custom cursor** | `DeferredCustomCursor` — loads on pointer interaction; skipped on touch and reduced-motion |
| **Page transitions** | `DeferredPageTransition` — code-split, client-only; GSAP loads on route change |
| **Scroll sections** | `next/dynamic()` per section + `LazySection` IntersectionObserver — mounts near viewport |
| **Magnetic buttons** | GSAP loaded on hover via `loadGsap()`, not at layout level |
| **Accessibility** | `prefers-reduced-motion` disables animations in JS and CSS |

### Additional optimizations

| Optimization | Impact |
|-------------|--------|
| `next/font` (Poppins, `display: swap`) | Zero CLS font loading |
| CSS gradient hero fallback (`<768px`) | No WebGL on mobile |
| `next/image` with Sanity CDN | Optimized images with blur placeholders |
| ISR `revalidate: 60` | Fresh CMS content without full rebuilds |
| On-demand `/api/revalidate` | Instant cache invalidation on Sanity publish |
| `Cache-Control` on `/api/services` | Edge-cached API responses |
| Homepage code splitting | Each scroll section in its own async chunk |

**Core Web Vitals targets:** LCP < 2.5s · CLS < 0.1 · INP < 200ms

### Quality assurance

GitHub Actions runs lint, typecheck, build, and Lighthouse CI on every push to `main`. Thresholds in `lighthouserc.json`:

| Category | CI threshold |
|----------|-------------|
| Performance | ≥ 85 |
| Accessibility | ≥ 90 |
| Best Practices | ≥ 85 (warn) |
| SEO | ≥ 85 (warn) |

Run Lighthouse locally against a production build:

```bash
npm run build && npm run start
npx lighthouse http://localhost:3000 --view
```

---

## API Reference

### `POST /api/contact`

```json
{ "name": "Jane", "email": "jane@co.com", "company": "Acme", "message": "Hello" }
```

Rate limited to 5 requests per 10 minutes per IP.

### `GET /api/services?category=ai&limit=3`

Returns filtered services with cache headers.

### `POST /api/newsletter`

```json
{ "email": "user@example.com" }
```

### `POST /api/revalidate`

```bash
curl -X POST https://nexaforge.vercel.app/api/revalidate \
  -H "x-revalidate-secret: YOUR_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"path": "/blog"}'
```

---

## Known Limitations

- Mock CMS data is served when Sanity environment variables are not configured
- Newsletter falls back to in-memory storage without ConvertKit credentials
- Contact form logs submissions locally when Resend is not configured
- Hash anchor links (Technology, Services, Delivery) do not update active nav state — only route-based pages do

## License

MIT
