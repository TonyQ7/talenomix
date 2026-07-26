/** Shared route table for the test suite. Mirrors src/lib/routes.ts. */

export interface RouteCase {
  readonly key:
    | 'home'
    | 'demo'
    | 'market'
    | 'method'
    | 'privacy'
    | 'forExecutive'
    | 'forBoutique'
    | 'forResearch';
  readonly en: string;
  readonly sv: string;
  /** Text expected in the <h1> for each locale. */
  readonly h1: { en: RegExp; sv: RegExp };
}

export const ROUTES: readonly RouteCase[] = [
  {
    key: 'home',
    en: './',
    sv: './sv/',
    h1: { en: /evidence-backed search plan/i, sv: /underbyggd sökplan/i },
  },
  {
    key: 'demo',
    en: './demo/',
    sv: './sv/demo/',
    h1: { en: /search brief becomes/i, sv: /uppdragsbeskrivning blir/i },
  },
  {
    key: 'market',
    en: './market/',
    sv: './sv/marknad/',
    h1: { en: /benchmark that shows/i, sv: /benchmark som visar/i },
  },
  {
    key: 'method',
    en: './method/',
    sv: './sv/metod/',
    h1: { en: /how we know/i, sv: /hur vi vet/i },
  },
  {
    key: 'privacy',
    en: './privacy/',
    sv: './sv/integritet/',
    h1: { en: /privacy and data boundaries/i, sv: /integritet och datagränser/i },
  },
  {
    key: 'forExecutive',
    en: './for/executive-search/',
    sv: './sv/for/executive-search/',
    h1: { en: /market knowledge reusable/i, sv: /marknadskunskap återanvändbar/i },
  },
  {
    key: 'forBoutique',
    en: './for/boutique-search/',
    sv: './sv/for/boutique-search/',
    h1: { en: /research leverage/i, sv: /researchkapaciteten/i },
  },
  {
    key: 'forResearch',
    en: './for/research-led-firms/',
    sv: './sv/for/researchdrivna-byrer/',
    h1: { en: /shared infrastructure/i, sv: /gemensam infrastruktur/i },
  },
];

export const ALL_PATHS: readonly string[] = ROUTES.flatMap((r) => [r.en, r.sv]);

export const CTA_DESTINATIONS = {
  heroDemo: /\/demo\/$/,
  market: /\/market\/$/,
  diagnostic: /#design-partners$/,
} as const;
