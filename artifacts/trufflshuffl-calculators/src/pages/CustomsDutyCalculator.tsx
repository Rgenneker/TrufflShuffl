import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { CALCULATOR_GUIDES } from "@/lib/calculatorGuides";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type ImporterKey = "us" | "eu" | "uk" | "australia" | "canada";
type OriginKey =
  | "china" | "canada_usmca" | "canada_other"
  | "mexico_usmca" | "mexico_other"
  | "us" | "eu" | "uk" | "india" | "japan" | "south_korea"
  | "vietnam" | "australia" | "other";
type CategoryKey =
  | "general" | "steel_aluminum" | "motor_vehicles" | "electronics"
  | "apparel" | "agricultural" | "pharmaceuticals" | "chemicals";

interface TariffRate {
  rate: number | "verify";
  note: string;
  fta?: string;
}

const IMPORTER_LABELS: Record<ImporterKey, string> = {
  us: "United States",
  eu: "European Union",
  uk: "United Kingdom",
  australia: "Australia",
  canada: "Canada",
};

const ORIGIN_LABELS: Record<OriginKey, string> = {
  china: "China",
  us: "United States",
  canada_usmca: "Canada (USMCA-compliant goods)",
  canada_other: "Canada (non-USMCA goods)",
  mexico_usmca: "Mexico (USMCA-compliant goods)",
  mexico_other: "Mexico (non-USMCA goods)",
  eu: "European Union",
  uk: "United Kingdom",
  india: "India",
  japan: "Japan",
  south_korea: "South Korea",
  vietnam: "Vietnam",
  australia: "Australia",
  other: "Other / Rest of World",
};

const CATEGORY_LABELS: Record<CategoryKey, string> = {
  general:         "General Merchandise",
  steel_aluminum:  "Steel & Aluminum",
  motor_vehicles:  "Motor Vehicles & Parts",
  electronics:     "Electronics & Tech",
  apparel:         "Apparel & Textiles",
  agricultural:    "Agricultural Products",
  pharmaceuticals: "Pharmaceuticals",
  chemicals:       "Chemicals",
};

type RateTable = Record<OriginKey, Record<CategoryKey, TariffRate>>;

function rate(r: number | "verify", note: string, fta?: string): TariffRate {
  return { rate: r, note, fta };
}

