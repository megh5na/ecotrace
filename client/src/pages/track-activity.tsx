import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Car, Zap, ShoppingBag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function TrackActivity() {
  const { toast } = useToast();
  const [transportType, setTransportType] = useState("");
  const [distance, setDistance] = useState("");
  const [energyAmount, setEnergyAmount] = useState("");

  const handleSubmitTransport = () => {
    const carbon = parseFloat(distance) * 0.23;
    toast({
      title: "Activity Logged",
      description: `Carbon impact: ${carbon.toFixed(2)} kg CO₂`,
    });
    console.log("Transport activity logged:", { transportType, distance, carbon });
  };

  const handleSubmitEnergy = () => {
    const carbon = parseFloat(energyAmount) * 0.52;
    toast({
      title: "Activity Logged",
      description: `Carbon impact: ${carbon.toFixed(2)} kg CO₂`,
    });
    console.log("Energy activity logged:", { energyAmount, carbon });
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold">Track Activity</h1>
        <p className="text-muted-foreground mt-1">
          Log your daily activities to calculate your carbon footprint
        </p>
      </div>

      <Tabs defaultValue="transportation" className="w-full">
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
                Log Transportation
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="energy">
          <Card>
            <CardHeader>
              <CardTitle>Energy Usage</CardTitle>
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
                Log Energy Usage
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="consumption">
          <Card>
            <CardHeader>
              <CardTitle>Consumption Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="item-category">Category</Label>
                <Select>
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
                  data-testid="input-consumption-amount"
                />
              </div>
              <Button className="w-full" data-testid="button-submit-consumption">
                Log Consumption
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
