import { getAttractions, getDestination, getDestinations, getRouteBetween, shabbatCities } from "@/lib/content";
import { holidaysInRange, listShabbatWindows } from "@/lib/shabbat";
import type { Attraction, PlanBlock, PlanDay } from "@/lib/schema";

export type PlannerInput = {
  start: string;
  end: string;
  adults: number;
  children: number;
  arrivalAirport: string;
  departAirport: string;
  kosher: boolean;
  shomer: boolean;
  destinations: string[];
  pace: "slow" | "standard" | "fast";
  interests?: string[];
};

export type PlannerWarning = {
  level: "info" | "warn" | "block";
  title: string;
  body: string;
};

const GEO = [
  "hanoi",
  "ninh-binh",
  "ha-long-bay",
  "sapa",
  "ha-giang",
  "phong-nha",
  "hue",
  "da-nang",
  "hoi-an",
  "nha-trang",
  "da-lat",
  "ho-chi-minh-city",
  "mekong-delta",
  "phu-quoc",
];

function iso(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function addDays(d: Date, n: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

function nightsFor(slug: string, pace: PlannerInput["pace"], remaining: number) {
  const dest = getDestination(slug);
  const min = dest?.minNights ?? (dest?.shabbatBase.recommended ? 2 : 1);
  const max = dest?.maxNights ?? min + 1;
  if (pace === "fast") return Math.min(min, remaining);
  if (pace === "slow") return Math.min(max, remaining);
  return Math.min(Math.max(min, 1), remaining);
}

export function buildPlan(input: PlannerInput) {
  const start = new Date(`${input.start}T12:00:00`);
  const end = new Date(`${input.end}T12:00:00`);
  const fridays = listShabbatWindows(start, end);
  const holidays = holidaysInRange(start, end);
  const chosen = input.destinations.map((slug) => getDestination(slug)).filter(Boolean);
  const bases = shabbatCities();
  const warnings: PlannerWarning[] = [];

  if (end < start) {
    warnings.push({ level: "block", title: "Dates are reversed", body: "Departure is before arrival." });
  }

  const shabbatStops = fridays.map((friday, index) => {
    const recommended =
      chosen.find((item) => item && bases.some((base) => base.slug === item.slug)) ??
      (index === 0 && input.arrivalAirport === "SGN"
        ? getDestination("ho-chi-minh-city")
        : getDestination("hanoi"));

    const risky = chosen.filter((item) => item && item.jewishInfrastructure === "none-known");
    if (input.shomer && risky.length) {
      for (const place of risky) {
        if (!place) continue;
        warnings.push({
          level: "warn",
          title: `${place.name} is a weak Friday`,
          body: `Your list includes ${place.name}. If you need a minyan and kosher Shabbat meals, be in ${recommended?.name ?? "Hanoi, Hội An, or Saigon"} by Friday afternoon.`,
        });
      }
    }

    return {
      friday,
      recommended: recommended ?? bases[0],
      reason: recommended?.shabbatBase.fridayAdvice ?? "",
    };
  });

  if (input.shomer && chosen.some((item) => item?.slug === "ha-giang")) {
    warnings.push({
      level: "block",
      title: "Hà Giang on a Friday will not work",
      body: "There is no known Chabad, minyan, or kosher kitchen. Finish the loop Thursday and return to Hanoi or confirmed-open Sapa.",
    });
  }

  if (input.kosher) {
    warnings.push({
      level: "info",
      title: "Kosher food is city-specific",
      body: "Plan meals through Chabad in Hanoi, Hội An, and Ho Chi Minh City. Everywhere else, pack food.",
    });
  }

  if (input.children > 0 && input.pace === "fast") {
    warnings.push({
      level: "warn",
      title: "Pace is hard with children",
      body: "Drop Hà Giang and overnight cruises. Keep one neighborhood per Shabbat.",
    });
  }

  if (holidays.length) {
    warnings.push({
      level: "warn",
      title: "Yom Tov falls in this trip",
      body: holidays.map((ev) => ev.render("en")).join(", ") + ". Be in a Shabbat city before it starts and register for meals.",
    });
  }

  const uniqueWarnings = warnings.filter(
    (item, index) => warnings.findIndex((other) => other.title === item.title) === index,
  );

  const days = buildDays(input, start, end, shabbatStops, uniqueWarnings);

  return {
    nights: Math.max(0, Math.round((end.getTime() - start.getTime()) / 86400000)),
    fridays,
    holidays: holidays.map((ev) => ({
      title: ev.render("en"),
      date: ev.getDate().greg(),
    })),
    shabbatStops,
    chosen,
    allDestinations: getDestinations(),
    warnings: uniqueWarnings,
    days,
  };
}

function buildDays(
  input: PlannerInput,
  start: Date,
  end: Date,
  shabbatStops: { friday: Date; recommended: ReturnType<typeof getDestination> }[],
  warnings: PlannerWarning[],
): PlanDay[] {
  const total = Math.max(1, Math.round((end.getTime() - start.getTime()) / 86400000) + 1);
  const northFirst = input.arrivalAirport !== "SGN";
  const wanted = [...input.destinations].sort((a, b) => {
    const ai = GEO.indexOf(a);
    const bi = GEO.indexOf(b);
    return northFirst ? ai - bi : bi - ai;
  });

  if (!wanted.includes("hanoi") && northFirst && input.shomer) wanted.unshift("hanoi");
  if (!wanted.includes("ho-chi-minh-city") && !northFirst && input.shomer) wanted.unshift("ho-chi-minh-city");

  const assignment: string[] = [];
  let cursor = 0;
  let remaining = total;
  for (const slug of wanted) {
    if (remaining <= 0) break;
    const n = Math.max(1, nightsFor(slug, input.pace, remaining));
    for (let i = 0; i < n && cursor < total; i++) {
      assignment[cursor] = slug;
      cursor++;
      remaining--;
    }
  }
  while (assignment.length < total) assignment.push(assignment[assignment.length - 1] ?? wanted[0] ?? "hanoi");

  if (input.shomer) {
    for (const stop of shabbatStops) {
      const fridayIndex = Math.round((stop.friday.getTime() - start.getTime()) / 86400000);
      const satIndex = fridayIndex + 1;
      const slug = stop.recommended?.slug ?? "hanoi";
      if (fridayIndex >= 0 && fridayIndex < total) assignment[fridayIndex] = slug;
      if (satIndex >= 0 && satIndex < total) assignment[satIndex] = slug;
      if (fridayIndex > 0 && assignment[fridayIndex - 1] === "ninh-binh") assignment[fridayIndex - 1] = slug;
      if (fridayIndex > 0 && assignment[fridayIndex - 1] === "ha-long-bay") assignment[fridayIndex - 1] = slug;
    }
  }

  const used = new Set<string>();
  const days: PlanDay[] = [];

  for (let i = 0; i < total; i++) {
    const date = addDays(start, i);
    const slug = assignment[i] ?? "hanoi";
    const dest = getDestination(slug);
    const dow = date.getDay();
    const shabbat = input.shomer && (dow === 5 || dow === 6);
    const blocks: PlanBlock[] = [];

    if (i === 0) {
      blocks.push({
        start: "12:00",
        end: "15:00",
        kind: "arrive",
        title: `Land · ${dest?.name ?? slug}`,
        note: dest?.shabbatBase.fridayAdvice ?? "Immigration plus transfer. Confirm the hotel pin.",
      });
    }

    if (i > 0 && assignment[i] !== assignment[i - 1]) {
      const route = getRouteBetween(assignment[i - 1], assignment[i]);
      const opt = route?.options[0];
      blocks.push({
        start: "08:00",
        end: "12:00",
        kind: "travel",
        title: `Move to ${dest?.name}`,
        note: route
          ? `${opt?.name ?? "Transfer"} · ${Math.round((opt?.durationMin ?? 120) / 60)}–${Math.round((opt?.durationMax ?? 180) / 60)}h · ${route.recommendation.friday}`
          : "Confirm the transfer. No Friday intercity if you keep Shabbat.",
        routeId: route?.id,
      });
    }

    if (shabbat && dow === 5) {
      blocks.push(
        {
          start: "11:00",
          end: "14:00",
          kind: "meals",
          title: "Pick up Shabbat meals",
          note: input.kosher
            ? "Chabad reservation or packed food. Not a new intercity."
            : "Be in the walking city before afternoon.",
        },
        {
          start: "15:00",
          end: "16:30",
          kind: "prep",
          title: "Walk the route to Chabad in daylight",
          note: dest?.shabbatBase.walkingNotes ?? "Confirm the pin.",
        },
      );
    } else if (shabbat && dow === 6) {
      const walk = getAttractions(slug).find((item) => item.shabbat === "walk-ok" || item.flags.includes("shabbat-walk"));
      blocks.push({
        start: "10:00",
        end: "12:00",
        kind: "meals",
        title: "Shabbat in place",
        note: "Services and meals if you reserved. This is not a pesak.",
      });
      if (walk) {
        blocks.push({
          start: "16:00",
          end: "17:30",
          kind: "attraction",
          title: walk.name,
          note: walk.shabbatNote,
          attractionId: walk.id,
        });
      }
    } else {
      const picks = pickDayAttractions(slug, used, input);
      let hour = blocks.some((b) => b.kind === "travel") ? 13 : 9;
      for (const item of picks) {
        const startH = String(hour).padStart(2, "0") + ":00";
        const durH = Math.max(1, Math.round(item.durationMin / 60));
        hour = Math.min(17, hour + durH);
        const endH = String(hour).padStart(2, "0") + ":00";
        blocks.push({
          start: startH,
          end: endH,
          kind: "attraction",
          title: item.name,
          note: item.whyGo,
          attractionId: item.id,
          kids: Array.isArray(item.ages) && item.ages.includes("3-5") ? "Works with younger kids if flagged" : undefined,
          book: item.booking !== "none" ? item.booking : undefined,
        });
        used.add(item.id);
        if (item.exclusiveWith) item.exclusiveWith.forEach((id) => used.add(id));
        if (item.flags.includes("full-day")) break;
      }
      if (input.kosher && dest?.jewishInfrastructure !== "none-known") {
        blocks.push({
          start: "12:30",
          end: "13:30",
          kind: "meals",
          title: "Kosher meal window",
          note: "Chabad kitchen hours — not street vegetarian.",
        });
      }
    }

    days.push({
      date: iso(date),
      destSlug: slug,
      destName: dest?.name ?? slug,
      shabbat,
      blocks,
    });
  }

  const baNaDays = days.filter((d) => d.blocks.some((b) => /bà nà|ba-na|golden-bridge/i.test(b.title + (b.attractionId ?? "")))).length;
  if (baNaDays) {
    const stacked = days.some((d) => {
      const ids = d.blocks.map((b) => b.attractionId).filter(Boolean);
      return ids.includes("golden-bridge") && ids.some((id) => id && ["marble-da-nang", "marble-mountains"].includes(id));
    });
    if (stacked) {
      warnings.push({
        level: "warn",
        title: "Bà Nà is a full day",
        body: "Do not combine it with Marble Mountains unless your family likes very fast-paced travel.",
      });
    }
  }

  return days;
}

function pickDayAttractions(slug: string, used: Set<string>, input: PlannerInput): Attraction[] {
  const rows = getAttractions(slug).filter((item) => !used.has(item.id) && !item.flags.includes("skip-if-short"));
  const interest = input.interests ?? [];
  const scored = rows
    .map((item) => {
      let s = item.flags.includes("must-do") ? 5 : 1;
      if (input.children > 0 && item.flags.includes("kids")) s += 2;
      if (interest.includes("nature") && ["nature", "boat", "hike", "cave"].includes(String(item.category))) s += 2;
      if (interest.includes("kids") && item.flags.includes("kids")) s += 2;
      if (input.pace === "slow" && item.flags.includes("full-day")) s += 1;
      if (input.pace === "fast" && item.flags.includes("quick-stop")) s += 1;
      return { item, s };
    })
    .sort((a, b) => b.s - a.s)
    .map((row) => row.item);

  const out: Attraction[] = [];
  let minutes = 0;
  const cap = input.pace === "slow" ? 300 : input.pace === "fast" ? 540 : 420;
  for (const item of scored) {
    if (item.exclusiveWith?.some((id) => used.has(id) || out.some((o) => o.id === id))) continue;
    if (minutes + item.durationMin > cap && out.length) break;
    out.push(item);
    minutes += item.durationMin;
    if (item.flags.includes("full-day") || item.flags.includes("day-trip")) break;
    if (out.length >= (input.pace === "slow" ? 2 : 3)) break;
  }
  return out;
}
