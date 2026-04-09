"use server";

import { 
    IngressVideoEncodingPreset, 
    RoomServiceClient, 
    IngressAudioEncodingPreset, 
    IngressInput, 
    IngressClient,
    CreateIngressOptions,
    TrackSource,
    IngressVideoOptions,
    IngressAudioOptions
} from "livekit-server-sdk";

import { db } from "@/db";
import { getInfo } from "@/lib/get-session";
import { stream } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

const roomService = new RoomServiceClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
);

const ingressClient = new IngressClient(process.env.LIVEKIT_API_URL!);

export async function resetIngress(hostIdentity: string) {
    const ingresses = await ingressClient.listIngress({
        roomName: hostIdentity,
    });

    const rooms = await roomService.listRooms([hostIdentity]);

    for (const room of rooms) {
        await roomService.deleteRoom(room.name);
    }

    for(const ingress of ingresses) {
        if(ingress.ingressId) {
            await ingressClient.deleteIngress(ingress.ingressId);
        }
    }
}

export async function createIngress(ingressType: IngressInput) {
    const data = await getInfo();
    if(!data) throw new Error("User not found");
    const currentUser = data.currentUser;

    await resetIngress(currentUser.id);
    
    const options: CreateIngressOptions = {
        name: currentUser.name,
        roomName: currentUser.id,
        participantName: currentUser.username || "",
        participantIdentity: currentUser.id
    }

    if(ingressType === IngressInput.WHIP_INPUT) {
        options.bypassTranscoding = true
    } else {
        options.video = new IngressVideoOptions({
            source: TrackSource.CAMERA,
            encodingOptions: {
                case: "preset",
                value: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS
            }
        });

        options.audio = new IngressAudioOptions({
            source: TrackSource.MICROPHONE,
            encodingOptions: {
                case: "preset",
                value: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS
            }
        })
    }

    const ingress = await ingressClient.createIngress(ingressType, options);

    if(!ingress || !ingress.url || !ingress.streamKey) throw new Error("Failed to create ingress");

    const res = await db.update(stream).set({
        streamKey: ingress.streamKey,
        ingressId: ingress.ingressId,
        serverUrl: ingress.url
    }).where(eq(stream.userId, currentUser.id)).returning();

    revalidatePath(`/u/${currentUser.username}/keys`);

    return res[0];
}