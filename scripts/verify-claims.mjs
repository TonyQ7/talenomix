/**
 * Claim-ledger verification (PLAN.md section 5).
 *
 * Two gates:
 *   1. Every claim in src/data/claims.ts is structurally complete — bilingual
 *      text, a resolvable source, a retrieval date that is real and not in the
 *      future, a confidence grade, and an honest vendor-claim flag.
 *   2. Every external link in the built site is a registered source or is on an
 *      explicit allowlist. This is what stops an unsourced external assertion
 *      from quietly reaching production.
 *
 * Run with `npm run verify:claims`. Gate 2 is skipped when dist/ is absent, so
 * the script is useful both before and after a build.
 */

import { readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const DIST = join(ROOT, 'dist');

const VALID_KINDS = new Set([
  'direct-statement',
  'job-requirement',
  'customer-case',
  'workflow-proxy',
  'vendor-claim',
  'regulation',
  'association-directory',
  'official-statistics',
  'public-compilation',
  'inference',
]);

const VALID_CONFIDENCE = new Set(['A', 'B', 'C', 'D']);

/**
 * External URLs that are legitimately linked but are not themselves claims.
 * Keep this list short and justified — it is the escape hatch, so it is the
 * first place to look when something unsourced slips through.
 */
const ALLOWED_EXTERNAL = new Map([
  [
    'https://eur-lex.europa.eu/legal-content/SV/TXT/?uri=celex%3A32024R1689',
    'Swedish-language rendering of the EU AI Act already in the ledger in English.',
  ],
]);

const errors = [];
const warnings = [];

const fail = (msg) => errors.push(msg);
const warn = (msg) => warnings.push(msg);

/* -------------------------------------------------------------------------- */
/* Gate 1 — ledger integrity                                                   */
/* -------------------------------------------------------------------------- */

// Node 24 strips TypeScript types natively, so the ledger is read from the same
// module the site renders from. No second copy of the data to drift out of sync.
const claimsModule = await import(pathToFileURL(join(ROOT, 'src/data/claims.ts')).href);
const { CLAIMS, HOME_CLAIM_IDS } = claimsModule;

if (!Array.isArray(CLAIMS) || CLAIMS.length === 0) {
  fail('CLAIMS is empty — the evidence sections would render with nothing in them.');
}

const seenIds = new Set();
const sourceUrls = new Set();
const today = new Date();
today.setHours(23, 59, 59, 999);

for (const claim of CLAIMS ?? []) {
  const at = `claim "${claim?.id ?? '(missing id)'}"`;

  if (!claim.id) fail(`${at}: missing id.`);
  else if (seenIds.has(claim.id)) fail(`${at}: duplicate id.`);
  else seenIds.add(claim.id);

  for (const locale of ['en', 'sv']) {
    const text = claim.text?.[locale];
    if (typeof text !== 'string' || text.trim().length === 0) {
      fail(`${at}: missing ${locale} text. A claim must be readable in both languages.`);
    } else if (text.trim().length < 25) {
      warn(`${at}: ${locale} text is suspiciously short (${text.trim().length} chars).`);
    }
  }

  const src = claim.source;
  if (!src) {
    fail(`${at}: no source. Every public claim must carry one.`);
    continue;
  }

  if (!src.url || !/^https?:\/\//.test(src.url)) {
    fail(`${at}: source url is missing or not an absolute http(s) URL.`);
  } else {
    sourceUrls.add(src.url);
  }

  if (!src.publisher?.trim()) fail(`${at}: source has no publisher.`);
  if (!VALID_KINDS.has(src.kind)) fail(`${at}: unknown evidence kind "${src.kind}".`);
  if (!src.language?.trim()) fail(`${at}: source has no language tag.`);

  if (!/^\d{4}-\d{2}-\d{2}$/.test(src.retrievedOn ?? '')) {
    fail(`${at}: retrievedOn must be an ISO date (YYYY-MM-DD), got "${src.retrievedOn}".`);
  } else {
    const retrieved = new Date(`${src.retrievedOn}T00:00:00Z`);
    if (Number.isNaN(retrieved.getTime())) fail(`${at}: retrievedOn is not a real date.`);
    else if (retrieved > today) fail(`${at}: retrievedOn is in the future.`);
  }

  if (!VALID_CONFIDENCE.has(claim.confidence)) {
    fail(`${at}: confidence must be one of A–D, got "${claim.confidence}".`);
  }

  if (typeof claim.vendorClaim !== 'boolean') {
    fail(`${at}: vendorClaim must be an explicit boolean.`);
  } else if (src.kind === 'vendor-claim' && claim.vendorClaim !== true) {
    fail(`${at}: source kind is vendor-claim but the claim is not flagged as one.`);
  }

  // A non-English source quoted verbatim needs a paraphrase, or the passage is
  // unreadable to most of the audience and stops functioning as evidence.
  if (src.passage && src.language !== 'en' && !src.paraphrase) {
    fail(`${at}: non-English passage has no English paraphrase.`);
  }
}

for (const id of HOME_CLAIM_IDS ?? []) {
  if (!seenIds.has(id)) fail(`HOME_CLAIM_IDS references unknown claim "${id}".`);
}

/* -------------------------------------------------------------------------- */
/* Gate 2 — external links in the built site                                   */
/* -------------------------------------------------------------------------- */

async function* htmlFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(full);
    else if (entry.name.endsWith('.html')) yield full;
  }
}

if (existsSync(DIST)) {
  let checked = 0;
  for await (const file of htmlFiles(DIST)) {
    checked += 1;
    const html = await readFile(file, 'utf8');
    const where = relative(ROOT, file);

    for (const match of html.matchAll(/href="(https?:\/\/[^"]+)"/g)) {
      const url = match[1].replace(/&amp;/g, '&');

      // Self-references (canonical, hreflang, og:url) are not claims.
      if (url.startsWith('https://tonyq7.github.io')) continue;
      if (sourceUrls.has(url) || ALLOWED_EXTERNAL.has(url)) continue;

      fail(`${where}: external link "${url}" is not a registered source or allowlisted.`);
    }
  }
  if (checked === 0) warn('dist/ contains no HTML files — did the build run?');
  else console.log(`Scanned ${checked} built page(s) for unsourced external links.`);
} else {
  console.log('dist/ not found — skipping the built-output link check.');
}

/* -------------------------------------------------------------------------- */

for (const w of warnings) console.warn(`warn  ${w}`);

if (errors.length > 0) {
  for (const e of errors) console.error(`error ${e}`);
  console.error(`\nClaim ledger verification FAILED with ${errors.length} error(s).`);
  process.exit(1);
}

console.log(
  `Claim ledger OK — ${CLAIMS.length} claim(s), ${sourceUrls.size} distinct source(s)` +
    (warnings.length ? `, ${warnings.length} warning(s).` : '.'),
);
