import Link from "next/link";
import { PageIntro } from "@/components/ui/bits";
import { getDestinations } from "@/lib/content";

export const metadata = { title: "Vietnam destinations" };

export default function VietnamPage() {
  const dests = getDestinations();
  return (
    <main className="pb-8">
      <PageIntro kicker="Vietnam" title="Every city, tagged for Friday.">
        Strong Shabbat bases first. Weekday-only towns stay on the map — they just should not own Friday night.
      </PageIntro>
      <div className="mt-4 flex flex-wrap gap-2 px-4">
        <Link href="/vietnam/things-to-do" className="rounded-full bg-jade px-3 py-2 text-xs font-semibold text-mist">
          Things to do
        </Link>
        <Link href="/vietnam/go" className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-jade">
          City to city
        </Link>
        <Link href="/today" className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-jade">
          Today
        </Link>
      </div>
      <div className="mt-5 space-y-3 px-4">
        {dests.map((item) => (
          <Link key={item.slug} href={`/vietnam/${item.slug}`} className="block overflow-hidden rounded-2xl bg-ink text-mist">
            <div className="relative h-36">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.image} alt="" className="h-full w-full object-cover opacity-70" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <p className="font-display text-2xl">{item.name}</p>
                <p className="text-xs text-mist/75">
                  {item.jewishInfrastructure === "strong"
                    ? "Shabbat base"
                    : item.jewishInfrastructure === "seasonal"
                      ? "Confirm Chabad"
                      : "Weekday city"}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
