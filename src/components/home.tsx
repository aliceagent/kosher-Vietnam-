import { InquireForm } from "@/components/inquire-form";

const destinations = [
  {
    name: "Hanoi",
    detail: "Old Quarter walks, temple quiet, and Friday night dinners arranged before sundown.",
    image:
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Hạ Long Bay",
    detail: "Private junk charters timed around Shabbat — limestone silence without the cruise crowds.",
    image:
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Hội An",
    detail: "Lantern evenings, tailor visits, and riverside hotels with kitchen access for your cook.",
    image:
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Sài Gòn",
    detail: "Modern kosher options, community connections, and Mekong day trips that return before candle lighting.",
    image:
      "https://images.unsplash.com/photo-1583417267826-aebc4d1542e1?auto=format&fit=crop&w=1600&q=80",
  },
];

const journeys = [
  {
    days: "8 days",
    title: "North to the Bay",
    copy: "Hanoi markets at dawn, a Shabbat in the Old Quarter, then two nights on Hạ Long with a private chef.",
  },
  {
    days: "10 days",
    title: "Central Heritage",
    copy: "Huế’s imperial calm into Hội An’s lantern glow — paced for families who keep kosher on the road.",
  },
  {
    days: "12 days",
    title: "Vietnam Full Arc",
    copy: "North to south with Shabbat stops planned in advance and every meal accounted for before you pack.",
  },
];

const promises = [
  {
    title: "Kosher, without guesswork",
    copy: "Pre-vetted kitchens, sealed catering, and hotel setups so you never wonder what is on the plate.",
  },
  {
    title: "Shabbat built into the map",
    copy: "Candle-lighting times, walking-radius hotels, and itineraries that rest when you rest.",
  },
  {
    title: "Guides who get it",
    copy: "English-speaking hosts briefed on Jewish customs — from minyan needs to family travel pace.",
  },
];

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-10">
        <a href="#top" className="flex items-baseline gap-2 text-mist">
          <span className="font-display text-2xl font-semibold tracking-[0.04em] md:text-3xl">
            Orah
          </span>
          <span className="hidden text-[0.7rem] font-medium uppercase tracking-[0.28em] text-mist/70 sm:inline">
            Kosher Vietnam
          </span>
        </a>
        <nav className="flex items-center gap-6 text-sm font-medium text-mist/90">
          <a href="#destinations" className="hidden transition hover:text-lantern-soft md:inline">
            Destinations
          </a>
          <a href="#journeys" className="hidden transition hover:text-lantern-soft md:inline">
            Journeys
          </a>
          <a
            href="#inquire"
            className="border border-mist/35 px-4 py-2 transition hover:border-lantern-soft hover:text-lantern-soft"
          >
            Plan a trip
          </a>
        </nav>
      </div>
    </header>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden bg-ink text-mist">
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=2400&q=80"
          alt="Limestone karsts rising from Hạ Long Bay at dusk"
          className="hero-media h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/88 via-ink/55 to-ink/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/35" />
        <div className="lantern-glow pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-lantern/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-6 pb-16 pt-32 md:px-10 md:pb-24">
        <p className="rise font-display text-5xl font-semibold tracking-[0.02em] text-mist sm:text-6xl md:text-8xl lg:text-9xl">
          Orah
        </p>
        <div className="brand-rule mt-3 h-px w-28 bg-lantern md:w-40" />
        <h1 className="rise rise-delay-1 mt-8 max-w-2xl font-display text-3xl font-medium leading-tight text-mist sm:text-4xl md:text-5xl">
          Vietnam, planned for Jewish life.
        </h1>
        <p className="rise rise-delay-2 mt-5 max-w-lg text-base leading-relaxed text-mist/80 md:text-lg">
          Private kosher journeys from Hanoi to the Mekong — Shabbat-ready, meal-certain, and paced like home.
        </p>
        <div className="rise rise-delay-3 mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#inquire"
            className="bg-lacquer px-7 py-3.5 text-sm font-semibold tracking-wide text-mist transition hover:bg-lacquer-deep"
          >
            Start your itinerary
          </a>
          <a
            href="#promise"
            className="border border-mist/40 px-7 py-3.5 text-sm font-semibold tracking-wide text-mist transition hover:border-lantern-soft hover:text-lantern-soft"
          >
            How kosher works here
          </a>
        </div>
      </div>
    </section>
  );
}

