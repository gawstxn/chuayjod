'use client'

import { PINForm } from "@/components/pin-form"

export default function PinPage() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <PINForm />
      </div>
    </div>
  )
}
