import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { CALCULATOR_GUIDES } from "@/lib/calculatorGuides";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Mode = "add" | "remove" | "split";

const GST_RATES: { label: string; rate: string }[] = [
  { label: "Australia (10%)",     rate: "10" },
  { label: "New Zealand (15%)",   rate: "15" },
  { label: "Canada (5%)",         rate: "5"  },
  { label: "Singapore (9%)",      rate: "9"  },
  { label: "India – Standard (18%)", rate: "18" },
  { label: "Custom",              rate: ""   },
];

export default function GSTCalculator() {
  const [mode, setMode] = useState<Mode>("add");
  const [amount, setAmount] = useState("1000");
  const [rate, setRate] = useState("10");
  const [preset, setPreset] = useState("Australia (10%)");
  const [result, setResult] = useState<{
    net: number; gst: number; gross: number; rate: number;
  } | null>(null);

  function handlePreset(label: string, presetRate: string) {
    setPreset(label);
    if (presetRate) setRate(presetRate);
  }

  function calculate() {
    const a = parseFloat(amount);
    const r = parseFloat(rate) / 100;
    if (isNaN(a) || isNaN(r) || r <= 0) return;

    if (mode === "add") {
      const gst = a * r;
      setResult({ net: a, gst, gross: a + gst, rate: r * 100 });
    } else {
      const net = a / (1 + r);
      const gst = a - net;
      setResult({ net, gst, gross: a, rate: r * 100 });
    }
  }

  function fmt(n: number) {
    return n.toLocaleString("en", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  const MODES: { key: Mode; label: string }[] = [
    { key: "add",    label: "Add GST to amount (excl. GST price → incl. GST)" },
    { key: "remove", label: "Remove GST from amount (incl. GST price → excl. GST)" },
    { key: "split",  label: "Split GST out of total (find the GST component)" },
  ];

  return (
    <CalculatorLayout
      title="GST Calculator"
      description="Add GST to a price, remove GST from a GST-inclusive amount, or split out the GST component. Supports Australia (10%), New Zealand (15%), Canada (5%), Singapore (9%), India and custom rates."
      instructions={
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>Select your country's GST rate or enter a custom rate</li>
          <li>Choose whether to add GST, remove it, or split it out</li>
          <li>Enter the amount</li>
          <li>Click Calculate</li>
        </ol>
      }
      testimonial="As a freelancer working with Australian and New Zealand clients, I invoice across both markets and constantly need to convert between GST-inclusive and GST-exclusive prices. This calculator handles both the 10% AU rate and the 15% NZ rate in one place — no more mental arithmetic or spreadsheet lookups. The preset buttons are a time-saver. I use the 'remove GST' mode most often when clients give me a total and I need to show the GST component separately on my invoice."
      guide={CALCULATOR_GUIDES['gst']}
    >
      <div className="space-y-5">
        <div className="space-y-2">
          <Label>Country / Rate Preset</Label>
          <div className="flex flex-wrap gap-2">
            {GST_RATES.map(p => (
              <button
                key={p.label}
                onClick={() => handlePreset(p.label, p.rate)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  preset === p.label
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border text-muted-foreground hover:border-primary"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

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
              {mode === "add" ? "Amount (excl. GST)" : "Amount (incl. GST)"}
            </Label>
            <Input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label>GST Rate (%)</Label>
            <Input
              type="number"
              value={rate}
              onChange={e => { setRate(e.target.value); setPreset("Custom"); }}
              step="0.5"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={calculate}
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Calculate
          </Button>
          <Button
            variant="outline"
            onClick={() => { setResult(null); setAmount("1000"); setRate("10"); setPreset("Australia (10%)"); }}
          >
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
                <span className="text-muted-foreground text-sm">Net Amount (excl. GST)</span>
                <span className="font-semibold text-foreground">{fmt(result.net)}</span>
              </div>
              <div className="flex justify-between px-5 py-3">
                <span className="text-muted-foreground text-sm">GST Amount ({fmt(result.rate)}%)</span>
                <span className="font-semibold text-amber-400">{fmt(result.gst)}</span>
              </div>
              <div className="flex justify-between px-5 py-3 bg-primary/5">
                <span className="text-foreground font-medium text-sm">Gross Total (incl. GST)</span>
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
