"use client";

import { useState } from "react";
import { Field, inputClass, PageIntro } from "@/components/ui/bits";
import { addSubmission } from "@/lib/storage";

export default function SubmitPage() {
  const [done, setDone] = useState(false);

  return (
    <main className="pb-8">
      <PageIntro kicker="Community" title="Send a correction.">
        Restaurant closed, new address, hotel now has physical keys — nothing publishes until an editor
        reviews it in Admin.
      </PageIntro>
      <form
        className="mt-5 space-y-3 px-4"
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.currentTarget);
          addSubmission({
            kind: String(data.get("kind")),
            place: String(data.get("place")),
            details: String(data.get("details")),
            email: String(data.get("email")),
          });
          e.currentTarget.reset();
          setDone(true);
        }}
      >
        <Field label="What changed">
          <select className={inputClass} name="kind" defaultValue="hours">
            <option value="hours">Hours / closed</option>
            <option value="address">Address / map pin</option>
            <option value="hotel">Hotel Shabbat detail</option>
            <option value="product">Kosher product found</option>
            <option value="other">Other</option>
          </select>
        </Field>
        <Field label="Place">
          <input className={inputClass} name="place" required placeholder="Chabad Hanoi, hotel name…" />
        </Field>
        <Field label="Details">
          <textarea className={inputClass} name="details" rows={5} required />
        </Field>
        <Field label="Your email">
          <input className={inputClass} type="email" name="email" required />
        </Field>
        <button type="submit" className="min-h-12 w-full rounded-2xl bg-lacquer text-sm font-semibold text-mist">
          Submit for review
        </button>
        {done ? (
          <p className="text-sm text-jade">
            In the queue. An editor can approve it at /admin/queue. This phone keeps the draft until a
            database is attached.
          </p>
        ) : null}
      </form>
    </main>
  );
}
