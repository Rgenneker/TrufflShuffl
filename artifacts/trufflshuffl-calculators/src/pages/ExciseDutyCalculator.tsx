import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { CALCULATOR_GUIDES } from "@/lib/calculatorGuides";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Country = "australia" | "uk" | "us";
type ProductKey = "fuel" | "tobacco" | "beer" | "spirits" | "wine";

interface ProductSpec {
  label: string;
  rateDisplay: string;
  rate: number;
  unit: string;
  currency: "AUD" | "GBP" | "USD";
  isPercent?: boolean;
  note: string;
}

const PRODUCTS: Record<Country, Partial<Record<ProductKey, ProductSpec>>> = {
  australia: {
    fuel: {
      label: "Petrol / Diesel",
      rateDisplay: "52.4¢ / litre",
      rate: 0.524,
      unit: "Litres",
      currency: "AUD",
      note: "Indexed bi-annually (Feb & Aug) with CPI. Estimated February 2026 rate.",
    },
    tobacco: {
      label: "Cigarettes (per stick)",
      rateDisplay: "A$1.64 / stick",
      rate: 1.64,
      unit: "Number of sticks",
      currency: "AUD",
      note: "Indexed each September at CPI + 5%. Estimated 2026 rate. Applies per stick, not per pack.",
    },
    beer: {
      label: "Packaged beer (> 1.15% ABV)",
      rateDisplay: "A$75.47 / LAL",
      rate: 75.47,
      unit: "Litres of pure alcohol (LAL)",
      currency: "AUD",
      note: "Per litre of alcohol content, not per litre of beer. Indexed Feb/Aug 2026 (estimated).",
    },
    spirits: {
      label: "Spirits / RTDs",
      rateDisplay: "A$103.25 / LAL",
      rate: 103.25,
      unit: "Litres of pure alcohol (LAL)",
      currency: "AUD",
      note: "Per litre of alcohol content. Indexed Feb/Aug 2026 (estimated).",
    },
    wine: {
      label: "Wine (WET — Wine Equalisation Tax)",
      rateDisplay: "29% of wholesale value",
      rate: 29,
      unit: "Wholesale value (AUD)",
      currency: "AUD",
      isPercent: true,
      note: "Wine producers may be eligible for the WET producer rebate (up to A$350,000/year). Rate unchanged.",
    },
  },
  uk: {
    fuel: {
      label: "Petrol / Diesel",
      rateDisplay: "52.95p / litre",
      rate: 0.5295,
      unit: "Litres",
      currency: "GBP",
      note: "Frozen at 52.95p since March 2022. Extended through 2026 in successive budgets.",
    },
    tobacco: {
      label: "Cigarettes — specific duty",
      rateDisplay: "£6.79 / pack of 20",
      rate: 6.79,
      unit: "Packs of 20 cigarettes",
      currency: "GBP",
      note: "Specific (fixed) duty component only. An additional 16.5% of RRP ad valorem duty also applies — not included here. Estimated April 2026 rate (RPI + 2% uplift).",
    },
    beer: {
      label: "Beer 3.5 – 8.4% ABV",
      rateDisplay: "£26.51 / LAL",
      rate: 26.51,
      unit: "Litres of pure alcohol (LAL)",
      currency: "GBP",
      note: "New alcohol duty system (Aug 2023+). Per litre of pure alcohol. Estimated February 2026 rate (CPI uplift).",
    },
    spirits: {
      label: "Spirits (> 22% ABV)",
      rateDisplay: "£32.97 / LAL",
      rate: 32.97,
      unit: "Litres of pure alcohol (LAL)",
      currency: "GBP",
      note: "Per litre of pure alcohol. Estimated February 2026 rate. Verify at HMRC for confirmed rate.",
    },
    wine: {
      label: "Still wine 11.5 – 14.5% ABV",
      rateDisplay: "£3.57 / litre",
      rate: 3.57,
      unit: "Litres",
      currency: "GBP",
      note: "Per litre of product (not alcohol). Estimated 2026 rate under new alcohol duty system.",
    },
  },
  us: {
    fuel: {
      label: "Gasoline (federal excise only)",
      rateDisplay: "$0.184 / US gallon",
      rate: 0.184,
      unit: "US Gallons",
      currency: "USD",
      note: "Federal rate only — set in 1993 and unchanged. State fuel taxes are additional and vary by state.",
    },
    tobacco: {
      label: "Cigarettes",
      rateDisplay: "$1.0066 / pack of 20",
      rate: 1.0066,
      unit: "Packs of 20 cigarettes",
      currency: "USD",
      note: "Federal excise rate (TTB). State cigarette taxes are substantial and additional — some states exceed $5/pack.",
    },
    beer: {
      label: "Beer — standard brewer",
      rateDisplay: "$18.00 / barrel",
      rate: 18,
      unit: "Barrels (31 US gallons)",
      currency: "USD",
      note: "For domestic brewers producing > 2M barrels/year. Small brewer rate: $3.50/bbl on first 60,000 barrels.",
    },
    spirits: {
      label: "Distilled spirits",
      rateDisplay: "$13.50 / proof gallon",
      rate: 13.50,
      unit: "Proof gallons",
      currency: "USD",
      note: "A proof gallon = 1 US gallon at 50% ABV. TTB federal rate. State taxes additional.",
    },
    wine: {
      label: "Still wine (≤ 14% ABV)",
      rateDisplay: "$1.07 / US gallon",
      rate: 1.07,
      unit: "US Gallons",
      currency: "USD",
      note: "TTB federal rate. Sparkling wine: $3.40/gal. State taxes and surcharges are additional.",
    },
  },
};

