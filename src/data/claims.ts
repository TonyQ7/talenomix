/**
 * The claim ledger.
 *
 * Every external claim the site makes lives here with the source that backs it.
 * Each URL below was retrieved and read on the stated date; the passages are what
 * those pages actually say, not what we would prefer them to say.
 *
 * `vendorClaim: true` means the source is a company describing its own software.
 * That is recorded as a vendor claim and is never promoted to an independent
 * finding — the distinction is the whole point of publishing this table.
 *
 * scripts/verify-claims.mjs fails the build if a claim loses its source, its
 * retrieval date or its bilingual text.
 */

import type { Claim } from '~/types/domain';

const RETRIEVED = '2026-07-25';

export const CLAIMS: readonly Claim[] = [
  {
    id: 'clockwork-ai-longlist',
    text: {
      en: 'Clockwork advertises AI that generates research strategies, sources talent, rates pipelines and delivers qualified longlists “in under 10 minutes”, alongside candidate rating against built-in benchmark criteria, target-list automation and a client portal.',
      sv: 'Clockwork marknadsför AI som tar fram researchstrategier, hittar kandidater, betygsätter pipelines och levererar kvalificerade longlists ”på under 10 minuter”, jämte kandidatbetyg mot inbyggda benchmarkkriterier, automatiserade mållistor och en kundportal.',
    },
    source: {
      id: 'src-clockwork',
      url: 'https://www.clockworkrecruiting.com/product-tour-clockwork-executive-search-software',
      publisher: 'Clockwork Recruiting',
      retrievedOn: RETRIEVED,
      kind: 'vendor-claim',
      language: 'en',
      passage:
        'Rate Candidates With Built-In Benchmark Criteria … all with A.I. in under 10 minutes.',
    },
    confidence: 'A',
    vendorClaim: true,
  },
  {
    id: 'cluen-encore-mapping',
    text: {
      en: 'Cluen’s Encore advertises “hidden market” mapping of board seats, referrals and investments, AI-driven candidate intelligence, and client-ready reporting generated “in seconds”.',
      sv: 'Cluens Encore marknadsför kartläggning av den ”dolda marknaden” – styrelseuppdrag, referenser och investeringar – AI-driven kandidatanalys och kundfärdig rapportering framtagen ”på sekunder”.',
    },
    source: {
      id: 'src-cluen',
      url: 'https://www.cluen.com/executive-search-firms',
      publisher: 'Cluen (Encore)',
      retrievedOn: RETRIEVED,
      kind: 'vendor-claim',
      language: 'en',
      passage:
        'Map board seats, referrals, and investments to reveal introductions others will never find.',
    },
    confidence: 'A',
    vendorClaim: true,
  },
  {
    id: 'thrive-stack-rank',
    text: {
      en: 'Thrive TRM advertises relationship mapping, compensation benchmarks, recycling of prior research, and the ability to “assess and stack rank candidates”.',
      sv: 'Thrive TRM marknadsför relationskartläggning, lönebenchmark, återanvändning av tidigare research och möjligheten att ”assess and stack rank candidates”.',
    },
    source: {
      id: 'src-thrive',
      url: 'https://thrivetrm.com/',
      publisher: 'Thrive TRM',
      retrievedOn: RETRIEVED,
      kind: 'vendor-claim',
      language: 'en',
      passage: 'Assess and stack rank candidates.',
    },
    confidence: 'A',
    vendorClaim: true,
  },
  {
    id: 'esk-individual-level',
    text: {
      en: 'Sweden’s ESK accredits individual consultants rather than firms — its own wording is that the authorisation applies at the individual level. A firm-level map built from ESK alone would therefore be incomplete by construction.',
      sv: 'Svenska ESK auktoriserar enskilda konsulter snarare än byråer – deras egen formulering är att auktorisationen gäller på individnivå. En karta på byrånivå byggd enbart på ESK blir därför ofullständig redan av konstruktion.',
    },
    source: {
      id: 'src-esk',
      url: 'https://www.esk.se/',
      publisher: 'ESK — Föreningen Executive Search Konsulter',
      retrievedOn: RETRIEVED,
      kind: 'association-directory',
      language: 'sv',
      passage: 'Auktorisationen gäller på individnivå.',
      paraphrase: 'The authorisation applies at the individual level.',
    },
    confidence: 'A',
    vendorClaim: false,
  },
  {
    id: 'fex-association',
    text: {
      en: 'Finland has a national industry association, FEX — Finnish Executive Search Firms — formed by established executive-search firms, with a members section.',
      sv: 'Finland har en nationell branschförening, FEX — Finnish Executive Search Firms — bildad av etablerade sökbyråer, med en medlemsförteckning.',
    },
    source: {
      id: 'src-fex',
      url: 'https://www.fex.fi/en/',
      publisher: 'FEX — Finnish Executive Search Firms',
      retrievedOn: RETRIEVED,
      kind: 'association-directory',
      language: 'en',
      passage:
        'FEX – Finnish Executive Search Firms is a national industry association formed by well-known and reputable executive search firms.',
    },
    confidence: 'A',
    vendorClaim: false,
  },
  {
    id: 'fi-market-compilation',
    text: {
      en: 'A publicly compiled Finnish directory lists 151 firms selling executive search, of which 49 do so exclusively, and puts the 2023 Finnish executive-search market at €99 million, down 4% year on year. The compiler states the data is gathered from public sources.',
      sv: 'En publikt sammanställd finsk förteckning listar 151 bolag som säljer suorahaku, varav 49 gör det uteslutande, och anger den finska suorahaku-marknaden 2023 till 99 miljoner euro, ned 4 % mot året innan. Sammanställaren anger att uppgifterna är hämtade från offentliga källor.',
    },
    source: {
      id: 'src-suorahaku',
      url: 'https://suorahakuyritykset.fi/',
      publisher: 'suorahakuyritykset.fi',
      retrievedOn: RETRIEVED,
      publishedOn: '2024',
      kind: 'public-compilation',
      language: 'fi',
      passage: 'Listan yritystiedot on kerätty julkisista lähteistä.',
      paraphrase: 'The company data in the list has been gathered from public sources.',
    },
    confidence: 'B',
    vendorClaim: false,
  },
  {
    id: 'aesc-interim-directory',
    text: {
      en: 'The AESC member-firm directory is currently an interim alphabetical listing with no country or location filter — the page states an enhanced directory is still being built. Association directories therefore cannot be relied on alone to enumerate Nordic firms.',
      sv: 'AESC:s medlemsförteckning är för närvarande en tillfällig alfabetisk lista utan filter för land eller ort – sidan anger att en förbättrad katalog fortfarande byggs. Branschregister räcker därför inte i sig för att räkna upp nordiska byråer.',
    },
    source: {
      id: 'src-aesc',
      url: 'https://www.aesc.org/membership/aesc-member-firms/',
      publisher: 'AESC — Association of Executive Search and Leadership Consultants',
      retrievedOn: RETRIEVED,
      kind: 'association-directory',
      language: 'en',
      passage:
        'We are currently building an enhanced Member firm directory. While that work is underway, use this interim page to explore AESC Member firms around the world.',
    },
    confidence: 'A',
    vendorClaim: false,
  },
  {
    id: 'ai-act-high-risk',
    text: {
      en: 'The EU AI Act (Regulation (EU) 2024/1689) treats certain AI used in employment, worker management and access to self-employment as high-risk, which is why v1 stays out of candidate ranking and selection.',
      sv: 'EU:s AI-förordning (förordning (EU) 2024/1689) behandlar viss AI inom anställning, personalförvaltning och tillträde till egenföretagande som högrisk, vilket är skälet till att v1 håller sig utanför rankning och urval av kandidater.',
    },
    source: {
      id: 'src-ai-act',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex%3A32024R1689',
      publisher: 'EUR-Lex — Official Journal of the European Union',
      retrievedOn: RETRIEVED,
      publishedOn: '2024-06-13',
      kind: 'regulation',
      language: 'en',
    },
    confidence: 'A',
    vendorClaim: false,
  },
  {
    id: 'edpb-legal-basis',
    text: {
      en: 'EDPB guidance states controllers must rely on a legal basis to process personal data lawfully, and that legitimate interest requires weighing that interest against the rights and freedoms of the individuals concerned. Public availability is not by itself a legal basis.',
      sv: 'EDPB:s vägledning anger att personuppgiftsansvariga måste stödja sig på en rättslig grund för laglig behandling, och att berättigat intresse kräver en avvägning mot de berörda personernas rättigheter och friheter. Att uppgifter är offentliga utgör inte i sig en rättslig grund.',
    },
    source: {
      id: 'src-edpb',
      url: 'https://www.edpb.europa.eu/sme/be-compliant/process-personal-data-lawfully_en',
      publisher: 'European Data Protection Board',
      retrievedOn: RETRIEVED,
      kind: 'regulation',
      language: 'en',
      passage:
        'Data controllers need to rely on a “legal basis” in order to process personal data lawfully.',
    },
    confidence: 'A',
    vendorClaim: false,
  },
  {
    id: 'talenomics-name-risk',
    text: {
      en: 'An active Singapore firm trades as Talenomics (EA Licence 19C9823), placing permanent and contract roles including C-suite positions and offering HR advisory and market research. The name similarity is a live commercial risk, which is why Talenomix is presented here as a provisional working name.',
      sv: 'Ett aktivt bolag i Singapore verkar under namnet Talenomics (EA Licence 19C9823) och tillsätter tillsvidare- och kontraktsroller inklusive ledningspositioner samt erbjuder HR-rådgivning och marknadsanalys. Namnlikheten är en reell kommersiell risk, vilket är skälet till att Talenomix presenteras som ett preliminärt arbetsnamn.',
    },
    source: {
      id: 'src-talenomics',
      url: 'https://talenomics.com.sg/',
      publisher: 'Talenomics Pte Ltd (Singapore)',
      retrievedOn: RETRIEVED,
      kind: 'direct-statement',
      language: 'en',
    },
    confidence: 'A',
    vendorClaim: false,
  },
];

/** Claims shown in the compact homepage ledger. The full set lives on /method/. */
export const HOME_CLAIM_IDS: readonly string[] = [
  'clockwork-ai-longlist',
  'thrive-stack-rank',
  'esk-individual-level',
  'aesc-interim-directory',
  'ai-act-high-risk',
  'talenomics-name-risk',
];

export function homeClaims(): readonly Claim[] {
  return HOME_CLAIM_IDS.map((id) => CLAIMS.find((c) => c.id === id)).filter(
    (c): c is Claim => c !== undefined,
  );
}
