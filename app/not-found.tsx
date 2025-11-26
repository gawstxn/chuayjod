import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function NotFoundPage() {
  const token = (await cookies()).get("token")?.value
  if (!token) redirect("/pin")
  redirect("/home")
}
