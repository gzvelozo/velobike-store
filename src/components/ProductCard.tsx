"use client";

import Link from "next/link";
import { Product, formatPrice } from "@/lib/products";
import { HsaBadge } from "./HsaBadge";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:shadow-lg"
    >
      <div className="flex h-48 items-center justify-center bg-gray-100 p-6">
        <div className="text-6xl">
          {product.category === "fitness-equipment" && "🚴"}
          {product.category === "health-monitoring" && "📡"}
          {product.category === "supplements" && "🥤"}
          {product.category === "recovery-devices" && "💆"}
        </div>
      </div>
      <div className="p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
          {product.brand}
        </p>
        <h3 className="mt-1 text-lg font-semibold text-gray-900 group-hover:text-emerald-700">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">
          {product.description}
        </p>
        <p className="mt-3 text-xl font-bold text-gray-900">
          {formatPrice(product.price)}
        </p>
        {product.hsaEligible && (
          <div className="mt-3">
            <HsaBadge compact />
          </div>
        )}
      </div>
    </Link>
  );
}
