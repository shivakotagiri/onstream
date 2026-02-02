"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { RequestResetPasswordEmail } from "../components/request-password-reset-email";
import { PasswordReset } from "../components/password-reset";
import { useSession } from "@/lib/auth-client";


export default function ResetPassword() {
    const [email, setEmail] = useState<string>("");
    const token = useSearchParams().get("token")

    const router = useRouter();

    const session = useSession();
    
    useEffect(() => {
        if(session && session.data) {
            router.push("/")
        }
    },[session, router]);
    
    if(session?.data) return null;

    return (
        <div className="h-screen w-screen flex justify-center items-center">
            {!token && <RequestResetPasswordEmail email={email} setEmail={setEmail}/>}
            {token && <PasswordReset token={token} />}
        </div>
    )
}