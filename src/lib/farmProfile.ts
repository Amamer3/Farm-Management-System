export const PENDING_FARM_KEY = "agrocyms.pendingFarm"
export const SIGNUP_DRAFT_KEY = "agrocyms.signupDraft"

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

export type SignupDraft = {
  step: number
  enterprises: string[]
  crops: string[]
  noCrops: boolean
  farmName: string
  location: string
  ownerName: string
  email: string
}

const SIGNUP_STEP_COUNT = 4

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string")
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

export function readSignupDraft(): SignupDraft | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(SIGNUP_DRAFT_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<SignupDraft> & Record<string, unknown>
    if (!parsed || typeof parsed !== "object") return null

    const step = typeof parsed.step === "number" && Number.isInteger(parsed.step)
      ? Math.min(Math.max(parsed.step, 0), SIGNUP_STEP_COUNT - 1)
      : 0

    return {
      step,
      enterprises: isStringArray(parsed.enterprises) ? parsed.enterprises : [],
      crops: isStringArray(parsed.crops) ? parsed.crops : [],
      noCrops: Boolean(parsed.noCrops),
      farmName: typeof parsed.farmName === "string" ? parsed.farmName : "",
      location: typeof parsed.location === "string" ? parsed.location : "",
      ownerName: typeof parsed.ownerName === "string" ? parsed.ownerName : "",
      email: typeof parsed.email === "string" ? parsed.email : "",
    }
  } catch {
    return null
  }
}

export function writeSignupDraft(draft: SignupDraft) {
  if (typeof window === "undefined") return
  try {
    const safeDraft: SignupDraft = {
      step: Math.min(Math.max(draft.step, 0), SIGNUP_STEP_COUNT - 1),
      enterprises: draft.enterprises,
      crops: draft.noCrops ? [] : draft.crops,
      noCrops: draft.noCrops,
      farmName: draft.farmName,
      location: draft.location,
      ownerName: draft.ownerName,
      email: draft.email,
    }
    localStorage.setItem(SIGNUP_DRAFT_KEY, JSON.stringify(safeDraft))
  } catch {
    // Signup can continue without a persisted draft.
  }
}

export function clearSignupDraft() {
  if (typeof window === "undefined") return
  try {
    localStorage.removeItem(SIGNUP_DRAFT_KEY)
  } catch {
    // Ignore storage failures when clearing.
  }
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

export function farmFocusLine(
  enterprises: string[] | undefined,
  crops: string[] | undefined,
  labelEnterprise: (id: string) => string = enterpriseLabel,
  labelCrop: (id: string) => string = cropLabel,
) {
  const parts = (enterprises || [])
    .filter((id) => id !== "crops")
    .map(labelEnterprise)
  if ((crops || []).length) {
    parts.push(crops!.map(labelCrop).join(", "))
  } else if ((enterprises || []).includes("crops")) {
    parts.push(labelEnterprise("crops"))
  }
  if (!parts.length) return ""
  return parts.join(" · ")
}
