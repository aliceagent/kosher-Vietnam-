export type VerificationStatus = "sourced" | "unverified" | "needs-confirm";

export type Verification = {
  status: VerificationStatus;
  lastChecked: string;
  source?: string;
  note?: string;
};

export type GeoPoint = {
  lat: number;
  lng: number;
};

export type Region = "north" | "central" | "south";

export type KashrutClass =
  | "community-operated"
  | "certified-kosher"
  | "kosher-products"
  | "vegetarian-not-kosher";

export type Destination = {
  slug: string;
  countrySlug: string;
  name: string;
  localName?: string;
  region: Region;
  summary: string;
  whyVisit: string;
  howLong: string;
  image: string;
  coords: GeoPoint;
  tzid: string;
  airports: string[];
  transferMinutesFromAirport: number;
  jewishInfrastructure: "strong" | "seasonal" | "none-known";
  shabbatBase: {
    recommended: boolean;
    neighborhood: string;
    walkingNotes: string;
    fridayAdvice: string;
  };
  eruv: {
    exists: false;
    notes: string;
    verification: Verification;
  };
  weather: {
    bestMonths: string;
    rainy: string;
    dry: string;
    notes: string;
  };
  gettingThere: string;
  gettingAround: string;
  familyNotes: string;
  nearby: string[];
};

export type Community = {
  id: string;
  destinationSlug: string;
  name: string;
  kind: "chabad" | "synagogue" | "community";
  address: string;
  addressNote?: string;
  phone?: string;
  whatsapp?: string;
  website?: string;
  email?: string;
  mapsQuery: string;
  contact?: string;
  languages: string[];
  advanceContactRequired: boolean;
  services: string;
  meals: string;
  verification: Verification;
};

export type Venue = {
  id: string;
  destinationSlug: string;
  name: string;
  kashrutClass: KashrutClass;
  type: "restaurant" | "meals" | "grocery" | "catering";
  meatDairy: "meat" | "dairy" | "pareve" | "mixed" | "unknown";
  address: string;
  hours?: string;
  fridayHours?: string;
  shabbatStatus: string;
  phone?: string;
  whatsapp?: string;
  website?: string;
  mapsQuery: string;
  notes: string;
  verification: Verification;
};

export type StayArea = {
  id: string;
  destinationSlug: string;
  name: string;
  walkToCommunity?: string;
  familyFit: string;
  kitchenNotes: string;
  shabbatQuestions: string[];
  notes: string;
};

export type Attraction = {
  id: string;
  destinationSlug: string;
  name: string;
  category: string;
  description: string;
  duration: string;
  ages: string;
  stroller: string;
  walkingFromJewishArea?: string;
  shabbatNote: string;
  religiousSite: boolean;
};

export type ItineraryDay = {
  label: string;
  title: string;
  body: string;
  shabbat?: boolean;
};

export type Itinerary = {
  slug: string;
  title: string;
  days: number;
  styles: string[];
  summary: string;
  shomerShabbat: boolean;
  daysPlan: ItineraryDay[];
};

export type Guide = {
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  lastChecked: string;
  sections: { heading: string; body: string }[];
};

export type Phrase = {
  en: string;
  vi: string;
  say: string;
  caution?: string;
};
