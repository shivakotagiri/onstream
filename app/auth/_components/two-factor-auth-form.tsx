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

    const trustDevice = true;

    const { data, error } = useBackupCode
      ? await authClient.twoFactor.verifyBackupCode({
          code: trimmed,
          trustDevice,
        })
      : await authClient.twoFactor.verifyTotp({
          code: trimmed,
          trustDevice,
        });

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
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{useBackupCode ? "Backup code" : "Authentication code"}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      inputMode={useBackupCode ? "text" : "numeric"}
                      autoComplete="one-time-code"
                      placeholder={useBackupCode ? "Enter backup code" : "000000"}
                    />
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
          {useBackupCode ? "Use authenticator app instead" : "Use a backup code instead"}
        </Button>
      </CardContent>
    </Card>
  );
}
