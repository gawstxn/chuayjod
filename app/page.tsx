import { verifyPinToken } from "@/lib/auth"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function HomePage() {
  const token = ((await cookies()).get('token')?.value)

  // ถ้าไม่มี token → ไป /pin
  if (!token) {
    redirect("/pin")
  }
  // ตรวจสอบ token
  const decoded = verifyPinToken(token)

  if (!decoded) {
    redirect("/pin")
  }

  // ถ้าผ่านทั้งหมด → ไป /dashboard
  redirect("/dashboard")
}
