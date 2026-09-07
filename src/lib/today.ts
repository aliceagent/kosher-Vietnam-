import { filterAttractions, rainyDay } from "@/lib/filters";
import type { AgeBand, Attraction, AttractionFlag } from "@/lib/schema";

export type TodayInput = {
  destSlug: string;
  budgetMin: number;
  weather: "sun" | "rain" | "hot";
  group: "adults" | "young" | "teens";
  interest: AttractionFlag | "all";
};

export function pickToday(rows: Attraction[], input: TodayInput) {
  let list = rows.filter((item) => item.durationMin > 0 && item.durationMin <= input.budgetMin + 30);

  if (input.weather === "rain") list = list.filter((item) => rainyDay(item) || item.indoor !== "outdoor");
  if (input.weather === "hot") list = list.filter((item) => item.heatOk || item.aircon || item.indoor === "indoor");

  const bands: AgeBand[] =
    input.group === "young" ? ["0-2", "3-5", "6-9"] : input.group === "teens" ? ["teens", "10-12"] : ["adults", "teens", "10-12"];

  list = list.filter((item) => {
    if (!Array.isArray(item.ages)) return true;
    return item.ages.some((age) => bands.includes(age));
  });

  if (input.interest !== "all") list = filterAttractions(list, input.interest);

  list = list.filter((item) => !item.flags.includes("skip-if-short") || input.budgetMin >= 240);

  return list
    .sort((a, b) => {
      const as = (a.flags.includes("must-do") ? 2 : 0) + (a.flags.includes("kids") && input.group === "young" ? 1 : 0);
      const bs = (b.flags.includes("must-do") ? 2 : 0) + (b.flags.includes("kids") && input.group === "young" ? 1 : 0);
      return bs - as || a.durationMin - b.durationMin;
    })
    .slice(0, 8);
}

export function whyFits(item: Attraction, input: TodayInput) {
  const bits = [`${item.durationMin}–${item.durationMax} min`];
  if (input.weather === "rain" && (item.rainOk || item.indoor !== "outdoor")) bits.push("works in rain");
  if (input.weather === "hot" && (item.aircon || item.indoor === "indoor")) bits.push("air-con / indoor");
  if (input.group === "young" && item.flags.includes("kids")) bits.push("marked for kids");
  if (item.shabbat !== "not-shabbat") bits.push("not ticket-gated");
  return bits.join(" · ");
}
