// Categories that are sold by weight. Match the `path` value in `categories`
// from assets.js — these are the values stored on the Product as `category`.
export const KG_CATEGORIES = ["Vegetables", "Fruits", "Grains"];

export const defaultUnitForCategory = (category) =>
  KG_CATEGORIES.includes(category) ? "kg" : "piece";

// "piece" is treated as "no unit suffix" in the UI — only render when
// the seller has chosen something more specific.
export const formatUnitSuffix = (unit) =>
  !unit || unit === "piece" ? "" : ` / ${unit}`;

export const formatQtyWithUnit = (qty, unit) => {
  const u = unit || "piece";
  if (u === "piece") return String(qty);
  if (u === "kg") return `${qty} kg`;
  return qty > 1 ? `${qty} ${u}s` : `${qty} ${u}`;
};
