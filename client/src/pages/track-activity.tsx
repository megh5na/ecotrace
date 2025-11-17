import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Car, Zap, ShoppingBag, Wifi, Activity, Home, Smartphone, TrendingDown, Plus, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAppState } from "@/lib/store";

export default function TrackActivity() {
  const { toast } = useToast();
  const { addActivity } = useAppState();
  const [transportType, setTransportType] = useState("");
  const [distance, setDistance] = useState("");
  const [energyAmount, setEnergyAmount] = useState("");
  const [consumptionCategory, setConsumptionCategory] = useState("");
  const [consumptionAmount, setConsumptionAmount] = useState("");

  const autoTrackedToday = [
    { device: "Tesla Model 3", type: "Vehicle", icon: Car, carbon: 4.2, activities: 3, status: "active" },
    { device: "Smart Home Hub", type: "Home Energy", icon: Home, carbon: 8.5, activities: 24, status: "active" },
    { device: "iPhone 15 Pro", type: "Location", icon: Smartphone, carbon: 0.8, activities: 5, status: "active" },
    { device: "Smart Meter", type: "Energy Monitor", icon: Zap, carbon: 12.4, activities: 1, status: "active" },
  ];

  const totalAutoTracked = autoTrackedToday.reduce((sum, item) => sum + item.carbon, 0);

  const handleSubmitTransport = () => {
    const distanceNum = parseFloat(distance);
    let carbon = 0;
    
    // Calculate carbon based on transport type
    switch (transportType) {
      case 'car':
        carbon = distanceNum * 0.23;
        break;
      case 'bus':
        carbon = distanceNum * 0.05;
        break;
      case 'train':
        carbon = distanceNum * 0.04;
        break;
      case 'bike':
      case 'walk':
        carbon = 0;
        break;
      default:
        carbon = distanceNum * 0.15;
    }

    addActivity({
      type: transportType.charAt(0).toUpperCase() + transportType.slice(1),
      source: 'Manual Entry',
      category: 'transportation',
      carbon: parseFloat(carbon.toFixed(2)),
      details: {
        distance: `${distance} km`,
        transportMode: transportType,
      },
      isAutoTracked: false,
    });

    const creditsEarned = carbon <= 1 ? Math.floor((1 - carbon) * 10) : 0;
    
    toast({
      title: "Activity Logged Successfully!",
      description: `Carbon impact: ${carbon.toFixed(2)} kg CO₂${creditsEarned > 0 ? ` • Earned ${creditsEarned} credits for low-carbon choice! 🌱` : ' • High carbon - no credits earned'}`,
    });

    // Reset form
    setTransportType("");
    setDistance("");
  };

  const handleSubmitEnergy = () => {
    const energyNum = parseFloat(energyAmount);
    const carbon = energyNum * 0.52; // 0.52 kg CO₂ per kWh

    addActivity({
      type: 'Electricity Usage',
      source: 'Manual Entry',
      category: 'energy',
      carbon: parseFloat(carbon.toFixed(2)),
      details: {
        amount: `${energyAmount} kWh`,
        energyType: 'electricity',
      },
      isAutoTracked: false,
    });

    toast({
      title: "Energy Usage Logged!",
      description: `Carbon impact: ${carbon.toFixed(2)} kg CO₂`,
    });

    // Reset form
    setEnergyAmount("");
  };

  const handleSubmitConsumption = () => {
    if (!consumptionCategory || !consumptionAmount) return;
    
    const amountNum = parseFloat(consumptionAmount);
    let carbon = 0;
    
    // Estimate carbon based on spending
    switch (consumptionCategory) {
      case 'food':
        carbon = amountNum * 0.5;
        break;
      case 'clothing':
        carbon = amountNum * 0.8;
        break;
      case 'electronics':
        carbon = amountNum * 1.2;
        break;
      default:
        carbon = amountNum * 0.6;
    }

    addActivity({
      type: consumptionCategory.charAt(0).toUpperCase() + consumptionCategory.slice(1),
      source: 'Manual Entry',
      category: 'consumption',
      carbon: parseFloat(carbon.toFixed(2)),
      details: {
        amount: `$${consumptionAmount}`,
        consumptionCategory,
      },
      isAutoTracked: false,
    });

    toast({
      title: "Consumption Logged!",
      description: `Estimated carbon impact: ${carbon.toFixed(2)} kg CO₂`,
    });

    // Reset form
    setConsumptionCategory("");
    setConsumptionAmount("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Track Activity</h1>
        <p className="text-muted-foreground mt-1">
          Automatic IoT tracking with optional manual entry
        </p>
      </div>

      {/* Auto-Tracking Overview */}
      <Card className="bg-gradient-to-br from-primary/10 to-accent/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Wifi className="h-5 w-5 text-primary" />
                Automatic Tracking Active
              </CardTitle>
              <CardDescription className="mt-1">
                Your IoT devices are monitoring your carbon footprint in real-time
              </CardDescription>
            </div>
            <Badge variant="outline" className="gap-1">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              Live
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Auto-tracked today:</span>
              <span className="text-2xl font-bold text-primary">{totalAutoTracked.toFixed(1)} kg CO₂</span>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {autoTrackedToday.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-sm">{item.device}</p>
                      <p className="text-xs text-muted-foreground">{item.activities} activities</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm">{item.carbon} kg</p>
                    <p className="text-xs text-muted-foreground">CO₂</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Manual Entry Section */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Manual Entry (Optional)</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Add activities not covered by your IoT devices
          </p>
        </div>

        <Tabs defaultValue="transportation" className="w-full max-w-3xl">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="transportation" data-testid="tab-transportation">
              <Car className="h-4 w-4 mr-2" />
              Transportation
            </TabsTrigger>
            <TabsTrigger value="energy" data-testid="tab-energy">
              <Zap className="h-4 w-4 mr-2" />
              Energy
            </TabsTrigger>
            <TabsTrigger value="consumption" data-testid="tab-consumption">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Consumption
            </TabsTrigger>
          </TabsList>

          <TabsContent value="transportation">
            <Card>
              <CardHeader>
                <CardTitle>Transportation Activity</CardTitle>
                <CardDescription>
                  Manually log trips not tracked by your vehicle or phone
                </CardDescription>
              </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                  <Label htmlFor="transport-type">Mode of Transport</Label>
                  <Select value={transportType} onValueChange={setTransportType}>
                    <SelectTrigger id="transport-type" data-testid="select-transport-type">
                      <SelectValue placeholder="Select transport mode" />
                  </SelectTrigger>
                  <SelectContent>
                      <SelectItem value="car">Car</SelectItem>
                      <SelectItem value="bus">Public Bus</SelectItem>
                      <SelectItem value="train">Train</SelectItem>
                      <SelectItem value="bike">Bicycle</SelectItem>
                      <SelectItem value="walk">Walking</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                  <Label htmlFor="distance">Distance (km)</Label>
                <Input
                    id="distance"
                  type="number"
                  placeholder="0"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    data-testid="input-distance"
                />
              </div>
              <Button
                className="w-full"
                  onClick={handleSubmitTransport}
                  disabled={!transportType || !distance}
                  data-testid="button-submit-transport"
              >
                  <Plus className="h-4 w-4 mr-2" />
                  Log Transportation
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

          <TabsContent value="energy">
            <Card>
              <CardHeader>
                <CardTitle>Energy Usage</CardTitle>
                <CardDescription>
                  Add energy usage not monitored by your smart devices
                </CardDescription>
              </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                  <Label htmlFor="energy-type">Energy Type</Label>
                  <Select defaultValue="electricity">
                    <SelectTrigger id="energy-type" data-testid="select-energy-type">
                      <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                      <SelectItem value="electricity">Electricity</SelectItem>
                      <SelectItem value="gas">Natural Gas</SelectItem>
                      <SelectItem value="heating">Heating Oil</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                  <Label htmlFor="energy-amount">Amount (kWh)</Label>
                <Input
                    id="energy-amount"
                  type="number"
                  placeholder="0"
                    value={energyAmount}
                    onChange={(e) => setEnergyAmount(e.target.value)}
                    data-testid="input-energy-amount"
                />
              </div>
              <Button
                className="w-full"
                  onClick={handleSubmitEnergy}
                  disabled={!energyAmount}
                  data-testid="button-submit-energy"
              >
                  <Plus className="h-4 w-4 mr-2" />
                  Log Energy Usage
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

          <TabsContent value="consumption">
            <Card>
              <CardHeader>
                <CardTitle>Consumption Activity</CardTitle>
                <CardDescription>
                  Track purchases and consumption manually
                </CardDescription>
              </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                  <Label htmlFor="item-category">Category</Label>
                  <Select value={consumptionCategory} onValueChange={setConsumptionCategory}>
                    <SelectTrigger id="item-category" data-testid="select-consumption-category">
                      <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                      <SelectItem value="food">Food & Groceries</SelectItem>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                  <Label htmlFor="amount-spent">Amount Spent ($)</Label>
                <Input
                    id="amount-spent"
                  type="number"
                  placeholder="0"
                  value={consumptionAmount}
                  onChange={(e) => setConsumptionAmount(e.target.value)}
                    data-testid="input-consumption-amount"
                />
              </div>
                <Button 
                  className="w-full" 
                  onClick={handleSubmitConsumption}
                  disabled={!consumptionCategory || !consumptionAmount}
                  data-testid="button-submit-consumption"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Log Consumption
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
