import Link from "next/link";
import { notFound } from "next/navigation";
import { PageIntro } from "@/components/ui/bits";
import { getCountries, getDestinations } from "@/lib/content";

export function generateStaticParams() {
  return getCountries()
    .filter((item) => item.slug !== "vietnam")
    .map((item) => ({ country: item.slug }));
}

export default async function CountryPage({ params }: PageProps<"/[country]">) {
  const { country } = await params;
  const record = getCountries().find((item) => item.slug === country);
  if (!record || country === "vietnam") notFound();
  const dests = getDestinations(country);

  return (
    <main className="pb-8">
      <PageIntro kicker={record.status} title={record.name}>
        {record.summary}
      </PageIntro>
      <div className="mt-5 space-y-3 px-4">
        {dests.map((item) => (
          <Link key={item.slug} href={`/${country}/${item.slug}`} className="block overflow-hidden rounded-2xl bg-ink text-mist">
            <div className="relative h-36">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.image} alt="" className="h-full w-full object-cover opacity-70" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 to-transparent" />
              <div className="absolute bottom-3 left-3">
                <p className="font-display text-2xl">{item.name}</p>
                <p className="text-xs text-mist/75">Preview city</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
