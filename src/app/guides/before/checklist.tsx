"use client";

import { toggleCheck } from "@/lib/storage";
import { notifyStorage, useChecks } from "@/lib/use-local";
import { CardHeading, iconForHeading } from "@/components/ui/icons";
import type { ChecklistItem } from "@/lib/schema";

export function Checklist({ items }: { items: ChecklistItem[] }) {
  const done = useChecks();
  const sections = [...new Set(items.map((item) => item.section))];

  return (
    <div className="space-y-5">
      {sections.map((section) => (
        <section key={section}>
          <CardHeading icon={iconForHeading(section)} title={section} />
          <ul className="mt-3 space-y-2">
            {items
              .filter((item) => item.section === section)
              .map((item) => {
                const on = done.includes(item.id);
                return (
                  <li key={item.id}>
                    <label className="flex gap-3 rounded-2xl bg-white p-4">
                      <input
                        type="checkbox"
                        className="mt-1"
                        checked={on}
                        onChange={() => {
                          toggleCheck(item.id);
                          notifyStorage();
                        }}
                      />
                      <span>
                        <span className="block font-semibold text-ink">
                          {item.title}
                          {item.essential ? <span className="ml-2 text-[10px] uppercase tracking-[0.14em] text-lacquer">Need</span> : null}
                        </span>
                        <span className="mt-1 block text-sm leading-relaxed text-stone">{item.body}</span>
                      </span>
                    </label>
                  </li>
                );
              })}
          </ul>
        </section>
      ))}
    </div>
  );
}
