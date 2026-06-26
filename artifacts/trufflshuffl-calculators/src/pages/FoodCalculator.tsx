import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CALCULATOR_GUIDES } from "@/lib/calculatorGuides";

function fmt(n: number, dec = 2) {
  return n.toLocaleString("en-ZA", { minimumFractionDigits: dec, maximumFractionDigits: dec });
}

type Ingredient = { name: string; amount: string; unit: string };

export default function FoodCalculator() {
  const [servingsOrig, setServingsOrig] = useState("4");
  const [servingsNew, setServingsNew] = useState("10");
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: "Flour", amount: "200", unit: "g" },
    { name: "Sugar", amount: "100", unit: "g" },
    { name: "Butter", amount: "125", unit: "g" },
    { name: "Eggs", amount: "2", unit: "count" },
    { name: "Milk", amount: "125", unit: "ml" },
  ]);
  const [scaleResult, setScaleResult] = useState<{ name: string; scaled: number; unit: string }[] | null>(null);

  const [coffeeDoseg, setCoffeeDoseg] = useState("18");
  const [coffeeRatio, setCoffeeRatio] = useState("1:15");
  const [coffeeResult, setCoffeeResult] = useState<{ waterMl: number; totalGrams: number } | null>(null);

  const [meatWeightKg, setMeatWeightKg] = useState("2");
  const [meatType, setMeatType] = useState("brisket");
  const [bbqResult, setBbqResult] = useState<{ hours: number; minTemp: number; restMin: number } | null>(null);

  const [flourG, setFlourG] = useState("500");
  const [hydration, setHydration] = useState("65");
  const [breadResult, setBreadResult] = useState<{ waterG: number; saltG: number; yeastG: number; totalG: number } | null>(null);

  function scaleRecipe() {
    const ratio = Number(servingsNew) / Number(servingsOrig);
    const result = ingredients.map(ing => ({ name: ing.name, scaled: Number(ing.amount) * ratio, unit: ing.unit }));
    setScaleResult(result);
  }

  function calcCoffee() {
    const dose = Number(coffeeDoseg);
    const parts = coffeeRatio.split(":").map(Number);
    const ratio = parts[1] / parts[0];
    const waterMl = dose * ratio;
    setCoffeeResult({ waterMl, totalGrams: dose + waterMl });
  }

  function calcBBQ() {
    const weight = Number(meatWeightKg);
    const times: Record<string, { h: number; t: number; r: number }> = {
      brisket: { h: 1.5, t: 90, r: 60 },
      ribs: { h: 1.25, t: 85, r: 30 },
      pork_shoulder: { h: 1.5, t: 95, r: 45 },
      lamb_leg: { h: 1.0, t: 80, r: 30 },
      whole_chicken: { h: 0.75, t: 75, r: 20 },
    };
    const cfg = times[meatType] ?? times.brisket;
    setBbqResult({ hours: weight * cfg.h, minTemp: cfg.t, restMin: cfg.r });
  }

  function calcBread() {
    const flour = Number(flourG);
    const water = flour * (Number(hydration) / 100);
    const salt = flour * 0.02;
    const yeast = flour * 0.01;
    setBreadResult({ waterG: water, saltG: salt, yeastG: yeast, totalG: flour + water + salt + yeast });
  }

  function addIngredient() {
    setIngredients(prev => [...prev, { name: "", amount: "0", unit: "g" }]);
  }

  function updateIngredient(i: number, field: keyof Ingredient, value: string) {
    setIngredients(prev => prev.map((ing, idx) => idx === i ? { ...ing, [field]: value } : ing));
  }

  return (
    <CalculatorLayout
      guide={CALCULATOR_GUIDES['food']}
      title="Food & Cooking Calculator"
      description="Scale recipes for any number of servings, calculate coffee brew ratios, estimate BBQ braai cooking times, and work out bread baking hydration."
      instructions={
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>Recipe Scaling: enter your original and new serving count to scale all ingredients</li>
          <li>Coffee: enter dose and brew ratio for the exact water amount</li>
          <li>Braai/BBQ: enter meat type and weight for estimated cooking time and internal temp</li>
          <li>Bread: enter flour weight and hydration percentage for a full dough formula</li>
        </ol>
      }
      testimonial="I run a small catering business and the recipe scaling tab has eliminated so many errors. Scaling a cake recipe designed for 4 servings up to 80 servings used to require careful manual multiplication — now I just change the number and all quantities update instantly. The coffee ratio calculator is great for my pour-over brewing: I use a 1:15 ratio with an 18 g dose which gives me 270 ml of perfect filter coffee every time. The braai calculator is the real crowd-pleaser — I showed it to my neighbours before our Heritage Day get-together and they were impressed that a 3 kg brisket needs 4.5 hours at 120°C with a 60-minute rest. The bread hydration tab has improved my sourdough enormously — understanding baker's percentages changed everything."
    >
      <Tabs defaultValue="scale">
        <TabsList className="w-full">
          <TabsTrigger value="scale" className="flex-1">Recipe Scale</TabsTrigger>
          <TabsTrigger value="coffee" className="flex-1">Coffee</TabsTrigger>
          <TabsTrigger value="bbq" className="flex-1">Braai / BBQ</TabsTrigger>
          <TabsTrigger value="bread" className="flex-1">Bread</TabsTrigger>
        </TabsList>

        <TabsContent value="scale" className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Original Servings</Label>
              <Input type="number" value={servingsOrig} onChange={e => setServingsOrig(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>New Servings</Label>
              <Input type="number" value={servingsNew} onChange={e => setServingsNew(e.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            {ingredients.map((ing, i) => (
              <div key={i} className="flex items-center gap-2">
                <Input placeholder="Ingredient" value={ing.name} onChange={e => updateIngredient(i, "name", e.target.value)} className="flex-1 text-sm" />
                <Input type="number" placeholder="Amount" value={ing.amount} onChange={e => updateIngredient(i, "amount", e.target.value)} className="w-20 text-sm" />
                <Input placeholder="unit" value={ing.unit} onChange={e => updateIngredient(i, "unit", e.target.value)} className="w-16 text-sm" />
              </div>
            ))}
            <button onClick={addIngredient} className="text-xs text-primary hover:underline">+ Add ingredient</button>
          </div>
          <Button className="w-full" onClick={scaleRecipe}>Scale Recipe</Button>
          {scaleResult && (
            <div className="space-y-2">
              {scaleResult.map(r => (
                <div key={r.name} className="flex justify-between items-center bg-background rounded-lg px-3 py-2 border border-border">
                  <span className="text-sm text-muted-foreground">{r.name || "Ingredient"}</span>
                  <span className="font-mono text-sm font-bold">{fmt(r.scaled, r.unit === "count" ? 1 : 1)} {r.unit}</span>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="coffee" className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Coffee Dose (g)</Label>
              <Input type="number" value={coffeeDoseg} onChange={e => setCoffeeDoseg(e.target.value)} step="0.5" />
            </div>
            <div className="space-y-1.5">
              <Label>Brew Ratio (coffee:water)</Label>
              <select value={coffeeRatio} onChange={e => setCoffeeRatio(e.target.value)}
                className="w-full bg-background border border-border text-foreground text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary">
                {["1:10", "1:12", "1:14", "1:15", "1:16", "1:17", "1:18"].map(r => <option key={r} value={r}>{r} ({r === "1:15" ? "pour-over" : r === "1:17" ? "light roast" : r === "1:10" ? "espresso" : "filter"})</option>)}
              </select>
            </div>
          </div>
          <Button className="w-full" onClick={calcCoffee}>Calculate</Button>
          {coffeeResult && (
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-background rounded-lg p-4 border border-primary/30 text-center">
                <p className="text-xs text-muted-foreground mb-1">Water Needed</p>
                <p className="font-mono text-2xl font-bold text-primary">{fmt(coffeeResult.waterMl, 0)} ml</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">Total Weight</p>
                <p className="font-mono text-2xl font-bold text-foreground">{fmt(coffeeResult.totalGrams, 0)} g</p>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="bbq" className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Meat Type</Label>
              <select value={meatType} onChange={e => setMeatType(e.target.value)}
                className="w-full bg-background border border-border text-foreground text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary">
                <option value="brisket">Beef Brisket</option>
                <option value="ribs">Beef / Pork Ribs</option>
                <option value="pork_shoulder">Pork Shoulder / Neck</option>
                <option value="lamb_leg">Lamb Leg</option>
                <option value="whole_chicken">Whole Chicken</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <Label>Meat Weight (kg)</Label>
              <Input type="number" value={meatWeightKg} onChange={e => setMeatWeightKg(e.target.value)} step="0.5" />
            </div>
          </div>
          <Button className="w-full" onClick={calcBBQ}>Calculate</Button>
          {bbqResult && (
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-background rounded-lg p-4 border border-primary/30 text-center">
                <p className="text-xs text-muted-foreground mb-1">Cook Time</p>
                <p className="font-mono text-xl font-bold text-primary">{fmt(bbqResult.hours, 1)} hrs</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">Internal Temp</p>
                <p className="font-mono text-xl font-bold text-foreground">{bbqResult.minTemp}°C</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">Rest Time</p>
                <p className="font-mono text-xl font-bold text-foreground">{bbqResult.restMin} min</p>
              </div>
            </div>
          )}
          <p className="text-xs text-muted-foreground">Low and slow at 110–120°C. Use a meat thermometer for accurate doneness — times are estimates. Always rest before slicing.</p>
        </TabsContent>

        <TabsContent value="bread" className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Flour (g)</Label>
              <Input type="number" value={flourG} onChange={e => setFlourG(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Hydration (%)</Label>
              <Input type="number" value={hydration} onChange={e => setHydration(e.target.value)} min="50" max="100" />
            </div>
          </div>
          <Button className="w-full" onClick={calcBread}>Calculate Dough Formula</Button>
          {breadResult && (
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground">Flour</p>
                <p className="font-mono font-bold">{fmt(Number(flourG), 0)} g</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-primary/30 text-center">
                <p className="text-xs text-muted-foreground">Water</p>
                <p className="font-mono font-bold text-primary">{fmt(breadResult.waterG, 0)} g</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground">Salt (2%)</p>
                <p className="font-mono font-bold">{fmt(breadResult.saltG, 1)} g</p>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground">Yeast (1%)</p>
                <p className="font-mono font-bold">{fmt(breadResult.yeastG, 1)} g</p>
              </div>
              <div className="col-span-2 bg-background rounded-lg p-3 border border-border text-center">
                <p className="text-xs text-muted-foreground">Total Dough Weight</p>
                <p className="font-mono font-bold text-lg">{fmt(breadResult.totalG, 0)} g</p>
              </div>
            </div>
          )}
          <p className="text-xs text-muted-foreground">Sandwich loaf: 60–65%. Pizza dough: 65–70%. Focaccia: 75–80%. Ciabatta: 80–85%.</p>
        </TabsContent>
      </Tabs>
    </CalculatorLayout>
  );
}
