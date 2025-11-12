'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Page() {
  const router = useRouter()

  useEffect(() => {
    const authPassword = prompt('Enter password:')
    if (authPassword === '1234') {
      router.push('/dashboard')
    } else {
      alert('รหัสผ่านไม่ถูกต้อง')
    }
  }, [router])

  return <p>Checking password...</p>
}
