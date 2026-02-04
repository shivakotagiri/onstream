
import Signout from "@/components/signout";

export default async function Home() {
  return (
    <div className="flex flex-col gap-5 justify-center items-center h-screen w-screen">
      Hello world
      <Signout />
    </div>
  );
}
