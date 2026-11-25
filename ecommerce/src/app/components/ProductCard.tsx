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

        const data: { product: Product[] } = await response.json();
        setProducts(data.product || []);
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


  if (loading) return <p className="p-4 text-gray-500">Loading products...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;
  if (products.length === 0) return <p className="p-4">No products found.</p>;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((item) => (
        <div key={item._id} className="rounded-xl border p-4 shadow-sm">
          <h2 className="mt-3 text-xl font-bold">{item.name}</h2>
          <p className="mt-1 text-gray-600">{item.description}</p>
          <p className="mt-2 font-semibold">Price: ₹{item.price}</p>
          <p className="text-sm text-gray-500">
            {item.stock > 0 ? `In Stock (${item.stock})` : "Out of Stock"}
          </p>
          <Link
            href={`/products/${item._id}`}
            className="mt-4 inline-block rounded-lg bg-black px-4 py-2 text-white"
          >
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
}
