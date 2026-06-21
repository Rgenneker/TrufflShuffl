/**
 * TrufflShuffl Sitemap Generator
 * Generates sitemap-index.xml + sub-sitemaps covering ~346k pages.
 * Run: node scripts/generate-sitemaps.mjs
 */
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE_URL = "https://www.trufflshuffl.com";
const OUTPUT = join(__dirname, "../artifacts/trufflshuffl-calculators/public");
const TODAY = new Date().toISOString().split("T")[0];
const CHUNK = 49_000;

const LANGS = ["en", "af", "es", "ar", "fr", "de", "zh", "yue", "ru"];

const CONVERSION_SLUGS = [
  // Length
  "miles-to-km","km-to-miles","feet-to-metres","metres-to-feet",
  "inches-to-cm","cm-to-inches","yards-to-metres","metres-to-yards",
  "miles-to-feet","feet-to-miles","km-to-metres","metres-to-km",
  "cm-to-mm","mm-to-cm",
  // Weight
  "kg-to-pounds","pounds-to-kg","grams-to-ounces","ounces-to-grams",
  "tonnes-to-kg","kg-to-tonnes","kg-to-grams","grams-to-kg",
  "pounds-to-ounces","ounces-to-pounds","stones-to-kg","kg-to-stones",
  // Temperature
  "celsius-to-fahrenheit","fahrenheit-to-celsius",
  "celsius-to-kelvin","kelvin-to-celsius",
  "fahrenheit-to-kelvin","kelvin-to-fahrenheit",
  // Area
  "sqm-to-sqft","sqft-to-sqm","hectares-to-acres","acres-to-hectares",
  "sqkm-to-sqmiles","sqmiles-to-sqkm",
  // Volume
  "litres-to-gallons","gallons-to-litres","ml-to-litres","litres-to-ml",
  "litres-to-pints","pints-to-litres","cups-to-ml","ml-to-cups",
  // Speed
  "mph-to-kmh","kmh-to-mph","knots-to-kmh","kmh-to-knots","ms-to-kmh","kmh-to-ms",
  // Time
  "hours-to-minutes","minutes-to-hours","days-to-hours","hours-to-days",
  "weeks-to-days","days-to-weeks","months-to-days","years-to-days",
  // Data
  "mb-to-gb","gb-to-mb","gb-to-tb","tb-to-gb","kb-to-mb","mb-to-kb",
  // Pressure
  "bar-to-psi","psi-to-bar","atm-to-bar","bar-to-atm",
  // Energy
  "kj-to-kcal","kcal-to-kj","kwh-to-mj","mj-to-kwh",
  // Power
  "kw-to-hp","hp-to-kw",
];

const CALC_SLUGS = [
  "investment","loan","mortgage","bond","amortization",
  "fuel","pool","paving","renovation","paint",
  "calories","bmi","clothing-size","shoe-size","belt-ring","units",
  "vat","percentage","retirement","roi","savings","age","salary",
];

const OTHER_PATHS = ["", "about", "contact", "terms", "privacy", "sitemap"];

// Values 1-500 + extras
const VALUES = [...Array.from({ length: 500 }, (_, i) => i + 1), 750, 1000, 1500, 2000, 5000];

function urlEntry(loc, priority = "0.6", freq = "monthly") {
  return `  <url><loc>${loc}</loc><changefreq>${freq}</changefreq><priority>${priority}</priority><lastmod>${TODAY}</lastmod></url>`;
}

function writeSitemap(filename, urls) {
  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.join("\n") + "\n</urlset>";
  writeFileSync(join(OUTPUT, filename), xml, "utf8");
  console.log(`  ✓ ${filename}  (${urls.length.toLocaleString()} URLs)`);
  return urls.length;
}

function chunks(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) result.push(arr.slice(i, i + size));
  return result;
}

if (!existsSync(OUTPUT)) mkdirSync(OUTPUT, { recursive: true });

const sitemapFiles = [];
let totalUrls = 0;

// ── 1. Conversion sitemaps (one per language, ~38k URLs each) ─────
console.log("\nGenerating conversion sitemaps...");
for (const lang of LANGS) {
  const urls = [];
  for (const slug of CONVERSION_SLUGS) {
    urls.push(urlEntry(`${BASE_URL}/${lang}/convert/${slug}`, "0.7"));
    for (const val of VALUES) {
      urls.push(urlEntry(`${BASE_URL}/${lang}/convert/${slug}/${val}`, "0.6"));
    }
  }
  const batches = chunks(urls, CHUNK);
  for (let i = 0; i < batches.length; i++) {
    const filename = batches.length > 1
      ? `sitemap-convert-${lang}-${i + 1}.xml`
      : `sitemap-convert-${lang}.xml`;
    totalUrls += writeSitemap(filename, batches[i]);
    sitemapFiles.push(filename);
  }
}

// ── 2. Calculator & page sitemaps ────────────────────────────────
console.log("\nGenerating calculator & page sitemaps...");
const pageUrls = [];
for (const lang of LANGS) {
  pageUrls.push(urlEntry(`${BASE_URL}/${lang}`, "1.0", "weekly"));
  for (const slug of CALC_SLUGS) {
    pageUrls.push(urlEntry(`${BASE_URL}/${lang}/${slug}`, "0.9", "weekly"));
  }
  for (const path of OTHER_PATHS.filter(p => p !== "")) {
    pageUrls.push(urlEntry(`${BASE_URL}/${lang}/${path}`, "0.5", "monthly"));
  }
}
totalUrls += writeSitemap("sitemap-pages.xml", pageUrls);
sitemapFiles.push("sitemap-pages.xml");

// ── 3. Sitemap Index ─────────────────────────────────────────────
console.log("\nGenerating sitemap-index.xml...");
const indexXml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  sitemapFiles
    .map(f => `  <sitemap>\n    <loc>${BASE_URL}/${f}</loc>\n    <lastmod>${TODAY}</lastmod>\n  </sitemap>`)
    .join("\n") +
  "\n</sitemapindex>";
writeFileSync(join(OUTPUT, "sitemap-index.xml"), indexXml, "utf8");
console.log(`  ✓ sitemap-index.xml  (${sitemapFiles.length} sub-sitemaps)`);

// ── 4. Also update legacy sitemap.xml to redirect to index ───────
const legacyXml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<!-- This file is maintained for legacy compatibility. See sitemap-index.xml for the full index. -->\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  `  <url><loc>${BASE_URL}/sitemap-index.xml</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>\n` +
  `</urlset>`;
writeFileSync(join(OUTPUT, "sitemap.xml"), legacyXml, "utf8");

// ── 5. Summary ───────────────────────────────────────────────────
console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  TrufflShuffl Sitemap Generation Complete
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Total indexable pages : ${totalUrls.toLocaleString()}
  Sitemap files         : ${sitemapFiles.length} + 1 index + 1 legacy
  Conversion pairs      : ${CONVERSION_SLUGS.length}
  Value pages / pair    : ${VALUES.length} (per language)
  Languages             : ${LANGS.length}
  Calculator pages      : ${CALC_SLUGS.length * LANGS.length}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
