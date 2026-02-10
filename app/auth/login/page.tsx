import LoginForm from "../components/login-form";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/get-session";

export default async function LoginPage() {
    const session = await getSession();
    if(session) redirect("/");
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="fixed -z-10 flex justify-between w-[95%] text-[12rem] font-bold">
                <div className="translate-x-5">ONST</div>
                <div>REAM</div>
            </div>
            <LoginForm />
        </div>
    )
}