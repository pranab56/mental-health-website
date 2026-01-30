import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import OptimusSidebar from '../../components/my-dashboard/AppsideBar';
import MyNavber from '../../components/my-dashboard/myNavber';
import "../globals.css";

export const metadata: Metadata = {
  title: "Peterson Dashboard",
  description: "Peterson Dashboard",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
