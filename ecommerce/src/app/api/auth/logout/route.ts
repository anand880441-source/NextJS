import { cookies } from "next/headers";

import { deleteSession } from "@/lib/auth/session";

export async function POST() {
	try {
		const cookieStore = await cookies();

		const sessionId = cookieStore.get("session")?.value;

		if (sessionId) {
			await deleteSession(sessionId);
		}

		cookieStore.delete("session");

		return Response.json({ success: true });
	} catch {
		return Response.json(
			{ error: "Something went wrong" },
			{ status: 500 },
		);
	}
}