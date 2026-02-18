import { getSession } from "@/lib/get-session";
import { SettingsTab } from "@/components/settings-tab";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const session = await getSession();

  if(!session || !session.user) {
    redirect("/");
  }

  return (
    <div className="w-full min-h-screen bg-background text-foreground px-6 lg:px-12 font-sans">
      <div className="max-w-7xl mx-auto mt-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-1">Settings</h1>
          <p className="text-sm text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <SettingsTab currentUser={session.user} />
      </div>
    </div>
  );
}