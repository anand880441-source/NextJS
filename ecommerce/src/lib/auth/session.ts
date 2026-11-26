import { createHash, randomBytes } from "crypto"
import { connectDB } from "../mongodb"
import Session from "@/models/Session"
import { cookies } from "next/headers"


export async function createSession(userId: string){
    await connectDB()

    const sessionToken = randomBytes(32).toString("hex")

    const tokenHash = createHash("sha256").update(sessionToken).digest("hex")

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await Session.create({
        userId,
        tokenHash,
        expiresAt,
    })

    return {
        id: sessionToken,
        expiresAt
    }
}


export async function deleteSession(sessionToken: string) {
  await connectDB()

  const tokenHash = createHash("sha256").update(sessionToken).digest("hex");

  await Session.deleteOne({ tokenHash });
}

export async function getAuthenticatedUserId() {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get("session")?.value;

  if (!sessionToken) return null;

  try {
    await connectDB();

    const tokenHash = createHash("sha256").update(sessionToken).digest("hex");

    const session = await Session.findOne({
      tokenHash,
      expiresAt: { $gt: new Date() },
    }).select("userId");

    return session?.userId?.toString() ?? null;
  } catch {
    return null;
  }
}