import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function Navbar() {
    return (
        <nav className="h-16 shadow-xl shadow-secondary/10 max-w-[90%] mt-3 lg:max-w-[80%] fixed top-0 bg-background w-full flex justify-between items-center gap-7 left-1/2 -translate-x-1/2 rounded-3xl px-5">
            <div className="lg:max-w-[20%] max-w-[5%] ">
                <div className="hidden lg:flex uppercase font-semibold">
                onstream
                </div>
                <div className="w-10 lg:hidden h-10 bg-secondary p-5 text-md rounded-full flex justify-center items-center">
                    S
                </div>
            </div>
            <div className="lg:max-w-[75%] max-w-[90%] h-10 w-full flex justify-center items-center">
                <div className="w-full h-full flex justify-center items-center">
                    <Input 
                        type="text"
                        className="h-full rounded-r-none w-full max-w-[75%] border border-secondary border-r-0 bg-neutral-100 lg:text-base"
                        placeholder="search..."
                    />
                    <Button 
                        type="button" 
                        className="border border-secondary h-full hover:text-foreground hover:bg-none rounded-none rounded-r-2xl border-l-0 cursor-pointer bg-neutral-100 dark:bg-[#222326]" 
                        variant={"ghost"}
                    >
                        <SearchIcon />
                    </Button>
                </div>
            </div>
            <div className="max-w-[5%] w-full flex justify-end">
                <div className="w-10 h-10 bg-neutral-100 dark:bg-secondary p-5 text-md rounded-full flex justify-center items-center">
                    S
                </div>
            </div>
        </nav>
    )
}