import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { CALCULATOR_GUIDES } from "@/lib/calculatorGuides";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { calculateRenovation } from "@/lib/calculators/home";

const RENOVATION_TYPES = [
  "Kitchen remodel", "Bathroom renovation", "Bedroom repaint & flooring",
  "Living room renovation", "Garden landscaping", "Roof repairs",
  "Driveway paving", "Tiling (floors)", "Electrical rewiring",
  "Plumbing upgrade", "Pergola / deck", "Braai area / entertainment area",
  "Swimming pool installation", "Garage conversion", "Open-plan conversion (remove wall)",
];

const GRADES = [
  { value: "budget", label: "Budget" },
  { value: "mid", label: "Mid-range" },
  { value: "premium", label: "Premium" },
  { value: "luxury", label: "Luxury" },
];

const LOCATIONS = [
  { value: "rural", label: "Rural" },
  { value: "suburban", label: "Suburban" },
  { value: "urban", label: "Urban" },
  { value: "metropolitan", label: "Metropolitan (JHB/CPT/DBN)" },
];

const CURRENCIES = ["ZAR", "USD", "EUR", "GBP"];

function fmt(n: number, currency: string) {
  const symbols: Record<string, string> = { ZAR: "R", USD: "$", EUR: "€", GBP: "£" };
  return `${symbols[currency] ?? "R"} ${n.toLocaleString("en-ZA", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export default function RenovationCalculator() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [type, setType] = useState("Kitchen remodel");
  const [area, setArea] = useState("20");
  const [grade, setGrade] = useState<"budget" | "mid" | "premium" | "luxury">("mid");
  const [labour, setLabour] = useState(true);
  const [location, setLocation] = useState("suburban");
  const [currency, setCurrency] = useState("ZAR");
  const [result, setResult] = useState<ReturnType<typeof calculateRenovation>>(null);

  function calculate() {
    let areaSqM = Number(area);
    if (unit === "imperial") areaSqM = areaSqM * 0.092903;
    setResult(calculateRenovation(type, areaSqM, grade, labour, location, currency));
  }

  return (
    <CalculatorLayout
      title="Renovation Cost Calculator"
      description="Get realistic South African renovation cost ranges for 15 project types across all quality grades, with itemised breakdowns and project timelines."
      instructions={
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>Select your renovation type from the dropdown</li>
          <li>Enter the area in m² or ft² (for area-based projects)</li>
          <li>Choose a quality grade from Budget to Luxury</li>
          <li>Toggle labour inclusion on or off</li>
          <li>Select your location for regional pricing</li>
          <li>Results show min–max range, itemised breakdown and timeline</li>
        </ol>
      }
      testimonial="Before getting contractor quotes for our kitchen remodel I had no idea what a realistic budget looked like. Using TrufflShuffl's Renovation Calculator I selected Mid-range, Metropolitan, and got a range of R80,000–R160,000 — which matched the three quotes I received almost exactly. The itemised breakdown showing materials vs labour vs contingency helped me understand which quotes were overpriced and which were cutting corners on materials. I upgraded to Premium grade for the kitchen and used Budget estimates for the smaller bedroom repaint. Having data-backed numbers completely changed the power dynamic in contractor negotiations. The 15-category dropdown covers everything from pools to braai areas — the most comprehensive renovation tool I've found for South African conditions."
    guide={CALCULATOR_GUIDES['renovation']}
    >
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Units:</span>
          <div className="flex rounded-lg border border-border overflow-hidden">
            {(["metric", "imperial"] as const).map(u => (
              <button key={u} data-testid={`btn-unit-${u}`} onClick={() => setUnit(u)}
                className={`px-4 py-1.5 text-sm capitalize transition-colors ${unit === u ? "bg-primary text-primary-foreground font-semibold" : "text-muted-foreground hover:text-foreground"}`}>
                {u}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5 col-span-2">
            <Label>Renovation Type</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger data-testid="select-type"><SelectValue /></SelectTrigger>
              <SelectContent>{RENOVATION_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Area ({unit === "metric" ? "m²" : "ft²"})</Label>
            <Input data-testid="input-area" type="number" value={area} onChange={e => setArea(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Currency</Label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger data-testid="select-currency"><SelectValue /></SelectTrigger>
              <SelectContent>{CURRENCIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5 col-span-2">
            <Label>Quality Grade</Label>
            <div className="grid grid-cols-4 gap-2">
              {GRADES.map(g => (
                <button key={g.value} data-testid={`btn-grade-${g.value}`} onClick={() => setGrade(g.value as any)}
                  className={`py-2 text-xs rounded-lg border transition-colors ${grade === g.value ? "bg-primary text-primary-foreground border-primary font-semibold" : "border-border text-muted-foreground hover:border-primary/50"}`}>
                  {g.label}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-1.5 col-span-2">
            <Label>Location</Label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger data-testid="select-location"><SelectValue /></SelectTrigger>
              <SelectContent>{LOCATIONS.map(l => <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between col-span-2">
            <Label className="text-sm text-muted-foreground">Include Labour Costs</Label>
            <Switch data-testid="switch-labour" checked={labour} onCheckedChange={setLabour} />
          </div>
        </div>

        <Button data-testid="button-calculate" className="w-full" onClick={calculate}>Estimate Cost</Button>

        {result && (
          <div className="space-y-4 pt-2">
            <div className="bg-background rounded-lg p-4 border border-primary/30">
              <p className="text-xs text-muted-foreground mb-1">Estimated Cost Range</p>
              <p className="font-mono text-2xl font-bold text-primary" data-testid="result-range">
                {fmt(result.minCost, currency)} – {fmt(result.maxCost, currency)}
              </p>
              {currency !== "ZAR" && <p className="text-xs text-muted-foreground mt-1">Currency rates are indicative only</p>}
            </div>

            <div className="bg-background rounded-lg p-4 border border-border space-y-2">
              <p className="text-sm font-semibold text-foreground">Cost Breakdown (mid-point estimate)</p>
              <div className="space-y-2">
                {[
                  { label: "Materials", value: result.materials, color: "bg-primary" },
                  { label: "Labour", value: result.labour, color: "bg-blue-500" },
                  { label: "Contingency (10%)", value: result.contingency, color: "bg-yellow-500/70" },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-sm ${item.color}`} />
                      <span className="text-muted-foreground">{item.label}</span>
                    </span>
                    <span className="font-mono text-foreground">{fmt(item.value, currency)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-background rounded-lg p-4 border border-border">
              <p className="text-sm font-semibold text-foreground mb-1">Estimated Timeline</p>
              <p className="font-mono text-foreground">{result.weeks[0]}–{result.weeks[1]} weeks</p>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
