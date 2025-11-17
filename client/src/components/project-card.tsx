import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  goal: number;
  current: number;
  location: string;
  allocationAmount?: string;
  onAllocationAmountChange?: (id: number, amount: string) => void;
  onAllocate?: (id: number, title: string) => void;
}

export function ProjectCard({
  id,
  title,
  description,
  image,
  goal,
  current,
  location,
  allocationAmount = '',
  onAllocationAmountChange,
  onAllocate,
}: ProjectCardProps) {
  const progress = (current / goal) * 100;

  const handleAllocate = () => {
    if (onAllocate) {
      onAllocate(id, title);
    }
  };
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onAllocationAmountChange) {
      onAllocationAmountChange(id, e.target.value);
    }
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
      <CardFooter className="flex-col gap-3">
        <div className="w-full space-y-2">
          <Label htmlFor={`credits-${id}`} className="text-sm">Credits to Allocate</Label>
          <Input
            id={`credits-${id}`}
            type="number"
            placeholder="Enter amount"
            value={allocationAmount}
            onChange={handleAmountChange}
            min="0"
          />
        </div>
        <Button
          className="w-full"
          onClick={handleAllocate}
          disabled={!allocationAmount || parseInt(allocationAmount) <= 0}
          data-testid="button-allocate-credits"
        >
          Allocate Credits
        </Button>
      </CardFooter>
    </Card>
  );
}
