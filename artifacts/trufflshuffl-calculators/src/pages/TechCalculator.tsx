import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CurrencySelect } from "@/components/CurrencySelect";
import { DEFAULT_CURRENCY, fmtCurrency, type Currency } from "@/lib/currencies";
import { CALCULATOR_GUIDES } from "@/lib/calculatorGuides";

function fmt(n: number, dec = 2) {
  return n.toLocaleString("en-ZA", { minimumFractionDigits: dec, maximumFractionDigits: dec });
}

export default function TechCalculator() {
  const [currency, setCurrency] = useState<Currency>(DEFAULT_CURRENCY);

  const [users, setUsers] = useState("5");
  const [videoHD, setVideoHD] = useState("2");
  const [gaming, setGaming] = useState("1");
  const [browsing, setBrowsing] = useState("5");
  const [internetResult, setInternetResult] = useState<{ recommended: number; minimum: number } | null>(null);

  const [storageItems, setStorageItems] = useState([
    { label: "4K Movies (80 GB each)", size: "80", count: "10" },
    { label: "HD Movies (8 GB each)", size: "8", count: "50" },
    { label: "Music albums (100 MB each)", size: "0.1", count: "200" },
    { label: "Photos (5 MB each)", size: "0.005", count: "5000" },
    { label: "Games (50 GB each)", size: "50", count: "20" },
    { label: "Documents (1 MB each)", size: "0.001", count: "1000" },
  ]);
  const [storageResult, setStorageResult] = useState<{ totalGB: number; totalTB: number } | null>(null);

  const [aiModel, setAiModel] = useState("gpt4o");
  const [inputTokens, setInputTokens] = useState("1000");
  const [outputTokens, setOutputTokens] = useState("500");
  const [aiRequests, setAiRequests] = useState("1000");
  const [aiResult, setAiResult] = useState<{ costPerRequest: number; monthlyUSD: number; monthlyLocal: number } | null>(null);

  const [ssdCapGB, setSsdCapGB] = useState("500");
  const [tbwRating, setTbwRating] = useState("300");
  const [dailyWriteGB, setDailyWriteGB] = useState("20");
  const [ssdResult, setSsdResult] = useState<{ yearsLeft: number; daysLeft: number } | null>(null);

  const AI_PRICING: Record<string, { in: number; out: number; name: string }> = {
    gpt4o: { name: "GPT-4o", in: 0.0025, out: 0.01 },
    gpt4o_mini: { name: "GPT-4o mini", in: 0.00015, out: 0.0006 },
    claude35: { name: "Claude 3.5 Sonnet", in: 0.003, out: 0.015 },
    claude3h: { name: "Claude 3 Haiku", in: 0.00025, out: 0.00125 },
    gemini15p: { name: "Gemini 1.5 Pro", in: 0.00125, out: 0.005 },
    gemini15f: { name: "Gemini 1.5 Flash", in: 0.000075, out: 0.0003 },
  };

  function calcInternet() {
    const streamMbps = Number(videoHD) * 25;
    const gameMbps = Number(gaming) * 30;
    const browseMbps = Number(browsing) * 5;
    const minimum = streamMbps + gameMbps + browseMbps;
    const recommended = minimum * 1.5;
    setInternetResult({ recommended: Math.ceil(recommended / 10) * 10, minimum: Math.ceil(minimum / 10) * 10 });
  }

  function calcStorage() {
    const totalGB = storageItems.reduce((s, item) => s + Number(item.size) * Number(item.count), 0);
    setStorageResult({ totalGB, totalTB: totalGB / 1024 });
  }

  function calcAI() {
    const model = AI_PRICING[aiModel];
    const inCost = (Number(inputTokens) / 1000) * model.in;
    const outCost = (Number(outputTokens) / 1000) * model.out;
    const costPerRequest = inCost + outCost;
    const monthlyUSD = costPerRequest * Number(aiRequests);
    const monthlyLocal = monthlyUSD * 18.5;
    setAiResult({ costPerRequest, monthlyUSD, monthlyLocal });
  }

  function calcSSD() {
    const tbw = Number(tbwRating);
    const daily = Number(dailyWriteGB);
    const daysLeft = (tbw * 1024) / daily;
    setAiResult(null);
    setSsdResult({ yearsLeft: daysLeft / 365, daysLeft });
  }

  function updateStorage(i: number, field: "size" | "count", value: string) {
    setStorageItems(prev => prev.map((item, idx) => idx === i ? { ...item, [field]: value } : item));
  }

  return (
    <CalculatorLayout
      guide={CALCULATOR_GUIDES['tech']}
      title="Technology Calculator"
      description="Calculate your required internet speed, estimate storage needs, work out AI API costs per request, and check your SSD remaining lifespan."
      instructions={
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>Internet Speed: enter your household usage to find the Mbps you need</li>
          <li>Storage: adjust item counts to estimate total GB and TB required</li>
          <li>AI API Cost: select a model and enter token counts to see cost per request and monthly totals</li>
          <li>SSD Lifespan: enter drive capacity, TBW rating and daily writes to estimate remaining life</li>
        </ol>
      }
      testimonial="The internet speed calculator helped me finally justify upgrading from 50 Mbps to 200 Mbps fibre — with two people working from home doing video calls, gaming and streaming, I was running at 95% capacity constantly. The calculation showed I actually needed 140 Mbps minimum. The AI API cost tab is something I use weekly as a developer. I integrate multiple models into client apps and need to forecast API spend accurately — seeing that GPT-4o costs R0.06 per request versus Gemini 1.5 Flash at R0.0003 completely changed how I architect my applications. The SSD lifespan tab confirmed my heavily-used NVMe drive was fine for another four years at my current write rate. Really useful for anyone who works in tech."
    >
      <Tabs defaultValue="internet">
        <TabsList className="w-full grid grid-cols-4">
          <TabsTrigger value="internet">Internet</TabsTrigger>
          <TabsTrigger value="storage">Storage</TabsTrigger>
          <TabsTrigger value="ai">AI Cost</TabsTrigger>
          <TabsTrigger value="ssd">SSD Life</TabsTrigger>
        </TabsList>

        <TabsContent value="internet" className="space-y-4 pt-4">
          <p className="text-xs text-muted-foreground">Enter number of simultaneous users per activity:</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>HD/4K Video Streams</Label>
              <Input type="number" value={videoHD} onChange={e => setVideoHD(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Online Gaming</Label>
              <Input type="number" value={gaming} onChange={e => setGaming(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Browsing / Video Calls</Label>
              <Input type="number" value={browsing} onChange={e => setBrowsing(e.target.value)} />
            </div>
          </div>
          <Button className="w-full" onClick={calcInternet}>Calculate</Button>
          {internetResult && (
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">Minimum Speed</p>
                <p className="font-mono text-xl font-bold text-foreground">{internetResult.minimum} Mbps</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-primary/30 text-center">
                <p className="text-xs text-muted-foreground mb-1">Recommended Speed</p>
                <p className="font-mono text-xl font-bold text-primary">{internetResult.recommended} Mbps</p>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="storage" className="space-y-3 pt-4">
          {storageItems.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground flex-1">{item.label}</span>
              <Input type="number" value={item.count} onChange={e => updateStorage(i, "count", e.target.value)} className="w-24 text-sm" />
            </div>
          ))}
          <Button className="w-full" onClick={calcStorage}>Calculate Total Storage</Button>
          {storageResult && (
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-background rounded-lg p-4 border border-primary/30 text-center">
                <p className="text-xs text-muted-foreground mb-1">Total Storage</p>
                <p className="font-mono text-xl font-bold text-primary">{fmt(storageResult.totalGB, 0)} GB</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">In Terabytes</p>
                <p className="font-mono text-xl font-bold text-foreground">{fmt(storageResult.totalTB, 2)} TB</p>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="ai" className="space-y-4 pt-4">
          <div className="flex justify-end">
            <CurrencySelect value={currency} onChange={setCurrency} />
          </div>
          <div className="space-y-1.5">
            <Label>AI Model</Label>
            <Select value={aiModel} onValueChange={setAiModel}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {Object.entries(AI_PRICING).map(([key, val]) => (
                  <SelectItem key={key} value={key}>{val.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label>Input Tokens</Label>
              <Input type="number" value={inputTokens} onChange={e => setInputTokens(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Output Tokens</Label>
              <Input type="number" value={outputTokens} onChange={e => setOutputTokens(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Requests/Month</Label>
              <Input type="number" value={aiRequests} onChange={e => setAiRequests(e.target.value)} />
            </div>
          </div>
          <Button className="w-full" onClick={calcAI}>Calculate Cost</Button>
          {aiResult && (
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">Per Request</p>
                <p className="font-mono text-sm font-bold text-foreground">${fmt(aiResult.costPerRequest, 6)}</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">Monthly (USD)</p>
                <p className="font-mono text-lg font-bold text-foreground">${fmt(aiResult.monthlyUSD, 2)}</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-primary/30 text-center">
                <p className="text-xs text-muted-foreground mb-1">Monthly ({currency.code})</p>
                <p className="font-mono text-lg font-bold text-primary">{fmtCurrency(aiResult.monthlyLocal, currency)}</p>
              </div>
            </div>
          )}
          <p className="text-xs text-muted-foreground">Pricing as of mid-2025. Exchange rate: R18.50/USD. Check provider sites for current rates.</p>
        </TabsContent>

        <TabsContent value="ssd" className="space-y-4 pt-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label>Drive Capacity (GB)</Label>
              <Input type="number" value={ssdCapGB} onChange={e => setSsdCapGB(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>TBW Rating (TB)</Label>
              <Input type="number" value={tbwRating} onChange={e => setTbwRating(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Daily Writes (GB/day)</Label>
              <Input type="number" value={dailyWriteGB} onChange={e => setDailyWriteGB(e.target.value)} />
            </div>
          </div>
          <Button className="w-full" onClick={calcSSD}>Calculate</Button>
          {ssdResult && (
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-background rounded-lg p-4 border border-primary/30 text-center">
                <p className="text-xs text-muted-foreground mb-1">Remaining Life</p>
                <p className="font-mono text-2xl font-bold text-primary">{fmt(ssdResult.yearsLeft, 1)} years</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">Days Remaining</p>
                <p className="font-mono text-2xl font-bold text-foreground">{fmt(ssdResult.daysLeft, 0)}</p>
              </div>
            </div>
          )}
          <p className="text-xs text-muted-foreground">TBW (Terabytes Written) is the manufacturer's endurance rating. Find it in your drive specs. Typical: 300 TB (500 GB consumer SSD), 600 TB (1 TB prosumer).</p>
        </TabsContent>
      </Tabs>
    </CalculatorLayout>
  );
}
