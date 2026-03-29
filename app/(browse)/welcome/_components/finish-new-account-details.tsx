"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import InputPassword from "@/components/ui/input-password";
import z from "zod";
import { useForm } from "react-hook-form";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { Button } from "@/components/ui/button";
import { setupNewAccount } from "@/actions/user";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { checkUsernameAvailability } from "@/actions/user";

const AccountDetailsSchema = z.object({
    username: z.string().trim().min(3),
    password: z.string().trim().min(6),
});

type AccountDetailsType = z.infer<typeof AccountDetailsSchema>;

export function FinishNewAccountDetailsForm() {
    const form = useForm<AccountDetailsType>({
        resolver: zodResolver(AccountDetailsSchema),
        defaultValues: {
            username: "",
            password: ""
        }
    });

    const { isSubmitting } = form.formState;

    const router = useRouter();

    async function handleNewAccountDetailsSubmit(data: AccountDetailsType) {
        const { username, password } = data;
        const res = await setupNewAccount(username, password);
        if(res.status) {
            toast.success(res.message);
            router.push("/");
        } else {
            toast.error(res.message);
        }
    }

    const {setError, clearErrors, watch} = form;
    // eslint-disable-next-line react-hooks/incompatible-library
    const username = watch("username");

    useEffect(() => {
        if(username.length < 3) {
            clearErrors("username");
            return;
        }

        const timeout = setTimeout(async () => {
            const res = await checkUsernameAvailability(username.trim());
            if(!res.available) {
                setError("username", {
                    type: "manual",
                    message: res.message
                });
            } else {
                clearErrors("username");
            }
        }, 300);

        return () => clearTimeout(timeout);

    }, [clearErrors, setError, username])

    return (
        <Card className="max-w-md w-full">
            <CardHeader>
                <CardTitle className="font-semibold text-xl">
                    Welcome to our ONSTREAM Community
                </CardTitle>
                <CardDescription>
                    Please fill your username and password to complete your account info
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleNewAccountDetailsSubmit)} className="space-y-5">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            {...field}
                                            placeholder="Enter your username"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <InputPassword 
                                            {...field} 
                                            placeholder="Enter your password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} 
                        />
                        <Button disabled={isSubmitting} type="submit" className="w-full cursor-pointer">
                            <LoadingSwap isLoading={isSubmitting}>Confirm Info</LoadingSwap>
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}