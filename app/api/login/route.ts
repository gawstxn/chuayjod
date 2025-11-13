import { signToken } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"

const authUser = process.env.AUTH_USER
const authPass = process.env.AUTH_PASS

export async function POST(req: NextRequest) {
  const {username, password} = await req.json()
  if (username === authUser && password === authPass) {
    const token = signToken({username})
    return NextResponse.json({token})
  }
  return NextResponse.json({error: "Invalid credentials"}, {status: 401})
}