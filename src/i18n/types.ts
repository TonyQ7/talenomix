/**
 * The bilingual content contract.
 *
 * Both `en.ts` and `sv.ts` are typed as `Dictionary`, so a missing or misspelled
 * key is a type error rather than a silently untranslated fragment. `astro check`
 * runs in CI, which makes translation completeness a build gate.
 */

import type { CoverageState, NordicCountry } from '~/types/domain';

export interface PageMeta {
  readonly title: string;
  readonly description: string;
}

export interface Labelled {
  readonly label: string;
  readonly body: string;
}

export interface Metric {
  readonly value: string;
  readonly label: string;
  readonly detail?: string;
}

export interface NumberedStep {
  readonly n: string;
  readonly title: string;
  readonly body: string;
  readonly stamp: string;
}

export interface QA {
  readonly q: string;
  readonly a: readonly string[];
}

export interface Dictionary {
  readonly meta: {
    readonly siteName: string;
    readonly home: PageMeta;
    readonly demo: PageMeta;
    readonly market: PageMeta;
    readonly method: PageMeta;
    readonly privacy: PageMeta;
    readonly forExecutive: PageMeta;
    readonly forBoutique: PageMeta;
    readonly forResearch: PageMeta;
    readonly notFound: PageMeta;
  };

  readonly ui: {
    readonly skipToContent: string;
    readonly languageGroup: string;
    readonly switchTo: string;
    readonly sheet: string;
    readonly source: string;
    readonly sources: string;
    readonly retrieved: string;
    readonly confidence: string;
    readonly claim: string;
    readonly type: string;
    readonly vendorClaimNote: string;
    readonly opensNewTab: string;
    readonly backToTop: string;
    readonly syntheticBadge: string;
    readonly syntheticData: string;
    readonly scrollTable: string;
    /** Accessible name for the narrow-viewport nav disclosure. */
    readonly menu: string;
    /** Trails the live registry figure in the hero badge. */
    readonly frameBadge: string;
    /** Labels for the hero film's pause control (WCAG 2.2.2). */
    readonly pauseVideo: string;
    readonly playVideo: string;
  };

  readonly nav: {
    readonly product: string;
    readonly workflow: string;
    readonly demo: string;
    readonly market: string;
    readonly designPartners: string;
    readonly evidence: string;
    readonly method: string;
    readonly privacy: string;
    readonly home: string;
  };

  readonly brand: {
    readonly name: string;
    readonly product: string;
    readonly descriptor: string;
    readonly publicBoundaryNote: string;
  };

  readonly states: Readonly<Record<CoverageState, string>>;

  /** Market names, so the console never renders a bare ISO code as a label. */
  readonly countries: Readonly<Record<NordicCountry, string>>;

  readonly evidenceKinds: Readonly<Record<string, string>>;

  readonly home: {
    readonly hero: {
      readonly eyebrow: string;
      readonly headline: string;
      readonly body: string;
      readonly primaryCta: string;
      readonly secondaryCta: string;
      readonly quickTitle: string;
      readonly outcomes: readonly Labelled[];
      readonly flowLabel: string;
      readonly flow: readonly string[];
      readonly mapTitle: string;
      readonly mapCaption: string;
      readonly mapLegendTitle: string;
    };

    /** The hero instrument panel. Every figure in it resolves to a claim. */
    readonly console: {
      readonly title: string;
      readonly status: string;
      readonly filterLegend: string;
      readonly allLabel: string;
      readonly summary: readonly Metric[];
      readonly readoutTitle: string;
      readonly frameLabel: string;
      readonly publishedLabel: string;
      readonly absent: string;
      readonly mapLabel: string;
      readonly coverageLabel: string;
      readonly scopeLabel: string;
      readonly scopeSource: string;
      readonly scopeLegend: string;
      readonly scopeAll: string;
      readonly scopeCharacterised: string;
      /** Contains `{n}` — the count of entities with no published headcount. */
      readonly scopeUnknown: string;
      /** Contains `{band}` — the selected size band. */
      readonly scopeInBand: string;
      /** Contains `{n}` — the count inside the 5–49 target band. */
      readonly scopeIcp: string;
      readonly streamLabel: string;
      /** Contains `{n}` — the number of ledger entries. */
      readonly streamCount: string;
      readonly note: string;
      readonly cta: string;
    };
    readonly bottleneck: {
      readonly eyebrow: string;
      readonly title: string;
      readonly lede: string;
      readonly items: readonly Labelled[];
      readonly note: string;
    };
    readonly workflow: {
      readonly eyebrow: string;
      readonly title: string;
      readonly lede: string;
      readonly inputLabel: string;
      readonly outputLabel: string;
      readonly steps: readonly NumberedStep[];
      readonly note: string;
    };
    readonly demo: {
      readonly eyebrow: string;
      readonly title: string;
      readonly lede: string;
      readonly points: readonly string[];
      readonly cta: string;
      readonly note: string;
    };
    readonly stack: {
      readonly eyebrow: string;
      readonly title: string;
      readonly lede: string;
      readonly inputTitle: string;
      readonly inputItems: readonly string[];
      readonly coreTitle: string;
      readonly coreItems: readonly string[];
      readonly outputTitle: string;
      readonly outputItems: readonly string[];
      readonly pullquote: string;
      readonly note: string;
    };
    readonly human: {
      readonly eyebrow: string;
      readonly title: string;
      readonly lede: string;
      readonly humanTitle: string;
      readonly humanItems: readonly string[];
      readonly neverTitle: string;
      readonly neverItems: readonly string[];
      readonly note: string;
      readonly noteLinkText: string;
      readonly noteLinkHref: string;
    };
    readonly partners: {
      readonly eyebrow: string;
      readonly title: string;
      readonly lede: string;
      readonly termsTitle: string;
      readonly terms: readonly string[];
      readonly fitTitle: string;
      readonly fit: readonly string[];
      readonly deliverablesTitle: string;
      readonly deliverables: readonly string[];
      readonly metricTitle: string;
      readonly metricBody: string;
      readonly applyTitle: string;
      readonly applyBody: string;
      readonly applyStatus: string;
      readonly priceNote: string;
    };
    readonly evidence: {
      readonly eyebrow: string;
      readonly title: string;
      readonly lede: string;
      readonly notClaimedTitle: string;
      readonly notClaimed: readonly string[];
      readonly cta: string;
    };
    readonly faq: {
      readonly eyebrow: string;
      readonly title: string;
      readonly items: readonly QA[];
    };
    readonly finalCta: {
      readonly eyebrow: string;
      readonly title: string;
      readonly body: string;
      readonly primaryCta: string;
      readonly secondaryCta: string;
    };
  };

