
import { redirect } from "next/navigation";
import { getAuthenticatedUserId } from "@/lib/auth/session";
import LoginForm from "@/app/components/LoginForm";

export default async function LoginPage() {
	const userId = await getAuthenticatedUserId();

	if (userId) {
		redirect("/dashboard");
	}

	return <LoginForm />;
}