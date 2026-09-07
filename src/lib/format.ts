export function mapsUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function telUrl(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function waUrl(phone: string) {
  return `https://wa.me/${phone.replace(/[^\d]/g, "")}`;
}

export function verificationLabel(status: "sourced" | "unverified" | "needs-confirm") {
  if (status === "sourced") return "Sourced — confirm before travel";
  if (status === "needs-confirm") return "Conflicting sources — confirm";
  return "Unverified";
}

export function formatTime(date: Date, tzid: string) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: tzid,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

export function formatLongDate(date: Date, tzid = "Asia/Ho_Chi_Minh") {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: tzid,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
