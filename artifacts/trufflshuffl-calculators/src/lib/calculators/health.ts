export function calculateBMI(weightKg: number, heightCm: number) {
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  let category = "Normal";
  let color = "text-green-400";
  if (bmi < 18.5) { category = "Underweight"; color = "text-blue-400"; }
  else if (bmi < 25) { category = "Normal weight"; color = "text-green-400"; }
  else if (bmi < 30) { category = "Overweight"; color = "text-yellow-400"; }
  else if (bmi < 35) { category = "Obese class I"; color = "text-orange-400"; }
  else if (bmi < 40) { category = "Obese class II"; color = "text-red-400"; }
  else { category = "Obese class III"; color = "text-red-600"; }

  const healthyMin = 18.5 * heightM * heightM;
  const healthyMax = 24.9 * heightM * heightM;

  // Ideal weight formulas (for height in cm)
  const heightIn = heightCm / 2.54;
  const hamwi = (heightIn > 60) ? (heightIn - 60) * 2.722 + 48.08 : 48.08;
  const devine = (heightIn > 60) ? (heightIn - 60) * 2.268 + 45.36 : 45.36;
  const robinson = (heightIn > 60) ? (heightIn - 60) * 1.905 + 49.0 : 49.0;
  const miller = (heightIn > 60) ? (heightIn - 60) * 1.41 + 53.1 : 53.1;

  // Body fat estimate (Deurenberg)
  const bodyFatApprox = 1.2 * bmi + 0.23 * 25 - 5.4; // using age=25 placeholder

  return {
    bmi: Math.round(bmi * 10) / 10,
    category,
    color,
    healthyMin: Math.round(healthyMin * 10) / 10,
    healthyMax: Math.round(healthyMax * 10) / 10,
    idealWeights: { hamwi, devine, robinson, miller },
    bodyFatApprox: Math.max(5, bodyFatApprox),
  };
}

export function calculateBMR(
  weightKg: number,
  heightCm: number,
  age: number,
  sex: "male" | "female"
) {
  // Mifflin-St Jeor
  const mifflin = sex === "male"
    ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
    : 10 * weightKg + 6.25 * heightCm - 5 * age - 161;

  // Harris-Benedict
  const harris = sex === "male"
    ? 88.362 + 13.397 * weightKg + 4.799 * heightCm - 5.677 * age
    : 447.593 + 9.247 * weightKg + 3.098 * heightCm - 4.330 * age;

  return { mifflin, harris };
}

export const ACTIVITY_MULTIPLIERS: Record<string, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  extra: 1.9,
};

export function calculateTDEE(bmr: number, activity: string) {
  return bmr * (ACTIVITY_MULTIPLIERS[activity] ?? 1.55);
}

export function getGoalCalories(tdee: number, goal: string) {
  if (goal === "lose") return tdee - 500;
  if (goal === "gain") return tdee + 300;
  return tdee;
}

export function getMacros(calories: number) {
  return {
    protein: Math.round(calories * 0.3 / 4),
    carbs: Math.round(calories * 0.4 / 4),
    fat: Math.round(calories * 0.3 / 9),
  };
}

export const FOOD_DATABASE: Record<string, { name: string; kcal: number; unit: string }[]> = {
  Fruits: [
    { name: "Apple", kcal: 52, unit: "per 100g" },
    { name: "Banana", kcal: 89, unit: "per 100g" },
    { name: "Orange", kcal: 47, unit: "per 100g" },
    { name: "Mango", kcal: 60, unit: "per 100g" },
    { name: "Grapes", kcal: 67, unit: "per 100g" },
    { name: "Watermelon", kcal: 30, unit: "per 100g" },
  ],
  Vegetables: [
    { name: "Broccoli", kcal: 34, unit: "per 100g" },
    { name: "Carrot", kcal: 41, unit: "per 100g" },
    { name: "Spinach", kcal: 23, unit: "per 100g" },
    { name: "Potato", kcal: 77, unit: "per 100g" },
    { name: "Sweet potato", kcal: 86, unit: "per 100g" },
  ],
  Grains: [
    { name: "White rice (cooked)", kcal: 130, unit: "per 100g" },
    { name: "Brown rice (cooked)", kcal: 111, unit: "per 100g" },
    { name: "Oats", kcal: 389, unit: "per 100g" },
    { name: "White bread", kcal: 265, unit: "per 100g" },
    { name: "Pasta (cooked)", kcal: 131, unit: "per 100g" },
  ],
  Proteins: [
    { name: "Chicken breast", kcal: 165, unit: "per 100g" },
    { name: "Beef mince (lean)", kcal: 215, unit: "per 100g" },
    { name: "Eggs", kcal: 155, unit: "per 100g" },
    { name: "Tuna (canned)", kcal: 116, unit: "per 100g" },
    { name: "Salmon", kcal: 208, unit: "per 100g" },
    { name: "Lentils (cooked)", kcal: 116, unit: "per 100g" },
  ],
  Dairy: [
    { name: "Whole milk", kcal: 61, unit: "per 100ml" },
    { name: "Greek yoghurt", kcal: 59, unit: "per 100g" },
    { name: "Cheddar cheese", kcal: 402, unit: "per 100g" },
    { name: "Butter", kcal: 717, unit: "per 100g" },
  ],
  Snacks: [
    { name: "Almonds", kcal: 579, unit: "per 100g" },
    { name: "Chocolate (dark)", kcal: 546, unit: "per 100g" },
    { name: "Crisps / chips", kcal: 536, unit: "per 100g" },
    { name: "Peanut butter", kcal: 588, unit: "per 100g" },
  ],
  Beverages: [
    { name: "Orange juice", kcal: 45, unit: "per 100ml" },
    { name: "Cola (regular)", kcal: 42, unit: "per 100ml" },
    { name: "Beer (lager)", kcal: 43, unit: "per 100ml" },
    { name: "Red wine", kcal: 85, unit: "per 100ml" },
    { name: "Coffee (black)", kcal: 2, unit: "per 100ml" },
  ],
};
