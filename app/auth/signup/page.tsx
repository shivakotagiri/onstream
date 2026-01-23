"use client";
import InputPassword from "@/components/ui/input-password";
import { GoogleIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { 
    Card, 
    CardHeader, 
    CardTitle, 
    CardContent, 
    CardFooter, 
    CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";
import z from "zod";

export default function Signup() { 
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const signupZod = z.object({
    username: z.string().min(3),
    email: z.email(),
    password: z.string(),
  })

  function handleSignup(e: FormEvent) {
    e.preventDefault();
    const { success } = signupZod.safeParse({ username, email, password });
    if(!email || !password || !username) {
      toast.error("Invalid credentials", {
        description: "Please fill in all required fields",
      })
    } else if(!success) toast.error("Invalid input format", {
      description: "Given credentials doesn't met the required criteria"
    })
    else {
      toast.success("Signup Successfull");
    }
  }

  return (
    <div className="flex p-2 h-screen w-screen justify-center items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
            <CardTitle className="text-2xl">
                Join to onStream
            </CardTitle>
            <CardDescription>
                Enter your credentials below and join the streaming community
            </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="text"
                        placeholder="your@gmail.com"
                        required
                        value={email}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                        id="username"
                        type="text"
                        placeholder="uniquename"
                        required
                        value={username}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                        minLength={3}
                    />
                </div>
                <InputPassword placeholder={"Enter your password"} value={password} label="Password" onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
                {/* <InputPassword placeholder={"Confirm password"} value={confirmPassword} label="Confirm Password" onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)} /> */}
            </div>
            <Button type="submit" className="w-full">
              Sign up
            </Button>
            {/* <TextSeparator text="or" /> */}
            <Button type="button" variant={"outline"} className="w-full">
              Continue with google <GoogleIcon />
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex-col">
            <CardDescription className="flex gap-1">
                have an account? 
                <Link href={"login"} className="text-accent-foreground font-semibold">
                  Login
                </Link> 
                here
            </CardDescription>
        </CardFooter>
      </Card> 
    </div>
  )
}