"use client";

import { useSearchParams } from "next/navigation";
import { RequestResetEmail } from "./request-reset-email"; 
import { PasswordResetForm } from "./password-reset-form"; 

export default function ResetPasswordClient() {
  const params = useSearchParams();
  const token = params.get("token");

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
