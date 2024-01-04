import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import { getUser } from "@src/app/api/actions";

// Using Next.js
export async function middleware(request: NextRequest) {
  // let token = request.cookies.get("session-token");
  const user = await getUser();
  // console.log(user);

  if (!user.id) {
    const url = request.nextUrl.clone();

    url.pathname = "/";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*", "/dashboard/:path*"],
};
