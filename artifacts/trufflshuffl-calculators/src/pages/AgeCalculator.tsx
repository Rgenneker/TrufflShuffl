import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { CALCULATOR_GUIDES } from "@/lib/calculatorGuides";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AgeCalculator() {
  const today = new Date().toISOString().split("T")[0];
  const [dob, setDob] = useState("1990-01-01");
  const [asOf, setAsOf] = useState(today);
  const [result, setResult] = useState<{
    years: number; months: number; days: number;
    totalDays: number; totalHours: number; totalWeeks: number;
    nextBirthdayDays: number; nextBirthdayDate: string;
    ageAtNextBirthday: number;
  } | null>(null);

  function calculate() {
    const birth = new Date(dob);
    const target = new Date(asOf);
    if (isNaN(birth.getTime()) || isNaN(target.getTime()) || birth >= target) return;

    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const diffMs = target.getTime() - birth.getTime();
    const totalDays = Math.floor(diffMs / 86_400_000);
    const totalHours = Math.floor(diffMs / 3_600_000);
    const totalWeeks = Math.floor(totalDays / 7);

    // Next birthday
    const nextBirth = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirth <= target) nextBirth.setFullYear(nextBirth.getFullYear() + 1);
    const nextBirthdayDays = Math.ceil((nextBirth.getTime() - target.getTime()) / 86_400_000);
    const nextBirthdayDate = nextBirth.toLocaleDateString("en", { day: "numeric", month: "long", year: "numeric" });
    const ageAtNextBirthday = years + (months === 0 && days === 0 ? 0 : 1);

    setResult({ years, months, days, totalDays, totalHours, totalWeeks, nextBirthdayDays, nextBirthdayDate, ageAtNextBirthday });
  }

  return (
    <CalculatorLayout
      title="Age Calculator"
      description="Calculate your exact age in years, months and days, total days and weeks lived, and how many days until your next birthday. Works for any two dates."
      instructions={
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>Enter your date of birth</li>
          <li>Enter the as-of date (defaults to today)</li>
          <li>Click Calculate to see your exact age and stats</li>
        </ol>
      }
      testimonial="I used this age calculator to settle an argument with my siblings about whose turn it was to plan our parents' anniversary party. Turns out I'm exactly 847 days older than my sister — more than I thought! I also love the 'days until next birthday' feature. I now have it bookmarked to check every year on my children's birthdays to see their age in days — a lovely detail for their birthday messages."
    guide={CALCULATOR_GUIDES['age']}
    >
      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Date of Birth</Label>
            <Input type="date" value={dob} onChange={e => setDob(e.target.value)} max={today} />
          </div>
          <div className="space-y-1.5">
            <Label>As Of Date</Label>
            <Input type="date" value={asOf} onChange={e => setAsOf(e.target.value)} />
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={calculate} className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">Calculate</Button>
          <Button variant="outline" onClick={() => setResult(null)}>Reset</Button>
        </div>

        {result && (
          <div className="space-y-4 mt-2">
            <div className="rounded-xl border border-border bg-primary/5 px-5 py-5 text-center">
              <p className="text-muted-foreground text-sm mb-1">Exact Age</p>
              <p className="text-3xl font-bold text-foreground">
                {result.years} <span className="text-muted-foreground text-lg font-normal">years</span>{" "}
                {result.months} <span className="text-muted-foreground text-lg font-normal">months</span>{" "}
                {result.days} <span className="text-muted-foreground text-lg font-normal">days</span>
              </p>
            </div>

            <div className="rounded-xl border border-border bg-muted/30 overflow-hidden">
              <div className="divide-y divide-border">
                <div className="flex justify-between px-5 py-3">
                  <span className="text-muted-foreground text-sm">Total Days Lived</span>
                  <span className="font-semibold text-foreground">{result.totalDays.toLocaleString()} days</span>
                </div>
                <div className="flex justify-between px-5 py-3">
                  <span className="text-muted-foreground text-sm">Total Weeks Lived</span>
                  <span className="font-semibold text-foreground">{result.totalWeeks.toLocaleString()} weeks</span>
                </div>
                <div className="flex justify-between px-5 py-3">
                  <span className="text-muted-foreground text-sm">Total Hours Lived</span>
                  <span className="font-semibold text-foreground">{result.totalHours.toLocaleString()} hours</span>
                </div>
                <div className="flex justify-between px-5 py-3 bg-amber-400/5">
                  <span className="text-muted-foreground text-sm">Next Birthday</span>
                  <span className="font-semibold text-amber-400">
                    {result.nextBirthdayDate} ({result.nextBirthdayDays} days away)
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
