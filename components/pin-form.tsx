import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { cn } from "@/lib/utils"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { Lock } from "lucide-react"

export function PINForm({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <Lock className="size-6" />
              </div>
              <span className="sr-only">Acme Inc.</span>
            </a>
            <h1 className="text-xl font-bold">ยืนยันตัวตน</h1>
            <FieldDescription>
              กรุณากรอกรหัสผ่าน 6 หลักเพื่อเข้าสู่ระบบ
            </FieldDescription>
          </div>
          <Field>
            <FieldLabel htmlFor="otp" className="sr-only">
              กรุณากรอกรหัสผ่าน
            </FieldLabel>
            <InputOTP
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS}
              id="otp"
              required
            >
              <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:h-16 *:data-[slot=input-otp-slot]:w-12 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border *:data-[slot=input-otp-slot]:text-xl mx-auto">
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <FieldDescription className="text-center">
              คิดไม่ออกเดี๋ยวค่อยหาคำดีๆมาใส่ละกัน ตรงนี้
            </FieldDescription>
          </Field>
          <Field>
            <Button type="submit" className="cursor-pointer">เข้าสู่ระบบ</Button>
          </Field>
        </FieldGroup>
      </form>
      <FieldDescription className="px-6 text-center">
        Made with 💖 by gawstxn
      </FieldDescription>
    </div>
  )
}
