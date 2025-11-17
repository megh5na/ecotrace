import { RecommendationCard } from "@/components/recommendation-card";
import { Bus, Lightbulb, Leaf, Utensils, Home, Bike, MapPin, Navigation, Clock, TrendingDown, Zap, Car } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Recommendations() {
  // Location-based smart transit recommendations
  const smartTransitRecommendations = [
    {
      id: 1,
      title: "Take Bus Route 22 Home",
      description: "Based on your current location and usual route, Bus 22 will save you 3.2 kg CO₂ compared to driving.",
      icon: Bus,
      carbonSavings: 3.2,
      distance: "5.2 km",
      duration: "18 min",
      nextArrival: "8 min",
      location: "Stop 200m away",
      type: "transit",
      priority: "high"
    },
    {
      id: 2,
      title: "Bike Station Nearby",
      description: "City bike station at Market St. Perfect for your 2km trip to the grocery store.",
      icon: Bike,
      carbonSavings: 0.8,
      distance: "2.1 km",
      duration: "12 min",
      location: "200m from current location",
      type: "bike",
      priority: "high"
    },
    {
      id: 3,
      title: "Carpool to Work Tomorrow",
      description: "3 colleagues on your route are available for carpooling. Reduce emissions by 75%.",
      icon: Car,
      carbonSavings: 4.5,
      distance: "12 km",
      duration: "25 min",
      location: "Pickup at 8:15 AM",
      type: "carpool",
      priority: "medium"
    },
  ];

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
        <h1 className="text-3xl font-bold">Smart Recommendations</h1>
        <p className="text-muted-foreground mt-1">
          AI-powered suggestions based on your location, IoT data, and travel patterns
        </p>
      </div>

      {/* Location-Based Transit Recommendations */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <MapPin className="h-6 w-6 text-primary" />
              Smart Transit Options
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Real-time recommendations based on your current location and destination
            </p>
          </div>
          <Badge variant="outline" className="gap-1">
            <Navigation className="h-3 w-3" />
            Live
          </Badge>
        </div>

        <div className="grid gap-4 md:grid-cols-1">
          {smartTransitRecommendations.map((rec) => (
            <Card key={rec.id} className={rec.priority === "high" ? "border-primary" : ""}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <rec.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{rec.title}</CardTitle>
                      <CardDescription className="mt-1">{rec.description}</CardDescription>
                    </div>
                  </div>
                  {rec.priority === "high" && (
                    <Badge className="bg-green-600">
                      <TrendingDown className="h-3 w-3 mr-1" />
                      Best Option
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Carbon Savings</p>
                    <p className="text-sm font-semibold text-green-600">{rec.carbonSavings} kg CO₂</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Distance</p>
                    <p className="text-sm font-semibold">{rec.distance}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Duration</p>
                    <p className="text-sm font-semibold">{rec.duration}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{rec.type === "transit" ? "Next Arrival" : "Location"}</p>
                    <p className="text-sm font-semibold flex items-center gap-1">
                      {rec.type === "transit" && <Clock className="h-3 w-3" />}
                      {rec.nextArrival || rec.location}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1">
                    <Navigation className="h-4 w-4 mr-2" />
                    Navigate
                  </Button>
                  <Button variant="outline">
                    View on Map
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* General Lifestyle Recommendations */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-primary" />
          Lifestyle Recommendations
        </h2>
        <p className="text-sm text-muted-foreground">
          Based on your IoT device data and activity patterns
        </p>
      </div>

      <Card className="bg-gradient-to-br from-primary/10 to-accent/10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            <CardTitle>Potential Monthly Impact</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              By following all recommendations, you could save:
            </p>
            <div className="text-4xl font-bold text-primary">
              {totalSavings} <span className="text-xl text-muted-foreground">kg CO₂/month</span>
            </div>
            <p className="text-sm text-muted-foreground">
              That's equivalent to planting{" "}
              <span className="font-semibold text-foreground">{Math.round(totalSavings / 20)}</span>{" "}
              trees per month!
            </p>
            <div className="mt-4 p-3 bg-background/50 rounded-lg">
              <p className="text-sm font-medium mb-2">Earn Carbon Credits:</p>
              <p className="text-xs text-muted-foreground">
                Implementing these recommendations will earn you <span className="font-semibold text-primary">{totalSavings * 10} credits</span> monthly to allocate to local conservation projects.
              </p>
            </div>
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
