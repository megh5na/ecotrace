import { StatCard } from "../stat-card";
import { Leaf } from "lucide-react";

export default function StatCardExample() {
  return (
    <div className="p-6 max-w-sm">
      <StatCard
        title="Today's Carbon"
        value={12.4}
        unit="kg CO₂"
        icon={Leaf}
        trend={{ value: 15, isPositive: true }}
        testId="stat-today-carbon"
      />
    </div>
  );
}
