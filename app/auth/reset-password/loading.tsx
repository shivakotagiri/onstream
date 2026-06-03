import { LoaderIcon } from "lucide-react";

export default function Loading() {
    return (
        <div className="flex justify-center items-center w-screen h-screen overflow-hidden">
            <span className="w-5 h-5 animate-spin">
                <LoaderIcon />
            </span>
        </div>
    )
}