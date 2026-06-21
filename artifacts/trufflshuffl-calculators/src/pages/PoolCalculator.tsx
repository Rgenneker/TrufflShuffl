import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { CALCULATOR_GUIDES } from "@/lib/calculatorGuides";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { calculatePoolVolume } from "@/lib/calculators/home";

function fmt(n: number, dec = 0) {
  return n.toLocaleString("en-ZA", { minimumFractionDigits: dec, maximumFractionDigits: dec });
}

export default function PoolCalculator() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [shape, setShape] = useState("rectangle");
  const [dims, setDims] = useState<Record<string, string>>({
    length: "10", width: "5", depth: "1.5",
    diameter: "8", l1: "8", w1: "4", l2: "4", w2: "3",
  });
  const [result, setResult] = useState<ReturnType<typeof calculatePoolVolume> | null>(null);

  function setDim(k: string, v: string) { setDims(d => ({ ...d, [k]: v })); }

  function calculate() {
    const numDims = Object.fromEntries(Object.entries(dims).map(([k, v]) => [k, Number(v)]));
    setResult(calculatePoolVolume(shape, numDims, unit === "metric"));
  }

  const u = unit === "metric" ? "m" : "ft";

  return (
    <CalculatorLayout
      title="Pool Size Calculator"
      description="Calculate your pool's exact water volume in litres, cubic metres and gallons — plus fill time, water weight and basic chlorine dosing guidance."
      instructions={
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>Select Metric or Imperial</li>
          <li>Choose your pool shape</li>
          <li>Enter the pool dimensions</li>
          <li>Click Calculate to get volume, weight and fill time</li>
          <li>Use the results to guide chemical dosing</li>
        </ol>
      }
      testimonial="Pool maintenance is much less stressful since I found this calculator. I used to guess how many chlorine tablets to add, which led to cloudy water and irritated eyes. Entering my pool's exact dimensions — a 9m × 4m rectangle, 1.6m deep — gave me 57,600 litres and a precise chlorine starting dose. The fill time estimate (67 hours at 15L/min) helped me plan our annual refill around water restrictions. My pool contractor was impressed I already knew the volume when he quoted for a heat pump. The gallon conversion is handy when reading American pool chemistry guides. I've bookmarked this page and use it every time I open or close the pool for the season."
    guide={CALCULATOR_GUIDES['pool']}
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

        <div className="space-y-1.5">
          <Label>Pool Shape</Label>
          <Select value={shape} onValueChange={setShape}>
            <SelectTrigger data-testid="select-shape"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="rectangle">Rectangle</SelectItem>
              <SelectItem value="oval">Oval / Ellipse</SelectItem>
              <SelectItem value="circle">Circle / Round</SelectItem>
              <SelectItem value="lshape">L-Shape</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {shape === "rectangle" && <>
            <div className="space-y-1.5"><Label>Length ({u})</Label><Input data-testid="input-length" type="number" value={dims.length} onChange={e => setDim("length", e.target.value)} /></div>
            <div className="space-y-1.5"><Label>Width ({u})</Label><Input data-testid="input-width" type="number" value={dims.width} onChange={e => setDim("width", e.target.value)} /></div>
            <div className="space-y-1.5 col-span-2"><Label>Avg Depth ({u})</Label><Input data-testid="input-depth" type="number" value={dims.depth} onChange={e => setDim("depth", e.target.value)} /></div>
          </>}
          {shape === "oval" && <>
            <div className="space-y-1.5"><Label>Length ({u})</Label><Input type="number" value={dims.length} onChange={e => setDim("length", e.target.value)} /></div>
            <div className="space-y-1.5"><Label>Width ({u})</Label><Input type="number" value={dims.width} onChange={e => setDim("width", e.target.value)} /></div>
            <div className="space-y-1.5 col-span-2"><Label>Avg Depth ({u})</Label><Input type="number" value={dims.depth} onChange={e => setDim("depth", e.target.value)} /></div>
          </>}
          {shape === "circle" && <>
            <div className="space-y-1.5 col-span-2"><Label>Diameter ({u})</Label><Input type="number" value={dims.diameter} onChange={e => setDim("diameter", e.target.value)} /></div>
            <div className="space-y-1.5 col-span-2"><Label>Avg Depth ({u})</Label><Input type="number" value={dims.depth} onChange={e => setDim("depth", e.target.value)} /></div>
          </>}
          {shape === "lshape" && <>
            <div className="space-y-1.5"><Label>Section 1 Length ({u})</Label><Input type="number" value={dims.l1} onChange={e => setDim("l1", e.target.value)} /></div>
            <div className="space-y-1.5"><Label>Section 1 Width ({u})</Label><Input type="number" value={dims.w1} onChange={e => setDim("w1", e.target.value)} /></div>
            <div className="space-y-1.5"><Label>Section 2 Length ({u})</Label><Input type="number" value={dims.l2} onChange={e => setDim("l2", e.target.value)} /></div>
            <div className="space-y-1.5"><Label>Section 2 Width ({u})</Label><Input type="number" value={dims.w2} onChange={e => setDim("w2", e.target.value)} /></div>
            <div className="space-y-1.5 col-span-2"><Label>Avg Depth ({u})</Label><Input type="number" value={dims.depth} onChange={e => setDim("depth", e.target.value)} /></div>
          </>}
        </div>

        <Button data-testid="button-calculate" className="w-full" onClick={calculate}>Calculate Volume</Button>

        {result && (
          <div className="space-y-4 pt-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-background rounded-lg p-4 border border-primary/30 col-span-2">
                <p className="text-xs text-muted-foreground mb-1">Volume</p>
                <p className="font-mono text-2xl font-bold text-primary" data-testid="result-litres">{fmt(result.litres)} litres</p>
                <p className="text-xs text-muted-foreground">{fmt(result.volumeM3, 2)} m³</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground">US Gallons</p>
                <p className="font-mono font-bold text-foreground">{fmt(result.usGallons)}</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground">UK Gallons</p>
                <p className="font-mono font-bold text-foreground">{fmt(result.ukGallons)}</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground">Water Weight</p>
                <p className="font-mono font-bold text-foreground">{fmt(result.weightKg)} kg</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground">Surface Area</p>
                <p className="font-mono font-bold text-foreground">{fmt(result.surfaceM2, 1)} m²</p>
              </div>
            </div>
            <div className="bg-background rounded-lg p-4 border border-border">
              <p className="text-sm font-semibold mb-2 text-foreground">Fill & Chemicals</p>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>Fill time at 15L/min: <strong className="text-foreground">{Math.floor(result.fillMinutes / 60)}h {Math.round(result.fillMinutes % 60)}m</strong></p>
                <p>Initial chlorine dose (70% granular): <strong className="text-foreground">{fmt(result.litres / 1000 * result.chlorinePer1000L, 0)}g</strong> ({result.chlorinePer1000L}g per 1,000L)</p>
                <p className="text-yellow-400/80">Note: Always follow your pool professional's chemical guidance. These are starting estimates only.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
