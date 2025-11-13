import { signPinToken, verifyPinToken } from '@/lib/auth'
import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'
const PIN_HASH = process.env.APP_PIN_HASH!

export async function POST(req: NextRequest) {
  const { pin } = await req.json()
  const valid = await bcrypt.compare(pin, PIN_HASH)
  if (!valid) return NextResponse.json({message: "Invalid PIN"}, {status: 401})

  const token = signPinToken()
  const response = NextResponse.json({ success: true, message: "Authentication successful" }, { status: 200 })
  response.cookies.set({
    name: "token",
    value: token,
    httpOnly: true, // ปลอดภัย
    path: "/",      // สำคัญ! เพื่อให้ cookie อยู่ทุก path
    maxAge: 30 * 60 // 30 นาที
  })
  return response
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  const token = authHeader?.split(' ')[1]
  if (!token) return NextResponse.json({ valid: false, message: 'No token provided' }, { status: 401 })

  const verified = verifyPinToken(token)
  if (!verified) return NextResponse.json({ valid: false, message: 'Token invalid or expired' }, { status: 401 })

  return NextResponse.json({ valid: true })
}