"use client";

import { useMemo, useState } from "react";
import { AttractionCard } from "@/components/things/attraction-card";
import { Field, inputClass } from "@/components/ui/bits";
import { pickToday, whyFits } from "@/lib/today";
import type { Attraction, AttractionFlag } from "@/lib/schema";

export function TodayPicker({
  destinations,
  attractions,
}: {
  destinations: { slug: string; name: string }[];
  attractions: Attraction[];
}) {
  const [destSlug, setDestSlug] = useState("hanoi");
  const [budgetMin, setBudgetMin] = useState(180);
  const [weather, setWeather] = useState<"sun" | "rain" | "hot">("sun");
  const [group, setGroup] = useState<"adults" | "young" | "teens">("young");
  const [interest, setInterest] = useState<AttractionFlag | "all">("all");

  const rows = useMemo(() => {
    const input = { destSlug, budgetMin, weather, group, interest };
    return pickToday(
      attractions.filter((item) => item.destinationSlug === destSlug),
      input,
    );
  }, [attractions, destSlug, budgetMin, weather, group, interest]);

  const input = { destSlug, budgetMin, weather, group, interest };

  return (
    <div className="mt-5 space-y-3 px-4">
      <div className="grid grid-cols-2 gap-3">
        <Field label="City">
          <select className={inputClass} value={destSlug} onChange={(e) => setDestSlug(e.target.value)}>
            {destinations.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Hours you have">
          <select className={inputClass} value={budgetMin} onChange={(e) => setBudgetMin(Number(e.target.value))}>
            <option value={90}>~90 min</option>
            <option value={180}>Half day</option>
            <option value={300}>Most of the day</option>
            <option value={480}>Full day</option>
          </select>
        </Field>
        <Field label="Weather">
          <select className={inputClass} value={weather} onChange={(e) => setWeather(e.target.value as typeof weather)}>
            <option value="sun">Clear</option>
            <option value="rain">Rain</option>
            <option value="hot">Brutal heat</option>
          </select>
        </Field>
        <Field label="Who">
          <select className={inputClass} value={group} onChange={(e) => setGroup(e.target.value as typeof group)}>
            <option value="adults">Adults</option>
            <option value="young">Young kids</option>
            <option value="teens">Teens</option>
          </select>
        </Field>
      </div>
      <Field label="Bias">
        <select
          className={inputClass}
          value={interest}
          onChange={(e) => setInterest(e.target.value as AttractionFlag | "all")}
        >
          <option value="all">Whatever fits</option>
          <option value="must-do">Must-do first</option>
          <option value="kids">Kids</option>
          <option value="rainy-day">Indoor / rain</option>
          <option value="shabbat-walk">Shabbat walk</option>
          <option value="evening">Evening</option>
        </select>
      </Field>
      {rows.length === 0 ? (
        <p className="text-sm text-stone">Nothing fits that window. Loosen the hours or skip the rain filter.</p>
      ) : (
        rows.map((item) => (
          <div key={item.id}>
            <p className="mb-2 text-xs font-semibold text-jade">{whyFits(item, input)}</p>
            <AttractionCard item={item} />
          </div>
        ))
      )}
    </div>
  );
}
