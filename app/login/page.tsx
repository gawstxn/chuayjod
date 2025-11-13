"use client"
import { useEffect, useState } from "react"

export default function HomePage() {
  const [authed, setAuthed] = useState(false)

  useEffect(() => {
    checkToken()
  }, [])
  async function checkToken() {
    const token = localStorage.getItem("token")
    if (!token) return

    const res = await fetch("/api/auth/pin", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await res.json()
    if (data.valid) setAuthed(true)
  }


  async function handleLogin() {
    const pin = prompt("Enter your PIN:") || ""
    if (!pin) return

    const res = await fetch("/api/auth/pin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pin }),
    })
    const data = await res.json()

    if (data.success) {
      localStorage.setItem("token", data.token)
      setAuthed(true)
    } else {
      alert(data.message)
      handleLogin()
    }
  }

  if (!authed) return <button onClick={handleLogin}>Login with PIN</button>

  return <div>✅ Welcome! You are authenticated.</div>
}
