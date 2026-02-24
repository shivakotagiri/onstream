import ThemeToggle from "@/components/ui/theme-toggle";
import AuthProvider from "./_provider";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
    return <div>
        <AuthProvider>
            { children }
            <ThemeToggle className="cursor-pointer fixed right-2 top-2" />
        </AuthProvider>
    </div>
}