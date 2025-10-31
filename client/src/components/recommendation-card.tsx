import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LucideIcon, CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface RecommendationCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  carbonSavings: number;
  category: string;
  onApply?: () => void;
}

export function RecommendationCard({
  title,
  description,
  icon: Icon,
  carbonSavings,
  category,
  onApply,
}: RecommendationCardProps) {
  const [applied, setApplied] = useState(false);

  const handleApply = () => {
    setApplied(true);
    onApply?.();
    console.log("Recommendation applied:", title);
  };

  return (
    <Card className={applied ? "border-accent" : ""}>
      <CardContent className="p-6">
        <div className="flex gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-primary/10">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1 space-y-3">
            <div>
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-lg">{title}</h3>
                <Badge variant="secondary" className="shrink-0">
                  {category}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <span className="text-muted-foreground">Est. savings: </span>
                <span className="font-semibold text-accent">
                  {carbonSavings} kg CO₂/month
                </span>
              </div>
              {applied ? (
                <Button variant="outline" disabled data-testid="button-applied">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Applied
                </Button>
              ) : (
                <Button onClick={handleApply} data-testid="button-apply">
                  Apply
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
