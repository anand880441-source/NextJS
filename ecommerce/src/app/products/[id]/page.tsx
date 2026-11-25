import mongoose from "mongoose";
import { notFound } from "next/navigation";
import Product from "@/models/Products";
import { connectDB } from "@/lib/mongodb";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  await connectDB();
  const product = await Product.findById(id)

  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-3xl p-6">
      <article className="rounded-xl border p-6 shadow-sm">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        {product.description && (
          <p className="mt-4 text-gray-600">{product.description}</p>
        )}
        <p className="mt-6 text-xl font-semibold">Price: ₹{product.price}</p>
        <p className="mt-2 text-sm text-gray-500">
          {product.stock > 0
            ? `In Stock (${product.stock})`
            : "Out of Stock"}
        </p>
      </article>
    </main>
  );
}