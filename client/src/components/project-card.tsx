import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  goal: number;
  current: number;
  location: string;
}

export function ProjectCard({
  title,
  description,
  image,
  goal,
  current,
  location,
}: ProjectCardProps) {
  const [allocated, setAllocated] = useState(false);
  const progress = (current / goal) * 100;

  const handleAllocate = () => {
    setAllocated(true);
    console.log("Credits allocated to:", title);
  };

  return (
    <Card className="overflow-hidden">
      <div className="aspect-video overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover"
        />
      </div>
      <CardHeader className="pb-3">
        <div className="space-y-1">
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-xs text-muted-foreground">{location}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">
              {current.toLocaleString()} / {goal.toLocaleString()} credits
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          variant={allocated ? "outline" : "default"}
          disabled={allocated}
          onClick={handleAllocate}
          data-testid="button-allocate-credits"
        >
          {allocated ? "Credits Allocated" : "Allocate Credits"}
        </Button>
      </CardFooter>
    </Card>
  );
}
