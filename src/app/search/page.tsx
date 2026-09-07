import { PageIntro } from "@/components/ui/bits";
import { SearchResults } from "@/app/search/search-results";

export const metadata = { title: "Search" };

export default async function SearchPage({ searchParams }: PageProps<"/search">) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q : "";
  return (
    <main className="pb-8">
      <PageIntro kicker="Search" title="Ask it the way you would ask a friend.">
        Orah answers instantly. Kimi HighSpeed adds live notes. Cards stay short — tap Read more.
      </PageIntro>
      <SearchResults initial={q} />
    </main>
  );
}
