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
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";
import z from 'zod';

const loginTypes = z.object({
    username: z.string().nonempty().min(3),
    password: z.string().nonempty().min(8)
})

export default function Login() { 
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const router = useRouter();

    function handleLogin(e: React.FormEvent) {
        e.preventDefault()
        const { success } = loginTypes.safeParse({username, password});
        if(!success) {
            toast.error("Invalid credentials", {
                description: "Please enter valid credentials"
            })
        }
        toast.success("Login Successfull")
    }
    return (
        <div className="flex p-2 h-screen w-screen justify-center items-center">
            <span onClick={() => router.push("/")} className="cursor-pointer fixed top-0 left-0 p-5 text-muted-foreground flex justify-center items-center gap-0.5"><ArrowLeft size={15} />back</span>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">
                        Login to onStream
                    </CardTitle>
                    <CardDescription>
                        Enter your username below and login with your gmail account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="johndoe"
                                    required
                                    value={username}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                                    minLength={3}
                                />
                            </div>
                            <InputPassword value={password} onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
                        </div>
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                        <Button type="button" variant="outline" className="w-full">
                            <span className="flex justify-center items-center gap-1">
                                Login with Google <GoogleIcon />
                            </span>
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <CardDescription className="pt-1">
                        Don&apos;t have an account? <Link href={"signup"} className="text-white">Signup</Link> here
                    </CardDescription>
                </CardFooter>
            </Card> 
        </div>
    )
}