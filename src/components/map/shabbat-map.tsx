"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useId, useState } from "react";
import type { MapPin } from "@/lib/map-pins";
import { formatWalk } from "@/lib/geo";

const colors: Record<MapPin["kind"], string> = {
  chabad: "#9a1f2a",
  kosher: "#0f3d32",
  stay: "#d4a84b",
  walk: "#2a3f38",
  city: "#071a14",
};

export function ShabbatMap({
  pins,
  center,
}: {
  pins: MapPin[];
  center: { lat: number; lng: number };
}) {
  const id = useId().replace(/:/g, "");
  const [mode, setMode] = useState<"all" | "shabbat">("shabbat");
  const visible = mode === "shabbat" ? pins.filter((pin) => pin.shabbatOk) : pins;
  const pinKey = visible.map((pin) => pin.id).join(",");

  useEffect(() => {
    let map: import("leaflet").Map | undefined;
    let cancelled = false;

    async function draw() {
      const L = await import("leaflet");
      if (cancelled) return;
      const el = document.getElementById(`map-${id}`);
      if (!el) return;
      el.innerHTML = "";
      map = L.map(el, { zoomControl: true, scrollWheelZoom: false }).setView([center.lat, center.lng], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap",
      }).addTo(map);

      for (const pin of visible) {
        const icon = L.divIcon({
          className: "",
          html: `<div style="width:14px;height:14px;border-radius:99px;background:${colors[pin.kind]};border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.35)"></div>`,
          iconSize: [14, 14],
          iconAnchor: [7, 7],
        });
        const walk = pin.walkMins ? `<br/>${formatWalk(pin.walkMins)}` : "";
        L.marker([pin.coords.lat, pin.coords.lng], { icon })
          .addTo(map)
          .bindPopup(`<strong>${pin.title}</strong><br/>${pin.blurb}${walk}`);
      }
    }

    void draw();
    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [center.lat, center.lng, id, pinKey, mode, visible]);

  return (
    <div>
      <div className="mb-3 flex gap-2">
        <button
          type="button"
          onClick={() => setMode("shabbat")}
          className={`min-h-10 rounded-full px-3 text-xs font-semibold ${mode === "shabbat" ? "bg-jade text-mist" : "bg-white text-stone"}`}
        >
          Shabbat walking mode
        </button>
        <button
          type="button"
          onClick={() => setMode("all")}
          className={`min-h-10 rounded-full px-3 text-xs font-semibold ${mode === "all" ? "bg-jade text-mist" : "bg-white text-stone"}`}
        >
          All pins
        </button>
      </div>
      <div id={`map-${id}`} className="h-64 w-full overflow-hidden rounded-2xl bg-mist" />
      <ul className="mt-3 space-y-2">
        {visible.map((pin) => (
          <li key={pin.id} className="flex items-start justify-between gap-3 text-sm">
            <span>
              <span className="font-semibold text-ink">{pin.title}</span>
              <span className="block text-xs text-muted">{pin.kind}</span>
            </span>
            <span className="shrink-0 text-xs font-semibold text-jade">
              {pin.walkMins ? formatWalk(pin.walkMins) : "Pin"}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-muted">
        Walking minutes assume 4.5 km/h from the Chabad pin. Confirm the address before Shabbat. Pins are
        approximate.
      </p>
    </div>
  );
}