const US_RATES: Partial<RateTable> = {
  china: {
    general:        rate(30,       "Baseline reciprocal tariff after May 2025 90-day deal. Additional Section 301 tariffs may stack. Verify at USTR for specific HS codes — rates as at mid-2026."),
    steel_aluminum: rate(50,       "Section 232 (25%) + China reciprocal tariff stacked. Verify at CBP."),
    motor_vehicles: rate(52.5,     "Section 232 auto tariff (25%) + China reciprocal tariff. Verify at CBP."),
    electronics:    rate(30,       "Post-deal rate. Some consumer electronics may have temporary exclusions — check USTR exclusion list."),
    apparel:        rate(30,       "China reciprocal tariff. Existing HTS column 1 rate also applies on top."),
    agricultural:   rate(30,       "China reciprocal tariff. USDA phytosanitary and quota restrictions may also apply."),
    pharmaceuticals:rate("verify", "Pharmaceutical tariffs under active review/investigation as at 2026. Verify at USTR."),
    chemicals:      rate(30,       "China reciprocal tariff. May stack with existing Section 301 chemical-specific rates."),
  },
  canada_usmca: {
    general:        rate(0,  "USMCA-compliant goods: 0% tariff.", "USMCA"),
    steel_aluminum: rate(25, "Section 232 steel & aluminum tariffs apply even to USMCA partners. 0% only for goods meeting steel/aluminum melted & poured rules — verify.", "USMCA (conditional)"),
    motor_vehicles: rate(25, "Section 232 auto tariffs (April 2025) apply to autos and auto parts, including from Canada.", "USMCA (conditional)"),
    electronics:    rate(0,  "USMCA-compliant electronics: 0%.", "USMCA"),
    apparel:        rate(0,  "USMCA-compliant textiles/apparel: 0% if yarn-forward rules of origin are met.", "USMCA"),
    agricultural:   rate(0,  "USMCA-compliant agricultural goods: 0% within TRQ limits. Over-quota rates apply on some dairy/poultry.", "USMCA"),
    pharmaceuticals:rate(0,  "USMCA-compliant pharmaceuticals: generally 0%.", "USMCA"),
    chemicals:      rate(0,  "USMCA-compliant chemicals: 0%.", "USMCA"),
  },
  canada_other: {
    general:        rate(25, "Non-USMCA-compliant Canadian goods subject to 25% tariff (March 2025 executive order)."),
    steel_aluminum: rate(25, "Section 232 rate applies.", ),
    motor_vehicles: rate(25, "Section 232 auto tariff.", ),
    electronics:    rate(25, "Non-USMCA-compliant electronics from Canada.", ),
    apparel:        rate(25, "Non-USMCA-compliant apparel from Canada.", ),
    agricultural:   rate(25, "Non-USMCA-compliant agricultural goods from Canada.", ),
    pharmaceuticals:rate(25, "Non-USMCA-compliant pharmaceuticals from Canada.", ),
    chemicals:      rate(25, "Non-USMCA-compliant chemicals from Canada.", ),
  },
  mexico_usmca: {
    general:        rate(0,  "USMCA-compliant Mexican goods: 0%.", "USMCA"),
    steel_aluminum: rate(25, "Section 232 steel & aluminum tariff applies even to USMCA partners.", "USMCA (conditional)"),
    motor_vehicles: rate(25, "Section 232 auto tariffs apply to Mexican autos and parts.", "USMCA (conditional)"),
    electronics:    rate(0,  "USMCA-compliant electronics from Mexico: 0%.", "USMCA"),
    apparel:        rate(0,  "USMCA-compliant apparel from Mexico: 0% if yarn-forward origin rules met.", "USMCA"),
    agricultural:   rate(0,  "USMCA-compliant agricultural goods: 0% within TRQs.", "USMCA"),
    pharmaceuticals:rate(0,  "USMCA-compliant pharmaceuticals: generally 0%.", "USMCA"),
    chemicals:      rate(0,  "USMCA-compliant chemicals from Mexico: 0%.", "USMCA"),
  },
  mexico_other: {
    general:        rate(25, "Non-USMCA-compliant Mexican goods subject to 25% tariff."),
    steel_aluminum: rate(25, "Section 232 rate.", ),
    motor_vehicles: rate(25, "Section 232 auto tariff.", ),
    electronics:    rate(25, "Non-USMCA-compliant electronics from Mexico.", ),
    apparel:        rate(25, "Non-USMCA-compliant apparel from Mexico.", ),
    agricultural:   rate(25, "Non-USMCA-compliant agricultural goods from Mexico.", ),
    pharmaceuticals:rate(25, "Non-USMCA-compliant pharmaceuticals from Mexico.", ),
    chemicals:      rate(25, "Non-USMCA-compliant chemicals from Mexico.", ),
  },
  eu: {
    general:        rate(10, "10% baseline reciprocal tariff (April 2025 executive order). Higher reciprocal rates paused pending negotiations."),
    steel_aluminum: rate(25, "Section 232 steel & aluminum tariff, universally applied.", ),
    motor_vehicles: rate(25, "Section 232 auto tariff (April 2025), applied globally.", ),
    electronics:    rate(10, "10% baseline. Some consumer electronics temporarily excluded — verify at USTR.", ),
    apparel:        rate(10, "10% baseline + existing HTS column 1 rate on apparel.", ),
    agricultural:   rate(10, "10% baseline. Specific agricultural products may have additional tariffs.", ),
    pharmaceuticals:rate(10, "10% baseline. Sector-specific pharmaceutical tariffs under investigation as at 2026.", ),
    chemicals:      rate(10, "10% baseline. Specific chemical tariffs may apply at the HS code level.", ),
  },
  uk: {
    general:        rate(10, "10% baseline reciprocal tariff. US–UK trade deal discussions ongoing as at 2026."),
    steel_aluminum: rate(25, "Section 232 tariff universally applied."),
    motor_vehicles: rate(25, "Section 232 auto tariff."),
    electronics:    rate(10, "10% baseline."),
    apparel:        rate(10, "10% baseline + existing column 1 rate."),
    agricultural:   rate(10, "10% baseline."),
    pharmaceuticals:rate(10, "10% baseline. Sector investigation ongoing."),
    chemicals:      rate(10, "10% baseline."),
  },
  india: {
    general:        rate(10, "10% baseline reciprocal tariff after 90-day pause on higher rates. Higher rate was 26% — verify current status at USTR."),
    steel_aluminum: rate(25, "Section 232 tariff universally applied."),
    motor_vehicles: rate(25, "Section 232 auto tariff."),
    electronics:    rate(10, "10% baseline."),
    apparel:        rate(10, "10% baseline. Higher rate was 26% under initial reciprocal order."),
    agricultural:   rate(10, "10% baseline."),
    pharmaceuticals:rate(10, "10% baseline."),
    chemicals:      rate(10, "10% baseline."),
  },
  japan: {
    general:        rate(10, "10% baseline after 90-day pause. Original reciprocal rate was 24% — verify current status at USTR."),
    steel_aluminum: rate(25, "Section 232 tariff."),
    motor_vehicles: rate(25, "Section 232 auto tariff plus existing 2.5% passenger car rate."),
    electronics:    rate(10, "10% baseline."),
    apparel:        rate(10, "10% baseline."),
    agricultural:   rate(10, "10% baseline."),
    pharmaceuticals:rate(10, "10% baseline."),
    chemicals:      rate(10, "10% baseline."),
  },
  south_korea: {
    general:        rate(10, "10% baseline after 90-day pause. Original reciprocal rate was 25%. KORUS FTA previously applied — verify current treatment at USTR."),
    steel_aluminum: rate(25, "Section 232."),
    motor_vehicles: rate(25, "Section 232 auto tariff."),
    electronics:    rate(10, "10% baseline."),
    apparel:        rate(10, "10% baseline."),
    agricultural:   rate(10, "10% baseline."),
    pharmaceuticals:rate(10, "10% baseline."),
    chemicals:      rate(10, "10% baseline."),
  },
  vietnam: {
    general:        rate(10, "10% baseline after 90-day pause. Original reciprocal rate was 46% — verify current status at USTR."),
    steel_aluminum: rate(25, "Section 232."),
    motor_vehicles: rate(25, "Section 232 auto tariff."),
    electronics:    rate(10, "10% baseline. Vietnam is a major electronics exporter — verify HS-level treatment."),
    apparel:        rate(10, "10% baseline. Higher rate was 46% under initial reciprocal order."),
    agricultural:   rate(10, "10% baseline."),
    pharmaceuticals:rate(10, "10% baseline."),
    chemicals:      rate(10, "10% baseline."),
  },
  other: {
    general:        rate(10, "10% universal baseline tariff applies to most countries not otherwise specified."),
    steel_aluminum: rate(25, "Section 232 steel & aluminum tariff, universally applied."),
    motor_vehicles: rate(25, "Section 232 auto tariff, universally applied."),
    electronics:    rate(10, "10% baseline. Some consumer electronics temporarily excluded — verify at USTR."),
    apparel:        rate(10, "10% baseline + existing HTS column 1 rate."),
    agricultural:   rate(10, "10% baseline."),
    pharmaceuticals:rate(10, "10% baseline. Sector-specific investigation ongoing."),
    chemicals:      rate(10, "10% baseline."),
  },
};

