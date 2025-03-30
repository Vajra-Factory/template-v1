import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Zap,
  BarChart3,
  Settings,
  Cpu,
  Cloud,
} from "lucide-react"

const items = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Optimization",
    href: "/dashboard/optimization",
    icon: Zap,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "GPU Status",
    href: "/dashboard/gpu",
    icon: Cpu,
  },
  {
    title: "Cloud",
    href: "/dashboard/cloud",
    icon: Cloud,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function DashboardNav() {
  const path = usePathname()

  return (
    <nav className="grid items-start gap-2">
      {items.map((item) => {
        const Icon = item.icon
        return (
          <Button
            key={item.href}
            variant={path === item.href ? "secondary" : "ghost"}
            className={cn(
              "justify-start",
              path === item.href && "bg-muted"
            )}
            asChild
          >
            <Link href={item.href}>
              <Icon className="mr-2 h-4 w-4" />
              {item.title}
            </Link>
          </Button>
        )
      })}
    </nav>
  )
} 