import type { ReactNode } from "react";
import type { MapPoiKind, PhraseCategory, TransportMode } from "@/lib/schema";

export type IconName =
  | "alert"
  | "bag"
  | "bed"
  | "boat"
  | "book"
  | "bowl"
  | "building"
  | "bus"
  | "calendar"
  | "car"
  | "card"
  | "chat"
  | "checklist"
  | "clock"
  | "cloud"
  | "coins"
  | "download"
  | "family"
  | "flame"
  | "globe"
  | "key"
  | "luggage"
  | "map"
  | "moon"
  | "papers"
  | "phone"
  | "pin"
  | "plane"
  | "plus"
  | "route"
  | "search"
  | "signal"
  | "spark"
  | "star"
  | "sun"
  | "train"
  | "translate"
  | "walk"
  | "wifi";

export type IconTone = "jade" | "lacquer" | "lantern" | "ink";

const stroke = {
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Svg({ children }: { children: ReactNode }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden className="stroke-current">
      {children}
    </svg>
  );
}

const paths: Record<IconName, ReactNode> = {
  alert: (
    <>
      <path d="M12 4 3.8 19h16.4L12 4Z" {...stroke} />
      <path d="M12 10v4.5" {...stroke} />
      <path d="M12 17.2v.2" {...stroke} />
    </>
  ),
  bag: (
    <>
      <path d="M6 8h12l1 12H5L6 8Z" {...stroke} />
      <path d="M9 8V6.5A3 3 0 0 1 15 6.5V8" {...stroke} />
    </>
  ),
  bed: (
    <>
      <path d="M4 18V10.5A2.5 2.5 0 0 1 6.5 8H14v10" {...stroke} />
      <path d="M14 12h4.5A1.5 1.5 0 0 1 20 13.5V18" {...stroke} />
      <path d="M3 18h18" {...stroke} />
    </>
  ),
  boat: (
    <>
      <path d="M4 14h16l-2 5H6l-2-5Z" {...stroke} />
      <path d="M12 5v9" {...stroke} />
      <path d="M12 5l6 4H8l4-4Z" {...stroke} />
    </>
  ),
  book: (
    <>
      <path d="M6 5.5h9.5A2.5 2.5 0 0 1 18 8v11H8A2 2 0 0 1 6 17V5.5Z" {...stroke} />
      <path d="M6 17h12" {...stroke} />
    </>
  ),
  bowl: (
    <>
      <path d="M4 10h16s-1 8-8 8-8-8-8-8Z" {...stroke} />
      <path d="M8 7c.5 2 2 3 4 3s3.5-1 4-3" {...stroke} />
    </>
  ),
  building: (
    <>
      <path d="M5 20V7l7-3 7 3v13H5Z" {...stroke} />
      <path d="M10 20v-5h4v5" {...stroke} />
      <path d="M9 10h.01M15 10h.01M9 13.5h.01M15 13.5h.01" {...stroke} />
    </>
  ),
  bus: (
    <>
      <path d="M5 7.5A2.5 2.5 0 0 1 7.5 5h9A2.5 2.5 0 0 1 19 7.5V17H5V7.5Z" {...stroke} />
      <path d="M5 12h14" {...stroke} />
      <circle cx="8" cy="17" r="1.4" {...stroke} />
      <circle cx="16" cy="17" r="1.4" {...stroke} />
    </>
  ),
  calendar: (
    <>
      <path d="M5 7.5h14V19H5V7.5Z" {...stroke} />
      <path d="M5 11h14" {...stroke} />
      <path d="M9 5v3.5M15 5v3.5" {...stroke} />
    </>
  ),
  car: (
    <>
      <path d="M5 15.5V13l1.8-4.2A2 2 0 0 1 8.7 7.5h6.6a2 2 0 0 1 1.9 1.3L19 13v2.5" {...stroke} />
      <path d="M5 15.5h14" {...stroke} />
      <circle cx="8" cy="16.2" r="1.4" {...stroke} />
      <circle cx="16" cy="16.2" r="1.4" {...stroke} />
    </>
  ),
  card: (
    <>
      <path d="M4 8.5A2 2 0 0 1 6 6.5h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7Z" {...stroke} />
      <path d="M4 11h16" {...stroke} />
      <path d="M8 15h3" {...stroke} />
    </>
  ),
  chat: (
    <>
      <path d="M5 6.5h14v10H9l-4 3v-13Z" {...stroke} />
    </>
  ),
  checklist: (
    <>
      <path d="M9 7h10M9 12h10M9 17h10" {...stroke} />
      <path d="M5 7h.01M5 12h.01M5 17h.01" {...stroke} />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8" {...stroke} />
      <path d="M12 8v4.5l3 1.5" {...stroke} />
    </>
  ),
  cloud: (
    <>
      <path d="M7.5 17h9a3.5 3.5 0 0 0 .4-7 5 5 0 0 0-9.6-1.2A3.5 3.5 0 0 0 7.5 17Z" {...stroke} />
    </>
  ),
  coins: (
    <>
      <ellipse cx="10" cy="9" rx="6" ry="3.2" {...stroke} />
      <path d="M4 9v4c0 1.8 2.7 3.2 6 3.2s6-1.4 6-3.2V9" {...stroke} />
      <path d="M16 10.5c2.6.4 4 1.6 4 3.1 0 1.8-2.7 3.2-6 3.2-.8 0-1.6-.1-2.3-.3" {...stroke} />
    </>
  ),
  download: (
    <>
      <path d="M12 5v10" {...stroke} />
      <path d="M8 11l4 4 4-4" {...stroke} />
      <path d="M5 19h14" {...stroke} />
    </>
  ),
  family: (
    <>
      <circle cx="8" cy="8" r="2.1" {...stroke} />
      <circle cx="16" cy="8.5" r="1.7" {...stroke} />
      <path d="M4.5 19v-1.2A3.3 3.3 0 0 1 7.8 14.5h1.4A3.3 3.3 0 0 1 12.5 17.8V19" {...stroke} />
      <path d="M13 19v-1.4A2.8 2.8 0 0 1 15.8 15h.7A2.8 2.8 0 0 1 19.3 17.6V19" {...stroke} />
    </>
  ),
  flame: (
    <path
      d="M12 3s2 3 2 5.2c0 1.3-.7 2.3-2 3 1.8-.1 4 1.2 4 3.8A5 5 0 0 1 7 15c0-2.8 2.4-4.2 3.4-5.8C11.4 7.6 12 5.8 12 3Z"
      {...stroke}
    />
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8" {...stroke} />
      <path d="M4 12h16M12 4c2.5 2.8 3.8 5.4 3.8 8S14.5 17.2 12 20c-2.5-2.8-3.8-5.4-3.8-8S9.5 6.8 12 4Z" {...stroke} />
    </>
  ),
  key: (
    <>
      <circle cx="8.5" cy="12" r="3.2" {...stroke} />
      <path d="M11.4 12H20v2.2h-2V16h-2.2v-2.2H14" {...stroke} />
    </>
  ),
  luggage: (
    <>
      <path d="M7 8.5h10V19H7V8.5Z" {...stroke} />
      <path d="M10 8.5V6.2A1.2 1.2 0 0 1 11.2 5h1.6A1.2 1.2 0 0 1 14 6.2V8.5" {...stroke} />
      <path d="M10 12.5h4" {...stroke} />
    </>
  ),
  map: (
    <>
      <path d="M4 7.5 9 5.5 15 8.5 20 6.5v11l-5 2-6-3-5 2v-11Z" {...stroke} />
      <path d="M9 5.5v11M15 8.5v11" {...stroke} />
    </>
  ),
  moon: (
    <path d="M15.5 5.5A7 7 0 1 0 19 14.8 6.2 6.2 0 0 1 15.5 5.5Z" {...stroke} />
  ),
  papers: (
    <>
      <path d="M8 5.5h7l4 4V19H8V5.5Z" {...stroke} />
      <path d="M15 5.5V10h4" {...stroke} />
      <path d="M6 8.5H4.5V20.5H15" {...stroke} />
    </>
  ),
  phone: (
    <path d="M8.5 4.5h7A1.5 1.5 0 0 1 17 6v12a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 7 18V6A1.5 1.5 0 0 1 8.5 4.5Z" {...stroke} />
  ),
  pin: (
    <>
      <path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z" {...stroke} />
      <circle cx="12" cy="10" r="2.2" {...stroke} />
    </>
  ),
  plane: (
    <path d="M3.5 16.5 21 12 3.5 7.5 6 11l6 1-6 1-2.5 3.5Z" {...stroke} />
  ),
  plus: (
    <>
      <circle cx="12" cy="12" r="8" {...stroke} />
      <path d="M12 8v8M8 12h8" {...stroke} />
    </>
  ),
  route: (
    <>
      <circle cx="7" cy="7" r="2.2" {...stroke} />
      <circle cx="17" cy="17" r="2.2" {...stroke} />
      <path d="M9 8c4 0 4 8 8 8" {...stroke} />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6" {...stroke} />
      <path d="M15.5 15.5 20 20" {...stroke} />
    </>
  ),
  signal: (
    <>
      <path d="M6 16.5v2M10 13.5v5M14 10.5v8M18 7.5v11" {...stroke} />
    </>
  ),
  spark: (
    <path d="M12 3.5 13.6 10 20 12l-6.4 2L12 20.5 10.4 14 4 12l6.4-2L12 3.5Z" {...stroke} />
  ),
  star: (
    <path d="M12 4.5 14.2 9.4 19.5 10.1 15.7 13.8 16.8 19 12 16.4 7.2 19 8.3 13.8 4.5 10.1 9.8 9.4 12 4.5Z" {...stroke} />
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="3.4" {...stroke} />
      <path d="M12 4.5v2M12 17.5v2M4.5 12h2M17.5 12h2M6.4 6.4l1.4 1.4M16.2 16.2l1.4 1.4M17.6 6.4l-1.4 1.4M7.8 16.2l-1.4 1.4" {...stroke} />
    </>
  ),
  train: (
    <>
      <path d="M7 5.5h10A2 2 0 0 1 19 7.5V16H5V7.5A2 2 0 0 1 7 5.5Z" {...stroke} />
      <path d="M5 12h14" {...stroke} />
      <path d="M8 19h.01M16 19h.01M8 16l-1.5 3M16 16l1.5 3" {...stroke} />
    </>
  ),
  translate: (
    <>
      <path d="M4.5 6.5h9M9 6.5S8 13 4.5 16" {...stroke} />
      <path d="M11.5 11.5c-1.4 2.2-3.4 3.6-5.5 4.5" {...stroke} />
      <path d="M13 13.5h6.5M15 13.5c.3 2 1.5 4.2 4.5 5.5" {...stroke} />
      <path d="M19.5 13.5c-.4 2-1.6 4.2-4.5 5.5" {...stroke} />
    </>
  ),
  walk: (
    <>
      <circle cx="13" cy="5.5" r="1.6" {...stroke} />
      <path d="M8 21l3-6 2.2 2.4L16 21" {...stroke} />
      <path d="M10.5 9.5 13 11.2 16.5 9" {...stroke} />
      <path d="M13 11.2 11 15" {...stroke} />
    </>
  ),
  wifi: (
    <>
      <path d="M5 10.2c3.8-3.6 10.2-3.6 14 0" {...stroke} />
      <path d="M7.8 13c2.3-2.1 6.1-2.1 8.4 0" {...stroke} />
      <path d="M10.4 15.6c.9-.8 2.3-.8 3.2 0" {...stroke} />
      <circle cx="12" cy="18.2" r="0.8" {...stroke} />
    </>
  ),
};

