import Link from "next/link";
import { ArrowRight, Check, Search } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { ProjectCard } from "@/components/project-card";
import { StatusBadge, StatusDot } from "@/components/status-badge";
import { Card } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { currentMilestones, featuredProjects, formatDate, progressOf, researchAreas } from "@/lib/data";
import { cn } from "@/lib/utils";

const steps = [
  {
    n: "01",
    title: "Break it into milestones",
    text: "Proposal, literature review, implementation and final report, each with a due date and a clear status.",
  },
  {
    n: "02",
    title: "Upload every version",
    text: "PDF, DOCX or ZIP. Each upload is saved as a new version with a change note, so nothing is ever overwritten.",
  },
  {
    n: "03",
    title: "Get feedback and approval",
    text: "Your supervisor comments, approves or asks for changes, and you are notified on the site and by email.",
  },
];

export default function HomePage() {
  const progress = progressOf(currentMilestones);

  return (
    <>
      <SiteHeader />

      {/* Hero */}
      <section className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-14 px-6 pb-16 pt-12 md:pt-[72px]">
        <div className="min-w-0 flex-[1_1_480px]">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1.5 text-[13px] font-semibold text-primary-fg">
            <span className="size-1.5 rounded-full bg-primary" />
            For graduate students &amp; supervisors
          </span>
          <h1 className="mb-[18px] mt-5 text-4xl font-bold leading-[1.06] tracking-[-0.025em] md:text-[54px]">
            Your thesis, from proposal to final report, tracked in one place.
          </h1>
          <p className="mb-8 max-w-[520px] text-lg leading-relaxed text-muted">
            Plan milestones, upload every draft as a new version, and get supervisor feedback without digging through
            emails and chat threads.
          </p>

          {/* FR-06: search published projects */}
          <form
            action="/explore"
            role="search"
            className="flex flex-wrap gap-2 rounded-[14px] border border-border-strong bg-surface p-2 shadow-[0_1px_2px_rgba(14,23,38,0.04),0_8px_24px_rgba(14,23,38,0.06)]"
          >
            <label htmlFor="hero-q" className="sr-only">
              Search published projects
            </label>
            <div className="flex flex-[1_1_240px] items-center gap-2.5 px-3">
              <Search className="size-[18px] text-muted" aria-hidden />
              <input
                id="hero-q"
                name="q"
                type="search"
                placeholder="Search by title, keyword or author"
                className="h-11 w-full bg-transparent text-[15px] outline-none placeholder:text-muted"
              />
            </div>
            <label htmlFor="hero-area" className="sr-only">
              Research area
            </label>
            <select
              id="hero-area"
              name="area"
              className="h-11 border-l border-border bg-transparent px-3.5 text-sm text-ink-2 outline-none"
            >
              <option value="">All research areas</option>
              {researchAreas.map((a) => (
                <option key={a.name}>{a.name}</option>
              ))}
            </select>
            <Button type="submit" className="px-[22px] text-[15px]">
              Search
            </Button>
          </form>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-[13px] text-muted">
            <span>Popular:</span>
            {["Machine learning", "Public health", "Climate", "Education policy"].map((t) => (
              <Link
                key={t}
                href={`/explore?q=${encodeURIComponent(t)}`}
                className="rounded-full border border-border bg-surface px-3 py-1.5 text-ink-2 hover:border-border-strong"
              >
                {t}
              </Link>
            ))}
          </div>
        </div>

        {/* Product preview */}
        <div className="relative min-w-0 flex-[1_1_420px]">
          <Card className="rounded-[18px] p-6 shadow-[0_1px_2px_rgba(14,23,38,0.05),0_24px_48px_rgba(14,23,38,0.10)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.06em] text-muted">Computer Science · 2026</div>
                <div className="mt-1.5 text-[17px] font-semibold leading-snug">Low-Resource Urdu Speech Recognition</div>
              </div>
              <StatusBadge status="in_progress" />
            </div>
            <div className="mt-5">
              <div className="mb-2 flex justify-between text-[13px] text-ink-2">
                <span>
                  {progress.done} of {progress.total} milestones completed
                </span>
                <span className="font-semibold text-ink">{progress.percent}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-[#EEF0F3]">
                <div className="h-full rounded-full bg-primary" style={{ width: `${progress.percent}%` }} />
              </div>
            </div>
            <ul className="mt-5 flex flex-col">
              {currentMilestones.map((m) => (
                <li key={m.id} className="flex items-center gap-3 border-t border-[#F0F2F5] py-2.5">
                  <StatusDot status={m.status} className="size-[22px]" />
                  <span className="flex-1 text-sm font-medium">{m.title}</span>
                  <span className="hidden font-mono text-xs text-muted sm:inline">{formatDate(m.dueDate, false)}</span>
                  <StatusBadge status={m.status} className="min-w-[92px] text-center" />
                </li>
              ))}
            </ul>
          </Card>
          <div className="absolute -bottom-6 left-3 flex max-w-[300px] items-center gap-3 rounded-[14px] bg-ink px-4 py-3.5 text-white shadow-[0_16px_32px_rgba(14,23,38,0.25)] md:-left-7">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-success">
              <Check className="size-4" strokeWidth={3} aria-hidden />
            </span>
            <span className="text-[13px] leading-snug">
              <strong className="font-semibold">Dr. Imran Siddiqui</strong> approved{" "}
              <span className="text-[#B9C7F5]">Methodology</span>
            </span>
          </div>
        </div>
      </section>

      {/* FR-08: Featured projects */}
      <section id="featured" className="border-y border-border bg-surface">
        <div className="mx-auto max-w-[1200px] px-6 py-[72px]">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="mb-2 text-[34px] font-bold tracking-tight">Featured projects</h2>
              <p className="text-muted">Outstanding finished work, selected by the research office.</p>
            </div>
            <Link href="/explore" className="flex min-h-11 items-center gap-1.5 text-[15px] font-semibold text-primary">
              Browse all projects <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
            {featuredProjects.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-[1200px] px-6 pb-10 pt-20">
        <h2 className="mb-2 text-[34px] font-bold tracking-tight">How it works</h2>
        <p className="mb-9 text-muted">Three steps that replace scattered emails, chat threads and shared folders.</p>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
          {steps.map((s) => (
            <Card key={s.n} className="p-7">
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary-soft font-mono text-[15px] font-semibold text-primary-fg">
                {s.n}
              </div>
              <h3 className="mb-2 mt-5 text-lg font-semibold">{s.title}</h3>
              <p className="text-[15px] leading-relaxed text-muted">{s.text}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Research areas */}
      <section id="areas" className="mx-auto max-w-[1200px] px-6 pb-[72px] pt-10">
        <h2 className="mb-[18px] text-[22px] font-semibold">Browse by research area</h2>
        <div className="flex flex-wrap gap-2.5">
          {researchAreas.map((a) => (
            <Link
              key={a.name}
              href={`/explore?area=${encodeURIComponent(a.name)}`}
              className="flex min-h-11 items-center gap-2 rounded-xl border border-border bg-surface px-[18px] text-[15px] font-medium text-ink hover:border-border-strong"
            >
              <span className="size-2 rounded-[3px]" style={{ background: a.color }} />
              {a.name}
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1200px] px-6 pb-[72px]">
        <div className="flex flex-wrap items-center justify-between gap-8 rounded-[22px] bg-ink px-8 py-12 md:px-12">
          <div className="max-w-[560px]">
            <h2 className="mb-2.5 text-[32px] font-bold tracking-tight text-white">Start tracking your research today</h2>
            <p className="leading-relaxed text-[#B5BDCA]">
              Create your project, set your milestones and invite your supervisor in a few minutes.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/signup" className={cn(buttonVariants({ size: "lg" }), "bg-white text-ink hover:bg-white/90")}>
              Create a student account
            </Link>
            <Link
              href="/signup?role=supervisor"
              className={cn(buttonVariants({ size: "lg", variant: "ghost" }), "border border-[#3A4659] text-white hover:bg-white/10 hover:text-white")}
            >
              I&apos;m a supervisor
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
