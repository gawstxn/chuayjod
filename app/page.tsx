import { verifyPinToken } from "@/lib/auth"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function HomePage() {
  const token = (await cookies()).get("token")?.value

  if (!token) redirect("/pin")

  try {
    const decoded = verifyPinToken(token)
  } catch (err) {
    redirect("/pin")
  }

  redirect("/dashboard")
}
