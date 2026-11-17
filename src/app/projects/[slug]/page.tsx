import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { ProjectCover } from "@/components/project-cover";
import { StatusBadge, StatusDot } from "@/components/status-badge";
import { Avatar, Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { currentMilestones, formatDate, projects } from "@/lib/data";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

// FR-07: public project detail page
export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const project = projects[index];
  const milestones = project.milestones ?? currentMilestones.map((m) => ({ ...m, status: "completed" as const }));

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-[1000px] px-6 pb-16 pt-8">
        <Link href="/explore" className={buttonVariants({ variant: "ghost", className: "-ml-3 mb-4" })}>
          <ArrowLeft aria-hidden /> Back to projects
        </Link>

        <div className="h-56 overflow-hidden rounded-2xl">
          <ProjectCover cover={project.cover} variant={index} />
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-2.5 text-sm">
          <span className="rounded-full bg-primary-soft px-2.5 py-1 text-xs font-semibold text-primary-fg">{project.area}</span>
          <span className="font-mono text-xs text-muted">{project.year}</span>
        </div>
        <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight md:text-4xl">{project.title}</h1>

        <div className="mt-8 grid gap-6 md:grid-cols-[minmax(0,1fr)_300px]">
          <div className="flex flex-col gap-6">
            <Card className="p-6">
              <h2 className="mb-3 font-semibold">Abstract</h2>
              <p className="leading-relaxed text-ink-2">{project.abstract}</p>
            </Card>
            <Card className="p-6">
              <h2 className="mb-4 font-semibold">Milestone timeline</h2>
              <ol className="flex flex-col gap-3">
                {milestones.map((m) => (
                  <li key={m.id} className="flex items-center gap-3">
                    <StatusDot status={m.status} />
                    <span className="flex-1 text-sm font-medium">{m.title}</span>
                    <span className="font-mono text-xs text-muted">{formatDate(m.dueDate)}</span>
                    <StatusBadge status={m.status} />
                  </li>
                ))}
              </ol>
            </Card>
          </div>
          <Card className="flex h-fit flex-col gap-5 p-6">
            <div>
              <div className="mb-2 text-xs font-semibold uppercase tracking-[0.06em] text-muted">Team</div>
              <div className="flex items-center gap-2.5">
                <Avatar initials={project.authorInitials} />
                <span className="text-sm font-semibold">{project.author}</span>
              </div>
            </div>
            <div>
              <div className="mb-2 text-xs font-semibold uppercase tracking-[0.06em] text-muted">Supervisor</div>
              <span className="text-sm font-semibold">{project.supervisor}</span>
            </div>
            <div>
              <div className="mb-2 text-xs font-semibold uppercase tracking-[0.06em] text-muted">Keywords</div>
              <div className="flex flex-wrap gap-1.5">
                {project.keywords.map((k) => (
                  <span key={k} className="rounded-md bg-subtle px-2 py-1 text-xs text-ink-2">
                    {k}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
