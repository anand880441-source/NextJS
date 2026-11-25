import { connectDB } from "@/lib/mongodb";
import Product from "../../../models/Products";
import { createProductSchema } from "@/schema/products";

export async function GET() {
  await connectDB();

  const products = await Product.find().sort({ createdAt: -1 });

  return Response.json({ products });
}

export async function POST(request: Request) {
  await connectDB();

  const body = await request.json();
  const result = createProductSchema.safeParse(body);

  if (!result.success) {
    return Response.json(
      {
        sucess: false,
        data: null,
        message: result.error.issues[0].message,
      },
      { status: 400 },
    );
  }

  const products = await Product.insertMany(result.data);

  return Response.json(
    {
      success: true,
      data: products,
      message: "Products created successfully",
    },
    { status: 201 },
  );
}
