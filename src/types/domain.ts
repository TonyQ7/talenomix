/**
 * Typed internal interfaces for Talenomix.
 *
 * PLAN.md section 3 enumerates these nine interfaces. They are internal only —
 * no public production API is exposed. `FirmRecord` and `PainEvidence` describe
 * the private research pipeline's row shapes and are declared here so the public
 * site, the demo scenario and the private workspace all agree on one model.
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

/** One firm in the publicly discoverable Nordic universe. Private data — never published. */
export interface FirmRecord {
  readonly firmId: string;
  readonly legalName: string;
  readonly tradingName?: string;
  readonly domain: string;
  readonly countries: readonly NordicCountry[];
  readonly offices: readonly string[];
  readonly organisationNumber?: string;
  readonly teamSizeBand: '1-4' | '5-15' | '16-50' | '51-200' | '200+' | 'unknown';
  readonly hasVisibleResearchFunction: boolean;
  readonly retainedSearchEvidence: readonly SourceEvidence[];
  readonly industries: readonly string[];
  readonly functions: readonly string[];
  readonly seniority: readonly string[];
  readonly networkMemberships: readonly string[];
  readonly methodologyNotes?: string;
  readonly technologySignals: readonly string[];
  readonly clientPortalSignals: readonly string[];
  readonly services: readonly string[];
  /** Public business contact route only — never a personal email address. */
  readonly publicContactRoute?: string;
  readonly sources: readonly SourceEvidence[];
  readonly verifiedOn: string;
  readonly confidence: Confidence;
  readonly inclusionNote?: string;
}

/** Workflow stages a `PainEvidence` observation can attach to. */
export type WorkflowStage =
  | 'mandate-interpretation'
  | 'market-mapping'
  | 'institutional-memory'
  | 'data-quality'
  | 'system-fragmentation'
  | 'research-handoff'
  | 'client-reporting'
  | 'off-limits-and-conflicts'
  | 'confidentiality'
  | 'localization'
  | 'business-development'
  | 'ai-adoption';

/** One observed problem at one firm. Private data — never published un-aggregated. */
export interface PainEvidence {
  readonly evidenceId: string;
  readonly firmId: string;
  readonly stage: WorkflowStage;
  readonly observation: string;
  readonly kind: EvidenceKind;
  readonly source: SourceEvidence;
  readonly persona: 'managing-partner' | 'operations-lead' | 'head-of-research' | 'consultant' | 'researcher';
  readonly confidence: Confidence;
  /** False means a researcher inferred it; true means the firm stated it. */
  readonly statedByFirm: boolean;
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
