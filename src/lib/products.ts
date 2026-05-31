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
  | "fitness-equipment"
  | "health-monitoring"
  | "supplements"
  | "recovery-devices";

export const categoryMeta: Record<
  CategoryKey,
  { label: string; gradient: string; accent: string; icon: string }
> = {
  "fitness-equipment": {
    label: "Bikes",
    gradient: "from-stone-800 to-stone-700",
    accent: "text-emerald-400",
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z",
  },
  "health-monitoring": {
    label: "Tech",
    gradient: "from-slate-800 to-slate-700",
    accent: "text-sky-400",
    icon: "",
  },
  supplements: {
    label: "Nutrition",
    gradient: "from-emerald-800 to-emerald-700",
    accent: "text-lime-300",
    icon: "",
  },
  "recovery-devices": {
    label: "Recovery",
    gradient: "from-amber-800 to-amber-700",
    accent: "text-amber-300",
    icon: "",
  },
};

export const products: Product[] = [
  {
    slug: "canyon-grail-cf",
    name: "Canyon Grail CF SLX 8",
    brand: "Canyon",
    tagline: "Conquer any terrain",
    description:
      "Premium gravel bike engineered for endurance riding. Carbon frame, Shimano GRX 800 groupset, and 700x40c tires for any terrain. Ideal for cardiovascular fitness and outdoor training.",
    price: 349900,
    category: "fitness-equipment",
    image: "/products/bike.svg",
    hsaEligible: true,
    hsaReason:
      "Qualifies as durable medical equipment for cardiovascular health improvement",
    specs: ["Carbon frame", "Shimano GRX 800", "700×40c tires", "8.2 kg"],
  },
  {
    slug: "garmin-edge-1050",
    name: "Garmin Edge 1050",
    brand: "Garmin",
    tagline: "Train smarter",
    description:
      "Advanced GPS cycling computer with touchscreen display, turn-by-turn navigation, training metrics, and health monitoring. Tracks heart rate zones, VO2 max, and recovery time.",
    price: 59999,
    category: "health-monitoring",
    image: "/products/garmin.svg",
    hsaEligible: true,
    hsaReason:
      "Health monitoring device for tracking cardiovascular fitness metrics",
    specs: ["3.5″ touchscreen", "GPS + GLONASS", "VO2 max tracking", "20h battery"],
  },
  {
    slug: "ag1-athletic-greens",
    name: "AG1 by Athletic Greens",
    brand: "Athletic Greens",
    tagline: "Daily foundation",
    description:
      "Daily foundational nutrition supplement with 75 vitamins, minerals, and whole-food sourced nutrients. Supports gut health, immune function, energy, and recovery.",
    price: 7900,
    category: "supplements",
    image: "/products/supplement.svg",
    hsaEligible: true,
    hsaReason:
      "Nutritional supplement for metabolic health and immune support",
    specs: ["75 ingredients", "Probiotics", "Adaptogens", "30-day supply"],
  },
  {
    slug: "theragun-pro",
    name: "Theragun PRO Plus",
    brand: "Therabody",
    tagline: "Recover faster",
    description:
      "Professional-grade percussive therapy device with 5 attachments, Bluetooth connectivity, and OLED display. Designed for deep muscle treatment, pain relief, and recovery.",
    price: 39900,
    category: "recovery-devices",
    image: "/products/theragun.svg",
    hsaEligible: true,
    hsaReason:
      "Therapeutic device for musculoskeletal pain management and recovery",
    specs: ["5 attachments", "60 lb force", "OLED display", "Bluetooth"],
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
