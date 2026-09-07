"use client";

import { Card, PageIntro } from "@/components/ui/bits";
import { CardHeading } from "@/components/ui/icons";
import { setSubmissionStatus } from "@/lib/storage";
import { notifyStorage, useSubmissions } from "@/lib/use-local";

export default function QueuePage() {
  const rows = useSubmissions();

  return (
    <main className="pb-8">
      <PageIntro kicker="Moderation" title="Traveler updates.">
        Nothing publishes until you approve it. This queue is on-device until a database is attached.
      </PageIntro>
      <div className="mt-5 space-y-3 px-4">
        {rows.length === 0 ? (
          <Card>
            <CardHeading icon="checklist" title="Queue is empty" titleClass="font-display text-xl leading-tight text-ink" />
            <p className="mt-2 text-sm text-stone">Queue is empty. Submit a correction from /submit to see it here.</p>
          </Card>
        ) : (
          rows.map((row) => (
            <Card key={row.id}>
              <CardHeading
                icon="chat"
                kicker={row.status}
                title={row.place}
                titleClass="font-display text-xl leading-tight text-ink"
                kickerClass="text-lacquer"
              />
              <p className="text-xs text-muted">
                {row.kind} · {row.email}
              </p>
              <p className="mt-2 text-sm text-stone">{row.details}</p>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  className="min-h-10 rounded-full bg-jade px-3 text-xs font-semibold text-mist"
                  onClick={() => {
                    setSubmissionStatus(row.id, "approved");
                    notifyStorage();
                  }}
                >
                  Approve
                </button>
                <button
                  type="button"
                  className="min-h-10 rounded-full bg-white px-3 text-xs font-semibold text-lacquer"
                  onClick={() => {
                    setSubmissionStatus(row.id, "rejected");
                    notifyStorage();
                  }}
                >
                  Reject
                </button>
              </div>
            </Card>
          ))
        )}
      </div>
    </main>
  );
}
