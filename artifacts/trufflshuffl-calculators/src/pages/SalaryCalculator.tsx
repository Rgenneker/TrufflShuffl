import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CurrencySelect } from "@/components/CurrencySelect";
import { DEFAULT_CURRENCY, fmtCurrency, type Currency } from "@/lib/currencies";

type InputType = "annual" | "monthly" | "weekly" | "daily" | "hourly";

const WORKING_DAYS_PER_YEAR = 260;
const WORKING_HOURS_PER_DAY = 8;

export default function SalaryCalculator() {
  const [currency, setCurrency] = useState<Currency>(DEFAULT_CURRENCY);
  const [inputType, setInputType] = useState<InputType>("annual");
  const [salaryInput, setSalaryInput] = useState("500000");
  const [hoursPerDay, setHoursPerDay] = useState("8");
  const [daysPerWeek, setDaysPerWeek] = useState("5");
  const [result, setResult] = useState<{
    annual: number; monthly: number; weekly: number; daily: number; hourly: number;
    workingDaysPerYear: number;
  } | null>(null);

  function fmt(n: number) { return fmtCurrency(n, currency); }

  function calculate() {
    const val = parseFloat(salaryInput);
    const hpd = parseFloat(hoursPerDay) || 8;
    const dpw = parseFloat(daysPerWeek) || 5;
    if (isNaN(val) || val <= 0) return;

    const weeksPerYear = 52;
    const workingDaysPerYear = dpw * weeksPerYear;
    const workingHoursPerYear = workingDaysPerYear * hpd;

    let annual = 0;
    if (inputType === "annual")  annual = val;
    if (inputType === "monthly") annual = val * 12;
    if (inputType === "weekly")  annual = val * weeksPerYear;
    if (inputType === "daily")   annual = val * workingDaysPerYear;
    if (inputType === "hourly")  annual = val * workingHoursPerYear;

    const monthly = annual / 12;
    const weekly  = annual / weeksPerYear;
    const daily   = annual / workingDaysPerYear;
    const hourly  = annual / workingHoursPerYear;

    setResult({ annual, monthly, weekly, daily, hourly, workingDaysPerYear });
  }

  const INPUT_TYPES: { key: InputType; label: string }[] = [
    { key: "annual",  label: "Annual" },
    { key: "monthly", label: "Monthly" },
    { key: "weekly",  label: "Weekly" },
    { key: "daily",   label: "Daily" },
    { key: "hourly",  label: "Hourly" },
  ];

  return (
    <CalculatorLayout
      title="Salary Calculator"
      description="Convert any salary between annual, monthly, weekly, daily and hourly rates. Customise working days per week and hours per day for accurate results."
      instructions={
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>Select your currency</li>
          <li>Choose whether you are entering an annual, monthly, weekly, daily or hourly rate</li>
          <li>Enter your salary amount</li>
          <li>Adjust hours per day and working days per week if needed</li>
          <li>Click Calculate to see all breakdowns</li>
        </ol>
      }
      testimonial="When I was negotiating a new job offer, I had an hourly rate offer and needed to compare it to my annual salary at my current job. This calculator converted both to the same basis in seconds. I also used it to figure out what my daily rate would be if I went freelance. The custom hours-per-day feature makes it accurate for part-time roles too."
    >
      <div className="space-y-5">
        <div className="space-y-1.5">
          <Label>Currency</Label>
          <CurrencySelect value={currency} onChange={setCurrency} />
        </div>

        <div className="space-y-2">
          <Label>I am entering a...</Label>
          <div className="flex flex-wrap gap-2">
            {INPUT_TYPES.map(t => (
              <button
                key={t.key}
                onClick={() => setInputType(t.key)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                  inputType === t.key
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border text-muted-foreground hover:border-primary"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label>{INPUT_TYPES.find(t => t.key === inputType)?.label} Salary ({currency.symbol})</Label>
          <Input type="number" value={salaryInput} onChange={e => setSalaryInput(e.target.value)} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Hours Per Day</Label>
            <Input type="number" value={hoursPerDay} onChange={e => setHoursPerDay(e.target.value)} min="1" max="24" />
          </div>
          <div className="space-y-1.5">
            <Label>Working Days / Week</Label>
            <Input type="number" value={daysPerWeek} onChange={e => setDaysPerWeek(e.target.value)} min="1" max="7" />
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={calculate} className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">Calculate</Button>
          <Button variant="outline" onClick={() => setResult(null)}>Reset</Button>
        </div>

        {result && (
          <div className="rounded-xl border border-border bg-muted/30 overflow-hidden mt-2">
            <div className="px-5 py-3 border-b border-border">
              <h3 className="font-semibold text-foreground">Salary Breakdown</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Based on {result.workingDaysPerYear} working days/year ({hoursPerDay}h/day)
              </p>
            </div>
            <div className="divide-y divide-border">
              <div className="flex justify-between px-5 py-3 bg-primary/5">
                <span className="text-foreground font-medium text-sm">Annual</span>
                <span className="font-bold text-primary text-lg">{fmt(result.annual)}</span>
              </div>
              <div className="flex justify-between px-5 py-3">
                <span className="text-muted-foreground text-sm">Monthly</span>
                <span className="font-semibold text-foreground">{fmt(result.monthly)}</span>
              </div>
              <div className="flex justify-between px-5 py-3">
                <span className="text-muted-foreground text-sm">Weekly</span>
                <span className="font-semibold text-foreground">{fmt(result.weekly)}</span>
              </div>
              <div className="flex justify-between px-5 py-3">
                <span className="text-muted-foreground text-sm">Daily</span>
                <span className="font-semibold text-amber-400">{fmt(result.daily)}</span>
              </div>
              <div className="flex justify-between px-5 py-3">
                <span className="text-muted-foreground text-sm">Hourly</span>
                <span className="font-semibold text-amber-400">{fmt(result.hourly)}</span>
              </div>
            </div>
            <div className="px-5 py-3 bg-muted/50 text-xs text-muted-foreground">
              For educational purposes. Consult a tax advisor for take-home pay after deductions.
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
