import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Card, PageIntro } from "@/components/ui/bits";
import { getGuide, getGuides } from "@/lib/content";

export function generateStaticParams() {
  return getGuides().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps<"/guides/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return { title: guide.title, description: guide.summary };
}

export default async function GuidePage({ params }: PageProps<"/guides/[slug]">) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  return (
    <main className="pb-8">
      <PageIntro kicker={guide.kicker} title={guide.title}>
        {guide.summary} Last checked {guide.lastChecked}.
      </PageIntro>
      <div className="mt-5 space-y-3 px-4">
        {guide.sections.map((section) => (
          <Card key={section.heading}>
            <h2 className="font-display text-xl">{section.heading}</h2>
            <p className="mt-2 text-sm leading-relaxed text-stone">{section.body}</p>
          </Card>
        ))}
      </div>
    </main>
  );
}
