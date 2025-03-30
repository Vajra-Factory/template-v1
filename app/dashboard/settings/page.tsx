"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Cpu, Zap, Cloud, Bell } from "lucide-react";

export default function Settings() {
  const { data: session } = useSession();
  const [settings, setSettings] = useState({
    autoOptimize: true,
    cloudRendering: false,
    performanceMode: true,
    emailNotifications: true,
    maxGpuUtilization: 80,
    temperatureLimit: 75,
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="text-white/60">
            Configure your GPU optimization preferences
          </p>
        </div>

        <div className="space-y-6">
          {/* Performance Settings */}
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Performance Settings</CardTitle>
              <CardDescription className="text-white/60">
                Configure how OverDrift optimizes your GPU
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-white">Auto-Optimize</Label>
                  <p className="text-sm text-white/60">
                    Automatically optimize GPU settings
                  </p>
                </div>
                <Switch
                  checked={settings.autoOptimize}
                  onCheckedChange={(checked) =>
                    handleSettingChange("autoOptimize", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-white">Cloud Rendering</Label>
                  <p className="text-sm text-white/60">
                    Enable cloud rendering for heavy tasks
                  </p>
                </div>
                <Switch
                  checked={settings.cloudRendering}
                  onCheckedChange={(checked) =>
                    handleSettingChange("cloudRendering", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-white">Performance Mode</Label>
                  <p className="text-sm text-white/60">
                    Prioritize performance over power efficiency
                  </p>
                </div>
                <Switch
                  checked={settings.performanceMode}
                  onCheckedChange={(checked) =>
                    handleSettingChange("performanceMode", checked)
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* GPU Limits */}
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">GPU Limits</CardTitle>
              <CardDescription className="text-white/60">
                Set maximum utilization and temperature limits
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-white">Maximum GPU Utilization</Label>
                  <Slider
                    value={[settings.maxGpuUtilization]}
                    onValueChange={([value]) =>
                      handleSettingChange("maxGpuUtilization", value)
                    }
                    max={100}
                    step={1}
                    className="py-4"
                  />
                  <p className="text-sm text-white/60">
                    {settings.maxGpuUtilization}%
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Temperature Limit</Label>
                  <Slider
                    value={[settings.temperatureLimit]}
                    onValueChange={([value]) =>
                      handleSettingChange("temperatureLimit", value)
                    }
                    max={90}
                    step={1}
                    className="py-4"
                  />
                  <p className="text-sm text-white/60">
                    {settings.temperatureLimit}°C
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Notifications</CardTitle>
              <CardDescription className="text-white/60">
                Configure your notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-white">Email Notifications</Label>
                  <p className="text-sm text-white/60">
                    Receive performance reports via email
                  </p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) =>
                    handleSettingChange("emailNotifications", checked)
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button className="bg-white text-black hover:bg-white/90">
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 