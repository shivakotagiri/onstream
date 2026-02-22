import ThemeToggle from "@/components/ui/theme-toggle";
import AuthProvider from "./_provider";
import { getSession } from "@/lib/get-session";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
    const session = await getSession();
    if(session && session.user) redirect("/");
    return <div>
        <AuthProvider>
            { children }
            <ThemeToggle className="cursor-pointer fixed right-2 top-2" />
        </AuthProvider>
    </div>
}