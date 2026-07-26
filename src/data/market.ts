import type { MarketFigure } from '~/types/domain';

/**
 * Public aggregates only. Unknown country totals stay null rather than being
 * estimated. sourceId must resolve to a claim in src/data/claims.ts.
 */
export const MARKET_FIGURES: readonly MarketFigure[] = [
  {
    id: 'fi-firms-2023',
    country: 'FI',
    label: { en: 'Firms listed', sv: 'Listade byråer' },
    value: 151,
    unit: 'firms',
    period: '2023',
    sourceId: 'fi-market-compilation',
    retrievedOn: '2026-07-26',
    basis: 'directory-published',
    confidence: 'C',
    caveat: {
      en: 'Public Finnish compilation; not an official registry classification.',
      sv: 'Publik finländsk sammanställning; inte en officiell registerklassificering.',
    },
  },
  {
    id: 'fi-exclusive-2023',
    country: 'FI',
    label: { en: 'Exclusively executive search', sv: 'Enbart executive search' },
    value: 49,
    unit: 'firms',
    period: '2023',
    sourceId: 'fi-market-compilation',
    retrievedOn: '2026-07-26',
    basis: 'directory-published',
    confidence: 'C',
    caveat: {
      en: 'Category defined by the directory publisher.',
      sv: 'Kategorin definieras av sammanställningens utgivare.',
    },
  },
  {
    id: 'fi-market-2023',
    country: 'FI',
    label: { en: 'Market value', sv: 'Marknadsvärde' },
    value: 99,
    unit: 'EUR millions',
    period: '2023',
    sourceId: 'fi-market-compilation',
    retrievedOn: '2026-07-26',
    basis: 'directory-published',
    confidence: 'C',
    caveat: {
      en: 'Publisher estimate for Finland, not a Talenomix forecast.',
      sv: 'Utgivarens uppskattning för Finland, inte en prognos från Talenomix.',
    },
  },
  {
    id: 'fi-yoy-2023',
    country: 'FI',
    label: { en: 'Year-over-year change', sv: 'Förändring år mot år' },
    value: -4,
    unit: 'percent',
    period: '2023',
    sourceId: 'fi-market-compilation',
    retrievedOn: '2026-07-26',
    basis: 'directory-published',
    confidence: 'C',
    caveat: {
      en: 'Publisher-reported market change.',
      sv: 'Marknadsförändring rapporterad av utgivaren.',
    },
  },

  /* ---- Norway — queried directly from the open Enhetsregister ------------ */
  {
    id: 'no-frame-2026',
    country: 'NO',
    label: { en: 'Entities in registry frame', sv: 'Enheter i registerramen' },
    value: 1369,
    unit: 'firms',
    period: '2026',
    sourceId: 'no-frame-78100',
    retrievedOn: '2026-07-26',
    basis: 'official-registry',
    confidence: 'A',
    caveat: {
      en: 'NACE 78.100 covers recruitment and labour provision generally, including staffing. A frame to narrow, not a count of search firms.',
      sv: 'NACE 78.100 omfattar rekrytering och personaluthyrning generellt, inklusive bemanning. En ram att smalna av, inte ett antal sökbyråer.',
    },
  },
  {
    id: 'no-employees-2026',
    country: 'NO',
    label: { en: 'With published headcount', sv: 'Med publicerat antal anställda' },
    value: 372,
    unit: 'firms',
    period: '2026',
    sourceId: 'no-frame-78100',
    retrievedOn: '2026-07-26',
    basis: 'official-registry',
    confidence: 'A',
    caveat: {
      en: 'The other 997 register no employee count — largely sole traders, dormant entities and foreign-registered branches.',
      sv: 'Övriga 997 registrerar inget antal anställda – till stor del enskilda firmor, vilande enheter och utlandsregistrerade filialer.',
    },
  },
  {
    id: 'no-icp-2026',
    country: 'NO',
    label: { en: 'In the 5–49 size band', sv: 'I storleksspannet 5–49' },
    value: 110,
    unit: 'firms',
    period: '2026',
    sourceId: 'no-frame-78100',
    retrievedOn: '2026-07-26',
    basis: 'official-registry',
    confidence: 'A',
    caveat: {
      en: 'The band the design-partner profile targets. Still a superset until executive search is confirmed per firm.',
      sv: 'Det spann designpartnerprofilen riktar sig mot. Fortfarande en övermängd tills executive search bekräftats per byrå.',
    },
  },

  /* ---- Finland — queried directly from the open PRH/YTJ API -------------- */
  {
    id: 'fi-frame-2026',
    country: 'FI',
    label: { en: 'Entities in registry frame', sv: 'Enheter i registerramen' },
    value: 461,
    unit: 'firms',
    period: '2026',
    sourceId: 'fi-frame-78100',
    retrievedOn: '2026-07-26',
    basis: 'official-registry',
    confidence: 'A',
    caveat: {
      en: 'Main business line 78100. Same superset caveat as Norway.',
      sv: 'Huvudverksamhet 78100. Samma förbehåll om övermängd som i Norge.',
    },
  },
];

