'use client'

import { routes } from "@/utils/contants"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function BottomNav() {
  const pathname = usePathname()
  const isActive = (path: string) => pathname?.startsWith(path)

  return (
    <div className="lg:hidden fixed bottom-0 left-0 w-full bg-background border-t px-4 pt-2 pb-6 z-50">
      <div className="flex justify-around py-2">
        {routes.map((item) => (
          <Link href={item.path} key={item.path}>
            <div className="flex flex-col items-center text-sm">
              <item.icon size={18} className="mb-2"/>
              <span className="text-xs">{item.label}</span>
              {isActive(item.path) && <div className="w-full h-0.5 bg-primary mt-1 rounded-full"></div>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}