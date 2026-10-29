export const FAQ_ITEM_KEYS = [
  "what",
  "who",
  "account",
  "crops",
  "livestock",
  "multi",
  "free",
  "cost",
  "subscribe",
  "cancel",
  "support",
  "inventory",
  "install",
] as const

export const HOME_PLATFORM_CARDS = [
  { key: "crops", href: "/features/crop-management" },
  { key: "livestock", href: "/features/livestock-management" },
  { key: "inventory", href: "/use-cases/feed-inventory" },
  { key: "business", href: "/features" },
] as const

export const HOME_AUDIENCE_KEYS = ["crops", "livestock", "commercial", "mixed"] as const

export const HOME_VALUE_KEYS = ["organize", "consistency", "monitor", "decisions", "growth"] as const

export const HOME_STEP_KEYS = ["account", "farm", "operations"] as const

export const SIDEBAR_ITEMS = [
  { key: "dashboard", href: "/dashboard", enterprise: "" },
  { key: "birds", href: "/birds", enterprise: "poultry" },
  { key: "eggs", href: "/eggs", enterprise: "poultry" },
  { key: "ruminants", href: "/ruminants", enterprise: "small_ruminants" },
  { key: "cattle", href: "/cattle", enterprise: "cattle" },
  { key: "pigs", href: "/pigs", enterprise: "pigs" },
  { key: "crops", href: "/crops", enterprise: "crops" },
  { key: "feed", href: "/feed", enterprise: "" },
  { key: "medicine", href: "/medicine", enterprise: "" },
  { key: "reports", href: "/reports", enterprise: "" },
  { key: "statistics", href: "/statistics", enterprise: "poultry" },
  { key: "farm", href: "/farm", enterprise: "" },
  { key: "users", href: "/users", enterprise: "" },
  { key: "profile", href: "/profile", enterprise: "" },
] as const

export const MARKETING_NAV = [
  { id: "features", href: "/features" },
  { id: "solutions", href: "/solutions" },
  { id: "pricing", href: "/pricing" },
  { id: "resources", href: "/resources" },
  { id: "contact", href: "/contact" },
  { id: "about", href: "/about" },
] as const

export const CROP_IDS = [
  "maize",
  "rice",
  "cassava",
  "yam",
  "plantain",
  "vegetables",
  "cocoa",
  "soybean",
  "groundnut",
  "sorghum",
] as const

export const ENTERPRISE_IDS = ["poultry", "small_ruminants", "cattle", "pigs", "crops"] as const
