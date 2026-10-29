export type AppNavGroup = "overview" | "livestock" | "crops" | "resources" | "insights" | "account"

export type AppNavItem = {
  key: string
  href: string
  group: AppNavGroup
  enterprise: "" | "poultry" | "small_ruminants" | "cattle" | "pigs" | "crops"
  keywords: string[]
}

export const APP_NAV: AppNavItem[] = [
  { key: "dashboard", href: "/dashboard", group: "overview", enterprise: "", keywords: ["dashboard", "home", "overview"] },
  { key: "birds", href: "/birds", group: "livestock", enterprise: "poultry", keywords: ["birds", "poultry", "flock", "layers", "broilers"] },
  { key: "eggs", href: "/eggs", group: "livestock", enterprise: "poultry", keywords: ["eggs", "collection", "grade"] },
  { key: "ruminants", href: "/ruminants", group: "livestock", enterprise: "small_ruminants", keywords: ["goats", "sheep", "ruminants", "flock"] },
  { key: "cattle", href: "/cattle", group: "livestock", enterprise: "cattle", keywords: ["cattle", "cows", "herd", "milk"] },
  { key: "pigs", href: "/pigs", group: "livestock", enterprise: "pigs", keywords: ["pigs", "swine", "sty"] },
  { key: "crops", href: "/crops", group: "crops", enterprise: "crops", keywords: ["crops", "fields", "planting", "harvest", "maize"] },
  { key: "feed", href: "/feed", group: "resources", enterprise: "", keywords: ["feed", "stock", "inventory"] },
  { key: "medicine", href: "/medicine", group: "resources", enterprise: "", keywords: ["medicine", "vaccine", "treatment"] },
  { key: "reports", href: "/reports", group: "insights", enterprise: "", keywords: ["reports", "export", "finance"] },
  { key: "statistics", href: "/statistics", group: "insights", enterprise: "poultry", keywords: ["statistics", "charts", "grades"] },
  { key: "farm", href: "/farm", group: "account", enterprise: "", keywords: ["farm", "settings", "logo"] },
  { key: "users", href: "/users", group: "account", enterprise: "", keywords: ["users", "team", "staff"] },
  { key: "profile", href: "/profile", group: "account", enterprise: "", keywords: ["profile", "account", "password"] },
]

export const APP_NAV_GROUPS: { id: AppNavGroup; key: string }[] = [
  { id: "overview", key: "groupOverview" },
  { id: "livestock", key: "groupLivestock" },
  { id: "crops", key: "groupCrops" },
  { id: "resources", key: "groupResources" },
  { id: "insights", key: "groupInsights" },
  { id: "account", key: "groupAccount" },
]

export function searchAppNav(query: string, items: AppNavItem[]) {
  const term = query.trim().toLowerCase()
  if (!term) return items.slice(0, 8)
  return items.filter((item) => {
    if (item.key.toLowerCase().includes(term) || item.href.includes(term)) return true
    return item.keywords.some((word) => word.includes(term) || term.includes(word))
  })
}