const EU_RATES: Partial<RateTable> = {
  china: {
    general:        rate(4,   "EU MFN average for industrial goods ~4%. Additional anti-dumping duties may apply for specific products. Check TARIC."),
    steel_aluminum: rate(25,  "Anti-dumping and countervailing duties on Chinese steel. Some categories 15–50%. Verify in TARIC."),
    motor_vehicles: rate(10,  "EU MFN rate for passenger cars: 10%. Additional EU EV countervailing duties on Chinese EVs (17–38.1%, 2024+)."),
    electronics:    rate(0,   "Most electronics: 0% under ITA (Information Technology Agreement)."),
    apparel:        rate(12,  "EU MFN average for apparel ~12%. Specific rates by HS code."),
    agricultural:   rate(13,  "EU MFN agricultural average ~13%. Highly variable: 0% on some, >100% on sensitive products."),
    pharmaceuticals:rate(0,   "Most pharmaceuticals: 0% MFN."),
    chemicals:      rate(5,   "EU MFN chemicals average ~5%. Variable by HS code."),
  },
  us: {
    general:        rate(4,   "EU MFN industrial average ~4%. No EU–US FTA in force as at 2026.", ),
    steel_aluminum: rate(0,   "Steel: 0% MFN for most products. Anti-dumping duties on some US steel removed after WTO resolutions. Verify TARIC.", ),
    motor_vehicles: rate(10,  "Passenger cars: 10%. No preference for US-origin vehicles.", ),
    electronics:    rate(0,   "Most electronics: 0% under ITA.", ),
    apparel:        rate(12,  "US apparel: EU MFN ~12%.", ),
    agricultural:   rate(13,  "Agricultural products: EU MFN average ~13%. Some US agri exports face high EU tariffs.", ),
    pharmaceuticals:rate(0,   "Pharmaceuticals: generally 0% MFN.", ),
    chemicals:      rate(5,   "Chemicals: ~5% MFN average.", ),
  },
  other: {
    general:        rate(4,   "EU MFN industrial goods average ~4%. Use TARIC for exact HS code rates."),
    steel_aluminum: rate(3,   "EU MFN on steel ~3% (most categories). Anti-dumping duties on some countries/products."),
    motor_vehicles: rate(10,  "Passenger cars: 10% MFN."),
    electronics:    rate(0,   "Most electronics: 0% under ITA."),
    apparel:        rate(12,  "Apparel: EU MFN average ~12%."),
    agricultural:   rate(13,  "Agricultural average ~13%."),
    pharmaceuticals:rate(0,   "Pharmaceuticals: generally 0%."),
    chemicals:      rate(5,   "Chemicals: ~5% average."),
  },
};

