"use server";

/* eslint-disable @typescript-eslint/no-unused-vars */
import { getInfo } from "@/lib/get-session";
import { AccessToken } from "livekit-server-sdk";
import { v4 } from "uuid";
import { getUserById } from "@/actions/user"
import { isUserBlocked } from "./block-service";

export const createViewerToken = async (hostIdentity: string) => {

    let self;
    try {
        const data = await getInfo();
        if(!data) throw new Error("Unauthorized");
        self = data.currentUser;
    } catch(err) {
        const id = v4();
        const username = "guest#" + Math.floor(Math.random() * 1000);
        self = { id, username };
    }

    const host = await getUserById(hostIdentity);

    if(!host) {
        throw new Error("User not found");
    }

    const isBlocked = await isUserBlocked(self.id, host.id);

    if(isBlocked) {
        throw new Error("User is blocked");
    }

    const isHost = self.id === host.id;

    const token = new AccessToken(
        process.env.LIVEKIT_KEY!,
        process.env.LIVEKIT_SECRET!,
        { 
            identity: isHost ? `host-${self.id}`: self.id,
            name: self.username || "guest"
        }
    );

    token.addGrant({
        room: host.id,
        canPublish: false,
        canPublishData: true,
        roomJoin: true,
    })
    return await Promise.resolve(token.toJwt());
}