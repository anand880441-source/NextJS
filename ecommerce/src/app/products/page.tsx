"use client";
import { useEffect, useState } from "react";

type Product = {
  _id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
};

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
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
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to load products",
        );
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>
      {error ? (
        <p role="alert">{error}</p>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              <h2>{product.name}</h2>
              {product.description && <p>{product.description}</p>}
              <p>Price: ₹{product.price}</p>
              <p>Stock: {product.stock}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
