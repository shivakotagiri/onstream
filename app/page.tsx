import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import Signout from "@/components/signout";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  if(!session) redirect("/auth/login");
  return (
    <div className="flex flex-col gap-5 justify-center items-center h-screen w-screen">
      Hello world
      <Signout />
    </div>
  );
}
