import type { Locale } from '~/lib/routes';
import type { Dictionary } from './types';
import { en } from './en';
import { sv } from './sv';

const DICTIONARIES: Readonly<Record<Locale, Dictionary>> = { en, sv };

export function t(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}

export type { Dictionary } from './types';
