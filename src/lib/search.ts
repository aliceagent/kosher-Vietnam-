import { airportGuides } from "@/content/airports";
import { apps } from "@/content/apps";
import { attractions } from "@/content/attractions";
import { communities } from "@/content/communities";
import { destinations } from "@/content/destinations";
import { guides } from "@/content/guides";
import { itineraries } from "@/content/itineraries";
import { phrases } from "@/content/phrases";
import { routes } from "@/content/routes";
import { venues } from "@/content/venues";

export type SearchHit = {
  href: string;
  title: string;
  kind: string;
  blurb: string;
  group: string;
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
];

function haystack(parts: string[]) {
  return parts.join(" ").toLowerCase();
}

function normalize(q: string) {
  return q
    .trim()
    .toLowerCase()
    .replace(/saigon|hcmc/, "ho chi minh")
    .replace(/shabbos|shomer/, "shabbat")
    .replace(/kids|children|child/, "family kids")
    .replace(/rainy|raining/, "rain")
    .replace(/bathroom|toilet/, "nhà vệ sinh bathroom");
}

export function searchSite(query: string): SearchHit[] {
  const raw = query.trim().toLowerCase();
  if (raw.length < 2) return extras.slice(0, 8);

  const q = normalize(raw);
  const hits: SearchHit[] = [];

  const toRoute = q.match(/(.+)\s+to\s+(.+)/);
  if (toRoute || q.includes("hanoi to") || q.includes("to sapa")) {
    for (const item of routes) {
      const blob = `${item.fromSlug} ${item.toSlug} ${item.id}`.replace(/-/g, " ");
      if (haystack([blob, q]).includes(q.split(" to ")[0] ?? "") || blob.includes(q.replace(" to ", " "))) {
        hits.push({
          href: `/vietnam/go/${item.fromSlug}/${item.toSlug}`,
          title: `${titleCase(item.fromSlug)} → ${titleCase(item.toSlug)}`,
          kind: "Transport",
          blurb: item.recommendation.friday,
          group: "Transport",
        });
      }
    }
  }

  for (const item of extras) {
    if (haystack([item.title, item.blurb, item.kind]).includes(q) || haystack([item.title, item.blurb]).includes(raw)) {
      hits.push(item);
    }
  }

  for (const item of destinations) {
    if (haystack([item.name, item.localName ?? "", item.summary, item.slug, item.jewishInfrastructure]).includes(raw) || item.name.toLowerCase().includes(q)) {
      hits.push({
        href: `/vietnam/${item.slug}`,
        title: item.name,
        kind: "Destination",
        blurb: item.summary,
        group: "Destinations",
      });
    }
  }

  for (const item of communities) {
    if (haystack([item.name, item.address, item.destinationSlug, "chabad synagogue"]).includes(raw)) {
      hits.push({
        href: `/vietnam/${item.destinationSlug}#community`,
        title: item.name,
        kind: "Chabad",
        blurb: item.address,
        group: "Jewish",
      });
    }
  }

  for (const item of venues) {
    if (haystack([item.name, item.notes, "kosher food", item.destinationSlug]).includes(raw)) {
      hits.push({
        href: `/vietnam/${item.destinationSlug}#kosher`,
        title: item.name,
        kind: "Kosher",
        blurb: item.notes,
        group: "Jewish",
      });
    }
  }

  for (const item of attractions) {
    const blob = haystack([item.name, item.description, item.whyGo, item.category, item.flags.join(" "), item.destinationSlug.replace(/-/g, " ")]);
    if (blob.includes(raw) || (q.includes("rain") && (item.rainOk || item.flags.includes("rainy-day"))) || (q.includes("kids") && item.flags.includes("kids"))) {
      hits.push({
        href: `/vietnam/${item.destinationSlug}/things-to-do#${item.id}`,
        title: item.name,
        kind: "Attraction",
        blurb: item.whyGo,
        group: "Attractions",
      });
    }
  }

  for (const item of phrases) {
    if (haystack([item.en, item.vi, item.say, item.category ?? ""]).includes(raw)) {
      hits.push({
        href: `/phrases#${item.id ?? item.en}`,
        title: item.en,
        kind: "Phrase",
        blurb: `${item.vi} · ${item.say}`,
        group: "Phrases",
      });
    }
  }

  for (const item of apps) {
    if (haystack([item.name, item.why, item.category]).includes(raw)) {
      hits.push({ href: "/guides/apps", title: item.name, kind: "App", blurb: item.why, group: "Guides" });
    }
  }

  for (const item of airportGuides) {
    if (haystack([item.code, item.name, item.destSlug, "airport arrival"]).includes(raw)) {
      hits.push({ href: `/guides/airports/${item.code.toLowerCase()}`, title: item.name, kind: "Airport", blurb: item.fridayNote, group: "Guides" });
    }
  }

  for (const item of guides) {
    if (haystack([item.title, item.summary, item.slug]).includes(q) || haystack([item.title, item.summary]).includes(raw)) {
      hits.push({ href: `/guides/${item.slug}`, title: item.title, kind: "Guide", blurb: item.summary, group: "Guides" });
    }
  }

  for (const item of itineraries) {
    if (haystack([item.title, item.summary, item.styles.join(" ")]).includes(raw)) {
      hits.push({ href: `/itineraries/${item.slug}`, title: item.title, kind: "Itinerary", blurb: item.summary, group: "Guides" });
    }
  }

  const seen = new Set<string>();
  return hits.filter((item) => {
    if (seen.has(item.href)) return false;
    seen.add(item.href);
    return true;
  });
}

export function groupHits(hits: SearchHit[]) {
  const order = ["Destinations", "Attractions", "Jewish", "Transport", "Phrases", "Guides", "Tools"];
  const map = new Map<string, SearchHit[]>();
  for (const hit of hits) {
    const list = map.get(hit.group) ?? [];
    list.push(hit);
    map.set(hit.group, list);
  }
  return order.filter((key) => map.has(key)).map((key) => ({ group: key, hits: map.get(key)! }));
}

function titleCase(slug: string) {
  return slug.split("-").map((w) => w[0]?.toUpperCase() + w.slice(1)).join(" ");
}
