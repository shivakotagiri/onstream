"use client";
import { useSidebar } from "@/components/ui/sidebar";

export default function Home() {
  const { open } = useSidebar();

  return (
    <div className="h-screen w-screen pt-5">
      <div className={`grid w-full h-full px-4 sm:px-6 lg:px-10 gap-2 sm:gap-3 grid-cols-2 ${open ? "2xl:grid-cols-4 xl:grid-cols-3" : "2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3"}`}>
      </div>
    </div>
  );
}
