import Link from "next/link";
import { ChevronLeft, Download } from "lucide-react";
import { ReviewDecision } from "@/components/review-decision";
import { StatusBadge } from "@/components/status-badge";
import { Avatar } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { reviewComments, versions, werResults } from "@/lib/data";
import { cn } from "@/lib/utils";

// Supervisor review screen — FR-05
export default function ReviewPage() {
  return (
    <div className="min-h-screen bg-[#EEF0F3]">
      {/* Toolbar */}
      <header className="border-b border-border bg-surface">
        <div className="flex flex-wrap items-center gap-[18px] px-4 py-3 md:px-6">
          <Link href="/supervisor" aria-label="Back to dashboard" className={buttonVariants({ variant: "outline", size: "icon" })}>
            <ChevronLeft className="size-[18px]!" aria-hidden />
          </Link>
          <div className="min-w-0 flex-[1_1_360px]">
            <div className="text-xs text-muted">Ayesha Khan · Low-Resource Urdu Speech Recognition</div>
            <h1 className="mt-0.5 flex flex-wrap items-center gap-2.5 text-lg font-semibold">
              Review: Implementation <StatusBadge status="under_review" />
            </h1>
          </div>
          <label htmlFor="ver" className="sr-only">
            Version
          </label>
          <select id="ver" className="h-11 rounded-[10px] border border-border-strong bg-surface px-3 font-mono text-sm">
            {versions.map((v, i) => (
              <option key={v.id}>
                v{v.version} · {v.uploadedAt.slice(0, 10)}
                {i === 0 ? " (latest)" : ""}
              </option>
            ))}
          </select>
          <a href="#" className={buttonVariants({ variant: "outline" })}>
            <Download aria-hidden /> Download
          </a>
        </div>
      </header>

      <div className="flex flex-wrap items-stretch">
        {/* Document viewer */}
        <main className="min-w-0 flex-[999_1_560px] px-4 pb-12 pt-7 md:px-6">
          <div className="mb-4 flex justify-center gap-2.5 text-[13px] text-ink-2">
            <span className="font-mono">Chapter4_Implementation_v3.pdf</span>
            <span className="text-[#8A93A1]">·</span>
            <span>Page 12 of 38</span>
          </div>
          <article className="mx-auto max-w-[720px] rounded-md bg-surface px-6 py-10 font-serif text-[#1F2937] shadow-[0_1px_3px_rgba(14,23,38,0.08),0_12px_40px_rgba(14,23,38,0.08)] md:px-[72px] md:py-16">
            <div className="font-sans text-xs uppercase tracking-[0.08em] text-muted">Chapter 4 · Implementation</div>
            <h2 className="mb-[18px] mt-2.5 text-2xl font-semibold text-ink">4.3 Results Across Accent Groups</h2>
            <p className="mb-4 text-[15px] leading-[1.75]">
              We evaluate the fine-tuned model on the held-out test set, grouped by the speaker&apos;s regional accent. All
              models were trained on the same 48 hours of labelled audio and decoded with an identical 4-gram language
              model.
            </p>
            <p className="mb-4 text-[15px] leading-[1.75]">
              <mark className="border-b-2 border-warning bg-warning-soft py-px text-inherit">
                The model achieves its lowest word error rate on the Punjabi-accent subset, while the Sindhi-accent subset
                remains the most challenging.
              </mark>{" "}
              We attribute this mainly to the smaller number of Sindhi-accent speakers in the training data.
            </p>
            <table className="my-[22px] w-full border-collapse font-sans text-sm">
              <caption className="caption-bottom pt-2 text-left font-serif text-xs text-muted">
                Table 4.3 — Word error rate (%) by accent group on the test set.
              </caption>
              <thead>
                <tr className="border-b-[1.5px] border-ink text-left">
                  <th scope="col" className="px-1.5 py-2 font-semibold">Accent group</th>
                  <th scope="col" className="px-1.5 py-2 text-right font-semibold">Speakers</th>
                  <th scope="col" className="px-1.5 py-2 text-right font-semibold">Baseline</th>
                  <th scope="col" className="px-1.5 py-2 text-right font-semibold">Fine-tuned</th>
                </tr>
              </thead>
              <tbody>
                {werResults.map((w) => (
                  <tr key={w.group} className="border-b border-border">
                    <td className="px-1.5 py-2">{w.group}</td>
                    <td className="px-1.5 py-2 text-right font-mono">{w.speakers}</td>
                    <td className="px-1.5 py-2 text-right font-mono">{w.baseline.toFixed(1)}</td>
                    <td className="px-1.5 py-2 text-right font-mono font-semibold">{w.finetuned.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mb-4 text-[15px] leading-[1.75]">
              Across all groups, fine-tuning reduces the word error rate substantially compared with the supervised
              baseline. The relative improvement is largest for Urdu-native speakers and smallest for the Sindhi-accent
              group.
            </p>
            <p className="text-[15px] leading-[1.75]">
              Section 4.4 examines whether adding a small amount of accent-targeted data closes this gap, and how much
              additional labelled audio would be required.
            </p>
          </article>
        </main>

        {/* Review panel */}
        <aside aria-label="Review" className="flex w-full flex-col border-l border-border bg-surface lg:w-auto lg:max-w-[420px] lg:flex-[1_1_360px]">
          <div role="tablist" aria-label="Review panel" className="flex gap-1 border-b border-border px-4 pt-3">
            {["Comments", "Versions", "Details"].map((t, i) => (
              <button
                key={t}
                type="button"
                role="tab"
                aria-selected={i === 0}
                className={cn(
                  "min-h-11 border-b-2 border-transparent px-3.5 text-sm font-medium text-muted",
                  i === 0 && "border-ink font-semibold text-ink"
                )}
              >
                {t}
                {i === 0 && <span className="ml-1 font-medium text-muted">{reviewComments.length}</span>}
              </button>
            ))}
          </div>

          <div className="flex flex-1 flex-col gap-3.5 p-5">
            {reviewComments.map((c) => (
              <div
                key={c.id}
                className={cn(
                  "rounded-xl border p-3.5",
                  c.quote ? "border-[#F3D9AE] bg-[#FFFBF4]" : c.resolved ? "border-border bg-background" : "border-border"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <Avatar initials={c.initials} tone={c.role === "Supervisor" ? "dark" : "primary"} className="size-[30px] text-[11px]" />
                  <div className="flex-1 text-[13px] leading-tight">
                    <strong className="font-semibold">{c.author}</strong>
                    <div className="text-xs text-muted">
                      {c.role === "Supervisor" ? "You" : "Student"} · v{c.version} · {c.createdAt}
                    </div>
                  </div>
                </div>
                {c.quote && (
                  <div className="mt-2.5 border-l-2 border-warning pl-2.5 text-xs italic leading-normal text-muted">{c.quote}</div>
                )}
                <p className="mt-2.5 text-sm leading-[1.55]">{c.text}</p>
              </div>
            ))}

            <form className="mt-1 overflow-hidden rounded-xl border border-border-strong focus-within:border-primary">
              <label htmlFor="new-c" className="sr-only">
                Add a comment
              </label>
              <textarea
                id="new-c"
                rows={3}
                placeholder="Add a comment on this version…"
                className="w-full resize-none px-3.5 py-3 text-sm outline-none placeholder:text-muted"
              />
              <div className="flex items-center justify-between border-t border-[#EEF0F3] bg-[#FAFBFC] py-2 pl-3.5 pr-2">
                <span className="text-xs text-muted">Student is notified by email</span>
                <Button type="submit" variant="outline" size="sm">
                  Comment
                </Button>
              </div>
            </form>
          </div>

          <div className="border-t border-border bg-[#FAFBFC] p-5">
            <ReviewDecision />
          </div>
        </aside>
      </div>
    </div>
  );
}
