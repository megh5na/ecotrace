import { RecommendationCard } from "../recommendation-card";
import { Bus } from "lucide-react";

export default function RecommendationCardExample() {
  return (
    <div className="p-6">
      <RecommendationCard
        title="Switch to Public Transportation"
        description="Take the bus or train for your daily commute instead of driving. This can significantly reduce your carbon footprint."
        icon={Bus}
        carbonSavings={45}
        category="Transportation"
      />
    </div>
  );
}
