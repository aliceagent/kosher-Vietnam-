"use client";

import Link from "next/link";
import { Card, PageIntro } from "@/components/ui/bits";
import { useSaved } from "@/lib/use-local";

export default function SavedPage() {
  const items = useSaved();

  return (
    <main className="pb-8">
      <PageIntro kicker="Offline" title="Saved for weak signal.">
        Hotels, Chabad, kosher kitchens, and emergency notes stay on this phone.
      </PageIntro>
      <div className="mt-5 space-y-3 px-4">
        {items.length === 0 ? (
          <Card>
            <p className="text-sm text-stone">Nothing saved yet. Use “Save offline” on a listing.</p>
          </Card>
        ) : (
          items.map((item) => (
            <Card key={item.id}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">{item.kind}</p>
              <Link href={item.href} className="font-display text-2xl text-ink">
                {item.title}
              </Link>
              <p className="mt-1 text-sm text-stone">{item.blurb}</p>
            </Card>
          ))
        )}
      </div>
    </main>
  );
}
