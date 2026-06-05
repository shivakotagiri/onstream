import { db } from "@/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { phoneNumber, twoFactor, username } from "better-auth/plugins";
import { sendPasswordResetEmail } from "./emails/send-password-reset-email";
import { sendEmailVerification } from "./emails/send-email-verification";
import { sendChangeEmailConfirmationRequest } from "./emails/send-change-email-confirmation";
import * as schema from "@/db/schema";
import { APIError } from "better-auth/api";

export const auth = betterAuth({
    appName: "onStream",
    secret: process.env.BETTER_AUTH_SECRET,

    databaseHooks: {
        user: {
            create: {
                // before: async (userData) => {
                //     const data = await db.query.user.findFirst({
                //         where: eq(schema.user.id, userData.id),
                //     });

                //     if(data && data.twoFactorEnabled) {
                //         redirect("/auth/two-factor-auth");
                //     }
                // },
                after: async (user) => {
                    try {
                        await db.insert(schema.stream).values({
                            userId: user.id,
                            name: `${user.username}'s Stream`
                        });
                    } catch (err) {
                        if(err instanceof Error) {
                            throw new APIError("EXPECTATION_FAILED", {
                                message: err.message
                            })
                        }
                    }
                }
            }
        }
    },
    
    user: {
        deleteUser: {
            enabled: true
        },

        changeEmail: {
            enabled: true,
            sendChangeEmailConfirmation: async ({ newEmail, url, user }) => {
                const email = user.email;
                console.log("[auth] sendChangeEmailConfirmation triggered for:", newEmail);
                await sendChangeEmailConfirmationRequest({ email, url, user });
            },
            sendChangeEmailVerification: async (newEmail: string, url:string, user: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                email: string;
                emailVerified: boolean;
                name: string;
                image?: string | null | undefined;
            }) => {
                const email = newEmail;
                console.log("[auth] sendChangeEmailVerification triggered for:", newEmail);
                await sendChangeEmailConfirmationRequest({ email, url, user });
            }
        },

        additionalFields: {
            phoneNumber: {
                type: 'string',
                required: false,
                defaultValue: "",
                input: true
            },

            bio: {
                type: 'string',
                required: false,
                defaultValue: "",
                input: true
            },

            bannerImage: {
                type: 'string',
                required: false,
                defaultValue: "",
                input: true
            },

            dob: {
                type: 'date',
                required: false,
                defaultValue: null,
                input: true
            },

            sessionVersion: {
                type: 'number',
                required: false,
                defaultValue: 0,
                input: false
            }
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
        },
    },

    plugins: [nextCookies(), username(), phoneNumber(), twoFactor({
        allowPasswordless: true,
    })],

    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            user: schema.user,
            session: schema.session,
            account: schema.account,
            verification: schema.verification,
            rateLimit: schema.rateLimit,
            twoFactor: schema.twoFactor,
        },
    })
});

