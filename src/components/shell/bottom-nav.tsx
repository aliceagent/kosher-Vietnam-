"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/vietnam", label: "Go", icon: PinIcon },
  { href: "/kosher", label: "Eat", icon: BowlIcon },
  { href: "/shabbat", label: "Shabbat", icon: FlameIcon },
  { href: "/plan", label: "Plan", icon: RouteIcon },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-1/2 z-40 w-full max-w-lg -translate-x-1/2 border-t border-jade/15 bg-fog/95 backdrop-blur-md"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto grid max-w-lg grid-cols-5">
        {items.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex min-h-14 flex-col items-center justify-center gap-0.5 text-[11px] font-semibold ${
                  active ? "text-lacquer" : "text-muted"
                }`}
              >
                <item.icon active={active} />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 11.5 12 5l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-8.5Z"
        stroke={active ? "#9a1f2a" : "#5c736a"}
        strokeWidth="1.7"
      />
    </svg>
  );
}

function PinIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z"
        stroke={active ? "#9a1f2a" : "#5c736a"}
        strokeWidth="1.7"
      />
      <circle cx="12" cy="10" r="2.2" stroke={active ? "#9a1f2a" : "#5c736a"} strokeWidth="1.7" />
    </svg>
  );
}

function BowlIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 10h16s-1 8-8 8-8-8-8-8Z"
        stroke={active ? "#9a1f2a" : "#5c736a"}
        strokeWidth="1.7"
      />
      <path d="M8 7c.5 2 2 3 4 3s3.5-1 4-3" stroke={active ? "#9a1f2a" : "#5c736a"} strokeWidth="1.7" />
    </svg>
  );
}

function FlameIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3s2 3 2 5.2c0 1.3-.7 2.3-2 3 1.8-.1 4 1.2 4 3.8A5 5 0 0 1 7 15c0-2.8 2.4-4.2 3.4-5.8C11.4 7.6 12 5.8 12 3Z"
        stroke={active ? "#9a1f2a" : "#5c736a"}
        strokeWidth="1.7"
      />
    </svg>
  );
}

function RouteIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="2.2" stroke={active ? "#9a1f2a" : "#5c736a"} strokeWidth="1.7" />
      <circle cx="17" cy="17" r="2.2" stroke={active ? "#9a1f2a" : "#5c736a"} strokeWidth="1.7" />
      <path d="M9 8c4 0 4 8 8 8" stroke={active ? "#9a1f2a" : "#5c736a"} strokeWidth="1.7" />
    </svg>
  );
}
