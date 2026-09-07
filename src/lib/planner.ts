import { getDestination, getDestinations, shabbatCities } from "@/lib/content";
import { holidaysInRange, listShabbatWindows } from "@/lib/shabbat";

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
};

export type PlannerWarning = {
  level: "info" | "warn" | "block";
  title: string;
  body: string;
};

export function buildPlan(input: PlannerInput) {
  const start = new Date(`${input.start}T12:00:00`);
  const end = new Date(`${input.end}T12:00:00`);
  const fridays = listShabbatWindows(start, end);
  const holidays = holidaysInRange(start, end);
  const chosen = input.destinations.map((slug) => getDestination(slug)).filter(Boolean);
  const bases = shabbatCities();
  const warnings: PlannerWarning[] = [];

  if (end < start) {
    warnings.push({
      level: "block",
      title: "Dates are reversed",
      body: "Departure is before arrival.",
    });
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
  };
}
