import { AchievementBadge } from "../achievement-badge";
import { Award } from "lucide-react";

export default function AchievementBadgeExample() {
  return (
    <div className="p-6 max-w-sm space-y-4">
      <AchievementBadge
        title="First Step"
        description="Track your first activity"
        icon={Award}
        unlocked={true}
        date="Oct 25, 2025"
      />
      <AchievementBadge
        title="Week Warrior"
        description="Log activities for 7 consecutive days"
        icon={Award}
        unlocked={false}
      />
    </div>
  );
}