const UK_RATES: Partial<RateTable> = {
  china: {
    general:        rate(4,   "UK Global Tariff (post-Brexit). MFN industrial average ~4%. UK–China: no FTA."),
    steel_aluminum: rate(0,   "UK removed tariffs on steel for most sources. Verify at Trade Tariff for specific goods."),
    motor_vehicles: rate(6.5, "UK MFN rate on passenger cars: 6.5%."),
    electronics:    rate(0,   "Most electronics: 0% under ITA."),
    apparel:        rate(12,  "Apparel: UK MFN ~12%."),
    agricultural:   rate(10,  "Agricultural: UK MFN average ~10%. Highly variable."),
    pharmaceuticals:rate(0,   "Pharmaceuticals: generally 0%."),
    chemicals:      rate(4,   "Chemicals: ~4% average."),
  },
  us: {
    general:        rate(4,   "UK Global Tariff MFN rates apply. UK–US trade deal in progress as at 2026 — verify current status."),
    steel_aluminum: rate(0,   "UK removed most steel tariffs. Verify at UK Trade Tariff."),
    motor_vehicles: rate(6.5, "UK MFN on passenger cars: 6.5%."),
    electronics:    rate(0,   "Electronics: generally 0%."),
    apparel:        rate(12,  "UK MFN apparel: ~12%."),
    agricultural:   rate(10,  "UK MFN agricultural: variable, ~10% average."),
    pharmaceuticals:rate(0,   "Pharmaceuticals: 0%."),
    chemicals:      rate(4,   "Chemicals: ~4%."),
  },
  other: {
    general:        rate(4,   "UK Global Tariff MFN rates. Use UK Trade Tariff for exact HS code rates."),
    steel_aluminum: rate(0,   "UK MFN steel rates: mostly 0%. Verify at UK Trade Tariff."),
    motor_vehicles: rate(6.5, "UK MFN cars: 6.5%."),
    electronics:    rate(0,   "Electronics: generally 0%."),
    apparel:        rate(12,  "Apparel: ~12% MFN."),
    agricultural:   rate(10,  "Agricultural: ~10% average MFN."),
    pharmaceuticals:rate(0,   "Pharmaceuticals: 0%."),
    chemicals:      rate(4,   "Chemicals: ~4%."),
  },
};

