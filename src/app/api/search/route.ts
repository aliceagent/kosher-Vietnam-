import { catalogForKimi, searchSite } from "@/lib/search";
import { kimiSearch } from "@/lib/kimi";

export const maxDuration = 30;

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams.get("q")?.trim() ?? "";
  if (q.length < 2) {
    return Response.json({ hits: searchSite(""), kimi: { cards: [] } });
  }

  const hits = searchSite(q);
  const kimi = await kimiSearch(q, catalogForKimi(q));
  return Response.json({ hits, kimi });
}
