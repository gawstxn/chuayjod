import * as cookie from "cookie"
import { NextRequest, NextResponse } from "next/server"
import { verifyPinToken } from "./lib/auth"

const PUBLIC_PATHS = ["/", "/pin", "/api/auth"]
const PROTECTED_PATHS = ["/home", "/transaction", "/account", "/category"]

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const cookies = cookie.parse(request.headers.get("cookie") || "")
  const token = cookies.token

  const isPublic = PUBLIC_PATHS.some(path => pathname === path || pathname.startsWith(path + "/"))
  const isProtected = PROTECTED_PATHS.some(path => pathname === path || pathname.startsWith(path + "/"))

  // ถ้าไม่มี token และเข้า protected -> /pin
  if (!token && isProtected) return NextResponse.redirect(new URL("/pin", request.url))

  // ถ้ามี token
  if (token) {
    try {
      verifyPinToken(token)
    } catch (err) {
      return NextResponse.redirect(new URL("/pin", request.url))
    }
    // ถ้า user มี token แต่ไป public path เช่น /pin → redirect ไป home
    if (isPublic) return NextResponse.redirect(new URL("/home", request.url))
  }

  // ถ้าเป็น path public หรือ token ถูกต้อง → อนุญาต
  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/pin",
    "/home/:path*",
    "/transaction/:path*",
    "/account/:path*",
    "/category/:path*",
  ],
}