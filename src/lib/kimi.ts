export type KimiCard = {
  title: string;
  blurb: string;
  url?: string;
};

type ChatMessage = {
  role: "system" | "user" | "assistant" | "tool";
  content?: string | null;
  name?: string;
  tool_call_id?: string;
  tool_calls?: unknown;
  reasoning_content?: string;
};

const BASE = process.env.KIMI_BASE_URL ?? "https://api.kimi.com/coding/v1";
const MODEL = "kimi-for-coding-highspeed";

function key() {
  return process.env.KIMI_API_KEY ?? "";
}

async function complete(body: Record<string, unknown>, timeoutMs: number) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(`${BASE}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    const data = (await res.json()) as {
      choices?: { finish_reason?: string; message?: ChatMessage }[];
      error?: { message?: string };
    };
    if (!res.ok) throw new Error(data.error?.message ?? `Kimi ${res.status}`);
    const choice = data.choices?.[0];
    if (!choice?.message) throw new Error("Kimi returned no message");
    return { finish_reason: choice.finish_reason, message: choice.message };
  } finally {
    clearTimeout(timer);
  }
}

function normalizeCard(card: { title?: unknown; blurb?: unknown; url?: unknown }): KimiCard | null {
  const title = typeof card.title === "string" ? card.title.trim() : "";
  const blurb = typeof card.blurb === "string" ? card.blurb.trim() : "";
  if (!title || !blurb || blurb.startsWith("{")) return null;
  return {
    title: title.slice(0, 80),
    blurb: blurb.slice(0, 420),
    url: typeof card.url === "string" && card.url.trim() ? card.url.trim().slice(0, 240) : undefined,
  };
}

function salvageCards(text: string): KimiCard[] {
  const cards: KimiCard[] = [];
  const re =
    /\{\s*"title"\s*:\s*"((?:\\.|[^"\\])*)"\s*,\s*"blurb"\s*:\s*"((?:\\.|[^"\\])*)"(?:\s*,\s*"url"\s*:\s*"((?:\\.|[^"\\])*)")?/g;
  for (const match of text.matchAll(re)) {
    const card = normalizeCard({
      title: match[1]?.replace(/\\"/g, '"'),
      blurb: match[2]?.replace(/\\"/g, '"'),
      url: match[3]?.replace(/\\"/g, '"'),
    });
    if (card) cards.push(card);
    if (cards.length === 3) break;
  }
  return cards;
}

function parseCards(text: string): KimiCard[] {
  const cleaned = text.replace(/```json|```/g, "").trim();
  const match = cleaned.match(/\{[\s\S]*\}/);
  if (match) {
    try {
      const parsed = JSON.parse(match[0]) as { cards?: KimiCard[] };
      const cards = (parsed.cards ?? []).map(normalizeCard).filter((card): card is KimiCard => Boolean(card));
      if (cards.length) return cards.slice(0, 3);
    } catch {
      /* truncated JSON — salvage complete objects */
    }
  }
  return salvageCards(cleaned);
}

const SYSTEM = `You help English-speaking kosher / Shomer Shabbat / family travelers in Vietnam.
Rules: vegetarian is not kosher. No eruv in Vietnam. You are not a rav. Do not invent a kosher kitchen, hours, or a hetter.
Prices and hours go stale — say confirm live.
Return JSON only: {"cards":[{"title":"","blurb":"","url":""}]}
Max 3 cards. Each blurb <= 22 words. Prefer Orah catalog hrefs from the user message when they match.`;

function userPrompt(query: string, catalogLines: string[], extra: string) {
  return `Query: ${query}

Orah catalog (prefer these hrefs when they fit):
${catalogLines.join("\n") || "(none)"}

${extra}`;
}

async function kimiFast(query: string, catalogLines: string[]) {
  const messages: ChatMessage[] = [
    { role: "system", content: SYSTEM },
    {
      role: "user",
      content: userPrompt(
        query,
        catalogLines,
        "Answer from the catalog first. Be brief. JSON cards only.",
      ),
    },
  ];

  const choice = await complete(
    {
      model: MODEL,
      max_tokens: 2200,
      messages,
    },
    12000,
  );
  let cards = parseCards(choice.message.content ?? "");
  if (cards.length) return { cards };

  messages.push(choice.message, {
    role: "user",
    content: "Output the JSON object now. No other text.",
  });
  const retry = await complete({ model: MODEL, max_tokens: 1800, messages }, 8000);
  cards = parseCards(retry.message.content ?? "");
  return cards.length ? { cards } : { cards: [], error: "Kimi did not return cards." };
}

async function kimiLive(query: string, catalogLines: string[]) {
  const messages: ChatMessage[] = [
    { role: "system", content: SYSTEM },
    {
      role: "user",
      content: userPrompt(query, catalogLines, "Search the web for live/current notes, then answer as JSON cards."),
    },
  ];
  const tools = [{ type: "builtin_function", function: { name: "$web_search" } }];

  for (let round = 0; round < 2; round++) {
    const choice = await complete(
      {
        model: MODEL,
        max_tokens: round === 0 ? 80 : 1800,
        messages,
        tools,
      },
      round === 0 ? 10000 : 16000,
    );

    if (choice.finish_reason === "tool_calls" && Array.isArray(choice.message.tool_calls)) {
      messages.push(choice.message);
      for (const call of choice.message.tool_calls as {
        id: string;
        function: { name: string; arguments: string };
      }[]) {
        messages.push({
          role: "tool",
          tool_call_id: call.id,
          name: call.function.name,
          content: call.function.arguments,
        });
      }
      continue;
    }

    const cards = parseCards(choice.message.content ?? "");
    if (cards.length) return { cards };
  }

  return { cards: [] as KimiCard[], error: "Kimi search stalled." };
}

export async function kimiSearch(
  query: string,
  catalogLines: string[],
  opts: { live?: boolean } = {},
): Promise<{ cards: KimiCard[]; error?: string }> {
  if (!key()) return { cards: [], error: "Kimi is not configured." };

  try {
    if (opts.live) {
      const live = await kimiLive(query, catalogLines);
      if (live.cards.length) return live;
      return kimiFast(query, catalogLines);
    }
    return kimiFast(query, catalogLines);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Kimi search failed.";
    return { cards: [], error: message.includes("abort") ? "Kimi timed out." : message };
  }
}
