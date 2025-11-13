import { verifyPinToken } from "@/lib/auth"
import * as cookie from "cookie"
import { NextRequest, NextResponse } from "next/server"

const PUBLIC_PATHS = ["/pin", "/api/auth"]
const PROTECTED_PATHS = ["/dashboard", "/transaction", "/account", "/category"]

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const cookies = cookie.parse(request.headers.get("cookie") || "")
  const token = cookies.token

  const isPublic = PUBLIC_PATHS.some((path) => pathname === path || pathname.startsWith(path + "/"))
  const isProtected = PROTECTED_PATHS.some((path) => pathname === path || pathname.startsWith(path + "/"))

  // ถ้า path ไม่อยู่ใน whitelist → redirect /pin
  if (!isPublic && !isProtected) return NextResponse.redirect(new URL("/pin", request.url))

  // ถ้าเข้าหน้า /pin แต่มี token valid → redirect /dashboard
  if (pathname === "/pin" && token) {
    try {
      const payload = verifyPinToken(token)
      if (payload) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
      }
    } catch {
      const res = NextResponse.redirect(new URL("/pin", request.url))
      res.cookies.delete("token")
      return res
    }
  }

  // ถ้าเป็น protected path → ต้องมี token valid
  if(isProtected) {
    if (!token) return NextResponse.redirect(new URL("/pin", request.url))
    else return NextResponse.next()
  }
  // if (isProtected) {
  //   if (!token) {
  //   }
  //   try {
  //     const payload = verifyPinToken(token)
  //     if (payload) return NextResponse.next()
  //   } catch {
  //     const res = NextResponse.redirect(new URL("/pin", request.url))
  //     res.cookies.delete("token")
  //     return res
  //   }
  // }

  // public path → ผ่าน
  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/pin",
    "/dashboard/:path*",
    "/transaction/:path*",
    "/account/:path*",
    "/category/:path*",
  ],
}