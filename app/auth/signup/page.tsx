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
import { toast } from "sonner";


export default function Signup() { 
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [continued, setContinued] = useState<boolean>(false);

  function handleSignup() {
    if(!email || !password || !username) {
      toast.error("Invalid credentials", {
        description: "Please fill in all required fields",
      })
    }
    else {
      toast.success("Signup Successfull")
    }
  }

  function handleContinue() {
    if(!email) {
      toast.error("Invalid credentials", {
        description: "Please fill in all required fields",
      })
    }
    else {
      setContinued(true);
    }
  }

  return (
    <div className="flex p-2 h-screen w-screen justify-center items-center">
      <span onClick={() => router.back()} className="cursor-pointer fixed top-0 left-0 p-5 text-muted-foreground flex justify-center items-center gap-0.5"><ArrowLeft size={15} />back</span>
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
          <form>
            <div className="flex flex-col gap-5">
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

                {continued && (<div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                        id="username"
                        type="text"
                        placeholder="uniquename"
                        required
                        value={username}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                    />
                </div>)}
                {continued && <InputPassword value={password} onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />}
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-3">
          {continued ? (
            <>
              <Button type="submit" onClick={handleSignup} className="w-full">
                Sign up
              </Button>
            </> ) : (
            <>
              <Button onClick={handleContinue} type="submit" className="w-full">
                Continue
              </Button><Button variant="outline" className="w-full">
                  <span className="flex justify-center items-center gap-1">
                    Sign up with Google <GoogleIcon />
                  </span>
                </Button>
            </>)}
            <CardDescription className="pt-1">
                have an account? <Link href={"login"} className="text-white">Login</Link> here
            </CardDescription>
        </CardFooter>
      </Card> 
    </div>
  )
}