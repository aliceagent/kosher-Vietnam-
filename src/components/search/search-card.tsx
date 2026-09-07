"use client";

import Link from "next/link";
import { useState } from "react";

const LIMIT = 108;

export function SearchCard({
  kicker,
  kickerClass = "text-jade",
  title,
  href,
  external,
  blurb,
}: {
  kicker: string;
  kickerClass?: string;
  title: string;
  href?: string;
  external?: boolean;
  blurb: string;
}) {
  const [open, setOpen] = useState(false);
  const long = blurb.trim().length > LIMIT;
  const headingClass = "mt-1 block font-display text-[1.35rem] leading-tight text-ink";

  const heading = href ? (
    external ? (
      <a href={href} target="_blank" rel="noreferrer" className={headingClass}>
        {title}
      </a>
    ) : (
      <Link href={href} className={headingClass}>
        {title}
      </Link>
    )
  ) : (
    <h3 className={headingClass}>{title}</h3>
  );

  return (
    <article
      className={`rounded-2xl bg-white p-4 text-ink shadow-[0_1px_0_rgba(7,26,20,0.08)] transition-[box-shadow,transform] duration-200 ${
        open ? "ring-1 ring-jade/15 shadow-[0_10px_28px_rgba(7,26,20,0.08)]" : ""
      }`}
    >
      <p className={`text-[11px] font-bold uppercase tracking-[0.16em] ${kickerClass}`}>{kicker}</p>
      {heading}
      <p
        className={`mt-2 text-sm leading-relaxed text-stone ${
          open || !long ? "" : "line-clamp-2"
        }`}
      >
        {blurb}
      </p>
      {long ? (
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="mt-2 text-xs font-semibold text-jade"
        >
          {open ? "Show less" : "Read more"}
        </button>
      ) : null}
    </article>
  );
}
