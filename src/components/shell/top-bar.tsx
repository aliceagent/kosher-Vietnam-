"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DedicationBanner } from "@/components/ui/bits";

export function TopBar() {
  const pathname = usePathname();
  const home = pathname === "/";

  return (
    <header className="sticky top-0 z-30" style={{ paddingTop: "env(safe-area-inset-top)" }}>
      <div
        className={`border-b backdrop-blur-md ${
          home ? "border-transparent bg-ink/70 text-mist" : "border-jade/10 bg-fog/95 text-ink"
        }`}
      >
        <div className="mx-auto flex h-12 max-w-lg items-center justify-between px-4">
          <Link href="/" className="font-display text-xl font-semibold tracking-[0.03em]">
            Orah
          </Link>
          <div className="flex items-center gap-3 text-xs font-semibold">
            <Link href="/saved" className="min-h-10 inline-flex items-center">
              My trip
            </Link>
            <Link href="/search" className="min-h-10 min-w-10 inline-flex items-center justify-center">
              Search
            </Link>
            <Link href="/emergency" className="min-h-10 inline-flex items-center text-lacquer">
              SOS
            </Link>
          </div>
        </div>
      </div>
      <DedicationBanner />
    </header>
  );
}
