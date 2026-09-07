import { PageIntro } from "@/components/ui/bits";
import { StayList } from "@/app/stay/stay-list";
import { getStayAreas } from "@/lib/content";

export const metadata = { title: "Where to stay for Shabbat" };

export default function StayPage() {
  return (
    <main className="pb-8">
      <PageIntro kicker="Stay" title="Neighborhoods, not star ratings.">
        Filter by walking radius, family fit, or a fridge. We do not invent electronic-key facts.
      </PageIntro>
      <div className="mt-5">
        <StayList areas={getStayAreas()} />
      </div>
    </main>
  );
}
