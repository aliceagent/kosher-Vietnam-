# Orah sprints

Mobile-first guide for English-speaking Jewish travelers in Vietnam.
Signature feature: **Plan around Shabbat**.

Stack for this loop: Next.js App Router, TypeScript content files, Zod-ready types, `@hebcal/core` for times. Schema is country-agnostic so `/thailand/bangkok` can be added later without a redesign.

## Sprint 1 — Mobile shell + hub

- App chrome: sticky top bar, bottom nav, safe-area padding
- Homepage as a traveler hub (search, quick actions, next Shabbat, destinations)
- Country index `/vietnam`
- Routing `/vietnam/[slug]`

## Sprint 2 — Destination system

- Repeatable destination template (overview through nearby)
- Chabad / community records with verification badges
- Kosher venues with kashrut class (certified / community / products / not kosher)
- Shabbat base, eruv (never assumed), hotel neighborhoods
- Attractions with family + walking notes

## Sprint 3 — Plan around Shabbat

- Candle lighting / tzeit / havdalah / parsha by city
- Friday arrival estimator (not a pesak)
- Trip builder that finds every Friday, Shabbat, and Yom Tov
- Warnings when a plan parks someone without Jewish infrastructure on Friday

## Sprint 4 — Practical guides + findability

- Visa, money, SIM, transport, language, health, safety
- Family, holidays, packing, emergency
- Search, itineraries, update submissions
- Mobile QA on the critical paths

## Later (not this loop)

- Payload/Sanity CMS + Postgres
- Moderated community accounts
- Mapbox/Leaflet Shabbat map mode
- Offline PWA + saved itinerary sync
- Worldwide country expansion
