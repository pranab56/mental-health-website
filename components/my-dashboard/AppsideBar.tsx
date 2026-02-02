"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { motion } from "framer-motion";
import {
  Calendar,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Receipt,
  Search,
  User,
  Users
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const menuItems = [
  { name: "Dashboard", path: "/my-dashboard", icon: LayoutDashboard },
  { name: "Find Provider", path: "/my-dashboard/providers", icon: Search },
  { name: "My Appointments", path: "/my-dashboard/appointments", icon: Calendar },
  { name: "Billing & Payments", path: "/my-dashboard/billing", icon: Receipt },
  { name: "Message", path: "/my-dashboard/messages", icon: MessageSquare },
  { name: "My Profile", path: "/my-dashboard/profile", icon: User },
];

export default function AppSideBar() {
  const pathname = usePathname();
  const router = useRouter();

  // Helper to determine active state
  const isActive = (path: string) => {
    if (path === "/my-dashboard") {
      return pathname === path;
    }
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const handleLogout = () => {
    router.push("/logout");
  };

  return (
    <Sidebar className="border-none max-w-[280px]">
      <SidebarContent className="bg-[#6BB9BA] text-white flex flex-col h-full font-sans">

        {/* LOGO Header */}
        <SidebarHeader className="p-8 pb-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative flex items-center justify-center">
              {/* Icon placeholder matching the image - Two figures/Users */}
              <Users className="w-10 h-10 text-[#6d4cba]" />
              {/* The icon in the image is purple-ish, fitting the 'secondary' theme color likely */}
              <div className="absolute -top-1 -right-1">
                <MessageSquare className="w-4 h-4 text-white fill-white stroke-none" style={{ transform: 'scaleX(-1)' }} />
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Mynder Therapy
            </span>
          </Link>
        </SidebarHeader>

        {/* Navigation */}
        <SidebarGroup className="flex-1 px-0 mt-8">
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {menuItems.map((item) => {
                const active = isActive(item.path);

                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                      asChild
                      className={`h-14 px-8 w-full rounded-none transition-all duration-200 hover:bg-white/10 ${active
                        ? "bg-[#9B85C1] hover:bg-[#9B85C1] text-white font-medium relative after:absolute after:left-0 after:top-0 after:h-full after:w-1 after:bg-white/50"
                        : "text-white/90"
                        }`}
                    >
                      <Link href={item.path} className="flex items-center gap-4 text-base">
                        <item.icon className={`w-5 h-5 ${active ? "text-white" : "text-white"}`} strokeWidth={1.5} />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Footer / Logout */}
        <SidebarFooter className="p-8 pb-10">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className="w-full h-12 bg-[#FF5858] cursor-pointer hover:bg-[#ff4545] text-white rounded-xl font-medium flex items-center justify-center gap-3 shadow-lg transition-colors"
          >
            <LogOut className="w-5 h-5 rotate-180" />
            <span>Logout</span>
          </motion.button>
        </SidebarFooter>

      </SidebarContent>
    </Sidebar>
  );
}