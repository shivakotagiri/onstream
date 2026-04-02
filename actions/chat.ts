/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { revalidate } from "@/app/auth/reset-password/page";
import { db } from "@/db";
import { stream } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function chatDelayed(id: string) {
    try {
        const current = await db.query.stream.findFirst({
            where: eq(stream.id, id)
        });

        if(!current) {
            return { status: false, message: "Stream not found" };
        }

        const res = await db.update(stream).set({
            isChatDelayed: !current.isChatDelayed 
        }).where(eq(stream.id, id)).returning();

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

export async function chatEnabled(id: string) {
    try {
        const current = await db.query.stream.findFirst({
            where: eq(stream.id, id)
        });

        if(!current) {
            return { status: false, message: "Stream not found" };
        }
        const res = await db.update(stream).set({
            isChatEnabled: !current.isChatEnabled 
        }).where(eq(stream.id, id)).returning();

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

export async function chatFollowersOnly(id: string) {
    try {
        const current = await db.query.stream.findFirst({
            where: eq(stream.id, id)
        });

        if(!current) {
            return { status: false, message: "Stream not found" };
        }
        const res = await db.update(stream).set({
            isChatFollowersOnly: !current.isChatFollowersOnly 
        }).where(eq(stream.id, id)).returning();

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