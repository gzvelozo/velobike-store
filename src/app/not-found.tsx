import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6">
      <p className="text-6xl font-bold text-stone-200">404</p>
      <h1 className="text-xl font-semibold text-stone-900">Page not found</h1>
      <p className="text-sm text-stone-500">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-4 rounded-xl bg-stone-900 px-8 py-3 text-sm font-semibold text-white transition hover:bg-stone-800"
      >
        Back to shop
      </Link>
    </div>
  );
}
