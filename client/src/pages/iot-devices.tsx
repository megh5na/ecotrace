import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Car, 
  Home, 
  Smartphone, 
  Thermometer, 
  Zap, 
  Wifi, 
  WifiOff,
  Activity,
  Plus,
  Settings,
  TrendingDown,
  TrendingUp
} from "lucide-react";
import { useState } from "react";

interface IoTDevice {
  id: string;
  name: string;
  type: string;
  icon: any;
  status: "connected" | "disconnected";
  lastSync: string;
  carbonImpact: number;
  trend: "up" | "down";
  dataPoints: {
    label: string;
    value: string;
  }[];
}

export default function IoTDevices() {
  const [devices] = useState<IoTDevice[]>([
    {
      id: "1",
      name: "Tesla Model 3",
      type: "Vehicle",
      icon: Car,
      status: "connected",
      lastSync: "2 min ago",
      carbonImpact: 4.2,
      trend: "down",
      dataPoints: [
        { label: "Distance Today", value: "32 km" },
        { label: "Avg. Efficiency", value: "15.2 kWh/100km" },
        { label: "Charging Status", value: "85%" },
      ]
    },
    {
      id: "2",
      name: "Smart Home Hub",
      type: "Home Automation",
      icon: Home,
      status: "connected",
      lastSync: "1 min ago",
      carbonImpact: 8.5,
      trend: "down",
      dataPoints: [
        { label: "Energy Usage", value: "18.3 kWh" },
        { label: "Active Devices", value: "12" },
        { label: "HVAC Status", value: "Eco Mode" },
      ]
    },
    {
      id: "3",
      name: "Nest Thermostat",
      type: "Climate Control",
      icon: Thermometer,
      status: "connected",
      lastSync: "5 min ago",
      carbonImpact: 3.1,
      trend: "down",
      dataPoints: [
        { label: "Current Temp", value: "21°C" },
        { label: "Energy Saved", value: "22%" },
        { label: "Mode", value: "Auto" },
      ]
    },
    {
      id: "4",
      name: "iPhone 15 Pro",
      type: "Mobile Device",
      icon: Smartphone,
      status: "connected",
      lastSync: "Just now",
      carbonImpact: 0.8,
      trend: "up",
      dataPoints: [
        { label: "Steps Today", value: "8,432" },
        { label: "Transit Trips", value: "3" },
        { label: "Location Tracking", value: "Active" },
      ]
    },
    {
      id: "5",
      name: "Smart Meter",
      type: "Energy Monitor",
      icon: Zap,
      status: "connected",
      lastSync: "3 min ago",
      carbonImpact: 12.4,
      trend: "down",
      dataPoints: [
        { label: "Real-time Usage", value: "2.4 kW" },
        { label: "Daily Total", value: "28.7 kWh" },
        { label: "Peak Time", value: "6:00 PM" },
      ]
    },
    {
      id: "6",
      name: "Fitness Tracker",
      type: "Wearable",
      icon: Activity,
      status: "disconnected",
      lastSync: "2 hours ago",
      carbonImpact: 0.0,
      trend: "down",
      dataPoints: [
        { label: "Status", value: "Offline" },
        { label: "Last Activity", value: "Morning Run" },
        { label: "Battery", value: "Low" },
      ]
    },
  ]);

  const connectedDevices = devices.filter(d => d.status === "connected").length;
  const totalCarbonTracked = devices.reduce((sum, d) => sum + d.carbonImpact, 0);
  const avgReduction = 18.5;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">IoT Devices</h1>
        <p className="text-muted-foreground mt-1">
          Manage connected devices for automatic carbon footprint tracking
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Connected Devices</p>
                <p className="text-3xl font-bold mt-1">{connectedDevices}/{devices.length}</p>
              </div>
              <Wifi className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Auto-Tracked Today</p>
                <p className="text-3xl font-bold mt-1">{totalCarbonTracked.toFixed(1)} <span className="text-lg text-muted-foreground">kg CO₂</span></p>
              </div>
              <Activity className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Reduction</p>
                <p className="text-3xl font-bold mt-1 text-green-600">-{avgReduction}%</p>
              </div>
              <TrendingDown className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Device Button */}
      <div className="flex gap-3">
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add New Device
        </Button>
        <Button variant="outline" className="gap-2">
          <Settings className="h-4 w-4" />
          Configure Integrations
        </Button>
      </div>

      {/* Device Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {devices.map((device) => (
          <Card key={device.id} className={device.status === "disconnected" ? "opacity-60" : ""}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg ${device.status === "connected" ? "bg-primary/10" : "bg-muted"}`}>
                    <device.icon className={`h-6 w-6 ${device.status === "connected" ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{device.name}</CardTitle>
                    <CardDescription>{device.type}</CardDescription>
                  </div>
                </div>
                <Badge variant={device.status === "connected" ? "default" : "secondary"} className="gap-1">
                  {device.status === "connected" ? (
                    <Wifi className="h-3 w-3" />
                  ) : (
                    <WifiOff className="h-3 w-3" />
                  )}
                  {device.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Data Points */}
              <div className="grid grid-cols-3 gap-3">
                {device.dataPoints.map((point, idx) => (
                  <div key={idx} className="space-y-1">
                    <p className="text-xs text-muted-foreground">{point.label}</p>
                    <p className="text-sm font-semibold">{point.value}</p>
                  </div>
                ))}
              </div>

              {/* Carbon Impact */}
              {device.status === "connected" && (
                <div className="space-y-2 pt-2 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Carbon Impact Today</span>
                    <div className="flex items-center gap-1">
                      {device.trend === "down" ? (
                        <TrendingDown className="h-4 w-4 text-green-600" />
                      ) : (
                        <TrendingUp className="h-4 w-4 text-orange-600" />
                      )}
                      <span className="font-semibold">{device.carbonImpact} kg CO₂</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">Last synced: {device.lastSync}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View Details
                </Button>
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Integration Info */}
      <Card className="bg-gradient-to-br from-primary/10 to-accent/10">
        <CardHeader>
          <CardTitle>Automatic Tracking Benefits</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary/20">
              <Activity className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="font-medium">Real-time Monitoring</p>
              <p className="text-sm text-muted-foreground">
                Your devices automatically track carbon emissions 24/7 without manual input
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary/20">
              <Zap className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="font-medium">Smart Insights</p>
              <p className="text-sm text-muted-foreground">
                AI analyzes patterns to provide personalized recommendations for reducing your footprint
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary/20">
              <TrendingDown className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="font-medium">Automatic Credits</p>
              <p className="text-sm text-muted-foreground">
                Earn carbon credits automatically based on your verified reductions and sustainable choices
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
