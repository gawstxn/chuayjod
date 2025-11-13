// app/not-found.tsx
import { verifyPinToken } from "@/lib/auth"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function NotFoundPage() {
  const token = (await cookies()).get("token")?.value

  if (!token) redirect("/pin")

  try {
    const decoded = verifyPinToken(token)
    redirect("/dashboard")
  } catch (err) {
    // token invalid → ไป /pin
    redirect("/pin")
  }

  return (
    <div>test</div>
  )
}
