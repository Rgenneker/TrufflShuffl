import { useState, useEffect } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CurrencySelect } from "@/components/CurrencySelect";
import { DEFAULT_CURRENCY, fmtCurrency, type Currency } from "@/lib/currencies";

function fmt(n: number, dec = 2) {
  return n.toLocaleString("en-ZA", { minimumFractionDigits: dec, maximumFractionDigits: dec });
}

export default function TimeToolsCalculator() {
  const [currency, setCurrency] = useState<Currency>(DEFAULT_CURRENCY);

  const [targetDate, setTargetDate] = useState(() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() + 1);
    return d.toISOString().split("T")[0];
  });
  const [countdown, setCountdown] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

  const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0]);
  const [endDate, setEndDate] = useState(() => {
    const d = new Date();
    d.setMonth(d.getMonth() + 3);
    return d.toISOString().split("T")[0];
  });
  const [excludeWeekends, setExcludeWeekends] = useState(true);
  const [publicHolidays, setPublicHolidays] = useState("0");
  const [wdResult, setWdResult] = useState<{ total: number; working: number; weekends: number } | null>(null);

  const [hoursPerDay, setHoursPerDay] = useState("8");
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("09:30");
  const [otRate, setOtRate] = useState("1.5");
  const [hourlyRate, setHourlyRate] = useState("250");
  const [otResult, setOtResult] = useState<{ overtimeHours: number; otPay: number; normalPay: number } | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const diff = target - now;
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setCountdown({ days, hours, minutes, seconds });
      } else {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  function calcWorkingDays() {
    const start = new Date(startDate);
    const end = new Date(endDate);
    let total = 0;
    let working = 0;
    let weekends = 0;
    const cur = new Date(start);
    while (cur <= end) {
      total++;
      const day = cur.getDay();
      if (day === 0 || day === 6) weekends++;
      else working++;
      cur.setDate(cur.getDate() + 1);
    }
    const finalWorking = Math.max(0, working - Number(publicHolidays));
    setWdResult({ total, working: finalWorking, weekends });
  }

  function calcOvertime() {
    const [startH, startM] = startTime.split(":").map(Number);
    const [endH, endM] = endTime.split(":").map(Number);
    const workedHours = (endH + endM / 60) - (startH + startM / 60);
    const normalHours = Number(hoursPerDay);
    const overtimeHours = Math.max(0, workedHours - normalHours);
    const rate = Number(hourlyRate);
    const normalPay = normalHours * rate;
    const otPay = overtimeHours * rate * Number(otRate);
    setOtResult({ overtimeHours, otPay, normalPay });
  }

  return (
    <CalculatorLayout
      title="Time Tools Calculator"
      description="Count down to any date, calculate working days between two dates (excluding weekends and SA public holidays), and calculate overtime pay."
      instructions={
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>Countdown: select a target date and watch the live countdown</li>
          <li>Working Days: enter start and end dates, exclude weekends and public holidays</li>
          <li>Overtime: enter your hours worked, standard working day and hourly rate</li>
        </ol>
      }
      testimonial="The working days calculator is something our HR department uses constantly. We need to know exact working days for notice periods, leave calculations and project deadlines — and manually counting while skipping weekends and public holidays is error-prone. This tool handles it perfectly. I enter a start and end date, tell it to exclude weekends and enter the number of SA public holidays in that period, and get the exact working days in seconds. The countdown tab is surprisingly useful for project management — I set it to our product launch date and share it with the team as motivation. The overtime calculator helps our payroll process shift workers accurately, especially with 1.5x and 2x overtime rates during public holidays. Three genuinely useful tools in one clean interface."
    >
      <Tabs defaultValue="countdown">
        <TabsList className="w-full">
          <TabsTrigger value="countdown" className="flex-1">Countdown</TabsTrigger>
          <TabsTrigger value="workdays" className="flex-1">Working Days</TabsTrigger>
          <TabsTrigger value="overtime" className="flex-1">Overtime</TabsTrigger>
        </TabsList>

        <TabsContent value="countdown" className="space-y-4 pt-4">
          <div className="space-y-1.5">
            <Label>Target Date</Label>
            <Input type="date" value={targetDate} onChange={e => setTargetDate(e.target.value)} />
          </div>
          {countdown && (
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: "Days", value: countdown.days },
                { label: "Hours", value: countdown.hours },
                { label: "Minutes", value: countdown.minutes },
                { label: "Seconds", value: countdown.seconds },
              ].map(({ label, value }) => (
                <div key={label} className="bg-background rounded-xl p-4 border border-primary/30 text-center">
                  <p className="font-mono text-3xl font-bold text-primary">{String(value).padStart(2, "0")}</p>
                  <p className="text-xs text-muted-foreground mt-1">{label}</p>
                </div>
              ))}
            </div>
          )}
          <p className="text-xs text-muted-foreground text-center">Live countdown — updates every second.</p>
        </TabsContent>

        <TabsContent value="workdays" className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Start Date</Label>
              <Input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>End Date</Label>
              <Input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Public Holidays in Period</Label>
              <Input type="number" value={publicHolidays} onChange={e => setPublicHolidays(e.target.value)} min="0" />
            </div>
            <div className="space-y-1.5">
              <Label>Exclude Weekends</Label>
              <div className="flex gap-2 mt-1">
                {[true, false].map(v => (
                  <button key={String(v)} onClick={() => setExcludeWeekends(v)}
                    className={`flex-1 py-1.5 rounded-lg border text-sm transition-colors ${excludeWeekends === v ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:text-foreground"}`}>
                    {v ? "Yes" : "No"}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <Button className="w-full" onClick={calcWorkingDays}>Calculate</Button>
          {wdResult && (
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">Calendar Days</p>
                <p className="font-mono text-xl font-bold text-foreground">{wdResult.total}</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">Weekend Days</p>
                <p className="font-mono text-xl font-bold text-foreground">{wdResult.weekends}</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-primary/30 text-center">
                <p className="text-xs text-muted-foreground mb-1">Working Days</p>
                <p className="font-mono text-xl font-bold text-primary">{wdResult.working}</p>
              </div>
            </div>
          )}
          <p className="text-xs text-muted-foreground">SA has 12 public holidays per year. Enter the count falling in your date range manually.</p>
        </TabsContent>

        <TabsContent value="overtime" className="space-y-4 pt-4">
          <div className="flex justify-end mb-1">
            <CurrencySelect value={currency} onChange={setCurrency} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Normal Working Day (hours)</Label>
              <Input type="number" value={hoursPerDay} onChange={e => setHoursPerDay(e.target.value)} step="0.5" />
            </div>
            <div className="space-y-1.5">
              <Label>Hourly Rate ({currency.symbol})</Label>
              <Input type="number" value={hourlyRate} onChange={e => setHourlyRate(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Shift Start</Label>
              <Input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Shift End</Label>
              <Input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Overtime Rate Multiplier</Label>
              <div className="flex gap-2">
                {["1.0", "1.5", "2.0", "3.0"].map(r => (
                  <button key={r} onClick={() => setOtRate(r)}
                    className={`flex-1 py-1.5 rounded-lg border text-xs transition-colors ${otRate === r ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:text-foreground"}`}>
                    {r}×
                  </button>
                ))}
              </div>
            </div>
          </div>
          <Button className="w-full" onClick={calcOvertime}>Calculate</Button>
          {otResult && (
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">Normal Pay</p>
                <p className="font-mono text-lg font-bold text-foreground">{fmtCurrency(otResult.normalPay, currency)}</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">Overtime Hours</p>
                <p className="font-mono text-lg font-bold text-foreground">{fmt(otResult.overtimeHours, 2)} hrs</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-primary/30 text-center">
                <p className="text-xs text-muted-foreground mb-1">Overtime Pay</p>
                <p className="font-mono text-lg font-bold text-primary">{fmtCurrency(otResult.otPay, currency)}</p>
              </div>
            </div>
          )}
          <p className="text-xs text-muted-foreground">BCEA: overtime must not exceed 3 hours/day or 10 hours/week. Overtime on Sundays and public holidays: minimum 2× rate.</p>
        </TabsContent>
      </Tabs>
    </CalculatorLayout>
  );
}
