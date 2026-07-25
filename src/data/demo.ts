/**
 * The synthetic demo scenario.
 *
 * EVERY value here is fictional. There are no real companies, no real people and
 * no real search. Research tasks deliberately point at a role inside a company
 * rather than at a person, which is both the product's actual design and the
 * reason this page contains no personal data at all.
 *
 * Segment keys match the clusters in src/lib/universe.ts so the map and the
 * walkthrough describe the same territory.
 */

import type { Locale } from '~/lib/routes';
import type {
  CoverageState,
  MandateCase,
  NordicCountry,
  ResearchHypothesis,
  TargetCompanyHypothesis,
} from '~/types/domain';

type L = Readonly<Record<Locale, string>>;
type LList = Readonly<Record<Locale, readonly string[]>>;

const pick = (value: L, locale: Locale): string => value[locale];
const pickList = (value: LList, locale: Locale): readonly string[] => value[locale];

/* -------------------------------------------------------------------------- */
/* Mandate                                                                     */
/* -------------------------------------------------------------------------- */

const MANDATE = {
  mandateId: 'MND-2026-0148',
  roleTitle: {
    en: 'Group Chief Operating Officer',
    sv: 'Group Chief Operating Officer',
  } satisfies L,
  clientDescriptor: {
    en: 'Nordvik Industri AB — fictional listed industrial group, ~3,400 employees',
    sv: 'Nordvik Industri AB — fiktiv börsnoterad industrikoncern, ca 3 400 anställda',
  } satisfies L,
  sector: {
    en: 'Industrial manufacturing and process technology',
    sv: 'Industriell tillverkning och processteknik',
  } satisfies L,
  reportsTo: {
    en: 'Group CEO, with a standing board reporting line on operational risk',
    sv: 'Koncernchef, med stående rapportering till styrelsen om operativ risk',
  } satisfies L,
  countries: ['SE', 'DK', 'NO', 'FI'] as readonly NordicCountry[],
  mustHave: {
    en: [
      'P&L ownership above SEK 2bn in a multi-site industrial group',
      'Demonstrated plant consolidation or footprint restructuring',
      'Nordic operating experience with at least one cross-border role',
      'Board-facing exposure on operational risk',
    ],
    sv: [
      'P&L-ansvar över 2 mdkr i en industrikoncern med flera anläggningar',
      'Genomförd anläggningskonsolidering eller omstrukturering av produktionsstruktur',
      'Nordisk operativ erfarenhet med minst en gränsöverskridande roll',
      'Erfarenhet av att föredra operativ risk för styrelse',
    ],
  } satisfies LList,
  niceToHave: {
    en: [
      'Experience of a listed-company environment',
      'Automation or process-control background',
      'Working Swedish or Danish alongside English',
    ],
    sv: [
      'Erfarenhet från börsnoterad miljö',
      'Bakgrund inom automation eller processtyrning',
      'Arbetsspråk svenska eller danska vid sidan av engelska',
    ],
  } satisfies LList,
  exclusions: {
    en: [
      'Direct competitors named in the client off-limits list',
      'Companies below 400 employees — out of scale for the role',
      'Pure services and consulting businesses',
    ],
    sv: [
      'Direkta konkurrenter som namnges i kundens off-limits-lista',
      'Bolag under 400 anställda – fel storleksordning för rollen',
      'Rena tjänste- och konsultverksamheter',
    ],
  } satisfies LList,
  openQuestions: {
    en: [
      'Is the Finnish energy-systems segment in scope, or adjacent? The brief is silent.',
      'Does the off-limits rule cover the parent group or only the named subsidiary?',
      'Is relocation to Sweden required, or is a Nordic base acceptable?',
    ],
    sv: [
      'Är det finska energisystemsegmentet inom omfattningen, eller angränsande? Beskrivningen är tyst.',
      'Omfattar off-limits-regeln moderkoncernen eller bara det namngivna dotterbolaget?',
      'Krävs flytt till Sverige, eller räcker en nordisk bas?',
    ],
  } satisfies LList,
};

/* -------------------------------------------------------------------------- */
/* Target companies — all fictional                                            */
/* -------------------------------------------------------------------------- */

interface RawTarget {
  readonly id: string;
  readonly name: string;
  readonly country: NordicCountry;
  readonly segmentKey: string;
  readonly segment: L;
  readonly rationale: L;
  readonly state: CoverageState;
  readonly evidenceDepth: number;
  readonly offLimits?: { readonly reason: L; readonly suppliedByCustomer: boolean };
  readonly duplicateOf?: string;
}

