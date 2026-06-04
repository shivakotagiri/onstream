import { Settings } from "./_components/settings"

export default async function SettingsPage() {

  return (
    <div className="min-h-screen w-screen px-6 lg:px-12 font-sans flex justify-center">
      <div className="w-4xl mt-25 h-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-1">Settings</h1>
          <p className="text-sm text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>
        <Settings />
      </div>
    </div>
  )
}
