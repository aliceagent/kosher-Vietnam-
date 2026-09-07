import { getDestination } from "@/lib/content";
import { getCityTimes } from "@/lib/shabbat";

export const airports = [
  { code: "HAN", city: "Hanoi", dest: "hanoi" },
  { code: "DAD", city: "Da Nang", dest: "da-nang" },
  { code: "SGN", city: "Ho Chi Minh City", dest: "ho-chi-minh-city" },
  { code: "CXR", city: "Nha Trang", dest: "nha-trang" },
  { code: "PQC", city: "Phú Quốc", dest: "phu-quoc" },
  { code: "DLI", city: "Da Lat", dest: "da-lat" },
];

const extraTransfer: Record<string, Partial<Record<string, number>>> = {
  HAN: { "ha-long-bay": 180, "ninh-binh": 140, sapa: 330, "ha-giang": 420 },
  DAD: { "hoi-an": 50, hue: 180 },
  SGN: { "mekong-delta": 210, "phu-quoc": 0 },
};

export function estimateFriday(input: {
  arrival: string;
  airport: string;
  hotelSlug: string;
  date: string;
}) {
  const airport = airports.find((item) => item.code === input.airport);
  const hotel = getDestination(input.hotelSlug);
  if (!airport || !hotel) return { ok: false as const, message: "Choose an airport and hotel city." };

  const [hours, minutes] = input.arrival.split(":").map(Number);
  const day = new Date(`${input.date}T12:00:00`);
  const arrival = new Date(day);
  arrival.setHours(hours, minutes, 0, 0);

  const immigration = 60;
  const baggage = 30;
  const extra = extraTransfer[input.airport]?.[input.hotelSlug];
  const transfer = extra ?? (airport.dest === hotel.slug ? hotel.transferMinutesFromAirport : hotel.transferMinutesFromAirport + 40);
  const checkin = 25;
  const food = 40;
  const totalAfterArrival = immigration + baggage + transfer + checkin + food;
  const ready = new Date(arrival.getTime() + totalAfterArrival * 60 * 1000);

  const times = getCityTimes(hotel.slug, day);
  const candles = times?.candles ?? new Date(day);
  const bufferMinutes = Math.round((candles.getTime() - ready.getTime()) / 60000);

  let verdict: "likely" | "tight" | "unlikely" = "likely";
  if (bufferMinutes < 45) verdict = "unlikely";
  else if (bufferMinutes < 120) verdict = "tight";

  if (day.getDay() !== 5) {
    return {
      ok: true as const,
      warning: "That date is not a Friday. The tool still estimates time to candle lighting that evening.",
      airport,
      hotel,
      arrival,
      ready,
      candles,
      candlesLabel: times?.candlesLabel ?? "—",
      totalAfterArrival,
      bufferMinutes,
      verdict,
      steps: { immigration, baggage, transfer, checkin, food },
    };
  }

  return {
    ok: true as const,
    airport,
    hotel,
    arrival,
    ready,
    candles,
    candlesLabel: times?.candlesLabel ?? "—",
    totalAfterArrival,
    bufferMinutes,
    verdict,
    steps: { immigration, baggage, transfer, checkin, food },
  };
}
