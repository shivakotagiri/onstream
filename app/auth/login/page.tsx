"use client";
import InputPassword from "@/components/examples/input/types/input-password";
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

export default function Login() { 
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const router = useRouter();

    function handleLogin() {
        if(!username || !password ) alert("fill the credentials properly")
        else alert("successfull");
    }
    return (
        <div className="flex p-2 h-screen w-screen justify-center items-center">
            <span onClick={() => router.back()} className="cursor-pointer fixed top-0 left-0 p-5 text-muted-foreground flex justify-center items-center gap-0.5"><ArrowLeft size={15} />back</span>
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
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="johndoe"
                                    required
                                    value={username}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                                />
                            </div>
                            <InputPassword value={password} onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button onClick={handleLogin} type="submit" className="w-full">
                        Login
                    </Button>
                    <Button variant="outline" className="w-full">
                        <span className="flex justify-center items-center gap-1">
                            Login with Google <GoogleIcon />
                        </span>
                    </Button>
                    <CardDescription className="pt-1">
                        Don&apos;t have an account? <Link href={"signup"} className="text-white">Signup</Link> here
                    </CardDescription>
                </CardFooter>
            </Card> 
        </div>
    )
}