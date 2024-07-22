import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { verifyTokenJose } from "./lib/jwt";
import { JWSInvalid } from "jose/errors";

export async function middleware(request: NextRequest) {
  // console.log("kena middleware");

  if (request.nextUrl.pathname.startsWith("/login")) {
    let cookie = request.cookies.get("Authorization");

    if (cookie) {
      return NextResponse.redirect(new URL("/products", request.url));
    }
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith("/api/wishlist")) {
    let bearerToken = request.cookies.get("Authorization");

    if (!bearerToken?.value) {
      return NextResponse.json(
        { message: "Invalid Token" },
        {
          status: 401,
        }
      );
    }
    const [type, token] = bearerToken.value.split(" ");
    if (type !== "Bearer" || !token) {
      return NextResponse.json(
        {
          message: "invalid token",
        },
        {
          status: 401,
        }
      );
    }
    try {
      const { _id }: any = await verifyTokenJose(token);
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("_id", _id);

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error) {
      if (error instanceof JWSInvalid) {
        return NextResponse.json(
          {
            message: "Invalid Token",
          },
          {
            status: 401,
          }
        );
      }
      console.error(error, "< err");
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login/:path*", "/api/wishlist/:path*"],
};
