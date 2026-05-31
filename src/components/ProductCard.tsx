"use client";

import Link from "next/link";
import { Product, formatPrice, categoryMeta, type CategoryKey } from "@/lib/products";
import { HsaBadge } from "./HsaBadge";
import { ProductIllustration } from "./icons/ProductIllustration";

export function ProductCard({ product }: { product: Product }) {
  const meta = categoryMeta[product.category as CategoryKey];

  return (
    <Link
      href={`/products/${product.slug}`}
      className="product-card group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-200/60 transition-all hover:shadow-lg hover:ring-stone-300/80"
    >
      <div className={`relative flex h-56 items-center justify-center bg-gradient-to-br ${meta?.gradient || "from-stone-800 to-stone-700"} p-8`}>
        <ProductIllustration slug={product.slug} className="product-image h-28 w-28 text-white/70" />
        {product.hsaEligible && (
          <span className="absolute left-3 top-3 rounded-full bg-emerald-500/90 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
            HSA/FSA
          </span>
        )}
        {meta && (
          <span className={`absolute right-3 top-3 text-[10px] font-bold uppercase tracking-widest ${meta.accent} opacity-60`}>
            {meta.label}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-stone-400">
          {product.brand}
        </p>
        <h3 className="mt-1.5 text-[15px] font-semibold leading-snug text-stone-900 group-hover:text-emerald-700 transition-colors">
          {product.name}
        </h3>
        <p className="mt-1 text-xs text-stone-400">{product.tagline}</p>
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-stone-100">
          <p className="text-lg font-bold text-stone-900">
            {formatPrice(product.price)}
          </p>
          {product.hsaEligible && <HsaBadge compact />}
        </div>
      </div>
    </Link>
  );
}
