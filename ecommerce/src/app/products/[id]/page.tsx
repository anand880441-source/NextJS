import Link from "next/link";
import mongoose from "mongoose";
import { notFound } from "next/navigation";
import Product from "@/models/Products";
import { connectDB } from "@/lib/mongodb";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  if (!mongoose.isObjectIdOrHexString(id)) {
    notFound();
  }

  await connectDB();
  const product = await Product.findById(id);

  if (!product) {
    notFound();
  }

  const inStock = product.stock > 0;

  return (
    <main className="min-h-screen bg-gray-50/70 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Back Navigation */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-indigo-600"
        >
          <span aria-hidden="true">&larr;</span>
          Back to Products
        </Link>

        {/* Product Detail Card */}
        <article className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="p-6 sm:p-10">
            {/* Eyebrow & Stock Badge */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
                Product Details
              </span>

              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                  inStock
                    ? "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20"
                    : "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-600/20"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    inStock ? "bg-emerald-600" : "bg-rose-600"
                  }`}
                />
                {inStock
                  ? `In Stock (${product.stock} available)`
                  : "Out of Stock"}
              </span>
            </div>

            {/* Product Title */}
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {product.name}
            </h1>

            {/* Description */}
            <div className="mt-6 border-t border-gray-100 pt-6">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Description
              </h2>
              <p className="mt-2 text-base leading-relaxed text-gray-600">
                {product.description ||
                  "No detailed description available for this product."}
              </p>
            </div>

            {/* Price & Action Footer */}
            <div className="mt-8 flex flex-col justify-between gap-6 border-t border-gray-100 pt-8 sm:flex-row sm:items-center">
              <div>
                <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
                  Total Price
                </span>
                <p className="mt-1 text-3xl font-extrabold text-gray-900">
                  ₹{product.price.toLocaleString("en-IN")}
                </p>
              </div>

              <button
                type="button"
                disabled={!inStock}
                className={`inline-flex items-center justify-center rounded-xl px-8 py-3.5 text-sm font-semibold shadow-sm transition-all duration-200 ${
                  inStock
                    ? "bg-gray-900 text-white hover:bg-indigo-600 active:scale-[0.98]"
                    : "cursor-not-allowed bg-gray-100 text-gray-400"
                }`}
              >
                {inStock ? "Add to Cart" : "Currently Unavailable"}
              </button>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
