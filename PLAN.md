# Talenomix implementation plan

This is the committed delivery plan for turning the public Talenomix concept
site into an evidence-backed commercial asset. The public repository contains
only the marketing site, synthetic product demo, aggregate market figures, and
public source ledger. Firm-level research, financials, contacts, scoring, sales
working files, and any person-level records live in the private sibling
repository `TonyQ7/talenomix-intel`.

## Decisions

| Question | Decision |
| --- | --- |
| Personalisation depth | Per-firm briefs addressed to a role. No named individual in URLs. |
| Intelligence-system home | Private sibling repository, never nested in this public repository. |
| Delivery | Phased, with an explicit verification gate at the end of every phase. |
| Pricing | A published fixed-fee diagnostic is rung 2. Design partnerships remain price-on-application. |
| Automation boundary | Collection and scheduled refresh may be automated; classification and people research require human adjudication. |

## Non-negotiable boundary

The public build must be physically incapable of reading prospect data:

- `src/types/domain.ts` contains the public contract only.
- Firm and person records exist only in `talenomix-intel`.
- The only private-to-public data path is a manually reviewed, aggregate
  benchmark payload with small-cell suppression and source references.
- A leak test fails if a private legal name, registry identifier, score, person
  name, or firm-level reason appears in the public build.

## Phase 0 — boundary and blocker

- Create private sibling repository `talenomix-intel`.
- Move the research pipeline and sales working files there.
- Fix contact redaction so registry identifiers and financial figures survive.
- Add regression cases for Swedish, Danish, Norwegian, and Finnish identifiers
  plus a space-separated revenue amount.
- Write the LIA prospect-research assessment, ROPA, retention policy, and data
  boundary.

Gate: both repositories are private/public as intended, output and secrets are
ignored, the redaction regression suite passes, and the public repository has no
firm-level records.

## Phase 1 — official registries and firm frame

One registry protocol is implemented by country adapters. Registry APIs bypass
website `robots.txt` handling but reuse the audit ledger and disk cache.

Discovery is an enumerable frame per country: activity codes, directory seeds,
largest-firm/network cross-checks, and local-language queries. It is not an
unbounded directory scrape. The stop rule is every seed resolved, largest firms
cross-checked, and two consecutive passes below 2% new qualified firms.

Resolution is deterministic and conservative:

1. exact national identifier;
2. exact registered domain;
3. normalized legal name plus country;
4. otherwise a review queue.

Ambiguous matches are never auto-merged. Group financials attach to the group
entity; legal entities are not silently summed.

Gate: registry frame is cross-checked against known directories, coverage is
reviewed per country, and the merge queue is adjudicated to zero before a
publishable aggregate is produced.

## Phase 2 — public site and benchmark

- Compress the homepage from ten sections to six.
- Keep the seven-step workflow on `/demo/`.
- Move the detailed trust and AI-boundary material to `/method/`.
- Add `/market/` and `/sv/marknad/` with real, sourced aggregate figures,
  visible caveats, and a coverage matrix.
- Add build-time charts with tabular fallbacks and tabular-figure typography.
- Generate the sitemap from the route map and include every locale path in
  fragment and route tests.
- Pin CI to Node 24.
- Make all tests derive counts and labels from the data contracts rather than
  fragile copy literals.

Gate: `npm run verify`, manual 320/768/1440 review, sitemap and 404 checks, and
no private data in `dist/`.

## Phase 3 — financial and people enrichment

Financial records are a list of fiscal periods, never scalar "latest" fields.
Each field carries its own confidence and basis:

- A — filed annual report with stated fiscal period;
- B — official registry key figures;
- C — published directory data;
- D — clearly labeled inference.

Person research is limited to public staff pages for a manually approved subset
of firms. Allowed fields are role and professional-profile attributes. Personal
email, phone, personal social-profile URL, photo, family, sensitive data,
protected attributes, inferred age, and guessed seniority are structurally
absent.

Gate: 10% manual verification, with the actual filed report taking precedence
over the pipeline.

## Phase 4 — dashboard, scoring, and export

The private Astro dashboard bakes a reviewed dataset into a static build. It has
no server, authentication, or database. A sortable table, filter state, firm
detail, source links, fiscal-year history, and role-addressed brief are provided.

Scoring is a vector, not a single opaque number. Each component retains its
evidence and the reason it exists. Weight sets are versioned so rescored
datasets remain comparable.

Exports include prospects, people, financial history, sources, and an editable
XLSX workbook with frozen filters and provenance columns. Live spreadsheet sync
is deferred.

## Phase 5 — aggregate benchmark

Only reviewed aggregate figures go live. Cells below five are suppressed.
Every market figure has a resolvable source, non-future retrieval date, and an
explicit basis. "Not publicly visible" is not presented as "does not exist."

## Phase 6 — product and pricing

Private analyses cover market sizing, competitors/substitutes, packaging, and a
pricing model. The public offer ladder is:

1. market benchmark;
2. fixed-fee diagnostic;
3. paid design partnership;
4. future product, only after evidence warrants it.

## Phase 7 — sales material refresh

Update the existing nine sales documents in place. The real benchmark replaces
the imagined KPI while keeping document purpose and review status explicit.

## Phase 8 — segment pages and firm briefs

Public segment pages:

- `/for/executive-search/`
- `/for/boutique-search/`
- `/for/research-led-firms/`

Private, role-addressed briefs are generated only for records explicitly marked
`approved-for-outreach`. URLs use an HMAC-derived slug, are `noindex`, and never
contain a firm or person name. Published briefs contain public facts and one
field-revenue example; they never contain scores, ranks, disqualifiers,
competitor comparisons, or personal data.

## Verification

Public:

```powershell
npm run verify
git check-ignore -v private/
```

Private:

```powershell
python pipeline/run.py --self-test
python pipeline/run.py --offline --countries SE DK NO FI
npm --prefix app run verify
```

The final release gate is green CI, a successful clearance-confirmed GitHub
Pages deployment, a production route smoke test, no private-data leak, clean
working trees, and local branches synchronized with their remotes.

## Deliberately cut or deferred

- No per-person landing pages.
- No unattended firm classification or people enrichment.
- No authenticated professional-network scraping.
- No live spreadsheet API in v1.
- Iceland is coverage-only until a reliable official revenue source exists.
- No second client-side framework.
- Pain-evidence extraction at scale, XBRL parsing for Danish reports, generated
  cross-language schemas, and a queryable dashboard are deferred until their
  simpler predecessors fail.
