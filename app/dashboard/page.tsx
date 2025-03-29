import { Card } from "@/components/ui/card"
import {
  Users,
  BarChart,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"

const stats = [
  {
    title: "Total Users",
    value: "2,543",
    change: "+12.5%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Revenue",
    value: "$45,231",
    change: "+8.2%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Active Sessions",
    value: "1,234",
    change: "-2.4%",
    trend: "down",
    icon: BarChart,
  },
]

const recentActivity = [
  {
    user: "John Doe",
    action: "Completed onboarding",
    time: "2 minutes ago",
  },
  {
    user: "Jane Smith",
    action: "Upgraded to Pro plan",
    time: "15 minutes ago",
  },
  {
    user: "Mike Johnson",
    action: "Added new integration",
    time: "1 hour ago",
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your business.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                {stat.trend === "up" ? (
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-500" />
                )}
                <span
                  className={`ml-1 text-sm ${
                    stat.trend === "up" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div
              key={activity.user}
              className="flex items-center justify-between py-2"
            >
              <div>
                <p className="font-medium">{activity.user}</p>
                <p className="text-sm text-muted-foreground">
                  {activity.action}
                </p>
              </div>
              <p className="text-sm text-muted-foreground">{activity.time}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
} 