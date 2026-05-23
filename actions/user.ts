/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { db } from "@/db"
import { account, followers, user, stream, User } from "@/db/schema";
import { auth } from "@/lib/auth";
import { getInfo } from "@/lib/get-session";
import { count, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export const getUsers = async () => {
    const res = await db.query.user.findMany({})
    return res;
}

export const getUserByUsername = async (username: string) => {
    const cleanUsername = username.trim();
    const res = await db
        .select({
            user,
            stream,
            followersCount: count(followers.followerId),
        })
        .from(user)
        .leftJoin(stream, eq(stream.userId, user.id))
        .leftJoin(
            followers,
            eq(followers.followingId, user.id)
        )
        .where(eq(user.username, cleanUsername))
        .groupBy(user.id, stream.id);

    const result = {
        user: res[0].user,
        stream: res[0].stream,
        followersCount: res[0].followersCount
    };
    return result;
};

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

// export const getCurrentUser = async () => {
//     const data = await getInfo();
//     const session = data?.session || null;
//     if(!session || !session.user) return null;

//     const res = await db.query.user.findFirst({
//         where: eq(user.id, session.user.id)
//     })
    
//     return res ?? null;
// }

export const getUserAccount = async () => {
    const data = await getInfo();
    const session = data?.session || null;
    if(!session || !session.user) return null;

    const getCurrentUserAccount = await db.query.account.findMany({
        where: eq(account.userId, session.user.id)
    });

    return getCurrentUserAccount;
}

export const getUserById = async (userId: string) => {
    const res = await db.query.user.findFirst({
        where: eq(user.id, userId),
    });

    return res;
}

export const changeEmail = async (currentEmail: string, newEmail: string) => {
    const normalizedCurrentEmail = currentEmail.trim().toLowerCase();
    const normalizedNewEmail = newEmail.trim().toLowerCase();

    if(normalizedCurrentEmail === normalizedNewEmail) return {
        status: false,
        message: "New email must be different to current email"
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedNewEmail)) {
        return {
            status: false,
            message: "Please enter a valid email address"
        }
    }

    try {
        console.log("[changeEmail] Starting email change request for:", { currentEmail, newEmail });
        
        const res = await auth.api.changeEmail({
            body: {
                newEmail: normalizedNewEmail,
                callbackURL: "/settings",
            },
            headers: await headers(),
        });

        console.log("[changeEmail] Response received:", res);

        const error = (res as { error?: unknown } | null | undefined)?.error;
        const errorMessage =
            typeof error === "string"
                ? error
                : typeof (error as { message?: unknown } | undefined)?.message === "string"
                  ? (error as { message?: string }).message
                  : undefined;

        if (!res || errorMessage) {
            console.error("[changeEmail] Error in response:", errorMessage ?? res);
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

export const updateUserDetails = async (data: Partial<User>) => {

    const info = await getInfo();
    const currentUser = info?.currentUser || null;

    if(!currentUser) {
        return { status: false, message: "User doesn't exists" }
    }

    // if(!checkUsernameAlreadyExists.available) {
    //     return { status: false, message: checkUsernameAlreadyExists.message}
    // } 

    const updateData = Object.fromEntries(
        Object.entries(data).filter((_, item) => item !== undefined)
    )

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
    const data = await getInfo();
    const currentUser = data?.currentUser || null;;
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
    const data = await getInfo();
    const currentUser = data?.currentUser || null;;
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

    const data = await getInfo();
    const currentUser = data?.currentUser || null;;
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





