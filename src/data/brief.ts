/**
 * Named account briefs.
 *
 * Kept out of the i18n Dictionary on purpose: a brief is a one-off sales
 * artefact for one firm, not site copy that both locales must carry.
 *
 * Rules for anything added here, in order of importance:
 *
 *   1. Every statement about the firm quotes their own published words and
 *      carries the URL and the date it was read. If it cannot be sourced, it is
 *      written as a question we would ask them, never as a finding.
 *   2. No personal names, no contact details, no inferred attributes about
 *      anyone. Briefs are addressed to a published role.
 *   3. The page is noindex, nofollow, noarchive and excluded from the sitemap.
 *      It is delivered as a link, not published.
 *
 * The brief is deliberately built with the same ledger discipline as the public
 * site: if we are selling research that can be checked, the sales document has
 * to be checkable too.
 */

export interface BriefQuote {
  /** Verbatim, short, and attributed. */
  readonly quote: string;
  readonly sourceId: string;
  /** What this tells us — our reading, labelled as ours. */
  readonly reading: string;
}

export interface BriefTension {
  readonly n: string;
  readonly title: string;
  readonly body: string;
}

export interface BriefContrast {
  readonly vendor: string;
  readonly claimId: string;
  readonly conflict: string;
}

export interface BriefStep {
  readonly n: string;
  readonly title: string;
  readonly body: string;
  readonly stamp: string;
}

export interface AccountBrief {
  readonly slug: string;
  readonly firm: string;
  readonly addressedTo: string;
  readonly preparedOn: string;
  readonly status: string;
  readonly eyebrow: string;
  readonly headline: string;
  readonly standfirst: string;
  readonly quotesTitle: string;
  readonly quotesLede: string;
  readonly quotes: readonly BriefQuote[];
  readonly tensionTitle: string;
  readonly tensionLede: string;
  readonly tensions: readonly BriefTension[];
  readonly contrastTitle: string;
  readonly contrastLede: string;
  readonly contrasts: readonly BriefContrast[];
  readonly contrastClose: string;
  readonly fitTitle: string;
  readonly fitLede: string;
  readonly fitPoints: readonly { readonly label: string; readonly body: string }[];
  readonly runTitle: string;
  readonly runLede: string;
  readonly runSteps: readonly BriefStep[];
  readonly unknownTitle: string;
  readonly unknownLede: string;
  readonly unknowns: readonly string[];
  readonly askTitle: string;
  readonly askBody: string;
  readonly askPoints: readonly string[];
  readonly askNote: string;
}

