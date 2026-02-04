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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  ClockAlert,
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
import { useEffect, useState } from "react";

type MenuItem = {
  name: string;
  path: string;
  icon: any;
  children?: { name: string; path: string }[];
};

const clientMenuItems: MenuItem[] = [
  { name: "Dashboard", path: "/my-dashboard", icon: LayoutDashboard },
  { name: "Find Provider", path: "/my-dashboard/providers", icon: Search },
  { name: "My Appointments", path: "/my-dashboard/appointments", icon: Calendar },
  { name: "Billing & Payments", path: "/my-dashboard/billing", icon: Receipt },
  { name: "Message", path: "/my-dashboard/messages", icon: MessageSquare },
  { name: "My Profile", path: "/my-dashboard/profile", icon: User },
];

const providerMenuItems: MenuItem[] = [
  { name: "Overview", path: "/provider", icon: LayoutDashboard },
  {
    name: "Appointments",
    path: "/provider/appointments",
    icon: Calendar,
    children: [
      { name: "Upcoming Appoint...", path: "/provider/appointments/upcoming" },
      { name: "Completed Appoint...", path: "/provider/appointments/completed" },
      { name: "Cancelled / No Shows", path: "/provider/appointments/cancelled" },
    ]
  },
  { name: "Clients", path: "/provider/clients", icon: Users },
  { name: "Availability", path: "/provider/availability", icon: ClockAlert },
  { name: "Billing", path: "/provider/billing", icon: Receipt },
  { name: "Messages", path: "/provider/messages", icon: MessageSquare },
  { name: "Profile", path: "/provider/profile", icon: User },
];

export default function AppSideBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [openItems, setOpenItems] = useState<string[]>([]);

  const isProviderPath = pathname.startsWith("/provider");
  const menuItems = isProviderPath ? providerMenuItems : clientMenuItems;

  // Initialize open items based on current path
  useEffect(() => {
    if (isProviderPath) {
      const activeItem = providerMenuItems.find(item =>
        item.children?.some(child => pathname.startsWith(child.path))
      );
      if (activeItem) {
        setOpenItems([activeItem.name]);
      }
    }
  }, [pathname, isProviderPath]);

  const toggleItem = (name: string) => {
    setOpenItems(prev =>
      prev.includes(name) ? prev.filter(i => i !== name) : [...prev, name]
    );
  };

  // Helper to determine active state
  const isActive = (path: string) => {
    if (path === "/my-dashboard" || path === "/provider") {
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
                const hasChildren = "children" in item && !!item.children;
                const isSectionOpen = openItems.includes(item.name);

                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                      asChild={!hasChildren}
                      onClick={hasChildren ? () => toggleItem(item.name) : undefined}
                      className={cn(
                        "h-14 px-8 w-full rounded-none transition-all duration-200 hover:bg-white/10 cursor-pointer",
                        active
                          ? "bg-[#9B85C1] hover:bg-[#9B85C1] text-white font-medium relative after:absolute after:left-0 after:top-0 after:h-full after:w-1 after:bg-white/50"
                          : "text-white/90"
                      )}
                    >
                      {hasChildren ? (
                        <div className="flex items-center gap-4 text-base w-full">
                          <item.icon className="w-5 h-5" strokeWidth={1.5} />
                          <span>{item.name}</span>
                        </div>
                      ) : (
                        <Link href={item.path} className="flex items-center gap-4 text-base">
                          <item.icon className={`w-5 h-5 ${active ? "text-white" : "text-white"}`} strokeWidth={1.5} />
                          <span>{item.name}</span>
                        </Link>
                      )}
                    </SidebarMenuButton>

                    <AnimatePresence>
                      {hasChildren && isSectionOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <SidebarMenuSub className="border-none ml-10 flex flex-col gap-0 py-2">
                            {item.children?.map((child) => (
                              <SidebarMenuSubItem key={child.name}>
                                <SidebarMenuSubButton asChild className="h-10 hover:bg-white/10 rounded-none px-4">
                                  <Link href={child.path} className="flex items-center gap-3">
                                    <div className={cn(
                                      "w-2 h-2 rounded-full border border-white/50 bg-transparent shrink-0",
                                      pathname === child.path && "border-white bg-white"
                                    )} />
                                    <span className={cn(
                                      "text-sm font-light text-white/80",
                                      pathname === child.path && "text-white font-medium"
                                    )}>
                                      {child.name}
                                    </span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </motion.div>
                      )}
                    </AnimatePresence>
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