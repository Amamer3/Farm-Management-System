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
      "eggs",
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
  {
    question: "Does Agrocyms track feed and medicine?",
    answer:
      "Yes. Feed stock and medicine use sit on the same farm as the animals they belong to, so inventory is not a separate notebook.",
  },
  {
    question: "Can one farm keep poultry and cattle together?",
    answer:
      "Yes. Setup lets you pick more than one enterprise. Poultry pages stay separate from cattle pages, but they share the same login and farm profile.",
  },
  {
    question: "Is Agrocyms a mobile app?",
    answer:
      "Agrocyms is a web workspace. It opens in a phone or desktop browser, so staff can sign in without installing a store app.",
  },
  {
    question: "What reports can I see?",
    answer:
      "The workspace includes production and inventory views for the enterprises this farm runs, so egg, herd, stock, and health records can be reviewed together.",
  },
]

export type UseCasePage = {
  slug: string
  title: string
  eyebrow: string
  headline: string
  description: string
  keywords: string[]
  summary: string
  problem: string
  approach: string
  outcomes: { title: string; body: string }[]
  relatedFeatures: string[]
  faqs: { question: string; answer: string }[]
}

export const USE_CASE_PAGES: UseCasePage[] = [
  {
    slug: "mixed-farm",
    title: "Mixed farm management software",
    eyebrow: "Mixed farms",
    headline: "Poultry, livestock, and crops without a second system.",
    description:
      "Agrocyms is mixed farm management software. Choose poultry, goats and sheep, cattle, pigs, and crops during setup so one login covers the farm you actually run.",
    keywords: [
      "mixed farm management software",
      "livestock and crop records",
      "multi enterprise farm software",
      "poultry and livestock dashboard",
    ],
    summary:
      "Many farms are not one enterprise. Agrocyms names the mix at signup, then shows only the animals and fields this place keeps.",
    problem:
      "A layer book, a herd notebook, and a crop list force staff to remember where each fact lives. New workers inherit that split.",
    approach:
      "During setup you pick poultry, small ruminants, cattle, pigs, crops, or a combination. The dashboard and menus follow that mix, and team accounts open the same farm.",
    outcomes: [
      {
        title: "One farm profile",
        body: "The workspace belongs to a named place, with enterprises and crops attached to it.",
      },
      {
        title: "Pages that match the animals",
        body: "Goat events do not land on a poultry form. Crop lists stay visible when this farm grows food.",
      },
      {
        title: "A shared login",
        body: "Managers and workers sign in to the same farm instead of handing around a single notebook.",
      },
    ],
    relatedFeatures: ["poultry", "goats-sheep", "cattle", "pigs", "crops"],
    faqs: [
      {
        question: "Can I add an enterprise later?",
        answer:
          "The farm profile records what you raise and grow. Start with the current mix; the product is built so extra enterprises sit beside the ones you already run.",
      },
      {
        question: "What if we only keep birds?",
        answer:
          "Choose poultry only. Livestock and crop pages stay out of the way until this farm needs them.",
      },
    ],
  },
  {
    slug: "egg-collection",
    title: "Egg collection tracking software",
    eyebrow: "Egg collection",
    headline: "Daily egg grades on the same farm as the flock.",
    description:
      "Record daily egg collection by shift, pen, grade, and quantity in Agrocyms. Built for layer houses that also keep feed, treatments, and other livestock in one workspace.",
    keywords: [
      "egg collection software",
      "daily egg records",
      "eggs",
      "layer farm egg tracking",
      "poultry egg grade records",
    ],
    summary:
      "Egg work is daily and easy to lose across sheets. Agrocyms keeps collection, grade mix, and the flock on the same farm record.",
    problem:
      "Morning counts often live in a book that never meets feed use or treatments. Grade mix gets guessed at the end of the week.",
    approach:
      "Poultry farms record collections with shift, pen, grade, and quantity. Those entries sit beside bird batches so the house stays identifiable.",
    outcomes: [
      {
        title: "Grade mix you can review",
        body: "Daily collections stay attached to the farm, not a separate sheet that only one person understands.",
      },
      {
        title: "Pens and batches together",
        body: "The flock that laid the eggs is the same record the team uses for feed and health.",
      },
      {
        title: "Works on mixed farms",
        body: "If the same place keeps goats or maize, those pages stay in the same login.",
      },
    ],
    relatedFeatures: ["poultry"],
    faqs: [
      {
        question: "Can I record eggs by grade?",
        answer:
          "Yes. Collections can include grade and quantity so the mix is visible without a second spreadsheet.",
      },
      {
        question: "Does egg collection require a poultry-only farm?",
        answer:
          "No. Poultry can sit next to other enterprises. Egg pages appear when this farm raises birds.",
      },
    ],
  },
  {
    slug: "feed-inventory",
    title: "Farm feed and medicine inventory software",
    eyebrow: "Feed & medicine",
    headline: "Stock next to the animals that use it.",
    description:
      "Track farm feed inventory and medicine use in Agrocyms. Stock stays on the same workspace as poultry, livestock events, and reports.",
    keywords: [
      "farm feed inventory software",
      "livestock medicine records",
      "poultry feed tracking",
      "farm treatment log",
    ],
    summary:
      "Feed bags and treatments are easy to park in a store book the field team never opens. Agrocyms keeps stock on the farm the animals belong to.",
    problem:
      "When inventory lives apart from production, staff cannot see whether a house or herd still has feed or medicine without asking the person who holds the book.",
    approach:
      "Feed and medicine records sit in the same farm workspace as bird batches, egg collection, and livestock events. Team logins see the stock their role allows.",
    outcomes: [
      {
        title: "Feed on the farm record",
        body: "Stock and consumption stay attached to the same place as the animals they feed.",
      },
      {
        title: "Treatments in context",
        body: "Medicine use is recorded beside production, not in a folder that only the manager can find.",
      },
      {
        title: "Reports that include stock",
        body: "Inventory can be reviewed with production instead of being reconciled later.",
      },
    ],
    relatedFeatures: ["poultry", "cattle", "pigs"],
    faqs: [
      {
        question: "Is feed tracking only for poultry?",
        answer:
          "No. Feed and medicine sit at farm level, so cattle, pigs, and mixed enterprises can use the same stock records.",
      },
      {
        question: "Can staff see inventory?",
        answer:
          "Team members sign in to the same farm. Roles control who can manage records and reports.",
      },
    ],
  },
]

