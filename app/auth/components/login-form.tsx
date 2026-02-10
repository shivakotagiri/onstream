"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import InputPassword from "@/components/ui/input-password";
import { Button } from "@/components/ui/button";
import TextSeparator from "@/components/ui/text-separator";
import Link from "next/link";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { SignInWithGoogle } from "@/components/signin-with-google"; 


const loginSchema = z.object({
    username: z.string().min(3),
    password: z.string().min(6)
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginForm() {
    const router = useRouter();
    const form = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
        defaultValues:{
            username: "",
            password: ""
        }
    });
    const { isSubmitting } = form.formState;
    async function handleLogin(data: LoginForm) {
        await signIn.username(
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
                onError: async (error) => {
                    if(error.error.message == "Email not verified") {
                        router.push("/auth/email-verification");
                    }
                    toast.error(error.error.message || "Failed to login");
                }
            }
        );
    }

    return (
        <Card className="max-w-md w-full">
            <CardHeader>
                <CardTitle className="text-2xl">Login to onStream</CardTitle>
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
                                            className="text-sm cursor-pointer text-accent-foreground"
                                            type="button"
                                            size={"sm"}
                                            onClick={() => router.push("/auth/reset-password")}
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
                        <Button type="submit" disabled={isSubmitting} className="w-full">
                            <LoadingSwap isLoading={isSubmitting}>Login</LoadingSwap>
                        </Button>
                    </form>
                </Form>
                <TextSeparator className="my-2" text="or" />
                <SignInWithGoogle />
                <CardFooter className="flex justify-center mt-3">
                    <CardDescription>
                        Don&apos;t have an account? 
                        <Link className="text-accent-foreground px-1" href="signup">Sign up</Link>here
                    </CardDescription>
                </CardFooter>
            </CardContent>
        </Card>
    )
}