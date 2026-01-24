/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";


export default function Home() {

  return (
    <div className="flex flex-col gap-5 justify-center items-center h-screen w-screen">
      Hello world
      <Button 
        variant={"destructive"} 
        className="cursor-pointer" 
        type="button"
        onClick={() => authClient.signOut()}
      >
        Sign out
      </Button>
    </div>
  );
}