const COUNTRY_LABELS: Record<Country, string> = {
  australia: "Australia (ATO)",
  uk: "United Kingdom (HMRC)",
  us: "United States (TTB / IRS)",
};

const CURRENCY_SYMBOLS: Record<string, string> = { AUD: "A$", GBP: "£", USD: "US$" };

const ALL_PRODUCTS: { key: ProductKey; label: string }[] = [
  { key: "fuel",    label: "Fuel" },
  { key: "tobacco", label: "Tobacco" },
  { key: "beer",    label: "Beer" },
  { key: "spirits", label: "Spirits" },
  { key: "wine",    label: "Wine" },
];

export default function ExciseDutyCalculator() {
  const [country, setCountry] = useState<Country>("australia");
  const [product, setProduct] = useState<ProductKey>("fuel");
  const [quantity, setQuantity] = useState("100");
  const [result, setResult] = useState<{ duty: number; currency: string } | null>(null);

  const spec = PRODUCTS[country][product] ?? PRODUCTS[country]["fuel"]!;
  const sym = CURRENCY_SYMBOLS[spec.currency];

  function handleCountryChange(c: Country) {
    setCountry(c);
    setResult(null);
    const first = (Object.keys(PRODUCTS[c]) as ProductKey[])[0];
    setProduct(first ?? "fuel");
  }

  function calculate() {
    const q = parseFloat(quantity);
    if (isNaN(q) || q <= 0) return;
    const duty = spec.isPercent ? (q * spec.rate) / 100 : q * spec.rate;
    setResult({ duty, currency: spec.currency });
  }

  function fmt(n: number) {
    return n.toLocaleString("en", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  return (
    <CalculatorLayout
      title="Excise Duty Calculator"
      description="Calculate excise duties on fuel, tobacco, alcohol, and wine. Covers Australia (ATO), United Kingdom (HMRC), and United States (TTB/IRS). Rates current as at 2026 — indexed rates are estimated based on the latest available indexation schedule."
      instructions={
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>Select the country</li>
          <li>Select the product type</li>
          <li>Enter the quantity (in the units shown)</li>
          <li>Click Calculate to see the excise duty</li>
        </ol>
      }
      testimonial="I run a craft distillery in Victoria and calculating excise is a monthly headache. Our spirits attract A$103+ per litre of alcohol — a huge cost that has to be baked into pricing from day one. This calculator lets me quickly model how excise changes our margin at different production volumes without digging through the ATO excise schedule every time. I also use the beer tab when advising on gypsy brewing projects."
      guide={CALCULATOR_GUIDES['excise']}
    >
      <div className="space-y-5">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-1">
          <span className="text-amber-400 text-xs font-medium">Rates as at 2026 — verify with official sources before filing</span>
        </div>

        <div className="space-y-2">
          <Label>Country</Label>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(COUNTRY_LABELS) as Country[]).map(c => (
              <button
                key={c}
                onClick={() => handleCountryChange(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  country === c
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border text-muted-foreground hover:border-primary"
                }`}
              >
                {COUNTRY_LABELS[c]}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Product</Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {ALL_PRODUCTS.filter(p => PRODUCTS[country][p.key]).map(p => (
              <button
                key={p.key}
                onClick={() => { setProduct(p.key); setResult(null); }}
                className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors text-left ${
                  product === p.key
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border text-muted-foreground hover:border-primary"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-border bg-muted/20 px-4 py-3 space-y-1">
          <div className="text-xs text-muted-foreground">Selected product</div>
          <div className="text-sm font-medium text-foreground">{spec.label}</div>
          <div className="text-xs text-amber-400 font-semibold">{spec.rateDisplay}</div>
          <div className="text-xs text-muted-foreground">{spec.note}</div>
        </div>

        <div className="space-y-1.5">
          <Label>{spec.unit}</Label>
          <Input
            type="number"
            value={quantity}
            onChange={e => { setQuantity(e.target.value); setResult(null); }}
            step="0.1"
            min="0"
          />
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
            onClick={() => { setResult(null); setQuantity("100"); }}
          >
            Reset
          </Button>
        </div>

        {result && (
          <div className="rounded-xl border border-border bg-muted/30 overflow-hidden">
            <div className="px-5 py-3 border-b border-border">
              <h3 className="font-semibold text-foreground">Estimated Excise Duty</h3>
            </div>
            <div className="divide-y divide-border">
              <div className="flex justify-between px-5 py-3">
                <span className="text-muted-foreground text-sm">Quantity</span>
                <span className="font-semibold text-foreground">
                  {parseFloat(quantity).toLocaleString("en")} {spec.unit.toLowerCase()}
                </span>
              </div>
              <div className="flex justify-between px-5 py-3">
                <span className="text-muted-foreground text-sm">Rate</span>
                <span className="font-semibold text-foreground">{spec.rateDisplay}</span>
              </div>
              <div className="flex justify-between px-5 py-3 bg-primary/5">
                <span className="text-foreground font-medium text-sm">Excise Duty</span>
                <span className="font-bold text-primary text-lg">{sym}{fmt(result.duty)}</span>
              </div>
            </div>
            <div className="px-5 py-3 bg-muted/50 text-xs text-muted-foreground">
              {spec.isPercent
                ? `Formula: ${sym}${parseFloat(quantity).toLocaleString("en")} × ${spec.rate}% = ${sym}${fmt(result.duty)}`
                : `Formula: ${parseFloat(quantity).toLocaleString("en")} × ${spec.rateDisplay} = ${sym}${fmt(result.duty)}`}
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
