import Link from "next/link";
import ProductCard from "../components/ProductCard";

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-50/70">
      {/* Page Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Link href="/dashboard" className="text-black">← Back to dashboard</Link>
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
            Catalog
          </p>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Our Products
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-gray-500 sm:text-base">
            Browse our latest collection and check live stock availability.
          </p>
        </div>
      </div>

      {/* Product Grid */}
      <section aria-label="Product listing">
        <ProductCard />
      </section>
    </main>
  );
}
