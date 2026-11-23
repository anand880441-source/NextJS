import { connectDB } from "@/lib/mongodb";
import Product from "../../../models/Products";

export async function GET() {
	await connectDB();

	const products = await Product.find().sort({ createdAt: -1 });

	return Response.json({ products });
}

export async function POST(request: Request) {
	await connectDB();

	const body = await request.json();

	const product = await Product.create({
		name: body.name,
		description: body.description,
		price: body.price,
		stock: body.stock,
	});

	return Response.json({ product }, { status: 201 });
}