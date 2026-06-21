export type { Article, ArticleFAQ } from "./types";
export { LENGTH_ARTICLES } from "./length";
export { WEIGHT_ARTICLES } from "./weight";
export { TEMPERATURE_ARTICLES } from "./temperature";
export { SPEED_ARTICLES } from "./speed";
export { AREA_ARTICLES } from "./area";
export { VOLUME_ARTICLES } from "./volume";
export { DATA_ARTICLES } from "./data";
export { ENERGY_ARTICLES } from "./energy";
export { POWER_ARTICLES } from "./power";
export { PRESSURE_ARTICLES } from "./pressure";
export { TIME_ARTICLES } from "./time";

import { LENGTH_ARTICLES } from "./length";
import { WEIGHT_ARTICLES } from "./weight";
import { TEMPERATURE_ARTICLES } from "./temperature";
import { SPEED_ARTICLES } from "./speed";
import { AREA_ARTICLES } from "./area";
import { VOLUME_ARTICLES } from "./volume";
import { DATA_ARTICLES } from "./data";
import { ENERGY_ARTICLES } from "./energy";
import { POWER_ARTICLES } from "./power";
import { PRESSURE_ARTICLES } from "./pressure";
import { TIME_ARTICLES } from "./time";
import type { Article } from "./types";

export const ALL_ARTICLES: Article[] = [
  ...LENGTH_ARTICLES,
  ...WEIGHT_ARTICLES,
  ...TEMPERATURE_ARTICLES,
  ...SPEED_ARTICLES,
  ...AREA_ARTICLES,
  ...VOLUME_ARTICLES,
  ...DATA_ARTICLES,
  ...ENERGY_ARTICLES,
  ...POWER_ARTICLES,
  ...PRESSURE_ARTICLES,
  ...TIME_ARTICLES,
];

export const ARTICLE_CATEGORIES = [
  "Length",
  "Weight",
  "Temperature",
  "Speed",
  "Area",
  "Volume",
  "Data",
  "Energy",
  "Power",
  "Pressure",
  "Time",
] as const;

export type ArticleCategory = (typeof ARTICLE_CATEGORIES)[number];

export function getArticlesByCategory(category: string): Article[] {
  return ALL_ARTICLES.filter(a => a.category === category);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return ALL_ARTICLES.find(a => a.slug === slug);
}
