import Link from "next/link";
import { Checklist } from "@/app/guides/before/checklist";
import { Card, PageIntro } from "@/components/ui/bits";
import { getAirportGuides, getChecklist } from "@/lib/content";

export const metadata = { title: "Before you go" };

export default function BeforeYouGoPage() {
  return (
    <main className="pb-8">
      <PageIntro kicker="Prep" title="Before you go.">
        Papers, phone, packed food, and Friday city — do this at home, not at HAN immigration.
      </PageIntro>
      <div className="mt-4 flex flex-wrap gap-2 px-4">
        <Link href="/guides/apps" className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-jade">
          Apps
        </Link>
        <Link href="/phrases" className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-jade">
          Phrases
        </Link>
        <Link href="/packing" className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-jade">
          Packing
        </Link>
        {getAirportGuides().map((item) => (
          <Link
            key={item.code}
            href={`/guides/airports/${item.code.toLowerCase()}`}
            className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-jade"
          >
            {item.code}
          </Link>
        ))}
      </div>
      <div className="mt-5 px-4">
        <Card className="mb-4">
          <p className="text-sm leading-relaxed text-stone">
            Orah is not a visa table, a clinic, or a rav. Check official government pages and your own posek for
            anything that matters on Friday.
          </p>
        </Card>
        <Checklist items={getChecklist()} />
      </div>
    </main>
  );
}
