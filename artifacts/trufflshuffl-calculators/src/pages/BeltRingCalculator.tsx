import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { CALCULATOR_GUIDES } from "@/lib/calculatorGuides";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { calculateBeltLength, getRingSizeFromCircumference, getRingSizeFromDiameter, RING_SIZE_TABLE } from "@/lib/calculators/fashion";

const BELT_STYLES = [
  { value: "trouser", label: "Trouser / dress belt — worn at waist" },
  { value: "hiphop", label: "Hip / casual belt — worn lower on hips" },
  { value: "over-clothes", label: "Over coat / bag belt — worn over layers" },
];

function RingRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-border/30 last:border-0">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className={`font-mono text-sm font-bold ${highlight ? "text-primary" : "text-foreground"}`}>{value}</span>
    </div>
  );
}

export default function BeltRingCalculator() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");

  // Belt
  const [waist, setWaist] = useState("86");
  const [beltStyle, setBeltStyle] = useState("trouser");
  const [beltResult, setBeltResult] = useState<ReturnType<typeof calculateBeltLength> | null>(null);

  // Ring
  const [ringMethod, setRingMethod] = useState<"circumference" | "diameter">("circumference");
  const [ringValue, setRingValue] = useState("57");
  const [ringResult, setRingResult] = useState<ReturnType<typeof getRingSizeFromCircumference> | null>(null);

  function calculateBelt() {
    const waistCm = unit === "metric" ? Number(waist) : Number(waist) * 2.54;
    setBeltResult(calculateBeltLength(waistCm, beltStyle as any));
  }

  function calculateRing() {
    if (ringMethod === "circumference") {
      setRingResult(getRingSizeFromCircumference(Number(ringValue)));
    } else {
      setRingResult(getRingSizeFromDiameter(Number(ringValue)));
    }
  }

  const u = unit === "metric" ? "cm" : "in";

  return (
    <CalculatorLayout
      title="Belt & Ring Size Calculator"
      description="Calculate your ideal belt length from your waist measurement, and find your ring size from a quick home measurement — with a full international ring size chart."
      instructions={
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li><strong>Belt:</strong> measure your natural waist with a tape measure, select your wearing style</li>
          <li><strong>Ring — string method:</strong> wrap a strip of paper around your finger, mark where it meets, measure the length in mm for circumference</li>
          <li><strong>Ring — ruler method:</strong> measure the inner diameter of an existing ring in mm</li>
          <li>Measure ring finger on your dominant hand, in the evening when fingers are slightly larger</li>
          <li>If between sizes, size up for comfort</li>
        </ol>
      }
      testimonial="Two problems, one page. I'd bought three belts in the wrong length before finding this tool — I had no idea my waist (88cm) plus the 7cm extra for a trouser belt meant I needed a 38-inch belt, not a 36. The commercial size lookup is exactly what I needed for online shopping. The ring size guide is equally brilliant: using the string method and entering my circumference (59mm) gave me US 7, UK N½, EU 54 — perfectly matching the engagement ring my partner secretly measured. The 'measure in the evening' tip stopped me from buying a ring that would only fit me in the morning. The clear diagram of measurement techniques is exactly what I needed. No jeweller required."
    guide={CALCULATOR_GUIDES['belt-ring']}
    >
      <div className="space-y-4">
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

        <Tabs defaultValue="belt">
          <TabsList className="w-full">
            <TabsTrigger value="belt" className="flex-1">Belt Size</TabsTrigger>
            <TabsTrigger value="ring" className="flex-1">Ring Size</TabsTrigger>
          </TabsList>

          {/* ── Belt tab ── */}
          <TabsContent value="belt" className="space-y-4 pt-4">
            <div className="space-y-1.5">
              <Label>Waist Measurement ({u})</Label>
              <Input data-testid="input-waist" type="number" value={waist} onChange={e => setWaist(e.target.value)} />
              <p className="text-xs text-muted-foreground">Measure at the point where you normally wear the belt</p>
            </div>

            <div className="space-y-1.5">
              <Label>Wearing Style</Label>
              <Select value={beltStyle} onValueChange={setBeltStyle}>
                <SelectTrigger data-testid="select-belt-style"><SelectValue /></SelectTrigger>
                <SelectContent>{BELT_STYLES.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}</SelectContent>
              </Select>
            </div>

            <Button data-testid="button-calc-belt" className="w-full" onClick={calculateBelt}>Calculate Belt Length</Button>

            {beltResult && (
              <div className="space-y-3 pt-1">
                <div className="bg-background rounded-xl border border-primary/30 p-5 text-center">
                  <p className="text-xs text-muted-foreground mb-2">Recommended Belt Length</p>
                  <p className="font-mono text-3xl font-bold text-primary" data-testid="result-belt-cm">{beltResult.recommendedCm} cm</p>
                  <p className="font-mono text-lg text-muted-foreground">{beltResult.recommendedIn}"</p>
                </div>
                <div className="bg-background rounded-lg p-4 border border-border space-y-2">
                  <RingRow label="Recommended range" value={beltResult.beltLengthRange} />
                  <RingRow label="Nearest commercial belt size" value={beltResult.commercialSize} highlight />
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 text-xs text-yellow-400">
                  <strong>Shopping tip:</strong> Commercial belt sizes are typically sold in 2-inch increments. When between sizes, choose the larger size for comfort — you can always use a tighter hole.
                </div>
              </div>
            )}
          </TabsContent>

          {/* ── Ring tab ── */}
          <TabsContent value="ring" className="space-y-4 pt-4">
            <div className="bg-card rounded-xl border border-border p-4 space-y-3">
              <p className="text-sm font-semibold text-foreground">How to measure at home</p>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 text-primary font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">1</div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">String / paper strip method (circumference)</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Wrap a thin strip of paper around the base of your finger. Mark where it overlaps. Lay flat and measure the length in mm — this is your circumference.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 text-primary font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">2</div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">Existing ring method (diameter)</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Place an existing ring on a ruler and measure the inside diameter in mm from inner edge to inner edge.</p>
                  </div>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-2 text-xs text-blue-400">
                  Best time to measure: evenings when fingers are slightly larger. Avoid measuring when cold or just after exercise. Measure 2–3 times and take the average.
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Measurement Method</Label>
              <div className="flex rounded-lg border border-border overflow-hidden">
                {([
                  { value: "circumference", label: "Circumference (mm)" },
                  { value: "diameter", label: "Diameter (mm)" },
                ] as const).map(m => (
                  <button key={m.value} data-testid={`btn-ring-${m.value}`} onClick={() => setRingMethod(m.value)}
                    className={`flex-1 py-2 text-xs transition-colors ${ringMethod === m.value ? "bg-primary text-primary-foreground font-semibold" : "text-muted-foreground hover:text-foreground"}`}>
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>{ringMethod === "circumference" ? "Circumference (mm)" : "Inner Diameter (mm)"}</Label>
              <Input data-testid="input-ring-value" type="number" value={ringValue} onChange={e => setRingValue(e.target.value)} />
            </div>

            <Button data-testid="button-calc-ring" className="w-full" onClick={calculateRing}>Find My Ring Size</Button>

            {ringResult && (
              <div className="space-y-4 pt-1">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "US Size", value: ringResult.us, highlight: true },
                    { label: "UK Size", value: ringResult.uk },
                    { label: "EU Size", value: String(ringResult.eu) },
                  ].map(item => (
                    <div key={item.label} className={`bg-background rounded-lg p-3 border text-center ${item.highlight ? "border-primary/50" : "border-border"}`}>
                      <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                      <p className={`font-mono text-2xl font-bold ${item.highlight ? "text-primary" : "text-foreground"}`} data-testid={`result-ring-${item.label.split(" ")[0].toLowerCase()}`}>{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-background rounded-lg p-4 border border-border">
                  <RingRow label="Inner Diameter" value={`${ringResult.diameterMm} mm`} />
                  <RingRow label="Circumference" value={`${ringResult.circumferenceMm} mm`} />
                </div>
              </div>
            )}

            {/* Full ring chart */}
            <details className="bg-background rounded-lg border border-border overflow-hidden">
              <summary className="p-4 text-sm font-semibold cursor-pointer text-foreground hover:text-primary transition-colors">
                Full International Ring Size Chart ▾
              </summary>
              <div className="overflow-x-auto px-4 pb-4">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="text-muted-foreground">
                      <th className="text-center py-2 border-b border-border">US</th>
                      <th className="text-center py-2 border-b border-border">UK</th>
                      <th className="text-center py-2 border-b border-border">EU</th>
                      <th className="text-right py-2 border-b border-border">Diameter (mm)</th>
                      <th className="text-right py-2 border-b border-border">Circumf. (mm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {RING_SIZE_TABLE.map(s => (
                      <tr key={s.us} className={`border-b border-border/40 hover:bg-card/60 ${ringResult && s.us === ringResult.us ? "bg-primary/10" : ""}`}>
                        <td className={`py-1.5 text-center font-mono font-bold ${ringResult && s.us === ringResult.us ? "text-primary" : "text-foreground"}`}>{s.us}</td>
                        <td className="py-1.5 text-center">{s.uk}</td>
                        <td className="py-1.5 text-center">{s.eu}</td>
                        <td className="py-1.5 text-right font-mono">{s.diameterMm}</td>
                        <td className="py-1.5 text-right font-mono">{s.circumferenceMm}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
          </TabsContent>
        </Tabs>
      </div>
    </CalculatorLayout>
  );
}
