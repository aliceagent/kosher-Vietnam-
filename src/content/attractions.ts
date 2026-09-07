import { daNangAttractions } from "@/content/attractions/da-nang";
import { haLongAttractions } from "@/content/attractions/ha-long";
import { hanoiAttractions } from "@/content/attractions/hanoi";
import { hcmcAttractions } from "@/content/attractions/hcmc";
import { hoiAnAttractions } from "@/content/attractions/hoi-an";
import { ninhBinhAttractions } from "@/content/attractions/ninh-binh";
import {
  daLatAttractions,
  haGiangAttractions,
  hueAttractions,
  mekongAttractions,
  nhaTrangAttractions,
  phongNhaAttractions,
  phuQuocAttractions,
  sapaAttractions,
} from "@/content/attractions/rest";
import type { Attraction } from "@/lib/schema";

export const attractions: Attraction[] = [
  ...hanoiAttractions,
  ...hcmcAttractions,
  ...hoiAnAttractions,
  ...daNangAttractions,
  ...ninhBinhAttractions,
  ...haLongAttractions,
  ...hueAttractions,
  ...sapaAttractions,
  ...mekongAttractions,
  ...phongNhaAttractions,
  ...nhaTrangAttractions,
  ...daLatAttractions,
  ...phuQuocAttractions,
  ...haGiangAttractions,
];
