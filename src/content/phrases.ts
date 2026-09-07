import type { Phrase } from "@/lib/schema";

export const phrases: Phrase[] = [
  { en: "Hello", vi: "Xin chào", say: "sin chow" },
  { en: "Thank you", vi: "Cảm ơn", say: "kahm un" },
  { en: "Please", vi: "Làm ơn", say: "lahm un" },
  { en: "How much?", vi: "Bao nhiêu tiền?", say: "bow nyew tee-en" },
  { en: "Bathroom", vi: "Nhà vệ sinh", say: "nya veh sin" },
  { en: "Hospital", vi: "Bệnh viện", say: "ben vee-en" },
  { en: "Pharmacy", vi: "Nhà thuốc", say: "nya twok" },
  {
    en: "No pork",
    vi: "Không thịt heo",
    say: "khom tit hay-o",
    caution: "This does not make the kitchen kosher.",
  },
  {
    en: "No shellfish",
    vi: "Không hải sản",
    say: "khom hi san",
    caution: "This does not make the kitchen kosher.",
  },
  {
    en: "Vegetarian",
    vi: "Đồ chay",
    say: "daw chai",
    caution: "Vegetarian is not kosher. Broth, fish sauce, and shared woks are common.",
  },
  { en: "Allergy", vi: "Dị ứng", say: "zee ung" },
  { en: "Emergency", vi: "Khẩn cấp", say: "khun kup" },
];
