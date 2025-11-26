import BottomNav from "@/components/bottom-nav"
import Sidebar from "@/components/sidebar"


export default function UserLayout({children}: {children: React.ReactNode}) {
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="hidden lg:block">
        <Sidebar/>
      </div>
      <main className="w-full">
        {children}
      </main>
      <div>
        <BottomNav/>
      </div>
    </div>
  )
}