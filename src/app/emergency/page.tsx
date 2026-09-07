import { Card, PageIntro } from "@/components/ui/bits";
import { fridayHelp, hospitalNotes, nationalNumbers } from "@/content/emergencies";

export const metadata = { title: "Emergency" };

export default function EmergencyPage() {
  return (
    <main className="pb-8">
      <PageIntro kicker="Help" title="Numbers first. Then Friday.">
        Save these before you lose signal. Embassy pages change — confirm yours.
      </PageIntro>
      <div className="mt-5 space-y-3 px-4">
        <div className="grid grid-cols-3 gap-2">
          {nationalNumbers.map((item) => (
            <a
              key={item.label}
              href={`tel:${item.value}`}
              className="rounded-2xl bg-lacquer px-2 py-4 text-center text-mist"
            >
              <p className="text-2xl font-semibold">{item.value}</p>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.12em]">{item.label}</p>
            </a>
          ))}
        </div>
        <Card>
          <h2 className="font-display text-2xl">{fridayHelp.title}</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-4 text-sm text-stone">
            {fridayHelp.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </Card>
        {hospitalNotes.map((item) => (
          <Card key={item.city}>
            <h2 className="font-display text-xl">{item.city}</h2>
            <p className="mt-2 text-sm text-stone">{item.body}</p>
          </Card>
        ))}
        <Card>
          <h2 className="font-display text-xl">Lost documents</h2>
          <p className="mt-2 text-sm text-stone">
            Passport: contact your embassy and file a police report. Cards: freeze in the issuer app, then
            email your insurer. Phone theft: Grab still works from a hotel desk if you have the account.
          </p>
        </Card>
      </div>
    </main>
  );
}
