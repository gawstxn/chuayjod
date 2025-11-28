"use client";

import BottomNav from "@/components/bottom-nav";
import Sidebar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { routes } from "@/utils/contants";
import { useParams, usePathname } from "next/navigation";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const params = useParams();
  const route = routes.find((route) => route.path === pathname);

  return (
    <div className="flex flex-col lg:flex-row">
      <Sidebar />
      <main className="w-full bg-foreground/2">
        <div className="flex justify-between items-center gap-4 w-full py-3.5 px-6 border-b">
          <h1 className="text-xl font-bold">
            {route?.label || `${params.userId}`}
          </h1>
          <Button size="sm">เพิ่มรายการใหม่</Button>
        </div>
        {children}
      </main>
      <div>
        <BottomNav />
      </div>
    </div>
  );
}
