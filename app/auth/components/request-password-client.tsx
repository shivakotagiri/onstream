"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { RequestResetEmail } from "./request-reset-email"; 
import { PasswordResetForm } from "./password-reset-form"; 

export default function ResetPasswordClient() {
  const session = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token");

  useEffect(() => {
    if (session?.data) {
      router.replace("/");
    }
  }, [router, session]);

  if (session?.data) return null;

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      {token ? (
        <PasswordResetForm token={token} />
      ) : (
        <RequestResetEmail />
      )}
    </div>
  );
}
