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
import { GoogleIcon } from "@/components/icons";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const signupSchema = z.object({
    username: z.string().min(3),
    password: z.string().min(6),
    email: z.email().min(1)
});

type SignupForm = z.infer<typeof signupSchema>

export default function SignupPage() {
    const router = useRouter();
    const form = useForm<SignupForm>({
        resolver: zodResolver(signupSchema),
        defaultValues:{
            email: "",
            username: "",
            password: ""
        }
    });

    async function handleSignup(data: SignupForm) {
        await authClient.signUp.email(
          { 
            email: data.email,
            password: data.password,
            name: data.username,
            username: data.username,
            callbackURL: "/" 
          }, {
          onSuccess: () => {
            toast.success("Account created successfully!");
            router.push("/");
          },
          onError: error => {
            console.error("Signup error:", error);
            console.error("Error details:", JSON.stringify(error, null, 2));
            // Handle ErrorContext correctly: prefer error.error?.message, then fallback to stringifying if unavailable
            const message =
              (typeof error?.error === "object" && error?.error?.message)
                || (typeof error?.error === "string" && error.error)
                || error?.error?.error
                || "Failed to Sign up";
            toast.error(message);
          }
        });
    }

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <Card className="max-w-sm w-full">
                <CardHeader>
                    <CardTitle className="text-lg">Join onStream</CardTitle>
                    <CardDescription>
                        Enter your credentials below and join our streaming community.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSignup)} className="space-y-5">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                {...field}
                                                placeholder="your@gmail.com"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
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
                                        <div className="flex justify-between items-center">
                                            <FormLabel>Password</FormLabel>
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
                                Sign up
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
                            Already have an account? 
                            <Link className="text-accent-foreground px-1" href="login">Log in</Link>here
                        </CardDescription>
                    </CardFooter>
                </CardContent>
            </Card>
        </div>
    );
}