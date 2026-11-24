import { connectDB } from "@/app/lib/mongodb";

export async function GET(){
    await connectDB()
    return Response.json({message:"helloo"}, { status:200 })
}