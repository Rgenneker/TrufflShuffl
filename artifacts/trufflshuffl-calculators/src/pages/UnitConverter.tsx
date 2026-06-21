import { useLang } from "@/context/LanguageContext";
import { useState, useEffect } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { CALCULATOR_GUIDES } from "@/lib/calculatorGuides";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CONVERSION_CATEGORIES, convert, formatResult } from "@/lib/calculators/conversions";
import { ArrowLeftRight } from "lucide-react";

const CATEGORY_ICONS: Record<string, string> = {
  "Length": "📏", "Weight / Mass": "⚖️", "Temperature": "🌡️",
  "Volume": "🫙", "Area": "⬛", "Speed": "⚡",
  "Pressure": "🔵", "Energy": "⚡", "Data Storage": "💾",
  "Time": "⏱️", "Angle": "📐", "Fuel Efficiency": "⛽",
};

export default function UnitConverter() {
  const { t } = useLang();
  const [catName, setCatName] = useState("Length");
  const [fromIdx, setFromIdx] = useState(4); // Metre
  const [toIdx, setToIdx] = useState(3);     // Centimetre
  const [inputVal, setInputVal] = useState("1");
  const [result, setResult] = useState<string>("");

  const cat = CONVERSION_CATEGORIES.find(c => c.name === catName)!;

  function doConvert(val: string, from: number, to: number, cat: typeof CONVERSION_CATEGORIES[0]) {
    const n = Number(val);
    if (isNaN(n)) { setResult(""); return; }
    const fromUnit = cat.units[from];
    const toUnit = cat.units[to];
    if (!fromUnit || !toUnit) return;
    const isTemp = cat.name === "Temperature";
    const res = convert(n, fromUnit, toUnit, isTemp);
    setResult(formatResult(res));
  }

  useEffect(() => {
    // Reset indices when category changes
    const c = CONVERSION_CATEGORIES.find(c => c.name === catName)!;
    const defaultFrom: Record<string, number> = {
      "Length": 4, "Weight / Mass": 3, "Temperature": 0,
      "Volume": 3, "Area": 2, "Speed": 1,
    };
    const fi = defaultFrom[catName] ?? 1;
    const ti = fi + 1 < c.units.length ? fi + 1 : 0;
    setFromIdx(fi);
    setToIdx(ti);
    setResult("");
  }, [catName]);

  useEffect(() => {
    doConvert(inputVal, fromIdx, toIdx, cat);
  }, [inputVal, fromIdx, toIdx, catName]);

  function swap() {
    const prev = fromIdx;
    setFromIdx(toIdx);
    setToIdx(prev);
  }

  const fromUnit = cat.units[fromIdx];
  const toUnit = cat.units[toIdx];

  return (
    <CalculatorLayout
      title="Unit Converter"
      description="Convert between any metric and imperial unit across 12 categories — length, weight, temperature, volume, area, speed, pressure, energy, data, time, angle and fuel efficiency."
      instructions={
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>Select a category from the grid</li>
          <li>Choose your source unit (From)</li>
          <li>Choose your target unit (To)</li>
          <li>Type your value — result updates instantly</li>
          <li>Use the swap button ⇆ to reverse the conversion</li>
          <li>All conversions are calculated to 6 significant figures</li>
        </ol>
      }
      testimonial="I work in international logistics and unit conversions are a daily necessity. This converter has replaced four separate tools I used to switch between. The temperature converter is correctly handling all four scales including Rankine, which most free tools ignore. The data storage converter has saved me from embarrassing client errors when quoting gigabytes vs gibibytes. The fuel efficiency section is a bonus — being able to explain to a European client that their 6L/100km car gets 47 MPG in terms they understand has closed deals. The fact that it updates in real-time as I type is the detail that makes the difference. I've installed it as a PWA shortcut on all my work devices."
    guide={CALCULATOR_GUIDES['units']}
    >
      <div className="space-y-5">
        {/* Category grid */}
        <div>
          <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-3 block">Category</Label>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {CONVERSION_CATEGORIES.map(c => (
              <button
                key={c.name}
                data-testid={`btn-cat-${c.name.toLowerCase().replace(/[^a-z]/g, "-")}`}
                onClick={() => setCatName(c.name)}
                className={`rounded-lg border py-2 px-2 text-xs transition-all text-center ${catName === c.name ? "bg-primary text-primary-foreground border-primary font-semibold" : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"}`}
              >
                <span className="block text-lg leading-none mb-1">{CATEGORY_ICONS[c.name] ?? "🔢"}</span>
                {c.name.replace(" / Mass", "").replace(" Efficiency", "")}
              </button>
            ))}
          </div>
        </div>

        {/* Converter panel */}
        <div className="bg-background rounded-xl border border-border p-4 space-y-4">
          <div className="flex items-end gap-3">
            {/* From */}
            <div className="flex-1 space-y-1.5">
              <Label>{t.fromLabel}</Label>
              <Select
                value={String(fromIdx)}
                onValueChange={v => setFromIdx(Number(v))}
              >
                <SelectTrigger data-testid="select-from"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {cat.units.map((u, i) => (
                    <SelectItem key={u.name} value={String(i)}>{u.name} ({u.symbol})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                data-testid="input-value"
                type="number"
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                placeholder="Enter value"
                className="font-mono text-lg"
              />
              {fromUnit && <p className="text-xs text-muted-foreground font-mono">{inputVal || "0"} {fromUnit.symbol}</p>}
            </div>

            {/* Swap */}
            <button
              data-testid="button-swap"
              onClick={swap}
              className="mb-9 p-2 rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
              title="Swap units"
            >
              <ArrowLeftRight className="w-4 h-4" />
            </button>

            {/* To */}
            <div className="flex-1 space-y-1.5">
              <Label>{t.toLabel}</Label>
              <Select
                value={String(toIdx)}
                onValueChange={v => setToIdx(Number(v))}
              >
                <SelectTrigger data-testid="select-to"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {cat.units.map((u, i) => (
                    <SelectItem key={u.name} value={String(i)}>{u.name} ({u.symbol})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="bg-primary/10 border border-primary/30 rounded-lg px-3 py-2 min-h-[40px] flex items-center">
                <span className="font-mono text-lg font-bold text-primary" data-testid="result-value">
                  {result || "—"}
                </span>
              </div>
              {toUnit && result && <p className="text-xs text-muted-foreground font-mono">{result} {toUnit.symbol}</p>}
            </div>
          </div>

          {/* Formula display */}
          {fromUnit && toUnit && result && inputVal && (
            <div className="bg-card rounded-lg p-3 border border-border">
              <p className="text-xs text-muted-foreground font-mono">
                {inputVal} {fromUnit.symbol} = <span className="text-primary font-bold">{result} {toUnit.symbol}</span>
              </p>
            </div>
          )}
        </div>

        {/* Quick reference: all conversions from current 'from' unit */}
        {fromUnit && (
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
              Quick reference — {inputVal || "1"} {fromUnit.symbol} in all {catName.toLowerCase()} units
            </p>
            <div className="grid grid-cols-2 gap-2">
              {cat.units.map((u, i) => {
                if (i === fromIdx) return null;
                const isTemp = cat.name === "Temperature";
                const v = convert(Number(inputVal) || 1, fromUnit, u, isTemp);
                const formatted = formatResult(v);
                return (
                  <div key={u.name}
                    onClick={() => setToIdx(i)}
                    className="bg-background rounded-lg border border-border p-3 cursor-pointer hover:border-primary/50 transition-colors"
                    data-testid={`quick-${u.symbol.replace(/[^a-zA-Z]/g, "")}`}
                  >
                    <p className="text-xs text-muted-foreground">{u.name}</p>
                    <p className="font-mono text-sm font-bold text-foreground">{formatted} <span className="text-muted-foreground font-normal">{u.symbol}</span></p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
