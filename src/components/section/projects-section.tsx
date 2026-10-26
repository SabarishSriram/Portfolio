import { Reveal } from "@/components/motion";
import { ProjectCard } from "@/components/project-card";
import { DATA } from "@/data/resume";

export default function ProjectsSection() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {DATA.projects.map((project, i) => {
        return (
          <Reveal key={project.title} delay={(i % 2) * 0.08} className="h-full">
            <ProjectCard
              index={i}
              href={project.href}
              title={project.title}
              description={project.description}
              dates={project.dates}
              tags={project.technologies}
              image={project.image}
              video={project.video}
              links={project.links}
            />
          </Reveal>
        );
      })}
    </div>
  );
}
