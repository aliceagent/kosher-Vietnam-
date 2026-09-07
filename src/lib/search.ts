import { attractions } from "@/content/attractions";
import { communities } from "@/content/communities";
import { destinations } from "@/content/destinations";
import { guides } from "@/content/guides";
import { itineraries } from "@/content/itineraries";
import { venues } from "@/content/venues";

export type SearchHit = {
  href: string;
  title: string;
  kind: string;
  blurb: string;
};

const extras: SearchHit[] = [
  { href: "/plan", title: "Plan around Shabbat", kind: "Tool", blurb: "Build a route that parks you in a Jewish city every Friday." },
  { href: "/plan#friday", title: "Friday arrival planner", kind: "Tool", blurb: "Can I make it from the airport before candle lighting?" },
  { href: "/shabbat", title: "Shabbat times", kind: "Tool", blurb: "Candles, sunset, tzeit, havdalah." },
  { href: "/kosher", title: "Kosher food", kind: "Eat", blurb: "Community kitchens in Hanoi, Hội An, and Saigon." },
  { href: "/chabad", title: "Chabad in Vietnam", kind: "Community", blurb: "Hanoi, Ho Chi Minh City, Hội An, and Sapa." },
  { href: "/emergency", title: "Emergency numbers", kind: "Help", blurb: "113 / 114 / 115 and Friday help." },
  { href: "/stay", title: "Where to stay", kind: "Stay", blurb: "Neighborhoods near Chabad — not hotel star ratings." },
];

function haystack(parts: string[]) {
  return parts.join(" ").toLowerCase();
}

export function searchSite(query: string): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return extras.slice(0, 5);

  const synonyms = q
    .replace(/saigon|hcmc|ho chi minh/, "ho chi minh")
    .replace(/shabbos|shabbat|shomer/, "shabbat")
    .replace(/food|eat|restaurant|meal/, "kosher")
    .replace(/kids|children|child/, "family");

  const hits: SearchHit[] = [];

  for (const item of extras) {
    if (haystack([item.title, item.blurb, item.kind]).includes(synonyms) || haystack([item.title, item.blurb]).includes(q)) {
      hits.push(item);
    }
  }

  for (const item of destinations) {
    if (haystack([item.name, item.localName ?? "", item.summary, item.slug, item.jewishInfrastructure]).includes(q) || item.name.toLowerCase().includes(synonyms)) {
      hits.push({
        href: `/vietnam/${item.slug}`,
        title: item.name,
        kind: "Destination",
        blurb: item.summary,
      });
    }
  }

  for (const item of communities) {
    if (haystack([item.name, item.address, item.destinationSlug, "chabad synagogue"]).includes(q)) {
      hits.push({
        href: `/vietnam/${item.destinationSlug}#community`,
        title: item.name,
        kind: "Chabad",
        blurb: item.address,
      });
    }
  }

  for (const item of venues) {
    if (haystack([item.name, item.notes, "kosher food", item.destinationSlug]).includes(q)) {
      hits.push({
        href: `/vietnam/${item.destinationSlug}#kosher`,
        title: item.name,
        kind: "Kosher",
        blurb: item.notes,
      });
    }
  }

  for (const item of guides) {
    if (haystack([item.title, item.summary, item.slug]).includes(q)) {
      hits.push({ href: `/guides/${item.slug}`, title: item.title, kind: "Guide", blurb: item.summary });
    }
  }

  for (const item of itineraries) {
    if (haystack([item.title, item.summary, item.styles.join(" ")]).includes(q)) {
      hits.push({ href: `/itineraries/${item.slug}`, title: item.title, kind: "Itinerary", blurb: item.summary });
    }
  }

  for (const item of attractions) {
    if (haystack([item.name, item.description, item.category]).includes(q)) {
      hits.push({
        href: `/vietnam/${item.destinationSlug}#attractions`,
        title: item.name,
        kind: "Attraction",
        blurb: item.description,
      });
    }
  }

  const seen = new Set<string>();
  return hits.filter((item) => {
    if (seen.has(item.href)) return false;
    seen.add(item.href);
    return true;
  });
}
