"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Bell } from "lucide-react"
import { usePathname } from "next/navigation"

export default function MyNavber() {
  const pathname = usePathname();
  const isProvider = pathname.startsWith("/provider");

  return (
    <header className="flex h-20 items-center gap-4 bg-white px-6 w-full ">

      {/* Left: Sidebar Trigger & Welcome Text */}
      <div className="flex items-center gap-4 flex-1">
        <SidebarTrigger className="h-10 w-10 bg-[#EDF7F7] cursor-pointer hover:bg-[#dceeee] text-[#6BB9BA] rounded-xl shadow-none border-0 [&_svg]:h-5 [&_svg]:w-5" />
        <h1 className="text-xl font-bold text-foreground truncate">Welcome back, Rasel</h1>
      </div>

      {/* Right: Notifications & Profile */}
      <div className="flex items-center gap-6">

        {/* Notification Bell */}
        <Button variant="ghost" size="icon" className="relative h-11 w-11 rounded-xl bg-[#F5F3FF] hover:bg-[#ebe6ff] text-foreground">
          <Bell className="h-5 w-5" />
          <span className="absolute top-3 right-3 h-2 w-2 rounded-full bg-red-500 border-2 border-white ring-0" />
        </Button>

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-foreground leading-none mb-1">Rasel Parvez</p>
            <p className="text-xs text-muted-foreground font-medium">{isProvider ? "Provider" : "Client"}</p>
          </div>
          <Avatar className="h-11 w-11 rounded-xl border border-border/50">
            <AvatarImage src="https://github.com/shadcn.png" alt="Rasel Parvez" />
            <AvatarFallback className="rounded-xl bg-[#6BB9BA] text-white">RP</AvatarFallback>
          </Avatar>
        </div>

      </div>
    </header>
  )
}