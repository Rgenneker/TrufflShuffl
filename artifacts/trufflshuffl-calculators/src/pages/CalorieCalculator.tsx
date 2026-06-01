import { useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { calculateBMR, calculateTDEE, getGoalCalories, getMacros, FOOD_DATABASE } from "@/lib/calculators/health";

const ACTIVITY_LABELS: Record<string, string> = {
  sedentary: "Sedentary (desk job, little exercise)",
  light: "Lightly active (1-3 days/week)",
  moderate: "Moderately active (3-5 days/week)",
  active: "Very active (6-7 days/week)",
  extra: "Extra active (physical job + training)",
};

const GOALS = [
  { value: "lose", label: "Lose Weight" },
  { value: "maintain", label: "Maintain Weight" },
  { value: "gain", label: "Gain Muscle" },
];

type MealItem = { name: string; kcal: number; grams: number; meal: string };

function fmt(n: number) { return Math.round(n).toLocaleString(); }

export default function CalorieCalculator() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [sex, setSex] = useState<"male" | "female">("male");
  const [age, setAge] = useState("30");
  const [height, setHeight] = useState("175");
  const [heightFt, setHeightFt] = useState("5");
  const [heightIn, setHeightIn] = useState("9");
  const [weight, setWeight] = useState("80");
  const [activity, setActivity] = useState("moderate");
  const [goal, setGoal] = useState("maintain");
  const [result, setResult] = useState<{ mifflin: number; harris: number; tdee: number; goalCal: number; macros: ReturnType<typeof getMacros> } | null>(null);

  // Food tracker
  const [mealItems, setMealItems] = useState<MealItem[]>([]);
  const [selCategory, setSelCategory] = useState("Fruits");
  const [selFood, setSelFood] = useState("");
  const [grams, setGrams] = useState("100");
  const [meal, setMeal] = useState("Breakfast");

  function calculateTDEEResult() {
    let heightCm = unit === "metric" ? Number(height) : (Number(heightFt) * 12 + Number(heightIn)) * 2.54;
    let weightKg = unit === "metric" ? Number(weight) : Number(weight) * 0.453592;
    const { mifflin, harris } = calculateBMR(weightKg, heightCm, Number(age), sex);
    const tdee = calculateTDEE(mifflin, activity);
    const goalCal = getGoalCalories(tdee, goal);
    const macros = getMacros(goalCal);
    setResult({ mifflin, harris, tdee, goalCal, macros });
  }

  function addFood() {
    const foods = FOOD_DATABASE[selCategory] ?? [];
    const food = foods.find(f => f.name === selFood) ?? foods[0];
    if (!food) return;
    const kcal = food.kcal * Number(grams) / 100;
    setMealItems(items => [...items, { name: food.name, kcal, grams: Number(grams), meal }]);
  }

  const totalKcal = mealItems.reduce((s, i) => s + i.kcal, 0);
  const meals = ["Breakfast", "Lunch", "Dinner", "Snacks"];
  const catFoods = FOOD_DATABASE[selCategory] ?? [];

  return (
    <CalculatorLayout
      title="Calorie Calculator"
      description="Calculate your daily calorie needs with TDEE, BMR and personalised macro targets — plus a food calorie tracker to log your daily intake by meal."
      instructions={
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>Use the TDEE tab to calculate your daily energy needs</li>
          <li>Enter age, height, weight and activity level</li>
          <li>Select your goal (lose, maintain, gain)</li>
          <li>See your personalised calorie and macro targets</li>
          <li>Switch to the Food Tracker tab to log what you eat</li>
          <li>Add foods by category, portion size and meal</li>
        </ol>
      }
      testimonial="I've tried dozens of calorie calculators but this one is the most complete. Seeing both the Mifflin-St Jeor and Harris-Benedict BMR formulas side by side gave me confidence in the number — they agreed within 50 calories. The macro breakdown in grams (not just percentages) is what I needed to hit my protein target for muscle gain. The food tracker, while not a full database, covers the foods I actually eat — South African staples like pap, biltong and braai meat could be added, but the main categories are comprehensive. I've been using the TDEE calculator monthly to recalculate as my weight changes, and the results have been tracking perfectly with my actual progress. Best free nutrition tool I've found."
    >
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Units:</span>
          <div className="flex rounded-lg border border-border overflow-hidden">
            {(["metric", "imperial"] as const).map(u => (
              <button key={u} data-testid={`btn-unit-${u}`} onClick={() => setUnit(u)}
                className={`px-4 py-1.5 text-sm capitalize transition-colors ${unit === u ? "bg-primary text-primary-foreground font-semibold" : "text-muted-foreground hover:text-foreground"}`}>
                {u}
              </button>
            ))}
          </div>
        </div>

        <Tabs defaultValue="tdee">
          <TabsList className="w-full">
            <TabsTrigger value="tdee" className="flex-1">Daily Calorie Needs</TabsTrigger>
            <TabsTrigger value="tracker" className="flex-1">Food Tracker</TabsTrigger>
          </TabsList>

          <TabsContent value="tdee" className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5 col-span-2">
                <Label>Sex</Label>
                <div className="flex rounded-lg border border-border overflow-hidden w-fit">
                  {(["male", "female"] as const).map(s => (
                    <button key={s} data-testid={`btn-sex-${s}`} onClick={() => setSex(s)}
                      className={`px-5 py-1.5 text-sm capitalize transition-colors ${sex === s ? "bg-primary text-primary-foreground font-semibold" : "text-muted-foreground hover:text-foreground"}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label>Age</Label>
                <Input data-testid="input-age" type="number" value={age} onChange={e => setAge(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Weight ({unit === "metric" ? "kg" : "lbs"})</Label>
                <Input data-testid="input-weight" type="number" value={weight} onChange={e => setWeight(e.target.value)} />
              </div>

              {unit === "metric" ? (
                <div className="space-y-1.5 col-span-2">
                  <Label>Height (cm)</Label>
                  <Input data-testid="input-height" type="number" value={height} onChange={e => setHeight(e.target.value)} />
                </div>
              ) : (
                <>
                  <div className="space-y-1.5">
                    <Label>Height (ft)</Label>
                    <Input data-testid="input-height-ft" type="number" value={heightFt} onChange={e => setHeightFt(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Height (in)</Label>
                    <Input data-testid="input-height-in" type="number" value={heightIn} onChange={e => setHeightIn(e.target.value)} />
                  </div>
                </>
              )}

              <div className="space-y-1.5 col-span-2">
                <Label>Activity Level</Label>
                <Select value={activity} onValueChange={setActivity}>
                  <SelectTrigger data-testid="select-activity"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Object.entries(ACTIVITY_LABELS).map(([v, l]) => <SelectItem key={v} value={v}>{l}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5 col-span-2">
                <Label>Goal</Label>
                <div className="grid grid-cols-3 gap-2">
                  {GOALS.map(g => (
                    <button key={g.value} data-testid={`btn-goal-${g.value}`} onClick={() => setGoal(g.value)}
                      className={`py-2 text-xs rounded-lg border transition-colors ${goal === g.value ? "bg-primary text-primary-foreground border-primary font-semibold" : "border-border text-muted-foreground hover:border-primary/50"}`}>
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <Button data-testid="button-calculate" className="w-full" onClick={calculateTDEEResult}>Calculate</Button>

            {result && (
              <div className="space-y-4 pt-2">
                <div className="bg-background rounded-lg p-4 border border-primary/30">
                  <p className="text-xs text-muted-foreground mb-1">Recommended Daily Calories</p>
                  <p className="font-mono text-3xl font-bold text-primary" data-testid="result-calories">{fmt(result.goalCal)} kcal</p>
                  <p className="text-xs text-muted-foreground mt-1">TDEE: {fmt(result.tdee)} kcal</p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Protein", value: result.macros.protein, color: "text-blue-400" },
                    { label: "Carbs", value: result.macros.carbs, color: "text-yellow-400" },
                    { label: "Fat", value: result.macros.fat, color: "text-orange-400" },
                  ].map(m => (
                    <div key={m.label} className="bg-background rounded-lg p-3 border border-border text-center">
                      <p className="text-xs text-muted-foreground">{m.label}</p>
                      <p className={`font-mono text-lg font-bold ${m.color}`}>{m.value}g</p>
                    </div>
                  ))}
                </div>

                <div className="bg-background rounded-lg p-4 border border-border text-xs space-y-1">
                  <p className="text-sm font-semibold text-foreground mb-2">BMR Comparison</p>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Mifflin-St Jeor</span>
                    <span className="font-mono text-foreground">{fmt(result.mifflin)} kcal</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Harris-Benedict</span>
                    <span className="font-mono text-foreground">{fmt(result.harris)} kcal</span>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="tracker" className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5 col-span-2">
                <Label>Category</Label>
                <Select value={selCategory} onValueChange={c => { setSelCategory(c); setSelFood(""); }}>
                  <SelectTrigger data-testid="select-category"><SelectValue /></SelectTrigger>
                  <SelectContent>{Object.keys(FOOD_DATABASE).map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5 col-span-2">
                <Label>Food Item</Label>
                <Select value={selFood} onValueChange={setSelFood}>
                  <SelectTrigger data-testid="select-food"><SelectValue placeholder="Select food..." /></SelectTrigger>
                  <SelectContent>{catFoods.map(f => <SelectItem key={f.name} value={f.name}>{f.name} ({f.kcal} kcal/100g)</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Portion (g or ml)</Label>
                <Input data-testid="input-grams" type="number" value={grams} onChange={e => setGrams(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Meal</Label>
                <Select value={meal} onValueChange={setMeal}>
                  <SelectTrigger data-testid="select-meal"><SelectValue /></SelectTrigger>
                  <SelectContent>{meals.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>

            <Button data-testid="button-add-food" className="w-full" onClick={addFood} disabled={!selFood}>Add to Tracker</Button>

            {mealItems.length > 0 && (
              <div className="space-y-3">
                <div className="bg-primary/10 border border-primary/30 rounded-lg p-3 flex items-center justify-between">
                  <span className="text-sm font-semibold text-foreground">Daily Total</span>
                  <span className="font-mono text-xl font-bold text-primary">{fmt(totalKcal)} kcal</span>
                </div>
                {meals.map(m => {
                  const items = mealItems.filter(i => i.meal === m);
                  if (items.length === 0) return null;
                  const mTotal = items.reduce((s, i) => s + i.kcal, 0);
                  return (
                    <div key={m} className="bg-background rounded-lg border border-border p-3">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-semibold text-foreground">{m}</span>
                        <span className="font-mono text-sm text-muted-foreground">{fmt(mTotal)} kcal</span>
                      </div>
                      {items.map((item, i) => (
                        <div key={i} className="flex justify-between text-xs text-muted-foreground py-0.5">
                          <span>{item.name} ({item.grams}g)</span>
                          <span className="font-mono">{fmt(item.kcal)} kcal</span>
                        </div>
                      ))}
                    </div>
                  );
                })}
                <Button variant="ghost" size="sm" className="text-xs w-full" onClick={() => setMealItems([])}>Clear all</Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </CalculatorLayout>
  );
}
