/** Shared route table for the test suite. Mirrors src/lib/routes.ts. */

export interface RouteCase {
  readonly key: 'home' | 'demo' | 'method' | 'privacy';
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
    h1: { en: /market map you can defend/i, sv: /marknadskarta som håller/i },
  },
  {
    key: 'demo',
    en: './demo/',
    sv: './sv/demo/',
    h1: { en: /fictional mandate/i, sv: /fiktivt uppdrag/i },
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
];

export const ALL_PATHS: readonly string[] = ROUTES.flatMap((r) => [r.en, r.sv]);
