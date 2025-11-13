'use client'

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import * as React from "react"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // ป้องกัน hydration mismatch
  React.useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="cursor-pointer"
    >
      <Sun
        className={cn(
          "h-[1.2rem] w-[1.2rem] transition-all",
          theme === "light" ? "scale-100 rotate-0" : "scale-0 -rotate-90"
        )}
      />
      <Moon
        className={cn(
          "absolute h-[1.2rem] w-[1.2rem] transition-all",
          theme === "dark" ? "scale-100 rotate-0" : "scale-0 rotate-90"
        )}
      />
    </Button>
  )
}
