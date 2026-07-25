/**
 * Locale-aware routing.
 *
 * The EN/SV switch is route-based, not script-based: every page has a real
 * counterpart URL in the other language, so the toggle is two ordinary links and
 * works with JavaScript disabled. Swedish slugs are localized because the initial
 * market is Swedish-first (PLAN.md section 4).
 */

export const LOCALES = ['en', 'sv'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export type RouteKey = 'home' | 'demo' | 'method' | 'privacy';

/** Path segment per route per locale. An empty segment is the locale root. */
const SEGMENTS: Readonly<Record<RouteKey, Readonly<Record<Locale, string>>>> = {
  home: { en: '', sv: 'sv' },
  demo: { en: 'demo', sv: 'sv/demo' },
  method: { en: 'method', sv: 'sv/metod' },
  privacy: { en: 'privacy', sv: 'sv/integritet' },
};

/** BASE_URL is `/talenomix` in production and `/` in some tooling contexts. */
function base(): string {
  const raw = import.meta.env.BASE_URL || '/';
  return raw.endsWith('/') ? raw : `${raw}/`;
}

/** Absolute site path for a route in a locale, including the deployment base. */
export function route(key: RouteKey, locale: Locale): string {
  const segment = SEGMENTS[key][locale];
  return segment === '' ? base() : `${base()}${segment}/`;
}

/** Resolve a path relative to the deployment base (for assets and anchors). */
export function asset(path: string): string {
  return `${base()}${path.replace(/^\/+/, '')}`;
}

/** Homepage section anchor, usable from any page in any locale. */
export function anchor(locale: Locale, id: string): string {
  return `${route('home', locale)}#${id}`;
}

export const OTHER_LOCALE: Readonly<Record<Locale, Locale>> = {
  en: 'sv',
  sv: 'en',
};

export const HTML_LANG: Readonly<Record<Locale, string>> = {
  en: 'en',
  sv: 'sv',
};

/** BCP-47 tags emitted in hreflang alternates. */
export const HREFLANG: Readonly<Record<Locale, string>> = {
  en: 'en',
  sv: 'sv-SE',
};

export const LOCALE_SHORT: Readonly<Record<Locale, string>> = {
  en: 'EN',
  sv: 'SV',
};

/** Endonym, used for the toggle's accessible name. */
export const LOCALE_ENDONYM: Readonly<Record<Locale, string>> = {
  en: 'English',
  sv: 'Svenska',
};
