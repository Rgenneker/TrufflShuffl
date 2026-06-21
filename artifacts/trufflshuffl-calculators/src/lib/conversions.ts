export interface ConversionPair {
  slug: string;
  fromLabel: string;
  toLabel: string;
  fromSymbol: string;
  toSymbol: string;
  category: string;
  convert: (v: number) => number;
  precision: number;
  formula: string;
}

export const CONVERSION_PAIRS: ConversionPair[] = [
  // ── Length ─────────────────────────────────────────────────────────
  { slug: "miles-to-km",      fromLabel: "Miles",          toLabel: "Kilometres",    fromSymbol: "mi",    toSymbol: "km",   category: "Length",      convert: v => v * 1.60934,      precision: 4, formula: "km = miles × 1.60934" },
  { slug: "km-to-miles",      fromLabel: "Kilometres",     toLabel: "Miles",         fromSymbol: "km",    toSymbol: "mi",   category: "Length",      convert: v => v * 0.621371,     precision: 4, formula: "miles = km × 0.621371" },
  { slug: "feet-to-metres",   fromLabel: "Feet",           toLabel: "Metres",        fromSymbol: "ft",    toSymbol: "m",    category: "Length",      convert: v => v * 0.3048,       precision: 4, formula: "m = feet × 0.3048" },
  { slug: "metres-to-feet",   fromLabel: "Metres",         toLabel: "Feet",          fromSymbol: "m",     toSymbol: "ft",   category: "Length",      convert: v => v * 3.28084,      precision: 4, formula: "feet = m × 3.28084" },
  { slug: "inches-to-cm",     fromLabel: "Inches",         toLabel: "Centimetres",   fromSymbol: "in",    toSymbol: "cm",   category: "Length",      convert: v => v * 2.54,         precision: 3, formula: "cm = inches × 2.54" },
  { slug: "cm-to-inches",     fromLabel: "Centimetres",    toLabel: "Inches",        fromSymbol: "cm",    toSymbol: "in",   category: "Length",      convert: v => v * 0.393701,     precision: 4, formula: "inches = cm × 0.393701" },
  { slug: "yards-to-metres",  fromLabel: "Yards",          toLabel: "Metres",        fromSymbol: "yd",    toSymbol: "m",    category: "Length",      convert: v => v * 0.9144,       precision: 4, formula: "m = yards × 0.9144" },
  { slug: "metres-to-yards",  fromLabel: "Metres",         toLabel: "Yards",         fromSymbol: "m",     toSymbol: "yd",   category: "Length",      convert: v => v * 1.09361,      precision: 4, formula: "yards = m × 1.09361" },
  { slug: "miles-to-feet",    fromLabel: "Miles",          toLabel: "Feet",          fromSymbol: "mi",    toSymbol: "ft",   category: "Length",      convert: v => v * 5280,         precision: 0, formula: "feet = miles × 5,280" },
  { slug: "feet-to-miles",    fromLabel: "Feet",           toLabel: "Miles",         fromSymbol: "ft",    toSymbol: "mi",   category: "Length",      convert: v => v * 0.000189394,  precision: 6, formula: "miles = feet × 0.000189394" },
  { slug: "km-to-metres",     fromLabel: "Kilometres",     toLabel: "Metres",        fromSymbol: "km",    toSymbol: "m",    category: "Length",      convert: v => v * 1000,         precision: 0, formula: "m = km × 1,000" },
  { slug: "metres-to-km",     fromLabel: "Metres",         toLabel: "Kilometres",    fromSymbol: "m",     toSymbol: "km",   category: "Length",      convert: v => v * 0.001,        precision: 4, formula: "km = m × 0.001" },
  { slug: "cm-to-mm",         fromLabel: "Centimetres",    toLabel: "Millimetres",   fromSymbol: "cm",    toSymbol: "mm",   category: "Length",      convert: v => v * 10,           precision: 1, formula: "mm = cm × 10" },
  { slug: "mm-to-cm",         fromLabel: "Millimetres",    toLabel: "Centimetres",   fromSymbol: "mm",    toSymbol: "cm",   category: "Length",      convert: v => v * 0.1,          precision: 2, formula: "cm = mm × 0.1" },

  // ── Weight ─────────────────────────────────────────────────────────
  { slug: "kg-to-pounds",     fromLabel: "Kilograms",      toLabel: "Pounds",        fromSymbol: "kg",    toSymbol: "lb",   category: "Weight",      convert: v => v * 2.20462,      precision: 3, formula: "lb = kg × 2.20462" },
  { slug: "pounds-to-kg",     fromLabel: "Pounds",         toLabel: "Kilograms",     fromSymbol: "lb",    toSymbol: "kg",   category: "Weight",      convert: v => v * 0.453592,     precision: 4, formula: "kg = lb × 0.453592" },
  { slug: "grams-to-ounces",  fromLabel: "Grams",          toLabel: "Ounces",        fromSymbol: "g",     toSymbol: "oz",   category: "Weight",      convert: v => v * 0.035274,     precision: 4, formula: "oz = g × 0.035274" },
  { slug: "ounces-to-grams",  fromLabel: "Ounces",         toLabel: "Grams",         fromSymbol: "oz",    toSymbol: "g",    category: "Weight",      convert: v => v * 28.3495,      precision: 3, formula: "g = oz × 28.3495" },
  { slug: "tonnes-to-kg",     fromLabel: "Tonnes",         toLabel: "Kilograms",     fromSymbol: "t",     toSymbol: "kg",   category: "Weight",      convert: v => v * 1000,         precision: 0, formula: "kg = tonnes × 1,000" },
  { slug: "kg-to-tonnes",     fromLabel: "Kilograms",      toLabel: "Tonnes",        fromSymbol: "kg",    toSymbol: "t",    category: "Weight",      convert: v => v * 0.001,        precision: 4, formula: "t = kg × 0.001" },
  { slug: "kg-to-grams",      fromLabel: "Kilograms",      toLabel: "Grams",         fromSymbol: "kg",    toSymbol: "g",    category: "Weight",      convert: v => v * 1000,         precision: 0, formula: "g = kg × 1,000" },
  { slug: "grams-to-kg",      fromLabel: "Grams",          toLabel: "Kilograms",     fromSymbol: "g",     toSymbol: "kg",   category: "Weight",      convert: v => v * 0.001,        precision: 4, formula: "kg = g × 0.001" },
  { slug: "pounds-to-ounces", fromLabel: "Pounds",         toLabel: "Ounces",        fromSymbol: "lb",    toSymbol: "oz",   category: "Weight",      convert: v => v * 16,           precision: 2, formula: "oz = lb × 16" },
  { slug: "ounces-to-pounds", fromLabel: "Ounces",         toLabel: "Pounds",        fromSymbol: "oz",    toSymbol: "lb",   category: "Weight",      convert: v => v * 0.0625,       precision: 4, formula: "lb = oz × 0.0625" },
  { slug: "stones-to-kg",     fromLabel: "Stones",         toLabel: "Kilograms",     fromSymbol: "st",    toSymbol: "kg",   category: "Weight",      convert: v => v * 6.35029,      precision: 3, formula: "kg = stones × 6.35029" },
  { slug: "kg-to-stones",     fromLabel: "Kilograms",      toLabel: "Stones",        fromSymbol: "kg",    toSymbol: "st",   category: "Weight",      convert: v => v * 0.157473,     precision: 4, formula: "st = kg × 0.157473" },

  // ── Temperature ────────────────────────────────────────────────────
  { slug: "celsius-to-fahrenheit",    fromLabel: "Celsius",     toLabel: "Fahrenheit", fromSymbol: "°C", toSymbol: "°F", category: "Temperature", convert: v => v * 9/5 + 32,             precision: 2, formula: "°F = °C × 9/5 + 32" },
  { slug: "fahrenheit-to-celsius",    fromLabel: "Fahrenheit",  toLabel: "Celsius",    fromSymbol: "°F", toSymbol: "°C", category: "Temperature", convert: v => (v - 32) * 5/9,           precision: 2, formula: "°C = (°F − 32) × 5/9" },
  { slug: "celsius-to-kelvin",        fromLabel: "Celsius",     toLabel: "Kelvin",     fromSymbol: "°C", toSymbol: "K",  category: "Temperature", convert: v => v + 273.15,               precision: 2, formula: "K = °C + 273.15" },
  { slug: "kelvin-to-celsius",        fromLabel: "Kelvin",      toLabel: "Celsius",    fromSymbol: "K",  toSymbol: "°C", category: "Temperature", convert: v => v - 273.15,               precision: 2, formula: "°C = K − 273.15" },
  { slug: "fahrenheit-to-kelvin",     fromLabel: "Fahrenheit",  toLabel: "Kelvin",     fromSymbol: "°F", toSymbol: "K",  category: "Temperature", convert: v => (v - 32) * 5/9 + 273.15, precision: 2, formula: "K = (°F − 32) × 5/9 + 273.15" },
  { slug: "kelvin-to-fahrenheit",     fromLabel: "Kelvin",      toLabel: "Fahrenheit", fromSymbol: "K",  toSymbol: "°F", category: "Temperature", convert: v => (v - 273.15) * 9/5 + 32, precision: 2, formula: "°F = (K − 273.15) × 9/5 + 32" },

  // ── Area ───────────────────────────────────────────────────────────
  { slug: "sqm-to-sqft",      fromLabel: "Square Metres",  toLabel: "Square Feet",   fromSymbol: "m²",   toSymbol: "ft²",  category: "Area",        convert: v => v * 10.7639,      precision: 3, formula: "ft² = m² × 10.7639" },
  { slug: "sqft-to-sqm",      fromLabel: "Square Feet",    toLabel: "Square Metres", fromSymbol: "ft²",  toSymbol: "m²",   category: "Area",        convert: v => v * 0.092903,     precision: 4, formula: "m² = ft² × 0.092903" },
  { slug: "hectares-to-acres", fromLabel: "Hectares",      toLabel: "Acres",         fromSymbol: "ha",   toSymbol: "ac",   category: "Area",        convert: v => v * 2.47105,      precision: 4, formula: "acres = ha × 2.47105" },
  { slug: "acres-to-hectares", fromLabel: "Acres",         toLabel: "Hectares",      fromSymbol: "ac",   toSymbol: "ha",   category: "Area",        convert: v => v * 0.404686,     precision: 4, formula: "ha = acres × 0.404686" },
  { slug: "sqkm-to-sqmiles",  fromLabel: "Square Km",     toLabel: "Square Miles",  fromSymbol: "km²",  toSymbol: "mi²",  category: "Area",        convert: v => v * 0.386102,     precision: 4, formula: "mi² = km² × 0.386102" },
  { slug: "sqmiles-to-sqkm",  fromLabel: "Square Miles",  toLabel: "Square Km",     fromSymbol: "mi²",  toSymbol: "km²",  category: "Area",        convert: v => v * 2.58999,      precision: 4, formula: "km² = mi² × 2.58999" },

  // ── Volume ─────────────────────────────────────────────────────────
  { slug: "litres-to-gallons", fromLabel: "Litres",        toLabel: "US Gallons",    fromSymbol: "L",    toSymbol: "gal",  category: "Volume",      convert: v => v * 0.264172,     precision: 4, formula: "gal = L × 0.264172" },
  { slug: "gallons-to-litres", fromLabel: "US Gallons",    toLabel: "Litres",        fromSymbol: "gal",  toSymbol: "L",    category: "Volume",      convert: v => v * 3.78541,      precision: 3, formula: "L = gal × 3.78541" },
  { slug: "ml-to-litres",      fromLabel: "Millilitres",   toLabel: "Litres",        fromSymbol: "mL",   toSymbol: "L",    category: "Volume",      convert: v => v * 0.001,        precision: 4, formula: "L = mL × 0.001" },
  { slug: "litres-to-ml",      fromLabel: "Litres",        toLabel: "Millilitres",   fromSymbol: "L",    toSymbol: "mL",   category: "Volume",      convert: v => v * 1000,         precision: 0, formula: "mL = L × 1,000" },
  { slug: "litres-to-pints",   fromLabel: "Litres",        toLabel: "Pints",         fromSymbol: "L",    toSymbol: "pt",   category: "Volume",      convert: v => v * 2.11338,      precision: 4, formula: "pt = L × 2.11338" },
  { slug: "pints-to-litres",   fromLabel: "Pints",         toLabel: "Litres",        fromSymbol: "pt",   toSymbol: "L",    category: "Volume",      convert: v => v * 0.473176,     precision: 4, formula: "L = pt × 0.473176" },
  { slug: "cups-to-ml",        fromLabel: "Cups",          toLabel: "Millilitres",   fromSymbol: "cup",  toSymbol: "mL",   category: "Volume",      convert: v => v * 236.588,      precision: 2, formula: "mL = cups × 236.588" },
  { slug: "ml-to-cups",        fromLabel: "Millilitres",   toLabel: "Cups",          fromSymbol: "mL",   toSymbol: "cup",  category: "Volume",      convert: v => v * 0.00422675,   precision: 5, formula: "cups = mL × 0.00422675" },

  // ── Speed ──────────────────────────────────────────────────────────
  { slug: "mph-to-kmh",        fromLabel: "Miles per Hour", toLabel: "Km per Hour",  fromSymbol: "mph",  toSymbol: "km/h", category: "Speed",       convert: v => v * 1.60934,      precision: 3, formula: "km/h = mph × 1.60934" },
  { slug: "kmh-to-mph",        fromLabel: "Km per Hour",   toLabel: "Miles per Hour", fromSymbol: "km/h", toSymbol: "mph", category: "Speed",       convert: v => v * 0.621371,     precision: 3, formula: "mph = km/h × 0.621371" },
  { slug: "knots-to-kmh",      fromLabel: "Knots",         toLabel: "Km per Hour",   fromSymbol: "kn",   toSymbol: "km/h", category: "Speed",       convert: v => v * 1.852,        precision: 3, formula: "km/h = knots × 1.852" },
  { slug: "kmh-to-knots",      fromLabel: "Km per Hour",   toLabel: "Knots",         fromSymbol: "km/h", toSymbol: "kn",   category: "Speed",       convert: v => v * 0.539957,     precision: 4, formula: "knots = km/h × 0.539957" },
  { slug: "ms-to-kmh",         fromLabel: "Metres/Second", toLabel: "Km per Hour",   fromSymbol: "m/s",  toSymbol: "km/h", category: "Speed",       convert: v => v * 3.6,          precision: 3, formula: "km/h = m/s × 3.6" },
  { slug: "kmh-to-ms",         fromLabel: "Km per Hour",   toLabel: "Metres/Second", fromSymbol: "km/h", toSymbol: "m/s",  category: "Speed",       convert: v => v * 0.277778,     precision: 4, formula: "m/s = km/h × 0.277778" },

  // ── Time ───────────────────────────────────────────────────────────
  { slug: "hours-to-minutes",  fromLabel: "Hours",         toLabel: "Minutes",       fromSymbol: "hr",   toSymbol: "min",  category: "Time",        convert: v => v * 60,           precision: 0, formula: "min = hours × 60" },
  { slug: "minutes-to-hours",  fromLabel: "Minutes",       toLabel: "Hours",         fromSymbol: "min",  toSymbol: "hr",   category: "Time",        convert: v => v / 60,           precision: 4, formula: "hours = minutes ÷ 60" },
  { slug: "days-to-hours",     fromLabel: "Days",          toLabel: "Hours",         fromSymbol: "day",  toSymbol: "hr",   category: "Time",        convert: v => v * 24,           precision: 0, formula: "hours = days × 24" },
  { slug: "hours-to-days",     fromLabel: "Hours",         toLabel: "Days",          fromSymbol: "hr",   toSymbol: "day",  category: "Time",        convert: v => v / 24,           precision: 4, formula: "days = hours ÷ 24" },
  { slug: "weeks-to-days",     fromLabel: "Weeks",         toLabel: "Days",          fromSymbol: "wk",   toSymbol: "day",  category: "Time",        convert: v => v * 7,            precision: 0, formula: "days = weeks × 7" },
  { slug: "days-to-weeks",     fromLabel: "Days",          toLabel: "Weeks",         fromSymbol: "day",  toSymbol: "wk",   category: "Time",        convert: v => v / 7,            precision: 4, formula: "weeks = days ÷ 7" },
  { slug: "months-to-days",    fromLabel: "Months",        toLabel: "Days",          fromSymbol: "mo",   toSymbol: "day",  category: "Time",        convert: v => v * 30.4375,      precision: 2, formula: "days = months × 30.4375" },
  { slug: "years-to-days",     fromLabel: "Years",         toLabel: "Days",          fromSymbol: "yr",   toSymbol: "day",  category: "Time",        convert: v => v * 365.25,       precision: 2, formula: "days = years × 365.25" },

  // ── Data ───────────────────────────────────────────────────────────
  { slug: "mb-to-gb",          fromLabel: "Megabytes",     toLabel: "Gigabytes",     fromSymbol: "MB",   toSymbol: "GB",   category: "Data",        convert: v => v * 0.001,        precision: 4, formula: "GB = MB ÷ 1,000" },
  { slug: "gb-to-mb",          fromLabel: "Gigabytes",     toLabel: "Megabytes",     fromSymbol: "GB",   toSymbol: "MB",   category: "Data",        convert: v => v * 1000,         precision: 0, formula: "MB = GB × 1,000" },
  { slug: "gb-to-tb",          fromLabel: "Gigabytes",     toLabel: "Terabytes",     fromSymbol: "GB",   toSymbol: "TB",   category: "Data",        convert: v => v * 0.001,        precision: 4, formula: "TB = GB ÷ 1,000" },
  { slug: "tb-to-gb",          fromLabel: "Terabytes",     toLabel: "Gigabytes",     fromSymbol: "TB",   toSymbol: "GB",   category: "Data",        convert: v => v * 1000,         precision: 0, formula: "GB = TB × 1,000" },
  { slug: "kb-to-mb",          fromLabel: "Kilobytes",     toLabel: "Megabytes",     fromSymbol: "KB",   toSymbol: "MB",   category: "Data",        convert: v => v * 0.001,        precision: 4, formula: "MB = KB ÷ 1,000" },
  { slug: "mb-to-kb",          fromLabel: "Megabytes",     toLabel: "Kilobytes",     fromSymbol: "MB",   toSymbol: "KB",   category: "Data",        convert: v => v * 1000,         precision: 0, formula: "KB = MB × 1,000" },

  // ── Pressure ───────────────────────────────────────────────────────
  { slug: "bar-to-psi",        fromLabel: "Bar",           toLabel: "PSI",           fromSymbol: "bar",  toSymbol: "psi",  category: "Pressure",    convert: v => v * 14.5038,      precision: 3, formula: "psi = bar × 14.5038" },
  { slug: "psi-to-bar",        fromLabel: "PSI",           toLabel: "Bar",           fromSymbol: "psi",  toSymbol: "bar",  category: "Pressure",    convert: v => v * 0.0689476,    precision: 5, formula: "bar = psi × 0.0689476" },
  { slug: "atm-to-bar",        fromLabel: "Atmospheres",   toLabel: "Bar",           fromSymbol: "atm",  toSymbol: "bar",  category: "Pressure",    convert: v => v * 1.01325,      precision: 4, formula: "bar = atm × 1.01325" },
  { slug: "bar-to-atm",        fromLabel: "Bar",           toLabel: "Atmospheres",   fromSymbol: "bar",  toSymbol: "atm",  category: "Pressure",    convert: v => v * 0.986923,     precision: 4, formula: "atm = bar × 0.986923" },

  // ── Energy ─────────────────────────────────────────────────────────
  { slug: "kj-to-kcal",        fromLabel: "Kilojoules",    toLabel: "Kilocalories",  fromSymbol: "kJ",   toSymbol: "kcal", category: "Energy",      convert: v => v * 0.239006,     precision: 3, formula: "kcal = kJ × 0.239006" },
  { slug: "kcal-to-kj",        fromLabel: "Kilocalories",  toLabel: "Kilojoules",    fromSymbol: "kcal", toSymbol: "kJ",   category: "Energy",      convert: v => v * 4.184,        precision: 3, formula: "kJ = kcal × 4.184" },
  { slug: "kwh-to-mj",         fromLabel: "Kilowatt-hours", toLabel: "Megajoules",  fromSymbol: "kWh",  toSymbol: "MJ",   category: "Energy",      convert: v => v * 3.6,          precision: 3, formula: "MJ = kWh × 3.6" },
  { slug: "mj-to-kwh",         fromLabel: "Megajoules",    toLabel: "Kilowatt-hours", fromSymbol: "MJ",  toSymbol: "kWh",  category: "Energy",      convert: v => v * 0.277778,     precision: 4, formula: "kWh = MJ × 0.277778" },

  // ── Power ──────────────────────────────────────────────────────────
  { slug: "kw-to-hp",          fromLabel: "Kilowatts",     toLabel: "Horsepower",    fromSymbol: "kW",   toSymbol: "hp",   category: "Power",       convert: v => v * 1.34102,      precision: 3, formula: "hp = kW × 1.34102" },
  { slug: "hp-to-kw",          fromLabel: "Horsepower",    toLabel: "Kilowatts",     fromSymbol: "hp",   toSymbol: "kW",   category: "Power",       convert: v => v * 0.7457,       precision: 4, formula: "kW = hp × 0.7457" },
];

export const CONVERSION_SLUGS = CONVERSION_PAIRS.map(p => p.slug);

export function findPair(slug: string): ConversionPair | undefined {
  return CONVERSION_PAIRS.find(p => p.slug === slug);
}

export const CONVERSION_VALUES = [
  ...Array.from({ length: 500 }, (_, i) => i + 1),
  750, 1000, 1500, 2000, 5000,
];
