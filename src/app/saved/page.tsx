import { SavedTray } from "@/app/saved/saved-tray";
import { PageIntro } from "@/components/ui/bits";

export const metadata = { title: "My trip" };

export default function SavedPage() {
  return (
    <main className="pb-8">
      <PageIntro kicker="My trip" title="Saved for weak signal.">
        Grouped by city. Download a JSON bundle before you lose data. Last-synced zmanim stay on this phone.
      </PageIntro>
      <SavedTray />
    </main>
  );
}
