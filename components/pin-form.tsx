'use client'

import { Field, FieldDescription, FieldGroup } from "@/components/ui/field"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { cn } from "@/lib/utils"
import axios from 'axios'
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { Lock } from "lucide-react"
import { useRouter } from "next/navigation"
import { useRef, useState } from "react"
import { toast } from "sonner"

export function PINForm({ className, ...props }: React.ComponentProps<"div">) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isSubmitting) return
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const pin = formData.get("pin")?.toString() || ""

    try {
      const loginPromise = axios.post("/api/auth/pin", { pin })
      toast.promise(
        loginPromise,
        {
          loading: "กำลังตรวจสอบ PIN...",
          success: "เข้าสู่ระบบสำเร็จ",
          error: "PIN ไม่ถูกต้องโปรดลองใหม่อีกครั้ง",
        }
      )
      await loginPromise
      router.refresh()
    } catch (error: any) {
      console.log("Error: ", error?.message)
    }
    finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleLogin} ref={formRef}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <Lock className="size-6" />
              </div>
            </a>
            <h1 className="text-xl font-bold">Chuayjod PIN</h1>
            <FieldDescription>
              กรุณายืนยันตัวตนด้วย PIN เพื่อเข้าสู่ระบบ
            </FieldDescription>
          </div>
          <Field>
            <InputOTP
              name="pin"
              id="pin"
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS}
              required
              onComplete={() => {
                if (!isSubmitting) {
                  formRef.current?.requestSubmit()
                }
              }}
            >
              <InputOTPGroup className="gap-1.5 *:data-[slot=input-otp-slot]:h-16 *:data-[slot=input-otp-slot]:w-12 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border *:data-[slot=input-otp-slot]:text-xl mx-auto">
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <FieldDescription className="text-center">
              Made with 💖 by <span className="underline cursor-pointer" onClick={() => router.push('https://github.com/gawstxn')}>gawstxn</span>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </div>
  )
}
