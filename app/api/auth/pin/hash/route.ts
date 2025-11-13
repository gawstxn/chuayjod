import bcrypt from "bcryptjs"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { pin } = await req.json()
  const pinHashed = await bcrypt.hash(pin, 10)
  return NextResponse.json({pinHashed})
}