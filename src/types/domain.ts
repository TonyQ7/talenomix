/**
 * Typed internal interfaces for Talenomix.
 *
 * Public contracts only. Firm, person, financial, score, and pain-evidence
 * records live exclusively in the private talenomix-intel repository. Keeping
 * them out of this package graph makes the public build physically incapable of
 * importing prospect data.
 *
 * Nothing in this file may carry real personal data. See src/data/demo.ts.
 */

export type NordicCountry = 'SE' | 'DK' | 'NO' | 'FI' | 'IS';

/** A–D grading used across the research pipeline. A is a direct, dated statement. */
export type Confidence = 'A' | 'B' | 'C' | 'D';

/**
 * How a piece of supporting material was obtained. `vendor-claim` exists so that
 * marketing copy is never silently promoted to independently verified fact.
 */
export type EvidenceKind =
  | 'direct-statement'
  | 'job-requirement'
  | 'customer-case'
  | 'workflow-proxy'
  | 'vendor-claim'
  | 'regulation'
  | 'association-directory'
  | 'official-statistics'
  | 'public-compilation'
  | 'inference';

/** Where an assertion came from, with enough detail to re-verify it later. */
export interface SourceEvidence {
  readonly id: string;
  readonly url: string;
  readonly publisher: string;
  /** ISO-8601 date the source was retrieved and checked. */
  readonly retrievedOn: string;
  /** ISO-8601 publication date where the source states one. */
  readonly publishedOn?: string;
  readonly kind: EvidenceKind;
  /** BCP-47 tag of the original passage. */
  readonly language: string;
  /** The supporting passage in its original language, quoted verbatim and briefly. */
  readonly passage?: string;
  /** English paraphrase of `passage` when the original is not English. */
  readonly paraphrase?: string;
}

/**
 * A public-facing statement plus the source that backs it.
 * scripts/verify-claims.mjs fails the build if any claim loses its source.
 */
export interface Claim {
  readonly id: string;
  readonly text: Readonly<Record<'en' | 'sv', string>>;
  readonly source: SourceEvidence;
  readonly confidence: Confidence;
  /** True when the claim restates a vendor's own marketing, not a verified fact. */
  readonly vendorClaim: boolean;
}

/** One publishable aggregate with a resolvable public source and explicit basis. */
export interface MarketFigure {
  readonly id: string;
  readonly country: NordicCountry | 'Nordic';
  readonly label: Readonly<Record<'en' | 'sv', string>>;
  readonly value: number | null;
  readonly unit: 'firms' | 'EUR millions' | 'percent' | 'status';
  readonly period: string;
  readonly sourceId: string;
  readonly retrievedOn: string;
  readonly basis:
    | 'official-registry'
    | 'official-statistics'
    | 'directory-published'
    | 'review-in-progress';
  readonly confidence: Confidence;
  readonly caveat: Readonly<Record<'en' | 'sv', string>>;
}

/** Resolution state of any mapped item. Used by the demo and the coverage report. */
export type CoverageState = 'included' | 'excluded' | 'unresolved' | 'needs-review';

/** A normalized mandate: the output of brief extraction, after human approval. */
export interface MandateCase {
  readonly mandateId: string;
  readonly roleTitle: string;
  readonly clientDescriptor: string;
  readonly countries: readonly NordicCountry[];
  readonly sector: string;
  readonly reportsTo: string;
  readonly mustHave: readonly string[];
  readonly niceToHave: readonly string[];
  readonly exclusions: readonly string[];
  readonly openQuestions: readonly string[];
  /** True when every extracted criterion has been confirmed by a named human. */
  readonly approved: boolean;
  readonly approvedBy?: string;
  readonly approvedOn?: string;
}

/** A company the research team believes belongs in the target universe. */
export interface TargetCompanyHypothesis {
  readonly id: string;
  readonly name: string;
  readonly country: NordicCountry;
  readonly segment: string;
  readonly rationale: string;
  readonly state: CoverageState;
  /** 0–1. Drives contour strength on the map: more evidence, deeper terrain. */
  readonly evidenceDepth: number;
  readonly sources: readonly SourceEvidence[];
  readonly offLimits?: {
    readonly reason: string;
    readonly suppliedByCustomer: boolean;
  };
  readonly duplicateOf?: string;
}

/**
 * A research lead. Deliberately never a ranking or a suitability score —
 * PLAN.md forbids automated candidate scoring in v1.
 */
export interface ResearchHypothesis {
  readonly id: string;
  readonly targetCompanyId: string;
  /** Role to research at that company, not a named person. */
  readonly roleFocus: string;
  readonly reasonToResearch: string;
  readonly state: CoverageState;
  readonly sources: readonly SourceEvidence[];
  readonly openQuestion?: string;
  readonly assignedTo?: string;
}

/** The synthetic scenario rendered at /demo/. Every field is fictional. */
export interface DemoScenario {
  readonly id: string;
  readonly synthetic: true;
  readonly mandate: MandateCase;
  readonly targets: readonly TargetCompanyHypothesis[];
  readonly research: readonly ResearchHypothesis[];
  readonly coverage: Readonly<Record<CoverageState, number>>;
}

/** Narrow a string to CoverageState at module boundaries. */
export const COVERAGE_STATES: readonly CoverageState[] = [
  'included',
  'excluded',
  'unresolved',
  'needs-review',
];

export function isCoverageState(value: string): value is CoverageState {
  return (COVERAGE_STATES as readonly string[]).includes(value);
}
