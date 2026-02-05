"use client";

import { useRouter } from "next/navigation";

export function Logo() {
    const router = useRouter();
    function handleClick() {
        router.push("/");
    }
    return (
        <div onClick={handleClick} className="cursor-pointer">
            <div className="sm:text-base text-sm uppercase font-semibold">
            onstream
            </div>
        </div>
    )
}