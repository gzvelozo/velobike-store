import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-stone-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-800 to-emerald-900/40" />
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
            HSA / FSA Eligible
          </p>
          <h1 className="mt-3 max-w-lg text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl">
            Ride better.
            <br />
            <span className="text-emerald-400">Get reimbursed.</span>
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-stone-300">
            Premium cycling, recovery & wellness gear — eligible for HSA/FSA
            reimbursement when you qualify through VeloMED.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#products"
              className="btn-press inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-stone-900 shadow transition hover:bg-stone-100"
            >
              Shop now
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* How it works strip */}
      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-6 text-center md:flex-row md:justify-between md:text-left">
          {[
            { icon: "💳", text: "Pay with any card" },
            { icon: "📋", text: "Quick health survey" },
            { icon: "📄", text: "Get your LMN for reimbursement" },
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-3">
              {i > 0 && (
                <svg className="hidden h-4 w-4 -ml-3 mr-1 text-stone-300 md:block" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              )}
              <span className="text-xl">{step.icon}</span>
              <span className="text-sm font-medium text-stone-700">{step.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Products */}
      <section id="products" className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10">
          <h2 className="text-2xl font-bold tracking-tight text-stone-900">
            Featured Products
          </h2>
          <p className="mt-2 text-sm text-stone-500">
            All products are eligible for HSA/FSA reimbursement with a qualified Letter of Medical Necessity
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
