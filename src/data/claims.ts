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
    id: 'se-registry-source',
    text: {
      en: 'Bolagsverket provides free valuable company datasets via API, including organisation data, SNI activity codes and digitally filed annual reports; access requires issued API credentials.',
      sv: 'Bolagsverket tillhandahåller avgiftsfria värdefulla företagsdata via API, inklusive organisationsuppgifter, SNI-koder och digitalt inlämnade årsredovisningar; åtkomst kräver utfärdade API-uppgifter.',
    },
    source: {
      id: 'src-se-registry',
      url: 'https://bolagsverket.se/apierochoppnadata/hamtaforetagsinformation/vardefulladatamangder/apiforvardefulladatamangder.5513.html',
      publisher: 'Bolagsverket',
      retrievedOn: '2026-07-26',
      kind: 'official-statistics',
      language: 'sv',
      passage: 'Det kostar ingenting och det krävs inga avtal.',
      paraphrase: 'The API is free and requires no agreement.',
    },
    confidence: 'A',
    vendorClaim: false,
  },
  {
    id: 'no-frame-78100',
    text: {
      en: 'A query to the Norwegian Enhetsregister for NACE 78.100 (recruitment and provision of labour) returned 1,369 registered entities, of which 372 publish an employee count and 110 fall in the 5–49 band. 78.100 is a superset that also contains staffing and temporary-labour businesses, so this is a frame to be narrowed, not a count of executive-search firms.',
      sv: 'En förfrågan till norska Enhetsregisteret för NACE 78.100 (rekruttering og formidling av arbeidskraft) gav 1 369 registrerade enheter, varav 372 publicerar antal anställda och 110 ligger i spannet 5–49. 78.100 är en övermängd som också innehåller bemanning och personaluthyrning, så detta är en ram som ska smalnas av – inte ett antal sökbyråer.',
    },
    source: {
      id: 'src-no-frame',
      url: 'https://data.brreg.no/enhetsregisteret/api/enheter?naeringskode=78.100',
      publisher: 'Brønnøysundregistrene — Enhetsregisteret API',
      retrievedOn: '2026-07-26',
      kind: 'official-statistics',
      language: 'no',
    },
    confidence: 'A',
    vendorClaim: false,
  },
  {
    id: 'fi-frame-78100',
    text: {
      en: 'A query to the Finnish PRH/YTJ open company API for main business line 78100 returned 461 registered companies. As in Norway, the code covers recruitment and labour provision generally, so it bounds the search frame rather than identifying executive-search firms.',
      sv: 'En förfrågan till finska PRH/YTJ:s öppna företags-API för huvudverksamhet 78100 gav 461 registrerade bolag. Liksom i Norge omfattar koden rekrytering och personaluthyrning generellt, så den avgränsar sökramen snarare än identifierar sökbyråer.',
    },
    source: {
      id: 'src-fi-frame',
      url: 'https://avoindata.prh.fi/opendata-ytj-api/v3/companies?mainBusinessLine=78100',
      publisher: 'Finnish Patent and Registration Office — YTJ open data API',
      retrievedOn: '2026-07-26',
      kind: 'official-statistics',
      language: 'en',
    },
    confidence: 'A',
    vendorClaim: false,
  },
  {
    id: 'se-dk-access-pending',
    text: {
      en: 'Swedish and Danish registry endpoints returned authorisation errors on 26 July 2026 (Bolagsverket portal 403, Virk distribution 401). Both are documented as open data, but neither is queryable without credentials, so their frames are recorded as unresolved rather than estimated from directories.',
      sv: 'Svenska och danska registerslutpunkter returnerade behörighetsfel den 26 juli 2026 (Bolagsverkets portal 403, Virks distribution 401). Båda beskrivs som öppna data, men ingen går att fråga utan uppgifter, så deras ramar redovisas som olösta i stället för att skattas utifrån förteckningar.',
    },
    source: {
      id: 'src-se-dk-access',
      url: 'https://datacvr.virk.dk/artikel/system-til-system-adgang-til-cvr-data',
      publisher: 'Erhvervsstyrelsen — CVR system access',
      retrievedOn: '2026-07-26',
      kind: 'direct-statement',
      language: 'da',
    },
    confidence: 'A',
    vendorClaim: false,
  },
  {
    id: 'no-registry-source',
    text: {
      en: 'Brønnøysundregistrene publishes open APIs for Norwegian legal entities and key figures from filed annual accounts.',
      sv: 'Brønnøysundregistrene publicerar öppna API:er för norska juridiska personer och nyckeltal från inlämnade årsredovisningar.',
    },
    source: {
      id: 'src-no-registry',
      url: 'https://data.brreg.no/enhetsregisteret/api/dokumentasjon/en/index.html',
      publisher: 'Brønnøysundregistrene',
      retrievedOn: '2026-07-26',
      kind: 'official-statistics',
      language: 'en',
    },
    confidence: 'A',
    vendorClaim: false,
  },
  {
    id: 'dk-registry-source',
    text: {
      en: 'Virk provides the public Danish CVR company-information surface used for basic legal-entity checks; annual-report evidence is reviewed separately.',
      sv: 'Virk tillhandahåller den publika danska CVR-tjänsten som används för grundläggande kontroll av juridiska personer; årsredovisningar granskas separat.',
    },
    source: {
      id: 'src-dk-registry',
      url: 'https://datacvr.virk.dk/',
      publisher: 'Virk / Danish Business Authority',
      retrievedOn: '2026-07-26',
      kind: 'official-statistics',
      language: 'da',
      paraphrase: 'Public Danish CVR company-information service.',
    },
    confidence: 'B',
    vendorClaim: false,
  },
  {
    id: 'fi-registry-source',
    text: {
      en: 'The Finnish Patent and Registration Office publishes open company data for legal-entity lookup; market classifications on this site remain separate from the registry facts.',
      sv: 'Patent- och registerstyrelsen i Finland publicerar öppna företagsdata för kontroll av juridiska personer; marknadsklassificeringarna på den här webbplatsen hålls åtskilda från registerfakta.',
    },
    source: {
      id: 'src-fi-registry',
      url: 'https://www.prh.fi/en/companiesandorganisations/open_data.html',
      publisher: 'Finnish Patent and Registration Office (PRH)',
      retrievedOn: '2026-07-26',
      kind: 'official-statistics',
      language: 'en',
    },
    confidence: 'A',
    vendorClaim: false,
  },
  {
    id: 'is-coverage-source',
    text: {
      en: 'Iceland is maintained as a manually reviewed coverage frame because no comparable open official revenue feed has been established for this work.',
      sv: 'Island hålls som en manuellt granskad täckningsram eftersom någon jämförbar öppen officiell intäktskälla inte har fastställts för detta arbete.',
    },
    source: {
      id: 'src-is-registry',
      url: 'https://www.skatturinn.is/english/companies/',
      publisher: 'Iceland Revenue and Customs',
      retrievedOn: '2026-07-26',
      kind: 'official-statistics',
      language: 'en',
    },
    confidence: 'C',
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
  'fi-market-compilation',
];

export function homeClaims(): readonly Claim[] {
  return HOME_CLAIM_IDS.map((id) => CLAIMS.find((c) => c.id === id)).filter(
    (c): c is Claim => c !== undefined,
  );
}
