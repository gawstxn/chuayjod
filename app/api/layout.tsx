import Sidebar from "@/components/sidebar"

export default function UserLayout({children}: {children: React.ReactNode}) {
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="sticky top-0 flex">
        <Sidebar/>
      </div>
      <main className="w-full">{children}</main>
    </div>
  )
}