export interface ConvUnit {
  name: string;
  symbol: string;
  toBase: number;   // multiply by this to convert to base unit
  offset?: number;  // add before multiplying (for temperature)
}

export interface ConvCategory {
  name: string;
  baseUnit: string;
  units: ConvUnit[];
}

export const CONVERSION_CATEGORIES: ConvCategory[] = [
  {
    name: "Length",
    baseUnit: "metre",
    units: [
      { name: "Nanometre",    symbol: "nm",   toBase: 1e-9 },
      { name: "Micrometre",   symbol: "µm",   toBase: 1e-6 },
      { name: "Millimetre",   symbol: "mm",   toBase: 0.001 },
      { name: "Centimetre",   symbol: "cm",   toBase: 0.01 },
      { name: "Metre",        symbol: "m",    toBase: 1 },
      { name: "Kilometre",    symbol: "km",   toBase: 1000 },
      { name: "Inch",         symbol: "in",   toBase: 0.0254 },
      { name: "Foot",         symbol: "ft",   toBase: 0.3048 },
      { name: "Yard",         symbol: "yd",   toBase: 0.9144 },
      { name: "Mile",         symbol: "mi",   toBase: 1609.344 },
      { name: "Nautical mile",symbol: "nmi",  toBase: 1852 },
      { name: "Light year",   symbol: "ly",   toBase: 9.461e15 },
    ],
  },
  {
    name: "Weight / Mass",
    baseUnit: "kilogram",
    units: [
      { name: "Microgram",    symbol: "µg",   toBase: 1e-9 },
      { name: "Milligram",    symbol: "mg",   toBase: 1e-6 },
      { name: "Gram",         symbol: "g",    toBase: 0.001 },
      { name: "Kilogram",     symbol: "kg",   toBase: 1 },
      { name: "Metric ton",   symbol: "t",    toBase: 1000 },
      { name: "Ounce",        symbol: "oz",   toBase: 0.028349523 },
      { name: "Pound",        symbol: "lb",   toBase: 0.45359237 },
      { name: "Stone",        symbol: "st",   toBase: 6.35029318 },
      { name: "Short ton (US)",symbol: "US ton",toBase: 907.18474 },
      { name: "Long ton (UK)", symbol: "UK ton",toBase: 1016.0469 },
    ],
  },
  {
    name: "Temperature",
    baseUnit: "celsius",
    units: [
      { name: "Celsius",    symbol: "°C", toBase: 1,      offset: 0 },
      { name: "Fahrenheit", symbol: "°F", toBase: 5/9,    offset: -32 },
      { name: "Kelvin",     symbol: "K",  toBase: 1,      offset: -273.15 },
      { name: "Rankine",    symbol: "°R", toBase: 5/9,    offset: -491.67 },
    ],
  },
  {
    name: "Volume",
    baseUnit: "litre",
    units: [
      { name: "Millilitre",     symbol: "mL",    toBase: 0.001 },
      { name: "Centilitre",     symbol: "cL",    toBase: 0.01 },
      { name: "Decilitre",      symbol: "dL",    toBase: 0.1 },
      { name: "Litre",          symbol: "L",     toBase: 1 },
      { name: "Cubic metre",    symbol: "m³",    toBase: 1000 },
      { name: "US teaspoon",    symbol: "tsp",   toBase: 0.00492892 },
      { name: "US tablespoon",  symbol: "tbsp",  toBase: 0.01478676 },
      { name: "US fluid oz",    symbol: "fl oz", toBase: 0.02957353 },
      { name: "US cup",         symbol: "cup",   toBase: 0.23658824 },
      { name: "US pint",        symbol: "pt",    toBase: 0.47317647 },
      { name: "US quart",       symbol: "qt",    toBase: 0.94635295 },
      { name: "US gallon",      symbol: "US gal",toBase: 3.78541178 },
      { name: "Imperial pint",  symbol: "UK pt", toBase: 0.56826125 },
      { name: "Imperial gallon",symbol: "UK gal",toBase: 4.54609188 },
      { name: "Cubic inch",     symbol: "in³",   toBase: 0.01638706 },
      { name: "Cubic foot",     symbol: "ft³",   toBase: 28.3168466 },
    ],
  },
  {
    name: "Area",
    baseUnit: "square metre",
    units: [
      { name: "Square millimetre", symbol: "mm²",    toBase: 1e-6 },
      { name: "Square centimetre", symbol: "cm²",    toBase: 1e-4 },
      { name: "Square metre",      symbol: "m²",     toBase: 1 },
      { name: "Are",               symbol: "a",      toBase: 100 },
      { name: "Hectare",           symbol: "ha",     toBase: 10000 },
      { name: "Square kilometre",  symbol: "km²",    toBase: 1e6 },
      { name: "Square inch",       symbol: "in²",    toBase: 0.00064516 },
      { name: "Square foot",       symbol: "ft²",    toBase: 0.09290304 },
      { name: "Square yard",       symbol: "yd²",    toBase: 0.83612736 },
      { name: "Acre",              symbol: "ac",     toBase: 4046.8564 },
      { name: "Square mile",       symbol: "mi²",    toBase: 2589988.11 },
    ],
  },
  {
    name: "Speed",
    baseUnit: "metre per second",
    units: [
      { name: "Metre/second",   symbol: "m/s",  toBase: 1 },
      { name: "Kilometre/hour", symbol: "km/h", toBase: 1/3.6 },
      { name: "Mile/hour",      symbol: "mph",  toBase: 0.44704 },
      { name: "Foot/second",    symbol: "ft/s", toBase: 0.3048 },
      { name: "Knot",           symbol: "kn",   toBase: 0.514444 },
      { name: "Mach (sea level)",symbol: "Mach",toBase: 340.29 },
    ],
  },
  {
    name: "Pressure",
    baseUnit: "pascal",
    units: [
      { name: "Pascal",       symbol: "Pa",   toBase: 1 },
      { name: "Kilopascal",   symbol: "kPa",  toBase: 1000 },
      { name: "Megapascal",   symbol: "MPa",  toBase: 1e6 },
      { name: "Bar",          symbol: "bar",  toBase: 100000 },
      { name: "Millibar",     symbol: "mbar", toBase: 100 },
      { name: "PSI",          symbol: "psi",  toBase: 6894.757 },
      { name: "Atmosphere",   symbol: "atm",  toBase: 101325 },
      { name: "Torr (mmHg)",  symbol: "Torr", toBase: 133.322 },
    ],
  },
  {
    name: "Energy",
    baseUnit: "joule",
    units: [
      { name: "Joule",        symbol: "J",    toBase: 1 },
      { name: "Kilojoule",    symbol: "kJ",   toBase: 1000 },
      { name: "Megajoule",    symbol: "MJ",   toBase: 1e6 },
      { name: "Calorie",      symbol: "cal",  toBase: 4.184 },
      { name: "Kilocalorie",  symbol: "kcal", toBase: 4184 },
      { name: "Watt-hour",    symbol: "Wh",   toBase: 3600 },
      { name: "Kilowatt-hour",symbol: "kWh",  toBase: 3.6e6 },
      { name: "BTU",          symbol: "BTU",  toBase: 1055.06 },
      { name: "Foot-pound",   symbol: "ft·lb",toBase: 1.35582 },
      { name: "Electronvolt", symbol: "eV",   toBase: 1.60218e-19 },
    ],
  },
  {
    name: "Data Storage",
    baseUnit: "byte",
    units: [
      { name: "Bit",          symbol: "b",   toBase: 0.125 },
      { name: "Byte",         symbol: "B",   toBase: 1 },
      { name: "Kilobyte",     symbol: "KB",  toBase: 1024 },
      { name: "Megabyte",     symbol: "MB",  toBase: 1048576 },
      { name: "Gigabyte",     symbol: "GB",  toBase: 1073741824 },
      { name: "Terabyte",     symbol: "TB",  toBase: 1.0995e12 },
      { name: "Petabyte",     symbol: "PB",  toBase: 1.1259e15 },
    ],
  },
  {
    name: "Time",
    baseUnit: "second",
    units: [
      { name: "Nanosecond",   symbol: "ns",   toBase: 1e-9 },
      { name: "Microsecond",  symbol: "µs",   toBase: 1e-6 },
      { name: "Millisecond",  symbol: "ms",   toBase: 0.001 },
      { name: "Second",       symbol: "s",    toBase: 1 },
      { name: "Minute",       symbol: "min",  toBase: 60 },
      { name: "Hour",         symbol: "h",    toBase: 3600 },
      { name: "Day",          symbol: "day",  toBase: 86400 },
      { name: "Week",         symbol: "wk",   toBase: 604800 },
      { name: "Month (avg)",  symbol: "mo",   toBase: 2629800 },
      { name: "Year",         symbol: "yr",   toBase: 31557600 },
    ],
  },
  {
    name: "Angle",
    baseUnit: "degree",
    units: [
      { name: "Degree",       symbol: "°",    toBase: 1 },
      { name: "Radian",       symbol: "rad",  toBase: 180 / Math.PI },
      { name: "Gradian",      symbol: "grad", toBase: 0.9 },
      { name: "Arc minute",   symbol: "\'",   toBase: 1/60 },
      { name: "Arc second",   symbol: "\"",   toBase: 1/3600 },
      { name: "Revolution",   symbol: "rev",  toBase: 360 },
    ],
  },
  {
    name: "Fuel Efficiency",
    baseUnit: "L/100km",
    units: [
      { name: "Litres/100km", symbol: "L/100km", toBase: 1 },
      { name: "km/litre",     symbol: "km/L",    toBase: 0 }, // special
      { name: "MPG (US)",     symbol: "mpg US",  toBase: 0 }, // special
      { name: "MPG (UK)",     symbol: "mpg UK",  toBase: 0 }, // special
    ],
  },
];

// Convert from one unit to another within same category
export function convert(value: number, fromUnit: ConvUnit, toUnit: ConvUnit, isTemperature = false): number {
  if (isTemperature) {
    // Convert to Celsius first, then to target
    const celsius = (value + (fromUnit.offset ?? 0)) * fromUnit.toBase;
    return celsius / toUnit.toBase - (toUnit.offset ?? 0);
  }
  const base = value * fromUnit.toBase;
  return base / toUnit.toBase;
}

export function formatResult(n: number): string {
  if (n === 0) return "0";
  const abs = Math.abs(n);
  if (abs >= 1e12 || abs < 1e-9) return n.toExponential(6);
  if (abs >= 1000) return n.toLocaleString("en-ZA", { maximumFractionDigits: 4 });
  if (abs >= 1) return n.toLocaleString("en-ZA", { maximumFractionDigits: 6 });
  return n.toPrecision(6);
}
