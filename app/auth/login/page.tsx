import { auth } from "@/lib/auth";
import LoginForm from "../components/login-form";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function LoginPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if(session) redirect("/");

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <LoginForm />
        </div>
    )
}