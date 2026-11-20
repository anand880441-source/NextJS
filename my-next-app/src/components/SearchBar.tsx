
"use client";

import { products } from "@/data/products";
import type { Product } from "@/types/products";
import { useRouter, useSearchParams} from "next/navigation";


type SearchBarProps = {
  onSearch: (filteredProducts: Product[]) => void;
};

export default function SearchBar({ onSearch }: SearchBarProps) {

  const router = useRouter()
  const searchParams = useSearchParams()

  const search = searchParams.get("search") ?? "";

  function handleSearch(value: string) {
    const params = new URLSearchParams(searchParams.toString())

    if(value.trim()){
      params.set("search", value)
    }else{
      params.delete("search")
    }

    const query = params.toString();

    const filteredData = products.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase().trim())
    );

    onSearch(filteredData);
    router.replace(query ? `products?${query}` : "/products")
  }

  return (
    <input
      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
      placeholder="Search products..."
      value={search}
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
}
