import Link from "next/link";
import { mapsUrl, telUrl, verificationLabel, waUrl } from "@/lib/format";
import type { Verification } from "@/lib/schema";

export function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">{children}</p>
  );
}

export function PageIntro({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="px-4 pt-5">
      <Kicker>{kicker}</Kicker>
      <h1 className="mt-2 font-display text-3xl font-medium leading-tight text-ink">{title}</h1>
      {children ? <div className="mt-3 text-[15px] leading-relaxed text-stone">{children}</div> : null}
    </header>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <article className={`rounded-2xl bg-white p-4 shadow-[0_1px_0_rgba(7,26,20,0.06)] ${className}`}>{children}</article>;
}

export function Trust({ item }: { item: Verification }) {
  return (
    <p className="mt-3 text-xs leading-relaxed text-muted">
      {verificationLabel(item.status)}. Last checked {item.lastChecked}
      {item.source ? ` · ${item.source}` : ""}. {item.note ?? "Contact the venue before you rely on this."}
    </p>
  );
}

export function Disclaimer() {
  return (
    <p className="text-xs leading-relaxed text-muted">
      Orah is a travel-planning resource, not a rabbinic authority. Facts (addresses, electronics, hours) are
      listed separately from decisions your rav should make.
    </p>
  );
}

export function Actions({
  phone,
  whatsapp,
  mapsQuery,
  website,
}: {
  phone?: string;
  whatsapp?: string;
  mapsQuery?: string;
  website?: string;
}) {
  const links = [
    phone ? { href: telUrl(phone), label: "Call" } : null,
    whatsapp ? { href: waUrl(whatsapp), label: "WhatsApp" } : null,
    mapsQuery ? { href: mapsUrl(mapsQuery), label: "Maps" } : null,
    website ? { href: website, label: "Site" } : null,
  ].filter(Boolean) as { href: string; label: string }[];

  if (!links.length) return null;

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target={link.href.startsWith("http") ? "_blank" : undefined}
          rel="noreferrer"
          className="inline-flex min-h-10 items-center rounded-full bg-jade px-3 text-xs font-semibold text-mist"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}

export function ChipLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-11 items-center rounded-full bg-white px-4 text-sm font-semibold text-jade shadow-[0_1px_0_rgba(7,26,20,0.06)]"
    >
      {children}
    </Link>
  );
}

export function PrimaryLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-lacquer px-4 text-sm font-semibold text-mist"
    >
      {children}
    </Link>
  );
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
        {label}
      </span>
      {children}
    </label>
  );
}

export const inputClass =
  "w-full rounded-xl border border-jade/15 bg-white px-3 py-3 text-base text-ink outline-none focus:border-lantern";
