import ProductOverView from "@/components/ProductOverView";
import { products } from "@/data/products";
import { notFound } from "next/navigation";

type ProductProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function productPage({ params }: ProductProps) {
  const { id } = await params;
  const product = products.find((item) => item.id === id);

  if (!product) {
    notFound();
  }

  return (
    <div className="justify-center border-gray-500 border">
      <ProductOverView key={product.id} product={product} />
    </div>
  );
}