export function Icon({ name }: { name: IconName }) {
  return <Svg>{paths[name]}</Svg>;
}

const tones: Record<IconTone, string> = {
  jade: "bg-jade/10 text-jade",
  lacquer: "bg-lacquer/10 text-lacquer",
  lantern: "bg-lantern/20 text-[#8a6a22]",
  ink: "bg-mist text-ink",
};

export function IconMark({
  name,
  tone = "jade",
  size = "md",
}: {
  name: IconName;
  tone?: IconTone;
  size?: "sm" | "md";
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-2xl ${tones[tone]} ${
        size === "sm" ? "h-9 w-9" : "h-11 w-11"
      }`}
      aria-hidden
    >
      <Icon name={name} />
    </span>
  );
}

export function CardHeading({
  icon,
  kicker,
  title,
  titleAs: Title = "h2",
  kickerClass = "text-jade",
  titleClass = "font-display text-2xl leading-tight text-ink",
  tone = "jade",
}: {
  icon: IconName;
  kicker?: ReactNode;
  title: ReactNode;
  titleAs?: "h2" | "h3" | "p" | "div";
  kickerClass?: string;
  titleClass?: string;
  tone?: IconTone;
}) {
  return (
    <div className="flex items-start gap-3">
      <IconMark name={icon} tone={tone} />
      <div className="min-w-0 flex-1">
        {kicker ? (
          <p className={`text-[11px] font-bold uppercase tracking-[0.16em] ${kickerClass}`}>{kicker}</p>
        ) : null}
        <Title className={`${kicker ? "mt-1" : ""} ${titleClass}`}>{title}</Title>
      </div>
    </div>
  );
}

export function iconForApp(id: string): IconName {
  const map: Record<string, IconName> = {
    grab: "car",
    gmaps: "map",
    translate: "translate",
    whatsapp: "chat",
    zalo: "chat",
    agoda: "bed",
    booking: "bed",
    xe: "coins",
    wise: "card",
    vnair: "plane",
    vietjet: "plane",
    "12go": "train",
    airalo: "signal",
    weather: "cloud",
    "chabad-org": "building",
    siddur: "book",
  };
  return map[id] ?? "phone";
}

export function iconForSearchKind(kind: string): IconName {
  const key = kind.trim().toLowerCase();
  const map: Record<string, IconName> = {
    tool: "route",
    eat: "bowl",
    kosher: "bowl",
    community: "building",
    chabad: "building",
    help: "alert",
    stay: "bed",
    guide: "book",
    phrases: "chat",
    phrase: "chat",
    attraction: "pin",
    transport: "train",
    destination: "globe",
    neighborhood: "building",
    app: "phone",
    airport: "plane",
    itinerary: "calendar",
    kimi: "spark",
  };
  return map[key] ?? "search";
}

export function iconForMapKind(kind: MapPoiKind): IconName {
  const map: Record<MapPoiKind, IconName> = {
    attraction: "pin",
    chabad: "building",
    kosher: "bowl",
    stay: "bed",
    walk: "walk",
    city: "globe",
    neighborhood: "building",
    hospital: "plus",
    pharmacy: "plus",
    atm: "coins",
    airport: "plane",
    station: "train",
    emergency: "alert",
  };
  return map[kind] ?? "pin";
}

export function iconForTransport(mode: TransportMode | string): IconName {
  const map: Record<string, IconName> = {
    van: "bus",
    "sleeper-bus": "bus",
    train: "train",
    driver: "car",
    flight: "plane",
    boat: "boat",
    grab: "car",
  };
  return map[mode] ?? "route";
}

export function iconForPhrase(category?: PhraseCategory): IconName {
  const map: Record<PhraseCategory, IconName> = {
    basics: "chat",
    directions: "pin",
    grab: "car",
    hotel: "bed",
    shopping: "bag",
    food: "bowl",
    medical: "plus",
    family: "family",
    emergency: "alert",
    numbers: "coins",
    travel: "plane",
  };
  return category ? map[category] : "chat";
}

export function iconForHeading(heading: string): IconName {
  const text = heading.toLowerCase();
  const rules: [RegExp, IconName][] = [
    [/visa|passport|immigration|papers|official|where to check|last checked|not a pesak/, "papers"],
    [/đồng|dong|atm|cash|card|money|tip|spend|budget/, "coins"],
    [/sim|esim|data|wifi|signal|connectivity/, "signal"],
    [/whatsapp|zalo|phone|contact/, "chat"],
    [/grab|taxi|scam|driver|car seat/, "car"],
    [/train|bus|van/, "train"],
    [/flight|plane|airport/, "plane"],
    [/hotel|stay|sleep|room|neighborhood|best bases/, "bed"],
    [/shabbat|friday|candle|havdalah|eruv|yom tov|high holiday|pesach|chanukah|purim/, "flame"],
    [/kosher|food|meal|kitchen|eat|water and ice/, "bowl"],
    [/kid|family|child|stroller|supplies/, "family"],
    [/pack|bag|luggage|davening|clothing/, "bag"],
    [/weather|rain|heat|sun|storm|typhoon|mosquito/, "cloud"],
    [/map|walk|pin|near|street/, "walk"],
    [/hospital|clinic|medical|pharmacy|health/, "plus"],
    [/emergency|lost|sos|help|safety|tour/, "alert"],
    [/night/, "moon"],
    [/chabad|jewish|minyan|siddur/, "book"],
    [/arrival|on arrival|to the city/, "pin"],
    [/how long|clock|time/, "clock"],
    [/why visit|first time/, "star"],
  ];
  for (const [pattern, name] of rules) {
    if (pattern.test(text)) return name;
  }
  return "book";
}

export function iconForGuideKicker(kicker: string): IconName {
  const text = kicker.toLowerCase();
  if (text.includes("phone")) return "phone";
  if (text.includes("prep")) return "checklist";
  if (text.includes("arrival")) return "plane";
  if (text.includes("language")) return "translate";
  if (text.includes("family")) return "family";
  if (text.includes("jewish")) return "flame";
  if (text.includes("basics")) return "book";
  return "book";
}

export function iconForSavedKind(kind: string): IconName {
  return iconForSearchKind(kind);
}
