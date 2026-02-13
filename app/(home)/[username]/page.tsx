import { ProfileBanner } from "@/components/profile-banner";

export default async function UserDashboardPage({ params }: { 
    params: Promise<{ username: string }>; 
}) {
  const { username } = await params;
  return (
    <div className="w-screen h-full flex flex-col items-center">
      <div className="w-full h-full flex justify-center">
        <ProfileBanner username={username} />
      </div>
    </div>
  );
}
