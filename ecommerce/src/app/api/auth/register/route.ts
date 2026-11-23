import { connectDB } from "@/lib/mongodb";
import User from "../../../../models/User";

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return Response.json(
        { error: "All fields are required!!" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json(
        { error: "User Already exist!!" },
        { status: 409 }
      );
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    return Response.json(
      { success: "User created successfully!!" },
      { status: 201 }
    );
  } catch (err) {
    return Response.json(
      { error: "Something went wrong!!" },
      { status: 500 }
    );
  }
}
