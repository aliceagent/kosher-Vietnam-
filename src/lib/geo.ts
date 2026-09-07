import type { GeoPoint } from "@/lib/schema";

export function walkingMinutes(from: GeoPoint, to: GeoPoint) {
  const km = haversineKm(from, to);
  return Math.max(1, Math.round((km / 4.5) * 60));
}

export function haversineKm(a: GeoPoint, b: GeoPoint) {
  const R = 6371;
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

function rad(n: number) {
  return (n * Math.PI) / 180;
}

export function formatWalk(mins: number) {
  if (mins < 60) return `${mins} min walk`;
  const h = Math.floor(mins / 60);
  return `${h}h ${mins % 60}m walk`;
}
