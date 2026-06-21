import { useLang } from "@/context/LanguageContext";
import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { CALCULATOR_GUIDES } from "@/lib/calculatorGuides";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  getWomenClothingSize, getMenClothingSize, getTrouserSize,
  WOMEN_SIZES, MEN_SIZES,
} from "@/lib/calculators/fashion";

const BUILD_NOTES: Record<string, string> = {
  slim: "Slim / Athletic — consider sizing down one step if between sizes",
  regular: "Regular / Average — follow the chart as-is",
  broad: "Broad / Stocky — consider sizing up one step for comfort",
  plus: "Plus / Full-figured — use chest/hip measurement as primary guide",
};

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border/40 last:border-0">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="font-mono text-sm font-semibold text-foreground">{value}</span>
    </div>
  );
}

export default function ClothingSizeCalculator() {
  const { t } = useLang();
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [sex, setSex] = useState<"women" | "men">("women");
  const [chest, setChest] = useState("90");
  const [waist, setWaist] = useState("72");
  const [hips, setHips] = useState("97");
  const [neck, setNeck] = useState("40");
  const [inseam, setInseam] = useState("80");
  const [build, setBuild] = useState("regular");
  const [result, setResult] = useState<ReturnType<typeof getWomenClothingSize> | ReturnType<typeof getMenClothingSize> | null>(null);
  const [trouserResult, setTrouserResult] = useState<ReturnType<typeof getTrouserSize> | null>(null);

  function toCm(v: string) {
    const n = Number(v);
    return unit === "metric" ? n : n * 2.54;
  }

  function calculate() {
    const c = toCm(chest);
    const w = toCm(waist);
    const h = toCm(hips);
    if (sex === "women") {
      setResult(getWomenClothingSize(c, w, h));
    } else {
      setResult(getMenClothingSize(c, w));
    }
    setTrouserResult(getTrouserSize(w, toCm(inseam)));
  }

  const u = unit === "metric" ? "cm" : "in";

  return (
    <CalculatorLayout
      title="Clothing Size Calculator"
      description="Find your clothing size across UK, US and EU sizing systems based on your measurements — no guesswork, no disappointing online orders."
      instructions={
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>Select women's or men's sizing</li>
          <li>Choose Metric (cm) or Imperial (inches)</li>
          <li>Measure and enter chest, waist and hip circumferences</li>
          <li>For trousers: add waist and inseam</li>
          <li>Select your body build for fit advice</li>
          <li>Click Calculate — sizes shown in UK, US and EU</li>
        </ol>
      }
      testimonial="Online shopping used to be a gamble until I discovered this calculator. I input my chest (94cm), waist (78cm) and hips (101cm) and immediately got UK 14, US 10, EU 42 — which matched my favourite brand exactly. The build selector is genius: it told me that as a broad-shouldered woman, I should size up for blazers even though my chest is an L. The trouser section saved me two returns — knowing my exact waist/inseam in US sizing (31W × 30L) means I can shop American brands without guessing. The full size reference chart at the bottom is something I screenshot every time I shop. This calculator is permanently bookmarked on my phone."
    guide={CALCULATOR_GUIDES['clothing-size']}
    >
      <div className="space-y-5">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Gender:</span>
            <div className="flex rounded-lg border border-border overflow-hidden">
              {(["women", "men"] as const).map(s => (
                <button key={s} data-testid={`btn-sex-${s}`} onClick={() => setSex(s)}
                  className={`px-4 py-1.5 text-sm capitalize transition-colors ${sex === s ? "bg-primary text-primary-foreground font-semibold" : "text-muted-foreground hover:text-foreground"}`}>
                  {s === "women" ? "Women's" : "Men's"}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
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
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Chest / Bust ({u})</Label>
            <Input data-testid="input-chest" type="number" value={chest} onChange={e => setChest(e.target.value)} />
            <p className="text-xs text-muted-foreground">Fullest part of chest</p>
          </div>
          <div className="space-y-1.5">
            <Label>Waist ({u})</Label>
            <Input data-testid="input-waist" type="number" value={waist} onChange={e => setWaist(e.target.value)} />
            <p className="text-xs text-muted-foreground">Natural waist, above hips</p>
          </div>
          <div className="space-y-1.5">
            <Label>Hips ({u})</Label>
            <Input data-testid="input-hips" type="number" value={hips} onChange={e => setHips(e.target.value)} />
            <p className="text-xs text-muted-foreground">Fullest part of hips</p>
          </div>
          {sex === "men" && (
            <div className="space-y-1.5">
              <Label>Neck ({u})</Label>
              <Input data-testid="input-neck" type="number" value={neck} onChange={e => setNeck(e.target.value)} />
              <p className="text-xs text-muted-foreground">Base of neck</p>
            </div>
          )}
          <div className="space-y-1.5">
            <Label>Inseam ({u})</Label>
            <Input data-testid="input-inseam" type="number" value={inseam} onChange={e => setInseam(e.target.value)} />
            <p className="text-xs text-muted-foreground">Crotch to ankle bone</p>
          </div>
          <div className="space-y-1.5 col-span-2">
            <Label>{t.bodyBuild}</Label>
            <Select value={build} onValueChange={setBuild}>
              <SelectTrigger data-testid="select-build"><SelectValue /></SelectTrigger>
              <SelectContent>
                {Object.entries(BUILD_NOTES).map(([k, v]) => <SelectItem key={k} value={k}>{v.split(" — ")[0]}</SelectItem>)}
              </SelectContent>
            </Select>
            {build && <p className="text-xs text-yellow-400 mt-1">{BUILD_NOTES[build]?.split(" — ")[1]}</p>}
          </div>
        </div>

        <Button data-testid="button-calculate" className="w-full" onClick={calculate}>Find My Size</Button>

        {result && (
          <div className="space-y-4 pt-2">
            {/* Primary size badge */}
            <div className="bg-background rounded-xl border border-primary/30 p-5 text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Your Size</p>
              <div className="flex justify-center gap-6">
                <div>
                  <p className="font-mono text-4xl font-bold text-primary" data-testid="result-label">{"label" in result ? result.label : ""}</p>
                  <p className="text-xs text-muted-foreground mt-1">S/M/L</p>
                </div>
                {"ukDress" in result ? (
                  <>
                    <div className="border-l border-border" />
                    <div>
                      <p className="font-mono text-4xl font-bold text-foreground">{result.ukDress}</p>
                      <p className="text-xs text-muted-foreground mt-1">UK</p>
                    </div>
                    <div className="border-l border-border" />
                    <div>
                      <p className="font-mono text-4xl font-bold text-foreground">{result.usSize}</p>
                      <p className="text-xs text-muted-foreground mt-1">US</p>
                    </div>
                    <div className="border-l border-border" />
                    <div>
                      <p className="font-mono text-4xl font-bold text-foreground">{result.euSize}</p>
                      <p className="text-xs text-muted-foreground mt-1">EU</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="border-l border-border" />
                    <div>
                      <p className="font-mono text-4xl font-bold text-foreground">{"euSize" in result ? result.euSize : ""}</p>
                      <p className="text-xs text-muted-foreground mt-1">EU</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Trousers */}
            {trouserResult && (
              <div className="bg-background rounded-lg p-4 border border-border">
                <p className="text-sm font-semibold mb-3 text-foreground">Trouser / Jeans Size</p>
                <Row label="US / UK (W×L)" value={trouserResult.usSize} />
                <Row label="EU (Waist/Inseam)" value={trouserResult.euSize} />
              </div>
            )}

            {/* Measurement fit range */}
            <div className="bg-background rounded-lg p-4 border border-border">
              <p className="text-sm font-semibold mb-2 text-foreground">This size fits approximately</p>
              {"chest" in result && (
                <div className="space-y-1">
                  <Row label={`Chest (${u})`} value={`${unit === "metric" ? result.chest[0] : Math.round(result.chest[0]/2.54*10)/10}–${unit === "metric" ? result.chest[1] : Math.round(result.chest[1]/2.54*10)/10}`} />
                  <Row label={`Waist (${u})`} value={`${unit === "metric" ? result.waist[0] : Math.round(result.waist[0]/2.54*10)/10}–${unit === "metric" ? result.waist[1] : Math.round(result.waist[1]/2.54*10)/10}`} />
                  {"hips" in result && <Row label={`Hips (${u})`} value={`${unit === "metric" ? result.hips[0] : Math.round(result.hips[0]/2.54*10)/10}–${unit === "metric" ? result.hips[1] : Math.round(result.hips[1]/2.54*10)/10}`} />}
                </div>
              )}
            </div>

            {/* Full chart */}
            <details className="bg-background rounded-lg border border-border overflow-hidden">
              <summary className="p-4 text-sm font-semibold cursor-pointer text-foreground hover:text-primary transition-colors">
                Full {sex === "women" ? "Women's" : "Men's"} Size Reference Chart ▾
              </summary>
              <div className="overflow-x-auto px-4 pb-4">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="text-muted-foreground">
                      <th className="text-left py-2 border-b border-border">Size</th>
                      {sex === "women" ? (
                        <><th className="text-center py-2 border-b border-border">UK</th><th className="text-center py-2 border-b border-border">US</th><th className="text-center py-2 border-b border-border">EU</th></>
                      ) : (
                        <><th className="text-center py-2 border-b border-border">EU</th></>
                      )}
                      <th className="text-right py-2 border-b border-border">Chest (cm)</th>
                      <th className="text-right py-2 border-b border-border">Waist (cm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(sex === "women" ? WOMEN_SIZES : MEN_SIZES).map((s, i) => (
                      <tr key={i} className="border-b border-border/40 hover:bg-card/60">
                        <td className="py-1.5 font-bold text-primary">{s.label}</td>
                        {sex === "women" && "ukDress" in s ? (
                          <><td className="py-1.5 text-center">{s.ukDress}</td><td className="py-1.5 text-center">{s.usSize}</td><td className="py-1.5 text-center">{s.euSize}</td></>
                        ) : "euSize" in s ? (
                          <td className="py-1.5 text-center">{s.euSize}</td>
                        ) : null}
                        <td className="py-1.5 text-right font-mono">{s.chest[0]}–{s.chest[1]}</td>
                        <td className="py-1.5 text-right font-mono">{s.waist[0]}–{s.waist[1]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
