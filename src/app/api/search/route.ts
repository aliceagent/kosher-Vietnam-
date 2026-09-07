import { catalogForKimi, searchSite } from "@/lib/search";
import { kimiSearch } from "@/lib/kimi";

export const maxDuration = 30;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = url.searchParams.get("q")?.trim() ?? "";
  const live = url.searchParams.get("live") === "1";
  if (q.length < 2) {
    return Response.json({ hits: searchSite(""), kimi: { cards: [] } });
  }

  const hits = searchSite(q);
  const kimi = await kimiSearch(q, catalogForKimi(q), { live });
  return Response.json({ hits, kimi });
}
