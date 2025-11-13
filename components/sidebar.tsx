'use client'

import { APP_CONFIG } from "@/config/app"
import { cn } from "@/lib/utils"
import axios from "axios"
import { CreditCard, LogOut, Menu, PiggyBank, Repeat, SquareChartGantt, Tags, X } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import { ModeToggle } from "./mode-toggle"
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
  const router = useRouter()
  const isActive = (path: string) => pathname?.startsWith(path)

  const handleLogout = async () => {
    try {
      toast.promise(
        axios.post("/api/auth/pin/logout"),
        {
          loading: "กำลังออกจากระบบ",
          success: "ออกจากระบบสำเร็จ",
          error: (err) => err?.response?.data?.message || err.message || "เกิดข้อผิดพลาด",
        }
      )
      router.push('/')
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <div className="h-full w-full lg:border-r bg-background/40 backdrop-blur-md">
      {/* header */}
      <div className="flex justify-between items-center border-b p-4">
        <div className="flex items-center gap-1">
          <PiggyBank/>
          <h1 className="text-lg font-bold">{APP_CONFIG.name}</h1>
        </div>
        <div className="flex items-center gap-3">
          <ModeToggle />
          <Button 
            size={"icon"} 
            variant={"outline"} 
            className="flex lg:hidden cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu
              className={cn(
                "h-[1.2rem] w-[1.2rem] transition-all",
                isMobileMenuOpen === false ? "scale-100 rotate-0" : "scale-0 -rotate-90"
              )}
            />
            <X
              className={cn(
                "absolute h-[1.2rem] w-[1.2rem] transition-all",
                isMobileMenuOpen === true ? "scale-100 rotate-0" : "scale-0 rotate-90"
              )}
            />
          </Button>
        </div>
      </div>
      {/* desktop route items */}
      <div className="relative hidden lg:flex flex-col justify-between gap-3 w-72 p-4">
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
        <hr />
        <Button 
          variant={"destructive"}
          className="w-full cursor-pointer"
          onClick={handleLogout}    
        >
          <LogOut />
          ออกจากระบบ
        </Button>
        
        <p className="fixed left-0 bottom-0 p-4 text-muted-foreground">{APP_CONFIG.name} V.{APP_CONFIG.version}</p>
      </div>
      {/* mobile route items */}
      {isMobileMenuOpen && (
        <div
          className={`
            bg-background absolute min-h-screen w-full flex flex-col lg:hidden gap-3 p-4
            transform transition-transform duration-300 ease-out
            ${isMobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
          `}
        >
          {routeItems.map((item, key) => (
            <Link href={item.path} key={key}>
              <Button 
                size="lg" 
                className="w-full flex justify-start items-center cursor-pointer" 
                variant={isActive(item.path) ? "default" : "ghost"}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.icon}
                <span>{item.label}</span>
              </Button>
            </Link>
          ))}
          <hr />
          <Button 
            variant={"destructive"}
            className="cursor-pointer"
            onClick={handleLogout}    
          >
            <LogOut />
            ออกจากระบบ
          </Button>
        </div>
      )}
    </div>
  )
}