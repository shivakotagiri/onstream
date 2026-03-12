/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { db } from "@/db"
import { account, user } from "@/db/schema";
import { auth } from "@/lib/auth";
import { getSession } from "@/lib/get-session";
import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
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
    sessionVersion: number | null
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

export const checkUsernameAvailability = async (username: string) => {
    if(!username || username.length < 3) {
        return { available: false, message: "Username should be atleast 3 characters" }
    }
    const res = await db.query.user.findFirst({
        where: eq(user.username, username),
    });

    if(res && res.id) {
        return { available: false, message: "Username already taken" }
    }
    return { available: true, message: "Username available" };
}

export const getCurrentUser = async () => {
    const session = await getSession();
    if(!session || !session.user) return null;

    const res = await db.query.user.findFirst({
        where: eq(user.id, session.user.id)
    })
    
    return res ?? null;
}

export const getUserAccount = async () => {
    const session = await getSession();
    if(!session || !session.user) return null;

    const getCurrentUserAccount = await db.query.account.findMany({
        where: eq(account.userId, session.user.id)
    });

    return getCurrentUserAccount;
}

export const changeEmail = async (currentEmail: string, newEmail: string) => {
    if(currentEmail.trim() === newEmail.trim()) return {
        status: false,
        message: "New email must be different to current email"
    }
    
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

export const updateUserDetails = async (name?: string, bio?: string, bannerUrl?: string, username?: string) => {

    const currentUser = await getCurrentUser()

    if(!currentUser) {
        return { status: false, message: "User doesn't exists" }
    }

    // if(!checkUsernameAlreadyExists.available) {
    //     return { status: false, message: checkUsernameAlreadyExists.message}
    // } 

    const updateData: Partial<typeof user.$inferInsert> = {};
    if(name && name !== currentUser.name) updateData.name = name.trim();
    if(bio !== currentUser.bio) updateData.bio = bio?.trim();
    if(username && username !== currentUser.username) updateData.username = username.trim();
    if(bannerUrl !== currentUser.bannerImage) updateData.bannerImage = bannerUrl?.trim();

    if(Object.keys(updateData).length === 0) {
        return { status: false, message: "Nothing to update" }
    }

    try {
        const res = await db.update(user).set(updateData).where(eq(user.id, currentUser.id)).returning();

        if(res.length === 0) {
            return { status: false, message: "Something went wrong" }
        } else {
            revalidatePath("/*");
            revalidatePath("/settings");
            revalidatePath("/user/path:*");
            return { status: true, message: "User details updated" }
        }

    } catch(err) {
        return { status: false, message: "Something went wrong" }
    }
}

export const updateProfilePic = async (imageUrl: string) => {
    if(!imageUrl.trim()) return { status: false, message: "Invalid image url" }
    const currentUser = await getCurrentUser();
    if(!currentUser) return { status: false, message: "User not found" }

    try {
        const res = await db.update(user).set({
            image: imageUrl.trim(),
        }).where(eq(user.id, currentUser.id)).returning();

        if(res.length === 0) {
            return {
                status: false,
                message: "Something went wrong"
            }
        }
        revalidatePath("/", "layout");
        revalidatePath("/settings");
        revalidatePath("/user/path:*");
        return { status: true, message: "Update Successfull" }
    } catch(err) {
        return {
            status: false,
            message: "Something went wrong"
        }
    }
}

export const deleteProfilePic = async () => {
    try {
        const currentUser = await getCurrentUser();
        if(!currentUser) return { status: false, message: "User not found" };
        const res = await db.update(user).set({ image: null }).where(eq(user.id, currentUser.id));
        if(!res) {
            return {
                status: false,
                message: "Unable to delete the profile pic"
            }
        } else {
            revalidatePath("/", "layout");
            revalidatePath("/settings");
            revalidatePath("/user/path:*");
            return { status: true, message: "Profile picture deleted" }
        }
    } catch (err) {
        return { status: false, message: "Something went wrong, please try again later" }
    }
}

export const isUserHasPassword = async () => {
    const userAccount = await getUserAccount();
    if(!userAccount || userAccount.length === 0) return false;
    const res = userAccount.filter(user => user.password && user.password.length !== 0);

    return res.length !== 0;
}

export const setupNewAccount = async (username: string, password: string) => {

    const currentUser = await getCurrentUser();
    if(!currentUser) return {
        status: false,
        message: "User not found"
    }

    const usernameAvailable = await checkUsernameAvailability(username.trim());
    if(!usernameAvailable) return {
        status: false,
        message: "Username is not available"
    }

    try {
        const usernameRes = await auth.api.updateUser({
            body: { username: username.trim() },
            headers: await headers(),
        });

        if(!usernameRes) return {
            status: false,
            message: "Failed to set the username"
        }

        const passwordRes = await auth.api.setPassword({
            body: { newPassword: password.trim() },
            headers: await headers(),
        });

        if(!passwordRes) return {
            status: false,
            message: "Username saved. Please set your password in settings"
        };

        revalidatePath("/", "layout")

        return {
            status: true,
            message: "Account setup complete"
        };
    } catch(err) {
        return {
            status: false,
            message:"Something went wrong"
        }
    }
}

export const updateSessionVersion = async (id: string) => {
    if(!id) return false;
    
    const res = await db
        .update(user)
        .set({ sessionVersion: sql `${user.sessionVersion} + 1`})
        .where(eq(user.id, id));

    revalidatePath("/", "layout");
    revalidatePath("/", "page");
    revalidatePath("/settings");
    revalidatePath("/user/path:*");
    revalidatePath("/dashboard");

    return !!res;
}




