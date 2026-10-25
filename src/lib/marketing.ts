export type FeaturePage = {
  slug: string
  enterpriseId: string
  title: string
  eyebrow: string
  headline: string
  description: string
  keywords: string[]
  summary: string
  outcomes: { title: string; body: string }[]
  records: string[]
}

export const FEATURE_PAGES: FeaturePage[] = [
  {
    slug: "poultry",
    enterpriseId: "poultry",
    title: "Poultry farm management software",
    eyebrow: "Poultry",
    headline: "Batches, pens, and egg collection in one workspace.",
    description:
      "Track layers, broilers, egg grades, feed, and treatments in Agrocyms. Built for poultry houses that also keep other livestock or crops.",
    keywords: [
      "poultry farm management software",
      "egg collection tracking",
      "layer farm records",
      "broiler batch tracking",
    ],
    summary:
      "Poultry work is daily and detailed. Agrocyms keeps bird batches, egg grades, feed use, and medicine on the same farm record so the morning round does not split across notebooks.",
    outcomes: [
      {
        title: "Egg collection by grade",
        body: "Record daily collections with shift, pen, grade, and quantity. Grade mix stays visible instead of living in a separate sheet.",
      },
      {
        title: "Batches that stay identifiable",
        body: "Breed, age, pen, and health sit on the flock they belong to, so staff can pick up a house without a long handover.",
      },
      {
        title: "Feed and treatments beside the birds",
        body: "Stock levels and medicine use stay attached to the same farm, not a second app that only the manager can find.",
      },
    ],
    records: [
      "Bird batches and pen location",
      "Daily egg collection and grade mix",
      "Feed stock and consumption",
      "Vaccinations and treatments",
      "Production reports for the house",
    ],
  },
  {
    slug: "goats-sheep",
    enterpriseId: "small_ruminants",
    title: "Goat and sheep farm software",
    eyebrow: "Goats & sheep",
    headline: "Flock events without crowding the poultry pages.",
    description:
      "Record births, weights, weaning, sales, and mortality for goats and sheep. Agrocyms shows small ruminants only when this farm keeps them.",
    keywords: [
      "goat farm management software",
      "sheep flock records",
      "small ruminant tracking",
      "goat birth and weight records",
    ],
    summary:
      "Mixed farms often add goats or sheep later. Agrocyms keeps those flock events on their own pages so poultry or crop records stay uncluttered.",
    outcomes: [
      {
        title: "Births, weaning, and weights",
        body: "Log the events that matter for a flock without forcing cattle or pig fields onto the same form.",
      },
      {
        title: "Sales and mortality in context",
        body: "Animals leaving the flock stay attached to the paddock and farm they came from.",
      },
      {
        title: "A menu that matches the animals",
        body: "If this farm does not keep small ruminants, those pages stay out of the way.",
      },
    ],
    records: [
      "Goat and sheep species",
      "Birth and weaning events",
      "Weight checks",
      "Sales and mortality",
      "Paddock-level notes",
    ],
  },
  {
    slug: "cattle",
    enterpriseId: "cattle",
    title: "Cattle herd management software",
    eyebrow: "Cattle",
    headline: "Herd records, milk, calving, and sales in one place.",
    description:
      "Keep cattle events with the rest of the farm. Agrocyms tracks calving, milk, weights, and sales alongside poultry, crops, or other livestock.",
    keywords: [
      "cattle herd management software",
      "calving records",
      "milk production tracking",
      "cattle farm records",
    ],
    summary:
      "Cattle work is a different rhythm from layers or pigs. Agrocyms gives the herd its own records while still sitting inside the same farm login.",
    outcomes: [
      {
        title: "Calving and milk on the herd",
        body: "Events stay on the cattle module instead of being squeezed into a poultry-shaped form.",
      },
      {
        title: "Weights and sales",
        body: "Growth and animals leaving the kraal are recorded against the same farm workspace.",
      },
      {
        title: "Shared staff access",
        body: "Managers and workers sign in to the same farm and see the enterprises this place actually runs.",
      },
    ],
    records: [
      "Herd and kraal records",
      "Calving events",
      "Milk entries",
      "Weight and sale events",
      "Mortality",
    ],
  },
  {
    slug: "pigs",
    enterpriseId: "pigs",
    title: "Pig farm management software",
    eyebrow: "Pigs",
    headline: "Sties, farrowing, growth, and sales without a second system.",
    description:
      "Track farrowing, weaning, weights, and sales for pigs. Agrocyms keeps swine records on mixed farms that also raise birds, ruminants, or crops.",
    keywords: [
      "pig farm management software",
      "farrowing records",
      "swine growth tracking",
      "pig sty management",
    ],
    summary:
      "Pig units need farrowing and growth events that do not belong on a layer form. Agrocyms keeps sties on their own pages inside the same farm.",
    outcomes: [
      {
        title: "Farrowing and weaning",
        body: "Litter events stay on the pig module, with housing named as sties rather than pens or kraals.",
      },
      {
        title: "Growth toward sale",
        body: "Weights and sales are recorded against the same farm so financial and production views can include the unit.",
      },
      {
        title: "Works next to other enterprises",
        body: "A farm that adds pigs later does not need a new product. The menu grows with the mix.",
      },
    ],
    records: [
      "Sty and group records",
      "Farrowing and weaning",
      "Weight checks",
      "Sales",
      "Mortality",
    ],
  },
  {
    slug: "crops",
    enterpriseId: "crops",
    title: "Crop farm record software",
    eyebrow: "Crops",
    headline: "Fields sit beside the flock and herd, not in another notebook.",
    description:
      "Record maize, rice, cassava, cocoa, and other crops on the same farm as livestock. Agrocyms keeps fields visible to the same team login.",
    keywords: [
      "crop farm management software",
      "farm field records",
      "maize farm records",
      "mixed crop and livestock software",
    ],
    summary:
      "Many farms grow food beside the animals. Agrocyms asks which crops belong here during setup so the dashboard is not livestock-only by default.",
    outcomes: [
      {
        title: "Crops chosen at setup",
        body: "Maize, rice, cassava, yam, vegetables, cocoa, and more can be named when the farm is created.",
      },
      {
        title: "One login for the mix",
        body: "Field work and livestock records share a farm account, so new staff see both without a second handover.",
      },
      {
        title: "Livestock-only farms stay clean",
        body: "If the farm does not grow crops, that can be recorded during signup and the menu stays focused.",
      },
    ],
    records: [
      "Farm-level crop list",
      "Maize, rice, cassava, yam, plantain",
      "Vegetables, cocoa, soybean, groundnut, sorghum",
      "Shared team access",
      "Dashboard shaped around the mix",
    ],
  },
]

