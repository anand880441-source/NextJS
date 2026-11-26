// import { connectDB } from "@/lib/mongodb";
// import User from "@/models/User";
// import {verifyPassword} from "@/lib/auth/password"

// export async function POST(request: Request) {
//   await connectDB();

//   try {
//     const body = await request.json();

//     const { email, password } = body;

//     if (!email || !password) {
//       return Response.json(
//         { error: "All fields are required!!" },
//         { status: 400 },
//       );
//     }

//     const user = await User.findOne({email}).select("+password")

//     if(!user){
//         return Response.json(
//             {error: "Invalid credentials!!"},
//             {status: 401}
//         )
//     }

//     const valid = await verifyPassword(password, user.password);

//     if(!valid) {
//       return Response.json(
//         {error: "Invalid crediantials"},
//         {status: 401}
//       )
//     }

//     return Response.json(
//         {sucess: "Sucessfully Logined!!"},
//         {status: 200}
//     )

//   } catch (err) {
//     return Response.json({ error: "Something went wrong!!" }, { status: 500 });
//   }
// }

import { cookies } from "next/headers";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { verifyPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return Response.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    await connectDB();

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const valid = await verifyPassword(password, user.password);

    if (!valid) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const session = await createSession(user._id.toString());

    const cookieStore = await cookies();

    cookieStore.set("session", session.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return Response.json({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    });
  } catch {
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
