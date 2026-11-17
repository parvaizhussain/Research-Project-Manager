import Link from "next/link";
import { Download, FileText, Folder, Home, Lock, MessageSquare, Search, User } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { StatusBadge, StatusDot, statusStyles } from "@/components/status-badge";
import { UploadDropzone } from "@/components/upload-dropzone";
import { Avatar, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { currentMilestones, formatDate, formatDateTime, progressOf, studentComments, versions } from "@/lib/data";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Overview", icon: Home, href: "#" },
  { label: "My projects", icon: Folder, href: "/student", active: true },
  { label: "Documents", icon: FileText, href: "#" },
  { label: "Feedback", icon: MessageSquare, href: "#", count: 2 },
  { label: "Explore", icon: Search, href: "/explore" },
  { label: "Profile", icon: User, href: "#" },
];

const typeColor = { PDF: "bg-[#B42318]", DOCX: "bg-primary", ZIP: "bg-[#5B6B82]" };

// Student project workspace — FR-02, FR-03, FR-04, FR-05
export default function StudentProjectPage() {
  const progress = progressOf(currentMilestones);
  const selected = currentMilestones.find((m) => m.title === "Implementation")!;

  return (
    <div className="pb-24 md:pb-0">
      <AppHeader name="Ayesha Khan" role="Student" initials="AK" />

      <div className="flex flex-wrap items-start">
        {/* Sidebar (desktop) */}
        <nav aria-label="Workspace" className="hidden w-[248px] shrink-0 flex-col gap-0.5 px-3.5 py-5 md:flex">
          {nav.map((n) => (
            <Link
              key={n.label}
              href={n.href}
              className={cn(
                "flex min-h-[42px] items-center gap-3 rounded-[10px] px-3 text-sm font-medium text-ink-2 hover:bg-surface",
                n.active && "bg-surface font-semibold text-ink"
              )}
            >
              <n.icon className="size-[18px]" aria-hidden />
              <span className="flex-1">{n.label}</span>
              {n.count && (
                <span className="rounded-full bg-[#B42318] px-[7px] py-px text-xs font-semibold text-white">{n.count}</span>
              )}
            </Link>
          ))}
          <Card className="mt-5 rounded-xl p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.06em] text-muted">Next deadline</div>
            <div className="mt-2 text-[15px] font-semibold">Implementation</div>
            <div className="mt-1 text-[13px] font-medium text-warning-fg">Due {formatDate(selected.dueDate, false)}</div>
          </Card>
        </nav>

        <main className="min-w-0 flex-[999_1_560px] px-4 pb-12 pt-6 md:px-8">
          <nav aria-label="Breadcrumb" className="mb-3.5 text-[13px] text-muted">
            <Link href="/student" className="hover:text-ink">
              My projects
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink">Low-Resource Urdu Speech Recognition</span>
          </nav>

          {/* Project header */}
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div className="min-w-0 flex-[1_1_520px]">
              <div className="mb-2.5 flex flex-wrap items-center gap-2.5">
                <StatusBadge status="in_progress" />
                <span className="inline-flex items-center gap-1.5 text-xs text-muted">
                  <Lock className="size-3" aria-hidden /> Private until published
                </span>
              </div>
              <h1 className="text-2xl font-bold leading-tight tracking-tight md:text-[28px]">
                Low-Resource Urdu Speech Recognition with Self-Supervised Models
              </h1>
              <div className="mt-3.5 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
                <span>Computer Science</span>
                <span>
                  Supervisor: <strong className="font-semibold text-ink">Dr. Imran Siddiqui</strong>
                </span>
                <span>Started 01 Feb 2026</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <Button variant="outline">Edit project</Button>
              <Button variant="outline" disabled title="Available when all milestones are completed">
                Request publication
              </Button>
            </div>
          </div>

          {/* FR-03: progress bar */}
          <Card className="mt-6 flex flex-wrap items-center gap-8 px-6 py-[22px]">
            <div className="flex-[1_1_360px]">
              <div className="mb-2.5 flex items-baseline justify-between">
                <span className="text-sm font-semibold">Overall progress</span>
                <span className="text-sm text-muted">
                  <strong className="text-[22px] font-bold text-ink">{progress.percent}%</strong> · {progress.done} of{" "}
                  {progress.total} milestones
                </span>
              </div>
              <div
                role="progressbar"
                aria-valuenow={progress.percent}
                aria-valuemin={0}
                aria-valuemax={100}
                className="grid grid-cols-5 gap-1.5"
              >
                {currentMilestones.map((m) => (
                  <span key={m.id} className={cn("h-2.5 rounded-full", statusStyles[m.status].segment)} />
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-7">
              <div>
                <div className="text-xs text-muted">Documents</div>
                <div className="mt-0.5 text-xl font-semibold">14</div>
              </div>
              <div>
                <div className="text-xs text-muted">Open comments</div>
                <div className="mt-0.5 text-xl font-semibold">2</div>
              </div>
              <div>
                <div className="text-xs text-muted">Keywords</div>
                <div className="mt-1.5 text-sm font-medium">ASR · Urdu · wav2vec</div>
              </div>
            </div>
          </Card>

          <div className="mt-6 flex flex-wrap items-start gap-6">
            {/* Milestone timeline */}
            <Card className="w-full p-[22px] lg:w-auto lg:max-w-[380px] lg:flex-[1_1_300px]">
              <div className="mb-3.5 flex items-center justify-between">
                <h2 className="font-semibold">Milestones</h2>
                <Button variant="link" size="sm">
                  + Add milestone
                </Button>
              </div>
              <ol>
                {currentMilestones.map((m, i) => {
                  const isSel = m.id === selected.id;
                  const isLast = i === currentMilestones.length - 1;
                  return (
                    <li key={m.id} className="flex gap-3.5">
                      <div className="flex w-6 flex-col items-center">
                        <StatusDot status={m.status} />
                        {!isLast && (
                          <span
                            className={cn(
                              "min-h-[34px] w-0.5 flex-1",
                              m.status === "completed" ? "bg-success" : "bg-border"
                            )}
                          />
                        )}
                      </div>
                      <Link
                        href="#"
                        className={cn(
                          "-mt-1.5 mb-3.5 block flex-1 rounded-[10px] border border-transparent px-2.5 py-1.5",
                          isSel ? "border-[#C9D6FB] bg-[#F4F7FF]" : "hover:bg-background"
                        )}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-semibold">{m.title}</span>
                          <StatusBadge status={m.status} className="px-2 py-0.5 text-[11px]" />
                        </div>
                        <div className="mt-1 font-mono text-xs text-muted">Due {formatDate(m.dueDate)}</div>
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </Card>

            <div className="flex min-w-0 flex-[999_1_460px] flex-col gap-6">
              {/* FR-04: uploads & versions */}
              <Card className="p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold">{selected.title}</h2>
                    <p className="mt-1.5 text-sm text-muted">
                      Due {formatDate(selected.dueDate)} · Submitted for review on 03 Nov
                    </p>
                  </div>
                  <StatusBadge status={selected.status} className="px-3 py-1.5 text-[13px]" />
                </div>

                <div className="mt-5">
                  <UploadDropzone />
                </div>

                <h3 className="mb-2.5 mt-6 text-sm font-semibold">Version history</h3>
                <div className="overflow-x-auto rounded-xl border border-border">
                  <table className="w-full min-w-[620px] border-collapse text-sm">
                    <thead>
                      <tr className="bg-background text-left text-xs uppercase tracking-[0.05em] text-muted">
                        <th scope="col" className="px-3.5 py-2.5 font-semibold">Version</th>
                        <th scope="col" className="px-3.5 py-2.5 font-semibold">File &amp; change note</th>
                        <th scope="col" className="px-3.5 py-2.5 font-semibold">Uploaded</th>
                        <th scope="col" className="px-3.5 py-2.5">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {versions.map((v, i) => (
                        <tr key={v.id} className="border-t border-border align-top">
                          <td className="p-3.5">
                            <span
                              className={cn(
                                "rounded-md px-2 py-0.5 font-mono text-[13px] font-medium",
                                i === 0 ? "bg-primary-soft text-primary-fg" : "bg-subtle text-ink-2"
                              )}
                            >
                              v{v.version}
                            </span>
                          </td>
                          <td className="p-3.5">
                            <div className="flex flex-wrap items-center gap-2.5">
                              <span className={cn("rounded px-1.5 py-0.5 font-mono text-[10px] font-bold text-white", typeColor[v.fileType])}>
                                {v.fileType}
                              </span>
                              <span className="font-semibold">{v.fileName}</span>
                              <span className="text-xs text-muted">{v.size}</span>
                            </div>
                            <div className="mt-1.5 text-[13px] leading-normal text-muted">{v.changeNote}</div>
                          </td>
                          <td className="whitespace-nowrap p-3.5 text-[13px] text-ink-2">
                            {formatDateTime(v.uploadedAt)}
                            <div className="mt-0.5 text-muted">by {v.uploadedBy}</div>
                          </td>
                          <td className="p-3.5 text-right">
                            <a
                              href="#"
                              aria-label={`Download version ${v.version}`}
                              className="inline-flex size-10 items-center justify-center rounded-[10px] border border-border text-ink-2 hover:bg-subtle"
                            >
                              <Download className="size-4" aria-hidden />
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              {/* FR-05: supervisor feedback */}
              <Card className="p-6">
                <h2 className="mb-[18px] font-semibold">Supervisor feedback</h2>
                <div className="flex flex-col gap-[18px]">
                  {studentComments.map((c) => (
                    <div key={c.id} className={cn("flex gap-3", c.isReply && "ml-[46px]")}>
                      <Avatar initials={c.initials} tone={c.role === "Supervisor" ? "dark" : "primary"} />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2 text-[13px]">
                          <strong className="font-semibold">{c.author}</strong>
                          <span className="text-muted">
                            {c.role} · {c.createdAt}
                          </span>
                          <span className="rounded bg-subtle px-1.5 py-0.5 font-mono text-[11px] text-ink-2">on v{c.version}</span>
                        </div>
                        <p className="mt-1.5 text-sm leading-relaxed text-[#1F2937]">{c.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <form className="mt-5 flex items-start gap-3">
                  <Avatar initials="AK" />
                  <div className="flex-1 overflow-hidden rounded-xl border border-border-strong focus-within:border-primary">
                    <label htmlFor="reply" className="sr-only">
                      Reply to feedback
                    </label>
                    <textarea
                      id="reply"
                      rows={2}
                      placeholder="Reply to Dr. Siddiqui…"
                      className="w-full resize-none px-3.5 py-3 text-sm outline-none placeholder:text-muted"
                    />
                    <div className="flex justify-end border-t border-[#EEF0F3] bg-[#FAFBFC] p-2">
                      <Button type="submit" variant="dark" size="sm">
                        Send reply
                      </Button>
                    </div>
                  </div>
                </form>
              </Card>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile bottom tab bar (FR-11) */}
      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 grid grid-cols-4 border-t border-border bg-surface px-2 pb-5 pt-1.5 md:hidden"
      >
        {[
          { label: "Projects", icon: Folder, href: "/student", active: true },
          { label: "Feedback", icon: MessageSquare, href: "#" },
          { label: "Explore", icon: Search, href: "/explore" },
          { label: "Profile", icon: User, href: "#" },
        ].map((t) => (
          <Link
            key={t.label}
            href={t.href}
            className={cn(
              "flex min-h-[52px] flex-col items-center justify-center gap-1 text-[11px] font-medium text-muted",
              t.active && "font-semibold text-primary"
            )}
          >
            <t.icon className="size-[22px]" aria-hidden />
            {t.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
