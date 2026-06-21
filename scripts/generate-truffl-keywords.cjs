const fs = require("fs");
const path = require("path");

const SITE_URL = "https://trufflshuffl.com";
const MAX_PAGES = 250000;
const MAX_URLS_PER_SITEMAP = 50000;

const baseKeywords = [
  "calculator", "online calculator", "free calculator", "calculation tool",
  "calculator app", "maths calculator", "business calculator", "finance calculator",
  "conversion calculator", "online tools", "loan calculator", "mortgage calculator",
  "interest calculator", "compound interest calculator", "savings calculator",
  "retirement calculator", "investment calculator", "inflation calculator",
  "bond calculator", "tax calculator", "vat calculator", "salary calculator",
  "profit calculator", "roi calculator", "break even calculator", "currency converter",
  "exchange rate calculator", "forex converter", "live exchange rates",
  "currency exchange tool", "usd to zar", "eur to zar", "gbp to zar",
  "exchange rate today", "money converter", "unit converter", "measurement converter",
  "metric converter", "imperial converter", "conversion tool", "unit conversion",
  "miles to km", "km to miles", "cm to inches", "inches to cm",
  "feet to metres", "metres to feet", "yards to metres", "length converter",
  "kg to pounds", "pounds to kg", "grams to ounces", "ounces to grams",
  "tonnes to kg", "weight converter", "mass converter", "celsius to fahrenheit",
  "fahrenheit to celsius", "celsius to kelvin", "kelvin to celsius",
  "temperature converter", "square metres to square feet",
  "square feet to square metres", "hectares to acres", "acres to hectares",
  "area converter", "litres to gallons", "gallons to litres", "ml to litres",
  "litres to ml", "volume converter", "mph to kmh", "kmh to mph",
  "speed converter", "knots to kmh", "kmh to knots", "hours to minutes",
  "minutes to hours", "days to weeks", "weeks to days", "time converter",
  "percentage calculator", "percentage increase calculator",
  "percentage decrease calculator", "discount calculator", "markup calculator",
  "profit margin calculator", "bmi calculator", "calorie calculator",
  "ideal weight calculator", "body fat calculator", "water intake calculator",
  "health calculator", "age calculator", "birthday calculator",
  "age in days calculator", "age difference calculator", "date calculator",
  "days between dates", "business days calculator", "working days calculator",
  "future date calculator", "concrete calculator", "brick calculator",
  "roofing calculator", "paint calculator", "flooring calculator",
  "building calculator", "fuel calculator", "fuel consumption calculator",
  "vehicle finance calculator", "car loan calculator", "mileage calculator",
  "business loan calculator", "margin calculator", "startup cost calculator",
  "cash flow calculator", "pricing calculator", "investment growth calculator",
  "stock return calculator", "dividend calculator", "etf calculator",
  "free online calculator", "quick calculator", "best calculator website",
  "accurate calculator", "instant calculator", "financial calculator online",
  "conversion calculator online", "business calculator online",
  "easy calculator tool", "professional calculator platform",
  "how much is 12 miles in kilometres", "calculate compound interest monthly",
  "convert pounds to kilograms", "how much house can i afford",
  "calculate loan repayments", "calculate vat in south africa",
  "convert usd to zar today", "calculate return on investment",
  "calculate profit margin", "convert celsius to fahrenheit",
  "how to calculate vat", "how to calculate compound interest",
  "how to calculate profit margin", "how to calculate roi",
  "how to calculate bmi"
];

const modifiers = [
  "free", "online", "best", "quick", "accurate", "instant", "simple",
  "easy", "professional", "advanced", "reliable", "fast", "secure",
  "mobile friendly", "for students", "for business", "for work",
  "for school", "for finance", "for planning", "for budgeting",
  "with formula", "with example", "step by step", "explained",
  "no signup", "no registration", "browser based", "easy online",
  "2026",
"latest",
"updated",
"current",
"live",
"real time",
"daily",
"monthly",
"annual",
"yearly",
"weekly",
"simple calculator",
"easy calculator",
"advanced calculator",
"accurate calculator",
"calculator with formula",
"calculator with examples",
"calculator explained",
"calculator for beginners",
"calculator for professionals",
"calculator for accountants",
"calculator for investors",
"calculator for students",
"calculator for teachers",
"calculator for engineers",
"calculator for contractors",
"calculator for homeowners",
"calculator for travellers",
"calculator for startups",
"calculator for entrepreneurs",
"calculator for small business"
];

const suffixes = [
  "online", "free", "calculator", "tool", "formula", "guide", "example",
  "explained", "step by step", "for beginners", "for students",
  "for business", "for small business", "for personal finance",
  "for south africa", "for tax", "for planning", "for budgeting",
  "on mobile", "on desktop", "without app", "without signup",
  "without registration", "today", "monthly", "yearly", "daily"
];

const questionPrefixes = [
  "how to", "how do i", "what is", "best way to", "easy way to",
  "quick way to", "where to", "when to use", "why use"
];