export function PromiseSection() {
  return (
    <section id="promise" className="relative overflow-hidden bg-fog py-24 md:py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 18%, rgba(212,168,75,0.18), transparent 42%), radial-gradient(circle at 88% 70%, rgba(15,61,50,0.12), transparent 45%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="reveal max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted">The Orah promise</p>
          <h2 className="mt-4 font-display text-4xl font-medium text-ink md:text-5xl">
            Travel that honors who you are.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-stone">
            Vietnam is extraordinary — and rarely set up for kosher travelers. We build the route around your table,
            your calendar, and your community needs.
          </p>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
          {promises.map((item, index) => (
            <article
              key={item.title}
              className="reveal border-t border-jade/20 pt-6"
              style={{ transitionDelay: `${index * 90}ms` }}
            >
              <h3 className="font-display text-2xl font-medium text-jade">{item.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-stone">{item.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Destinations() {
  return (
    <section id="destinations" className="bg-ink text-mist">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
        <div className="reveal max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-lantern-soft/80">Destinations</p>
          <h2 className="mt-4 font-display text-4xl font-medium md:text-5xl">
            Four places. One continuous path.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-mist/75">
            Each stop is chosen for atmosphere — and for how well it supports kosher dining and Shabbat rest.
          </p>
        </div>
      </div>

      <div className="flex flex-col">
        {destinations.map((place, index) => (
          <article
            key={place.name}
            className="reveal group relative min-h-[70vh] overflow-hidden border-t border-mist/10"
            style={{ transitionDelay: `${index * 60}ms` }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={place.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition duration-[1.4s] ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/45 to-transparent" />
            <div className="relative z-10 flex min-h-[70vh] max-w-7xl items-end px-6 py-16 md:px-10 md:py-20">
              <div className="max-w-lg">
                <h3 className="font-display text-4xl font-medium md:text-6xl">{place.name}</h3>
                <p className="mt-4 text-base leading-relaxed text-mist/80 md:text-lg">{place.detail}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Journeys() {
  return (
    <section id="journeys" className="bg-mist py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="reveal flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted">Sample journeys</p>
            <h2 className="mt-4 font-display text-4xl font-medium text-ink md:text-5xl">
              Routes already thinking about Friday.
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-stone">
            Every itinerary is private and editable. These arcs show how we pace a kosher trip through Vietnam.
          </p>
        </div>

        <div className="mt-16 divide-y divide-jade/15 border-y border-jade/15">
          {journeys.map((trip, index) => (
            <a
              key={trip.title}
              href="#inquire"
              className="reveal group grid gap-4 py-10 transition md:grid-cols-[8rem_1fr_auto] md:items-baseline md:gap-10"
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-lacquer">
                {trip.days}
              </span>
              <div>
                <h3 className="font-display text-3xl font-medium text-ink transition group-hover:text-jade md:text-4xl">
                  {trip.title}
                </h3>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-stone">{trip.copy}</p>
              </div>
              <span className="text-sm font-semibold tracking-wide text-jade transition group-hover:translate-x-1">
                Inquire →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Inquire() {
  return (
    <section id="inquire" className="relative overflow-hidden bg-jade py-24 text-mist md:py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(212,168,75,0.28), transparent 35%), linear-gradient(135deg, transparent 40%, rgba(7,26,20,0.35))",
        }}
      />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-6 md:grid-cols-[1.1fr_0.9fr] md:px-10">
        <div className="reveal">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-lantern-soft/90">Inquire</p>
          <h2 className="mt-4 font-display text-4xl font-medium md:text-5xl">
            Tell us when you travel. We&apos;ll build the rest around Shabbat.
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-mist/80">
            Share your dates, family size, and kashrut preferences. A planner replies within one business day with a
            first route sketch.
          </p>
        </div>
        <InquireForm />
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-mist/10 bg-ink px-6 py-10 text-mist/70 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-2xl font-semibold text-mist">Orah</p>
          <p className="mt-1 text-sm">Kosher Vietnam travel for Jewish families and communities.</p>
        </div>
        <p className="text-sm">© {new Date().getFullYear()} Orah Journeys. Shalom and safe travels.</p>
      </div>
    </footer>
  );
}
