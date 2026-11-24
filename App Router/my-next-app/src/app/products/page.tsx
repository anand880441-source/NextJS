'use client'

import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import { products } from "@/data/products";
import { useState } from "react";

export default function Home() {
  const [filteredData, setFilteredData] = useState(products);


  return (
    <main className="p-8">
      <h1 className="mb-6 text-3xl font-bold">
        Our Products
      </h1>

     <SearchBar onSearch={setFilteredData}/>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredData.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </main>
  );
}
