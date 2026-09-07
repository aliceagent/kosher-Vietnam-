import { airportGuides } from "@/content/airports";
import { apps } from "@/content/apps";
import { attractions } from "@/content/attractions";
import { communities } from "@/content/communities";
import { destinations } from "@/content/destinations";
import { guides } from "@/content/guides";
import { itineraries } from "@/content/itineraries";
import { neighborhoods } from "@/content/neighborhoods";
import { phrases } from "@/content/phrases";
import { routes } from "@/content/routes";
import { venues } from "@/content/venues";

export type SearchHit = {
  href: string;
  title: string;
  kind: string;
  blurb: string;
  group: string;
  score?: number;
};

const extras: SearchHit[] = [
  { href: "/plan", title: "Plan around Shabbat", kind: "Tool", blurb: "Build a route that parks you in a Jewish city every Friday.", group: "Tools" },
  { href: "/plan#friday", title: "Friday arrival planner", kind: "Tool", blurb: "Can I make it from the airport before candle lighting?", group: "Tools" },
  { href: "/today", title: "What should we do today?", kind: "Tool", blurb: "Time, weather, kids, city.", group: "Tools" },
  { href: "/shabbat", title: "Shabbat times", kind: "Tool", blurb: "Candles, sunset, tzeit, havdalah.", group: "Tools" },
  { href: "/kosher", title: "Kosher food", kind: "Eat", blurb: "Community kitchens in Hanoi, Hội An, and Saigon.", group: "Jewish" },
  { href: "/chabad", title: "Chabad in Vietnam", kind: "Community", blurb: "Hanoi, Ho Chi Minh City, Hội An, and Sapa.", group: "Jewish" },
  { href: "/emergency", title: "Emergency numbers", kind: "Help", blurb: "113 / 114 / 115 and Friday help.", group: "Guides" },
  { href: "/stay", title: "Where to stay", kind: "Stay", blurb: "Neighborhoods near Chabad — not hotel star ratings.", group: "Guides" },
  { href: "/guides/before", title: "Before you go", kind: "Guide", blurb: "Checklist, packing, visas, apps.", group: "Guides" },
  { href: "/guides/apps", title: "Apps for Vietnam", kind: "Guide", blurb: "Grab, Maps, Translate, WhatsApp.", group: "Guides" },
  { href: "/phrases", title: "Vietnamese phrases", kind: "Phrases", blurb: "Show the driver. Copy. Food warning.", group: "Phrases" },
  { href: "/vietnam/things-to-do", title: "Things to do", kind: "Attraction", blurb: "Filter by kids, rain, Shabbat walk.", group: "Attractions" },
  { href: "/map", title: "Map & Near me", kind: "Tool", blurb: "Shabbat walking mode and nearby pins.", group: "Tools" },
  { href: "/guides/airports", title: "Airport arrivals", kind: "Guide", blurb: "HAN, SGN, DAD — Grab, immigration, Friday buffers.", group: "Guides" },
  { href: "/vietnam/go", title: "City to city", kind: "Transport", blurb: "Spine pairs with Friday notes.", group: "Transport" },
];

const SYNONYMS: Record<string, string[]> = {
  saigon: ["hcmc", "ho chi minh", "hochiminh"],
  hcmc: ["saigon", "ho chi minh"],
  hochiminh: ["saigon", "hcmc", "ho chi minh"],
  shabbos: ["shabbat"],
  shomer: ["shabbat"],
  kids: ["children", "family", "child"],
  children: ["kids", "family"],
  bathroom: ["toilet", "nha ve sinh"],
  toilet: ["bathroom", "nha ve sinh"],
  rain: ["rainy", "indoor"],
  rainy: ["rain", "indoor"],
  kosher: ["kashrut", "chabad", "meals"],
  kashrut: ["kosher"],
  grab: ["taxi", "ride"],
  sapa: ["sa pa"],
  hue: ["hue"],
  danang: ["da nang"],
};

function fold(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/đ/gi, "d")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokensOf(query: string) {
  const folded = fold(
    query
      .replace(/saigon|hcmc/gi, "ho chi minh")
      .replace(/shabbos/gi, "shabbat"),
  );
  const stop = new Set(["to", "the", "and", "for", "in", "of", "on", "at"]);
  const base = folded.split(" ").filter((part) => part.length > 1 && !stop.has(part));
  const extra: string[] = [];
  for (const part of base) {
    extra.push(...(SYNONYMS[part] ?? []).map(fold));
  }
  return [...new Set([...base, ...extra])];
}

function scoreText(title: string, blob: string, tokens: string[]) {
  const t = fold(title);
  const b = fold(`${title} ${blob}`);
  if (!tokens.length) return 1;
  let score = 0;
  let hits = 0;
  for (const token of tokens) {
    if (!token) continue;
    if (t === token) {
      score += 24;
      hits += 1;
    } else if (t.includes(token)) {
      score += 14;
      hits += 1;
    } else if (b.includes(token)) {
      score += 5;
      hits += 1;
    }
  }
  const core = tokens.filter((token) => !Object.values(SYNONYMS).flat().map(fold).includes(token));
  const needed = core.length ? core : tokens;
  const coreHits = needed.filter((token) => b.includes(token)).length;
  if (needed.length > 1 && coreHits === needed.length) score += 10;
  if (hits === 0) return 0;
  return score;
}

