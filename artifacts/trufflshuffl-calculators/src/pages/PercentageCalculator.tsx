import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Mode = "of" | "what" | "change" | "increase" | "decrease";

export default function PercentageCalculator() {
  const [mode, setMode] = useState<Mode>("of");
  const [a, setA] = useState("25");
  const [b, setB] = useState("200");
  const [result, setResult] = useState<string | null>(null);

  function calculate() {
    const x = parseFloat(a);
    const y = parseFloat(b);
    if (isNaN(x) || isNaN(y)) return;

    if (mode === "of") {
      setResult(`${fmt(x)}% of ${fmt(y)} = ${fmt((x / 100) * y)}`);
    } else if (mode === "what") {
      setResult(`${fmt(x)} is ${fmt((x / y) * 100)}% of ${fmt(y)}`);
    } else if (mode === "change") {
      const pct = ((y - x) / Math.abs(x)) * 100;
      setResult(`${fmt(x)} → ${fmt(y)}: ${pct >= 0 ? "+" : ""}${fmt(pct)}% change`);
    } else if (mode === "increase") {
      setResult(`${fmt(y)} increased by ${fmt(x)}% = ${fmt(y * (1 + x / 100))}`);
    } else {
      setResult(`${fmt(y)} decreased by ${fmt(x)}% = ${fmt(y * (1 - x / 100))}`);
    }
  }

  function fmt(n: number) {
    return n.toLocaleString("en", { minimumFractionDigits: 0, maximumFractionDigits: 4 });
  }

  const MODES: { key: Mode; label: string; aLabel: string; bLabel: string }[] = [
    { key: "of",       label: "What is X% of Y?",              aLabel: "Percentage (%)", bLabel: "Number (Y)" },
    { key: "what",     label: "X is what % of Y?",             aLabel: "Number (X)",     bLabel: "Number (Y)" },
    { key: "change",   label: "Percentage change from X to Y", aLabel: "From (X)",       bLabel: "To (Y)"     },
    { key: "increase", label: "Increase Y by X%",              aLabel: "Increase by (%)", bLabel: "Number (Y)" },
    { key: "decrease", label: "Decrease Y by X%",              aLabel: "Decrease by (%)", bLabel: "Number (Y)" },
  ];

  const current = MODES.find(m => m.key === mode)!;

  return (
    <CalculatorLayout
      title="Percentage Calculator"
      description="Five instant percentage calculations: find a percentage of a number, work out what percent X is of Y, calculate percentage change, increase or decrease by a percentage."
      instructions={
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>Select the type of percentage calculation</li>
          <li>Enter the two numbers</li>
          <li>Click Calculate for an instant result</li>
        </ol>
      }
      testimonial="I use this percentage calculator every day for pricing decisions — whether I need to calculate my profit margin, work out a percentage discount, or figure out how much prices have changed over time. The five modes cover every scenario I've ever needed. Fast, accurate and no unnecessary complexity. Bookmarked on every device."
    >
      <div className="space-y-5">
        <div className="space-y-2">
          <Label>Calculation Type</Label>
          <div className="grid grid-cols-1 gap-2">
            {MODES.map(m => (
              <button
                key={m.key}
                onClick={() => { setMode(m.key); setResult(null); }}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium border transition-colors text-left ${
                  mode === m.key
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border text-muted-foreground hover:border-primary"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>{current.aLabel}</Label>
            <Input type="number" value={a} onChange={e => setA(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>{current.bLabel}</Label>
            <Input type="number" value={b} onChange={e => setB(e.target.value)} />
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={calculate} className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
            Calculate
          </Button>
          <Button variant="outline" onClick={() => setResult(null)}>Reset</Button>
        </div>

        {result && (
          <div className="rounded-xl border border-amber-400/30 bg-amber-400/5 px-5 py-5 text-center mt-2">
            <p className="text-2xl font-bold text-amber-400">{result}</p>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
