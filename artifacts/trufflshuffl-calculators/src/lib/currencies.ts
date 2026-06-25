export interface Currency {
  code: string;
  symbol: string;
  name: string;
  locale: string;
}

export const CURRENCIES: Currency[] = [
  { code: "ZAR", symbol: "R",    name: "South African Rand",    locale: "en-ZA" },
  { code: "USD", symbol: "$",    name: "US Dollar",              locale: "en-US" },
  { code: "EUR", symbol: "€",    name: "Euro",                   locale: "de-DE" },
  { code: "GBP", symbol: "£",    name: "British Pound",          locale: "en-GB" },
  { code: "AUD", symbol: "A$",   name: "Australian Dollar",      locale: "en-AU" },
  { code: "CAD", symbol: "C$",   name: "Canadian Dollar",        locale: "en-CA" },
  { code: "CHF", symbol: "CHF",  name: "Swiss Franc",            locale: "de-CH" },
  { code: "CNY", symbol: "¥",    name: "Chinese Yuan",           locale: "zh-CN" },
  { code: "JPY", symbol: "¥",    name: "Japanese Yen",           locale: "ja-JP" },
  { code: "INR", symbol: "₹",    name: "Indian Rupee",           locale: "en-IN" },
  { code: "BRL", symbol: "R$",   name: "Brazilian Real",         locale: "pt-BR" },
  { code: "MXN", symbol: "MX$",  name: "Mexican Peso",           locale: "es-MX" },
  { code: "NGN", symbol: "₦",    name: "Nigerian Naira",         locale: "en-NG" },
  { code: "KES", symbol: "KSh",  name: "Kenyan Shilling",        locale: "en-KE" },
  { code: "GHS", symbol: "GH₵",  name: "Ghanaian Cedi",          locale: "en-GH" },
  { code: "EGP", symbol: "E£",   name: "Egyptian Pound",         locale: "ar-EG" },
  { code: "NZD", symbol: "NZ$",  name: "New Zealand Dollar",     locale: "en-NZ" },
  { code: "SGD", symbol: "S$",   name: "Singapore Dollar",       locale: "en-SG" },
  { code: "HKD", symbol: "HK$",  name: "Hong Kong Dollar",       locale: "en-HK" },
  { code: "SEK", symbol: "kr",   name: "Swedish Krona",          locale: "sv-SE" },
  { code: "NOK", symbol: "kr",   name: "Norwegian Krone",        locale: "nb-NO" },
  { code: "DKK", symbol: "kr",   name: "Danish Krone",           locale: "da-DK" },
  { code: "AED", symbol: "د.إ",  name: "UAE Dirham",             locale: "ar-AE" },
  { code: "SAR", symbol: "﷼",    name: "Saudi Riyal",            locale: "ar-SA" },
  { code: "TRY", symbol: "₺",    name: "Turkish Lira",           locale: "tr-TR" },
  { code: "PKR", symbol: "₨",    name: "Pakistani Rupee",        locale: "en-PK" },
  { code: "BDT", symbol: "৳",    name: "Bangladeshi Taka",       locale: "bn-BD" },
  { code: "IDR", symbol: "Rp",   name: "Indonesian Rupiah",      locale: "id-ID" },
  { code: "PHP", symbol: "₱",    name: "Philippine Peso",        locale: "en-PH" },
  { code: "THB", symbol: "฿",    name: "Thai Baht",              locale: "th-TH" },
  { code: "MYR", symbol: "RM",   name: "Malaysian Ringgit",      locale: "ms-MY" },
  { code: "VND", symbol: "₫",    name: "Vietnamese Dong",        locale: "vi-VN" },
  { code: "TWD", symbol: "NT$",  name: "Taiwan Dollar",          locale: "zh-TW" },
  { code: "KRW", symbol: "₩",    name: "South Korean Won",       locale: "ko-KR" },
  { code: "PLN", symbol: "zł",   name: "Polish Zloty",           locale: "pl-PL" },
  { code: "CZK", symbol: "Kč",   name: "Czech Koruna",           locale: "cs-CZ" },
  { code: "HUF", symbol: "Ft",   name: "Hungarian Forint",       locale: "hu-HU" },
  { code: "RON", symbol: "lei",  name: "Romanian Leu",           locale: "ro-RO" },
  { code: "UAH", symbol: "₴",    name: "Ukrainian Hryvnia",      locale: "uk-UA" },
  { code: "ILS", symbol: "₪",    name: "Israeli New Shekel",     locale: "he-IL" },
  { code: "CLP", symbol: "CLP$", name: "Chilean Peso",           locale: "es-CL" },
  { code: "COP", symbol: "COP$", name: "Colombian Peso",         locale: "es-CO" },
  { code: "PEN", symbol: "S/",   name: "Peruvian Sol",           locale: "es-PE" },
  { code: "ARS", symbol: "AR$",  name: "Argentine Peso",         locale: "es-AR" },
  { code: "MAD", symbol: "MAD",  name: "Moroccan Dirham",        locale: "ar-MA" },
  { code: "TZS", symbol: "TSh",  name: "Tanzanian Shilling",     locale: "sw-TZ" },
  { code: "ETB", symbol: "Br",   name: "Ethiopian Birr",         locale: "am-ET" },
  { code: "XOF", symbol: "CFA",  name: "West African CFA Franc", locale: "fr-SN" },
];

export function fmtCurrency(amount: number, currency: Currency, dec?: number): string {
  const noDecimals = ["JPY", "KRW", "VND", "IDR", "HUF", "CLP", "XOF", "BDT", "TWD", "PKR"];
  const decimals = dec !== undefined ? dec : noDecimals.includes(currency.code) ? 0 : 2;
  try {
    return new Intl.NumberFormat(currency.locale, {
      style: "currency",
      currency: currency.code,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(amount);
  } catch {
    return `${currency.symbol}${amount.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`;
  }
}

export const DEFAULT_CURRENCY = CURRENCIES[0]; // ZAR
