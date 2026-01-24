import { createAuthClient } from "better-auth/client";
import { usernameClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
    plugins: [usernameClient()]
});

export const signIn = async () => {
    await authClient.signIn.social({
        provider: 'google'
    });
}