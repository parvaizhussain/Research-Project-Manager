import Link from "next/link";
import type { Project } from "@/lib/types";
import { ProjectCover } from "./project-cover";
import { Avatar, Card } from "./ui/card";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

// FR-08: Featured project card — title, image, short description, "View Details"
export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <Card className="flex flex-col overflow-hidden">
      <div className="relative h-44 overflow-hidden">
        <ProjectCover cover={project.cover} variant={index} />
        <span className="absolute left-3.5 top-3.5 rounded-full bg-surface px-2.5 py-1 text-xs font-semibold text-ink">
          {project.area}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-[22px]">
        <div className="font-mono text-xs text-muted">Published {project.year}</div>
        <h3 className="text-lg font-semibold leading-snug tracking-tight">{project.title}</h3>
        <p className="flex-1 text-sm leading-relaxed text-muted">{project.abstract}</p>
        <div className="flex items-center gap-2.5 pt-1">
          <Avatar initials={project.authorInitials} className="size-8" />
          <div className="text-[13px] leading-snug">
            <div className="font-semibold">{project.author}</div>
            <div className="text-muted">Supervised by {project.supervisor}</div>
          </div>
        </div>
        <Link
          href={`/projects/${project.slug}`}
          className={cn(buttonVariants({ variant: "outline" }), "mt-1.5 w-full")}
        >
          View Details
        </Link>
      </div>
    </Card>
  );
}
