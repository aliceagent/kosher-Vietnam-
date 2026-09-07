import { GeoLocation, HDate, HebrewCalendar, Zmanim } from "@hebcal/core";
import { getDestination, getDestinations } from "@/lib/content";
import { formatTime } from "@/lib/format";

export type TimePreference = "standard" | "later-tzeit";

function fridayOf(date: Date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day >= 5 ? 5 - day : -day - 2;
  d.setDate(d.getDate() + diff);
  d.setHours(12, 0, 0, 0);
  return d;
}

export function nextFriday(from = new Date()) {
  const d = new Date(from);
  d.setHours(12, 0, 0, 0);
  const add = (5 - d.getDay() + 7) % 7 || (d.getDay() === 5 ? 0 : 7);
  if (d.getDay() === 6) d.setDate(d.getDate() + 6);
  else if (d.getDay() !== 5) d.setDate(d.getDate() + add);
  return d;
}

function zmanimFor(slug: string, date: Date) {
  const dest = getDestination(slug);
  if (!dest) return null;
  const gloc = new GeoLocation(dest.name, dest.coords.lat, dest.coords.lng, 0, dest.tzid);
  return { dest, zmanim: new Zmanim(gloc, date, false) };
}

export function getCityTimes(slug: string, date: Date, pref: TimePreference = "standard") {
  const pack = zmanimFor(slug, date);
  if (!pack) return null;
  const { dest, zmanim } = pack;
  const sunset = zmanim.sunset();
  const candles = zmanim.sunsetOffset(-18, true);
  const tzeit = pref === "later-tzeit" ? zmanim.tzeit(8.5) : zmanim.tzeit(7.083);
  return {
    slug,
    name: dest.name,
    tzid: dest.tzid,
    sunset,
    candles,
    tzeit,
    sunsetLabel: formatTime(sunset, dest.tzid),
    candlesLabel: formatTime(candles, dest.tzid),
    tzeitLabel: formatTime(tzeit, dest.tzid),
  };
}

export function getUpcomingShabbat(slug = "hanoi", from = new Date()) {
  const friday = nextFriday(from);
  const saturday = new Date(friday);
  saturday.setDate(friday.getDate() + 1);
  const times = getCityTimes(slug, friday);
  const havdalah = getCityTimes(slug, saturday);
  const hd = new HDate(friday);
  const events = HebrewCalendar.calendar({
    start: friday,
    end: saturday,
    sedrot: true,
    il: false,
  });
  const parsha = events.find((ev) => ev.getDesc().startsWith("Parashat"));
  return {
    friday,
    saturday,
    hebrewDate: hd.render("en"),
    parsha: parsha?.render("en") ?? "See your local calendar",
    candles: times,
    havdalah: havdalah
      ? { ...havdalah, havdalahLabel: havdalah.tzeitLabel, havdalah: havdalah.tzeit }
      : null,
  };
}

export function holidaysInRange(start: Date, end: Date) {
  return HebrewCalendar.calendar({
    start,
    end,
    il: false,
    noMinorFast: true,
    noModern: true,
    noRoshChodesh: true,
    noSpecialShabbat: true,
  }).filter((ev) =>
    /Rosh Hashana|Yom Kippur|Sukkot|Shmini Atzeret|Simchat Torah|Pesach|Shavuot/.test(ev.getDesc()),
  );
}

export function listShabbatWindows(start: Date, end: Date) {
  const fridays: Date[] = [];
  const cursor = new Date(start);
  cursor.setHours(12, 0, 0, 0);
  while (cursor <= end) {
    if (cursor.getDay() === 5) fridays.push(new Date(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }
  return fridays;
}

export function allCityTimes(date: Date) {
  return getDestinations()
    .filter((item) => item.jewishInfrastructure !== "none-known" || ["hanoi", "ho-chi-minh-city", "hoi-an"].includes(item.slug))
    .map((item) => getCityTimes(item.slug, date))
    .filter(Boolean);
}

export { fridayOf };
