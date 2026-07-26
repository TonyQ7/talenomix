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
];

export const COVERAGE_MATRIX = [
  {
    country: 'SE',
    frame: {
      en: 'Official company data and digitally filed annual reports',
      sv: 'Officiella företagsdata och digitalt inlämnade årsredovisningar',
    },
    sourceId: 'se-registry-source',
    publishedCount: null,
    status: { en: 'Registry frame in review', sv: 'Registerram granskas' },
  },
  {
    country: 'DK',
    frame: {
      en: 'CVR basic lookups; annual reports reviewed separately',
      sv: 'Grunduppgifter från CVR; årsredovisningar granskas separat',
    },
    sourceId: 'dk-registry-source',
    publishedCount: null,
    status: { en: 'Registry frame in review', sv: 'Registerram granskas' },
  },
  {
    country: 'NO',
    frame: {
      en: 'Open Enhetsregister and Regnskapsregister APIs',
      sv: 'Öppna API:er för Enhetsregister och Regnskapsregister',
    },
    sourceId: 'no-registry-source',
    publishedCount: null,
    status: { en: 'Registry frame in review', sv: 'Registerram granskas' },
  },
  {
    country: 'FI',
    frame: {
      en: 'PRH/YTJ open API plus public industry compilation',
      sv: 'Öppet PRH/YTJ-API plus publik branschsammanställning',
    },
    sourceId: 'fi-registry-source',
    publishedCount: 151,
    status: {
      en: 'Public directory count available',
      sv: 'Publikt förteckningsantal tillgängligt',
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
