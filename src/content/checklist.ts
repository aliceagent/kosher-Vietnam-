import type { ChecklistItem } from "@/lib/schema";

export const checklist: ChecklistItem[] = [
  { id: "passport", section: "Papers", title: "Passport validity", body: "Many travelers need six months and blank pages. Check official rules for your nationality.", essential: true },
  { id: "visa", section: "Papers", title: "Visa / eVisa", body: "Use Vietnam’s official eVisa portal, not the first Google ad.", essential: true },
  { id: "insurance", section: "Papers", title: "Travel insurance in your phone wallet", body: "International clinic bills are not the time to hunt PDFs.", essential: true },
  { id: "health", section: "Health", title: "Ask your clinician", body: "Vaccines and malaria questions are medical, not Orah’s job.", essential: true },
  { id: "esim", section: "Phone", title: "eSIM or a plan for Grab on landing", body: "Install at home. Confirm the phone is unlocked.", essential: true },
  { id: "apps", section: "Phone", title: "Grab, Maps, Translate, WhatsApp", body: "See Apps. Download Vietnamese offline in Translate and Maps.", essential: true },
  { id: "money", section: "Money", title: "ATM plan + tell your bank", body: "Đồng has many zeros. Decline dynamic currency conversion.", essential: true },
  { id: "plugs", section: "Kit", title: "Type A/C/G adapters + weekday power bank", body: "Ask your rav about electronics on Shabbat. This is a packing note.", essential: true },
  { id: "kosher-pack", section: "Kosher", title: "Packed food you actually eat", body: "Tuna, crackers, bars, disposable plates. No supermarket miracle.", essential: true },
  { id: "shabbat-pack", section: "Kosher", title: "Shabbat kit", body: "Candles/holders or your rav’s alternative, grape juice if needed, siddur, challah/matzah.", essential: true },
  { id: "meals", section: "Kosher", title: "Write Chabad for meals", body: "Hanoi, Hội An, Saigon — not walk-up. Do this before you fly.", essential: true },
  { id: "keys", section: "Shabbat", title: "Hotel electronics questions in writing", body: "Physical key, lights without the keycard tray, stairs, luggage room.", essential: true },
  { id: "carrier", section: "Family", title: "Carrier > stroller for markets", body: "Bring a compact car seat if your child still needs one. Grab will not provide it.", essential: false },
  { id: "scams", section: "Street", title: "Read the safety guide once", body: "Traffic, phone snatch, dollar taxis, basket-boat upsells.", essential: true },
  { id: "friday", section: "Route", title: "Lock Friday city before you lock boats", body: "Hà Giang and overnight cruises do not get a Friday.", essential: true },
];
