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
import { signUp } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { SignInWithGoogle } from "@/components/signin-with-google";
import { useSignupStore } from "@/lib/form-state";
import { useEffect, useState } from "react";
import { checkUsernameAvailability } from "@/actions/check-username-availability";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar"
const signupSchema = z.object({
    username: z.string().min(3),
    password: z.string().min(6),
    email: z.email().min(1),
    name: z.string().min(3),
});

type SignupForm = z.infer<typeof signupSchema>

export default function SignupForm() {
    const { setPassword, setEmail, setUsername, reset } = useSignupStore();
    const [open, setOpen] = useState<boolean>(false);
    const form = useForm<SignupForm>({
        resolver: zodResolver(signupSchema),
        defaultValues:{
            email: "",
            username: "",
            password: "",
            name: "",
        }
    });
    
    const { isSubmitting } = form.formState
    const router = useRouter();
    async function handleSignup(data: SignupForm) {

        await signUp.email(
          { 
            email: data.email,
            password: data.password,
            name: data.name,
            username: data.username,
            callbackURL: "/", 
            displayUsername: data.username,
          }, {
          onSuccess: () => {
            setEmail(data.email);
            setPassword(data.password);
            setUsername(data.username);
            toast.success("Account created successfully!", {
                description: "please check your email for verification link"
            });
            router.push(`/auth/email-verification`);
          },
          onError: error => {
            reset();
            const message =
              (typeof error?.error === "object" && error?.error?.message)
                || (typeof error?.error === "string" && error.error)
                || error?.error?.error
                || "Failed to Sign up";
            toast.error(message);
          }
        });
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
            const res = await checkUsernameAvailability(username);

            if(!res.available) {
                setError("username", {
                    type: "manual",
                    message: "Username already taken"
                });
            } else {
                clearErrors("username");
            }
        }, 400);

        return () => clearTimeout(timeout);
    }, [clearErrors, setError, username])
    return (
        <Card className="max-w-md w-full">
            <CardHeader>
                <CardTitle className="text-2xl">Join onStream</CardTitle>
                <CardDescription>
                    Enter your credentials below and join our streaming community.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSignup)} className="space-y-5">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            {...field}
                                            placeholder="Enter your name"
                                        />
                                    </FormControl>
                                </FormItem>
                            )} 
                        />
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
                        {/* <FormField
                            control={form.control}
                            name="dob"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Date of birth</FormLabel>
                                <FormControl>
                                    <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                        type="button"
                                        variant="outline"
                                        className="justify-start font-normal w-full"
                                        >
                                        {field.value
                                            ? field.value.toLocaleDateString()
                                            : "Select date"}
                                        </Button>
                                    </PopoverTrigger>

                                    <PopoverContent
                                        className="w-auto overflow-hidden p-0"
                                        align="start"
                                    >
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={(date) => {
                                                field.onChange(date); 
                                                setOpen(false);
                                            }}
                                            captionLayout="dropdown"
                                            disabled={(date) => date > new Date()}
                                        />
                                    </PopoverContent>
                                    </Popover>
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        /> */}
                        <Button disabled={isSubmitting} type="submit" className="w-full">
                            <LoadingSwap isLoading={isSubmitting}>Sign up</LoadingSwap>
                        </Button>
                    </form>
                </Form>
                <TextSeparator className="my-2" text="or" />
                <SignInWithGoogle />
                <CardFooter className="flex justify-center mt-3">
                    <CardDescription>
                        Already have an account? 
                        <Link className="text-accent-foreground px-1" href="login">Log in</Link>here
                    </CardDescription>
                </CardFooter>
            </CardContent>
        </Card>
    )
}