import { getSession } from "@/lib/get-session";
import { EmailVerificationForm } from "../components/email-verification-form";
import { redirect } from "next/navigation";

export default async function EmailVerificationPage() {
    const session = await getSession();
    if(session) redirect("/");


    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <EmailVerificationForm email=""/>
        </div>
    )
}