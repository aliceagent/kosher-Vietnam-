import { TodayPicker } from "@/app/today/today-picker";
import { PageIntro } from "@/components/ui/bits";
import { getAttractions, getDestinations } from "@/lib/content";

export const metadata = { title: "What should we do today?" };

export default function TodayPage() {
  const dests = getDestinations().map((item) => ({ slug: item.slug, name: item.name }));
  const attractions = getAttractions();
  return (
    <main className="pb-8">
      <PageIntro kicker="Today" title="What should we do today?">
        Time, weather, and kids — then a short list. Not an LLM itinerary.
      </PageIntro>
      <TodayPicker destinations={dests} attractions={attractions} />
    </main>
  );
}
