// ─── Shoe Sizes ─────────────────────────────────────────────────────────────
export interface ShoeSize {
  eu: number;
  ukMen: string;
  ukWomen: string;
  usMen: string;
  usWomen: string;
  cm: number;
  minMm: number;
  maxMm: number;
}

export const SHOE_SIZE_TABLE: ShoeSize[] = [
  { eu: 34, ukMen: "1.5", ukWomen: "1.5", usMen: "3",   usWomen: "3.5", cm: 21.0, minMm: 205, maxMm: 214 },
  { eu: 35, ukMen: "2",   ukWomen: "2",   usMen: "3.5", usWomen: "4.5", cm: 21.7, minMm: 215, maxMm: 219 },
  { eu: 36, ukMen: "3",   ukWomen: "3",   usMen: "4",   usWomen: "5.5", cm: 22.3, minMm: 220, maxMm: 224 },
  { eu: 37, ukMen: "4",   ukWomen: "4",   usMen: "4.5", usWomen: "6",   cm: 23.0, minMm: 225, maxMm: 229 },
  { eu: 38, ukMen: "5",   ukWomen: "5",   usMen: "5.5", usWomen: "7",   cm: 23.7, minMm: 230, maxMm: 234 },
  { eu: 39, ukMen: "5.5", ukWomen: "5.5", usMen: "6.5", usWomen: "8",   cm: 24.3, minMm: 235, maxMm: 239 },
  { eu: 40, ukMen: "6.5", ukWomen: "6.5", usMen: "7",   usWomen: "8.5", cm: 25.0, minMm: 240, maxMm: 249 },
  { eu: 41, ukMen: "7",   ukWomen: "7",   usMen: "7.5", usWomen: "9.5", cm: 25.7, minMm: 250, maxMm: 254 },
  { eu: 42, ukMen: "8",   ukWomen: "8",   usMen: "8.5", usWomen: "10",  cm: 26.3, minMm: 255, maxMm: 259 },
  { eu: 43, ukMen: "9",   ukWomen: "9",   usMen: "9.5", usWomen: "11",  cm: 27.0, minMm: 260, maxMm: 264 },
  { eu: 44, ukMen: "9.5", ukWomen: "9.5", usMen: "10",  usWomen: "11.5",cm: 27.6, minMm: 265, maxMm: 274 },
  { eu: 45, ukMen: "10.5",ukWomen: "10.5",usMen: "11",  usWomen: "12.5",cm: 28.3, minMm: 275, maxMm: 279 },
  { eu: 46, ukMen: "11",  ukWomen: "11",  usMen: "11.5",usWomen: "13",  cm: 29.0, minMm: 280, maxMm: 284 },
  { eu: 47, ukMen: "12",  ukWomen: "12",  usMen: "12.5",usWomen: "14",  cm: 29.7, minMm: 285, maxMm: 289 },
  { eu: 48, ukMen: "13",  ukWomen: "13",  usMen: "13",  usWomen: "—",   cm: 30.3, minMm: 290, maxMm: 299 },
];

export function getShoeSize(footLengthMm: number): ShoeSize | null {
  return SHOE_SIZE_TABLE.find(s => footLengthMm >= s.minMm && footLengthMm <= s.maxMm) ?? null;
}

export function getShoeWidthLabel(footWidthMm: number, footLengthMm: number): string {
  // Width as % of length
  const ratio = (footWidthMm / footLengthMm) * 100;
  if (ratio < 36) return "Narrow (A/B)";
  if (ratio < 38) return "Normal / Medium (C/D)";
  if (ratio < 40) return "Wide (E/EE)";
  return "Extra Wide (EEE/EEEE)";
}

// ─── Clothing Sizes ──────────────────────────────────────────────────────────
export interface WomenClothingSize {
  label: string;   // XS / S / M / L / XL / XXL
  ukDress: string; // UK dress size
  usSize: string;  // US size number
  euSize: string;  // EU size number
  chest: [number, number];
  waist: [number, number];
  hips: [number, number];
}

