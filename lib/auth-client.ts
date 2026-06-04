import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields, phoneNumberClient, twoFactorClient, usernameClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL,
    plugins: [usernameClient(), phoneNumberClient(), twoFactorClient({
        onTwoFactorRedirect: () => {
            window.location.href = "/auth/two-factor-auth"
        }
    }) ,inferAdditionalFields({
        user: {
            phoneNumber: {
                type: 'string',
                required: false,
                defaultValue: "",
                input: true,
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
    })]
});

export const { signIn, signUp, signOut, useSession } = authClient;
export type Session = typeof authClient.$Infer.Session;