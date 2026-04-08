import { headers } from "next/headers";
import { WebhookReceiver } from "livekit-server-sdk";
import { NextRequest } from "next/server";
import { db } from "@/db";
import { stream } from "@/db/schema";
import { eq } from "drizzle-orm";

const receiver = new WebhookReceiver(
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!
);

export async function POST(req: NextRequest) {
    const body = await req.text();
    const headerPayload = await headers();
    const authorization = headerPayload.get("Authorization");

    if(!authorization) {
        return new Response("no authorized header", { status: 400 });
    }

    const event = await receiver.receive(body, authorization);

    if(event.event === "ingress_started") {
        await db.update(stream).set({ isLive: true })
            .where(eq(stream.ingressId, event.ingressInfo?.ingressId || ""));
    }

    if(event.event === "ingress_ended") {
        await db.update(stream).set({ isLive: false })
            .where(eq(stream.ingressId, event.ingressInfo?.ingressId || ""));
    }
}