import Link from "next/link";
import { Card, PageIntro, Trust } from "@/components/ui/bits";
import { getDestination, getRouteBetween, getRoutes } from "@/lib/content";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return getRoutes().map((item) => ({ from: item.fromSlug, to: item.toSlug }));
}

export async function generateMetadata({ params }: PageProps<"/vietnam/go/[from]/[to]">) {
  const { from, to } = await params;
  const a = getDestination(from);
  const b = getDestination(to);
  return { title: a && b ? `${a.name} to ${b.name}` : "Getting around" };
}

export default async function RoutePage({ params }: PageProps<"/vietnam/go/[from]/[to]">) {
  const { from, to } = await params;
  const route = getRouteBetween(from, to);
  const origin = getDestination(from);
  const dest = getDestination(to);
  if (!route || !origin || !dest) notFound();

  return (
    <main className="pb-8">
      <PageIntro kicker="Transport" title={`${origin.name} → ${dest.name}`}>
        Point-to-point options with Friday notes. Times and dong bands change — confirm in the booking app.
      </PageIntro>
      <div className="mt-3 flex flex-wrap gap-2 px-4">
        <Link href={`/vietnam/${origin.slug}`} className="text-sm font-semibold text-jade">
          {origin.name}
        </Link>
        <span className="text-stone">·</span>
        <Link href={`/vietnam/${dest.slug}`} className="text-sm font-semibold text-jade">
          {dest.name}
        </Link>
      </div>
      <div className="mt-5 space-y-3 px-4">
        <Card>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-jade">If you have kids</p>
          <p className="mt-2 text-sm leading-relaxed text-stone">{route.recommendation.family}</p>
          <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.16em] text-jade">Backpacker</p>
          <p className="mt-2 text-sm leading-relaxed text-stone">{route.recommendation.backpacker}</p>
          <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.16em] text-jade">Overnight</p>
          <p className="mt-2 text-sm leading-relaxed text-stone">{route.recommendation.overnight}</p>
          <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.16em] text-lacquer">Friday</p>
          <p className="mt-2 text-sm leading-relaxed text-stone">{route.recommendation.friday}</p>
          <Trust item={route.verification} />
        </Card>
        {route.options.map((opt) => (
          <Card key={opt.name}>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-jade">{opt.mode.replace("-", " ")}</p>
            <h2 className="mt-1 font-display text-2xl">{opt.name}</h2>
            <p className="mt-2 text-sm font-medium text-stone">
              {Math.round(opt.durationMin / 60)}–{Math.round(opt.durationMax / 60)} h · {opt.cost}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-stone">{opt.comfort}</p>
            <p className="mt-1 text-sm text-stone">Kids: {opt.kids}</p>
            <p className="mt-1 text-sm text-stone">Luggage: {opt.luggage}</p>
            <p className="mt-1 text-sm text-stone">Motion: {opt.motion}</p>
            <p className="mt-1 text-sm text-stone">
              Pickup {opt.pickup} · Drop {opt.dropoff}
            </p>
            <p className="mt-1 text-sm text-stone">Book: {opt.book}</p>
            {opt.overnight ? <p className="mt-1 text-sm font-semibold text-ink">Overnight option</p> : null}
            <p className="mt-2 text-sm leading-relaxed text-lacquer">{opt.fridayNote}</p>
          </Card>
        ))}
      </div>
    </main>
  );
}
