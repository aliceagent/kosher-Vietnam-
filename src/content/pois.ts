import type { MapPin } from "@/lib/schema";

export const extraPois: MapPin[] = [
  {
    id: "hanoi-hospital",
    title: "International clinic cluster (Tây Hồ / center)",
    kind: "hospital",
    blurb: "English-speaking clinics are the usual first stop. Confirm the current pin when you arrive.",
    coords: { lat: 21.058, lng: 105.82 },
    shabbatOk: true,
    href: "/emergency",
  },
  {
    id: "hcmc-hospital",
    title: "District 1 international hospital area",
    kind: "hospital",
    blurb: "Save one pin before Friday. Addresses move — confirm.",
    coords: { lat: 10.782, lng: 106.7 },
    shabbatOk: true,
    href: "/emergency",
  },
  {
    id: "danang-hospital",
    title: "Da Nang hospitals (serious care)",
    kind: "hospital",
    blurb: "Hội An clinics for minor issues; serious care is a drive to Da Nang.",
    coords: { lat: 16.074, lng: 108.216 },
    shabbatOk: true,
    href: "/emergency",
  },
];
