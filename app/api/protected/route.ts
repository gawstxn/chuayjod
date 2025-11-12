import { verifyToken } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  if (!authHeader) return NextResponse.json({error: "Missing token"}, {status: 401})
    
  const token = authHeader.replace("Bearer ", "")
  const decoded = verifyToken(token)
  if (!decoded) return NextResponse.json({error: "Invalid token"}, {status: 401})

  return NextResponse.json({message: "Verify token success ✅", user: decoded})
}