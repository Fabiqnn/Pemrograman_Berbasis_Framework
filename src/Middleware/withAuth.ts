import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";

export default function withAuth(
    middleware: NextMiddleware,
    requireAuth: string[] = [],
) {
    return async (req: NextRequest, next: NextFetchEvent) => {
        const pathname = req.nextUrl.pathname;
        const needsAuth = requireAuth.some((route) => (
            pathname === route || pathname.startsWith(`${route}/`)
        ));

        if (needsAuth) {
            const token = await getToken({
                req,
                secret: process.env.NEXTAUTH_SECRET
            });
            console.log(`Middleware: Checking token for ${pathname}, token:`, token ? 'exists' : 'null');

            if (!token) {
                const loginUrl = new URL("/", req.url);
                return NextResponse.redirect(loginUrl)
            }
        }
        return middleware(req, next);
    }
}
