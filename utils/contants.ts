import { Route } from "@/types"
import { CreditCard, House, Repeat, Tags } from "lucide-react"

export const routes: Route[] = [
  { label: 'หน้าแรก', path: '/home', icon: House },
  { label: 'ธุรกรรม', path: '/transaction', icon: Repeat },
  { label: 'หมวดหมู่', path: '/category', icon: Tags },
  { label: 'บัญชี', path: '/account', icon: CreditCard },
]