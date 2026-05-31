export interface Product {
  slug: string;
  name: string;
  brand: string;
  description: string;
  price: number; // cents
  category: string;
  image: string;
  hsaEligible: boolean;
  hsaReason: string;
}

export const products: Product[] = [
  {
    slug: "canyon-grail-cf",
    name: "Canyon Grail CF SLX 8",
    brand: "Canyon",
    description:
      "Premium gravel bike engineered for endurance riding. Carbon frame, Shimano GRX 800 groupset, and 700x40c tires for any terrain. Ideal for cardiovascular fitness and outdoor training.",
    price: 349900,
    category: "fitness-equipment",
    image: "/products/bike.svg",
    hsaEligible: true,
    hsaReason:
      "Qualifies as durable medical equipment for cardiovascular health improvement",
  },
  {
    slug: "garmin-edge-1050",
    name: "Garmin Edge 1050",
    brand: "Garmin",
    description:
      "Advanced GPS cycling computer with touchscreen display, turn-by-turn navigation, training metrics, and health monitoring. Tracks heart rate zones, VO2 max, and recovery time.",
    price: 59999,
    category: "health-monitoring",
    image: "/products/garmin.svg",
    hsaEligible: true,
    hsaReason:
      "Health monitoring device for tracking cardiovascular fitness metrics",
  },
  {
    slug: "ag1-athletic-greens",
    name: "AG1 by Athletic Greens",
    brand: "Athletic Greens",
    description:
      "Daily foundational nutrition supplement with 75 vitamins, minerals, and whole-food sourced nutrients. Supports gut health, immune function, energy, and recovery.",
    price: 7900,
    category: "supplements",
    image: "/products/supplement.svg",
    hsaEligible: true,
    hsaReason:
      "Nutritional supplement for metabolic health and immune support",
  },
  {
    slug: "theragun-pro",
    name: "Theragun PRO Plus",
    brand: "Therabody",
    description:
      "Professional-grade percussive therapy device with 5 attachments, Bluetooth connectivity, and OLED display. Designed for deep muscle treatment, pain relief, and recovery.",
    price: 39900,
    category: "recovery-devices",
    image: "/products/theragun.svg",
    hsaEligible: true,
    hsaReason:
      "Therapeutic device for musculoskeletal pain management and recovery",
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
