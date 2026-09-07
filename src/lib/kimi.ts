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

function parseCards(text: string): KimiCard[] {
  const cleaned = text.replace(/```json|```/g, "").trim();
  const match = cleaned.match(/\{[\s\S]*\}/);
  if (match) {
    try {
      const parsed = JSON.parse(match[0]) as { cards?: KimiCard[] };
      const cards = (parsed.cards ?? [])
        .filter((card) => card.title && card.blurb)
        .slice(0, 4)
        .map((card) => ({
          title: String(card.title).slice(0, 80),
          blurb: String(card.blurb).slice(0, 420),
          url: card.url ? String(card.url).slice(0, 240) : undefined,
        }));
      if (cards.length) return cards;
    } catch {
      /* fall through */
    }
  }
  if (cleaned.length > 40) {
    return [{ title: "Kimi notes", blurb: cleaned.slice(0, 420) }];
  }
  return [];
}

const SYSTEM = `You search for English-speaking kosher / Shomer Shabbat / family travelers in Vietnam.
Rules: vegetarian is not kosher. No eruv in Vietnam. You are not a rav. Do not invent a kosher kitchen, hours, or a hetter.
Prices and hours go stale — say confirm live.
Return JSON only: {"cards":[{"title":"","blurb":"","url":""}]}
Max 4 cards. Each blurb <= 32 words. Prefer Orah catalog hrefs from the user message when they match.`;

export async function kimiSearch(query: string, catalogLines: string[]): Promise<{ cards: KimiCard[]; error?: string }> {
  if (!key()) return { cards: [], error: "Kimi is not configured." };

  const messages: ChatMessage[] = [
    { role: "system", content: SYSTEM },
    {
      role: "user",
      content: `Query: ${query}

Orah catalog (prefer these hrefs when they fit):
${catalogLines.join("\n") || "(none)"}

Search the web for live/current notes, then answer as JSON cards.`,
    },
  ];

  const tools = [{ type: "builtin_function", function: { name: "$web_search" } }];

  try {
    for (let round = 0; round < 3; round++) {
      const choice = await complete(
        {
          model: MODEL,
          max_tokens: round === 0 ? 80 : 1800,
          messages,
          tools,
        },
        round === 0 ? 14000 : 22000,
      );

      if (choice.finish_reason === "tool_calls" && Array.isArray(choice.message.tool_calls)) {
        messages.push(choice.message);
        for (const call of choice.message.tool_calls as { id: string; function: { name: string; arguments: string } }[]) {
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
      if (round < 2) {
        messages.push({
          role: "user",
          content: "Output the JSON object now. No other text.",
        });
        continue;
      }
      return { cards: [], error: "Kimi did not return cards." };
    }
    return { cards: [], error: "Kimi search stalled." };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Kimi search failed.";
    return { cards: [], error: message.includes("abort") ? "Kimi timed out." : message };
  }
}
