"use client";

import { useParams, useRouter } from "next/navigation";
import { getProduct, formatPrice } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { HsaBadge } from "@/components/HsaBadge";
import { useState } from "react";

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProduct(slug);
  const { addItem } = useCart();
  const router = useRouter();
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-lg text-gray-500">Product not found</p>
      </div>
    );
  }

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <button
        onClick={() => router.back()}
        className="mb-6 text-sm text-gray-500 hover:text-gray-700"
      >
        ← Back to shop
      </button>

      <div className="grid gap-10 md:grid-cols-2">
        {/* Product image */}
        <div className="flex items-center justify-center rounded-2xl bg-gray-100 p-12">
          <div className="text-9xl">
            {product.category === "fitness-equipment" && "🚴"}
            {product.category === "health-monitoring" && "📡"}
            {product.category === "supplements" && "🥤"}
            {product.category === "recovery-devices" && "💆"}
          </div>
        </div>

        {/* Product details */}
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-gray-400">
            {product.brand}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="mt-4 text-lg text-gray-600">{product.description}</p>

          <p className="mt-6 text-3xl font-bold text-gray-900">
            {formatPrice(product.price)}
          </p>

          {product.hsaEligible && (
            <div className="mt-4">
              <HsaBadge />
            </div>
          )}

          <button
            onClick={handleAdd}
            className={`mt-6 w-full rounded-lg py-3 text-lg font-semibold text-white transition ${
              added
                ? "bg-emerald-600"
                : "bg-gray-900 hover:bg-gray-800"
            }`}
          >
            {added ? "✓ Added to Cart" : "Add to Cart"}
          </button>

          {product.hsaEligible && (
            <p className="mt-3 text-center text-xs text-gray-500">
              You&apos;ll be asked to complete a short health survey after checkout,
              reviewed by a licensed provider
            </p>
          )}

          <div className="mt-8 rounded-lg bg-gray-50 p-4">
            <h3 className="text-sm font-semibold text-gray-700">HSA/FSA Eligibility</h3>
            <p className="mt-1 text-sm text-gray-500">{product.hsaReason}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
