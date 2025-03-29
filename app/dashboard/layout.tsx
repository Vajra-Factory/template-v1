"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Palette, 
  Settings, 
  Users, 
  BarChart, 
  HelpCircle,
  LogOut,
  Menu
} from "lucide-react"

const sidebarLinks = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Projects",
    href: "/dashboard/projects",
    icon: Palette,
  },
  {
    title: "Team",
    href: "/dashboard/team",
    icon: Users,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    title: "Help",
    href: "/dashboard/help",
    icon: HelpCircle,
  },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session } = useSession()
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <div className="w-64 border-r border-white/5 bg-black/50 backdrop-blur-sm">
          <div className="flex h-full flex-col">
            <div className="flex-1 space-y-1 p-4">
              {sidebarLinks.map((link) => {
                const Icon = link.icon
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                      isActive
                        ? "bg-white/5 text-white"
                        : "text-white/60 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {link.title}
                  </Link>
                )
              })}
            </div>
            <div className="border-t border-white/5 p-4">
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 text-white/60 hover:bg-white/5 hover:text-white"
                asChild
              >
                <Link href="/api/auth/signout">
                  <LogOut className="h-4 w-4" />
                  Sign out
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
} 