function push(hits: SearchHit[], item: SearchHit, tokens: string[]) {
  const score = scoreText(item.title, item.blurb, tokens);
  if (score <= 0) return;
  hits.push({ ...item, score });
}

export function searchSite(query: string): SearchHit[] {
  const raw = query.trim();
  if (raw.length < 2) return extras.slice(0, 8).map((item) => ({ ...item, score: 1 }));

  const tokens = tokensOf(raw);
  const hits: SearchHit[] = [];
  const folded = fold(raw);

  const toMatch = folded.match(/^(.+?)\s+to\s+(.+)$/);
  if (toMatch || folded.includes(" to ")) {
    for (const item of routes) {
      const blob = `${item.fromSlug} ${item.toSlug} ${item.id} ${item.recommendation.friday}`.replace(/-/g, " ");
      const score = scoreText(`${item.fromSlug} ${item.toSlug}`, blob, tokens) + (blob.includes(folded.replace(" to ", " ")) ? 12 : 0);
      if (score > 0) {
        hits.push({
          href: `/vietnam/go/${item.fromSlug}/${item.toSlug}`,
          title: `${titleCase(item.fromSlug)} → ${titleCase(item.toSlug)}`,
          kind: "Transport",
          blurb: item.recommendation.friday,
          group: "Transport",
          score,
        });
      }
    }
  }

  for (const item of extras) {
    push(hits, item, tokens);
  }

  for (const item of destinations) {
    push(
      hits,
      {
        href: `/vietnam/${item.slug}`,
        title: item.name,
        kind: "Destination",
        blurb: item.summary,
        group: "Destinations",
      },
      tokens,
    );
  }

  for (const item of communities) {
    push(
      hits,
      {
        href: `/vietnam/${item.destinationSlug}#community`,
        title: item.name,
        kind: "Chabad",
        blurb: `${item.address}. ${item.meals}`,
        group: "Jewish",
      },
      tokens,
    );
  }

  for (const item of venues) {
    push(
      hits,
      {
        href: `/vietnam/${item.destinationSlug}#kosher`,
        title: item.name,
        kind: "Kosher",
        blurb: item.notes,
        group: "Jewish",
      },
      tokens,
    );
  }

  for (const item of neighborhoods) {
    push(
      hits,
      {
        href: `/vietnam/${item.destinationSlug}#neighborhoods`,
        title: item.name,
        kind: "Neighborhood",
        blurb: item.whyStay,
        group: "Guides",
      },
      tokens,
    );
  }

  for (const item of attractions) {
    const blob = [item.name, item.localName, item.description, item.whyGo, item.category, item.flags.join(" "), item.destinationSlug.replace(/-/g, " "), item.shabbatNote].join(" ");
    let score = scoreText(item.name, blob, tokens);
    if (tokens.includes("rain") && (item.rainOk || item.flags.includes("rainy-day"))) score += 8;
    if ((tokens.includes("kids") || tokens.includes("children")) && item.flags.includes("kids")) score += 8;
    if (tokens.includes("shabbat") && item.shabbat !== "not-shabbat") score += 6;
    if (score > 0) {
      hits.push({
        href: `/vietnam/${item.destinationSlug}/things-to-do#${item.id}`,
        title: item.name,
        kind: "Attraction",
        blurb: item.whyGo || item.description,
        group: "Attractions",
        score,
      });
    }
  }

  for (const item of phrases) {
    push(
      hits,
      {
        href: `/phrases#${item.id ?? item.en}`,
        title: item.en,
        kind: "Phrase",
        blurb: `${item.vi} · ${item.say}${item.caution ? ` · ${item.caution}` : ""}`,
        group: "Phrases",
      },
      tokens,
    );
  }

  for (const item of apps) {
    push(hits, { href: "/guides/apps", title: item.name, kind: "App", blurb: item.why, group: "Guides" }, tokens);
  }

  for (const item of airportGuides) {
    push(
      hits,
      {
        href: `/guides/airports/${item.code.toLowerCase()}`,
        title: item.name,
        kind: "Airport",
        blurb: item.fridayNote,
        group: "Guides",
      },
      tokens,
    );
  }

  for (const item of guides) {
    push(hits, { href: `/guides/${item.slug}`, title: item.title, kind: "Guide", blurb: item.summary, group: "Guides" }, tokens);
  }

  for (const item of itineraries) {
    push(hits, { href: `/itineraries/${item.slug}`, title: item.title, kind: "Itinerary", blurb: item.summary, group: "Guides" }, tokens);
  }

  const seen = new Set<string>();
  return hits
    .filter((item) => {
      const key = item.href + item.title;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
    .slice(0, 28);
}

export function groupHits(hits: SearchHit[]) {
  const order = ["Destinations", "Jewish", "Attractions", "Transport", "Phrases", "Guides", "Tools"];
  const map = new Map<string, SearchHit[]>();
  for (const hit of hits) {
    const list = map.get(hit.group) ?? [];
    if (list.length >= 6) continue;
    list.push(hit);
    map.set(hit.group, list);
  }
  return order.filter((key) => map.has(key)).map((key) => ({ group: key, hits: map.get(key)! }));
}

export function catalogForKimi(query: string) {
  return searchSite(query)
    .slice(0, 12)
    .map((item) => `- ${item.title} | ${item.href} | ${item.blurb.slice(0, 140)}`);
}

function titleCase(slug: string) {
  return slug
    .split("-")
    .map((word) => word[0]?.toUpperCase() + word.slice(1))
    .join(" ");
}
