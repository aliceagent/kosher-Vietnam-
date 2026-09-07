"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "@/components/copy-button";
import { appleMapsUrl, mapsDirUrl, mapsUrl } from "@/lib/format";
import { pinsNear } from "@/lib/map-pins";
import { formatWalk } from "@/lib/geo";
import type { GeoPoint, MapPin } from "@/lib/schema";
import { useSaved } from "@/lib/use-local";
import { ShabbatMap } from "@/components/map/shabbat-map";

type Mode = "explore" | "shabbat" | "kids" | "saved" | "near";

export function MapExplorer({
  citySlug,
  cityName,
  center,
  pins,
  cities,
}: {
  citySlug: string;
  cityName: string;
  center: GeoPoint;
  pins: MapPin[];
  cities: { slug: string; name: string }[];
}) {
  const saved = useSaved();
  const [mode, setMode] = useState<Mode>("shabbat");
  const [here, setHere] = useState<GeoPoint | null>(null);
  const [geoError, setGeoError] = useState("");

  const filtered = useMemo(() => {
    if (mode === "shabbat") return pins.filter((pin) => pin.shabbatOk);
    if (mode === "kids") return pins.filter((pin) => pin.flags?.includes("kids") || pin.kind === "chabad");
    if (mode === "saved") {
      const ids = new Set(saved.map((item) => item.id));
      return pins.filter((pin) => ids.has(pin.id));
    }
    if (mode === "near" && here) return pinsNear(here, 6, citySlug);
    return pins;
  }, [mode, pins, saved, here, citySlug]);

  function nearMe() {
    if (!navigator.geolocation) {
      setGeoError("This browser will not share a location.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setHere({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setMode("near");
        setGeoError("");
      },
      () => setGeoError("Location blocked. Pins still work — pick a city chip."),
    );
  }

  return (
    <div>
      <div className="flex gap-2 overflow-x-auto px-4">
        {cities.map((city) => (
          <a
            key={city.slug}
            href={`/map?city=${city.slug}`}
            className={`shrink-0 rounded-full px-3 py-2 text-xs font-semibold ${
              city.slug === citySlug ? "bg-jade text-mist" : "bg-white text-stone"
            }`}
          >
            {city.name}
          </a>
        ))}
      </div>
      <div className="mt-3 flex gap-2 overflow-x-auto px-4">
        {(
          [
            ["explore", "Explore"],
            ["shabbat", "Shabbat"],
            ["kids", "Kids"],
            ["saved", "Saved"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setMode(id)}
            className={`shrink-0 rounded-full px-3 py-2 text-xs font-semibold ${
              mode === id ? "bg-jade text-mist" : "bg-white text-stone"
            }`}
          >
            {label}
          </button>
        ))}
        <button
          type="button"
          onClick={nearMe}
          className={`shrink-0 rounded-full px-3 py-2 text-xs font-semibold ${
            mode === "near" ? "bg-jade text-mist" : "bg-white text-stone"
          }`}
        >
          Near me
        </button>
      </div>
      {geoError ? <p className="mt-2 px-4 text-xs font-medium text-lacquer">{geoError}</p> : null}
      <div className="mt-4 px-4">
        <ShabbatMap
          pins={filtered}
          center={here && mode === "near" ? here : center}
          showModeToggle={false}
        />
        <ul className="mt-3 space-y-3">
          {filtered.map((pin) => (
            <li key={pin.id} className="rounded-2xl bg-white p-4">
              <p className="font-semibold text-ink">{pin.title}</p>
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-jade">{pin.kind}</p>
              <p className="mt-1 text-sm text-stone">{pin.blurb}</p>
              {pin.address ? <p className="mt-1 text-sm text-ink">{pin.address}</p> : null}
              {pin.addressVi ? <p className="text-xs text-stone">{pin.addressVi}</p> : null}
              <p className="mt-1 text-xs font-semibold text-jade">
                {pin.walkMins ? formatWalk(pin.walkMins) : "Pin"}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {pin.address ? <CopyButton text={pin.address} label="Copy address" /> : null}
                <a
                  href={mapsUrl(pin.address ?? `${pin.coords.lat},${pin.coords.lng}`)}
                  className="inline-flex min-h-10 items-center text-xs font-semibold text-jade"
                  target="_blank"
                  rel="noreferrer"
                >
                  Google
                </a>
                <a
                  href={appleMapsUrl(pin.address ?? `${pin.coords.lat},${pin.coords.lng}`)}
                  className="inline-flex min-h-10 items-center text-xs font-semibold text-jade"
                  target="_blank"
                  rel="noreferrer"
                >
                  Apple
                </a>
                <a
                  href={mapsDirUrl(pin.coords.lat, pin.coords.lng)}
                  className="inline-flex min-h-10 items-center text-xs font-semibold text-jade"
                  target="_blank"
                  rel="noreferrer"
                >
                  Walk
                </a>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs font-medium text-stone">
          Walking minutes are not a hetter. Confirm the alley in daylight. {cityName} pins with real coordinates
          only — we do not fake a pin on the city centroid.
        </p>
      </div>
    </div>
  );
}