const TARGETS: readonly RawTarget[] = [
  {
    id: 'TC-001',
    name: 'Vestmark Precision AB',
    country: 'SE',
    segmentKey: 'precision',
    segment: { en: 'Precision manufacturing', sv: 'Precisionstillverkning' },
    rationale: {
      en: 'Multi-site Swedish manufacturer at the right scale, with a published operations restructuring in the last three years.',
      sv: 'Svensk tillverkare med flera anläggningar i rätt storleksordning och en publicerad omstrukturering av verksamheten de senaste tre åren.',
    },
    state: 'included',
    evidenceDepth: 0.92,
  },
  {
    id: 'TC-002',
    name: 'Karlstad Flödesteknik AB',
    country: 'SE',
    segmentKey: 'precision',
    segment: { en: 'Precision manufacturing', sv: 'Precisionstillverkning' },
    rationale: {
      en: 'Comparable production complexity and a Nordic footprint, though below the client’s revenue band.',
      sv: 'Jämförbar produktionskomplexitet och nordisk närvaro, men under kundens omsättningsspann.',
    },
    state: 'included',
    evidenceDepth: 0.78,
  },
  {
    id: 'TC-003',
    name: 'Bergslagen Automation AB',
    country: 'SE',
    segmentKey: 'automation',
    segment: { en: 'Automation and controls', sv: 'Automation och styrsystem' },
    rationale: {
      en: 'Automation depth matches the preferred profile; two plants consolidated into one site in the period of interest.',
      sv: 'Automationsdjupet matchar den meriterande profilen; två anläggningar slogs ihop till en under den aktuella perioden.',
    },
    state: 'included',
    evidenceDepth: 0.85,
  },
  {
    id: 'TC-004',
    name: 'Väst Industriservice AB',
    country: 'SE',
    segmentKey: 'automation',
    segment: { en: 'Automation and controls', sv: 'Automation och styrsystem' },
    rationale: {
      en: 'Appears in the new universe and again in the CRM export under a former trading name. Held pending a merge decision.',
      sv: 'Förekommer i det nya universumet och igen i CRM-exporten under ett tidigare firmanamn. Hålls i väntan på beslut om sammanslagning.',
    },
    state: 'needs-review',
    evidenceDepth: 0.44,
    duplicateOf: 'TC-003',
  },
  {
    id: 'TC-005',
    name: 'Aalborg Procesindustri A/S',
    country: 'DK',
    segmentKey: 'process',
    segment: { en: 'Process industry', sv: 'Processindustri' },
    rationale: {
      en: 'Danish process manufacturer of matching scale with a documented cross-border operating structure.',
      sv: 'Dansk processtillverkare i matchande storlek med dokumenterad gränsöverskridande organisationsstruktur.',
    },
    state: 'included',
    evidenceDepth: 0.81,
  },
  {
    id: 'TC-006',
    name: 'Hallström Kraftteknik AB',
    country: 'SE',
    segmentKey: 'process',
    segment: { en: 'Process industry', sv: 'Processindustri' },
    rationale: {
      en: 'Process-technology portfolio overlaps the client’s. Listed environment satisfies a preferred criterion.',
      sv: 'Processteknikportföljen överlappar kundens. Börsnoterad miljö uppfyller ett meriterande kriterium.',
    },
    state: 'included',
    evidenceDepth: 0.69,
  },
  {
    id: 'TC-007',
    name: 'Kattegat Marine Systems A/S',
    country: 'DK',
    segmentKey: 'marine',
    segment: { en: 'Marine and subsea', sv: 'Marin och subsea' },
    rationale: {
      en: 'Adjacent sector, but the operational profile — multi-site, heavy asset, Nordic — maps closely to the brief.',
      sv: 'Angränsande bransch, men den operativa profilen – flera anläggningar, tunga tillgångar, nordisk – ligger nära beskrivningen.',
    },
    state: 'included',
    evidenceDepth: 0.62,
  },
  {
    id: 'TC-008',
    name: 'Tromsø Subsea AS',
    country: 'NO',
    segmentKey: 'marine',
    segment: { en: 'Marine and subsea', sv: 'Marin och subsea' },
    rationale: {
      en: 'Scale is plausible but unconfirmed: the only size signal is an undated page. Flagged rather than assumed.',
      sv: 'Storleken är trolig men obekräftad: enda storleksindikationen är en odaterad sida. Flaggad i stället för antagen.',
    },
    state: 'needs-review',
    evidenceDepth: 0.41,
  },
  {
    id: 'TC-009',
    name: 'Lahti Voima Oy',
    country: 'FI',
    segmentKey: 'energy',
    segment: { en: 'Energy systems', sv: 'Energisystem' },
    rationale: {
      en: 'Segment classification rests on a single undated source page. Whether energy systems are in scope is an open question for the client.',
      sv: 'Segmentklassningen vilar på en enda odaterad källsida. Om energisystem ingår i omfattningen är en öppen fråga till kunden.',
    },
    state: 'unresolved',
    evidenceDepth: 0.33,
  },
  {
    id: 'TC-010',
    name: 'Suomen Konepaja Oy',
    country: 'FI',
    segmentKey: 'energy',
    segment: { en: 'Energy systems', sv: 'Energisystem' },
    rationale: {
      en: 'Same open question as TC-009, and the public employee count contradicts the group’s own annual report.',
      sv: 'Samma öppna fråga som TC-009, och det publika antalet anställda motsäger koncernens egen årsredovisning.',
    },
    state: 'unresolved',
    evidenceDepth: 0.29,
  },
  {
    id: 'TC-011',
    name: 'Öresund Materialteknik AB',
    country: 'SE',
    segmentKey: 'materials',
    segment: { en: 'Materials technology', sv: 'Materialteknik' },
    rationale: {
      en: 'Excluded on a client off-limits rule covering this subsidiary. The parent group remains in scope.',
      sv: 'Exkluderad enligt kundens off-limits-regel för detta dotterbolag. Moderkoncernen kvarstår i omfattningen.',
    },
    state: 'excluded',
    evidenceDepth: 0.5,
    offLimits: {
      reason: {
        en: 'Client off-limits list, supplied at briefing. Applies to the subsidiary only.',
        sv: 'Kundens off-limits-lista, lämnad vid uppdragsstart. Gäller endast dotterbolaget.',
      },
      suppliedByCustomer: true,
    },
  },
  {
    id: 'TC-012',
    name: 'Nordfjell Systems AS',
    country: 'NO',
    segmentKey: 'materials',
    segment: { en: 'Materials technology', sv: 'Materialteknik' },
    rationale: {
      en: 'Excluded on scale: headcount is below the 400-employee floor stated in the brief.',
      sv: 'Exkluderad på storlek: antalet anställda ligger under golvet på 400 som anges i beskrivningen.',
    },
    state: 'excluded',
    evidenceDepth: 0.36,
  },
];