const useCases = [
  "loans", "mortgages", "savings", "retirement", "investments",
  "tax", "vat", "salary", "business", "school", "university",
  "construction", "travel", "fuel", "vehicles", "currency exchange",
  "unit conversions", "health", "fitness", "budgeting", "pricing",
  "profit", "cash flow", "reports", "invoices", "personal finance",
  "small business", "road trips", "property", "home loans",
  "home budget",
"monthly budget",
"loan repayments",
"credit cards",
"insurance",
"property investment",
"rental income",
"travel money",
"exchange rates",
"groceries",
"fuel costs",
"electricity usage",
"water usage",
"building materials",
"home renovation",
"school fees",
"university fees",
"wedding budget",
"event planning",
"freelancers",
"contractors",
"employees",
"payroll",
"commission",
"discounts",
"sales tax",
"profit margins",
"investment returns",
"dividends",
"interest rates",
];

const countries = [
  "south africa", "usa", "uk", "canada", "australia", "india",
  "new zealand", "europe", "germany", "france", "uae", "kenya",
  "nigeria", "ghana", "philippines", "pakistan", "malaysia",
    "singapore",
  "ireland",
  "netherlands",
  "spain",
  "italy",
  "saudi arabia",
  "qatar",
  "japan",
  "brazil"
];

const currencyCodes = [
  "usd", "zar", "eur", "gbp", "aud", "cad", "nzd", "jpy", "cny",
  "inr", "aed", "chf", "sgd", "ngn", "kes", "ghs", "brl", "mxn"
];

const unitPairs = [
  ["miles", "kilometres"], ["kilometres", "miles"],
  ["feet", "metres"], ["metres", "feet"],
  ["inches", "centimetres"], ["centimetres", "inches"],
  ["pounds", "kilograms"], ["kilograms", "pounds"],
  ["grams", "ounces"], ["ounces", "grams"],
  ["litres", "gallons"], ["gallons", "litres"],
  ["celsius", "fahrenheit"], ["fahrenheit", "celsius"],
  ["square metres", "square feet"], ["square feet", "square metres"],
  ["hectares", "acres"], ["acres", "hectares"],
  ["mph", "kmh"], ["kmh", "mph"]
];

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/%/g, "percent")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function add(set, keyword) {
  const clean = keyword.toLowerCase().replace(/\s+/g, " ").trim();
  if (clean) set.add(clean);
}

const generated = new Set();

for (const base of baseKeywords) {
  add(generated, base);

  for (const modifier of modifiers) {
    add(generated, `${modifier} ${base}`);
    add(generated, `${base} ${modifier}`);
  }

  for (const suffix of suffixes) {
    add(generated, `${base} ${suffix}`);
  }

  for (const question of questionPrefixes) {
    add(generated, `${question} ${base}`);
  }

  for (const useCase of useCases) {
    add(generated, `${base} for ${useCase}`);
  }

  for (const country of countries) {
  add(generated, `${base} in ${country}`);
  add(generated, `${base} ${country}`);
  add(generated, `${base} for ${country}`);
  add(generated, `${country} ${base}`);
  add(generated, `${base} calculator in ${country}`);
}

  for (const modifier of modifiers) {
    for (const suffix of suffixes) {
      add(generated, `${modifier} ${base} ${suffix}`);
    }
  }

  for (const question of questionPrefixes) {
    for (const suffix of suffixes) {
      add(generated, `${question} ${base} ${suffix}`);
    }
  }
}

for (const from of currencyCodes) {
  for (const to of currencyCodes) {
    if (from !== to) {
      add(generated, `${from} to ${to}`);
      add(generated, `${from} to ${to} calculator`);
      add(generated, `${from} to ${to} converter`);
      add(generated, `${from} to ${to} exchange rate`);
      add(generated, `convert ${from} to ${to}`);
    }
  }
}

for (const [from, to] of unitPairs) {
  add(generated, `${from} to ${to}`);
  add(generated, `${from} to ${to} calculator`);
  add(generated, `${from} to ${to} converter`);
  add(generated, `convert ${from} to ${to}`);
  add(generated, `how to convert ${from} to ${to}`);
}

const pages = Array.from(generated)
  .slice(0, MAX_PAGES)
  .map((keyword) => ({
    keyword,
    slug: slugify(keyword),
  }))
  .filter((item) => item.slug);

fs.mkdirSync(path.join(__dirname, "../src/data"), { recursive: true });
fs.mkdirSync(path.join(__dirname, "../public"), { recursive: true });

fs.writeFileSync(
  path.join(__dirname, "../src/data/truffl-keywords.json"),
  JSON.stringify(pages, null, 2)
);

const sitemapCount = Math.ceil(pages.length / MAX_URLS_PER_SITEMAP);

for (let i = 0; i < sitemapCount; i++) {
  const chunk = pages.slice(
    i * MAX_URLS_PER_SITEMAP,
    (i + 1) * MAX_URLS_PER_SITEMAP
  );

  const urls = chunk
    .map(
      (page) => `
  <url>
    <loc>${SITE_URL}/calculator/${page.slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join("");

  fs.writeFileSync(
    path.join(__dirname, `../public/sitemap-${i + 1}.xml`),
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`
  );
}

const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Array.from({ length: sitemapCount })
  .map(
    (_, i) => `
  <sitemap>
    <loc>${SITE_URL}/sitemap-${i + 1}.xml</loc>
  </sitemap>`
  )
  .join("")}
</sitemapindex>`;

fs.writeFileSync(
  path.join(__dirname, "../public/sitemap-index.xml"),
  sitemapIndex
);

console.log(`Generated ${pages.length} TrufflShuffl keyword pages`);
console.log(`Generated ${sitemapCount} sitemap files`);