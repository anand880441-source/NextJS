import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request: Request) {
  await connectDB();

  try {
    const body = await request.json();

    const { email, password } = body;

    if (!email || !password) {
      return Response.json(
        { error: "All fields are required!!" },
        { status: 400 },
      );
    }

    const user = await User.findOne({email})

    if(!user){
        return Response.json(
            {error: "User not found!!"},
            {status: 404}
        )
    }

    if(password != user.password){
        return Response.json(
            {error: "Incorrect Password or Email!!"},
            {status: 400}
        )
    }

    return Response.json(
        {sucess: "Sucessfully Logined!!"},
        {status: 200}
    )

  } catch (err) {
    return Response.json({ error: "Something went wrong!!" }, { status: 500 });
  }
}
