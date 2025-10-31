import { ProjectCard } from "../project-card";

export default function ProjectCardExample() {
  return (
    <div className="p-6 max-w-sm">
      <ProjectCard
        title="Urban Tree Planting Initiative"
        description="Plant 1,000 trees in urban areas to improve air quality and reduce the urban heat island effect."
        image="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop"
        goal={10000}
        current={6500}
        location="San Francisco, CA"
      />
    </div>
  );
}
