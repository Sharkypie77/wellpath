
"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar"
import {
  Bell,
  HeartPulse,
  LayoutGrid,
  LifeBuoy,
  Pill,
  Settings,
  BookOpen,
  CalendarDays,
  User,
  MessageCircle,
  ClipboardCheck,
  LineChart,
} from "lucide-react"
import { Logo } from "@/components/logo"
import { AppHeader } from "@/components/app-header"
import { AttributionFooter } from "@/components/attribution-footer"
import { FirebaseClientProvider } from "@/firebase/client-provider"

const menuItems = [
  { href: "/dashboard", icon: LayoutGrid, label: "Dashboard" },
  { href: "/assessment", icon: HeartPulse, label: "Assessment" },
  { href: "/progress", icon: LineChart, label: "Progress" },
  { href: "/daily-quiz", icon: ClipboardCheck, label: "Daily Quiz" },
  { href: "/chatbot", icon: MessageCircle, label: "Chatbot" },
  { href: "/education", icon: BookOpen, label: "Education" },
  { href: "/medications", icon: Pill, label: "Medications" },
  { href: "/appointments", icon: CalendarDays, label: "Appointments" },
]

const bottomMenuItems = [
  { href: "/profile", icon: User, label: "Profile" },
  { href: "/help", icon: LifeBuoy, label: "Help & Support" },
]

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <FirebaseClientProvider>
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <Logo />
          </SidebarHeader>
          <SidebarContent className="p-2">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.label}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              {bottomMenuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith(item.href)}
                    tooltip={item.label}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <AppHeader />
          <main className="min-h-0 flex-1 overflow-auto p-4 md:p-6 lg:p-8">
            <div className="mx-auto w-full max-w-7xl">{children}</div>
          </main>
          <AttributionFooter />
        </SidebarInset>
      </SidebarProvider>
    </FirebaseClientProvider>
  )
}
