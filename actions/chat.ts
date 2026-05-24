/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";
import { revalidatePath } from "next/cache";
import { updateStream } from "./stream";

export async function chatDelayed(userId: string, chatDelay: boolean) {
    try {
        const isChatDelayed = chatDelay;
        const res = await updateStream({ userId, isChatDelayed });

        if(!res || res.length <= 0) {
            return { status: false, message: "Stream not found" };
        }

        revalidatePath("/u/[username]/chat");

        return {
            status: true,
            message: res[0].isChatDelayed ? "Chat delay option is turned on": "Chat delay option is turned off"
        }
    } catch(err) {
        return {
            status: false,
            message: "Something went wrong, try again later"
        }
    }
}

export async function chatEnabled(userId: string, chatEnable: boolean) {
    const isChatEnabled = chatEnable;
    try {
        const res = await updateStream({ userId, isChatEnabled })
        if(!res) return { status: false, message: "Stream not found" };
        revalidatePath("/u/[username]/chat");
        
        return {
            status: true,
            message: res[0].isChatEnabled ? "Chat is enabled": "Chat is disabled"
        }
    } catch(err) {
        return {
            status: false,
            message: "Something went wrong, try again later"
        }
    }
}

export async function chatFollowersOnly(userId: string, chatFollowersOnly: boolean) {
    try {
        const isChatFollowersOnly = chatFollowersOnly;
        const res = await updateStream({ userId, isChatFollowersOnly })
        if(!res) return { status: false, message: "Stream not found" };
        revalidatePath("/u/[username]/chat");
        
        return {
            status: true,
            message: res[0].isChatFollowersOnly ? "Chat restricted to followers only": "Chat is public"
        }
    } catch(err) {
        return {
            status: false,
            message: "Something went wrong, try again later"
        }
    }
}