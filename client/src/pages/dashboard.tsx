import { StatCard } from "@/components/stat-card";
import { CarbonChart } from "@/components/carbon-chart";
import { Cloud, TrendingDown, Award, Activity, Wifi, Car, Home, Smartphone, Zap, MapPin, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { useAppState } from "@/lib/store";

export default function Dashboard() {
  const { getTodayCarbon, getWeeklyAverage, carbonCredits, getRecentActivities } = useAppState();
  
  const todayCarbon = getTodayCarbon();
  const weeklyAverage = getWeeklyAverage();
  const recentActivitiesData = getRecentActivities(5);
  
  const chartData = [
    { date: "Oct 24", carbon: 15.2 },
    { date: "Oct 25", carbon: 12.8 },
    { date: "Oct 26", carbon: 14.1 },
    { date: "Oct 27", carbon: 11.5 },
    { date: "Oct 28", carbon: 13.2 },
    { date: "Oct 29", carbon: 10.8 },
    { date: "Oct 30", carbon: weeklyAverage },
  ];

  const connectedDevices = [
    { name: "Tesla Model 3", status: "active", icon: Car },
    { name: "Smart Home", status: "active", icon: Home },
    { name: "iPhone 15", status: "active", icon: Smartphone },
    { name: "Smart Meter", status: "active", icon: Zap },
  ];

  const creditsThisWeek = 18;
  
  // Format timestamp to relative time
  const getRelativeTime = (timestamp: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  };
  
  // Map activities to display format
  const recentActivities = recentActivitiesData.slice(0, 3).map((activity) => {
    let icon = Activity;
    if (activity.category === 'transportation') icon = activity.isAutoTracked ? Car : Car;
    if (activity.category === 'energy') icon = activity.isAutoTracked ? Home : Zap;
    if (activity.source.includes('Home')) icon = Home;
    if (activity.source.includes('Mobile') || activity.source.includes('iPhone')) icon = Smartphone;
    
    return {
      id: activity.id,
      type: activity.type,
      source: activity.source,
      distance: activity.details.distance,
      amount: activity.details.amount,
      carbon: activity.carbon,
      time: getRelativeTime(activity.timestamp),
      icon,
      auto: activity.isAutoTracked,
    };
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Track your carbon footprint and environmental impact
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard
          title="Today's Carbon"
          value={parseFloat(todayCarbon.toFixed(1))}
          unit="kg CO₂"
          icon={Cloud}
          trend={{ value: 15, isPositive: true }}
          testId="stat-today-carbon"
        />
        <StatCard
          title="Weekly Average"
          value={parseFloat(weeklyAverage.toFixed(1))}
          unit="kg CO₂"
          icon={TrendingDown}
          trend={{ value: 8, isPositive: true }}
          testId="stat-weekly-average"
        />
        <StatCard
          title="Carbon Credits"
          value={carbonCredits}
          icon={Award}
          trend={{ value: creditsThisWeek, isPositive: false }}
          testId="stat-carbon-credits"
        />
        <StatCard
          title="Connected Devices"
          value={connectedDevices.length}
          icon={Wifi}
          testId="stat-connected-devices"
        />
      </div>

      <CarbonChart data={chartData} />

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-gradient-to-br from-primary/10 to-accent/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wifi className="h-5 w-5 text-primary" />
              Connected IoT Devices
            </CardTitle>
            <CardDescription>
              Automatically tracking your carbon footprint in real-time
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {connectedDevices.map((device, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <device.icon className="h-5 w-5 text-primary" />
                  <span className="font-medium">{device.name}</span>
                </div>
                <Badge variant="outline" className="gap-1">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  {device.status}
                </Badge>
              </div>
            ))}
            <Link href="/iot-devices">
              <Button variant="outline" className="w-full mt-2">
                Manage Devices
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Auto-Tracked Activity
            </CardTitle>
            <CardDescription>
              Real-time data from your connected devices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 py-2 border-b last:border-0"
                  data-testid={`activity-${activity.id}`}
                >
                  <div className="p-2 rounded-lg bg-primary/10">
                    <activity.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm">{activity.type}</p>
                      {activity.auto && (
                        <Badge variant="secondary" className="text-xs">Auto</Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {activity.source} • {activity.distance || activity.amount}
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm">{activity.carbon} kg</p>
                    <p className="text-xs text-muted-foreground">CO₂</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Carbon Credits Earned
            </CardTitle>
            <CardDescription>
              Convert your carbon savings into actionable credits
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-4xl font-bold text-primary">{carbonCredits}</div>
              <p className="text-sm text-muted-foreground mt-1">
                +{creditsThisWeek} credits earned this week
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">How credits work:</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• 1 kg CO₂ saved = 10 credits</li>
                <li>• Use credits to support local conservation projects</li>
                <li>• Partner with sustainable vendors for rewards</li>
              </ul>
            </div>
            <Link href="/impact">
              <Button className="w-full">
                Allocate Credits
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Smart Recommendations
            </CardTitle>
            <CardDescription>
              AI-powered suggestions based on your location and habits
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-primary/10 rounded-lg">
              <p className="font-medium text-sm mb-1">🚌 Take Bus Route 22 Instead</p>
              <p className="text-xs text-muted-foreground">
                Save 3.2 kg CO₂ on your commute home. Next bus in 8 minutes.
              </p>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg">
              <p className="font-medium text-sm mb-1">🚲 Bike Station Nearby</p>
              <p className="text-xs text-muted-foreground">
                City bike station 200m away. Perfect for your 2km trip to the store.
              </p>
            </div>
            <Link href="/recommendations">
              <Button variant="outline" className="w-full">
                View All Recommendations
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
