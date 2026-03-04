"use server";

import { db } from "@/db"
import { user } from "@/db/schema";
import { auth } from "@/lib/auth";
import { getSession } from "@/lib/get-session";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

export type currentUserType = {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
    username: string | null;
    displayUsername: string | null;
    phoneNumber: string | null;
    phoneNumberVerified: boolean | null;
    bio: string | null;
    bannerImage: string | null;
    dob: Date | null;
}

export const usersData = async () => {
    const res = await db.query.user.findMany({})
    return res;
}

export const searchUserByUsername = (async (username: string) => {
    const cleanUsername = username.trim();
    const res = await db.query.user.findFirst({
        where: eq(user.username, cleanUsername)
    });

    return res;
});

export const getCurrentUser = async () => {
    const session = await getSession();
    if(!session || !session.user) return null;
    
    const getCurrentUser = await db.select().from(user).where(eq(user.id, session.user.id));
    return getCurrentUser[0];
}

export const changeEmail = async (currentEmail: string, newEmail: string) => {
    if(currentEmail.trim() === newEmail.trim()) return {
        status: false,
        message: "New email must be different to current email"
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
        return {
            status: false,
            message: "Please enter a valid email address"
        }
    }

    try {
        console.log("[changeEmail] Starting email change request for:", { currentEmail, newEmail });
        
        const res = await auth.api.changeEmail({
            body: {
                newEmail,
                callbackURL: "/settings",
            },
            headers: await headers(),
        });

        console.log("[changeEmail] Response received:", res);

        // Better validate the response
        if (!res || (typeof res === 'object' && 'error' in res)) {
            const errorMessage = typeof res?.error === 'string' ? res.error : 'Unknown error occurred';
            console.error("[changeEmail] Error in response:", errorMessage);
            return {
                status: false,
                message: errorMessage || "Failed to send verification email",
            }
        }

        return {
            status: true,
            message: "Please check your current and new email to confirm & verify the change",
        }
    } catch(error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error("[changeEmail] Exception caught:", { error: errorMessage, fullError: error });
        
        // Provide more specific error messages based on error type
        if (errorMessage.includes('already exists') || errorMessage.includes('already in use')) {
            return {
                status: false,
                message: "This email is already in use by another account",
            }
        }
        
        if (errorMessage.includes('rate limit') || errorMessage.includes('too many')) {
            return {
                status: false,
                message: "Too many requests. Please try again later.",
            }
        }

        return {
            status: false,
            message: "Failed to send verification email. Please try again.",
        }
    }
}

export const updateUserDetails = async (name: string, bio: string, bannerUrl: string) => {
    const currentUser = await getCurrentUser();
    if(!currentUser) {
        return {
            status: false,
            message: "User doesn't exists"
        }
    }
    try {
        const res = await db.update(user).set({
            name: name.trim(),
            bio: bio.trim(),
            bannerImage: bannerUrl.trim()
        }).where(eq(user.id, currentUser.id)).returning();

        if(!res) {
            return {
                status: false,
                message: "Something went wrong"
            }
        } else {
            return {
                status: true,
                message: "User details updated"
            }
        }
    } catch(err) {
        return {
            status: false,
            message: "Something went wrong"
        }
    }
}

export const updateProfilePic = async (imageUrl: string) => {
    // TODO: write the logic to update the profile pic
}




