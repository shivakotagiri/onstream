import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/get-session";


export async function proxy(req: NextRequest) {
    const session = await getSession();

    const { pathname } = req.nextUrl;
    const isAuthPage = pathname.startsWith("/auth");
    const isSettingsPage = pathname.startsWith("/settings");

    if(isAuthPage && session && session.user) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    if(isSettingsPage && (!session || !session.user)) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/auth/:path*", "/settings"],
}