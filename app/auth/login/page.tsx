"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import InputPassword from "@/components/ui/input-password";
import { Button } from "@/components/ui/button";
import TextSeparator from "@/components/ui/text-separator";
import { GoogleIcon } from "@/components/icons";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

const loginSchema = z.object({
    username: z.string().min(3),
    password: z.string().min(6)
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const router = useRouter();
    const form = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
        defaultValues:{
            username: "",
            password: ""
        }
    });

    async function handleLogin(data: LoginForm) {
        await authClient.signIn.username(
            {
                username: data.username,
                password: data.password,
                callbackURL: "/"
            },
            {
                onSuccess: () => {
                    toast.success("Login successful!");
                    router.push("/");
                },
                onError: (error) => {
                    toast.error(error.error.message || "Failed to login");
                }
            }
        );
    }

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <Card className="max-w-sm w-full">
                <CardHeader>
                    <CardTitle className="text-lg">Login to onStream</CardTitle>
                    <CardDescription>
                        Enter your credentials below and login to our streaming community.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-5">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="pb-2">Username</FormLabel>
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
                                        <div className="flex justify-between items-center">
                                            <FormLabel>Password</FormLabel>
                                            <Button
                                                variant={"link"}
                                                className="text-sm cursor-pointer"
                                                type="button"
                                                size={"sm"}
                                            >
                                                Forgot password?
                                            </Button>
                                        </div>
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
                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                        </form>
                    </Form>
                    <TextSeparator className="my-2" text="or" />
                    <Button 
                        className="w-full" 
                        type="button"
                        onClick={() => authClient.signIn.social({ provider: "google" })}
                    >
                        Continue with Google <GoogleIcon />
                    </Button>
                    <CardFooter className="flex justify-center mt-3">
                        <CardDescription>
                            Don&apos;t have an account? 
                            <Link className="text-accent-foreground px-1" href="signup">Sign up</Link>here
                        </CardDescription>
                    </CardFooter>
                </CardContent>
            </Card>
        </div>
    )
}