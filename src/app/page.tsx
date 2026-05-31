import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Premium Cycling & Wellness
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Performance gear eligible for HSA/FSA reimbursement through VeloMED
        </p>
        <div className="mx-auto mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-800">
          <svg className="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Buy now, get reimbursed through your HSA/FSA after qualification
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