const AU_RATES: Partial<RateTable> = {
  china: {
    general:        rate(0,   "Australia–China FTA (ChAFTA): most goods 0% since 2019.", "ChAFTA"),
    steel_aluminum: rate(5,   "Non-ChAFTA steel: 5% MFN. Most steel: 0% under ChAFTA.", "ChAFTA"),
    motor_vehicles: rate(0,   "Australia has 0% tariff on all motor vehicles since 2010.", ),
    electronics:    rate(0,   "Electronics: 0% (ITA + ChAFTA).", "ChAFTA"),
    apparel:        rate(0,   "Apparel: 0% under ChAFTA. General rate was 10%, now 0% for China.", "ChAFTA"),
    agricultural:   rate(0,   "Agricultural goods: 0% under ChAFTA for most products.", "ChAFTA"),
    pharmaceuticals:rate(0,   "Pharmaceuticals: 0%.", ),
    chemicals:      rate(0,   "Chemicals: 0% under ChAFTA.", "ChAFTA"),
  },
  us: {
    general:        rate(0,   "Australia–US FTA (AUSFTA): goods trade substantially tariff-free since 2005.", "AUSFTA"),
    steel_aluminum: rate(0,   "Steel: 0% under AUSFTA.", "AUSFTA"),
    motor_vehicles: rate(0,   "Vehicles: 0% (Australia has no car tariffs).", ),
    electronics:    rate(0,   "Electronics: 0%.", ),
    apparel:        rate(0,   "Apparel: 0% under AUSFTA.", "AUSFTA"),
    agricultural:   rate(0,   "Agricultural goods: 0% under AUSFTA (within TRQs for some products).", "AUSFTA"),
    pharmaceuticals:rate(0,   "Pharmaceuticals: 0%.", ),
    chemicals:      rate(0,   "Chemicals: 0%.", ),
  },
  other: {
    general:        rate(5,   "Australia MFN general rate: 5% for goods not covered by FTA. Many goods are 0%. Check ABF Tariff."),
    steel_aluminum: rate(5,   "MFN steel: 5%."),
    motor_vehicles: rate(0,   "Australia has a 0% tariff on all vehicles since 2010."),
    electronics:    rate(0,   "Electronics: 0% under ITA."),
    apparel:        rate(10,  "Apparel: MFN 10% for countries without an FTA with Australia."),
    agricultural:   rate(0,   "Most agricultural goods: 0%. Some exceptions apply."),
    pharmaceuticals:rate(0,   "Pharmaceuticals: 0%."),
    chemicals:      rate(0,   "Chemicals: generally 0%."),
  },
};

const CA_RATES: Partial<RateTable> = {
  us: {
    general:        rate(0,   "USMCA-compliant goods from US: 0%.", "USMCA"),
    steel_aluminum: rate(0,   "Canada removed retaliatory tariffs on US steel/aluminum after 2019 USMCA. Some exceptions — verify at CBSA.", "USMCA"),
    motor_vehicles: rate(0,   "USMCA-compliant vehicles: 0%.", "USMCA"),
    electronics:    rate(0,   "Electronics: generally 0%.", ),
    apparel:        rate(0,   "USMCA-compliant apparel: 0%.", "USMCA"),
    agricultural:   rate(0,   "USMCA agricultural goods: 0% within TRQs. Dairy/poultry have supply-managed quotas.", "USMCA"),
    pharmaceuticals:rate(0,   "Pharmaceuticals: generally 0%.", ),
    chemicals:      rate(0,   "Chemicals: generally 0%.", ),
  },
  china: {
    general:        rate(7,   "Canada MFN ~7% average on Chinese goods. Canada announced 100% EV tariff and 25% steel tariff on Chinese imports (2024). Verify at CBSA for specific HS codes."),
    steel_aluminum: rate(25,  "Canada applied 25% surtax on Chinese steel imports (2024). Aluminum tariffs also in force."),
    motor_vehicles: rate(100, "Canada 100% tariff on Chinese-made EVs (October 2024). ICE vehicles: 6.1% MFN."),
    electronics:    rate(0,   "Most electronics: 0% under ITA."),
    apparel:        rate(18,  "Canada MFN apparel ~18% on Chinese goods."),
    agricultural:   rate(7,   "Agricultural: MFN ~7% average. Some products have higher rates."),
    pharmaceuticals:rate(0,   "Pharmaceuticals: generally 0%."),
    chemicals:      rate(5,   "Chemicals: MFN ~5%."),
  },
  other: {
    general:        rate(5,   "Canada MFN average ~5% for general industrial goods. Use CBSA Customs Tariff for exact HS code rates."),
    steel_aluminum: rate(5,   "Canada MFN steel: ~5%. Anti-dumping/countervailing duties may stack."),
    motor_vehicles: rate(6.1, "Passenger cars from non-FTA countries: 6.1%."),
    electronics:    rate(0,   "Electronics: generally 0% under ITA."),
    apparel:        rate(18,  "Apparel MFN: ~18%."),
    agricultural:   rate(7,   "Agricultural MFN average: ~7%."),
    pharmaceuticals:rate(0,   "Pharmaceuticals: generally 0%."),
    chemicals:      rate(5,   "Chemicals: ~5%."),
  },
};

