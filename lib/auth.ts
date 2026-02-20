import { db } from "@/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { customSession, username } from "better-auth/plugins";
import * as schema from "@/db/schema";
import { sendPasswordResetEmail } from "./emails/send-password-reset-email";
import { sendEmailVerification } from "./emails/send-email-verification";
import { eq } from "drizzle-orm";

export const auth = betterAuth({
    secret: process.env.BETTER_AUTH_SECRET,
    
    user: {
        deleteUser: {
            enabled: true
        }
    }, 

    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        sendResetPassword: async ({ user, url }) => {
            await sendPasswordResetEmail({ user, url });
        }
    },

    emailVerification: {
        autoSignInAfterVerification: true,
        sendOnSignUp: true,
        sendVerificationEmail: async ({ user, url }) => {
            await sendEmailVerification({ user, url })
        }
    },

    session: {
        cookieCache: {
            enabled: true,
            maxAge: 60 * 5,
        },
        expiresIn: 60 * 60 * 24,
        updateAge: 60 * 15,
    },

    rateLimit: {
        storage: "database",
    },

    socialProviders: {
        google: {
            prompt: "select_account", 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }
    },

    plugins: [nextCookies(), username(), customSession(async ({ user, session}) => {
        const fullUser = await db.select().from(schema.user).where(eq(schema.user.id, user.id))
        return {
            ...session,
            user: fullUser[0]
        }
    })],

    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            user: schema.user,
            session: schema.session,
            account: schema.account,
            verification: schema.verification,
            rateLimit: schema.rateLimit,
        },
    })
});

