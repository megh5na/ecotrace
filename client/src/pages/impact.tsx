import { ProjectCard } from "@/components/project-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Users, Leaf, TrendingUp } from "lucide-react";

export default function Impact() {
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
        <h1 className="text-3xl font-bold">Impact & Projects</h1>
        <p className="text-muted-foreground mt-1">
          Allocate your carbon credits to support local environmental initiatives
        </p>
      </div>

      <Card className="bg-gradient-to-br from-primary/10 to-accent/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Your Carbon Credits
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-5xl font-bold text-primary mb-2" data-testid="text-carbon-credits">
            245
          </div>
          <p className="text-sm text-muted-foreground">
            Available credits to allocate to environmental projects
          </p>
        </CardContent>
      </Card>

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
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
}
