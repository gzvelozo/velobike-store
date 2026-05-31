"use client";

import Link from "next/link";
import { Product, formatPrice } from "@/lib/products";
import { HsaBadge } from "./HsaBadge";

const categoryEmoji: Record<string, string> = {
  "fitness-equipment": "🚴‍♂️",
  "health-monitoring": "⌚",
  supplements: "🧬",
  "recovery-devices": "🔋",
};

const categoryBg: Record<string, string> = {
  "fitness-equipment": "from-stone-100 to-stone-50",
  "health-monitoring": "from-sky-50 to-stone-50",
  supplements: "from-lime-50 to-stone-50",
  "recovery-devices": "from-amber-50 to-stone-50",
};

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="product-card group block overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-200/60 transition-all hover:shadow-md hover:ring-stone-300"
    >
      <div className={`relative flex h-56 items-center justify-center bg-gradient-to-b ${categoryBg[product.category] || "from-stone-100 to-stone-50"} p-8`}>
        <span className="product-image text-7xl">
          {categoryEmoji[product.category] || "📦"}
        </span>
        {product.hsaEligible && (
          <span className="absolute left-3 top-3 rounded-full bg-emerald-600 px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm">
            HSA/FSA
          </span>
        )}
      </div>
      <div className="p-5">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-stone-400">
          {product.brand}
        </p>
        <h3 className="mt-1.5 text-[15px] font-semibold leading-snug text-stone-900 group-hover:text-emerald-700 transition-colors">
          {product.name}
        </h3>
        <p className="mt-2 text-[13px] leading-relaxed text-stone-500 line-clamp-2">
          {product.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-lg font-bold text-stone-900">
            {formatPrice(product.price)}
          </p>
          {product.hsaEligible && <HsaBadge compact />}
        </div>
      </div>
    </Link>
  );
}
