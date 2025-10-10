import { MATERIAL_LOOKUP, MaterialCode } from "@/data/materials";

export type QuoteInput = {
  material: MaterialCode;
  layerMm: number;
  infillPct: number;
  volumeCm3: number;
  postprocess: string[];
  urgency: boolean;
  qty: number;
};

const POSTPROCESS_COST: Record<string, number> = {
  sanding: 150,
  primer: 200,
  paint: 400,
  threads: 80,
  brass_inserts: 120,
};

export function estimatePrice(input: QuoteInput) {
  const mat = MATERIAL_LOOKUP[input.material];
  const materialCost = mat.ratePerCm3 * input.volumeCm3;
  const layerCoeff = input.layerMm <= 0.16 ? 1.25 : input.layerMm <= 0.2 ? 1.1 : 1.0;
  const infillCoeff = input.infillPct >= 60 ? 1.15 : input.infillPct >= 30 ? 1.05 : 1.0;
  const urgencyCoeff = input.urgency ? 1.3 : 1.0;
  const postCost = input.postprocess.reduce((s, k) => s + (POSTPROCESS_COST[k] || 0), 0);

  const unit = (materialCost * layerCoeff * infillCoeff * urgencyCoeff) + postCost + 150; // базовая работа
  const total = unit * input.qty;
  return { unit: Math.round(unit), total: Math.round(total) };
}
