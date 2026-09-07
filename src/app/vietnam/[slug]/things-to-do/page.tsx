import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AttractionFilterList } from "@/components/things/attraction-filter-list";
import { PageIntro } from "@/components/ui/bits";
import { getAttractions, getDestination, getDestinations } from "@/lib/content";
import type { AttractionFlag } from "@/lib/schema";

export function generateStaticParams() {
  return getDestinations().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/vietnam/[slug]/things-to-do">): Promise<Metadata> {
  const { slug } = await params;
  const dest = getDestination(slug);
  return { title: dest ? `Things to do in ${dest.name}` : "Things to do" };
}

export default async function CityThingsPage({
  params,
  searchParams,
}: PageProps<"/vietnam/[slug]/things-to-do">) {
  const { slug } = await params;
  const query = await searchParams;
  const dest = getDestination(slug);
  if (!dest || dest.countrySlug !== "vietnam") notFound();
  const items = getAttractions(dest.slug);
  const interest = typeof query.interest === "string" ? query.interest : "all";
  const flag = (interestFiltersSafe.includes(interest) ? interest : "all") as AttractionFlag | "all";

  return (
    <main className="pb-8">
      <PageIntro kicker={dest.name} title={`Things to do in ${dest.name}.`}>
        Filter by kids, rain, Shabbat walking, and day trips. Vegetarian street food is not on this list.
      </PageIntro>
      <div className="mt-3 px-4">
        <Link href={`/vietnam/${dest.slug}`} className="text-sm font-semibold text-jade">
          ← City dashboard
        </Link>
      </div>
      <div className="mt-4 px-4">
        <AttractionFilterList items={items} initialFlag={flag} />
      </div>
    </main>
  );
}

const interestFiltersSafe = [
  "all",
  "must-do",
  "kids",
  "teens",
  "rainy-day",
  "free",
  "evening",
  "half-day",
  "day-trip",
  "shabbat-walk",
];
