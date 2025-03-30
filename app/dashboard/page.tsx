"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Cpu, Zap, Cloud, BarChart3 } from "lucide-react";

interface TelemetryData {
  gpu: {
    name: string;
    utilization: number;
    temperature: number;
    memory: {
      used: number;
      total: number;
      unit: string;
    };
    power: {
      current: number;
      limit: number;
      unit: string;
    };
  };
  cpu: {
    utilization: number;
    temperature: number;
    cores: number;
  };
  memory: {
    used: number;
    total: number;
    unit: string;
  };
  timestamp: string;
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [telemetry, setTelemetry] = useState<TelemetryData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTelemetry = async () => {
      try {
        const response = await fetch("/api/telemetry");
        const data = await response.json();
        setTelemetry(data);
      } catch (error) {
        console.error("Failed to fetch telemetry:", error);
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchTelemetry();
      const interval = setInterval(fetchTelemetry, 5000); // Update every 5 seconds
      return () => clearInterval(interval);
    }
  }, [status]);

  if (status === "loading" || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
          <Button asChild>
            <a href="/auth/signin">Sign In</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-white/60">Monitor your GPU performance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* GPU Utilization */}
          <Card className="bg-white/5 border-white/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">
                GPU Utilization
              </CardTitle>
              <Cpu className="h-4 w-4 text-white/60" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {telemetry?.gpu.utilization ?? 0}%
              </div>
              <p className="text-xs text-white/60">
                {telemetry?.gpu.name ?? "No GPU detected"}
              </p>
            </CardContent>
          </Card>

          {/* GPU Temperature */}
          <Card className="bg-white/5 border-white/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">
                GPU Temperature
              </CardTitle>
              <Zap className="h-4 w-4 text-white/60" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {telemetry?.gpu.temperature ?? 0}°C
              </div>
              <p className="text-xs text-white/60">
                Power: {telemetry?.gpu.power.current ?? 0}W
              </p>
            </CardContent>
          </Card>

          {/* GPU Memory */}
          <Card className="bg-white/5 border-white/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">
                GPU Memory
              </CardTitle>
              <Cloud className="h-4 w-4 text-white/60" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {telemetry?.gpu.memory.used ?? 0}/{telemetry?.gpu.memory.total ?? 0}
                {telemetry?.gpu.memory.unit ?? "GB"}
              </div>
              <p className="text-xs text-white/60">
                {Math.round(
                  ((telemetry?.gpu.memory.used ?? 0) /
                    (telemetry?.gpu.memory.total ?? 1)) *
                    100
                )}%
                used
              </p>
            </CardContent>
          </Card>

          {/* CPU Usage */}
          <Card className="bg-white/5 border-white/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">
                CPU Usage
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-white/60" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {telemetry?.cpu.utilization ?? 0}%
              </div>
              <p className="text-xs text-white/60">
                {telemetry?.cpu.cores ?? 0} cores
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 