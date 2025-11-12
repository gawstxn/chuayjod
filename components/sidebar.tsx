'use client'

import { SquareKanban } from "lucide-react"

interface routeItem {
  label: string
  path: string
  icon: React.ReactNode
}

const routeItems: routeItem[] = [
  { label: 'แดชบอร์ด', path: '/dashboard', icon: <SquareKanban/> },
  { label: 'รายการธุรกรรม', path: '/transaction', icon: <SquareKanban/> },
  { label: 'บัญชี', path: '/account', icon: <SquareKanban/> },
  { label: 'หมวดหมู่', path: '/category', icon: <SquareKanban/> },
]

export default function Sidebar() {
  return (
    <div>sidebar</div>
  )
}