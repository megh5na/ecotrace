import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { AchievementBadge } from "@/components/achievement-badge";
import { Award, Leaf, TrendingDown, Calendar, Target } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function Profile() {
  const achievements = [
    {
      id: 1,
      title: "First Step",
      description: "Track your first activity",
      icon: Award,
      unlocked: true,
      date: "Oct 25, 2025",
    },
    {
      id: 2,
      title: "Week Warrior",
      description: "Log activities for 7 consecutive days",
      icon: Calendar,
      unlocked: true,
      date: "Oct 28, 2025",
    },
    {
      id: 3,
      title: "Carbon Saver",
      description: "Reduce carbon by 50kg in a month",
      icon: TrendingDown,
      unlocked: true,
      date: "Oct 30, 2025",
    },
    {
      id: 4,
      title: "Green Commuter",
      description: "Use public transport 20 times",
      icon: Leaf,
      unlocked: false,
    },
    {
      id: 5,
      title: "Community Leader",
      description: "Allocate 500 credits to projects",
      icon: Target,
      unlocked: false,
    },
  ];

  const categoryBreakdown = [
    { category: "Transportation", carbon: 145, percentage: 45 },
    { category: "Energy", carbon: 98, percentage: 30 },
    { category: "Food", carbon: 65, percentage: 20 },
    { category: "Other", carbon: 16, percentage: 5 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-muted-foreground mt-1">Your carbon reduction journey</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                JD
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold" data-testid="text-username">
                John Doe
              </h2>
              <p className="text-sm text-muted-foreground">Member since October 2025</p>
              <div className="flex gap-2 mt-3">
                <Badge variant="secondary">
                  <Award className="h-3 w-3 mr-1" />3 Achievements
                </Badge>
                <Badge variant="secondary">
                  <Leaf className="h-3 w-3 mr-1" />
                  245 Credits
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Carbon Reduction Goal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Monthly Goal</span>
                <span className="font-medium">324 / 400 kg CO₂</span>
              </div>
              <Progress value={81} className="h-3" />
            </div>
            <p className="text-sm text-muted-foreground">
              You're 81% of the way to your monthly carbon reduction goal. Keep it up!
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Total Carbon Saved</p>
                <p className="text-3xl font-bold text-primary" data-testid="text-total-carbon-saved">
                  1.2 <span className="text-lg text-muted-foreground">tons CO₂</span>
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Equivalent to</p>
                <p className="text-lg font-semibold">60 trees planted</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Carbon Breakdown by Category</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {categoryBreakdown.map((item) => (
            <div key={item.category}>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">{item.category}</span>
                <span className="text-muted-foreground">
                  {item.carbon} kg CO₂ ({item.percentage}%)
                </span>
              </div>
              <Progress value={item.percentage} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      <div>
        <h2 className="text-2xl font-bold mb-4">Achievements</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {achievements.map((achievement) => (
            <AchievementBadge key={achievement.id} {...achievement} />
          ))}
        </div>
      </div>
    </div>
  );
}
