import type { Attraction, AttractionFlag, Verification } from "@/lib/schema";

export const checked: Verification = {
  status: "sourced",
  lastChecked: "2026-09-07",
  note: "Editorial decision notes. Hours and ticket prices change — confirm the day you go.",
};

export const livePrice: Verification = {
  status: "live-external",
  lastChecked: "2026-09-07",
  note: "Treat prices as a band, not a quote.",
};

export const evergreen: Verification = {
  status: "evergreen",
  lastChecked: "2026-09-07",
};

type Draft = Omit<Attraction, "verification" | "flags" | "image"> & {
  flags?: AttractionFlag[];
  verification?: Verification;
  image?: string;
};

export function attraction(row: Draft): Attraction {
  return {
    flags: [],
    verification: checked,
    ...row,
    image: row.image ?? `/attractions/${row.id}.jpg`,
  };
}
