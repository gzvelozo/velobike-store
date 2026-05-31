"use client";

import { useParams, useRouter } from "next/navigation";
import { getProduct, formatPrice, products } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { HsaBadge } from "@/components/HsaBadge";
import { ProductCard } from "@/components/ProductCard";
import { useState } from "react";
import Link from "next/link";

const categoryEmoji: Record<string, string> = {
  "fitness-equipment": "🚴‍♂️",
  "health-monitoring": "⌚",
  supplements: "🧬",
  "recovery-devices": "🔋",
};

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProduct(slug);
  const { addItem } = useCart();
  const router = useRouter();
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <p className="text-5xl">🔍</p>
        <p className="text-lg font-medium text-stone-600">Product not found</p>
        <Link href="/" className="text-sm text-emerald-700 underline underline-offset-2">
          Back to shop
        </Link>
      </div>
    );
  }

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const otherProducts = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <>
      <div className="mx-auto max-w-6xl px-6 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-stone-400">
          <Link href="/" className="transition hover:text-stone-600">Shop</Link>
          <span>/</span>
          <span className="text-stone-600">{product.name}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Product image */}
          <div className="flex items-center justify-center rounded-3xl bg-gradient-to-b from-stone-100 to-stone-50 p-16">
            <span className="text-[120px] drop-shadow-sm">
              {categoryEmoji[product.category] || "📦"}
            </span>
          </div>

          {/* Product details */}
          <div className="flex flex-col justify-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">
              {product.brand}
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-stone-900 lg:text-4xl">
              {product.name}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-stone-500">
              {product.description}
            </p>

            <div className="mt-8 flex items-baseline gap-3">
              <span className="text-3xl font-bold text-stone-900">
                {formatPrice(product.price)}
              </span>
              {product.hsaEligible && (
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                  HSA/FSA eligible
                </span>
              )}
            </div>

            {product.hsaEligible && (
              <div className="mt-6">
                <HsaBadge />
              </div>
            )}

            <button
              onClick={handleAdd}
              className={`btn-press mt-8 w-full rounded-xl py-4 text-base font-semibold transition ${
                added
                  ? "bg-emerald-600 text-white"
                  : "bg-stone-900 text-white hover:bg-stone-800"
              }`}
            >
              {added ? "✓ Added to bag" : "Add to bag"}
            </button>

            {added && (
              <button
                onClick={() => router.push("/cart")}
                className="mt-3 w-full rounded-xl border border-stone-200 py-3 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
              >
                View bag & checkout →
              </button>
            )}

            {/* Details */}
            <div className="mt-10 space-y-4 border-t border-stone-200 pt-8">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 text-lg">🏥</span>
                <div>
                  <p className="text-sm font-medium text-stone-800">Medical eligibility</p>
                  <p className="text-sm text-stone-500">{product.hsaReason}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 text-lg">🚚</span>
                <div>
                  <p className="text-sm font-medium text-stone-800">Free shipping</p>
                  <p className="text-sm text-stone-500">Estimated delivery in 3-5 business days</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 text-lg">↩️</span>
                <div>
                  <p className="text-sm font-medium text-stone-800">30-day returns</p>
                  <p className="text-sm text-stone-500">Hassle-free returns on all orders</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related products */}
      {otherProducts.length > 0 && (
        <section className="border-t border-stone-200 bg-stone-50/50">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <h2 className="mb-8 text-xl font-bold text-stone-900">You might also like</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {otherProducts.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
