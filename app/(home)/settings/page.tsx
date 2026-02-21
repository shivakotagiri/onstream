import { Settings } from "./components/settings";
import { currentUserData } from "@/actions/user";

export default async function SettingsPage() {
  const currentUser = await currentUserData();

  if(!currentUser) {
    return <div>User not found</div>
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

        <Settings currentUser={currentUser} />
      </div>
    </div>
  );
}