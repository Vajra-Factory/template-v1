"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Activity, 
  Users, 
  Palette, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  Star
} from "lucide-react";

const stats = [
  {
    title: "Active Projects",
    value: "12",
    change: "+2",
    trend: "up",
    icon: Palette,
  },
  {
    title: "Team Members",
    value: "24",
    change: "+4",
    trend: "up",
    icon: Users,
  },
  {
    title: "Productivity",
    value: "89%",
    change: "-2%",
    trend: "down",
    icon: Activity,
  },
];

const recentActivity = [
  {
    title: "New project created",
    description: "Website redesign for Client A",
    time: "2 hours ago",
    icon: Palette,
  },
  {
    title: "Team member joined",
    description: "Sarah Johnson joined the design team",
    time: "4 hours ago",
    icon: Users,
  },
  {
    title: "Project completed",
    description: "Mobile app UI design",
    time: "1 day ago",
    icon: Star,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-white">Welcome back</h1>
        <p className="text-white/60">Here's what's happening with your projects today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="p-6 bg-white/5 border-white/10">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-white/60">{stat.title}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center">
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1">
                {stat.trend === "up" ? (
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-500" />
                )}
                <span className={`text-sm ${
                  stat.trend === "up" ? "text-green-500" : "text-red-500"
                }`}>
                  {stat.change}
                </span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
          <Button variant="ghost" className="text-white/60 hover:text-white">
            View all
          </Button>
        </div>
        <div className="space-y-4">
          {recentActivity.map((activity) => {
            const Icon = activity.icon;
            return (
              <Card key={activity.title} className="p-4 bg-white/5 border-white/10">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium text-white">{activity.title}</p>
                    <p className="text-sm text-white/60">{activity.description}</p>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-white/40">
                    <Clock className="h-4 w-4" />
                    {activity.time}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
} 