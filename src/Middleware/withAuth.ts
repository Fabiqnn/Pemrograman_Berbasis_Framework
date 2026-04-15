import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";

const hanyaAdmin = ["/admin"];
const hanyaEditor = ["/editor"];

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
                const loginUrl = new URL("/auth/login", req.url);
                loginUrl.searchParams.set("callbackUrl", encodeURI(req.url));
                return NextResponse.redirect(loginUrl)
            }
            if (token.role !== "admin" && hanyaAdmin.includes(pathname)) {
                return NextResponse.redirect(new URL("/", req.url));
            }
            if (token.role !== "editor" && hanyaEditor.includes(pathname)) {
                return NextResponse.redirect(new URL("/", req.url));
            }
        }
        return middleware(req, next);
    }
}
