import { FridayPlanner, TripPlanner } from "@/components/plan/trip-tools";
import { Card, PageIntro } from "@/components/ui/bits";
import { getDestinations } from "@/lib/content";
import { nextFriday } from "@/lib/shabbat";

export const metadata = { title: "Plan around Shabbat" };

export default function PlanPage() {
  const destinations = getDestinations();
  const start = new Date();
  const end = new Date();
  end.setDate(start.getDate() + 10);
  const iso = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

  return (
    <main className="pb-8">
      <PageIntro kicker="Signature tool" title="Plan around Shabbat.">
        Tell us the dates. We find every Friday and park you in a city that can actually host kosher meals
        and a minyan.
      </PageIntro>
      <div className="mt-5 space-y-8 px-4">
        <section>
          <h2 className="mb-3 font-display text-2xl">Trip builder</h2>
          <TripPlanner destinations={destinations} defaultStart={iso(start)} defaultEnd={iso(end)} />
        </section>
        <section id="friday">
          <h2 className="mb-3 font-display text-2xl">Can I make Friday?</h2>
          <Card className="mb-3">
            <p className="text-sm text-stone">
              Landing time plus immigration, bags, traffic, check-in, and food pickup — then compare to
              candles. Leave a serious buffer.
            </p>
          </Card>
          <FridayPlanner destinations={destinations} defaultFriday={iso(nextFriday(start))} />
        </section>
      </div>
    </main>
  );
}
