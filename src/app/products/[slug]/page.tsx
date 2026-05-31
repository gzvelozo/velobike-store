"use client";

import { useParams, useRouter } from "next/navigation";
import { getProduct, formatPrice, products, categoryMeta, type CategoryKey } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { HsaBadge } from "@/components/HsaBadge";
import { ProductCard } from "@/components/ProductCard";
import { ProductIllustration } from "@/components/icons/ProductIllustration";
import { useState } from "react";
import Link from "next/link";

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
  const meta = categoryMeta[product.category as CategoryKey];

  return (
    <>
      <div className="mx-auto max-w-6xl px-6 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-stone-400">
          <Link href="/" className="transition hover:text-stone-600">Shop</Link>
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
          <span className="text-stone-600">{product.name}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Product image */}
          <div className={`relative flex items-center justify-center rounded-3xl bg-gradient-to-br ${meta?.gradient || "from-stone-800 to-stone-700"} p-16`}>
            <ProductIllustration slug={product.slug} className="h-48 w-48 text-white/60" />
            {meta && (
              <span className={`absolute right-5 top-5 text-[10px] font-bold uppercase tracking-widest ${meta.accent} opacity-50`}>
                {meta.label}
              </span>
            )}
          </div>

          {/* Product details */}
          <div className="flex flex-col justify-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">
              {product.brand}
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-stone-900 lg:text-4xl">
              {product.name}
            </h1>
            <p className="mt-1 text-sm text-stone-400">{product.tagline}</p>
            <p className="mt-5 text-base leading-relaxed text-stone-500">
              {product.description}
            </p>

            {/* Specs chips */}
            {product.specs && product.specs.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {product.specs.map((spec) => (
                  <span key={spec} className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600">
                    {spec}
                  </span>
                ))}
              </div>
            )}

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
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-stone-200 pt-8">
              {[
                { icon: "🏥", title: "Medical eligibility", desc: product.hsaReason },
                { icon: "🚚", title: "Free shipping", desc: "3-5 business days" },
                { icon: "↩️", title: "30-day returns", desc: "Hassle-free" },
              ].map((detail) => (
                <div key={detail.title} className="text-center">
                  <span className="text-xl">{detail.icon}</span>
                  <p className="mt-2 text-xs font-semibold text-stone-700">{detail.title}</p>
                  <p className="mt-0.5 text-[11px] text-stone-400 line-clamp-2">{detail.desc}</p>
                </div>
              ))}
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