export const WOMEN_SIZES: WomenClothingSize[] = [
  { label: "XS",  ukDress: "6",  usSize: "2",  euSize: "34", chest: [80, 83],  waist: [62, 65],  hips: [87, 90]  },
  { label: "S",   ukDress: "8",  usSize: "4",  euSize: "36", chest: [84, 87],  waist: [66, 69],  hips: [91, 94]  },
  { label: "M",   ukDress: "10", usSize: "6",  euSize: "38", chest: [88, 91],  waist: [70, 73],  hips: [95, 98]  },
  { label: "M",   ukDress: "12", usSize: "8",  euSize: "40", chest: [92, 95],  waist: [74, 77],  hips: [99, 102] },
  { label: "L",   ukDress: "14", usSize: "10", euSize: "42", chest: [96, 100], waist: [78, 82],  hips: [103, 107]},
  { label: "L",   ukDress: "16", usSize: "12", euSize: "44", chest: [101, 105],waist: [83, 87],  hips: [108, 112]},
  { label: "XL",  ukDress: "18", usSize: "14", euSize: "46", chest: [106, 111],waist: [88, 93],  hips: [113, 118]},
  { label: "XXL", ukDress: "20", usSize: "16", euSize: "48", chest: [112, 117],waist: [94, 99],  hips: [119, 124]},
  { label: "3XL", ukDress: "22", usSize: "18", euSize: "50", chest: [118, 123],waist: [100, 105],hips: [125, 130]},
  { label: "4XL", ukDress: "24", usSize: "20", euSize: "52", chest: [124, 129],waist: [106, 111],hips: [131, 136]},
];

export interface MenClothingSize {
  label: string;
  euSize: string;
  usSize: string;
  ukSize: string;
  chest: [number, number];
  waist: [number, number];
  neck: [number, number];
}

export const MEN_SIZES: MenClothingSize[] = [
  { label: "XS",  euSize: "44", usSize: "XS", ukSize: "XS", chest: [84, 87],  waist: [70, 73], neck: [36, 37] },
  { label: "S",   euSize: "46", usSize: "S",  ukSize: "S",  chest: [88, 91],  waist: [74, 77], neck: [37, 38] },
  { label: "M",   euSize: "48", usSize: "M",  ukSize: "M",  chest: [92, 95],  waist: [78, 81], neck: [39, 40] },
  { label: "M",   euSize: "50", usSize: "M",  ukSize: "M",  chest: [96, 99],  waist: [82, 85], neck: [40, 41] },
  { label: "L",   euSize: "52", usSize: "L",  ukSize: "L",  chest: [100, 103],waist: [86, 89], neck: [41, 42] },
  { label: "L",   euSize: "54", usSize: "L",  ukSize: "L",  chest: [104, 107],waist: [90, 93], neck: [42, 43] },
  { label: "XL",  euSize: "56", usSize: "XL", ukSize: "XL", chest: [108, 111],waist: [94, 97], neck: [43, 44] },
  { label: "XXL", euSize: "58", usSize: "XXL",ukSize: "XXL",chest: [112, 117],waist: [98, 103],neck: [45, 46] },
  { label: "3XL", euSize: "60", usSize: "3XL",ukSize: "3XL",chest: [118, 123],waist: [104, 109],neck: [47, 48]},
  { label: "4XL", euSize: "62", usSize: "4XL",ukSize: "4XL",chest: [124, 130],waist: [110, 116],neck: [49, 50]},
];

// Trouser / jeans waist (US sizing = inches, EU = cm)
export function getTrouserSize(waistCm: number, inseamCm: number) {
  const waistIn = Math.round(waistCm / 2.54);
  const inseamIn = Math.round(inseamCm / 2.54);
  return {
    usSize: `${waistIn}W × ${inseamIn}L`,
    euSize: `${Math.round(waistCm)}/${Math.round(inseamCm)}`,
    ukSize: `${waistIn}W × ${inseamIn}L`,
  };
}

export function getWomenClothingSize(chestCm: number, waistCm: number, hipCm: number): WomenClothingSize | null {
  // Find best match — prioritise chest fit
  for (const s of WOMEN_SIZES) {
    if (chestCm >= s.chest[0] && chestCm <= s.chest[1]) return s;
  }
  // Fallback: closest to waist
  return WOMEN_SIZES.reduce((best, s) => {
    const d = Math.abs(waistCm - (s.waist[0] + s.waist[1]) / 2);
    const bd = Math.abs(waistCm - (best.waist[0] + best.waist[1]) / 2);
    return d < bd ? s : best;
  });
}

export function getMenClothingSize(chestCm: number, waistCm: number): MenClothingSize | null {
  for (const s of MEN_SIZES) {
    if (chestCm >= s.chest[0] && chestCm <= s.chest[1]) return s;
  }
  return MEN_SIZES.reduce((best, s) => {
    const d = Math.abs(chestCm - (s.chest[0] + s.chest[1]) / 2);
    const bd = Math.abs(chestCm - (best.chest[0] + best.chest[1]) / 2);
    return d < bd ? s : best;
  });
}

