"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Bell } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

export default function MyNavber() {
  const pathname = usePathname();
  const isProvider = pathname.startsWith("/provider");
  const router = useRouter();

  return (
    <header className="flex h-16 sm:h-20 items-center justify-between gap-4 bg-white px-4 sm:px-8 w-full border-b border-gray-100 sticky top-0 z-10">

      {/* Left: Sidebar Trigger & Welcome Text */}
      <div className="flex items-center gap-2 sm:gap-4 overflow-hidden">
        <SidebarTrigger className="h-9 w-9 sm:h-10 sm:w-10 bg-[#EDF7F7] cursor-pointer hover:bg-[#dceeee] text-[#6BB9BA] rounded-lg sm:rounded-xl shadow-none border-0 [&_svg]:h-4 [&_svg]:w-4 sm:[&_svg]:h-5 sm:[&_svg]:w-5 shrink-0" />
        <h1 className="text-base sm:text-xl font-bold text-gray-900 truncate">
          <span className="hidden xs:inline">Welcome back, </span>Rasel
        </h1>
      </div>

      {/* Right: Notifications & Profile */}
      <div className="flex items-center gap-3 sm:gap-6 shrink-0">

        {/* Notification Bell */}
        <Button onClick={() => router.push("/my-dashboard/notification")} variant="ghost" size="icon" className="relative h-9 w-9 sm:h-11 sm:w-11 rounded-lg sm:rounded-xl bg-[#F5F3FF] hover:bg-[#ebe6ff] text-foreground">
          <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 h-2 w-2 rounded-full bg-red-500 border-2 border-white ring-0" />
        </Button>

        {/* User Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="text-right hidden md:block">
            <p className="text-sm font-bold text-gray-900 leading-none mb-1">Rasel Parvez</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground font-medium uppercase tracking-wider">{isProvider ? "Provider" : "Client"}</p>
          </div>
          <Avatar className="h-9 w-9 sm:h-11 sm:w-11 rounded-lg sm:rounded-xl border border-gray-100 shadow-sm">
            <AvatarImage src="https://github.com/shadcn.png" alt="Rasel Parvez" />
            <AvatarFallback className="rounded-lg sm:rounded-xl bg-[#6BB9BA] text-white">RP</AvatarFallback>
          </Avatar>
        </div>

      </div>
    </header>
  )
}
