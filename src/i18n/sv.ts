import type { Dictionary } from './types';

/**
 * Swedish content.
 *
 * Sweden is the first sales market (PLAN.md section 4), so this is a full
 * translation rather than a machine pass over the English: search-industry terms
 * follow Swedish usage (uppdrag, målbolag, researchkö, kalibreringsunderlag) and
 * the reader is addressed as "ni".
 */
export const sv: Dictionary = {
  meta: {
    siteName: 'Talenomix',
    home: {
      title: 'Talenomix — uppdragsintelligens för nordisk executive search',
      description:
        'Talenomix Mandate omvandlar en påskriven uppdragsbeskrivning och byråns befintliga kunskap till en källbelagd målbolagskarta, en researchkö och ett kalibreringsunderlag – ovanpå ert CRM, inte i stället för det.',
    },
    demo: {
      title: 'Syntetisk uppdragsdemo — Talenomix',
      description:
        'Följ ett fiktivt COO-uppdrag från uppdragsbeskrivning till kalibreringsunderlag. Ingen inloggning, inga verkliga personer, inga externa anrop.',
    },
    method: {
      title: 'Metod och underlag — Talenomix',
      description:
        'Hur det nordiska researchuniversumet definieras, hur källor samlas in och graderas, och hela förteckningen över påståenden på webbplatsen.',
    },
    privacy: {
      title: 'Integritet och datagränser — Talenomix',
      description:
        'Vad den här webbplatsen samlar in, vad en pilot med Talenomix Mandate behandlar, och vilka gränser vi håller oss till.',
    },
    notFound: {
      title: 'Sidan finns inte — Talenomix',
      description: 'Den här sidan ingår inte i Talenomix webbplats.',
    },
  },

  ui: {
    skipToContent: 'Hoppa till innehåll',
    languageGroup: 'Språk',
    switchTo: 'Byt till',
    sheet: 'Blad',
    source: 'Källa',
    sources: 'Källor',
    retrieved: 'Hämtad',
    confidence: 'Tillförlitlighet',
    claim: 'Påstående',
    type: 'Typ',
    vendorClaimNote: 'Leverantörens egen beskrivning – noterad, inte oberoende verifierad.',
    opensNewTab: 'öppnas i ny flik',
    backToTop: 'Till toppen',
    syntheticBadge: 'Syntetisk',
    syntheticData: 'Syntetiska scenariodata. Inte ett resultat från ett verkligt uppdrag.',
    scrollTable: 'Tabellen kan bläddras i sidled',
  },

  nav: {
    product: 'Produkt',
    workflow: 'Arbetsflöde',
    demo: 'Demo',
    designPartners: 'Designpartner',
    evidence: 'Underlag',
    method: 'Metod',
    privacy: 'Integritet',
    home: 'Start',
  },

  brand: {
    name: 'Talenomix',
    product: 'Talenomix Mandate',
    descriptor: 'Uppdragsintelligens',
    provisionalNotice:
      'Talenomix är ett preliminärt arbetsnamn. Kontroll av firmanamn, varumärke och domän är inte avslutad, och ingenting på webbplatsen ska läsas som ett anspråk på ett godkänt varumärke.',
  },

  states: {
    included: 'Inkluderad',
    excluded: 'Exkluderad',
    unresolved: 'Oavgjord',
    'needs-review': 'Kräver granskning',
  },

  evidenceKinds: {
    'direct-statement': 'Direkt uppgift',
    'job-requirement': 'Platsannons',
    'customer-case': 'Kundcase',
    'workflow-proxy': 'Indirekt indikator',
    'vendor-claim': 'Leverantörspåstående',
    regulation: 'Regelverk',
    'association-directory': 'Branschregister',
    'official-statistics': 'Officiell statistik',
    'public-compilation': 'Publik sammanställning',
    inference: 'Slutsats',
  },

  home: {
    hero: {
      eyebrow: 'Uppdragsintelligens för nordisk executive search',
      headline: 'Starta varje sökuppdrag med en marknadskarta som håller.',
      body: 'Talenomix omvandlar uppdragsbeskrivningen och byråns befintliga kunskap till en källbelagd målbolagskarta, en researchkö och ett kalibreringsunderlag – utan att ersätta ert CRM eller automatisera bedömningen.',
      primaryCta: 'Ansök med ett skarpt uppdrag',
      secondaryCta: 'Utforska den syntetiska demon',
      mapTitle: 'Uppdragets sökuniversum',
      mapCaption:
        'Målbolagen bildar kluster. Konturdjupet visar hur mycket underlag som bär dem. Traversen går från påskriven uppdragsbeskrivning till godkänd täckning.',
      mapLegendTitle: 'Täckningslägen',
    },

    bottleneck: {
      eyebrow: 'Flaskhalsen vid uppdragsstart',
      title: 'Databasen var aldrig det svåra.',
      lede: 'Mellan en påskriven uppdragsbeskrivning och en godkänd sökstrategi ligger en veckas hopsättning: att läsa uppdraget till kriterier, bygga om ett målbolagsuniversum som någon redan byggde i fjol, och rekonstruera varför ett bolag en gång valdes bort.',
      items: [
        {
          label: 'Varje uppdrag börjar om från kartan',
          body: 'Målbolagsuniversumet byggs för hand vid varje sökuppdrag – även när byrån kartlade samma segment för arton månader sedan och redan betalat för svaret.',
        },
        {
          label: 'Resonemanget försvinner med researchern',
          body: 'Varför en del av marknaden täcktes och en annan valdes bort lever i samtalsanteckningar, en flik i ett kalkylark och en konsults minne.',
        },
        {
          label: 'Täckning påstås, den visas inte',
          body: 'Kunden frågar vad som faktiskt har täckts. Att svara ordentligt innebär att bygga upp argumentet från noll, under tidspress, i en presentation.',
        },
        {
          label: 'Off-limits är ett samtal, inte en kontroll',
          body: 'Restriktioner och relationer kontrolleras genom att fråga kollegor – vilket inte skalar över kontor, parallella uppdrag och flera års historik.',
        },
      ],
      note: 'Det här är hypoteser som Talenomix byggs för att pröva, inte uppmätta resultat. Vad researchen faktiskt visar publiceras med källor i Nordic Search Operations Benchmark.',
    },

    workflow: {
      eyebrow: 'Ett uppdrag in, en kalibrerad sökstrategi ut',
      title: 'Sju steg. Ett mänskligt beslut i slutet av vart och ett.',
      lede: 'Talenomix Mandate gör hopsättningsarbetet kring en uppdragsstart och lämnar tillbaka resultatet till de system och de människor som redan äger uppdraget.',
      inputLabel: 'Påskrivet uppdrag',
      outputLabel: 'Godkänd strategi, i ert CRM',
      steps: [
        {
          n: '01',
          title: 'Normalisera uppdraget',
          body: 'Roll, marknad, senioritet och krav på underlag extraheras ur den påskrivna beskrivningen och läggs fram för en människa innan något efterföljande steg körs. Oklarheter flaggas – de gissas inte.',
          stamp: 'Kriterier godkända',
        },
        {
          n: '02',
          title: 'Generera målbolagsuniversumet',
          body: 'Bolagshypoteser föreslås utifrån godkända publika, licensierade och kundlevererade källor – var och en med skälet till att den kvalificerade sig och sidan som stödjer det.',
          stamp: 'Skäl bifogade',
        },
        {
          n: '03',
          title: 'Stäm av mot det byrån redan vet',
          body: 'Er CRM-export matchas mot det nya universumet, så att tidigare research, tidigare samtal och avslutade uppdrag kommer fram i stället för att byggas om från noll.',
          stamp: 'Byråminne matchat',
        },
        {
          n: '04',
          title: 'Bygg researchkön',
          body: 'Varje godkänt bolag blir en researchuppgift med ett rollfokus och en källänk. En kö över var man ska leta – aldrig en rankad lista över människor.',
          stamp: 'Ingen rankning',
        },
        {
          n: '05',
          title: 'Dokumentera täckning, exkluderingar och öppna frågor',
          body: 'Inkluderad, exkluderad, oavgjord och kräver granskning är uttalade lägen med skäl. Off-limits och jävsflaggor kommer från er och förblir under er kontroll.',
          stamp: 'Luckor synliga',
        },
        {
          n: '06',
          title: 'Ta fram kalibreringsunderlaget',
          body: 'Ett dokument med er profil som konsulten tar med till kalibreringsmötet: kartan, resonemanget, täckningen hittills och de frågor kunden fortfarande behöver besvara.',
          stamp: 'Godkänt av människa',
        },
        {
          n: '07',
          title: 'Lämna tillbaka godkända poster',
          body: 'Godkända bolag, researchuppgifter och beslut exporteras tillbaka till det system byrån redan arbetar i. Dokumentationen av uppdraget förblir er.',
          stamp: 'CRM behålls',
        },
      ],
      note: 'Ingenting når en kund, och ingenting går tillbaka till ert CRM, utan ett namngivet mänskligt godkännande och en ändringslogg.',
    },

    demo: {
      eyebrow: 'Interaktiv demo',
      title: 'Följ ett fiktivt uppdrag hela vägen.',
      lede: 'Ett syntetiskt COO-uppdrag hos en fiktiv nordisk industrikoncern. Ingen inloggning, inga verkliga personer, inga externa anrop – hela scenariot ligger i sidan.',
      points: [
        'Sju steg, från inläst uppdragsbeskrivning till kalibreringsunderlag och CRM-export',
        'Fiktiva bolag rakt igenom; researchmålen är roller, aldrig namngivna personer',
        'Fullt läsbar som en statisk genomgång med JavaScript avstängt',
      ],
      cta: 'Utforska den syntetiska demon',
      note: 'Endast illustrativ. Demon visar hur produkten är uppbyggd, inte resultat från ett verkligt uppdrag.',
    },

    stack: {
      eyebrow: 'Fungerar ovanpå era befintliga system',
      title: 'Vi ligger ovanpå ert CRM. Vi ersätter det inte.',
      lede: 'Ert system of record ligger kvar där det ligger. Talenomix tar emot en export, gör hopsättningsarbetet kring uppdragsstarten och lämnar tillbaka godkända poster i ett format ni redan använder.',
      inputTitle: 'In',
      inputItems: [
        'Påskriven uppdragsbeskrivning – DOCX, PDF eller strukturerat formulär',
        'CRM-export – CSV',
        'Er off-limits- och jävslista',
        'Godkända publika och licensierade källor',
      ],
      coreTitle: 'Talenomix Mandate',
      coreItems: [
        'Normalisering av uppdraget',
        'Målbolagsuniversum',
        'Källbelagd researchkö',
        'Dokumenterad täckning och exkludering',
        'Kalibreringsunderlag för kund',
      ],
      outputTitle: 'Ut',
      outputItems: [
        'Kalibreringsunderlag redo för kund',
        'CSV med godkända bolag och researchuppgifter',
        'Rapport över täckning och öppna frågor',
        'Återanvändbart byråminne som datamängd',
      ],
      pullquote: 'Ett CRM dokumenterar slutsatserna. Det dyra är att komma fram till dem.',
      note: 'CSV först, medvetet. Native-integrationer byggs efter att piloterna avgjort vilka system som faktiskt spelar roll – vi marknadsför inte integrationer vi inte har byggt.',
    },

    human: {
      eyebrow: 'Det som förblir mänskligt',
      title: 'Bedömningen är inte den del vi automatiserar.',
      lede: 'Den första produkten förbereder research och visar sina källor. Den avgör inte vem som är lämplig, och den kontaktar ingen.',
      humanTitle: 'Era konsulter behåller',
      humanItems: [
        'Vilka bolag som faktiskt hör hemma i marknaden',
        'Vilka chefer som är värda ett samtal',
        'Vad kunden faktiskt behöver, till skillnad från vad beskrivningen säger',
        'Varje kontakt, varje samtal, varje relation',
        'Rådgivningen som får uppdraget i mål',
      ],
      neverTitle: 'Talenomix v1 gör inte',
      neverItems: [
        'Rankar, poängsätter eller gallrar chefer',
        'Drar slutsatser om personlighet, potential eller kulturell passform',
        'Kontaktar kandidater eller kör utskickssekvenser',
        'Rekommenderar en rekrytering',
        'Skrapar inloggade professionella nätverk',
      ],
      note: 'AI för rekrytering och urval kan falla inom EU:s AI-förordnings högrisk­kategori för anställning. Att hålla v1 till källbelagd researchförberedelse under mänsklig kontroll begränsar den exponeringen – det ersätter inte er egen juridiska bedömning.',
      noteLinkText: 'Förordning (EU) 2024/1689',
      noteLinkHref: 'https://eur-lex.europa.eu/legal-content/SV/TXT/?uri=celex%3A32024R1689',
    },

    partners: {
      eyebrow: 'Designpartner · Norden',
      title: 'Fyra veckor. Ett skarpt uppdrag. En marknadskarta och ett kalibreringsunderlag som håller.',
      lede: 'Vi tar in ett litet antal betalande designpartner, ett verkligt uppdrag var. Era konsulter behåller varje bedömning och varje relation; vi tar bort det repetitiva hopsättningsarbetet runt omkring.',
      termsTitle: 'Villkor',
      terms: [
        'Fyra veckor, ett skarpt uppdrag',
        'Alltid betalt – det finns ingen gratispilot',
        '50 % vid signering, 50 % vid leverans',
        'En CRM-export och högst två externa datakällor',
        'Ingen garanti om tillsättning eller kandidatsvar',
        'Ni ansvarar fortsatt för kandidatbeslut och kontakt',
      ],
      fitTitle: 'En bra matchning ser ut så här',
      fit: [
        '5–50 anställda, säljer retained executive search',
        'En synlig research- eller analysfunktion',
        'Nordiskt marknadsfokus och fler än en konsult eller praktik',
        'Ett CRM på plats, med synligt manuellt arbete runt omkring',
        'En managing partner eller operativ ansvarig som kan besluta',
      ],
      deliverablesTitle: 'Det ni får',
      deliverables: [
        'Normaliserat uppdrag och sökstrategi',
        'Godkänt målbolagsuniversum',
        'Researchkö med underlag',
        'Rapport över täckning och öppna frågor',
        'Kalibreringsunderlag redo för kund',
        'Återanvändbart byråminne som datamängd',
        'Mätning av arbetsflödet före och efter',
      ],
      metricTitle: 'Så bedöms det',
      metricBody:
        'Primärt mått: mediantid i researchtimmar från påskrivet uppdrag till kundgodkänd marknadskarta och kalibreringsunderlag. Vi tar nollmätningen vecka ett, från ert eget senaste jämförbara uppdrag, och redovisar utfallet åt vilket håll det än pekar.',
      applyTitle: 'Så ansöker ni',
      applyBody:
        'Ta med ett uppdrag ni står i begrepp att starta. Först en 30 minuters problemintervju, sedan 90 minuters observation av arbetsflödet, därefter ett avgränsat förslag. Ingenting signeras innan ni sett exakt vad de fyra veckorna innehåller.',
      applyStatus:
        'Status före lansering: ansökningsformulär och bokningsdestination håller på att konfigureras, och kontaktvägen publiceras när kontrollen av namn och firma är klar. Den här sidan samlar medvetet inte in era uppgifter ännu.',
      priceNote:
        'Omfattning och pris sätts per byrå efter ett första samtal, utifrån researchens omfattning, länder, användare, datakällor och integrationsarbete. Inget pris publiceras här, eftersom inget pris vore ärligt över hela det spannet.',
    },

    evidence: {
      eyebrow: 'Underlagsförteckning',
      title: 'Varje påstående här har en källa, annars är det märkt som hypotes.',
      lede: 'Talenomix är en produkt före pilot. Marknadspåståendena nedan har källor och hämtningsdatum. En leverantör som beskriver sin egen programvara noteras som just det – ett leverantörspåstående, inte ett oberoende fynd.',
      notClaimedTitle: 'Vad webbplatsen inte påstår',
      notClaimed: [
        'Inga kunder, inga genomförda piloter, inga partnerskap',
        'Ingen egen kandidatdatabas och inga egna kandidatdata',
        'Inget automatiserat urval, ingen poängsättning, ingen rankning',
        'Inga uppmätta tidsbesparingar – de siffrorna kommer ur de första betalda piloterna',
        'Inga integrationer i produktion; CSV är det som finns i dag',
        'Inget stöd eller godkännande från någon employer branding-, research- eller rådgivningsorganisation',
        'Inget godkänt varumärke – Talenomix är ett preliminärt arbetsnamn',
      ],
      cta: 'Läs hela metoden',
    },

    faq: {
      eyebrow: 'Frågor',
      title: 'Det partner frågar först.',
      items: [
        {
          q: 'Måste vi byta ut vårt CRM?',
          a: [
            'Nej. Talenomix läser en export och skriver en export. Invenias, Clockwork, Cluen, Thrive eller ett egenutvecklat system ligger kvar precis där de ligger.',
            'Piloten prövar medvetet bara det arbete som sker mellan en påskriven uppdragsbeskrivning och det ögonblick då ert CRM innehåller en godkänd, kundkalibrerad sökstrategi.',
          ],
        },
        {
          q: 'Skrapar ni LinkedIn?',
          a: [
            'Nej. Ingen inloggad skrapning av professionella nätverk, ingen CAPTCHA-kringgång och ingen insamling från privata profiler. Källorna är publika sidor, licensierade data och det ni själva tillhandahåller.',
            'LinkedIn är en viktig källa, men den innehåller inte er uppdragslogik, tidigare samtal, off-limits-regler eller resonemanget bakom varför ert team täckte en del av marknaden och valde bort en annan.',
          ],
        },
        {
          q: 'Hur hanteras personuppgifter?',
          a: [
            'Varje behandlingsändamål får en dokumenterad roll, rättslig grund, informationsmetod, gallringsregel och rutin för registrerades rättigheter innan en pilot startar. Att uppgifter är offentligt tillgängliga är inte i sig en rättslig grund.',
            'Ett personuppgiftsbiträdesavtal tecknas innan några kunddata flyttas, och integritetssidan beskriver de gränser vi håller oss till.',
          ],
        },
        {
          q: 'Är det här ett högrisk-AI-system enligt AI-förordningen?',
          a: [
            'Den bedömningen gör ni tillsammans med er jurist för er egen användning av vilket verktyg det än gäller. Vad vi kan säga är var v1 medvetet är avgränsad: researchförberedelse med en mänsklig godkännandegrind i varje steg.',
            'Den rankar, poängsätter eller väljer inte kandidater, och det är där högriskkraven för anställning koncentreras. Det begränsar exponeringen; det tar inte bort er skyldighet att göra bedömningen.',
          ],
        },
        {
          q: 'Vår process är vår egen. Ersätter ni den?',
          a: [
            'Tvärtom – det är precis det som ska förbli ert. Piloten fångar er metod: era kriterier, era exkluderingar, era kalibreringsbeslut, och gör dem återanvändbara i kommande uppdrag.',
            'Vi ersätter inte det era kunder betalar er för med en generisk Talenomix-metodik.',
          ],
        },
        {
          q: 'Kan AI bedöma seniora kandidater?',
          a: [
            'Vi håller med om att den inte kan det, och produkten försöker inte. Den strukturerar research, visar källor, identifierar luckor i täckningen och förbereder de underlag era konsulter fattar beslut utifrån.',
            'Om ett verktyg någonsin talar om vilken chef ni ska anställa är den intressanta frågan vilket underlag det dolde för att låta så säkert.',
          ],
        },
        {
          q: 'Vad kostar det?',
          a: [
            'Designpartnerskapet prissätts per byrå efter ett första samtal, utifrån researchens omfattning, länder, användare, datakällor och integrationsarbete. Det är alltid betalt – vi kör inga gratispiloter, eftersom en gratispilot inte är något bevis för att något är värt att köpa.',
          ],
        },
        {
          q: 'Vad händer med våra data efter piloten?',
          a: [
            'Lagring och gallring avtalas skriftligt innan piloten startar. Ert underlag, era exporter och det byråminne som blir resultatet tillhör er byrå och följer med er.',
          ],
        },
      ],
    },

    finalCta: {
      eyebrow: 'Nästa steg',
      title: 'Ta med ett uppdrag ni står i begrepp att starta.',
      body: 'Ingen upphandlingsprocess – ett verkligt sökuppdrag, fyra veckor och en nollmätning tagen från ert eget senaste jämförbara uppdrag. Håller inte kartan får ni veta det inom en månad.',
      primaryCta: 'Ansök med ett skarpt uppdrag',
      secondaryCta: 'Utforska den syntetiska demon',
    },
  },

  demo: {
    eyebrow: 'Syntetisk demo',
    title: 'Ett fiktivt uppdrag, från början till slut.',
    lede: 'Ett COO-uppdrag hos en fiktiv nordisk industrikoncern. Varje bolag, krav och siffra nedan är påhittad för den här genomgången.',
    syntheticNotice:
      'Syntetiskt scenario. Alla bolag är fiktiva, inga verkliga personuppgifter förekommer någonstans på sidan, och ingenting här anropar en extern tjänst.',
    stepLabel: 'Steg',
    ofLabel: 'av',
    prev: 'Föregående',
    next: 'Nästa',
    showAll: 'Visa alla steg',
    stepNav: 'Demons steg',
    steps: [
      {
        id: 'upload',
        title: 'Läs in det påskrivna uppdraget',
        body: 'Beskrivningen kommer in som det dokument kunden faktiskt skrev under. Det förblir referenspunkten: varje extraherat kriterium behåller en pekare tillbaka till den formulering det kom ifrån.',
        stamp: 'Uppdrag mottaget · källa låst',
      },
      {
        id: 'requirements',
        title: 'Granska de extraherade kraven',
        body: 'Roll, marknad, bransch, senioritet och krav på underlag läggs fram för granskning. Oklarheter lyfts som öppna frågor i stället för att avgöras i tysthet.',
        stamp: 'Väntar på mänskligt godkännande',
      },
      {
        id: 'universe',
        title: 'Utforska målbolagslandskapet',
        body: 'Bolagshypoteserna grupperas i segment, var och en med skälet till att den kvalificerade sig och källan bakom. Underlagets djup är synligt, så ett tunt underbyggt kluster ser tunt ut.',
        stamp: 'Hypoteser föreslagna',
      },
      {
        id: 'research',
        title: 'Granska researchkön',
        body: 'Varje godkänt bolag blir en researchuppgift riktad mot en roll, inte mot en person. Kön säger var man ska leta och varför – den rankar aldrig någon.',
        stamp: 'Kö byggd · ingen rankning',
      },
      {
        id: 'resolve',
        title: 'Lös dubbletter, off-limits och osäkerhet',
        body: 'Dubbletter mot er CRM-export, kundens off-limits-regler och genuint osäkra poster hålls tillbaka för beslut i stället för att tyst inkluderas eller strykas.',
        stamp: 'Beslut dokumenterade',
      },
      {
        id: 'pack',
        title: 'Ta fram kalibreringsunderlaget',
        body: 'Kartan, resonemanget, täckningen hittills och de öppna frågorna blir ett dokument som konsulten kan försvara rad för rad på kalibreringsmötet.',
        stamp: 'Godkänt för kund',
      },
      {
        id: 'export',
        title: 'Lämna tillbaka godkända poster till ert CRM',
        body: 'Godkända bolag, researchuppgifter och beslut lämnar systemet som en CSV ert befintliga system kan läsa in. Dokumentationen av uppdraget stannar där byrån har den.',
        stamp: 'Export förberedd',
      },
    ],
    mandateTitle: 'Extraherat uppdrag',
    fields: {
      role: 'Roll',
      client: 'Kund',
      sector: 'Bransch',
      markets: 'Marknader',
      reportsTo: 'Rapporterar till',
      mustHave: 'Skallkrav',
      niceToHave: 'Meriterande',
      exclusions: 'Exkluderingar',
      openQuestions: 'Öppna frågor till kunden',
      approval: 'Godkännande',
    },
    approvalPending: 'Väntar – inget efterföljande steg körs innan en namngiven person godkänner',
    approvalGranted: 'Godkänt av researchchef (roll, inte person, i detta syntetiska scenario)',
    universeTitle: 'Målbolagsuniversum',
    universeLede:
      'Tolv fiktiva bolag, grupperade per segment. Underlagets djup visar hur mycket källbelagt material som stödjer att bolaget alls hör hemma i omfattningen.',
    filterLabel: 'Filtrera på läge',
    filterAll: 'Alla lägen',
    tableHeads: {
      company: 'Bolag',
      country: 'Marknad',
      segment: 'Segment',
      rationale: 'Skäl att kvalificera',
      state: 'Läge',
      depth: 'Underlag',
      roleFocus: 'Rollfokus',
      reason: 'Skäl att researcha',
      openQuestion: 'Öppen fråga',
    },
    researchTitle: 'Researchkö',
    researchLede:
      'Uppgifterna pekar mot en roll inom ett bolag. Vem som i dag innehar rollen är något era researchers fastställer och era konsulter bedömer.',
    noPersonNote:
      'Ingen enskild person namnges någonstans i kön – av princip, inte för att demon är maskad.',
    resolveTitle: 'Hålls för beslut',
    resolveLede:
      'Tre poster kunde inte avgöras automatiskt. Var och en väntar på en människa, med skälet klart utskrivet.',
    resolveItems: [
      {
        code: 'DUP-02',
        issue: 'Möjlig dubblett',
        detail:
          'Två poster pekar mot samma fiktiva koncern: en från det nya universumet, en som redan finns i CRM-exporten under ett tidigare firmanamn.',
        decision: 'Slå ihop och behåll CRM-posten som primär – eller behåll båda om enheterna faktiskt skiljer sig åt.',
      },
      {
        code: 'OFL-01',
        issue: 'Off-limits hos kund',
        detail:
          'Kunden har lämnat en off-limits-regel som omfattar ett dotterbolag. Moderkoncernen är inte spärrad, så gränsen behöver uttalas.',
        decision: 'Exkludera dotterbolaget, behåll moderbolaget i omfattningen och dokumentera regeln mot båda.',
      },
      {
        code: 'UNC-04',
        issue: 'Osäker passform',
        detail:
          'Segmentklassningen vilar på en enda källsida utan datum. Bolaget kan höra hemma i omfattningen; underlaget räcker ännu inte för att påstå det.',
        decision: 'Låt posten förbli oavgjord och lyft den som en kalibreringsfråga till kunden.',
      },
    ],
    packTitle: 'Kalibreringsunderlag för kund',
    packLede:
      'Underlaget konsulten försvarar inför kunden. Det är medvetet ifrågasättbart – varje avsnitt går att utmana och spåra.',
    packContents: [
      'Normaliserat uppdrag, där varje kriterium är länkat till formuleringen det kom ifrån',
      'Målbolagskarta per segment, med underlagets djup synligt',
      'Vad som exkluderats, och skälet för varje exkludering',
      'Täckningen hittills, angiven som en andel och inte som ett påstående',
      'Öppna frågor kunden behöver besvara innan researchen fortsätter',
      'De off-limits-regler som tillämpats, och vem som lämnat dem',
    ],
    exportTitle: 'Det som går tillbaka till ert CRM',
    exportLede:
      'En platt fil, medvetet tråkig, som bara innehåller godkända poster och besluten som hör till dem.',
    exportNote:
      'CSV är det som finns i dag. Native-integrationer byggs efter att piloterna avgjort vilka system som spelar roll – den här demon antyder ingen aktiv koppling till någon produkt.',
    coverageTitle: 'Täckning efter steg fem',
    ctaTitle: 'Ansök med ett skarpt uppdrag',
    ctaBody:
      'Det syntetiska scenariot visar strukturen. Den intressanta frågan är vad som händer när den möter ett uppdrag ert team faktiskt står i begrepp att starta.',
    cta: 'Ansök med ett skarpt uppdrag',
    noJsNote:
      'Genomgången är skriven för att läsas rakt igenom. Med JavaScript påslaget blir samma steg navigerbara ett i taget; utan det döljs ingenting.',
  },

  method: {
    eyebrow: 'Metod',
    title: 'Hur vi vet det vi säger att vi vet.',
    lede: 'Talenomix säljer kvalitet i underlag, vilket gör vår egen underlagshantering till öppet mål. Den här sidan beskriver hur det nordiska researchuniversumet definieras, hur källor samlas in och graderas, och vad vi ännu inte har fastställt.',
    sections: [
      {
        id: 'universe',
        title: 'Att definiera researchuniversumet',
        body: [
          'Studieobjektet är varje publikt upptäckbar byrå, dotterbolag eller fristående konsultverksamhet med nuvarande kontor eller varaktig verksamhet i Sverige, Danmark, Norge, Finland eller Island som uttryckligen säljer retained executive search, styrelserekrytering eller motsvarande aktiv söktjänst för högsta ledningen.',
          'Resultatet kallar vi det publikt upptäckbara nordiska universumet. Det är ett smalare och ärligare påstående än att säga att varje juridisk enhet är hittad, och skillnaden spelar roll när en byrå frågar hur fullständig en karta egentligen är.',
        ],
        list: [
          'Ingår: fristående boutiquebyråer, nordiska kontor hos internationella firmor, hybridbyråer inom ledarskapsrådgivning där search är en väsentlig tjänst, branschspecialister, och byråer som kombinerar search med styrelserådgivning, assessment eller successionsarbete.',
          'Ingår inte: rena no cure–no pay-rekryterare, bemanningsföretag utan retained-erbjudande, jobbsajter, kandidatmarknadsplatser, enskilda karriärcoacher, interna talent-team, rena interimleverantörer och byråer utan nuvarande nordisk närvaro.',
          'Ingår inte utan bekräftelse: vilande byråar och trasiga webbplatser utan annat belägg för pågående verksamhet.',
        ],
      },
      {
        id: 'discovery',
        title: 'Källor för kartläggning',
        body: [
          'Medlemskap i en branschorganisation ger inte tillräcklig täckning, och vi kan visa varför: svenska ESK ackrediterar enskilda konsulter snarare än byråer, medan Finland har både en medlemsförening och en separat, bredare kommersiell företagslista. Varje karta byggd på ett enda register ärver det registrets blinda fläck.',
          'Universumet byggs därför upp och korskontrolleras från flera håll samtidigt: bransch- och nätverksregister, nationella företagsregister, sökmatriser på lokalt språk per land, aktuella platsannonser, upphandlingstilldelningar och byråernas egna kundnotiser.',
        ],
        list: [
          'Sverige: executive search, chefsrekrytering, ledarrekrytering, styrelserekrytering, headhunting, searchkonsult',
          'Danmark: executive search, lederrekruttering, bestyrelsesrekruttering, headhunting, direktionsrekruttering',
          'Norge: executive search, lederrekruttering, hodejeger, styrerekruttering, kandidatkartlegging',
          'Finland: suorahaku, johdon suorahaku, johtajahaku, headhunting, hallitushaku',
          'Island: executive search Iceland, stjórnendaleit, ráðningar stjórnenda, headhunting Reykjavík',
        ],
      },
      {
        id: 'collection',
        title: 'Regler för insamling',
        body: [
          'Researchpipelinen är medvetet begränsad, och begränsningarna är själva poängen. En marknadskarta som satts ihop genom att bryta mot villkoren hos de sajter den kommer från är inte en tillgång som håller för någon.',
        ],
        list: [
          'robots.txt, publicerade villkor och inloggningsgränser respekteras undantagslöst.',
          'Ingen inloggad skrapning av professionella nätverk, ingen CAPTCHA-kringgång, ingen insamling från privata profiler.',
          'Hastighetsbegränsning till en förfrågan per domän varannan sekund, med högst fyra domäner igång samtidigt.',
          'Varje post behåller hämtad URL, hämtningstid, sidans datum, språk, innehållshash och den synliga passage som stödjer den.',
          'Den ursprungliga passagen på originalspråk sparas vid sidan av sin engelska parafras, så att översättningen aldrig i tysthet blir underlaget.',
          'Blockerade, otillgängliga och exkluderade källor loggas som sådana i stället för att tappas bort.',
          'Inga personliga e-postadresser, kandidatuppgifter eller kontaktdatamängder läggs någonsin i det publika kodarkivet.',
        ],
      },
      {
        id: 'saturation',
        title: 'När kartläggningen avslutas',
        body: [
          'Kartläggningen avslutas på uttalade villkor snarare än när den känns färdig: varje bransch- och registerspår upplöst, varje byrå avdubblerad på domän, juridisk identitet och kontorsnät, två på varandra följande landsomgångar som tillför under 2 % nya kvalificerade byråer, de största byråerna och internationella nätverken manuellt korskontrollerade, och varje osäker inkludering märkt i stället för tyst accepterad.',
          'Minst 10 % av de extraherade posterna kontrolleras för hand mot sina källor. Där en manuell kontroll avviker från pipelinen har pipelinen fel tills motsatsen är visad.',
        ],
      },
      {
        id: 'grading',
        title: 'Hur underlag graderas',
        body: [
          'Varje observation bär en stödjande passage, ett källdatum och en tillförlitlighetsgrad, plus en uttrycklig markering som skiljer det en byrå har sagt från det en researcher har slutit sig till. En leverantör som beskriver sin egen produkt noteras som ett leverantörspåstående och befordras aldrig till oberoende fynd.',
        ],
      },
    ],
    gradesTitle: 'Tillförlitlighetsgrader',
    grades: [
      {
        label: 'A',
        body: 'En daterad, direkt uppgift från byrån själv, hämtningsbar på den angivna adressen.',
      },
      {
        label: 'B',
        body: 'En stark dokumentär indikator – en platsannons, upphandlingspost eller ett kundcase som förutsätter arbetssättet.',
      },
      {
        label: 'C',
        body: 'En slutsats om arbetsflödet dragen ur samstämmiga publika signaler, redovisad som slutsats.',
      },
      {
        label: 'D',
        body: 'En enstaka svag eller odaterad signal. Sparas för att kunna kontrolleras igen, används aldrig som stöd för ett publikt påstående.',
      },
    ],
    ledgerTitle: 'Förteckning över påståenden',
    ledgerLede:
      'Varje externt påstående någonstans på webbplatsen, med källa, hämtningsdatum och grad. Bygget fallerar om ett påstående tappar sin källa.',
    unknownTitle: 'Vad vi inte har fastställt',
    unknowns: [
      'Hur många timmar en uppdragsstart faktiskt kostar en nordisk byrå i dag. Vi har hypoteser och inga mätningar, och de första betalda piloterna finns till för att ta fram dem.',
      'Om värdet ligger i uppdragsstarten, kundrapporteringen eller i att återvinna byråminnet. Det pekar mot olika produkter, och vi tar hellre reda på det än antar.',
      'Vilket CRM som betyder mest i det här segmentet, och därmed vilken integration som ska byggas först.',
      'Om byråer alls kommer att exportera CRM-data under ett pilotavtal. Om de inte gör det fungerar inte kilen, och det lär vi oss hellre i månad två än i månad tolv.',
      'Vad nordisk normalisering av titlar och bolagsstrukturer verkligen kräver bortom svenska, som är den enda marknad vi hittills granskat på nära håll.',
    ],
  },

  privacy: {
    eyebrow: 'Integritet',
    title: 'Integritet och datagränser',
    lede: 'Två skilda saker beskrivs här: vad den här webbplatsen gör, vilket är nästan ingenting, och vad en pilot med Talenomix Mandate skulle behandla, vilket regleras i ett skriftligt avtal innan den startar.',
    updated: 'Uttalande före lansering · senast granskat 25 juli 2026',
    sections: [
      {
        id: 'website',
        title: 'Den här webbplatsen',
        body: [
          'Webbplatsen består av statiska filer som levereras från GitHub Pages. Den sätter inga kakor, kör ingen analys, bäddar in inga tredjepartsskript och laddar inga tredjepartstypsnitt – Manrope och Newsreader ligger på den här domänen just av det skälet.',
          'Det finns inget formulär på webbplatsen, så den samlar inte in något ni skriver. Den interaktiva demon körs helt i er webbläsare och gör inga nätverksanrop alls.',
          'En sak vi inte styr över: som värd behandlar GitHub sedvanliga serveruppgifter, inklusive er IP-adress, för att kunna leverera sidan. Det gäller varje webbplats med en värd, och vi säger hellre det rakt ut än antyder att sidan är osynlig.',
        ],
      },
      {
        id: 'demo',
        title: 'Den syntetiska demon',
        body: [
          'Varje bolag, krav, siffra och beslut i demon är påhittat för genomgången. Inga verkliga personuppgifter förekommer i den, och researchkön pekar av princip mot roller i stället för namngivna personer.',
          'Demon gör inga externa AI-anrop. Ingenting ni klickar på skickas någonstans.',
        ],
      },
      {
        id: 'pilot',
        title: 'Vad en pilot skulle behandla',
        body: [
          'En pilot med designpartner behandlar material som er byrå tillhandahåller – en påskriven uppdragsbeskrivning, en CRM-export, era off-limits- och jävsregler – samt publik och licensierad bolagsinformation. En del av det är personuppgifter om chefer, och behandlas som sådana.',
          'Innan något av det flyttas dokumenterar vi roll, ändamål, rättslig grund, informationsmetod, gallringsregel och rutin för rättigheter för varje kategori, och tecknar ett personuppgiftsbiträdesavtal. Berättigat intresse antas inte bara för att uppgifter råkar vara offentliga.',
        ],
        list: [
          'Er byrå är personuppgiftsansvarig för sina egna kandidat- och kunduppgifter. Talenomix agerar biträde enligt skriftliga instruktioner.',
          'Lagring och gallring avtalas innan piloten startar, inte efter att den avslutats.',
          'Uppgifter stannar inom EU/EES, och varje underbiträde namnges för er i förväg.',
          'Ert underlag, era exporter och det byråminne som blir resultatet tillhör er byrå och följer med er.',
          'Vi skrapar inte inloggade nätverk, kontaktar inte kandidater och publicerar inga kontaktdatamängder.',
        ],
      },
      {
        id: 'rights',
        title: 'Rättigheter och kontakt',
        body: [
          'När Talenomix behandlar personuppgifter på en kunds instruktion vidarebefordras begäranden från registrerade till den kunden som personuppgiftsansvarig, och vi bistår inom avtalad tid.',
          'Eftersom Talenomix är ett preliminärt namn i väntan på kontroll av firma och varumärke publiceras en permanent kontaktväg och fullständig integritetspolicy vid lansering. Till dess är den här sidan ett uttalande om de gränser vi bygger mot – inte en ersättning för den information en tjänst i drift kräver.',
        ],
      },
    ],
  },

  notFound: {
    code: '404',
    title: 'Det här bladet finns inte i atlasen.',
    body: 'Sidan ni bad om finns inte, eller flyttades medan webbplatsen byggdes om. Adresserna nedan är hela kartan.',
    links: 'Gå till',
  },

  footer: {
    blurb:
      'Talenomix Mandate omvandlar en påskriven uppdragsbeskrivning och byråns befintliga kunskap till en marknadskarta som håller, en källbelagd researchkö och ett kalibreringsunderlag – ovanpå ert CRM, inte i stället för det.',
    productTitle: 'Produkt',
    companyTitle: 'Webbplatsen',
    languageTitle: 'Språk',
    rights: 'Talenomix. Webbplats före lansering.',
    disclaimer:
      'Talenomix tillhandahåller researchförberedelse och beslutsstöd för sökbyråer. Tjänsten väljer inte kandidater, garanterar ingen tillsättning och utgör inte juridisk rådgivning.',
  },
};
