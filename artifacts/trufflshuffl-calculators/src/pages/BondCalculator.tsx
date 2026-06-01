import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CurrencySelect } from "@/components/CurrencySelect";
import { DEFAULT_CURRENCY, fmtCurrency, type Currency } from "@/lib/currencies";
import { calculateBondPrice, calculateYTM } from "@/lib/calculators/financial";

const BOND_TYPES = [
  "Government Bond", "Corporate Bond", "Zero-Coupon Bond",
  "Convertible Bond", "Municipal Bond", "Inflation-Linked Bond",
];

const COUPON_FREQS = [
  { label: "Annual (1×)", value: "1" },
  { label: "Semi-annual (2×)", value: "2" },
  { label: "Quarterly (4×)", value: "4" },
  { label: "Monthly (12×)", value: "12" },
];

export default function BondCalculator() {
  const [currency, setCurrency] = useState<Currency>(DEFAULT_CURRENCY);
  const [bondType, setBondType] = useState("Government Bond");
  const [faceValue, setFaceValue] = useState("1000");
  const [couponRate, setCouponRate] = useState("8");
  const [couponFreq, setCouponFreq] = useState("2");
  const [years, setYears] = useState("10");
  const [marketYield, setMarketYield] = useState("9");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [result, setResult] = useState<ReturnType<typeof calculateBondPrice> | null>(null);
  const [ytm, setYtm] = useState<number | null>(null);

  function fmt(n: number, dec = 2) {
    return fmtCurrency(n, currency);
  }

  function calculate() {
    const r = calculateBondPrice(Number(faceValue), Number(couponRate), Number(couponFreq), Number(years), Number(marketYield));
    setResult(r);
    if (purchasePrice) {
      setYtm(calculateYTM(Number(faceValue), Number(purchasePrice), Number(couponRate), Number(couponFreq), Number(years)));
    } else {
      setYtm(null);
    }
  }

  const showSchedule = result ? result.schedule.slice(0, 12) : [];

  return (
    <CalculatorLayout
      title="Bond / Fixed Income Calculator"
      description="Price any fixed-income bond, calculate yield to maturity, Macaulay duration, and view the full coupon payment schedule — in any world currency."
      instructions={
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>Select your currency</li>
          <li>Select bond type and enter face value</li>
          <li>Set the coupon rate and payment frequency</li>
          <li>Enter years to maturity and the required market yield</li>
          <li>Optionally enter a purchase price to calculate YTM</li>
          <li>Click Calculate to price the bond</li>
        </ol>
      }
      testimonial="I was studying for my CFP exams and struggled with bond pricing concepts until I found TrufflShuffl's Bond Calculator. Being able to punch in real numbers and instantly see how the price changes as yields move makes the relationship tangible in a way that textbooks never could. The Macaulay duration figure helps me understand interest rate sensitivity, and the coupon schedule table is perfect for checking my manual calculations. My study group now uses it daily."
    >
      <div className="space-y-5">
        <div className="space-y-1.5">
          <Label>Currency</Label>
          <CurrencySelect value={currency} onChange={setCurrency} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5 col-span-2">
            <Label>Bond Type</Label>
            <Select value={bondType} onValueChange={setBondType}>
              <SelectTrigger data-testid="select-bond-type"><SelectValue /></SelectTrigger>
              <SelectContent>{BOND_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Face Value ({currency.symbol})</Label>
            <Input data-testid="input-face" type="number" value={faceValue} onChange={e => setFaceValue(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Coupon Rate (%)</Label>
            <Input data-testid="input-coupon" type="number" value={couponRate} onChange={e => setCouponRate(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Coupon Frequency</Label>
            <Select value={couponFreq} onValueChange={setCouponFreq}>
              <SelectTrigger data-testid="select-freq"><SelectValue /></SelectTrigger>
              <SelectContent>{COUPON_FREQS.map(f => <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Years to Maturity</Label>
            <Input data-testid="input-years" type="number" value={years} onChange={e => setYears(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Market Yield (%)</Label>
            <Input data-testid="input-yield" type="number" value={marketYield} onChange={e => setMarketYield(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Purchase Price ({currency.symbol}) — optional for YTM</Label>
            <Input data-testid="input-purchase" type="number" value={purchasePrice} onChange={e => setPurchasePrice(e.target.value)} placeholder="Leave blank to skip" />
          </div>
        </div>

        <Button data-testid="button-calculate" className="w-full" onClick={calculate}>Calculate</Button>

        {result && (
          <div className="space-y-4 pt-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-background rounded-lg p-4 border border-primary/30 col-span-2">
                <p className="text-xs text-muted-foreground mb-1">Calculated Bond Price</p>
                <p className="font-mono text-2xl font-bold text-primary" data-testid="result-price">{fmt(result.price)}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {result.price > Number(faceValue) ? "Trading at a PREMIUM" : result.price < Number(faceValue) ? "Trading at a DISCOUNT" : "Trading at PAR"}
                </p>
              </div>
              {ytm !== null && (
                <div className="bg-background rounded-lg p-4 border border-border">
                  <p className="text-xs text-muted-foreground mb-1">Yield to Maturity</p>
                  <p className="font-mono text-xl font-bold text-foreground">{ytm.toFixed(2)}%</p>
                </div>
              )}
              <div className="bg-background rounded-lg p-4 border border-border">
                <p className="text-xs text-muted-foreground mb-1">Macaulay Duration</p>
                <p className="font-mono text-xl font-bold text-foreground">{result.duration.toFixed(2)} years</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border">
                <p className="text-xs text-muted-foreground mb-1">Total Coupon Payments</p>
                <p className="font-mono text-lg font-bold text-foreground">{fmt(result.totalCoupons)}</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border">
                <p className="text-xs text-muted-foreground mb-1">Total Return</p>
                <p className="font-mono text-lg font-bold text-foreground">{fmt(result.totalCoupons + Number(faceValue))}</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold mb-2">Coupon Schedule (first 12 periods)</p>
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="text-muted-foreground">
                    <th className="text-left py-2 border-b border-border">Period</th>
                    <th className="text-right py-2 border-b border-border">Coupon</th>
                    <th className="text-right py-2 border-b border-border">Present Value</th>
                  </tr>
                </thead>
                <tbody>
                  {showSchedule.map(row => (
                    <tr key={row.period} className="border-b border-border/40">
                      <td className="py-1.5 font-mono">{row.period}</td>
                      <td className="py-1.5 text-right font-mono text-primary">{fmt(row.coupon)}</td>
                      <td className="py-1.5 text-right font-mono">{fmt(row.pv)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
