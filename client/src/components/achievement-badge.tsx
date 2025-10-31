import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AchievementBadgeProps {
  title: string;
  description: string;
  icon: LucideIcon;
  unlocked: boolean;
  date?: string;
}

export function AchievementBadge({
  title,
  description,
  icon: Icon,
  unlocked,
  date,
}: AchievementBadgeProps) {
  return (
    <Card className={!unlocked ? "opacity-50" : ""}>
      <CardContent className="p-4">
        <div className="flex gap-3 items-start">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
              unlocked ? "bg-primary" : "bg-muted"
            }`}
          >
            <Icon className={`h-6 w-6 ${unlocked ? "text-primary-foreground" : "text-muted-foreground"}`} />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between gap-2">
              <h4 className="font-semibold text-sm">{title}</h4>
              {unlocked && <Badge variant="secondary" className="text-xs">Unlocked</Badge>}
            </div>
            <p className="text-xs text-muted-foreground">{description}</p>
            {unlocked && date && (
              <p className="text-xs text-muted-foreground">Earned on {date}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
