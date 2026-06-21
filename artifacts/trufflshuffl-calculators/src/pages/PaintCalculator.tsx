import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { CALCULATOR_GUIDES } from "@/lib/calculatorGuides";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { calculatePaint } from "@/lib/calculators/home";

const PAINT_TYPES = [
  "Interior Matt", "Interior Silk", "Interior Gloss",
  "Exterior", "Damp-proof primer", "Ceiling white",
];

function fmt(n: number, dec = 1) {
  return n.toLocaleString("en-ZA", { minimumFractionDigits: dec, maximumFractionDigits: dec });
}

export default function PaintCalculator() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [volUnit, setVolUnit] = useState<"litres" | "gallons">("litres");
  const [wallArea, setWallArea] = useState("50");
  const [doors, setDoors] = useState("2");
  const [windows, setWindows] = useState("3");
  const [coats, setCoats] = useState("2");
  const [paintType, setPaintType] = useState("Interior Matt");
  const [price, setPrice] = useState("150");
  const [includeCeiling, setIncludeCeiling] = useState(false);
  const [ceilingArea, setCeilingArea] = useState("20");
  const [result, setResult] = useState<ReturnType<typeof calculatePaint> | null>(null);

  function calculate() {
    let area = Number(wallArea);
    let ceil = Number(ceilingArea);
    if (unit === "imperial") {
      area = area * 0.092903;
      ceil = ceil * 0.092903;
    }
    let priceL = Number(price);
    if (volUnit === "gallons") priceL = priceL / 3.78541;
    setResult(calculatePaint(area, Number(doors), Number(windows), Number(coats), paintType, priceL, includeCeiling, ceil));
  }

  const u = unit === "metric" ? "m²" : "ft²";

  return (
    <CalculatorLayout
      title="Paint Calculator"
      description="Calculate exactly how many litres or gallons of paint you need, determine the optimal tin sizes to buy, and get a total cost estimate for any room."
      instructions={
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>Select Metric or Imperial</li>
          <li>Enter your total wall area (length × height of all walls combined)</li>
          <li>Specify number of doors and windows for deductions</li>
          <li>Choose number of coats and paint type</li>
          <li>Toggle ceiling paint inclusion if needed</li>
          <li>Enter price per litre or gallon for a cost estimate</li>
        </ol>
      }
      testimonial="Painting our open-plan living room and kitchen was a big job and I was terrified of buying too much — or too little. This calculator let me enter the combined wall area, subtract my 4 doors and 6 windows, add the ceiling, and immediately know I needed 22 litres of interior silk for two coats. The tin optimiser showed me to buy one 20L tin and one 5L tin rather than four 5L tins, saving R180. Knowing the exact coverage per litre also helped me choose between two similar paints — the cheaper one had lower coverage, making it more expensive per m². It's changed how I shop for paint permanently. Professional decorators I've spoken to say this is how they quote too."
    guide={CALCULATOR_GUIDES['paint']}
    >
      <div className="space-y-5">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Dimensions:</span>
            <div className="flex rounded-lg border border-border overflow-hidden">
              {(["metric", "imperial"] as const).map(u => (
                <button key={u} data-testid={`btn-unit-${u}`} onClick={() => setUnit(u)}
                  className={`px-3 py-1.5 text-xs capitalize transition-colors ${unit === u ? "bg-primary text-primary-foreground font-semibold" : "text-muted-foreground hover:text-foreground"}`}>
                  {u}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Volume:</span>
            <div className="flex rounded-lg border border-border overflow-hidden">
              {(["litres", "gallons"] as const).map(v => (
                <button key={v} data-testid={`btn-vol-${v}`} onClick={() => setVolUnit(v)}
                  className={`px-3 py-1.5 text-xs capitalize transition-colors ${volUnit === v ? "bg-primary text-primary-foreground font-semibold" : "text-muted-foreground hover:text-foreground"}`}>
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5 col-span-2">
            <Label>Total Wall Area ({u}) — all walls combined</Label>
            <Input data-testid="input-wall-area" type="number" value={wallArea} onChange={e => setWallArea(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Number of Doors</Label>
            <Input data-testid="input-doors" type="number" value={doors} onChange={e => setDoors(e.target.value)} min="0" />
            <p className="text-xs text-muted-foreground">Std 2.1m × 0.9m each</p>
          </div>
          <div className="space-y-1.5">
            <Label>Number of Windows</Label>
            <Input data-testid="input-windows" type="number" value={windows} onChange={e => setWindows(e.target.value)} min="0" />
            <p className="text-xs text-muted-foreground">Std 1.2m × 1.2m each</p>
          </div>
          <div className="space-y-1.5">
            <Label>Number of Coats</Label>
            <Select value={coats} onValueChange={setCoats}>
              <SelectTrigger data-testid="select-coats"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 coat</SelectItem>
                <SelectItem value="2">2 coats</SelectItem>
                <SelectItem value="3">3 coats</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Paint Type</Label>
            <Select value={paintType} onValueChange={setPaintType}>
              <SelectTrigger data-testid="select-paint-type"><SelectValue /></SelectTrigger>
              <SelectContent>{PAINT_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Price per {volUnit === "litres" ? "Litre" : "Gallon"} (R)</Label>
            <Input data-testid="input-price" type="number" value={price} onChange={e => setPrice(e.target.value)} />
          </div>

          <div className="flex items-center justify-between col-span-2">
            <Label className="text-sm text-muted-foreground">Include Ceiling</Label>
            <Switch data-testid="switch-ceiling" checked={includeCeiling} onCheckedChange={setIncludeCeiling} />
          </div>
          {includeCeiling && (
            <div className="space-y-1.5 col-span-2">
              <Label>Ceiling Area ({u})</Label>
              <Input data-testid="input-ceiling" type="number" value={ceilingArea} onChange={e => setCeilingArea(e.target.value)} />
            </div>
          )}
        </div>

        <Button data-testid="button-calculate" className="w-full" onClick={calculate}>Calculate</Button>

        {result && (
          <div className="space-y-4 pt-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-background rounded-lg p-4 border border-primary/30 col-span-2">
                <p className="text-xs text-muted-foreground mb-1">Paint Needed</p>
                <p className="font-mono text-2xl font-bold text-primary" data-testid="result-litres">
                  {fmt(volUnit === "litres" ? result.litresNeeded : result.litresNeeded / 3.78541)} {volUnit}
                </p>
                <p className="text-xs text-muted-foreground">Net area: {fmt(result.netWallArea)} m² | Total with {coats} coat(s): {fmt(result.totalArea)} m²</p>
                <p className="text-xs text-muted-foreground">Coverage: {result.coverage} m²/L</p>
              </div>
            </div>

            <div className="bg-background rounded-lg p-4 border border-border">
              <p className="text-sm font-semibold mb-2 text-foreground">Optimal Tin Combination</p>
              <div className="space-y-1 text-xs text-muted-foreground">
                {result.tins20 > 0 && <p><strong className="text-foreground">{result.tins20}×</strong> 20L tin(s)</p>}
                {result.tins5 > 0 && <p><strong className="text-foreground">{result.tins5}×</strong> 5L tin(s)</p>}
                {result.tins1 > 0 && <p><strong className="text-foreground">{result.tins1}×</strong> 1L tin(s)</p>}
              </div>
              {Number(price) > 0 && (
                <p className="mt-2 text-sm font-semibold text-foreground">Estimated Cost: <span className="text-primary font-mono">R {fmt(result.totalTinCost)}</span></p>
              )}
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
