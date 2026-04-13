import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import withAuth from "./Middleware/withAuth";

function baseMiddleware(request: NextRequest) {
    // Middleware utama: bisa untuk logging, dll.
    console.log("Middleware utama dijalankan untuk:", request.nextUrl.pathname);
    return NextResponse.next();
}

export const middleware = withAuth(baseMiddleware, ["/produk", "/profile", "/about"]);

export const config = {
    matcher: ["/produk/:path*", "/about/:path*", "/profile/:path*"]
}