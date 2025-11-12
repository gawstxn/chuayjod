import { signToken } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const {username, password} = await req.json()
    console.log('Received:', username, password)
  if (username === 'aaa' && password === 'aaa') {
    const token = signToken({username})
    return NextResponse.json({token})
  }
  return NextResponse.json({error: "Invalid credentials"}, {status: 401})
}