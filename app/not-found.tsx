// app/not-found.tsx
"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function NotFoundPage() {
  const router = useRouter()

  useEffect(() => {
    // ตรวจ token
    const token = document.cookie
      .split("; ")
      .find((c) => c.startsWith("token="))
      ?.split("=")[1]

    if (token) {
      // ถ้ามี token → ไป /dashboard
      router.replace("/dashboard")
    } else {
      // ไม่มี token → ไป /pin
      router.replace("/pin")
    }
  }, [router])

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-gray-500">Page not found. Redirecting...</p>
    </div>
  )
}
