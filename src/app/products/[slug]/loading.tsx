export default function ProductLoading() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      {/* Breadcrumb skeleton */}
      <div className="mb-8 flex items-center gap-2">
        <div className="h-4 w-12 animate-pulse rounded bg-stone-200" />
        <div className="h-4 w-4 animate-pulse rounded bg-stone-100" />
        <div className="h-4 w-32 animate-pulse rounded bg-stone-200" />
      </div>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Image skeleton */}
        <div className="flex items-center justify-center rounded-3xl bg-stone-200 p-16 animate-pulse">
          <div className="h-48 w-48 rounded-xl bg-stone-300" />
        </div>

        {/* Details skeleton */}
        <div className="flex flex-col justify-center gap-4">
          <div className="h-3 w-20 animate-pulse rounded bg-stone-200" />
          <div className="h-8 w-3/4 animate-pulse rounded bg-stone-200" />
          <div className="h-4 w-1/3 animate-pulse rounded bg-stone-100" />
          <div className="mt-2 space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-stone-100" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-stone-100" />
            <div className="h-4 w-4/6 animate-pulse rounded bg-stone-100" />
          </div>
          <div className="mt-4 h-10 w-32 animate-pulse rounded bg-stone-200" />
          <div className="mt-4 h-14 w-full animate-pulse rounded-xl bg-stone-200" />
        </div>
      </div>
    </div>
  );
}
