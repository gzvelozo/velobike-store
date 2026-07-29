import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-stone-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-800 to-emerald-900/40" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 ring-1 ring-emerald-500/20">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-medium text-emerald-400">HSA / FSA Eligible</span>
            </div>
            <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight md:text-6xl">
              Feel better.
              <br />
              <span className="bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
                Get reimbursed.
              </span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-stone-400">
              Premium supplements, adaptogens & foundational nutrition — eligible
              for HSA/FSA reimbursement when you qualify through VeloMED.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#products"
                className="btn-press group inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-stone-900 shadow-lg shadow-white/10 transition hover:bg-stone-50"
              >
                Shop now
                <svg className="h-4 w-4 transition-transform group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                </svg>
              </a>
              <span className="text-sm text-stone-500">
                Test mode · No real charges
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* How it works strip */}
      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-stone-100 px-6 md:grid-cols-3 md:divide-x md:divide-y-0">
          {[
            { num: "01", title: "Pay with any card", desc: "Complete checkout normally — no HSA card needed" },
            { num: "02", title: "Quick health survey", desc: "2-min survey reviewed by a licensed provider" },
            { num: "03", title: "Get reimbursed", desc: "Receive your LMN and submit to your HSA admin" },
          ].map((step) => (
            <div key={step.num} className="flex items-start gap-4 py-6 md:px-6 first:md:pl-0 last:md:pr-0">
              <span className="text-2xl font-bold text-stone-200">{step.num}</span>
              <div>
                <p className="text-sm font-semibold text-stone-900">{step.title}</p>
                <p className="mt-0.5 text-xs text-stone-500">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Products */}
      <section id="products" className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-stone-900">
              Featured Products
            </h2>
            <p className="mt-2 text-sm text-stone-500">
              Every product is eligible for HSA/FSA reimbursement with a qualified LMN
            </p>
          </div>
          <p className="text-xs text-stone-400">{products.length} products</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-t border-stone-200 bg-stone-50/50">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 px-6 py-12 md:grid-cols-4">
          {[
            { value: "HIPAA", label: "Compliant" },
            { value: "100%", label: "Licensed providers" },
            { value: "<24h", label: "Typical review" },
            { value: "Free", label: "Shipping" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-stone-900">{stat.value}</p>
              <p className="mt-1 text-xs text-stone-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
