"use client";

export function InquireForm() {
  return (
    <form
      className="reveal space-y-5"
      onSubmit={(event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        const name = String(data.get("name") || "friend");
        alert(`Thank you, ${name}. An Orah planner will be in touch shortly.`);
        form.reset();
      }}
    >
      <label className="block">
        <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-mist/70">
          Name
        </span>
        <input
          name="name"
          required
          className="w-full border border-mist/25 bg-ink/25 px-4 py-3 text-mist outline-none transition placeholder:text-mist/40 focus:border-lantern-soft"
          placeholder="Your name"
        />
      </label>
      <label className="block">
        <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-mist/70">
          Email
        </span>
        <input
          name="email"
          type="email"
          required
          className="w-full border border-mist/25 bg-ink/25 px-4 py-3 text-mist outline-none transition placeholder:text-mist/40 focus:border-lantern-soft"
          placeholder="you@email.com"
        />
      </label>
      <label className="block">
        <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-mist/70">
          Travel window
        </span>
        <input
          name="dates"
          className="w-full border border-mist/25 bg-ink/25 px-4 py-3 text-mist outline-none transition placeholder:text-mist/40 focus:border-lantern-soft"
          placeholder="e.g. March 2027 · family of 4"
        />
      </label>
      <label className="block">
        <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-mist/70">
          Notes
        </span>
        <textarea
          name="notes"
          rows={4}
          className="w-full resize-y border border-mist/25 bg-ink/25 px-4 py-3 text-mist outline-none transition placeholder:text-mist/40 focus:border-lantern-soft"
          placeholder="Kosher level, Shabbat needs, cities you care about…"
        />
      </label>
      <button
        type="submit"
        className="w-full bg-lacquer px-6 py-3.5 text-sm font-semibold tracking-wide text-mist transition hover:bg-lacquer-deep md:w-auto"
      >
        Request a route sketch
      </button>
    </form>
  );
}
