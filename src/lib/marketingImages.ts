export const MARKETING_PHOTOS = {
  poultry: { src: "/farm/poultry.jpg", alt: "Layer chickens in a poultry house used for egg collection records" },
  goats: { src: "/farm/goats.jpg", alt: "Goats in a paddock on a mixed livestock farm" },
  cattle: { src: "/farm/cattle.jpg", alt: "Cattle in a kraal kept on herd management records" },
  pigs: { src: "/farm/pigs.jpg", alt: "Young pigs in a farm sty for farrowing and growth records" },
  crops: { src: "/landing/field.jpg", alt: "Maize crop field at sunrise on a working farm" },
  produce: { src: "/landing/produce.jpg", alt: "Mixed farm with cattle and chickens beside crop production" },
  farmer: { src: "/farm/farmer.jpg", alt: "Farmer reviewing crop records on a tablet in a maize field" },
  mixed: { src: "/farm/mixed.jpg", alt: "Aerial view of crop fields and pasture on a mixed farm" },
} as const

export type MarketingPhotoId = keyof typeof MARKETING_PHOTOS

export const FEATURE_PHOTO: Record<string, MarketingPhotoId> = {
  poultry: "poultry",
  "goats-sheep": "goats",
  cattle: "cattle",
  pigs: "pigs",
  crops: "crops",
}

export const ENTERPRISE_PHOTO: Record<string, MarketingPhotoId> = {
  poultry: "poultry",
  small_ruminants: "goats",
  cattle: "cattle",
  pigs: "pigs",
  crops: "crops",
}

export const USE_CASE_PHOTO: Record<string, MarketingPhotoId> = {
  "mixed-farm": "mixed",
  "egg-collection": "poultry",
  "feed-inventory": "produce",
}

const HREF_PHOTO: Record<string, MarketingPhotoId> = {
  "/features/crop-management": "crops",
  "/features/livestock-management": "cattle",
  "/use-cases/feed-inventory": "produce",
  "/use-cases/mixed-farm": "mixed",
  "/features": "farmer",
  "/get-started": "farmer",
}

export function marketingPhoto(id: MarketingPhotoId) {
  return MARKETING_PHOTOS[id]
}

export function photoForFeature(slug: string) {
  return MARKETING_PHOTOS[FEATURE_PHOTO[slug] ?? "mixed"]
}

export function photoForEnterprise(id: string) {
  return MARKETING_PHOTOS[ENTERPRISE_PHOTO[id] ?? "mixed"]
}

export function photoForUseCase(slug: string) {
  return MARKETING_PHOTOS[USE_CASE_PHOTO[slug] ?? "mixed"]
}

export function photoForHref(href: string) {
  return MARKETING_PHOTOS[HREF_PHOTO[href] ?? "mixed"]
}

export function photoForResourceCategory(category: string) {
  switch (category) {
    case "Crop farming":
      return MARKETING_PHOTOS.crops
    case "Livestock farming":
      return MARKETING_PHOTOS.cattle
    case "Farm records and inventory":
      return MARKETING_PHOTOS.produce
    case "Agricultural business management":
    case "Digital agriculture":
      return MARKETING_PHOTOS.farmer
    default:
      return MARKETING_PHOTOS.mixed
  }
}
