"use client";

import { useMemo, useState } from "react";
import { Card, Field, inputClass } from "@/components/ui/bits";
import { airports, estimateFriday } from "@/lib/friday";
import { buildPlan } from "@/lib/planner";
import type { Destination } from "@/lib/schema";
import { formatLongDate, formatTime } from "@/lib/format";

export function TripPlanner({
  destinations,
  defaultStart,
  defaultEnd,
}: {
  destinations: Destination[];
  defaultStart: string;
  defaultEnd: string;
}) {
  const [form, setForm] = useState({
    start: defaultStart,
    end: defaultEnd,
    adults: 2,
    children: 2,
    arrivalAirport: "HAN",
    departAirport: "SGN",
    kosher: true,
    shomer: true,
    destinations: ["hanoi", "ninh-binh", "hoi-an"],
    pace: "standard" as const,
  });

  const plan = useMemo(() => buildPlan(form), [form]);

  function toggleDest(slug: string) {
    setForm((prev) => ({
      ...prev,
      destinations: prev.destinations.includes(slug)
        ? prev.destinations.filter((item) => item !== slug)
        : [...prev.destinations, slug],
    }));
  }

  return (
    <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Arrive">
          <input
            type="date"
            className={inputClass}
            value={form.start}
            onChange={(e) => setForm({ ...form, start: e.target.value })}
          />
        </Field>
        <Field label="Depart">
          <input
            type="date"
            className={inputClass}
            value={form.end}
            onChange={(e) => setForm({ ...form, end: e.target.value })}
          />
        </Field>
        <Field label="Adults">
          <input
            type="number"
            min={1}
            className={inputClass}
            value={form.adults}
            onChange={(e) => setForm({ ...form, adults: Number(e.target.value) })}
          />
        </Field>
        <Field label="Children">
          <input
            type="number"
            min={0}
            className={inputClass}
            value={form.children}
            onChange={(e) => setForm({ ...form, children: Number(e.target.value) })}
          />
        </Field>
        <Field label="In via">
          <select
            className={inputClass}
            value={form.arrivalAirport}
            onChange={(e) => setForm({ ...form, arrivalAirport: e.target.value })}
          >
            {airports.map((item) => (
              <option key={item.code} value={item.code}>
                {item.code}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Out via">
          <select
            className={inputClass}
            value={form.departAirport}
            onChange={(e) => setForm({ ...form, departAirport: e.target.value })}
          >
            {airports.map((item) => (
              <option key={item.code} value={item.code}>
                {item.code}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <label className="flex min-h-11 items-center gap-2 text-sm text-stone">
        <input
          type="checkbox"
          checked={form.shomer}
          onChange={(e) => setForm({ ...form, shomer: e.target.checked })}
        />
        Shomer Shabbat — park us in a Jewish city every Friday
      </label>
      <label className="flex min-h-11 items-center gap-2 text-sm text-stone">
        <input
          type="checkbox"
          checked={form.kosher}
          onChange={(e) => setForm({ ...form, kosher: e.target.checked })}
        />
        Need kosher meals
      </label>

      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
          Destinations
        </p>
        <div className="flex flex-wrap gap-2">
          {destinations.map((item) => {
            const on = form.destinations.includes(item.slug);
            return (
              <button
                key={item.slug}
                type="button"
                onClick={() => toggleDest(item.slug)}
                className={`min-h-10 rounded-full px-3 text-xs font-semibold ${
                  on ? "bg-jade text-mist" : "bg-white text-stone"
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </div>
      </div>

      <Card>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
          {plan.nights} nights · {plan.fridays.length} Shabbat{plan.fridays.length === 1 ? "" : "s"}
        </p>
        <div className="mt-3 space-y-3">
          {plan.shabbatStops.map((stop) => (
            <div key={stop.friday.toISOString()} className="border-t border-jade/10 pt-3 first:border-0 first:pt-0">
              <p className="text-sm font-semibold text-jade">
                Friday {formatLongDate(stop.friday, "Asia/Ho_Chi_Minh")}
              </p>
              <p className="mt-1 font-display text-xl">Stay: {stop.recommended.name}</p>
              <p className="mt-1 text-sm text-stone">{stop.reason}</p>
            </div>
          ))}
        </div>
      </Card>

      {plan.warnings.map((item) => (
        <Card
          key={item.title}
          className={item.level === "block" ? "border border-lacquer/40" : ""}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-lacquer">{item.level}</p>
          <p className="mt-1 font-semibold text-ink">{item.title}</p>
          <p className="mt-1 text-sm leading-relaxed text-stone">{item.body}</p>
        </Card>
      ))}

      <p className="text-xs text-muted">
        This is a logistics sketch, not a pesak. Confirm meals and the current Chabad address before you book.
      </p>
    </form>
  );
}

export function FridayPlanner({
  destinations,
  defaultFriday,
}: {
  destinations: Destination[];
  defaultFriday: string;
}) {
  const [arrival, setArrival] = useState("13:30");
  const [airport, setAirport] = useState("HAN");
  const [hotelSlug, setHotelSlug] = useState("hanoi");
  const [date, setDate] = useState(defaultFriday);

  const result = estimateFriday({ arrival, airport, hotelSlug, date });

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Field label="Friday date">
          <input type="date" className={inputClass} value={date} onChange={(e) => setDate(e.target.value)} />
        </Field>
        <Field label="Landing time">
          <input type="time" className={inputClass} value={arrival} onChange={(e) => setArrival(e.target.value)} />
        </Field>
        <Field label="Airport">
          <select className={inputClass} value={airport} onChange={(e) => setAirport(e.target.value)}>
            {airports.map((item) => (
              <option key={item.code} value={item.code}>
                {item.code} · {item.city}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Hotel city">
          <select className={inputClass} value={hotelSlug} onChange={(e) => setHotelSlug(e.target.value)}>
            {destinations.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>
        </Field>
      </div>

      {result.ok ? (
        <Card>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-lacquer">
            {result.verdict === "likely" ? "Looks possible" : result.verdict === "tight" ? "Tight" : "Unlikely"}
          </p>
          <p className="mt-2 font-display text-2xl">
            Ready ~ {formatTime(result.ready, result.hotel.tzid)} · candles {result.candlesLabel}
          </p>
          <p className="mt-2 text-sm text-stone">
            Buffer after food pickup: {result.bufferMinutes} minutes. We baked in immigration{" "}
            {result.steps.immigration}m, bags {result.steps.baggage}m, transfer {result.steps.transfer}m,
            check-in {result.steps.checkin}m, food {result.steps.food}m.
          </p>
          {result.verdict !== "likely" ? (
            <p className="mt-2 text-sm text-lacquer">
              Leave more buffer. A late Friday landing is the most common way a kosher trip breaks.
            </p>
          ) : null}
        </Card>
      ) : (
        <p className="text-sm text-stone">{result.message}</p>
      )}
      <p className="text-xs text-muted">
        Not a halachic ruling. Times are estimates. Confirm candle lighting with your rav and local Chabad.
      </p>
    </div>
  );
}