export const FAQS = [
  {
    question: "What is Agrocyms?",
    answer:
      "Agrocyms is farm management software for mixed enterprises. It keeps poultry, goats and sheep, cattle, pigs, and crops on one farm workspace instead of splitting daily work across notebooks.",
  },
  {
    question: "Which farms can use Agrocyms?",
    answer:
      "Farms that raise poultry, small ruminants, cattle, pigs, crops, or any mix of those. During setup you choose the enterprises this farm actually runs, and the dashboard follows that mix.",
  },
  {
    question: "Does Agrocyms work for poultry and egg collection?",
    answer:
      "Yes. You can record bird batches, pens, daily egg collections by grade, feed stock, and treatments in the same farm account.",
  },
  {
    question: "Can I keep livestock and crops in one account?",
    answer:
      "Yes. Setup asks what you raise and what you grow. Livestock events and crop lists stay attached to the same farm so staff do not need two systems.",
  },
  {
    question: "How do staff sign in?",
    answer:
      "After the farm is created, team members sign in with their own accounts and see the same farm. Roles control who can manage users, records, and reports.",
  },
  {
    question: "How long does setup take?",
    answer:
      "A short signup names the farm, picks enterprises and crops, and creates the first account. The dashboard opens already pointed at that work.",
  },
  {
    question: "Is Agrocyms only for large farms?",
    answer:
      "No. It is built for farms that want daily records in one place, whether that is a layer house, a mixed livestock yard, or fields beside a flock.",
  },
  {
    question: "Can I skip setup if I already have an account?",
    answer:
      "Yes. Staff who already have logins can go straight to the login page and pick up the farm they belong to.",
  },
]

export function featureBySlug(slug: string): FeaturePage | undefined {
  return FEATURE_PAGES.find((item) => item.slug === slug)
}

export function featureByEnterprise(id: string): FeaturePage | undefined {
  return FEATURE_PAGES.find((item) => item.enterpriseId === id)
}
