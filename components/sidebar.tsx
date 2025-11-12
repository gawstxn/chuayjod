'use client'

import { APP_CONFIG } from "@/config/app"
import { CreditCard, Menu, PiggyBank, Repeat, SquareChartGantt, Tags, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Button } from "./ui/button"

interface routeItem {
  label: string
  path: string
  icon: React.ReactNode
}

const routeItems: routeItem[] = [
  { label: 'แดชบอร์ด', path: '/dashboard', icon: <SquareChartGantt/> },
  { label: 'รายการธุรกรรม', path: '/transaction', icon: <Repeat/> },
  { label: 'หมวดหมู่', path: '/category', icon: <Tags/> },
  { label: 'บัญชี', path: '/account', icon: <CreditCard/> },
]

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)
  const pathname = usePathname()
  const isActive = (path: string) => pathname?.startsWith(path)

  return (
    <div className="h-full w-full lg:border-r bg-background">
      {/* header */}
      <div className="flex justify-between items-center border-b p-4">
        <div className="flex items-center gap-1">
          <PiggyBank/>
          <h1 className="text-lg font-bold">{APP_CONFIG.name}</h1>
        </div>
        <Button 
          size={"icon"} 
          variant={"outline"} 
          className="flex lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>
      {/* desktop route items */}
      <div className="hidden lg:flex flex-col gap-3 w-72 p-4">
        {routeItems.map((item, key) => (
          <Link href={item.path} key={key}>
            <Button 
              size={"lg"} 
              className="w-full flex justify-start items-center cursor-pointer" 
              variant={isActive(item.path) ? "default" : "ghost"}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.icon}
              <span>{item.label}</span>
            </Button>
          </Link>
        ))}
      </div>
      {/* mobile route items */}
      {isMobileMenuOpen && (
        <div className="bg-background fixed h-full w-full flex flex-col lg:hidden gap-3 p-4">
          {routeItems.map((item, key) => (
            <Link href={item.path} key={key}>
              <Button 
                size={"lg"} 
                className="w-full flex justify-start items-center cursor-pointer" 
                variant={isActive(item.path) ? "default" : "ghost"}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.icon}
                <span>{item.label}</span>
              </Button>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}