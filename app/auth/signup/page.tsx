import { auth } from "@/lib/auth";
import SignupForm from "../components/signup-form";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function SignupPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if(session) redirect("/");
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <SignupForm />
        </div>
    );
}