import Link from "next/link";
import { AppHeader } from "@/components/app-header";
import { SupervisorNav } from "@/components/supervisor-nav";
import { Avatar, Card } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { overdueMilestones, reviewQueue, studentProgress } from "@/lib/data";

// FR-10: supervisor progress dashboard
export default function SupervisorDashboardPage() {
  const total = studentProgress.length * 5;
  const completed = studentProgress.reduce((s, r) => s + r.completed, 0);
  const active = studentProgress.reduce((s, r) => s + r.active, 0);
  const overdue = studentProgress.reduce((s, r) => s + r.overdue, 0);

  const kpis = [
    { label: "Active students", value: String(studentProgress.length), suffix: "", dot: "bg-ink", note: "All projects in progress", noteC: "text-muted" },
    { label: "Milestones completed", value: String(completed), suffix: ` / ${total}`, dot: "bg-success", note: `${Math.round((completed / total) * 100)}% of all milestones`, noteC: "text-success-fg" },
    { label: "Awaiting your review", value: String(active), suffix: "", dot: "bg-warning", note: "Oldest submitted 4 days ago", noteC: "text-warning-fg" },
    { label: "Overdue", value: String(overdue), suffix: "", dot: "bg-danger", note: `${overdue} students need a reminder`, noteC: "text-danger-fg" },
  ];

  const legend = [
    { label: "Completed", c: "bg-success" },
    { label: "In progress / review", c: "bg-primary" },
    { label: "Overdue", c: "bg-danger" },
    { label: "Not started", c: "bg-border" },
  ];

  return (
    <>
      <AppHeader name="Dr. Imran Siddiqui" role="Supervisor" initials="IS">
        <SupervisorNav active="dashboard" />
      </AppHeader>

      <main className="mx-auto max-w-[1280px] px-4 pb-14 pt-8 md:px-6">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-[28px] font-bold tracking-tight">Good afternoon, Dr. Siddiqui</h1>
            <p className="mt-1.5 text-[15px] text-muted">
              Here is how your {studentProgress.length} students are progressing this term.
            </p>
          </div>
          <label htmlFor="term" className="sr-only">
            Term
          </label>
          <select id="term" className="h-11 rounded-[10px] border border-border-strong bg-surface px-3 text-sm">
            <option>Fall 2026</option>
            <option>Spring 2026</option>
          </select>
        </div>

        {/* KPI tiles */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
          {kpis.map((k) => (
            <Card key={k.label} className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-medium text-muted">{k.label}</span>
                <span className={`size-2.5 rounded-[3px] ${k.dot}`} />
              </div>
              <div className="mt-2.5 text-[34px] font-bold tracking-tight">
                {k.value}
                <span className="text-[15px] font-medium text-muted">{k.suffix}</span>
              </div>
              <div className={`mt-1.5 text-[13px] font-medium ${k.noteC}`}>{k.note}</div>
            </Card>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-start gap-5">
          {/* Stacked bar chart (pure CSS — swap for Recharts <BarChart layout="vertical"> if preferred) */}
          <Card className="min-w-0 flex-[999_1_560px] p-6">
            <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="font-semibold">Milestones by student</h2>
                <p className="mt-1 text-[13px] text-muted">Each project has 5 milestones</p>
              </div>
              <div className="flex flex-wrap gap-4 text-xs text-ink-2">
                {legend.map((l) => (
                  <span key={l.label} className="flex items-center gap-1.5">
                    <span className={`size-2.5 rounded-[3px] ${l.c}`} />
                    {l.label}
                  </span>
                ))}
              </div>
            </div>
            <ul className="flex flex-col gap-3.5">
              {studentProgress.map((s) => {
                const rest = 5 - s.completed - s.active - s.overdue;
                const seg = (n: number) => `${n * 20}%`;
                return (
                  <li key={s.name} className="flex items-center gap-3.5">
                    <span className="w-[130px] shrink-0 truncate text-[13px] font-medium">{s.name}</span>
                    <div
                      className="flex h-[22px] flex-1 gap-0.5 overflow-hidden rounded-[5px]"
                      role="img"
                      aria-label={`${s.completed} completed, ${s.active} in progress, ${s.overdue} overdue, ${rest} not started`}
                    >
                      <span className="bg-success" style={{ width: seg(s.completed) }} />
                      <span className="bg-primary" style={{ width: seg(s.active) }} />
                      <span className="bg-danger" style={{ width: seg(s.overdue) }} />
                      <span className="bg-border" style={{ width: seg(rest) }} />
                    </div>
                    <span className="w-11 text-right font-mono text-[13px] text-ink-2">{s.completed}/5</span>
                  </li>
                );
              })}
            </ul>
          </Card>

          {/* Overdue */}
          <Card className="w-full p-6 lg:w-auto lg:max-w-[420px] lg:flex-[1_1_320px]">
            <div className="mb-3.5 flex items-center justify-between">
              <h2 className="font-semibold">Overdue milestones</h2>
              <span className="rounded-full bg-danger-soft px-2.5 py-0.5 text-xs font-semibold text-danger-fg">
                {overdueMilestones.length}
              </span>
            </div>
            <ul>
              {overdueMilestones.map((o) => (
                <li key={o.name} className="flex items-center gap-3 border-t border-[#F0F2F5] py-3.5">
                  <Avatar initials={o.initials} tone="neutral" className="size-9" />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold">{o.name}</div>
                    <div className="text-[13px] text-muted">{o.milestone}</div>
                  </div>
                  <span className="whitespace-nowrap text-xs font-semibold text-danger-fg">{o.late}</span>
                </li>
              ))}
            </ul>
            <Button variant="outline" className="mt-2 w-full">
              Send reminder to all
            </Button>
          </Card>
        </div>

        {/* Review queue */}
        <Card className="mt-5 p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-semibold">Awaiting your review</h2>
            <Link href="/supervisor/review" className="flex min-h-11 items-center text-sm font-semibold text-primary">
              Open review queue
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-[0.05em] text-muted">
                  <th scope="col" className="py-2.5 pr-3 font-semibold">Student</th>
                  <th scope="col" className="px-3 py-2.5 font-semibold">Milestone</th>
                  <th scope="col" className="px-3 py-2.5 font-semibold">Version</th>
                  <th scope="col" className="px-3 py-2.5 font-semibold">Submitted</th>
                  <th scope="col" className="py-2.5 pl-3">
                    <span className="sr-only">Action</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {reviewQueue.map((q) => (
                  <tr key={q.name} className="border-b border-[#F0F2F5]">
                    <td className="py-3.5 pr-3">
                      <div className="font-semibold">{q.name}</div>
                      <div className="text-[13px] text-muted">{q.project}</div>
                    </td>
                    <td className="px-3 py-3.5">{q.milestone}</td>
                    <td className="px-3 py-3.5">
                      <span className="rounded-md bg-subtle px-2 py-0.5 font-mono text-[13px]">v{q.version}</span>
                    </td>
                    <td className="px-3 py-3.5 text-ink-2">{q.submitted}</td>
                    <td className="py-3.5 pl-3 text-right">
                      <Link href="/supervisor/review" className={buttonVariants({ variant: "dark", size: "sm" })}>
                        Review
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </>
  );
}
