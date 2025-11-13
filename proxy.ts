import { verifyPinToken } from '@/lib/auth'
import * as cookie from 'cookie'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const PUBLIC_PATHS = ['/', '/api/auth']
const VALID_PATHS = [
  '/',
  '/dashboard',
  '/transaction',
  '/account',
  '/category'
]

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const cookies = cookie.parse(request.headers.get('cookie') || '')
  const token = cookies.pin_token

  // 1. หน้า PIN (/)
  if (pathname === '/') {
    if (token) {
      const verified = verifyPinToken(token)
      if (verified) return NextResponse.redirect(new URL('/dashboard', request.url))
      else {
        const response = NextResponse.next()
        response.cookies.delete({
        name: 'pin_token',
          path: '/',  
        })
        return response
      }
    }
    return NextResponse.next() // ไม่มี token → หน้า PIN
  }

  // 2. Public API → allow
  const isPublicPath = PUBLIC_PATHS.some((path) => pathname === path || pathname.startsWith(path + '/'))
  if (isPublicPath) return NextResponse.next()

  // 3. ตรวจสอบ token
  if (!token) return NextResponse.redirect(new URL('/', request.url))
  const verified = verifyPinToken(token)
  if (!verified) {
    const response = NextResponse.redirect(new URL('/', request.url))
    response.cookies.delete({
    name: 'pin_token',
      path: '/',  
    })
    return response
  }

  // 4. ตรวจสอบ path ที่มีอยู่จริง
  if (!VALID_PATHS.includes(pathname)) {
    console.warn(`Attempted access to invalid path: ${pathname}`)
    return NextResponse.redirect(new URL('/dashboard', request.url)) // redirect ไป dashboard แทน 404
  }

  // 5. token valid + path valid → allow
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
