// Pool Volume Calculator
export function calculatePoolVolume(
  shape: string,
  dimensions: Record<string, number>,
  isMetric: boolean
) {
  // Convert to metres if imperial (feet)
  const f = isMetric ? 1 : 0.3048;
  const d = Object.fromEntries(Object.entries(dimensions).map(([k, v]) => [k, v * f]));

  let volumeM3 = 0;
  let surfaceM2 = 0;

  if (shape === "rectangle") {
    volumeM3 = d.length * d.width * d.depth;
    surfaceM2 = d.length * d.width;
  } else if (shape === "oval") {
    surfaceM2 = Math.PI * (d.length / 2) * (d.width / 2);
    volumeM3 = surfaceM2 * d.depth;
  } else if (shape === "circle") {
    surfaceM2 = Math.PI * Math.pow(d.diameter / 2, 2);
    volumeM3 = surfaceM2 * d.depth;
  } else if (shape === "lshape") {
    surfaceM2 = d.l1 * d.w1 + d.l2 * d.w2;
    volumeM3 = surfaceM2 * d.depth;
  }

  const litres = volumeM3 * 1000;
  const usGallons = litres * 0.264172;
  const ukGallons = litres * 0.219969;
  const weightKg = litres; // 1L water = 1kg
  const fillMinutes = litres / 15; // at 15L/min

  return {
    volumeM3: round(volumeM3, 2),
    litres: round(litres, 0),
    usGallons: round(usGallons, 0),
    ukGallons: round(ukGallons, 0),
    weightKg: round(weightKg, 0),
    surfaceM2: round(surfaceM2, 2),
    fillMinutes: round(fillMinutes, 0),
    chlorinePer1000L: 2, // grams of 70% chlorine
  };
}

// Paving Calculator
export function calculatePaving(
  areaSqM: number,
  paverLengthMm: number,
  paverWidthMm: number,
  wastagePercent: number,
  pricePerPaver: number,
  paversPerPack: number
) {
  const paverAreaM2 = (paverLengthMm / 1000) * (paverWidthMm / 1000);
  const coverageNeeded = areaSqM * (1 + wastagePercent / 100);
  const paversNeeded = Math.ceil(coverageNeeded / paverAreaM2);
  const packsNeeded = Math.ceil(paversNeeded / paversPerPack);
  const totalCost = paversNeeded * pricePerPaver;

  return {
    paverAreaM2: round(paverAreaM2, 4),
    paversNeeded,
    packsNeeded,
    totalCost: round(totalCost, 2),
    coverageNeeded: round(coverageNeeded, 2),
  };
}

// Renovation Cost Calculator (ZAR ranges)
const RENOVATION_COSTS: Record<string, { budget: [number, number]; mid: [number, number]; premium: [number, number]; luxury: [number, number]; unit: string; weeks: [number, number] }> = {
  "Kitchen remodel": { budget: [15000, 35000], mid: [40000, 80000], premium: [90000, 180000], luxury: [200000, 500000], unit: "per m²", weeks: [3, 8] },
  "Bathroom renovation": { budget: [20000, 40000], mid: [50000, 100000], premium: [120000, 200000], luxury: [250000, 600000], unit: "flat", weeks: [2, 6] },
  "Bedroom repaint & flooring": { budget: [800, 1500], mid: [2000, 4000], premium: [5000, 10000], luxury: [12000, 25000], unit: "per m²", weeks: [1, 2] },
  "Living room renovation": { budget: [10000, 25000], mid: [30000, 70000], premium: [80000, 150000], luxury: [180000, 400000], unit: "flat", weeks: [2, 5] },
  "Garden landscaping": { budget: [500, 1200], mid: [1500, 3000], premium: [3500, 7000], luxury: [8000, 20000], unit: "per m²", weeks: [2, 8] },
  "Roof repairs": { budget: [5000, 15000], mid: [18000, 45000], premium: [50000, 100000], luxury: [120000, 300000], unit: "flat", weeks: [1, 4] },
  "Driveway paving": { budget: [200, 400], mid: [500, 900], premium: [1000, 2000], luxury: [2500, 5000], unit: "per m²", weeks: [1, 3] },
  "Tiling (floors)": { budget: [250, 500], mid: [600, 1200], premium: [1400, 3000], luxury: [3500, 8000], unit: "per m²", weeks: [1, 3] },
  "Electrical rewiring": { budget: [15000, 30000], mid: [35000, 70000], premium: [80000, 150000], luxury: [180000, 350000], unit: "flat", weeks: [2, 5] },
  "Plumbing upgrade": { budget: [8000, 20000], mid: [25000, 60000], premium: [70000, 150000], luxury: [180000, 400000], unit: "flat", weeks: [1, 4] },
  "Pergola / deck": { budget: [1500, 3000], mid: [4000, 8000], premium: [10000, 20000], luxury: [25000, 60000], unit: "per m²", weeks: [2, 6] },
  "Braai area / entertainment area": { budget: [20000, 50000], mid: [60000, 120000], premium: [140000, 280000], luxury: [300000, 700000], unit: "flat", weeks: [3, 8] },
  "Swimming pool installation": { budget: [120000, 200000], mid: [220000, 400000], premium: [450000, 700000], luxury: [750000, 2000000], unit: "flat", weeks: [6, 16] },
  "Garage conversion": { budget: [30000, 60000], mid: [70000, 140000], premium: [160000, 300000], luxury: [350000, 700000], unit: "flat", weeks: [4, 10] },
  "Open-plan conversion (remove wall)": { budget: [15000, 35000], mid: [40000, 80000], premium: [90000, 180000], luxury: [200000, 500000], unit: "flat", weeks: [2, 6] },
};

