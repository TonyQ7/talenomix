import type { Dictionary } from './types';

/**
 * English source content.
 *
 * Copy discipline, from PLAN.md section 3: no customers, no partnerships, no
 * proprietary candidate data, no automated selection, no measured time savings,
 * no unbuilt integrations, and no implication that Talenomix is a cleared mark.
 */
export const en: Dictionary = {
  meta: {
    siteName: 'Talenomix',
    home: {
      title: 'Talenomix — Evidence-backed intelligence for executive search',
      description:
        'Talenomix helps executive-search firms turn a client brief, firm knowledge and trusted market information into a clear, evidence-backed search plan.',
    },
    demo: {
      title: 'Synthetic mandate demo — Talenomix',
      description:
        'Walk a fictional Group COO search from brief to calibration pack. No login, no real people, no external calls.',
    },
    market: {
      title: 'Nordic executive-search market evidence — Talenomix',
      description:
        'A source-backed view of the Nordic executive-search firm frame, published figures and the gaps still under review.',
    },
    method: {
      title: 'Method and evidence — Talenomix',
      description:
        'How the Nordic research universe is defined, how sources are collected and graded, and the full ledger of claims made on this site.',
    },
    privacy: {
      title: 'Privacy and data boundaries — Talenomix',
      description:
        'What this website collects, what a Talenomix Mandate pilot processes, and the boundaries we hold ourselves to.',
    },
    forExecutive: {
      title: 'For executive-search firms — Talenomix',
      description:
        'Mandate intelligence for established executive-search firms that want reusable research without replacing their CRM.',
    },
    forBoutique: {
      title: 'For boutique search firms — Talenomix',
      description:
        'A focused mandate-intelligence diagnostic for boutique executive-search teams with limited research capacity.',
    },
    forResearch: {
      title: 'For research-led search firms — Talenomix',
      description:
        'Evidence infrastructure for research-led executive-search firms that want their method and market knowledge to compound.',
    },
    notFound: {
      title: 'Sheet not found — Talenomix',
      description: 'This page is not part of the Talenomix site.',
    },
  },

  ui: {
    skipToContent: 'Skip to content',
    languageGroup: 'Language',
    switchTo: 'Switch to',
    sheet: 'Sheet',
    source: 'Source',
    sources: 'Sources',
    retrieved: 'Retrieved',
    confidence: 'Confidence',
    claim: 'Claim',
    type: 'Type',
    vendorClaimNote: 'Vendor’s own description — recorded, not independently verified.',
    opensNewTab: 'opens in a new tab',
    backToTop: 'Back to top',
    syntheticBadge: 'Synthetic',
    syntheticData: 'Synthetic scenario data. Not a result from a real search.',
    scrollTable: 'Table scrolls horizontally',
  },

  nav: {
    product: 'Product',
    workflow: 'Workflow',
    demo: 'Demo',
    market: 'Market evidence',
    designPartners: 'Design partners',
    evidence: 'Evidence',
    method: 'Method',
    privacy: 'Privacy',
    home: 'Home',
  },

  brand: {
    name: 'Talenomix',
    product: 'Talenomix Mandate',
    descriptor: 'Executive search intelligence',
    publicBoundaryNote:
      'Public site: aggregate evidence and a synthetic demo only. Firm records, relationships and customer data are never published here.',
  },

  states: {
    included: 'Included',
    excluded: 'Excluded',
    unresolved: 'Unresolved',
    'needs-review': 'Needs review',
  },

  countries: {
    SE: 'Sweden',
    DK: 'Denmark',
    NO: 'Norway',
    FI: 'Finland',
    IS: 'Iceland',
  },

  evidenceKinds: {
    'direct-statement': 'Direct statement',
    'job-requirement': 'Job requirement',
    'customer-case': 'Customer case',
    'workflow-proxy': 'Workflow proxy',
    'vendor-claim': 'Vendor claim',
    regulation: 'Regulation',
    'association-directory': 'Association directory',
    'official-statistics': 'Official statistics',
    'public-compilation': 'Public compilation',
    inference: 'Inference',
  },

  home: {
    hero: {
      eyebrow: 'Search intelligence for executive-search firms',
      headline: 'Turn every hiring brief into a clear, evidence-backed search plan.',
      body: 'Talenomix brings together the client brief, what your firm already knows and trusted market information. Your team sees where to search, which leadership roles to investigate, what is already known and what still needs checking — without replacing your CRM or letting AI make hiring decisions.',
      primaryCta: 'See the product in action',
      secondaryCta: 'View the design-partner programme',
      quickTitle: 'What your team gets',
      outcomes: [
        {
          label: 'Where to search',
          body: 'A target-company universe grouped by market segment, with a reason and evidence trail for every inclusion.',
        },
        {
          label: 'What to investigate',
          body: 'A practical queue of companies and leadership roles to research — never an AI-ranked list of people.',
        },
        {
          label: 'What is already known',
          body: 'Prior research, relationships, off-limits rules and past decisions surfaced from your firm’s own records.',
        },
        {
          label: 'What still needs checking',
          body: 'Thin evidence, duplicates and open client questions made visible before the search moves forward.',
        },
      ],
      flowLabel: 'How Talenomix fits into a search',
      flow: [
        'Client brief + firm knowledge',
        'Talenomix organises the evidence',
        'Your team approves the search plan',
      ],
      mapTitle: 'Mandate search universe',
      mapCaption:
        'A synthetic search map: target companies grouped by segment, each with a reason, evidence depth and review state.',
      mapLegendTitle: 'Coverage states',
    },

    console: {
      title: 'Nordic market console',
      status: 'Registry frame · in review',
      filterLegend: 'Filter the console by market',
      allLabel: 'All Nordics',
      summary: [
        {
          value: '5',
          label: 'Markets in frame',
          detail: 'Sweden, Denmark, Norway, Finland, Iceland.',
        },
        {
          value: '4',
          label: 'Open registries',
          detail: 'Four national registers publish company data as open data.',
        },
        {
          value: '151',
          label: 'Firms published',
          detail: 'Finland only. Every other market is still being resolved.',
        },
        {
          value: '0',
          label: 'Unsourced figures',
          detail: 'A number without a source fails the build.',
        },
      ],
      readoutTitle: 'Frame by market',
      frameLabel: 'Source frame',
      publishedLabel: 'Firms published',
      absent: 'In review',
      mapLabel: 'Mandate search universe',
      coverageLabel: 'Published counts by market',
      note: 'This panel shows what is actually established. Where a market has no published count, it says so rather than estimating one — the gaps are the honest part of the map.',
      cta: 'See the full market page',
    },

    bottleneck: {
      eyebrow: 'The mandate bottleneck',
      title: 'The database was never the hard part.',
      lede: 'Between a signed brief and an approved search strategy sits a week of assembly: reading the mandate into criteria, rebuilding a target universe someone already built last year, and reconstructing why a company was ruled out.',
      items: [
        {
          label: 'Every mandate restarts the map',
          body: 'The target universe is rebuilt by hand for each search, even when the firm mapped the same segment eighteen months ago and paid for the answer.',
        },
        {
          label: 'The reasoning leaves with the researcher',
          body: 'Why one part of the market was covered and another excluded lives in call notes, a spreadsheet tab, and one consultant’s memory.',
        },
        {
          label: 'Coverage is asserted, not shown',
          body: 'Clients ask what has actually been covered. Answering properly means rebuilding the argument from scratch, under deadline, in a deck.',
        },
        {
          label: 'Off-limits is a conversation, not a control',
          body: 'Restrictions and relationships get checked by asking colleagues — which does not scale across offices, parallel assignments and years of history.',
        },
      ],
      note: 'These are the hypotheses Talenomix is being built to test, not measured findings. What the research actually shows will be published with sources in the Nordic Search Operations Benchmark.',
    },

    workflow: {
      eyebrow: 'One mandate in, calibrated search strategy out',
      title: 'Seven steps. A human decision at the end of each one.',
      lede: 'Talenomix Mandate does the assembly work around a mandate launch and hands the result back to the systems and people who already own the search.',
      inputLabel: 'Signed mandate',
      outputLabel: 'Approved strategy, in your CRM',
      steps: [
        {
          n: '01',
          title: 'Normalize the mandate',
          body: 'Role, market, seniority and evidence criteria are extracted from the signed brief and put in front of a person before anything downstream runs. Ambiguity is flagged, not guessed.',
          stamp: 'Criteria approved',
        },
        {
          n: '02',
          title: 'Generate the target universe',
          body: 'Company hypotheses are proposed from approved public, licensed and customer-supplied sources — each carrying the reason it qualified and the page that supports it.',
          stamp: 'Reasons attached',
        },
        {
          n: '03',
          title: 'Reconcile with what your firm already knows',
          body: 'Your CRM export is matched against the new universe, so prior research, prior conversations and completed searches surface instead of being rebuilt from zero.',
          stamp: 'Firm memory matched',
        },
        {
          n: '04',
          title: 'Build the research queue',
          body: 'Each approved company becomes a research task with a role focus and a source link. A queue of where to look — never a ranked list of people.',
          stamp: 'No ranking',
        },
        {
          n: '05',
          title: 'Record coverage, exclusions and open questions',
          body: 'Included, excluded, unresolved and needs-review are explicit states with reasons. Off-limits and conflict flags come from you and stay under your control.',
          stamp: 'Gaps visible',
        },
        {
          n: '06',
          title: 'Produce the client calibration pack',
          body: 'A branded document your consultant takes into the calibration meeting: the map, the reasoning, the coverage so far, and the questions the client still needs to answer.',
          stamp: 'Human approved',
        },
        {
          n: '07',
          title: 'Return approved records',
          body: 'Approved companies, research tasks and decisions export back to the system your firm already runs on. The record of the search stays yours.',
          stamp: 'CRM retained',
        },
      ],
      note: 'Nothing reaches a client, and nothing returns to your CRM, without a named human approval and a change record.',
    },

    demo: {
      eyebrow: 'Interactive demo',
      title: 'Walk a fictional mandate end to end.',
      lede: 'A synthetic Group COO search at a fictional Nordic industrial group. No login, no real people, no external calls — the entire scenario ships inside the page.',
      points: [
        'Seven steps, from uploaded brief to calibration pack and CRM export',
        'Fictional companies throughout; research targets are roles, never named individuals',
        'Fully readable as a static walkthrough with JavaScript disabled',
      ],
      cta: 'Explore the synthetic demo',
      note: 'Illustrative only. The demo shows how the product is structured, not results from a real search.',
    },

    stack: {
      eyebrow: 'Works above your existing systems',
      title: 'We sit above your CRM. We do not replace it.',
      lede: 'Your system of record stays where it is. Talenomix takes an export, does the assembly work around a mandate launch, and hands approved records back in a format you already use.',
      inputTitle: 'In',
      inputItems: [
        'Signed brief — DOCX, PDF or structured form',
        'CRM export — CSV',
        'Your off-limits and conflict list',
        'Approved public and licensed sources',
      ],
      coreTitle: 'Talenomix Mandate',
      coreItems: [
        'Mandate normalization',
        'Target-company universe',
        'Source-linked research queue',
        'Coverage and exclusion record',
        'Client calibration pack',
      ],
      outputTitle: 'Out',
      outputItems: [
        'Client-ready calibration pack',
        'Approved company and research CSV',
        'Coverage and open-question report',
        'Reusable firm-memory dataset',
      ],
      pullquote: 'A CRM records the conclusions. The expensive part is reaching them.',
      note: 'CSV first, deliberately. Native integrations get built after pilots decide which systems actually matter — we do not advertise integrations we have not built.',
    },

    human: {
      eyebrow: 'What remains human',
      title: 'Judgment is not the part we are automating.',
      lede: 'The first product prepares research and shows its sources. It does not decide who is suitable, and it does not contact anyone.',
      humanTitle: 'Your consultants keep',
      humanItems: [
        'Which companies genuinely belong in the market',
        'Which executives are worth a conversation',
        'What the client actually needs, as opposed to what the brief says',
        'Every approach, every call, every relationship',
        'The advice that closes the search',
      ],
      neverTitle: 'Talenomix v1 does not',
      neverItems: [
        'Rank, score or shortlist executives',
        'Infer personality, potential or culture fit',
        'Contact candidates or run outreach sequences',
        'Recommend a hire',
        'Scrape authenticated professional networks',
      ],
      note: 'Recruitment and selection AI can fall inside the EU AI Act’s high-risk employment category. Keeping v1 to evidence-linked research preparation under human control narrows that exposure — it does not replace your own legal assessment.',
      noteLinkText: 'Regulation (EU) 2024/1689',
      noteLinkHref: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex%3A32024R1689',
    },

    partners: {
      eyebrow: 'Design partners · Nordic',
      title: 'Four weeks. One live mandate. A defensible market map and calibration pack.',
      lede: 'We are taking a small number of paid design partners, one real mandate each. Your consultants keep every judgment and every relationship; we remove the repetitive research assembly around them.',
      termsTitle: 'Terms',
      terms: [
        'Four weeks, one live mandate',
        'Always paid — there is no free pilot',
        '50% on signature, 50% on delivery',
        'One CRM export and up to two external data sources',
        'No placement or candidate-response guarantee',
        'You remain responsible for candidate decisions and outreach',
      ],
      fitTitle: 'A strong fit looks like',
      fit: [
        '5–50 people, selling retained executive search',
        'A visible researcher or analyst function',
        'Nordic market focus, and more than one consultant or practice',
        'A CRM in place, with visible manual work around it',
        'A managing partner or operations lead who can decide',
      ],
      deliverablesTitle: 'What you get',
      deliverables: [
        'Normalized mandate and search strategy',
        'Approved target-company universe',
        'Evidence-backed research queue',
        'Coverage and open-question report',
        'Client-ready calibration pack',
        'Reusable firm-memory dataset',
        'Baseline and final workflow measurements',
      ],
      metricTitle: 'How we will judge it',
      metricBody:
        'Primary measure: median researcher hours from signed mandate to client-approved market map and calibration pack. We take the baseline in week one, from your own last comparable search, and we report the result whichever way it goes.',
      applyTitle: 'How to apply',
      applyBody:
        'Bring one mandate your team is about to launch. A 30-minute problem interview comes first, then a 90-minute workflow observation, then a scoped proposal. Nothing is signed before you have seen exactly what the four weeks contain.',
      applyStatus:
        'Applications are open for a small number of Nordic firms. Bring one live mandate and the managing partner or operations lead responsible for the launch workflow.',
      priceNote:
        'Start with the fixed Mandate Intelligence Diagnostic: SEK 55,000 excluding VAT for one mandate and one primary country frame. A design partnership is scoped separately after discovery.',
    },

    evidence: {
      eyebrow: 'Evidence ledger',
      title: 'Every claim here carries a source, or it is labelled a hypothesis.',
      lede: 'Talenomix is a pre-pilot product. The market claims below carry sources and retrieval dates. A vendor describing its own software is recorded as exactly that — a vendor claim, not an independent finding.',
      notClaimedTitle: 'What this site does not claim',
      notClaimed: [
        'No customers, no completed pilots, no partnerships',
        'No proprietary candidate database and no candidate data of our own',
        'No automated candidate selection, scoring or ranking',
        'No measured time savings — the first paid pilots produce those numbers',
        'No production CRM integrations; CSV is what exists today',
        'No endorsement by any employer-brand, research or advisory organisation',
        'No Nordic totals where the reviewed country frame is not ready',
      ],
      cta: 'Read the full method',
    },

    faq: {
      eyebrow: 'Questions',
      title: 'The things partners ask first.',
      items: [
        {
          q: 'Do we have to replace our CRM?',
          a: [
            'No. Talenomix reads an export and writes an export. Invenias, Clockwork, Cluen, Thrive or a bespoke system all stay exactly where they are.',
            'The pilot deliberately tests only the work that happens between a signed brief and the moment your CRM contains an approved, client-calibrated search strategy.',
          ],
        },
        {
          q: 'Does it scrape LinkedIn?',
          a: [
            'No. There is no logged-in scraping of professional networks, no CAPTCHA bypass, and no collection from private profiles. Sources are public pages, licensed data, and what your firm supplies.',
            'LinkedIn is one important source, but it does not hold your mandate logic, prior conversations, off-limits rules or the reasoning behind why your team covered one part of the market and excluded another.',
          ],
        },
        {
          q: 'How is personal data handled?',
          a: [
            'Every processing purpose gets a documented role, legal basis, transparency method, retention rule and rights process before a pilot starts. Information being publicly available is not by itself a legal basis.',
            'A pilot data-processing agreement is signed before any customer data moves, and the privacy page sets out the boundaries we hold ourselves to.',
          ],
        },
        {
          q: 'Is this a high-risk AI system under the EU AI Act?',
          a: [
            'That assessment belongs to you and your counsel for your own use of any tool. What we can tell you is where v1 is deliberately scoped: research preparation with a human approval gate at every step.',
            'It does not rank, score or select candidates, which is where high-risk employment obligations concentrate. That narrows exposure; it does not remove your assessment duty.',
          ],
        },
        {
          q: 'Our process is proprietary. Are you replacing it?',
          a: [
            'The opposite — that is precisely what should stay yours. The pilot captures your method: your criteria, your exclusions, your calibration decisions, and makes them reusable across future mandates.',
            'We are not substituting a generic Talenomix methodology for the thing your clients pay you for.',
          ],
        },
        {
          q: 'Can AI judge senior candidates?',
          a: [
            'We agree that it cannot, and the product does not try. It structures research, shows sources, identifies missing coverage and prepares the artefacts your consultants decide from.',
            'If a tool ever tells you which executive to hire, the interesting question is what evidence it hid to sound that confident.',
          ],
        },
        {
          q: 'What does it cost?',
          a: [
            'The design partnership is priced per firm after a discovery call, based on research scope, countries, users, data sources and integration work. It is always paid — we do not run free pilots, because a free pilot is not evidence that anything is worth buying.',
          ],
        },
        {
          q: 'What happens to our data after a pilot?',
          a: [
            'Retention and deletion are agreed in writing before the pilot starts. Your evidence, your exports and the resulting firm-memory dataset belong to your firm, and leave with you.',
          ],
        },
      ],
    },

    finalCta: {
      eyebrow: 'Next step',
      title: 'Bring one mandate your team is about to launch.',
      body: 'Not a procurement process — one real search, four weeks, and a measured baseline taken from your own last comparable mandate. If the map is not defensible, you will know inside a month.',
      primaryCta: 'Apply with one live mandate',
      secondaryCta: 'Explore the synthetic demo',
    },
  },

  demo: {
    eyebrow: 'Synthetic demo',
    title: 'See how a search brief becomes an evidence-backed plan.',
    lede: 'Follow a fictional Group COO assignment from the signed client brief to a client-ready calibration pack and CRM export. Every company, requirement and number below is invented for this walkthrough.',
    syntheticNotice:
      'Synthetic scenario. All companies are fictional, no real personal data appears anywhere on this page, and nothing here calls an external service.',
    stepLabel: 'Step',
    ofLabel: 'of',
    prev: 'Previous',
    next: 'Next',
    showAll: 'Show all steps',
    stepNav: 'Demo steps',
    steps: [
      {
        id: 'upload',
        title: 'Upload the signed mandate',
        body: 'The brief arrives as the document the client actually signed. It stays the reference point: every extracted criterion keeps a pointer back to the clause it came from.',
        stamp: 'Brief received · source locked',
        systemWork: 'Register the source file, preserve its version and prepare the document for clause-level extraction.',
        humanDecision: 'Confirm that this is the controlling brief and that the right client restrictions are attached.',
      },
      {
        id: 'requirements',
        title: 'Review the extracted requirements',
        body: 'Role, market, sector, seniority and evidence criteria are proposed for review. Ambiguity is surfaced as an open question instead of being resolved silently.',
        stamp: 'Awaiting human approval',
        systemWork: 'Structure the brief into searchable criteria and link every proposed requirement back to its source wording.',
        humanDecision: 'Approve, edit or reject each criterion and decide which ambiguities must go back to the client.',
      },
      {
        id: 'universe',
        title: 'Explore the target-company landscape',
        body: 'Company hypotheses are grouped into segments, each with the reason it qualified and the source behind it. Depth of evidence is visible, so a thinly supported cluster looks thin.',
        stamp: 'Hypotheses proposed',
        systemWork: 'Combine approved sources with firm knowledge to propose companies, segments and reasons for inclusion.',
        humanDecision: 'Set the true market boundary and decide which adjacent segments deserve coverage.',
      },
      {
        id: 'research',
        title: 'Inspect the research queue',
        body: 'Each approved company becomes a research task pointed at a role, not a person. The queue says where to look and why — it never ranks anyone.',
        stamp: 'Queue built · no ranking',
        systemWork: 'Turn approved company hypotheses into traceable research tasks with a role focus and a reason to investigate.',
        humanDecision: 'Choose the research order, identify likely relationship owners and judge any people the team later finds.',
      },
      {
        id: 'resolve',
        title: 'Resolve duplicates, off-limits and uncertainty',
        body: 'Duplicates against your CRM export, client off-limits rules and genuinely uncertain entries are held back for a decision rather than quietly included or dropped.',
        stamp: 'Decisions recorded',
        systemWork: 'Surface conflicting records, restrictions and weak evidence with the underlying reason attached.',
        humanDecision: 'Merge or separate records, apply the client’s boundaries and decide what remains unresolved.',
      },
      {
        id: 'pack',
        title: 'Generate the client calibration pack',
        body: 'The map, the reasoning, the coverage so far and the open questions become one document your consultant can defend line by line in the calibration meeting.',
        stamp: 'Approved for client',
        systemWork: 'Assemble the approved map, evidence, exclusions, coverage and questions into a consistent client document.',
        humanDecision: 'Approve the narrative, challenge the market boundary and own every recommendation in the client meeting.',
      },
      {
        id: 'export',
        title: 'Return approved records to your CRM',
        body: 'Approved companies, research tasks and decisions leave as a CSV your existing system can ingest. The search record stays where your firm keeps it.',
        stamp: 'Export prepared',
        systemWork: 'Package only approved records with stable IDs, decision states and mandate references for export.',
        humanDecision: 'Approve what enters the system of record and retain the reusable research memory for future assignments.',
      },
    ],
    overviewTitle: 'The case at a glance',
    overviewLede:
      'This is not a generic dashboard tour. It follows one assignment and shows the input, the work Talenomix prepares, the human checkpoints and the records that leave the workspace.',
    overviewStats: [
      {
        value: '4',
        label: 'Nordic markets',
        detail: 'Sweden, Denmark, Norway and Finland',
      },
      {
        value: '12',
        label: 'Target-company hypotheses',
        detail: 'Across six fictional market segments',
      },
      {
        value: '8',
        label: 'Role-based research tasks',
        detail: 'No people scored or ranked',
      },
      {
        value: '3',
        label: 'Decisions held for review',
        detail: 'Duplicate, off-limits and uncertain fit',
      },
    ],
    systemLabel: 'Talenomix prepares',
    humanLabel: 'Your team decides',
    intakeTitle: 'Source file and intake record',
    intakeItems: [
      { label: 'File', body: 'Nordvik_Group_COO_Mandate_v3.docx' },
      { label: 'Version', body: 'Client-signed · v3 · read-only source' },
      { label: 'Received', body: '25 July 2026 · synthetic scenario' },
      { label: 'Traceability', body: 'Clause references preserved for every extracted criterion' },
    ],
    intakeStats: [
      { value: '19', label: 'Pages' },
      { value: '7', label: 'Criteria proposed' },
      { value: '3', label: 'Open questions' },
      { value: '1', label: 'Approval gate' },
    ],
    mandateTitle: 'Extracted mandate',
    fields: {
      role: 'Role',
      client: 'Client',
      sector: 'Sector',
      markets: 'Markets',
      reportsTo: 'Reports to',
      mustHave: 'Must have',
      niceToHave: 'Preferred',
      exclusions: 'Exclusions',
      openQuestions: 'Open questions for the client',
      approval: 'Approval',
    },
    approvalPending: 'Pending — no downstream step runs until a named person approves',
    approvalGranted: 'Approved by Head of Research (role, not a person, in this synthetic scenario)',
    universeTitle: 'Target-company universe',
    universeLede:
      'Twelve fictional companies, grouped by segment. Evidence depth is how much sourced material supports the company being in scope at all.',
    universeStats: [
      { value: '12', label: 'Companies mapped' },
      { value: '6', label: 'Market segments' },
      { value: '4', label: 'Nordic markets' },
      { value: '4', label: 'Coverage states' },
    ],
    filterLabel: 'Filter by state',
    filterAll: 'All states',
    tableHeads: {
      company: 'Company',
      country: 'Market',
      segment: 'Segment',
      rationale: 'Why it qualified',
      state: 'State',
      depth: 'Evidence',
      roleFocus: 'Role focus',
      reason: 'Reason to research',
      openQuestion: 'Open question',
    },
    researchTitle: 'Research queue',
    researchLede:
      'Tasks point at a role inside a company. Who currently holds that role is something your researchers establish and your consultants judge.',
    researchStats: [
      { value: '8', label: 'Research tasks' },
      { value: '6', label: 'Ready to investigate' },
      { value: '2', label: 'Blocked for review' },
      { value: '0', label: 'People ranked' },
    ],
    noPersonNote:
      'No individual is named anywhere in this queue — by design, not because the demo is redacted.',
    resolveTitle: 'Held for a decision',
    resolveLede:
      'Three entries could not be resolved automatically. Each one waits for a person, with the reason stated plainly.',
    resolveItems: [
      {
        code: 'DUP-02',
        issue: 'Possible duplicate',
        detail:
          'Two records resolve to the same fictional group: one from the new universe, one already in the CRM export under a former trading name.',
        decision: 'Merge, keeping the CRM record as primary — or keep both if the entities genuinely differ.',
      },
      {
        code: 'OFL-01',
        issue: 'Client off-limits',
        detail:
          'The client supplied an off-limits rule covering one subsidiary. The parent group is not restricted, so the boundary needs stating.',
        decision: 'Exclude the subsidiary, keep the parent in scope, and record the rule against both.',
      },
      {
        code: 'UNC-04',
        issue: 'Uncertain fit',
        detail:
          'Segment classification rests on a single source page with no date. It may belong in scope; the evidence does not yet support saying so.',
        decision: 'Leave unresolved and raise it as a calibration question with the client.',
      },
    ],
    packTitle: 'Client calibration pack',
    packLede:
      'The artefact the consultant defends in front of the client. It is deliberately arguable — every section can be challenged and traced.',
    packVersion: 'Draft 0.4 · prepared for human approval',
    packQuestionsTitle: 'Questions carried into calibration',
    packContents: [
      'Normalized mandate, with each criterion linked to the clause it came from',
      'Target-company map by segment, with evidence depth shown',
      'What was excluded, and the reason for each exclusion',
      'Coverage so far, stated as a proportion and not as a claim',
      'Open questions the client needs to answer before research continues',
      'The off-limits rules applied, and who supplied them',
    ],
    exportTitle: 'What returns to your CRM',
    exportLede:
      'A flat file, deliberately boring, containing only approved records and the decisions attached to them.',
    exportFlowLabel: 'Export path',
    exportFlow: [
      'Approved Talenomix records',
      'Reviewable CSV export',
      'Your existing CRM',
    ],
    exportStats: [
      { value: '6', label: 'Included companies' },
      { value: '2', label: 'Recorded exclusions' },
      { value: '8', label: 'Research tasks retained' },
      { value: '1', label: 'Reusable mandate record' },
    ],
    exportNote:
      'CSV is what exists today. Native integrations are built after pilots decide which systems matter — this demo does not imply a live connection to any product.',
    coverageTitle: 'Coverage after step five',
    ctaTitle: 'Apply with one live mandate',
    ctaBody:
      'The synthetic scenario shows the structure. The interesting question is what happens when it meets a mandate your team is actually about to launch.',
    cta: 'Apply with one live mandate',
    noJsNote:
      'This walkthrough is written to be read straight through. With JavaScript enabled the same steps become navigable one at a time; without it, nothing is hidden.',
  },

  market: {
    eyebrow: 'Nordic market evidence',
    title: 'A benchmark that shows the evidence—and the gaps.',
    lede:
      'The honest first release is not a made-up Nordic total. It is a sourced Finnish market anchor, the official registry frame used in every country, and a visible record of which country totals are still being reviewed.',
    caveatTitle: 'Read the figure and its basis together.',
    caveatBody:
      'The published Finnish numbers come from a public industry compilation, not an official registry classification. “Not published” means the reviewed frame is not ready; it does not mean the market is empty.',
    metricsTitle: 'Published Finnish market anchor',
    coverageTitle: 'Nordic coverage matrix',
    coverageLede:
      'Official registries establish legal entities and filed figures. Industry classification still requires evidence and human review.',
    tableHeads: {
      country: 'Country',
      frame: 'Research frame',
      publishedCount: 'Published firm count',
      status: 'Status',
      source: 'Source',
    },
    notPublished: 'Not published',
    sourceNote:
      'Every figure above is represented as data with a source ID, retrieval date, basis and confidence grade. Small private cells are suppressed before any aggregate can cross into this repository.',
    methodCta: 'Read the evidence method',
  },

  segments: {
    executive: {
      eyebrow: 'For established search firms',
      title: 'Make your firm’s market knowledge reusable across mandates.',
      lede:
        'Talenomix sits above the systems you already use. It turns a live brief, prior research and trusted market data into one reviewable launch plan.',
      signalTitle: 'What usually creates drag',
      signals: [
        'Target universes rebuilt even when similar work already exists',
        'Off-limits rules and relationship knowledge scattered across systems',
        'Client-calibration packs assembled manually from several sources',
      ],
      outcomeTitle: 'What the diagnostic produces',
      outcomes: [
        'A normalized mandate and explicit open questions',
        'A source-backed target-company universe and research queue',
        'A coverage report and reusable firm-memory dataset',
      ],
      ctaTitle: 'Start with one real mandate.',
      ctaBody:
        'The fixed-fee diagnostic is SEK 55,000 excluding VAT. Design partnerships remain scoped after discovery.',
      cta: 'See the diagnostic',
    },
    boutique: {
      eyebrow: 'For boutique search firms',
      title: 'Add research leverage without adding a second operating system.',
      lede:
        'Small teams win through judgment and focus. Talenomix protects that advantage while making research assembly less dependent on one person remembering every prior search.',
      signalTitle: 'Where the constraint appears',
      signals: [
        'Partners spend senior time rebuilding company lists and slides',
        'Research quality varies with workload and individual memory',
        'A CRM exists, but launch logic lives in documents and spreadsheets',
      ],
      outcomeTitle: 'What changes',
      outcomes: [
        'The brief becomes a shared, approved research contract',
        'Every inclusion, exclusion and unknown has a reason',
        'The final pack is reusable rather than a one-off document',
      ],
      ctaTitle: 'Buy a bounded diagnostic, not a transformation programme.',
      ctaBody:
        'One mandate, one primary country frame, ten working days after complete inputs: SEK 55,000 excluding VAT.',
      cta: 'See the diagnostic',
    },
    research: {
      eyebrow: 'For research-led firms',
      title: 'Turn a strong research method into shared infrastructure.',
      lede:
        'Talenomix does not replace researchers. It makes their source trail, coverage decisions and unresolved questions visible enough to review, reuse and improve.',
      signalTitle: 'What sophisticated teams still fight',
      signals: [
        'Evidence depth disappears when a project is archived',
        'Handoffs flatten judgment into a company name and a status',
        'Coverage is hard to defend when sources and exclusions are separate',
      ],
      outcomeTitle: 'What becomes durable',
      outcomes: [
        'Source-linked company hypotheses rather than opaque fit scores',
        'Human checkpoints at brief, universe and calibration stages',
        'A dataset that can be reused without exposing candidate data',
      ],
      ctaTitle: 'Test the layer around your method.',
      ctaBody:
        'The diagnostic measures whether the evidence becomes clearer and more reusable. It makes no time-saving promise before the work is measured.',
      cta: 'See the diagnostic',
    },
  },

  method: {
    eyebrow: 'Method',
    title: 'How we know what we say we know.',
    lede: 'Talenomix sells evidence quality, which makes our own evidence handling fair game. This page states how the Nordic research universe is defined, how sources are collected and graded, and what we have not established yet.',
    sections: [
      {
        id: 'universe',
        title: 'Defining the research universe',
        body: [
          'The unit of study is every publicly discoverable firm, subsidiary or independent consultancy with a current office or sustained operating presence in Sweden, Denmark, Norway, Finland or Iceland that explicitly sells retained executive search, board search or an equivalent active-search service for senior leadership.',
          'We call the result the publicly discoverable Nordic universe. That is a narrower and more honest claim than saying every legal entity has been found, and the difference matters when a firm asks how complete a map really is.',
        ],
        list: [
          'Included: independent boutiques, Nordic offices of international firms, hybrid leadership-advisory firms where search is a material service, sector specialists, and firms combining search with board advisory, assessment or succession work.',
          'Excluded: contingent-only recruiters, staffing and temporary-labour agencies without a retained offering, job boards, candidate marketplaces, individual career coaches, internal talent teams, interim-only providers, and firms with no current Nordic presence.',
          'Excluded pending corroboration: dormant firms and broken sites with no other evidence of current activity.',
        ],
      },
      {
        id: 'discovery',
        title: 'Discovery sources',
        body: [
          'Association membership alone is not sufficient coverage, and we can show why: Sweden’s ESK accredits individual consultants rather than firms, while Finland has both a member association and a separate, broader commercial company listing. Any map built from one directory inherits that directory’s blind spot.',
          'So the universe is seeded and cross-checked from several directions at once: association and network directories, national company registries, local-language query matrices per country, current job advertisements, procurement awards, and search-firm client announcements.',
        ],
        list: [
          'Sweden: executive search, chefsrekrytering, ledarrekrytering, styrelserekrytering, headhunting, searchkonsult',
          'Denmark: executive search, lederrekruttering, bestyrelsesrekruttering, headhunting, direktionsrekruttering',
          'Norway: executive search, lederrekruttering, hodejeger, styrerekruttering, kandidatkartlegging',
          'Finland: suorahaku, johdon suorahaku, johtajahaku, headhunting, hallitushaku',
          'Iceland: executive search Iceland, stjórnendaleit, ráðningar stjórnenda, headhunting Reykjavík',
        ],
      },
      {
        id: 'collection',
        title: 'Collection rules',
        body: [
          'The research pipeline is deliberately constrained, and the constraints are the point. A market map assembled by breaking the terms of the sites it came from is not a defensible asset for anybody.',
        ],
        list: [
          'robots.txt, published terms and authentication boundaries are obeyed without exception.',
          'No logged-in scraping of professional networks, no CAPTCHA bypass, no collection from private profiles.',
          'Rate limited to one request per domain every two seconds, with at most four domains in flight.',
          'Every record keeps its fetched URL, retrieval time, page date, language, content hash and the visible passage that supports it.',
          'The original local-language passage is stored alongside its English paraphrase, so translation never silently becomes the evidence.',
          'Blocked, unavailable and excluded sources are logged as such rather than dropped.',
          'No personal emails, candidate records or contact datasets are ever committed to the public repository.',
        ],
      },
      {
        id: 'saturation',
        title: 'When discovery stops',
        body: [
          'Discovery stops on stated conditions rather than when it feels finished: every association and directory seed resolved, every firm deduplicated by domain, legal identity and office network, two consecutive country-level passes adding under 2% new qualified firms, the largest firms and international networks manually cross-checked, and every uncertain inclusion labelled rather than silently accepted.',
          'At least 10% of extracted records are checked by hand against their sources. Where a manual check disagrees with the pipeline, the pipeline is wrong until proven otherwise.',
        ],
      },
      {
        id: 'grading',
        title: 'How evidence is graded',
        body: [
          'Every observation carries a supporting passage, a source date and a confidence grade, plus an explicit flag separating what a firm stated from what a researcher inferred. A vendor describing its own product is recorded as a vendor claim and never promoted to an independent finding.',
        ],
      },
    ],
    gradesTitle: 'Confidence grades',
    grades: [
      {
        label: 'A',
        body: 'A dated, direct statement by the firm itself, retrievable at the cited URL.',
      },
      {
        label: 'B',
        body: 'A strong documentary proxy — a job requirement, procurement record or customer case that implies the practice.',
      },
      {
        label: 'C',
        body: 'A workflow inference from consistent public signals, stated as an inference.',
      },
      {
        label: 'D',
        body: 'A single weak or undated signal. Recorded so it can be re-checked, never used to support a public claim.',
      },
    ],
    ledgerTitle: 'Claim ledger',
    ledgerLede:
      'Every external claim made anywhere on this site, with its source, retrieval date and grade. The build fails if a claim loses its source.',
    unknownTitle: 'What we have not established',
    unknowns: [
      'How many hours a mandate launch actually costs a Nordic firm today. We have hypotheses and no measurements, and the first paid pilots exist to produce them.',
      'Whether the value concentrates in mandate launch, client reporting or firm-memory recovery. Those imply different products, and we would rather find out than assume.',
      'Which CRM matters most in this segment, and therefore which integration to build first.',
      'Whether firms will export CRM data at all under a pilot agreement. If they will not, the wedge does not work and we would rather learn that in month two than month twelve.',
      'What Nordic title and company-structure normalization genuinely requires beyond Swedish, which is the only market we have looked at closely so far.',
    ],
  },

  privacy: {
    eyebrow: 'Privacy',
    title: 'Privacy and data boundaries',
    lede: 'Two separate things are described here: what this website does, which is almost nothing, and what a Talenomix Mandate pilot would process, which is governed by a written agreement before it starts.',
    updated: 'Pre-launch statement · last reviewed 25 July 2026',
    sections: [
      {
        id: 'website',
        title: 'This website',
        body: [
          'This site is static files served from GitHub Pages. It sets no cookies, runs no analytics, embeds no third-party scripts, and loads no third-party fonts — Manrope and Newsreader are self-hosted from this domain for exactly that reason.',
          'There is no form on this site, so it collects nothing you type. The interactive demo runs entirely in your browser and makes no network calls at all.',
          'One thing we do not control: as the host, GitHub processes standard server request data, including your IP address, in order to serve the page. That is inherent to any hosted website, and we would rather state it than imply the site is invisible.',
        ],
      },
      {
        id: 'demo',
        title: 'The synthetic demo',
        body: [
          'Every company, requirement, number and decision in the demo is invented for the walkthrough. No real personal data appears in it, and by design the research queue points at roles rather than named individuals.',
          'The demo makes no external AI calls. Nothing you click is sent anywhere.',
        ],
      },
      {
        id: 'pilot',
        title: 'What a pilot would process',
        body: [
          'A design-partner pilot processes material your firm supplies — a signed brief, a CRM export, your off-limits and conflict rules — plus public and licensed company information. Some of that is personal data about executives, and it is treated as such.',
          'Before any of it moves, we document the processing role, purpose, legal basis, transparency method, retention rule and rights process for each category, and sign a data-processing agreement. Legitimate interest is not assumed simply because information happens to be public.',
        ],
        list: [
          'Your firm is the controller for its own candidate and client data. Talenomix acts as processor under written instructions.',
          'Retention and deletion are agreed before the pilot starts, not after it ends.',
          'Data stays within the EU/EEA, and any subprocessor is named to you in advance.',
          'Your evidence, your exports and the resulting firm-memory dataset belong to your firm and leave with you.',
          'We do not scrape authenticated networks, contact candidates, or publish contact datasets.',
        ],
      },
      {
        id: 'rights',
        title: 'Rights and contact',
        body: [
          'Where Talenomix processes personal data on a customer’s instruction, requests from data subjects are routed to that customer as controller, and we support them within the agreed timeframe.',
          'Before person-level prospect research or a live service starts, the controller identity, rights channel, Article 14 information and retention terms must be complete. This page states the current website and product boundaries; it is not a substitute for a customer-specific data-processing agreement.',
        ],
      },
    ],
  },

  notFound: {
    code: '404',
    title: 'This sheet is not in the atlas.',
    body: 'The page you asked for does not exist, or it moved while the site was being rebuilt. The routes below are the whole map.',
    links: 'Go to',
  },

  footer: {
    blurb:
      'Talenomix helps executive-search firms turn a client brief, firm knowledge and trusted market information into a clear, evidence-backed search plan — above the CRM, not instead of it.',
    productTitle: 'Product',
    companyTitle: 'This site',
    languageTitle: 'Language',
    rights: 'Talenomix. Pre-launch site.',
    disclaimer:
      'Talenomix provides research preparation and decision support for executive-search firms. It does not select candidates, does not guarantee a placement, and is not legal advice.',
  },
};
