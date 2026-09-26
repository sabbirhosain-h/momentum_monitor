// Shared constants for the Finance module: color tokens (the "trustworthy
// finance" theme — deep blue + neutral gray, green/red for gains/losses)
// and default categories/accounts. Pure data, safe to import from server
// or client files.

// Backgrounds & surfaces
export const PAGE_BG = "#F3F4F9"; // clean neutral page background
export const CARD = "#FFFFFF"; // card surface
export const CARD_BORDER = "#E5E7EB"; // subtle neutral border

// Brand / primary — deep trust blue, used for the hero panel, primary
// buttons and key highlights.
export const PRIMARY = "#1565C0";
export const PRIMARY_DARK = "#0D47A1"; // pressed/soft-panel state of primary
export const PRIMARY_LIGHT = "#E3EEFB"; // light blue tint for tracks/badges

// Semantic state colors
export const SUCCESS = "#16A34A"; // gains / income
export const SUCCESS_SOFT = "#DCFCE7";
export const ERROR = "#DC2626"; // losses / expenses / destructive
export const ERROR_SOFT = "#FEE2E2";
export const WARNING = "#FBBF24"; // caution states

// Text
export const TEXT_PRIMARY = "#111827";
export const TEXT_SECONDARY = "#374151";
export const TEXT_MUTED = "#6B7280";
export const TEXT_PLACEHOLDER = "#9CA3AF";

export const BASE_CATEGORY_COLORS = [
  "#1565C0",
  "#0F766E",
  "#6366F1",
  "#B45309",
  "#DC2626",
  "#6B7280",
];

export const DEFAULT_CATEGORIES = [
  { value: "housing", label: "Housing", color: "#1565C0" },
  { value: "food", label: "Food & Dining", color: "#0F766E" },
  { value: "transport", label: "Transportation", color: "#6366F1" },
  { value: "subscriptions", label: "Subscriptions", color: "#B45309" },
  { value: "shopping", label: "Shopping", color: "#DC2626" },
  { value: "other", label: "Other", color: "#6B7280" },
];

export const DEFAULT_ACCOUNTS = ["Cash", "Bank Account"];

export const NEW_CATEGORY_VALUE = "__new_category__";
  