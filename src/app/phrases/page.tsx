import { PhraseBook } from "@/app/phrases/phrase-book";
import { PageIntro } from "@/components/ui/bits";
import { getPhrases } from "@/lib/content";

export const metadata = { title: "Vietnamese phrases" };

export default function PhrasesPage() {
  return (
    <main className="pb-8">
      <PageIntro kicker="Language" title="Show this to the driver.">
        Copy, save, or open full-screen Vietnamese. Food phrases never make a kitchen kosher.
      </PageIntro>
      <PhraseBook phrases={getPhrases()} />
    </main>
  );
}
