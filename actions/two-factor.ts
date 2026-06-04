"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function enableTwoFactor(password: string) {
    const data = await auth.api.enableTwoFactor({
        body: {
            password,
        },
        headers: await headers(),
    });
    return data;
}

export async function disableTwoFactor(password: string) {
    const data = await auth.api.disableTwoFactor({
        body: {
            password,
        },
        headers: await headers(),
    });
    return data;
}

export async function verifyTwoFactorTotp(otp: string) {
    const data = await auth.api.verifyTOTP({
        body: {
            code: otp
        },
        headers: await headers()
    });

    return data;
}