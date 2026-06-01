import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getShoeSize, getShoeWidthLabel, SHOE_SIZE_TABLE } from "@/lib/calculators/fashion";

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border/40 last:border-0">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className={`font-mono text-sm font-bold ${highlight ? "text-primary" : "text-foreground"}`}>{value}</span>
    </div>
  );
}

export default function ShoeSizeCalculator() {
  const [unit, setUnit] = useState<"mm" | "cm" | "in">("mm");
  const [sex, setSex] = useState<"men" | "women" | "children">("men");
  const [length, setLength] = useState("265");
  const [width, setWidth] = useState("96");
  const [result, setResult] = useState<ReturnType<typeof getShoeSize>>(null);
  const [widthLabel, setWidthLabel] = useState<string | null>(null);

  function calculate() {
    let lengthMm = Number(length);
    if (unit === "cm") lengthMm = lengthMm * 10;
    if (unit === "in") lengthMm = lengthMm * 25.4;
    const widthMm = Number(width) * (unit === "cm" ? 10 : unit === "in" ? 25.4 : 1);
    setResult(getShoeSize(lengthMm));
    setWidthLabel(getShoeWidthLabel(widthMm, lengthMm));
  }

  return (
    <CalculatorLayout
      title="Shoe Size Calculator"
      description="Convert your foot measurements to EU, UK and US shoe sizes — with width fitting guidance to help you choose the right fit every time."
      instructions={
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>Measure foot length: place heel against a wall, mark the longest toe on paper, measure the distance</li>
          <li>Measure foot width at the widest point (ball of foot)</li>
          <li>Choose your measurement unit (mm recommended for accuracy)</li>
          <li>Select gender for correct UK/US table</li>
          <li>Click Calculate for EU, UK and US sizes</li>
          <li>Add 5–10mm for comfort when buying shoes</li>
        </ol>
      }
      testimonial="I have oddly shaped feet — long but narrow — and sizing has always been a nightmare. This calculator solved two problems at once. Entering my foot length (272mm) gave me EU 44 across the board, but the width calculator showed I have narrow feet (B width), so I know to look for brands that offer narrow fittings. The full size table at the bottom is incredibly useful for comparing international brands. I now measure both feet every time I shop online (my left is 3mm longer) and use the larger measurement. No more returns, no more ill-fitting shoes. The 'add 5-10mm' tip at the top is exactly the kind of practical advice that makes the difference between a calculator and an actual useful tool."
    >
      <div className="space-y-5">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Gender:</span>
            <div className="flex rounded-lg border border-border overflow-hidden">
              {(["men", "women", "children"] as const).map(s => (
                <button key={s} data-testid={`btn-sex-${s}`} onClick={() => setSex(s)}
                  className={`px-3 py-1.5 text-xs capitalize transition-colors ${sex === s ? "bg-primary text-primary-foreground font-semibold" : "text-muted-foreground hover:text-foreground"}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Unit:</span>
            <div className="flex rounded-lg border border-border overflow-hidden">
              {(["mm", "cm", "in"] as const).map(u => (
                <button key={u} data-testid={`btn-unit-${u}`} onClick={() => setUnit(u)}
                  className={`px-3 py-1.5 text-xs uppercase transition-colors ${unit === u ? "bg-primary text-primary-foreground font-semibold" : "text-muted-foreground hover:text-foreground"}`}>
                  {u}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Foot Length ({unit})</Label>
            <Input data-testid="input-length" type="number" value={length} onChange={e => setLength(e.target.value)} />
            <p className="text-xs text-muted-foreground">Heel to longest toe</p>
          </div>
          <div className="space-y-1.5">
            <Label>Foot Width ({unit})</Label>
            <Input data-testid="input-width" type="number" value={width} onChange={e => setWidth(e.target.value)} />
            <p className="text-xs text-muted-foreground">Widest part (ball of foot)</p>
          </div>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
          <p className="text-xs text-blue-400">Tip: Always measure both feet and use the <strong>larger</strong> measurement. Measure in the afternoon when feet are slightly larger. Add 5–10mm to your foot length for comfortable shoe fit.</p>
        </div>

        <Button data-testid="button-calculate" className="w-full" onClick={calculate}>Find My Shoe Size</Button>

        {result && (
          <div className="space-y-4 pt-2">
            {/* Size cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "EU", value: String(result.eu), highlight: true },
                { label: sex === "women" ? "UK (Women)" : "UK (Men)", value: sex === "women" ? result.ukWomen : result.ukMen },
                { label: sex === "women" ? "US (Women)" : "US (Men)", value: sex === "women" ? result.usWomen : result.usMen },
                { label: "CM", value: String(result.cm) },
              ].map(item => (
                <div key={item.label} className={`bg-background rounded-lg p-4 border text-center ${item.highlight ? "border-primary/50" : "border-border"}`}>
                  <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                  <p className={`font-mono text-2xl font-bold ${item.highlight ? "text-primary" : "text-foreground"}`} data-testid={`result-${item.label.toLowerCase().replace(/[^a-z]/g, "")}`}>{item.value}</p>
                </div>
              ))}
            </div>

            {widthLabel && (
              <div className="bg-background rounded-lg p-4 border border-border">
                <p className="text-xs text-muted-foreground mb-1">Foot Width Fitting</p>
                <p className="font-semibold text-foreground">{widthLabel}</p>
              </div>
            )}

            {/* Full size table */}
            <details className="bg-background rounded-lg border border-border overflow-hidden">
              <summary className="p-4 text-sm font-semibold cursor-pointer text-foreground hover:text-primary transition-colors">
                Full International Size Chart ▾
              </summary>
              <div className="overflow-x-auto px-4 pb-4">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="text-muted-foreground">
                      <th className="text-center py-2 border-b border-border">EU</th>
                      <th className="text-center py-2 border-b border-border">UK Men</th>
                      <th className="text-center py-2 border-b border-border">UK Women</th>
                      <th className="text-center py-2 border-b border-border">US Men</th>
                      <th className="text-center py-2 border-b border-border">US Women</th>
                      <th className="text-right py-2 border-b border-border">cm</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SHOE_SIZE_TABLE.map(s => (
                      <tr key={s.eu} className={`border-b border-border/40 hover:bg-card/60 ${s.eu === result.eu ? "bg-primary/10" : ""}`}>
                        <td className={`py-1.5 text-center font-mono font-bold ${s.eu === result.eu ? "text-primary" : "text-foreground"}`}>{s.eu}</td>
                        <td className="py-1.5 text-center">{s.ukMen}</td>
                        <td className="py-1.5 text-center">{s.ukWomen}</td>
                        <td className="py-1.5 text-center">{s.usMen}</td>
                        <td className="py-1.5 text-center">{s.usWomen}</td>
                        <td className="py-1.5 text-right font-mono">{s.cm}</td>
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
