import type { AgeBand, Attraction, AttractionFlag, ShabbatFit } from "@/lib/schema";

export function hasFlag(item: Attraction, flag: AttractionFlag) {
  return item.flags.includes(flag);
}

export function shabbatWalkable(item: Attraction) {
  return item.shabbat === "walk-ok" || item.shabbat === "streets-ok-skip-tickets";
}

export function rainyDay(item: Attraction) {
  return item.rainOk || hasFlag(item, "rainy-day") || item.indoor !== "outdoor";
}

export function fitsAge(item: Attraction, band: AgeBand) {
  if (Array.isArray(item.ages)) return item.ages.includes(band) || item.ages.includes("adults");
  return true;
}

export function durationLabel(item: Attraction) {
  if (item.duration) return item.duration;
  if (item.durationMin === item.durationMax) return `${item.durationMin} min`;
  if (item.durationMax >= 300) return `${Math.round(item.durationMin / 60)}–${Math.round(item.durationMax / 60)} hours`;
  return `${item.durationMin}–${item.durationMax} min`;
}

export function shabbatLabel(fit: ShabbatFit) {
  if (fit === "walk-ok") return "Shabbat walk";
  if (fit === "streets-ok-skip-tickets") return "Streets ok · skip tickets";
  return "Not for Shabbat";
}

export const interestFilters: { id: AttractionFlag | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "must-do", label: "Must do" },
  { id: "kids", label: "With kids" },
  { id: "teens", label: "Teens" },
  { id: "rainy-day", label: "Rainy day" },
  { id: "free", label: "Free" },
  { id: "evening", label: "Evening" },
  { id: "half-day", label: "Half day" },
  { id: "day-trip", label: "Day trips" },
  { id: "shabbat-walk", label: "Shabbat walk" },
];

export function filterAttractions(
  rows: Attraction[],
  flag: AttractionFlag | "all" | "rain" | "indoor" | "free" | "shabbat",
) {
  if (flag === "all") return rows;
  if (flag === "rain") return rows.filter(rainyDay);
  if (flag === "indoor") return rows.filter((item) => item.indoor !== "outdoor");
  if (flag === "free") return rows.filter((item) => item.ticket === "free" || hasFlag(item, "free"));
  if (flag === "shabbat") return rows.filter(shabbatWalkable);
  return rows.filter((item) => hasFlag(item, flag));
}

export const interestRails: { id: string; label: string; match: (item: Attraction) => boolean }[] = [
  { id: "history", label: "History", match: (item) => ["historic", "museum", "architecture"].includes(String(item.category)) },
  { id: "nature", label: "Nature", match: (item) => ["nature", "hike", "boat", "viewpoint", "cave"].includes(String(item.category)) },
  { id: "food", label: "Markets", match: (item) => String(item.category) === "market" },
  { id: "family", label: "Family", match: (item) => hasFlag(item, "kids") },
  { id: "beach", label: "Beach", match: (item) => String(item.category) === "beach" },
  { id: "culture", label: "Culture", match: (item) => ["workshop", "neighborhood-walk", "historic"].includes(String(item.category)) },
  { id: "nightlife", label: "Evening", match: (item) => hasFlag(item, "evening") || String(item.category) === "evening" },
  { id: "caves", label: "Caves", match: (item) => String(item.category) === "cave" },
  { id: "trekking", label: "Trekking", match: (item) => String(item.category) === "hike" },
];

export function topMustDos(rows: Attraction[], n = 5) {
  const ranked = [...rows].sort((a, b) => {
    const as = (hasFlag(a, "must-do") ? 2 : 0) + (hasFlag(a, "skip-if-short") ? -1 : 0);
    const bs = (hasFlag(b, "must-do") ? 2 : 0) + (hasFlag(b, "skip-if-short") ? -1 : 0);
    return bs - as;
  });
  return ranked.slice(0, n);
}
