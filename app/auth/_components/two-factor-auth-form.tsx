"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoadingSwap } from "@/components/ui/loading-swap";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

type TwoFactorForm = {
  code: string;
};

export default function TwoFactorAuthForm() {
  const router = useRouter();
  const [useBackupCode, setUseBackupCode] = useState(false);

  const form = useForm<TwoFactorForm>({
    defaultValues: { code: "" },
  });
  const { isSubmitting } = form.formState;

  async function handleVerify({ code }: TwoFactorForm) {
    const trimmed = code.trim();
    if (!trimmed) return;

    const trustDevice = false;

    const { data, error } = useBackupCode
      ? await authClient.twoFactor.verifyBackupCode({ code: trimmed, trustDevice })
      : await authClient.twoFactor.verifyTotp({ code: trimmed, trustDevice });

    if (error) {
      toast.error(error.message || "Invalid verification code");
      return;
    }

    if (data) {
      toast.success("Two-factor authentication verified");
      router.push("/");
      router.refresh();
    }
  }

  return (
    <Card className="max-w-md w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Two-factor authentication</CardTitle>
        <CardDescription>
          {useBackupCode
            ? "Enter one of your backup codes to finish signing in."
            : "Enter the 6-digit code from your authenticator app to finish signing in."}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleVerify)} className="space-y-5">
            <FormField
              control={form.control}
              name="code"
              rules={{ required: "A code is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {useBackupCode ? "Backup code" : "Authentication code"}
                  </FormLabel>
                  <FormControl>
                    {useBackupCode ? (
                      <Input
                        {...field}
                        autoComplete="one-time-code"
                        placeholder="Enter backup code"
                      />
                    ) : (
                      <InputOTP
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                        maxLength={6}
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        id="otp-verification"
                      >
                        <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator className="mx-2" />
                        <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting} className="w-full">
              <LoadingSwap isLoading={isSubmitting}>Verify</LoadingSwap>
            </Button>
          </form>
        </Form>

        <Button
          type="button"
          variant="link"
          className="w-full cursor-pointer"
          onClick={() => {
            setUseBackupCode((prev) => !prev);
            form.reset({ code: "" });
          }}
        >
          {useBackupCode
            ? "Use authenticator app instead"
            : "Use a backup code instead"}
        </Button>
      </CardContent>
    </Card>
  );
}