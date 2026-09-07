"use client";

import { useState } from "react";
import { Field, inputClass, PageIntro } from "@/components/ui/bits";

export default function SubmitPage() {
  const [done, setDone] = useState(false);

  return (
    <main className="pb-8">
      <PageIntro kicker="Community" title="Send a correction.">
        Restaurant closed, new address, hotel now has physical keys — we will not publish until someone
        reviews it.
      </PageIntro>
      <form
        className="mt-5 space-y-3 px-4"
        onSubmit={(e) => {
          e.preventDefault();
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
            Saved locally for this demo. A live CMS would hold this for moderation.
          </p>
        ) : null}
      </form>
    </main>
  );
}
