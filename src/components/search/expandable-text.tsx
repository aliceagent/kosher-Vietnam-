"use client";

import { useState } from "react";

export function ExpandableText({ text, limit = 110 }: { text: string; limit?: number }) {
  const [open, setOpen] = useState(false);
  const long = text.length > limit;
  const shown = !long || open ? text : `${text.slice(0, limit).trimEnd()}…`;

  return (
    <div>
      <p className="text-sm leading-relaxed text-stone">{shown}</p>
      {long ? (
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="mt-1 text-xs font-semibold text-jade"
        >
          {open ? "Show less" : "Read more"}
        </button>
      ) : null}
    </div>
  );
}
