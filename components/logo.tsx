"use client";

import { useRouter } from "next/navigation";

export function Logo() {
    const router = useRouter();
    function handleClick() {
        router.push("/");
    }
    return (
        <div onClick={handleClick} className="cursor-pointer">
            <div className="hidden lg:flex uppercase font-semibold">
            onstream
            </div>
            <div className="w-10 lg:hidden h-10 bg-secondary p-5 text-md rounded-full flex justify-center items-center">
                S
            </div>
        </div>
    )
}