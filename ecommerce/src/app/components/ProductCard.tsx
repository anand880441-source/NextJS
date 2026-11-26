"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Product = {
  _id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
};

export default function ProductCard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error(`Failed to load products (${response.status})`);
        }
        const data: { products: Product[] } = await response.json();
        setProducts(data.products);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load products"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
            >
              <div className="space-y-4 animate-pulse">
                <div className="flex justify-between">
                  <div className="h-6 w-2/3 rounded-md bg-gray-200" />
                  <div className="h-6 w-20 rounded-full bg-gray-200" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-full rounded bg-gray-200" />
                  <div className="h-4 w-4/5 rounded bg-gray-200" />
                </div>
              </div>
              <div className="mt-8 space-y-4 animate-pulse">
                <div className="h-8 w-1/3 rounded-md bg-gray-200" />
                <div className="h-11 w-full rounded-xl bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="font-medium text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <p className="text-lg font-medium text-gray-900">No products found</p>
        <p className="mt-1 text-sm text-gray-500">
          Check back later for new arrivals.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((item) => {
          const inStock = item.stock > 0;

          return (
            <div
              key={item._id}
              className="group flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-lg"
            >
              {/* Top Section: Title, Stock Badge & Description */}
              <div>
                <div className="flex items-start justify-between gap-3">
                  <h2 className="line-clamp-1 text-lg font-bold tracking-tight text-gray-900 transition-colors group-hover:text-indigo-600">
                    {item.name}
                  </h2>

                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                      inStock
                        ? "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20"
                        : "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-600/20"
                    }`}
                  >
                    {inStock ? `${item.stock} in stock` : "Out of stock"}
                  </span>
                </div>

                <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-gray-600">
                  {item.description || "No description available for this item."}
                </p>
              </div>

              {/* Bottom Section: Price & Action Button */}
              <div className="mt-6 border-t border-gray-100 pt-5">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
                    Price
                  </span>
                  <p className="text-2xl font-extrabold text-gray-900">
                    ₹{item.price.toLocaleString("en-IN")}
                  </p>
                </div>

                <Link
                  href={`/products/${item._id}`}
                  className="mt-4 flex w-full items-center justify-center rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:scale-[0.98]"
                >
                  View Details
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
