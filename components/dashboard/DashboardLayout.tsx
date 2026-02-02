"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import OptimusSidebar from '../my-dashboard/AppsideBar';
import MyNavber from '../my-dashboard/myNavber';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <OptimusSidebar />
      <SidebarInset className="h-screen flex flex-col">
        <MyNavber />
        <main className="flex-1 py-2 px-5 overflow-auto min-w-0">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