/* -------------------------------------------------------------------------- */
/* Research queue — roles, never people                                        */
/* -------------------------------------------------------------------------- */

interface RawResearch {
  readonly id: string;
  readonly targetCompanyId: string;
  readonly roleFocus: L;
  readonly reasonToResearch: L;
  readonly state: CoverageState;
  readonly openQuestion?: L;
}

const RESEARCH: readonly RawResearch[] = [
  {
    id: 'RH-001',
    targetCompanyId: 'TC-001',
    roleFocus: { en: 'Chief Operating Officer', sv: 'Chief Operating Officer' },
    reasonToResearch: {
      en: 'Directly comparable role at comparable scale, with the restructuring experience the brief requires.',
      sv: 'Direkt jämförbar roll i jämförbar storlek, med den omstruktureringserfarenhet beskrivningen kräver.',
    },
    state: 'included',
  },
  {
    id: 'RH-002',
    targetCompanyId: 'TC-001',
    roleFocus: { en: 'VP Manufacturing', sv: 'VP Manufacturing' },
    reasonToResearch: {
      en: 'One level below the target role — a natural step-up candidate pool worth covering.',
      sv: 'En nivå under målrollen – en naturlig pool för steget upp och värd att täcka.',
    },
    state: 'included',
  },
  {
    id: 'RH-003',
    targetCompanyId: 'TC-003',
    roleFocus: { en: 'Director of Operations', sv: 'Operativ chef' },
    reasonToResearch: {
      en: 'Led the two-plant consolidation referenced in the company’s own reporting.',
      sv: 'Ledde den anläggningskonsolidering som omnämns i bolagets egen rapportering.',
    },
    state: 'included',
  },
  {
    id: 'RH-004',
    targetCompanyId: 'TC-005',
    roleFocus: { en: 'Chief Operating Officer', sv: 'Chief Operating Officer' },
    reasonToResearch: {
      en: 'Cross-border Nordic operating structure matches the mandate’s must-have criteria.',
      sv: 'Gränsöverskridande nordisk struktur matchar uppdragets skallkrav.',
    },
    state: 'included',
  },
  {
    id: 'RH-005',
    targetCompanyId: 'TC-006',
    roleFocus: { en: 'SVP Operations', sv: 'SVP Operations' },
    reasonToResearch: {
      en: 'Listed-company environment plus overlapping process-technology portfolio.',
      sv: 'Börsnoterad miljö plus överlappande processteknikportfölj.',
    },
    state: 'included',
  },
  {
    id: 'RH-006',
    targetCompanyId: 'TC-007',
    roleFocus: { en: 'Head of Group Production', sv: 'Produktionschef koncern' },
    reasonToResearch: {
      en: 'Adjacent-sector coverage, included deliberately to test the boundary of the market with the client.',
      sv: 'Täckning av angränsande bransch, medvetet inkluderad för att pröva marknadens gräns tillsammans med kunden.',
    },
    state: 'included',
  },
  {
    id: 'RH-007',
    targetCompanyId: 'TC-008',
    roleFocus: { en: 'Operations Director', sv: 'Operativ direktör' },
    reasonToResearch: {
      en: 'Held until company scale is confirmed. Researching it now risks wasted calls.',
      sv: 'Hålls tills bolagets storlek är bekräftad. Att researcha nu riskerar bortkastade samtal.',
    },
    state: 'needs-review',
    openQuestion: {
      en: 'Confirm headcount and revenue band from a dated source before opening this task.',
      sv: 'Bekräfta antal anställda och omsättningsspann från en daterad källa innan uppgiften öppnas.',
    },
  },
  {
    id: 'RH-008',
    targetCompanyId: 'TC-009',
    roleFocus: { en: 'Chief Operating Officer', sv: 'Chief Operating Officer' },
    reasonToResearch: {
      en: 'Blocked on the segment-scope question. The client decides whether this market is in or out.',
      sv: 'Blockerad av frågan om segmentets omfattning. Kunden avgör om marknaden ingår eller inte.',
    },
    state: 'unresolved',
    openQuestion: {
      en: 'Is the Finnish energy-systems segment in scope? Raised as calibration question C-02.',
      sv: 'Ingår det finska energisystemsegmentet? Lyft som kalibreringsfråga C-02.',
    },
  },
];

