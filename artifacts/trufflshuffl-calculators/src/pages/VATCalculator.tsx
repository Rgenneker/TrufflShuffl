import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { CALCULATOR_GUIDES } from "@/lib/calculatorGuides";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Mode = "add" | "remove" | "split";

export default function VATCalculator() {
  const [mode, setMode] = useState<Mode>("add");
  const [amount, setAmount] = useState("1000");
  const [rate, setRate] = useState("15");
  const [result, setResult] = useState<{
    net: number; vat: number; gross: number; rate: number;
  } | null>(null);

  function calculate() {
    const a = parseFloat(amount);
    const r = parseFloat(rate) / 100;
    if (isNaN(a) || isNaN(r) || r <= 0) return;

    if (mode === "add") {
      const vat = a * r;
      setResult({ net: a, vat, gross: a + vat, rate: r * 100 });
    } else if (mode === "remove") {
      const net = a / (1 + r);
      const vat = a - net;
      setResult({ net, vat, gross: a, rate: r * 100 });
    } else {
      const net = a / (1 + r);
      const vat = a - net;
      setResult({ net, vat, gross: a, rate: r * 100 });
    }
  }

  function fmt(n: number) {
    return n.toLocaleString("en", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  const MODES: { key: Mode; label: string }[] = [
    { key: "add",    label: "Add VAT to amount" },
    { key: "remove", label: "Remove VAT from amount" },
    { key: "split",  label: "Split VAT from total" },
  ];

  return (
    <CalculatorLayout
      title="VAT Calculator"
      description="Instantly add VAT to a price, remove VAT from a VAT-inclusive amount, or split out the VAT component. Defaults to 15% (South Africa). Change the rate for any country."
      instructions={
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>Select whether you want to add VAT, remove it, or split it out</li>
          <li>Enter the amount</li>
          <li>Enter the VAT rate (default 15% for South Africa)</li>
          <li>Click Calculate</li>
        </ol>
      }
      testimonial="Running a small business in South Africa, I need to calculate VAT constantly. This calculator saves me so much time — I can instantly see whether a price is VAT-inclusive or VAT-exclusive and get the exact VAT amount. The 'remove VAT' feature is especially useful when suppliers give me gross prices and I need to reclaim the VAT portion. Essential tool for any SA business owner."
    guide={CALCULATOR_GUIDES['vat']}
    >
      <div className="space-y-5">
        <div className="space-y-2">
          <Label>Mode</Label>
          <div className="grid grid-cols-1 gap-2">
            {MODES.map(m => (
              <button
                key={m.key}
                onClick={() => setMode(m.key)}
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
            <Label>
              {mode === "add" ? "Amount (excl. VAT)" : "Amount (incl. VAT)"}
            </Label>
            <Input type="number" value={amount} onChange={e => setAmount(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>VAT Rate (%)</Label>
            <Input type="number" value={rate} onChange={e => setRate(e.target.value)} step="0.5" />
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={calculate} className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
            Calculate
          </Button>
          <Button variant="outline" onClick={() => { setResult(null); setAmount("1000"); setRate("15"); }}>
            Reset
          </Button>
        </div>

        {result && (
          <div className="rounded-xl border border-border bg-muted/30 overflow-hidden mt-2">
            <div className="px-5 py-3 border-b border-border">
              <h3 className="font-semibold text-foreground">Results</h3>
            </div>
            <div className="divide-y divide-border">
              <div className="flex justify-between px-5 py-3">
                <span className="text-muted-foreground text-sm">Net Amount (excl. VAT)</span>
                <span className="font-semibold text-foreground">{fmt(result.net)}</span>
              </div>
              <div className="flex justify-between px-5 py-3">
                <span className="text-muted-foreground text-sm">VAT Amount ({fmt(result.rate)}%)</span>
                <span className="font-semibold text-amber-400">{fmt(result.vat)}</span>
              </div>
              <div className="flex justify-between px-5 py-3 bg-primary/5">
                <span className="text-foreground font-medium text-sm">Gross Total (incl. VAT)</span>
                <span className="font-bold text-primary text-lg">{fmt(result.gross)}</span>
              </div>
            </div>
            <div className="px-5 py-3 bg-muted/50 text-xs text-muted-foreground">
              Formula: {mode === "add"
                ? `Net × (1 + ${fmt(result.rate)}%) = Gross`
                : `Gross ÷ (1 + ${fmt(result.rate)}%) = Net`}
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
