
import Link from "next/link";
import type { Product } from "@/types/products";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({
  product,
}: ProductCardProps) {
  return (
    <div className="rounded-xl border p-4 shadow-sm">
      <img
        src={product.image}
        alt={product.name}
        className="h-48 w-full rounded-lg object-cover"
      />

      <h2 className="mt-3 text-xl font-bold">
        {product.name}
      </h2>

      <p className="mt-1 text-gray-600">
        {product.description}
      </p>

      <p className="mt-2 font-semibold">
        Price: ₹{product.price}
      </p>

      <Link
        href={`/products/${product.id}`}
        className="mt-4 inline-block rounded-lg bg-black px-4 py-2 text-white"
      >
        View Details
      </Link>
    </div>
  );
}
