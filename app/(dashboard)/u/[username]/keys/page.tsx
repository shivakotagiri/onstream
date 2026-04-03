import { getStreamByUserId } from "@/actions/stream";
import { ServerUrl } from "./_components/server-url";
import { StreamKey } from "./_components/stream-key";
import { getInfo } from "@/lib/get-session";
import { redirect } from "next/navigation";
import GenerateConnection from "./_components/generate-connection";

export default async function KeysPage() {
    const data = await getInfo();
    if(!data) redirect("/");
    const currentUser = data.currentUser;
    const stream = await getStreamByUserId(currentUser.id);
    if(!stream) throw new Error("Stream not found");
    return (
        <div className="md:p-10 p-5 h-screen w-screen md:pt-23 pt-18 flex flex-col gap-10">
            <div className="w-full flex justify-between">
                <span className="text-3xl font-semibold">Keys & URLS</span>
                <GenerateConnection />
            </div>
            <div className="space-y-5">
                <ServerUrl serverUrl={stream.serverId} />
                <StreamKey streamKey={stream.secretKey} />
            </div>
        </div>
    )
}