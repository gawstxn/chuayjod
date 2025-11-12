'use client'

import { PINForm } from "@/components/pin-form"
import { useState } from "react"

export default function Page() {
  const [pin, setPin] = useState('')
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <PINForm 
          value={pin}
          onChange={setPin}
          onSubmit={(val) => {
            console.log('OTP ที่ส่ง:', val)
          }}
        />
      </div>
    </div>
  )
}
