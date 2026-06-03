import { Suspense } from "react";
import ResetPasswordClient from "../_components/request-password-client";

export default function Page() {
  return (
    <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center" />}>
      <ResetPasswordClient />
    </Suspense>
  );
}