function getRateEntry(importer: ImporterKey, origin: OriginKey, category: CategoryKey): TariffRate {
  const tables: Record<ImporterKey, Partial<RateTable>> = {
    us: US_RATES,
    eu: EU_RATES,
    uk: UK_RATES,
    australia: AU_RATES,
    canada: CA_RATES,
  };
  const t = tables[importer];
  return t[origin]?.[category] ?? t["other"]?.[category] ?? { rate: "verify", note: "Rate not available for this combination — verify at the importing country's customs authority." };
}

const US_ORIGINS: OriginKey[] = ["china", "canada_usmca", "canada_other", "mexico_usmca", "mexico_other", "eu", "uk", "india", "japan", "south_korea", "vietnam", "other"];
const OTHER_ORIGINS: OriginKey[] = ["us", "china", "eu", "uk", "india", "japan", "south_korea", "vietnam", "australia", "other"];
const CA_ORIGINS: OriginKey[] = ["us", "china", "eu", "uk", "india", "japan", "south_korea", "vietnam", "australia", "other"];

function getOrigins(importer: ImporterKey): OriginKey[] {
  if (importer === "us") return US_ORIGINS;
  if (importer === "canada") return CA_ORIGINS;
  return OTHER_ORIGINS.filter(o => {
    if (importer === "eu" && o === "eu") return false;
    if (importer === "uk" && o === "uk") return false;
    if (importer === "australia" && o === "australia") return false;
    return true;
  });
}

