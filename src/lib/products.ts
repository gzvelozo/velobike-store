export interface Product {
  slug: string;
  name: string;
  brand: string;
  tagline: string;
  description: string;
  price: number; // cents
  category: string;
  image: string;
  hsaEligible: boolean;
  hsaReason: string;
  specs: string[];
}

export type CategoryKey =
  | "foundational-nutrition"
  | "sleep-recovery"
  | "stress-adaptogens"
  | "heart-cognitive";

export const categoryMeta: Record<
  CategoryKey,
  { label: string; gradient: string; accent: string; icon: string }
> = {
  "foundational-nutrition": {
    label: "Foundational",
    gradient: "from-emerald-800 to-emerald-700",
    accent: "text-lime-300",
    icon: "",
  },
  "sleep-recovery": {
    label: "Sleep & Recovery",
    gradient: "from-indigo-800 to-indigo-700",
    accent: "text-indigo-300",
    icon: "",
  },
  "stress-adaptogens": {
    label: "Stress & Adaptogens",
    gradient: "from-amber-800 to-amber-700",
    accent: "text-amber-300",
    icon: "",
  },
  "heart-cognitive": {
    label: "Heart & Cognitive",
    gradient: "from-rose-800 to-rose-700",
    accent: "text-rose-300",
    icon: "",
  },
};

export const products: Product[] = [
  {
    slug: "ag1-athletic-greens",
    name: "AG1 by Athletic Greens",
    brand: "Athletic Greens",
    tagline: "Daily foundational nutrition",
    description:
      "Daily foundational nutrition powder with 75 vitamins, minerals, whole-food sourced nutrients, probiotics and adaptogens. Supports gut health, immune function, energy, and micronutrient adequacy in patients with chronic fatigue, digestive disorders, or malabsorption conditions.",
    price: 7900,
    category: "foundational-nutrition",
    image: "/products/ag1.svg",
    hsaEligible: true,
    hsaReason:
      "Nutritional supplement for diagnosed micronutrient deficiency, chronic fatigue, digestive disorders, or immune dysfunction — HSA/FSA eligible with LMN per IRS Pub 502",
    specs: ["75 whole-food ingredients", "Probiotics + prebiotics", "Adaptogens", "30-day supply"],
  },
  {
    slug: "magnesium-glycinate",
    name: "Magnesium Glycinate 200mg",
    brand: "PureLab Wellness",
    tagline: "Sleep, muscle recovery, stress support",
    description:
      "Highly bioavailable chelated magnesium bisglycinate for patients with diagnosed magnesium deficiency, insomnia, restless legs, muscle cramps, chronic stress, or migraine prophylaxis. Gentle on the stomach — no laxative effect. USP verified.",
    price: 3499,
    category: "sleep-recovery",
    image: "/products/magnesium.svg",
    hsaEligible: true,
    hsaReason:
      "Mineral supplement for diagnosed magnesium deficiency, chronic insomnia, restless leg syndrome, or migraine — HSA/FSA eligible with LMN per IRS Pub 502",
    specs: ["200mg chelated form", "USP verified", "Non-GMO · vegan", "60 capsules · 60-day supply"],
  },
  {
    slug: "ashwagandha-ksm66",
    name: "Ashwagandha KSM-66 600mg",
    brand: "PureLab Wellness",
    tagline: "Adaptogenic stress & cortisol support",
    description:
      "Clinical-grade KSM-66 ashwagandha root extract, standardized to 5% withanolides. Supports patients with diagnosed chronic stress, adrenal fatigue, HPA-axis dysregulation, or generalized anxiety. Backed by 24 clinical trials.",
    price: 4200,
    category: "stress-adaptogens",
    image: "/products/ashwagandha.svg",
    hsaEligible: true,
    hsaReason:
      "Adaptogenic supplement for diagnosed chronic stress, adrenal dysfunction, or generalized anxiety — HSA/FSA eligible with LMN when clinically indicated per IRS Pub 502",
    specs: ["600mg KSM-66 extract", "5% withanolides", "Clinical-grade", "60 capsules · 30-day supply"],
  },
  {
    slug: "omega3-triple-strength",
    name: "Omega-3 Triple Strength 1500mg",
    brand: "PureLab Wellness",
    tagline: "Cardiovascular & cognitive support",
    description:
      "IFOS 5-star certified triple-strength omega-3 fish oil with 1500mg EPA + DHA per serving. Molecularly distilled for purity. Indicated for patients with diagnosed cardiovascular risk factors, hypertriglyceridemia, cognitive decline, or inflammatory conditions.",
    price: 2999,
    category: "heart-cognitive",
    image: "/products/omega3.svg",
    hsaEligible: true,
    hsaReason:
      "Essential fatty acid supplement for diagnosed hypertriglyceridemia, cardiovascular disease, cognitive impairment, or chronic inflammation — HSA/FSA eligible with LMN per IRS Pub 502",
    specs: ["1500mg EPA + DHA", "IFOS 5-star certified", "Molecularly distilled", "60 softgels · 30-day supply"],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}
