'use client'

import { DatePicker } from "@/components/date-picker"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

export default function HomePage() {
  return (
    <div className="p-4">
      <h1>hello chuayjod</h1>
      <div className="flex items-center gap-3">
        <DatePicker />
        <Input />
      </div>
      <Button
        className="mt-4" 
        variant="outline"
        onClick={() => {
          toast.promise<{ name: string }>(
            () =>
              new Promise((resolve) =>
                setTimeout(() => resolve({ name: "Event" }), 2000)
              ),
            {
              loading: "Loading...",
              success: (data) => `${data.name} has been created`,
              error: "Error",
            }
          )
        }}
      >
        Promise
      </Button>
    </div>
  )
}