/* -------------------------------------------------------------------------- */
/* Localized accessors                                                         */
/* -------------------------------------------------------------------------- */

export interface DemoTarget extends TargetCompanyHypothesis {
  readonly segmentKey: string;
}

export function demoMandate(locale: Locale): MandateCase {
  return {
    mandateId: MANDATE.mandateId,
    roleTitle: pick(MANDATE.roleTitle, locale),
    clientDescriptor: pick(MANDATE.clientDescriptor, locale),
    countries: MANDATE.countries,
    sector: pick(MANDATE.sector, locale),
    reportsTo: pick(MANDATE.reportsTo, locale),
    mustHave: pickList(MANDATE.mustHave, locale),
    niceToHave: pickList(MANDATE.niceToHave, locale),
    exclusions: pickList(MANDATE.exclusions, locale),
    openQuestions: pickList(MANDATE.openQuestions, locale),
    approved: true,
    approvedBy: 'head-of-research',
    approvedOn: '2026-07-25',
  };
}

export function demoTargets(locale: Locale): readonly DemoTarget[] {
  return TARGETS.map((t) => ({
    id: t.id,
    name: t.name,
    country: t.country,
    segment: pick(t.segment, locale),
    segmentKey: t.segmentKey,
    rationale: pick(t.rationale, locale),
    state: t.state,
    evidenceDepth: t.evidenceDepth,
    sources: [],
    ...(t.offLimits
      ? {
          offLimits: {
            reason: pick(t.offLimits.reason, locale),
            suppliedByCustomer: t.offLimits.suppliedByCustomer,
          },
        }
      : {}),
    ...(t.duplicateOf ? { duplicateOf: t.duplicateOf } : {}),
  }));
}

export function demoResearch(locale: Locale): readonly ResearchHypothesis[] {
  return RESEARCH.map((r) => ({
    id: r.id,
    targetCompanyId: r.targetCompanyId,
    roleFocus: pick(r.roleFocus, locale),
    reasonToResearch: pick(r.reasonToResearch, locale),
    state: r.state,
    sources: [],
    ...(r.openQuestion ? { openQuestion: pick(r.openQuestion, locale) } : {}),
  }));
}

/** Counts per coverage state, derived rather than hand-written so they cannot drift. */
export function demoCoverage(): Readonly<Record<CoverageState, number>> {
  const counts: Record<CoverageState, number> = {
    included: 0,
    excluded: 0,
    unresolved: 0,
    'needs-review': 0,
  };
  for (const t of TARGETS) counts[t.state] += 1;
  return counts;
}

export const DEMO_TOTAL = TARGETS.length;

/** Company lookup used when rendering the research queue. */
export function targetName(id: string): string {
  return TARGETS.find((t) => t.id === id)?.name ?? id;
}

/** CSV preview shown at the final demo step. Built from the same source of truth. */
export function demoCsv(locale: Locale): string {
  const rows = demoTargets(locale)
    .filter((t) => t.state === 'included' || t.state === 'excluded')
    .slice(0, 6)
    .map((t) =>
      [t.id, t.name, t.country, t.state, t.evidenceDepth.toFixed(2), MANDATE.mandateId].join(','),
    );
  return ['target_id,company,market,state,evidence_depth,mandate_id', ...rows].join('\n');
}
