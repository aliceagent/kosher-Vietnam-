export type VerificationStatus =
  | "evergreen"
  | "sourced"
  | "recently-checked"
  | "community-verified"
  | "live-external"
  | "needs-confirm"
  | "unverified";

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

export type AgeBand = "0-2" | "3-5" | "6-9" | "10-12" | "teens" | "adults";

export type KashrutClass =
  | "community-operated"
  | "certified-kosher"
  | "kosher-products"
  | "vegetarian-not-kosher";

export type AttractionCategory =
  | "must-see"
  | "nature"
  | "viewpoint"
  | "beach"
  | "cave"
  | "boat"
  | "hike"
  | "market"
  | "museum"
  | "historic"
  | "architecture"
  | "kids"
  | "indoor"
  | "adventure"
  | "evening"
  | "day-trip"
  | "workshop"
  | "neighborhood-walk";

export type AttractionFlag =
  | "must-do"
  | "kids"
  | "teens"
  | "rainy-day"
  | "quick-stop"
  | "half-day"
  | "full-day"
  | "hidden-gem"
  | "skip-if-short"
  | "book-ahead"
  | "free"
  | "shabbat-walk"
  | "evening"
  | "day-trip";

export type IndoorKind = "indoor" | "outdoor" | "mixed";
export type TicketKind = "free" | "paid";
export type BookingKind = "none" | "recommended" | "required";
export type StrollerKind = "yes" | "mixed" | "no";
export type ShabbatFit = "walk-ok" | "streets-ok-skip-tickets" | "not-shabbat";

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
  bestFor?: string[];
  whoWillLove?: string;
  whoMightNot?: string;
  feelsLike?: string;
  dailyBudget?: { low: string; typical: string; note: string };
  minNights?: number;
  maxNights?: number;
  neighborhoodIds?: string[];
  dayTripIds?: string[];
  continueTrip?: string[];
  familyByAge?: Partial<Record<AgeBand, string>>;
  jewishSummary?: string;
};

export type Community = {
  id: string;
  destinationSlug: string;
  name: string;
  kind: "chabad" | "synagogue" | "community";
  address: string;
  addressVi?: string;
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
  coords?: GeoPoint;
  verification: Verification;
};

export type CountryRecord = {
  slug: string;
  name: string;
  localName?: string;
  status: "live" | "preview";
  summary: string;
  image: string;
  shabbatCities: string[];
};

export type SavedKind =
  | "destination"
  | "attraction"
  | "community"
  | "venue"
  | "stay"
  | "phrase"
  | "route"
  | "Destination"
  | "Chabad"
  | "Attraction"
  | string;

export type SavedItem = {
  id: string;
  href: string;
  title: string;
  kind: SavedKind;
  blurb: string;
  destinationSlug?: string;
  sortIndex?: number;
  collection?: "trip";
};

export type Submission = {
  id: string;
  kind: string;
  place: string;
  details: string;
  email: string;
  createdAt: string;
  status: "pending" | "approved" | "rejected";
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
  coords?: GeoPoint;
  verification: Verification;
};

export type StayArea = {
  id: string;
  destinationSlug: string;
  neighborhoodId?: string;
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
  localName?: string;
  neighborhoodId?: string;
  category: AttractionCategory | string;
  description: string;
  whyGo: string;
  duration: string;
  durationMin: number;
  durationMax: number;
  indoor: IndoorKind;
  rainOk: boolean;
  heatOk: boolean;
  shade: boolean;
  aircon: boolean;
  ticket: TicketKind;
  priceAdult?: string;
  priceChild?: string;
  priceNote?: string;
  booking: BookingKind;
  coords?: GeoPoint;
  address?: string;
  addressVi?: string;
  religiousSite: boolean;
  shabbat: ShabbatFit;
  shabbatNote: string;
  ages: AgeBand[] | string;
  stroller: StrollerKind | string;
  walkingFromJewishArea?: string;
  flags: AttractionFlag[];
  grabMin?: number;
  exclusiveWith?: string[];
  verification: Verification;
};

export type Neighborhood = {
  id: string;
  destinationSlug: string;
  name: string;
  localName?: string;
  whyStay: string;
  atmosphere: string;
  familyFit: string;
  jewishRelevance: string;
  transport: string;
  nightlife: string;
  shabbatWalk?: string;
};

export type TransportMode = "van" | "sleeper-bus" | "train" | "driver" | "flight" | "boat" | "grab";

export type TransportOption = {
  mode: TransportMode;
  name: string;
  durationMin: number;
  durationMax: number;
  cost: string;
  comfort: string;
  kids: string;
  luggage: string;
  overnight: boolean;
  motion: string;
  book: string;
  pickup: string;
  dropoff: string;
  fridayNote: string;
};

export type TransportRoute = {
  id: string;
  fromSlug: string;
  toSlug: string;
  options: TransportOption[];
  recommendation: {
    family: string;
    backpacker: string;
    overnight: string;
    friday: string;
  };
  verification: Verification;
};

export type AppRecord = {
  id: string;
  category: string;
  name: string;
  why: string;
  priority: "essential" | "useful" | "optional";
  ios?: string;
  android?: string;
  offline: boolean;
  setupBefore: boolean;
  needsPhone: boolean;
  needsVnNumber: boolean;
  english: boolean;
  setup: string;
  tips: string;
  verification: Verification;
};

export type PhraseCategory =
  | "basics"
  | "directions"
  | "grab"
  | "hotel"
  | "shopping"
  | "food"
  | "medical"
  | "family"
  | "emergency"
  | "numbers"
  | "travel";

export type Phrase = {
  id?: string;
  category?: PhraseCategory;
  en: string;
  vi: string;
  say: string;
  caution?: string;
  showToDriver?: boolean;
  saveable?: boolean;
};

export type AirportGuide = {
  code: string;
  destSlug: string;
  name: string;
  immigration: string;
  baggage: string;
  sim: string;
  atm: string;
  grab: string;
  taxiWarning: string;
  wifi: string;
  toDistricts: { area: string; minutes: string; cost: string }[];
  nightArrival: string;
  fridayNote: string;
};

export type ChecklistItem = {
  id: string;
  section: string;
  title: string;
  body: string;
  essential: boolean;
};

export type MapPoiKind =
  | "attraction"
  | "chabad"
  | "kosher"
  | "stay"
  | "walk"
  | "city"
  | "neighborhood"
  | "hospital"
  | "pharmacy"
  | "atm"
  | "airport"
  | "station"
  | "emergency";

export type MapPin = {
  id: string;
  title: string;
  kind: MapPoiKind;
  href?: string;
  blurb: string;
  coords: GeoPoint;
  walkMins?: number;
  shabbatOk: boolean;
  flags?: AttractionFlag[];
  address?: string;
  addressVi?: string;
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

export type PlanBlockKind = "attraction" | "travel" | "meals" | "prep" | "rest" | "arrive";

export type PlanBlock = {
  start: string;
  end: string;
  kind: PlanBlockKind;
  title: string;
  note: string;
  attractionId?: string;
  routeId?: string;
  grabMin?: number;
  kids?: string;
  book?: string;
};

export type PlanDay = {
  date: string;
  destSlug: string;
  destName: string;
  shabbat: boolean;
  blocks: PlanBlock[];
};

export type OfflineBundleMeta = {
  id: string;
  title: string;
  destSlugs: string[];
  updatedAt: string;
  bytesEstimate: string;
};
