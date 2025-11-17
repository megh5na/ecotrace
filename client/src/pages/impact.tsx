import { ProjectCard } from "@/components/project-card";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Award, Users, Leaf, TrendingUp, Store, MapPin, ArrowRight, Coins, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAppState } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Impact() {
  const { carbonCredits, allocatedCredits, allocateCredits, redeemCredits } = useAppState();
  const { toast } = useToast();
  const [allocationAmounts, setAllocationAmounts] = useState<{ [key: number]: string }>({});
  
  const creditsAvailable = carbonCredits;
  const creditsRemaining = creditsAvailable - allocatedCredits;
  
  const handleAllocate = (projectId: number, projectName: string) => {
    const amount = parseInt(allocationAmounts[projectId] || '0');
    
    if (amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount of credits to allocate.",
        variant: "destructive",
      });
      return;
    }
    
    const success = allocateCredits(projectId, projectName, amount);
    
    if (success) {
      toast({
        title: "Credits Allocated! 🌱",
        description: `${amount} credits allocated to ${projectName}`,
      });
      setAllocationAmounts({ ...allocationAmounts, [projectId]: '' });
    } else {
      toast({
        title: "Insufficient Credits",
        description: `You only have ${creditsRemaining} available credits.`,
        variant: "destructive",
      });
    }
  };
  
  const handleRedeem = (vendorName: string, creditsRequired: number) => {
    const success = redeemCredits(vendorName, creditsRequired);
    
    if (success) {
      toast({
        title: "Reward Redeemed! 🎉",
        description: `Successfully redeemed ${creditsRequired} credits at ${vendorName}`,
      });
    } else {
      toast({
        title: "Insufficient Credits",
        description: `You need ${creditsRequired} available credits to redeem this reward.`,
        variant: "destructive",
      });
    }
  };

  // Sustainable vendor partnerships
  const sustainableVendors = [
    {
      id: 1,
      name: "GreenGrocer Market",
      type: "Organic Grocery",
      icon: Store,
      discount: "15% off",
      creditsRequired: 50,
      location: "0.8 km away",
      description: "Local organic produce and zero-waste products"
    },
    {
      id: 2,
      name: "EcoRide Bike Share",
      type: "Transportation",
      icon: Store,
      discount: "1 month free",
      creditsRequired: 100,
      location: "Citywide",
      description: "Sustainable bike-sharing membership"
    },
    {
      id: 3,
      name: "SolarTech Solutions",
      type: "Home Energy",
      icon: Store,
      discount: "$200 off installation",
      creditsRequired: 200,
      location: "Service area",
      description: "Solar panel installation and maintenance"
    },
  ];

  const projects = [
    {
      id: 1,
      title: "Urban Tree Planting Initiative",
      description:
        "Plant 1,000 trees in urban areas to improve air quality and reduce the urban heat island effect.",
      image:
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop",
      goal: 10000,
      current: 6500,
      location: "San Francisco, CA",
    },
    {
      id: 2,
      title: "Community Solar Farm",
      description:
        "Build a solar farm to provide renewable energy to 500 local households.",
      image:
        "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop",
      goal: 25000,
      current: 18200,
      location: "Portland, OR",
    },
    {
      id: 3,
      title: "Ocean Cleanup Project",
      description:
        "Remove plastic waste from coastal areas and promote marine ecosystem health.",
      image:
        "https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=800&auto=format&fit=crop",
      goal: 15000,
      current: 4300,
      location: "Miami, FL",
    },
    {
      id: 4,
      title: "Community Garden Network",
      description:
        "Establish community gardens to promote local food production and reduce food miles.",
      image:
        "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&auto=format&fit=crop",
      goal: 8000,
      current: 7100,
      location: "Seattle, WA",
    },
  ];

  const communityStats = [
    { label: "Total Carbon Saved", value: "12.4", unit: "tons", icon: Leaf },
    { label: "Active Users", value: "2,347", icon: Users },
    { label: "Projects Funded", value: "8", icon: Award },
    { label: "Growth This Month", value: "+23%", icon: TrendingUp },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Impact & Credits</h1>
        <p className="text-muted-foreground mt-1">
          Allocate your earned carbon credits to local conservation projects and sustainable vendors
        </p>
      </div>

      {/* Credits Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-primary/10 to-accent/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Total Credits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-primary mb-2" data-testid="text-carbon-credits">
              {creditsAvailable}
            </div>
            <p className="text-sm text-muted-foreground">
              Earned from carbon savings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coins className="h-5 w-5 text-orange-600" />
              Allocated
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-orange-600 mb-2">
              {allocatedCredits}
            </div>
            <p className="text-sm text-muted-foreground">
              Supporting {Math.floor(allocatedCredits / 50)} projects
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-green-600" />
              Available
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-green-600 mb-2">
              {creditsRemaining}
            </div>
            <p className="text-sm text-muted-foreground">
              Ready to allocate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* How Credits Work */}
      <Card>
        <CardHeader>
          <CardTitle>How Carbon Credits Work</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <CheckCircle2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">Earn Credits</p>
                <p className="text-xs text-muted-foreground mt-1">
                  1 kg CO₂ saved = 10 credits. Automatically tracked via your IoT devices.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Leaf className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">Support Projects</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Allocate credits to local conservation and environmental initiatives.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Store className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">Redeem Rewards</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Use credits for discounts at sustainable vendor partners.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sustainable Vendor Partnerships */}
      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Store className="h-6 w-6 text-primary" />
          Sustainable Vendor Partners
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Redeem your credits for exclusive rewards and discounts
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {sustainableVendors.map((vendor) => (
            <Card key={vendor.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{vendor.name}</CardTitle>
                    <CardDescription>{vendor.type}</CardDescription>
                  </div>
                  <Badge variant="secondary">{vendor.discount}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{vendor.description}</p>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{vendor.location}</span>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Credits Required</span>
                    <span className="font-semibold">{vendor.creditsRequired}</span>
                  </div>
                  <Button 
                    className="w-full" 
                    variant={creditsRemaining >= vendor.creditsRequired ? "default" : "outline"}
                    disabled={creditsRemaining < vendor.creditsRequired}
                    onClick={() => handleRedeem(vendor.name, vendor.creditsRequired)}
                  >
                    {creditsRemaining >= vendor.creditsRequired ? "Redeem Now" : "Not Enough Credits"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Community Impact</h2>
        <div className="grid gap-4 md:grid-cols-4">
          {communityStats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="text-2xl font-bold">
                  {stat.value}
                  {stat.unit && <span className="text-sm text-muted-foreground ml-1">{stat.unit}</span>}
                </div>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Local Environmental Projects</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard 
              key={project.id} 
              {...project}
              allocationAmount={allocationAmounts[project.id] || ''}
              onAllocationAmountChange={(id, amount) => {
                setAllocationAmounts({ ...allocationAmounts, [id]: amount });
              }}
              onAllocate={handleAllocate}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
