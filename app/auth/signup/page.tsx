import SignupForm from "../components/signup-form";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/get-session";

export default async function SignupPage() {
    const session = await getSession();
    if(session) redirect("/");
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <SignupForm />
        </div>
    );
}