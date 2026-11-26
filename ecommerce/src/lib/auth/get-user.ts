import { cookies } from "next/headers";
import { connectDB } from "../mongodb";
import Session from "@/models/Session";


export async function getAuthenticatedUserId(){
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("session")?.value;

    if(!sessionId) return null;

    try{
        await connectDB();

        const session = await Session.findOne({
            sessionId,
            expiresAt: {$gt: new Date()},
        }).select("userId");

        return session?.userId?.toString() ?? null;
    }catch {
        return null;
    }
}