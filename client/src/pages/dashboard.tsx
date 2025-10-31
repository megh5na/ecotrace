import { StatCard } from "@/components/stat-card";
import { CarbonChart } from "@/components/carbon-chart";
import { Cloud, TrendingDown, Award, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Dashboard() {
  const chartData = [
    { date: "Oct 24", carbon: 15.2 },
    { date: "Oct 25", carbon: 12.8 },
    { date: "Oct 26", carbon: 14.1 },
    { date: "Oct 27", carbon: 11.5 },
    { date: "Oct 28", carbon: 13.2 },
    { date: "Oct 29", carbon: 10.8 },
    { date: "Oct 30", carbon: 12.4 },
  ];

  const recentActivities = [
    { id: 1, type: "Car", distance: "15 km", carbon: 3.5, time: "2 hours ago" },
    { id: 2, type: "Electricity", amount: "12 kWh", carbon: 6.2, time: "5 hours ago" },
    { id: 3, type: "Public Transit", distance: "8 km", carbon: 0.4, time: "Yesterday" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Track your carbon footprint and environmental impact
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="Today's Carbon"
          value={12.4}
          unit="kg CO₂"
          icon={Cloud}
          trend={{ value: 15, isPositive: true }}
          testId="stat-today-carbon"
        />
        <StatCard
          title="Weekly Average"
          value={13.0}
          unit="kg CO₂"
          icon={TrendingDown}
          trend={{ value: 8, isPositive: true }}
          testId="stat-weekly-average"
        />
        <StatCard
          title="Carbon Credits"
          value={245}
          icon={Award}
          testId="stat-carbon-credits"
        />
      </div>

      <CarbonChart data={chartData} />

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/track">
              <Button className="w-full justify-start" data-testid="button-log-activity">
                <Activity className="h-4 w-4 mr-2" />
                Log Activity
              </Button>
            </Link>
            <Link href="/recommendations">
              <Button variant="outline" className="w-full justify-start" data-testid="button-view-recommendations">
                <Award className="h-4 w-4 mr-2" />
                View AI Recommendations
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between py-2 border-b last:border-0"
                  data-testid={`activity-${activity.id}`}
                >
                  <div>
                    <p className="font-medium text-sm">{activity.type}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.distance || activity.amount} • {activity.time}
                    </p>
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
    </div>
  );
}
