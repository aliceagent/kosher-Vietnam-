import { Card, PageIntro, Trust } from "@/components/ui/bits";
import { getApps } from "@/lib/content";

export const metadata = { title: "Apps for Vietnam" };

export default function AppsPage() {
  const apps = getApps();
  return (
    <main className="pb-8">
      <PageIntro kicker="Phone" title="Install these before you fly.">
        Grab, maps, translate, WhatsApp. Test login on home wifi. Offline packs matter on Friday.
      </PageIntro>
      <div className="mt-5 space-y-3 px-4">
        {apps.map((item) => (
          <Card key={item.id}>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-jade">
              {item.priority} · {item.category}
            </p>
            <h2 className="mt-1 font-display text-2xl">{item.name}</h2>
            <p className="mt-2 text-sm leading-relaxed text-stone">{item.why}</p>
            <p className="mt-2 text-sm text-stone">{item.setup}</p>
            <p className="mt-1 text-sm text-stone">{item.tips}</p>
            <p className="mt-2 text-xs font-medium text-stone">
              {item.offline ? "Offline mode exists. " : "Needs data. "}
              {item.setupBefore ? "Set up at home. " : ""}
              {item.needsVnNumber ? "May want a VN number. " : ""}
              English: {item.english ? "yes" : "weak"}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {item.ios ? (
                <a href={item.ios} className="text-sm font-semibold text-jade" target="_blank" rel="noreferrer">
                  iOS
                </a>
              ) : null}
              {item.android ? (
                <a href={item.android} className="text-sm font-semibold text-jade" target="_blank" rel="noreferrer">
                  Android
                </a>
              ) : null}
            </div>
            <Trust item={item.verification} />
          </Card>
        ))}
      </div>
    </main>
  );
}