// ─── Belt Sizes ───────────────────────────────────────────────────────────────
export function calculateBeltLength(waistCm: number, style: "trouser" | "hiphop" | "over-clothes") {
  // Rule: belt length = waist + extra
  const extras: Record<string, number> = { trouser: 7, hiphop: 15, "over-clothes": 20 };
  const extra = extras[style] ?? 7;
  const beltCm = waistCm + extra;
  const beltIn = beltCm / 2.54;

  // Commercial belt sizes (US/EU are in inches, rounded to nearest even number)
  const commercialSize = Math.ceil(beltIn / 2) * 2;

  return {
    recommendedCm: Math.round(beltCm),
    recommendedIn: Math.round(beltIn),
    commercialSize: `${commercialSize}" (${Math.round(commercialSize * 2.54)} cm)`,
    beltLengthRange: `${Math.round(beltCm - 2)}–${Math.round(beltCm + 2)} cm`,
  };
}

// ─── Ring Sizes ───────────────────────────────────────────────────────────────
export interface RingSize {
  us: string;
  uk: string;
  eu: number;
  diameterMm: number;
  circumferenceMm: number;
}

export const RING_SIZE_TABLE: RingSize[] = [
  { us: "3",    uk: "F",   eu: 44.0, diameterMm: 14.0, circumferenceMm: 44.2 },
  { us: "3½",   uk: "G",   eu: 45.5, diameterMm: 14.5, circumferenceMm: 45.5 },
  { us: "4",    uk: "H",   eu: 46.5, diameterMm: 14.9, circumferenceMm: 46.8 },
  { us: "4½",   uk: "I",   eu: 47.5, diameterMm: 15.3, circumferenceMm: 48.0 },
  { us: "5",    uk: "J½",  eu: 49.0, diameterMm: 15.7, circumferenceMm: 49.3 },
  { us: "5½",   uk: "K½",  eu: 50.5, diameterMm: 16.1, circumferenceMm: 50.6 },
  { us: "6",    uk: "L½",  eu: 51.5, diameterMm: 16.5, circumferenceMm: 51.9 },
  { us: "6½",   uk: "M½",  eu: 53.0, diameterMm: 16.9, circumferenceMm: 53.1 },
  { us: "7",    uk: "N½",  eu: 54.0, diameterMm: 17.3, circumferenceMm: 54.4 },
  { us: "7½",   uk: "O½",  eu: 55.5, diameterMm: 17.7, circumferenceMm: 55.7 },
  { us: "8",    uk: "P½",  eu: 57.0, diameterMm: 18.2, circumferenceMm: 57.0 },
  { us: "8½",   uk: "Q½",  eu: 58.0, diameterMm: 18.5, circumferenceMm: 58.3 },
  { us: "9",    uk: "R½",  eu: 59.5, diameterMm: 18.9, circumferenceMm: 59.5 },
  { us: "9½",   uk: "S½",  eu: 61.0, diameterMm: 19.4, circumferenceMm: 60.8 },
  { us: "10",   uk: "T½",  eu: 62.0, diameterMm: 19.8, circumferenceMm: 62.1 },
  { us: "10½",  uk: "U½",  eu: 63.0, diameterMm: 20.2, circumferenceMm: 63.4 },
  { us: "11",   uk: "V½",  eu: 64.5, diameterMm: 20.6, circumferenceMm: 64.6 },
  { us: "11½",  uk: "W½",  eu: 65.5, diameterMm: 21.0, circumferenceMm: 65.9 },
  { us: "12",   uk: "Y",   eu: 67.0, diameterMm: 21.4, circumferenceMm: 67.2 },
  { us: "13",   uk: "Z",   eu: 69.0, diameterMm: 22.2, circumferenceMm: 69.7 },
];

export function getRingSizeFromCircumference(circumferenceMm: number): RingSize | null {
  return RING_SIZE_TABLE.reduce((best, s) => {
    return Math.abs(s.circumferenceMm - circumferenceMm) < Math.abs(best.circumferenceMm - circumferenceMm) ? s : best;
  });
}

export function getRingSizeFromDiameter(diameterMm: number): RingSize | null {
  return RING_SIZE_TABLE.reduce((best, s) => {
    return Math.abs(s.diameterMm - diameterMm) < Math.abs(best.diameterMm - diameterMm) ? s : best;
  });
}
