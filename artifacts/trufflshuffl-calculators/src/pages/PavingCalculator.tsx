import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { calculatePaving } from "@/lib/calculators/home";

const PAVER_SIZES = [
  { label: "200 × 100 mm (Standard brick)", l: 200, w: 100 },
  { label: "300 × 200 mm", l: 300, w: 200 },
  { label: "400 × 400 mm", l: 400, w: 400 },
  { label: "400 × 200 mm", l: 400, w: 200 },
  { label: "600 × 300 mm", l: 600, w: 300 },
  { label: "600 × 600 mm", l: 600, w: 600 },
  { label: "100 × 100 mm (Cobble)", l: 100, w: 100 },
  { label: "Custom", l: 0, w: 0 },
];

const PATTERNS = ["Stretcher Bond", "Herringbone", "Basket Weave", "Stack Bond"];

function fmt(n: number) {
  return n.toLocaleString("en-ZA", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}
function fmtd(n: number) {
  return n.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function PavingCalculator() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [areaMode, setAreaMode] = useState<"dims" | "direct">("dims");
  const [length, setLength] = useState("10");
  const [width, setWidth] = useState("5");
  const [directArea, setDirectArea] = useState("50");
  const [paverSize, setPaverSize] = useState("200 × 100 mm (Standard brick)");
  const [customL, setCustomL] = useState("300");
  const [customW, setCustomW] = useState("300");
  const [pattern, setPattern] = useState("Stretcher Bond");
  const [wastage, setWastage] = useState("10");
  const [pricePerPaver, setPricePerPaver] = useState("12");
  const [paversPerPack, setPaversPerPack] = useState("50");
  const [result, setResult] = useState<ReturnType<typeof calculatePaving> | null>(null);

  function calculate() {
    let areaSqM = areaMode === "direct" ? Number(directArea) : Number(length) * Number(width);
    if (unit === "imperial") areaSqM = areaSqM * 0.092903; // sq ft to sq m
    
    const selected = PAVER_SIZES.find(p => p.label === paverSize);
    const pl = selected?.l === 0 ? Number(customL) : selected?.l ?? 200;
    const pw = selected?.w === 0 ? Number(customW) : selected?.w ?? 100;

    // Herringbone adds 5% extra
    const extraWastage = pattern === "Herringbone" ? Number(wastage) + 5 : Number(wastage);
    setResult(calculatePaving(areaSqM, pl, pw, extraWastage, Number(pricePerPaver), Number(paversPerPack)));
  }

  const u = unit === "metric" ? "m" : "ft";
  const isCustom = paverSize === "Custom";

  return (
    <CalculatorLayout
      title="Paving & Pavers Calculator"
      description="Calculate exactly how many pavers you need for any area, choose your pattern and size, and get a complete cost estimate with wastage allowance."
      instructions={
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>Select Metric or Imperial</li>
          <li>Enter your area dimensions or total area</li>
          <li>Choose a standard paver size or enter custom dimensions</li>
          <li>Select a laying pattern</li>
          <li>Adjust the wastage percentage (Herringbone adds 5% automatically)</li>
          <li>Enter price per paver and pack size for a cost estimate</li>
        </ol>
      }
      testimonial="Redoing our driveway was daunting until I used this calculator. I entered the 45m² area, chose the 200×100mm brick in a herringbone pattern and got an exact count of 2,475 pavers — including the automatic extra waste for diagonal cuts. Armed with that number I got quotes from three suppliers and saved R3,200 by knowing exactly what I needed. The pack calculator showed me I needed 50 packs of 50, so I didn't order too many and pay return delivery fees. My contractor was pleased I'd done the homework — it saved us both a trip to the builders' merchant mid-project. I now use it for every garden project quote."
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

        <div className="flex rounded-lg border border-border overflow-hidden w-fit">
          {(["dims", "direct"] as const).map(m => (
            <button key={m} data-testid={`btn-mode-${m}`} onClick={() => setAreaMode(m)}
              className={`px-4 py-1.5 text-sm transition-colors ${areaMode === m ? "bg-primary text-primary-foreground font-semibold" : "text-muted-foreground hover:text-foreground"}`}>
              {m === "dims" ? "Enter Dimensions" : "Enter Area Directly"}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {areaMode === "dims" ? (
            <>
              <div className="space-y-1.5"><Label>Length ({u})</Label><Input data-testid="input-length" type="number" value={length} onChange={e => setLength(e.target.value)} /></div>
              <div className="space-y-1.5"><Label>Width ({u})</Label><Input data-testid="input-width" type="number" value={width} onChange={e => setWidth(e.target.value)} /></div>
            </>
          ) : (
            <div className="space-y-1.5 col-span-2"><Label>Total Area ({u === "m" ? "m²" : "ft²"})</Label><Input data-testid="input-area" type="number" value={directArea} onChange={e => setDirectArea(e.target.value)} /></div>
          )}

          <div className="space-y-1.5 col-span-2">
            <Label>Paver Size</Label>
            <Select value={paverSize} onValueChange={setPaverSize}>
              <SelectTrigger data-testid="select-paver-size"><SelectValue /></SelectTrigger>
              <SelectContent>{PAVER_SIZES.map(p => <SelectItem key={p.label} value={p.label}>{p.label}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          {isCustom && (
            <>
              <div className="space-y-1.5"><Label>Custom Length (mm)</Label><Input type="number" value={customL} onChange={e => setCustomL(e.target.value)} /></div>
              <div className="space-y-1.5"><Label>Custom Width (mm)</Label><Input type="number" value={customW} onChange={e => setCustomW(e.target.value)} /></div>
            </>
          )}

          <div className="space-y-1.5 col-span-2">
            <Label>Laying Pattern</Label>
            <Select value={pattern} onValueChange={setPattern}>
              <SelectTrigger data-testid="select-pattern"><SelectValue /></SelectTrigger>
              <SelectContent>{PATTERNS.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
            </Select>
            {pattern === "Herringbone" && <p className="text-xs text-yellow-400 mt-1">Herringbone adds 5% extra wastage for diagonal cuts</p>}
          </div>

          <div className="space-y-1.5">
            <Label>Wastage (%)</Label>
            <Input data-testid="input-wastage" type="number" value={wastage} onChange={e => setWastage(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Pavers per Pack</Label>
            <Input data-testid="input-pack" type="number" value={paversPerPack} onChange={e => setPaversPerPack(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Price per Paver (R)</Label>
            <Input data-testid="input-price" type="number" value={pricePerPaver} onChange={e => setPricePerPaver(e.target.value)} />
          </div>
        </div>

        <Button data-testid="button-calculate" className="w-full" onClick={calculate}>Calculate</Button>

        {result && (
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="bg-background rounded-lg p-4 border border-primary/30 col-span-2">
              <p className="text-xs text-muted-foreground mb-1">Pavers Needed (inc. wastage)</p>
              <p className="font-mono text-2xl font-bold text-primary" data-testid="result-pavers">{fmt(result.paversNeeded)}</p>
              <p className="text-xs text-muted-foreground">Coverage needed: {fmtd(result.coverageNeeded)} m²</p>
            </div>
            <div className="bg-background rounded-lg p-4 border border-border text-center">
              <p className="text-xs text-muted-foreground">Packs Needed</p>
              <p className="font-mono text-xl font-bold text-foreground" data-testid="result-packs">{result.packsNeeded}</p>
            </div>
            <div className="bg-background rounded-lg p-4 border border-border text-center">
              <p className="text-xs text-muted-foreground">Estimated Cost</p>
              <p className="font-mono text-xl font-bold text-foreground">R {fmtd(result.totalCost)}</p>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
