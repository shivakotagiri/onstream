import { SettingSkeleton } from "./_components/settings-skeleton";

export default function loading() {
    return (
        <div className="flex flex-co mt-25 justify-center items-center w-screen h-screen">
            <SettingSkeleton />
        </div>
    )
}