export const FEATURE_FAQS: Record<string, { question: string; answer: string }[]> = {
  poultry: [
    {
      question: "Does this include egg collection?",
      answer:
        "Yes. Daily collections can include shift, pen, grade, and quantity on the same farm as the flock.",
    },
    {
      question: "Can a poultry farm also keep crops or goats?",
      answer:
        "Yes. Choose those enterprises at setup. Poultry pages stay separate so the house records stay readable.",
    },
  ],
  "goats-sheep": [
    {
      question: "What flock events can I record?",
      answer: "Births, weaning, weights, sales, mortality, and paddock-level notes for goats and sheep.",
    },
    {
      question: "Will goat pages appear on a poultry-only farm?",
      answer: "No. Small ruminant pages stay hidden unless this farm keeps goats or sheep.",
    },
  ],
  cattle: [
    {
      question: "Can I record milk and calving?",
      answer: "Yes. Cattle events stay on the herd module, including calving, milk, weights, and sales.",
    },
    {
      question: "Does cattle software replace poultry records?",
      answer: "No. A mixed farm keeps both. Cattle pages do not overwrite layer or broiler forms.",
    },
  ],
  pigs: [
    {
      question: "Are pig housing names different?",
      answer: "Yes. Pig records use sties and group events such as farrowing and weaning.",
    },
    {
      question: "Can pigs sit next to crops?",
      answer: "Yes. Add both during setup. The dashboard shows the mix this farm runs.",
    },
  ],
  crops: [
    {
      question: "Which crops can I name?",
      answer:
        "Maize, rice, cassava, yam, plantain, vegetables, cocoa, soybean, groundnut, sorghum, and a livestock-only option if you grow none.",
    },
    {
      question: "Is this a full field operations suite?",
      answer:
        "Agrocyms keeps the farm-level crop list beside livestock records so staff see what this place grows. It is not a separate agronomy planner.",
    },
  ],
}

export type SearchEntry = {
  id: string
  title: string
  href: string
  description: string
  keywords: string[]
}

export function getPublicSearchIndex(): SearchEntry[] {
  return [
    {
      id: "home",
      title: "Home",
      href: "/",
      description: "Farm management software for poultry, livestock, and crops.",
      keywords: ["home", "agrocyms", "farm management"],
    },
    {
      id: "about",
      title: "About us",
      href: "/about",
      description: "How Agrocyms starts with the farm you have.",
      keywords: ["about", "company", "workspace"],
    },
    {
      id: "features",
      title: "Features",
      href: "/features",
      description: "Poultry, goats and sheep, cattle, pigs, and crops.",
      keywords: ["features", "product", "enterprises"],
    },
    ...FEATURE_PAGES.map((item) => ({
      id: item.slug,
      title: item.title,
      href: `/features/${item.slug}`,
      description: item.description,
      keywords: item.keywords,
    })),
    {
      id: "use-cases",
      title: "Use cases",
      href: "/use-cases",
      description: "How mixed farms, egg collection, and inventory use Agrocyms.",
      keywords: ["use cases", "examples"],
    },
    ...USE_CASE_PAGES.map((item) => ({
      id: item.slug,
      title: item.title,
      href: `/use-cases/${item.slug}`,
      description: item.description,
      keywords: item.keywords,
    })),
    {
      id: "faq",
      title: "FAQ",
      href: "/faq",
      description: "Answers about setup, enterprises, team logins, and records.",
      keywords: ["faq", "questions", "help"],
    },
    {
      id: "start",
      title: "Get started",
      href: "/get-started",
      description: "Create a farm account and choose enterprises.",
      keywords: ["signup", "setup", "get started"],
    },
    {
      id: "login",
      title: "Log in",
      href: "/login",
      description: "Sign in to an existing farm workspace.",
      keywords: ["login", "sign in"],
    },
    {
      id: "privacy",
      title: "Privacy",
      href: "/privacy",
      description: "How farm and account information is handled.",
      keywords: ["privacy"],
    },
    {
      id: "terms",
      title: "Terms",
      href: "/terms",
      description: "Terms for farm accounts and records.",
      keywords: ["terms"],
    },
  ]
}

function searchTokens(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean)
    .flatMap((word) => (word.endsWith("s") && word.length > 3 ? [word, word.slice(0, -1)] : [word]))
}

export function searchPublicPages(query: string): SearchEntry[] {
  const terms = searchTokens(query)
  const index = getPublicSearchIndex()
  if (!terms.length) return index
  return index.filter((item) => {
    const haystack = searchTokens([item.title, item.description, ...item.keywords].join(" "))
    return terms.some((term) => haystack.includes(term))
  })
}

export function useCaseBySlug(slug: string): UseCasePage | undefined {
  return USE_CASE_PAGES.find((item) => item.slug === slug)
}

export function featureBySlug(slug: string): FeaturePage | undefined {
  return FEATURE_PAGES.find((item) => item.slug === slug)
}

export function featureByEnterprise(id: string): FeaturePage | undefined {
  return FEATURE_PAGES.find((item) => item.enterpriseId === id)
}
