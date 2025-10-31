import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon, TrendingDown, TrendingUp } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  testId?: string;
}

export function StatCard({ title, value, unit, icon: Icon, trend, testId }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold" data-testid={testId}>
          {value}
          {unit && <span className="text-lg text-muted-foreground ml-1">{unit}</span>}
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-xs mt-1">
            {trend.isPositive ? (
              <TrendingDown className="h-3 w-3 text-accent" />
            ) : (
              <TrendingUp className="h-3 w-3 text-destructive" />
            )}
            <span className={trend.isPositive ? "text-accent" : "text-destructive"}>
              {Math.abs(trend.value)}% from last week
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
