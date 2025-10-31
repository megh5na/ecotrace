import { RecommendationCard } from "@/components/recommendation-card";
import { Bus, Lightbulb, Leaf, Utensils, Home, Bike } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Recommendations() {
  const recommendations = [
    {
      id: 1,
      title: "Switch to Public Transportation",
      description:
        "Take the bus or train for your daily commute instead of driving. Based on your driving patterns, this could significantly reduce your carbon footprint.",
      icon: Bus,
      carbonSavings: 45,
      category: "Transportation",
    },
    {
      id: 2,
      title: "Use LED Light Bulbs",
      description:
        "Replace your traditional bulbs with energy-efficient LED bulbs. They use 75% less energy and last 25 times longer.",
      icon: Lightbulb,
      carbonSavings: 12,
      category: "Energy",
    },
    {
      id: 3,
      title: "Reduce Meat Consumption",
      description:
        "Try having 2-3 plant-based meals per week. Plant-based diets have a significantly lower carbon footprint than meat-based diets.",
      icon: Utensils,
      carbonSavings: 28,
      category: "Food",
    },
    {
      id: 4,
      title: "Install a Smart Thermostat",
      description:
        "A programmable thermostat can reduce your heating and cooling energy usage by up to 20% through intelligent temperature management.",
      icon: Home,
      carbonSavings: 35,
      category: "Energy",
    },
    {
      id: 5,
      title: "Bike for Short Trips",
      description:
        "For trips under 3 km, consider cycling instead of driving. It's healthier for you and eliminates emissions entirely.",
      icon: Bike,
      carbonSavings: 15,
      category: "Transportation",
    },
    {
      id: 6,
      title: "Start Composting",
      description:
        "Composting your food waste prevents methane emissions from landfills and creates nutrient-rich soil for gardening.",
      icon: Leaf,
      carbonSavings: 8,
      category: "Waste",
    },
  ];

  const totalSavings = recommendations.reduce((sum, rec) => sum + rec.carbonSavings, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">AI Recommendations</h1>
        <p className="text-muted-foreground mt-1">
          Personalized tips to reduce your carbon footprint
        </p>
      </div>

      <Card className="bg-gradient-to-br from-primary/10 to-accent/10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            <CardTitle>Potential Impact</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              By following these recommendations, you could save:
            </p>
            <div className="text-4xl font-bold text-primary">
              {totalSavings} <span className="text-xl text-muted-foreground">kg CO₂/month</span>
            </div>
            <p className="text-sm text-muted-foreground">
              That's equivalent to planting{" "}
              <span className="font-semibold text-foreground">{Math.round(totalSavings / 20)}</span>{" "}
              trees per month!
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {recommendations.map((rec) => (
          <RecommendationCard key={rec.id} {...rec} />
        ))}
      </div>
    </div>
  );
}
