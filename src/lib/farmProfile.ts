export const PENDING_FARM_KEY = "agrocyms.pendingFarm"

export type FarmEnterprise = {
  id: string
  label: string
  description: string
}

export type CropOption = {
  id: string
  label: string
}

export const FARM_ENTERPRISES: FarmEnterprise[] = [
  {
    id: "poultry",
    label: "Poultry",
    description: "Layers, broilers, and daily egg collection",
  },
  {
    id: "small_ruminants",
    label: "Goats & sheep",
    description: "Flocks, births, weights, and sales",
  },
  {
    id: "cattle",
    label: "Cattle",
    description: "Herd records, milk, calving, and sales",
  },
  {
    id: "pigs",
    label: "Pigs",
    description: "Sties, farrowing, growth, and sales",
  },
  {
    id: "crops",
    label: "Crops",
    description: "Fields and the crops this farm grows",
  },
]

export const CROP_OPTIONS: CropOption[] = [
  { id: "maize", label: "Maize" },
  { id: "rice", label: "Rice" },
  { id: "cassava", label: "Cassava" },
  { id: "yam", label: "Yam" },
  { id: "plantain", label: "Plantain" },
  { id: "vegetables", label: "Vegetables" },
  { id: "cocoa", label: "Cocoa" },
  { id: "soybean", label: "Soybean" },
  { id: "groundnut", label: "Groundnut" },
  { id: "sorghum", label: "Sorghum" },
]

export type PendingFarm = {
  name: string
  location: string
  enterprises: string[]
  crops: string[]
}

const cropsKey = (id: string) => `agrocyms.farmCrops.${id}`

export function enterpriseLabel(id: string) {
  return FARM_ENTERPRISES.find((item) => item.id === id)?.label || id
}

export function cropLabel(id: string) {
  return CROP_OPTIONS.find((item) => item.id === id)?.label || id
}

export function livestockEnterprises(enterprises: string[]) {
  return enterprises.filter((id) => id !== "crops")
}

export function readPendingFarm(): PendingFarm | null {
  try {
    const raw = sessionStorage.getItem(PENDING_FARM_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as PendingFarm
    if (!parsed || typeof parsed.name !== "string") return null
    return {
      name: parsed.name,
      location: parsed.location || "",
      enterprises: Array.isArray(parsed.enterprises) ? parsed.enterprises : [],
      crops: Array.isArray(parsed.crops) ? parsed.crops : [],
    }
  } catch {
    return null
  }
}

export function writePendingFarm(profile: PendingFarm) {
  sessionStorage.setItem(PENDING_FARM_KEY, JSON.stringify(profile))
}

export function clearPendingFarm() {
  sessionStorage.removeItem(PENDING_FARM_KEY)
}

export function readStoredCrops(id?: string): string[] {
  try {
    const raw = (id && localStorage.getItem(cropsKey(id))) || localStorage.getItem(cropsKey("current"))
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : []
  } catch {
    return []
  }
}

export function writeStoredCrops(id: string | undefined, crops: string[]) {
  try {
    const key = cropsKey(id || "current")
    localStorage.setItem(key, JSON.stringify(crops))
    if (id && id !== "current") localStorage.setItem(cropsKey("current"), JSON.stringify(crops))
  } catch {
    // The in-memory farm still keeps the crop list.
  }
}

export function enabledEnterprisesForProfile(enterprises: string[]) {
  const livestock = livestockEnterprises(enterprises)
  if (livestock.length) return livestock
  if (enterprises.includes("crops")) return ["crops"]
  return ["poultry"]
}

export function farmFocusLine(enterprises: string[] | undefined, crops: string[] | undefined) {
  const parts = (enterprises || [])
    .filter((id) => id !== "crops")
    .map(enterpriseLabel)
  if ((crops || []).length) {
    parts.push(crops!.map(cropLabel).join(", "))
  } else if ((enterprises || []).includes("crops")) {
    parts.push("Crops")
  }
  if (!parts.length) return "Monitor your farm operations and key metrics"
  return parts.join(" · ")
}