/**
 * Norwegian headcount distribution under NACE 78.100, queried 26 July 2026.
 *
 * This is the only market where a full size distribution is currently
 * obtainable without credentials, which is why the scope control is driven by
 * it. `withoutCount` is carried explicitly rather than dropped: 997 of 1,369
 * entities publish no headcount at all, and a distribution that quietly omits
 * them would overstate how much of the frame is actually characterised.
 */
export const NO_SIZE_BANDS = [
  { band: '1–4', min: 1, max: 4, count: 234 },
  { band: '5–9', min: 5, max: 9, count: 52 },
  { band: '10–19', min: 10, max: 19, count: 28 },
  { band: '20–49', min: 20, max: 49, count: 30 },
  { band: '50–99', min: 50, max: 99, count: 12 },
  { band: '100+', min: 100, max: null, count: 16 },
] as const;

export const NO_FRAME_TOTAL = 1369;
export const NO_WITHOUT_COUNT = NO_FRAME_TOTAL - NO_SIZE_BANDS.reduce((s, b) => s + b.count, 0);

export const COVERAGE_MATRIX = [
  {
    country: 'SE',
    frame: {
      en: 'Official company data and digitally filed annual reports',
      sv: 'Officiella företagsdata och digitalt inlämnade årsredovisningar',
    },
    sourceId: 'se-dk-access-pending',
    publishedCount: null,
    status: { en: 'Awaiting API credentials', sv: 'Väntar på API-behörighet' },
  },
  {
    country: 'DK',
    frame: {
      en: 'CVR basic lookups; annual reports reviewed separately',
      sv: 'Grunduppgifter från CVR; årsredovisningar granskas separat',
    },
    sourceId: 'se-dk-access-pending',
    publishedCount: null,
    status: { en: 'Awaiting API credentials', sv: 'Väntar på API-behörighet' },
  },
  {
    country: 'NO',
    frame: {
      en: 'Open Enhetsregister API, queried directly',
      sv: 'Öppet Enhetsregister-API, direkt förfrågat',
    },
    sourceId: 'no-frame-78100',
    publishedCount: 1369,
    status: { en: 'Frame resolved · narrowing', sv: 'Ram fastställd · avsmalnas' },
  },
  {
    country: 'FI',
    frame: {
      en: 'Open PRH/YTJ API, queried directly',
      sv: 'Öppet PRH/YTJ-API, direkt förfrågat',
    },
    sourceId: 'fi-frame-78100',
    publishedCount: 461,
    status: {
      en: 'Frame resolved · narrowing',
      sv: 'Ram fastställd · avsmalnas',
    },
  },
  {
    country: 'IS',
    frame: { en: 'Reviewed manual frame', sv: 'Granskad manuell ram' },
    sourceId: 'is-coverage-source',
    publishedCount: null,
    status: {
      en: 'Coverage only; no revenue target',
      sv: 'Endast täckning; inget intäktsmål',
    },
  },
] as const;
