import { Card, PageIntro, Trust } from "@/components/ui/bits";
import { CardHeading, iconForApp } from "@/components/ui/icons";
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
            <CardHeading
              icon={iconForApp(item.id)}
              kicker={`${item.priority} · ${item.category}`}
              title={item.name}
            />
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
                <a
                  href={item.ios}
                  className="inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-jade"
                  target="_blank"
                  rel="noreferrer"
                >
                  <StoreBadge kind="ios" />
                  iOS
                </a>
              ) : null}
              {item.android ? (
                <a
                  href={item.android}
                  className="inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-jade"
                  target="_blank"
                  rel="noreferrer"
                >
                  <StoreBadge kind="android" />
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

function StoreBadge({ kind }: { kind: "ios" | "android" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden className="stroke-current">
      {kind === "ios" ? (
        <path
          d="M16.2 12.6c0-2.4 2-3.4 2.1-3.5-1.2-1.8-3-2-3.6-2-1.5-.2-3 .9-3.7.9s-1.9-1-3.2-.9c-1.6.1-3.1 1-3.9 2.5-1.7 2.9-.4 7.2 1.2 9.6.8 1.1 1.7 2.4 3 2.4 1.2 0 1.6-.8 3.1-.8s1.8.8 3.1.7c1.3 0 2.1-1.1 2.9-2.3.9-1.3 1.3-2.6 1.3-2.6s-2.5-1-2.5-3.9ZM14.3 5.8c.6-.8 1.1-1.9.9-3-.9.1-2 .6-2.6 1.4-.6.7-1.1 1.8-.9 2.9 1 .1 2-.5 2.6-1.3Z"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M5 6.2 14.8 12 5 17.8V6.2Zm10.2 5.2 3.3-1.9c.6-.4 1.5 0 1.5.8v3.4c0 .8-.9 1.2-1.5.8l-3.3-1.9Z"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}
