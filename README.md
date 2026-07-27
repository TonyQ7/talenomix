# Talenomix

Mandate intelligence for Nordic executive search. This repository holds the
public website and the synthetic demo for **Talenomix Mandate**.

Name, trademark, domain and application-destination screening were confirmed
before the first public deployment. The manual deploy workflow retains that
explicit confirmation gate for every release.

## Quick start

```bash
npm install
npm run dev
```

The dev server serves the site under its deployment base path, at
`http://localhost:4321/talenomix/`.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Static build to `dist/` |
| `npm run preview` | Serve the build exactly as Pages will |
| `npm run check` | `astro check` — strict TypeScript across `.astro` and `.ts` |
| `npm run lint` | ESLint |
| `npm run verify:claims` | Claim-ledger verification (see below) |
| `npm run test` | Playwright: desktop, mobile, no-JS, and Axe |
| `npm run verify` | All of the above, in order |

Playwright needs a browser once: `npm run test:install`.

## Routes

| EN | SV |
| --- | --- |
| `/` | `/sv/` |
| `/demo/` | `/sv/demo/` |
| `/method/` | `/sv/metod/` |
| `/privacy/` | `/sv/integritet/` |
| `/404` (Pages fallback) | — |

### The EN/SV toggle

Language switching is **route-based, not script-based**. Every page has a real
counterpart URL in the other language, so the toggle is two ordinary links: it
works with JavaScript disabled, sets no cookie and stores nothing, and can never
strand a visitor on a page that does not exist in the other language. Swedish
slugs are localized because Sweden is the first sales market.

Adding a page means adding it to `SEGMENTS` in `src/lib/routes.ts` and to both
dictionaries. Because `en.ts` and `sv.ts` are both typed as `Dictionary`, a
missing translation is a build failure rather than a silently English fragment.

## How it is put together

```
src/
  data/claims.ts        The public claim ledger — every external claim + its source
  data/demo.ts          The synthetic scenario. Entirely fictional, no personal data
  i18n/                 types.ts defines the contract; en.ts and sv.ts must satisfy it
  lib/terrain.ts        Value noise, marching squares, polyline simplification
  lib/universe.ts       Assembles the mandate search universe from that terrain
  lib/routes.ts         Locale-aware routing and the deployment base path
  types/domain.ts       Public contracts only; private firm/person types are absent
  views/                One view per page, rendered by both locales' route files
scripts/verify-claims.mjs
private/README.md       Local-only pointer to the private sibling repository
```

**The map** is generated at build time. `lib/terrain.ts` builds a scalar field
from gaussian bumps plus light value noise, extracts iso-lines with marching
squares, simplifies them, and emits plain SVG path data. Target companies form
clusters, contour depth reads as weight of evidence, each coverage state gets its
own fill pattern as well as its own colour, and a traverse runs from the signed
brief to the calibration pack. There is no client-side JavaScript involved and
the output is byte-stable between builds.

**The demo** renders all seven steps as a complete, readable walkthrough. With
JavaScript it becomes a stepper with a filterable target universe; without it,
nothing is hidden. It makes no network calls at all — a test asserts this.

## Content rules

The site must never claim existing customers or partnerships, Universum or TVG
endorsement, proprietary candidate data, automated candidate selection, verified
time savings before pilots, production integrations that do not exist, or a
cleared trademark. `npm run verify:claims` and the tests in `tests/site.spec.ts`
enforce the parts that can be checked mechanically; the rest is editorial
discipline.

### Claim ledger

Every external claim lives in `src/data/claims.ts` with the source that backs it,
the date it was retrieved, a confidence grade and an explicit `vendorClaim` flag.
A vendor describing its own software is recorded as a vendor claim and never
promoted to an independent finding.

`npm run verify:claims` fails the build if a claim loses its source, has a
retrieval date that is missing or in the future, quotes a non-English passage
without an English paraphrase, or if any external link in the built HTML is not a
registered source or explicitly allowlisted.

## Accessibility and quality gates

- Zero Axe violations at WCAG 2.1 AA across all eight pages, desktop and mobile.
- Every colour token clears 4.5:1 against the surface it is actually used on —
  including state chips against their own tinted fills.
- Coverage states are distinguishable by glyph and fill pattern, not colour alone.
- No horizontal page scroll from 320px up; wide tables scroll inside their own
  region.
- Keyboard-operable throughout, including the skip link and the language toggle.
- Reduced motion removes all reveal transitions.
- No cookies, no analytics. Fonts are self-hosted. One third-party request:
  the hero film, injected after load on wide viewports only, never under
  reduced motion and never on `/demo/` — disclosed on `/privacy/` and
  allowlisted with a justification in `scripts/verify-claims.mjs`.

### Known issue: the hero film is 43 MB

The supplied file is 43,067,485 bytes — roughly 28x what a background loop
should be. Two things follow, and both are workarounds rather than fixes:

- It is gated to viewports at or above 64rem, so phones never fetch it. That
  keeps mobile at 98 KB and Lighthouse at 100, but it also means the hero the
  design is built around is desktop-only, which was not the intent.
- `tests/film.spec.ts` runs serially, because three concurrent pulls of the same
  43 MB stream starve each other's `play()` promise.

The fix is to re-encode to roughly 1.5 MB and self-host it (see R1 in the plan):
1080p or 720p, H.264 High, CRF ~30, no audio track, 8-12 seconds, `-movflags
+faststart`. That would remove the width gate, the serial test mode, the
`/privacy/` third-party disclosure and the `verify-claims.mjs` allowlist entry
in one change. No `ffmpeg` is available in this environment, so it has not been
done here.

## Deployment

`.github/workflows/ci.yml` runs typecheck, lint, build, claim verification and
the full Playwright suite on every push.

`.github/workflows/deploy.yml` publishes to GitHub Pages, but is **manual-dispatch
only and gated**: it refuses to run unless the operator confirms that name,
trademark and domain screening is complete and the application destination is
configured. It finishes with a production smoke test over all eight routes.

The committed release and data-boundary gates are listed in `PLAN.md`.
