import { redirect } from "next/navigation";

import Signout from "@/components/signout";
import { getSession } from "@/lib/get-session";

export default async function Home() {
  const session = await getSession();
  if(!session) redirect("/auth/login");
  return (
    <div className="flex flex-col gap-5 justify-center items-center h-screen w-screen">
      Hello world
      <Signout />
    </div>
  );
}
