import { NextRequest, NextResponse } from "next/server";
import { UserRole } from "./const";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const role = req.cookies.get("role")?.value;
  const pathname = req.nextUrl.pathname;

  const isPublicPath = pathname.match("/");

  if (isPublicPath) {
    return NextResponse.next();
  }

  if (!token || !role) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    if (pathname.startsWith("/admin") && role === UserRole.USER) {
      const userPath = pathname.replace("/admin", "") || "/";
      return NextResponse.redirect(new URL(userPath, req.url));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}
