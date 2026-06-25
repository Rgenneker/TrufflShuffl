import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CurrencySelect } from "@/components/CurrencySelect";
import { DEFAULT_CURRENCY, fmtCurrency, type Currency } from "@/lib/currencies";

type BudgetItem = { name: string; amount: string };

const WEDDING_DEFAULTS: BudgetItem[] = [
  { name: "Venue", amount: "30000" },
  { name: "Catering (per head × guests)", amount: "45000" },
  { name: "Photography & Videography", amount: "18000" },
  { name: "Flowers & Decor", amount: "15000" },
  { name: "Dress & Attire", amount: "12000" },
  { name: "Entertainment / DJ / Band", amount: "12000" },
  { name: "Invitations & Stationery", amount: "3000" },
  { name: "Wedding Cake", amount: "4000" },
  { name: "Transport", amount: "5000" },
  { name: "Honeymoon", amount: "30000" },
  { name: "Miscellaneous (10% buffer)", amount: "17400" },
];

export default function LifestyleCalculator() {
  const [currency, setCurrency] = useState<Currency>(DEFAULT_CURRENCY);

  const [weddingItems, setWeddingItems] = useState<BudgetItem[]>(WEDDING_DEFAULTS);
  const [weddingResult, setWeddingResult] = useState<{ total: number; perHead: number; guests: number } | null>(null);
  const [weddingGuests, setWeddingGuests] = useState("100");

  const [partyGuests, setPartyGuests] = useState("30");
  const [partyVenue, setPartyVenue] = useState("3000");
  const [partyFoodPerHead, setPartyFoodPerHead] = useState("200");
  const [partyDrinks, setPartyDrinks] = useState("2000");
  const [partyDecor, setPartyDecor] = useState("1500");
  const [partyEnt, setPartyEnt] = useState("2000");
  const [partyResult, setPartyResult] = useState<{ total: number; perHead: number } | null>(null);

  const [holidayTarget, setHolidayTarget] = useState("50000");
  const [holidayMonths, setHolidayMonths] = useState("12");
  const [holidayExisting, setHolidayExisting] = useState("0");
  const [holidayRate, setHolidayRate] = useState("8");
  const [holidayResult, setHolidayResult] = useState<{ monthly: number; total: number; interest: number } | null>(null);

  function calcWedding() {
    const total = weddingItems.reduce((s, i) => s + Number(i.amount), 0);
    const guests = Number(weddingGuests);
    setWeddingResult({ total, perHead: total / guests, guests });
  }

  function updateWedding(i: number, value: string) {
    setWeddingItems(prev => prev.map((item, idx) => idx === i ? { ...item, amount: value } : item));
  }

  function calcParty() {
    const guests = Number(partyGuests);
    const total = Number(partyVenue) + guests * Number(partyFoodPerHead) + Number(partyDrinks) + Number(partyDecor) + Number(partyEnt);
    setPartyResult({ total, perHead: total / guests });
  }

  function calcHoliday() {
    const target = Number(holidayTarget);
    const existing = Number(holidayExisting);
    const months = Number(holidayMonths);
    const rate = Number(holidayRate) / 100 / 12;
    const needed = target - existing;
    let monthly = 0;
    if (rate === 0) {
      monthly = needed / months;
    } else {
      monthly = (needed * rate) / (Math.pow(1 + rate, months) - 1);
    }
    const total = monthly * months + existing;
    setHolidayResult({ monthly, total, interest: total - (needed + existing) });
  }

  return (
    <CalculatorLayout
      title="Lifestyle Budget Calculator"
      description="Plan your wedding budget, estimate event and party costs, and calculate how much to save each month to fund your dream holiday."
      instructions={
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>Wedding: adjust each budget line to match your plans</li>
          <li>Party/Event: enter guest count and per-head costs for a total</li>
          <li>Holiday Savings: enter your target amount and timeline to find your monthly savings goal</li>
        </ol>
      }
      testimonial="Planning our wedding in Stellenbosch was overwhelming until I used this calculator. I adjusted each line item to match actual quotes from vendors and immediately saw the total climbing past our R250 000 budget. The per-head breakdown showed me that catering alone was R700 per person for 120 guests. We trimmed the guest list to 80 and swapped the sit-down dinner for a cocktail-style reception — saving R40 000 without compromising on the things that mattered most to us. The holiday savings tab is something I use every January for our annual overseas trip goal. I enter the target, my months to save, and my savings account interest rate and it tells me exactly what to set aside each month. Planning ahead removes all the financial stress."
    >
      <div className="flex justify-end mb-2">
        <CurrencySelect value={currency} onChange={setCurrency} />
      </div>
      <Tabs defaultValue="wedding">
        <TabsList className="w-full">
          <TabsTrigger value="wedding" className="flex-1">Wedding</TabsTrigger>
          <TabsTrigger value="party" className="flex-1">Event / Party</TabsTrigger>
          <TabsTrigger value="holiday" className="flex-1">Holiday Savings</TabsTrigger>
        </TabsList>

        <TabsContent value="wedding" className="space-y-4 pt-4">
          <div className="space-y-1.5">
            <Label>Number of Guests</Label>
            <Input type="number" value={weddingGuests} onChange={e => setWeddingGuests(e.target.value)} className="max-w-xs" />
          </div>
          <div className="space-y-2">
            {weddingItems.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground flex-1">{item.name}</span>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-muted-foreground">{currency.symbol}</span>
                  <Input type="number" value={item.amount} onChange={e => updateWedding(i, e.target.value)} className="w-28 text-sm" />
                </div>
              </div>
            ))}
          </div>
          <Button className="w-full" onClick={calcWedding}>Calculate Total</Button>
          {weddingResult && (
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-background rounded-lg p-4 border border-primary/30 text-center">
                <p className="text-xs text-muted-foreground mb-1">Total Budget</p>
                <p className="font-mono text-xl font-bold text-primary">{fmtCurrency(weddingResult.total, currency, 0)}</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">Cost per Guest</p>
                <p className="font-mono text-xl font-bold text-foreground">{fmtCurrency(weddingResult.perHead, currency, 0)}</p>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="party" className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Number of Guests</Label>
              <Input type="number" value={partyGuests} onChange={e => setPartyGuests(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Venue Hire ({currency.symbol})</Label>
              <Input type="number" value={partyVenue} onChange={e => setPartyVenue(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Food per Head ({currency.symbol})</Label>
              <Input type="number" value={partyFoodPerHead} onChange={e => setPartyFoodPerHead(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Drinks ({currency.symbol})</Label>
              <Input type="number" value={partyDrinks} onChange={e => setPartyDrinks(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Decor ({currency.symbol})</Label>
              <Input type="number" value={partyDecor} onChange={e => setPartyDecor(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Entertainment ({currency.symbol})</Label>
              <Input type="number" value={partyEnt} onChange={e => setPartyEnt(e.target.value)} />
            </div>
          </div>
          <Button className="w-full" onClick={calcParty}>Calculate</Button>
          {partyResult && (
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-background rounded-lg p-4 border border-primary/30 text-center">
                <p className="text-xs text-muted-foreground mb-1">Total Event Cost</p>
                <p className="font-mono text-xl font-bold text-primary">{fmtCurrency(partyResult.total, currency, 0)}</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">Per Head</p>
                <p className="font-mono text-xl font-bold text-foreground">{fmtCurrency(partyResult.perHead, currency, 0)}</p>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="holiday" className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Holiday Target ({currency.symbol})</Label>
              <Input type="number" value={holidayTarget} onChange={e => setHolidayTarget(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Months to Save</Label>
              <Input type="number" value={holidayMonths} onChange={e => setHolidayMonths(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Already Saved ({currency.symbol})</Label>
              <Input type="number" value={holidayExisting} onChange={e => setHolidayExisting(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Savings Account Rate (%)</Label>
              <Input type="number" value={holidayRate} onChange={e => setHolidayRate(e.target.value)} step="0.25" />
            </div>
          </div>
          <Button className="w-full" onClick={calcHoliday}>Calculate Monthly Saving</Button>
          {holidayResult && (
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-background rounded-lg p-4 border border-primary/30 text-center">
                <p className="text-xs text-muted-foreground mb-1">Save per Month</p>
                <p className="font-mono text-xl font-bold text-primary">{fmtCurrency(holidayResult.monthly, currency, 0)}</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">Total Saved</p>
                <p className="font-mono text-xl font-bold text-foreground">{fmtCurrency(holidayResult.total, currency, 0)}</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">Interest Earned</p>
                <p className="font-mono text-xl font-bold text-foreground">{fmtCurrency(holidayResult.interest, currency, 0)}</p>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </CalculatorLayout>
  );
}
