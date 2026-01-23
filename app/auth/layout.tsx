import AuthProvider from "./_provider";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return <div>
        <AuthProvider>
            { children }
        </AuthProvider>
    </div>
}