const LOCATION_MULTIPLIERS: Record<string, number> = {
  rural: 0.75, suburban: 1.0, urban: 1.2, metropolitan: 1.45,
};

const CURRENCY_RATES: Record<string, number> = {
  ZAR: 1, USD: 0.054, EUR: 0.050, GBP: 0.043,
};

export function calculateRenovation(
  type: string,
  areaSqM: number,
  grade: "budget" | "mid" | "premium" | "luxury",
  includeLabour: boolean,
  location: string,
  currency: string
) {
  const costs = RENOVATION_COSTS[type];
  if (!costs) return null;

  const [minBase, maxBase] = costs[grade];
  const locMult = LOCATION_MULTIPLIERS[location] ?? 1.0;
  const labourMult = includeLabour ? 1 : 0.55;
  const currRate = CURRENCY_RATES[currency] ?? 1;

  let minCost = minBase * locMult * labourMult;
  let maxCost = maxBase * locMult * labourMult;

  if (costs.unit === "per m²") {
    minCost *= areaSqM;
    maxCost *= areaSqM;
  }

  const midCost = (minCost + maxCost) / 2;
  const materials = midCost * 0.55;
  const labour = includeLabour ? midCost * 0.35 : 0;
  const contingency = midCost * 0.1;

  return {
    minCost: round(minCost * currRate, 0),
    maxCost: round(maxCost * currRate, 0),
    materials: round(materials * currRate, 0),
    labour: round(labour * currRate, 0),
    contingency: round(contingency * currRate, 0),
    weeks: costs.weeks,
    currency,
  };
}

// Paint Calculator
const PAINT_COVERAGE: Record<string, number> = {
  "Interior Matt": 12,
  "Interior Silk": 10,
  "Interior Gloss": 8,
  "Exterior": 10,
  "Damp-proof primer": 7,
  "Ceiling white": 12,
};

export function calculatePaint(
  wallArea: number,
  numDoors: number,
  numWindows: number,
  coats: number,
  paintType: string,
  pricePerLitre: number,
  includeCeiling: boolean,
  ceilingArea: number
) {
  const doorArea = numDoors * 2.1 * 0.9;
  const windowArea = numWindows * 1.2 * 1.2;
  const netWallArea = wallArea - doorArea - windowArea;
  const totalArea = (netWallArea + (includeCeiling ? ceilingArea : 0)) * coats;
  const coverage = PAINT_COVERAGE[paintType] ?? 10;
  const litresNeeded = totalArea / coverage;

  // Optimal tin breakdown
  const tins20 = Math.floor(litresNeeded / 20);
  const rem1 = litresNeeded - tins20 * 20;
  const tins5 = Math.floor(rem1 / 5);
  const rem2 = rem1 - tins5 * 5;
  const tins1 = Math.ceil(rem2);

  const totalTinCost = (tins20 * 20 + tins5 * 5 + tins1) * pricePerLitre;

  return {
    netWallArea: round(netWallArea, 1),
    totalArea: round(totalArea, 1),
    litresNeeded: round(litresNeeded, 1),
    tins20,
    tins5,
    tins1,
    totalTinCost: round(totalTinCost, 2),
    coverage,
  };
}

function round(n: number, dec: number) {
  const f = Math.pow(10, dec);
  return Math.round(n * f) / f;
}