export const HENRISON_BRIEF: AccountBrief = {
  slug: 'henrison',
  firm: 'Henrison',
  addressedTo: 'Prepared for: Senior Research Consultant',
  preparedOn: '2026-07-26',
  status: 'Account brief · unlisted · not indexed',

  eyebrow: 'Account brief · Henrison',
  headline: 'You already sell the thing we protect.',
  standfirst:
    'Henrison’s public position is that research should be human. Every research tool sold into your category argues the opposite. This brief sets out what you publish, the tension we think it creates, and the one thing we would build with you — using only your own words and sources you can check.',

  quotesTitle: 'What you publish',
  quotesLede:
    'Three statements from your own site, quoted verbatim with the date we read them. Everything downstream in this brief rests on these and nothing else.',
  quotes: [
    {
      quote: 'In a digital workplace, we prioritize human-powered research — curated and powered by humans, not code.',
      sourceId: 'henrison-human-not-code',
      reading:
        'A stated position, not a hedge. It rules out the entire category of tools that rank or shortlist people automatically.',
    },
    {
      quote: 'map the entire talent landscape',
      sourceId: 'henrison-coverage-promise',
      reading:
        'A coverage promise. Coverage is the one claim a client can actually test you on — and the hardest to evidence after the fact.',
    },
    {
      quote:
        'recruitment research or sourcing — typically forms the first phase of any executive search',
      sourceId: 'henrison-coverage-promise',
      reading:
        'Your product is the launch phase of someone else’s search. That is precisely the phase we work on, and nothing beyond it.',
    },
  ],

  tensionTitle: 'The tension we think you carry',
  tensionLede:
    'We have not seen inside your process, so this is a hypothesis, not a finding. It is the thing we would want to test in the first week — and if it is wrong, that is a short and useful conversation.',
  tensions: [
    {
      n: '01',
      title: 'Coverage is your promise and your exposure',
      body: 'You sell to hiring managers, TA teams and executive-search consultants. The last group are professionals who know what a thin map looks like. When one of them asks which part of the landscape you covered and which you set aside, the answer has to be reconstructable months later — not remembered.',
    },
    {
      n: '02',
      title: 'Your cost base is researcher hours',
      body: 'For a search firm, research assembly is overhead. For a research house it is cost of goods sold. Every hour spent rebuilding a segment map that someone already built is margin, not just inconvenience.',
    },
    {
      n: '03',
      title: 'The knowledge leaves the building with the consultant',
      body: 'A small senior team is a strength in the work and a concentration risk in the record. Why a segment was covered one way in March is in a person, not in a system you can hand to the next assignment.',
    },
  ],

  contrastTitle: 'Why the obvious tools make this worse for you',
  contrastLede:
    'These are the vendors’ own words, from our published claim ledger. We record them as vendor claims — we have not tested the products — but the positioning is not ambiguous.',
  contrasts: [
    {
      vendor: 'Clockwork',
      claimId: 'clockwork-ai-longlist',
      conflict:
        'Sells the speed of an AI-generated longlist. Adopting it would contradict the sentence on your own about page.',
    },
    {
      vendor: 'Thrive TRM',
      claimId: 'thrive-stack-rank',
      conflict:
        'Advertises the ability to stack rank candidates. Ranking people by machine is the specific thing your positioning rejects.',
    },
  ],
  contrastClose:
    'So the category offers you a choice between a tool that undercuts your stated position and no tool at all. We think that is a false choice, and it is the reason this brief exists.',

  fitTitle: 'What Talenomix does — and refuses to do',
  fitLede:
    'The product line maps one-to-one onto the position you have already taken publicly. That is not a coincidence we engineered for this brief; it is why we thought you were worth writing to.',
  fitPoints: [
    {
      label: 'Never ranks, scores or shortlists a person',
      body: 'No suitability model, no fit inference, no ordered list of humans. The research queue points at a role inside a company, and your consultant decides who and whether.',
    },
    {
      label: 'Makes coverage reconstructable',
      body: 'Included, excluded, unresolved and needs-review are explicit states with a reason and a source attached. The answer to “what did you cover?” becomes a document, not a memory.',
    },
    {
      label: 'Reuses what you already established',
      body: 'A segment you mapped last year comes back with its reasoning attached instead of being rebuilt from zero on the next assignment.',
    },
    {
      label: 'Leaves your systems alone',
      body: 'CSV in, CSV out. Whatever you keep records in stays where it is; we work on the assembly between the brief and an approved plan.',
    },
  ],

  runTitle: 'What one assignment would look like',
  runLede:
    'Four weeks, one live assignment of your choosing, with a baseline taken in week one from your own last comparable piece of work.',
  runSteps: [
    {
      n: '01',
      title: 'Baseline the assignment you are about to start',
      body: 'We measure how long the launch phase actually takes you today — researcher hours from brief to an agreed map. Your number, not ours.',
      stamp: 'Week 1 · measured, not estimated',
    },
    {
      n: '02',
      title: 'Build the map with sources attached',
      body: 'Target companies grouped by segment, each with the reason it qualified and the page that supports it. Your researcher approves or rejects every one.',
      stamp: 'Week 2 · human approval at every gate',
    },
    {
      n: '03',
      title: 'Record what was set aside, and why',
      body: 'Exclusions become a stated position with a reason, so the coverage argument survives the assignment and can be handed to your client.',
      stamp: 'Week 3 · exclusions on the record',
    },
    {
      n: '04',
      title: 'Hand back the pack and the measurement',
      body: 'A client-ready coverage document, the approved records as a flat file, and the before/after numbers — reported whichever way they land.',
      stamp: 'Week 4 · result reported either way',
    },
  ],

  unknownTitle: 'What we do not know about you',
  unknownLede:
    'Written down so you can see the shape of our ignorance. A brief that pretends to know these things is a brief you should not trust.',
  unknowns: [
    'How many assignments you run in a year, and how many need a fresh segment map.',
    'Where your research records actually live, and whether an export is something you would ever agree to.',
    'Whether the coverage question comes from your search-firm clients or is mostly internal discipline.',
    'What your split is between Sweden and Norway by volume — our own Norwegian registry frame is resolved, our Swedish one is still waiting on API access.',
    'Whether “human-powered” is a marketing position or a genuine operating constraint. Those need different conversations.',
  ],

  askTitle: 'The ask',
  askBody:
    'Thirty minutes, and if the hypothesis above is wrong, tell us where. We would rather be corrected early than be agreed with politely.',
  askPoints: [
    'One live assignment, four weeks, always paid — there is no free pilot.',
    'Roughly four hours of your researchers’ time across the whole engagement.',
    'You keep every judgment, every candidate decision and every relationship.',
    'No placement guarantee, and no claim to have measured a time saving before we have.',
  ],
  askNote:
    'This page is unlisted, not indexed and not linked from anywhere on our site. It was written for one firm. If any quotation above misrepresents you, tell us and we will correct it or take it down.',
};
