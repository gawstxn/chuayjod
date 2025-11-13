import { verifyPinToken } from "@/lib/auth"
import * as cookie from "cookie"
import { NextRequest, NextResponse } from "next/server"

// ✅ หน้า public ที่ไม่ต้องล็อกอินก็เข้าได้
const PUBLIC_PATHS = ["/pin", "/api/auth"]

// ✅ หน้า protected ที่ต้องล็อกอินก่อนถึงจะเข้าได้
const PROTECTED_PATHS = [
  "/dashboard",
  "/transaction",
  "/account",
  "/category",
]

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const cookies = cookie.parse(request.headers.get("cookie") || "")
  const token = cookies.token

  // 🧩 ฟังก์ชันช่วยเช็ก path
  const isPublic = PUBLIC_PATHS.some((path) => pathname === path || pathname.startsWith(path + "/"))
  const isProtected = PROTECTED_PATHS.some((path) => pathname === path || pathname.startsWith(path + "/"))

  // ✅ ถ้ามี token แล้วพยายามเข้า / หรือ /pin → ไป /dashboard
  if (token && pathname.startsWith("/pin")) {
    try {
      const payload = await verifyPinToken(token)
      if (payload) {
        const url = request.nextUrl.clone()
        url.pathname = "/dashboard"
        return NextResponse.redirect(url)
      }
    } catch {
      // ถ้า token เสียหาย → ลบ cookie แล้วไป /pin
      const res = NextResponse.redirect(new URL("/pin", request.url))
      res.cookies.delete("token")
      return res
    }
  }

  // ✅ ถ้าเป็น public page → ผ่านได้เลย
  if (isPublic) {
    return NextResponse.next()
  }

  // ✅ ถ้าเป็น protected page แต่ไม่มี token → ไป /pin
  if (isProtected && !token) {
    const url = request.nextUrl.clone()
    url.pathname = "/pin"
    return NextResponse.redirect(url)
  }

  // ✅ ถ้ามี token → ตรวจสอบว่า valid ไหม
  if (isProtected && token) {
    try {
      const payload = await verifyPinToken(token)
      if (payload) return NextResponse.next()
    } catch {
      const res = NextResponse.redirect(new URL("/pin", request.url))
      res.cookies.delete("token")
      return res
    }
  }

  if (!isPublic && !isProtected) {
    // ✅ ถ้ามี token valid → ให้ next() ผ่าน
    if (token) {
      try {
        const payload = await verifyPinToken(token)
        if (payload) return NextResponse.next()
      } catch {
        // ถ้า token เสีย → redirect /pin
        const res = NextResponse.redirect(new URL("/pin", request.url))
        res.cookies.delete("token")
        return res
      }
    }

    // ✅ ถ้าไม่มี token → redirect ไป /
    const url = request.nextUrl.clone()
    url.pathname = "/"
    return NextResponse.redirect(url)
  }
}

// ✅ ระบุ path ที่ middleware จะตรวจจับ
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