  readonly demo: {
    readonly eyebrow: string;
    readonly title: string;
    readonly lede: string;
    readonly syntheticNotice: string;
    readonly stepLabel: string;
    readonly ofLabel: string;
    readonly prev: string;
    readonly next: string;
    readonly showAll: string;
    readonly stepNav: string;
    readonly steps: readonly {
      readonly id: string;
      readonly title: string;
      readonly body: string;
      readonly stamp: string;
      readonly systemWork: string;
      readonly humanDecision: string;
    }[];
    readonly overviewTitle: string;
    readonly overviewLede: string;
    readonly overviewStats: readonly Metric[];
    readonly systemLabel: string;
    readonly humanLabel: string;
    readonly intakeTitle: string;
    readonly intakeItems: readonly Labelled[];
    readonly intakeStats: readonly Metric[];
    readonly mandateTitle: string;
    readonly fields: {
      readonly role: string;
      readonly client: string;
      readonly sector: string;
      readonly markets: string;
      readonly reportsTo: string;
      readonly mustHave: string;
      readonly niceToHave: string;
      readonly exclusions: string;
      readonly openQuestions: string;
      readonly approval: string;
    };
    readonly approvalPending: string;
    readonly approvalGranted: string;
    readonly universeTitle: string;
    readonly universeLede: string;
    readonly universeStats: readonly Metric[];
    readonly filterLabel: string;
    readonly filterAll: string;
    readonly tableHeads: {
      readonly company: string;
      readonly country: string;
      readonly segment: string;
      readonly rationale: string;
      readonly state: string;
      readonly depth: string;
      readonly roleFocus: string;
      readonly reason: string;
      readonly openQuestion: string;
    };
    readonly researchTitle: string;
    readonly researchLede: string;
    readonly researchStats: readonly Metric[];
    readonly noPersonNote: string;
    readonly resolveTitle: string;
    readonly resolveLede: string;
    readonly resolveItems: readonly {
      readonly code: string;
      readonly issue: string;
      readonly detail: string;
      readonly decision: string;
    }[];
    readonly packTitle: string;
    readonly packLede: string;
    readonly packVersion: string;
    readonly packQuestionsTitle: string;
    readonly packContents: readonly string[];
    readonly exportTitle: string;
    readonly exportLede: string;
    readonly exportFlowLabel: string;
    readonly exportFlow: readonly string[];
    readonly exportStats: readonly Metric[];
    readonly exportNote: string;
    readonly coverageTitle: string;
    readonly ctaTitle: string;
    readonly ctaBody: string;
    readonly cta: string;
    readonly noJsNote: string;
  };

  readonly market: {
    readonly eyebrow: string;
    readonly title: string;
    readonly lede: string;
    readonly caveatTitle: string;
    readonly caveatBody: string;
    readonly metricsTitle: string;
    readonly coverageTitle: string;
    readonly coverageLede: string;
    readonly tableHeads: {
      readonly country: string;
      readonly frame: string;
      readonly publishedCount: string;
      readonly status: string;
      readonly source: string;
    };
    readonly notPublished: string;
    readonly sourceNote: string;
    readonly methodCta: string;
  };

  readonly segments: {
    readonly executive: SegmentPage;
    readonly boutique: SegmentPage;
    readonly research: SegmentPage;
  };

  readonly method: {
    readonly eyebrow: string;
    readonly title: string;
    readonly lede: string;
    readonly sections: readonly {
      readonly id: string;
      readonly title: string;
      readonly body: readonly string[];
      readonly list?: readonly string[];
    }[];
    readonly gradesTitle: string;
    readonly grades: readonly Labelled[];
    readonly ledgerTitle: string;
    readonly ledgerLede: string;
    readonly unknownTitle: string;
    readonly unknowns: readonly string[];
  };

  readonly privacy: {
    readonly eyebrow: string;
    readonly title: string;
    readonly lede: string;
    readonly updated: string;
    readonly sections: readonly {
      readonly id: string;
      readonly title: string;
      readonly body: readonly string[];
      readonly list?: readonly string[];
    }[];
  };

  readonly notFound: {
    readonly code: string;
    readonly title: string;
    readonly body: string;
    readonly links: string;
  };

  readonly footer: {
    readonly blurb: string;
    readonly productTitle: string;
    readonly companyTitle: string;
    readonly languageTitle: string;
    readonly rights: string;
    readonly disclaimer: string;
  };
}

export interface SegmentPage {
  readonly eyebrow: string;
  readonly title: string;
  readonly lede: string;
  readonly signalTitle: string;
  readonly signals: readonly string[];
  readonly outcomeTitle: string;
  readonly outcomes: readonly string[];
  readonly ctaTitle: string;
  readonly ctaBody: string;
  readonly cta: string;
}
