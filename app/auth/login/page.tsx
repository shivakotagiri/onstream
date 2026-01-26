import LoginForm from "../components/login-form";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/get-session";

export default async function LoginPage() {
    const session = await getSession();
    if(session) redirect("/");
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <LoginForm />
        </div>
    )
}