export default function CustomsDutyCalculator() {
  const [importer, setImporter] = useState<ImporterKey>("us");
  const [origin, setOrigin] = useState<OriginKey>("china");
  const [category, setCategory] = useState<CategoryKey>("general");
  const [value, setValue] = useState("10000");
  const [result, setResult] = useState<{ duty: number | null; entry: TariffRate } | null>(null);

  const origins = getOrigins(importer);

  function handleImporterChange(i: ImporterKey) {
    setImporter(i);
    setResult(null);
    const newOrigins = getOrigins(i);
    if (!newOrigins.includes(origin)) setOrigin(newOrigins[0]);
  }

  function calculate() {
    const v = parseFloat(value);
    if (isNaN(v) || v <= 0) return;
    const entry = getRateEntry(importer, origin, category);
    const duty = typeof entry.rate === "number" ? (v * entry.rate) / 100 : null;
    setResult({ duty, entry });
  }

  function fmt(n: number) {
    return n.toLocaleString("en", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  const currentEntry = getRateEntry(importer, origin, category);
  const rateLabel = typeof currentEntry.rate === "number" ? `${currentEntry.rate}%` : "— verify";

  return (
    <CalculatorLayout
      title="Customs Duty & Tariff Calculator"
      description="Estimate import customs duties and tariffs for the United States, European Union, United Kingdom, Australia, and Canada. Reflects 2026 tariff schedules including 2025–2026 US reciprocal tariffs, Section 232 measures, and key FTA preferential rates."
      instructions={
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>Select the importing country</li>
          <li>Select the country of origin</li>
          <li>Select the product category</li>
          <li>Enter the customs value (CIF — cost + insurance + freight)</li>
          <li>Click Calculate</li>
        </ol>
      }
      testimonial="We import manufacturing components from multiple origins and the 2025–2026 US tariff changes completely upended our sourcing decisions. Having one place to compare what a shipment from China versus Vietnam versus Mexico costs in duty terms — before I run the full landed-cost model — is genuinely useful. The USMCA split for Canada and Mexico is exactly the detail that matters for our product mix."
      guide={CALCULATOR_GUIDES['customs']}
    >
      <div className="space-y-5">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-1.5">
          <span className="text-amber-400 text-xs font-medium">Rates as at 2026 — estimates only. Verify exact HS-code rates at your customs authority before filing.</span>
        </div>

        <div className="space-y-2">
          <Label>Importing Country</Label>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(IMPORTER_LABELS) as ImporterKey[]).map(i => (
              <button
                key={i}
                onClick={() => handleImporterChange(i)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  importer === i
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border text-muted-foreground hover:border-primary"
                }`}
              >
                {IMPORTER_LABELS[i]}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Country of Origin</Label>
          <div className="flex flex-wrap gap-2">
            {origins.map(o => (
              <button
                key={o}
                onClick={() => { setOrigin(o); setResult(null); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  origin === o
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border text-muted-foreground hover:border-primary"
                }`}
              >
                {ORIGIN_LABELS[o]}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Product Category</Label>
          <div className="grid grid-cols-2 gap-2">
            {(Object.keys(CATEGORY_LABELS) as CategoryKey[]).map(c => (
              <button
                key={c}
                onClick={() => { setCategory(c); setResult(null); }}
                className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors text-left ${
                  category === c
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border text-muted-foreground hover:border-primary"
                }`}
              >
                {CATEGORY_LABELS[c]}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-border bg-muted/20 px-4 py-3 space-y-1.5">
          <div className="flex items-center gap-3">
            <div>
              <div className="text-xs text-muted-foreground mb-0.5">Estimated duty rate</div>
              <div className={`text-lg font-bold ${typeof currentEntry.rate === "number" ? "text-primary" : "text-amber-400"}`}>
                {rateLabel}
              </div>
            </div>
            {currentEntry.fta && (
              <span className="ml-auto text-xs font-semibold px-2 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400">
                {currentEntry.fta}
              </span>
            )}
          </div>
          <div className="text-xs text-muted-foreground">{currentEntry.note}</div>
        </div>

        <div className="space-y-1.5">
          <Label>Customs Value — CIF (cost + insurance + freight)</Label>
          <Input
            type="number"
            value={value}
            onChange={e => { setValue(e.target.value); setResult(null); }}
            min="0"
            step="100"
          />
          <p className="text-xs text-muted-foreground">Enter the total landed value before duty, in the importer's currency.</p>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={calculate}
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Calculate
          </Button>
          <Button
            variant="outline"
            onClick={() => { setResult(null); setValue("10000"); }}
          >
            Reset
          </Button>
        </div>

        {result && (
          <div className="rounded-xl border border-border bg-muted/30 overflow-hidden">
            <div className="px-5 py-3 border-b border-border">
              <h3 className="font-semibold text-foreground">Estimated Duty</h3>
            </div>
            <div className="divide-y divide-border">
              <div className="flex justify-between px-5 py-3">
                <span className="text-muted-foreground text-sm">Customs Value</span>
                <span className="font-semibold text-foreground">{parseFloat(value).toLocaleString("en", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between px-5 py-3">
                <span className="text-muted-foreground text-sm">Tariff Rate</span>
                <span className="font-semibold text-foreground">{rateLabel}</span>
              </div>
              {result.duty !== null ? (
                <>
                  <div className="flex justify-between px-5 py-3 bg-primary/5">
                    <span className="text-foreground font-medium text-sm">Estimated Duty</span>
                    <span className="font-bold text-primary text-lg">{fmt(result.duty)}</span>
                  </div>
                  <div className="flex justify-between px-5 py-3">
                    <span className="text-muted-foreground text-sm">Total Landed Cost (duty included)</span>
                    <span className="font-semibold text-foreground">{fmt(parseFloat(value) + result.duty)}</span>
                  </div>
                </>
              ) : (
                <div className="px-5 py-3 bg-amber-500/5">
                  <span className="text-amber-400 text-sm font-medium">Rate requires verification — check with your customs broker or the official tariff schedule for this HS code and origin combination.</span>
                </div>
              )}
            </div>
            <div className="px-5 py-3 bg-muted/50 text-xs text-muted-foreground">
              {result.entry.note}
              {result.entry.fta ? ` Preferential rate under ${result.entry.fta}.` : ""}
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
