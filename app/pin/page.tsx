import { PINForm } from "@/components/pin-form"

export default function PinPage() {
  return (
    <div className="bg-foreground/2 flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm mb-20">
        <PINForm />
      </div>
    </div>
  )
}
