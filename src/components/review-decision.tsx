"use client";

import { useState } from "react";
import { Check, PenLine } from "lucide-react";
import { Button } from "./ui/button";

// FR-05: approve the milestone or request changes
export function ReviewDecision() {
  const [decision, setDecision] = useState<"approved" | "changes" | null>(null);

  if (decision) {
    return (
      <div
        role="status"
        className={
          decision === "approved"
            ? "rounded-xl bg-success-soft p-4 text-sm font-medium text-success-fg"
            : "rounded-xl bg-warning-soft p-4 text-sm font-medium text-warning-fg"
        }
      >
        {decision === "approved"
          ? "Implementation approved. Ayesha has been notified by email."
          : "Changes requested. Ayesha has been notified and can upload a new version."}
        <button type="button" onClick={() => setDecision(null)} className="ml-2 underline">
          Undo
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="mb-1 text-[13px] font-semibold">Decision for this milestone</div>
      <p className="mb-3.5 text-[13px] leading-normal text-muted">
        Approving marks Implementation as Completed and updates the project&apos;s progress.
      </p>
      <div className="flex flex-wrap gap-2.5">
        <Button variant="outline" className="h-[46px] flex-[1_1_140px]" onClick={() => setDecision("changes")}>
          <PenLine className="text-[#B42318]" aria-hidden /> Request changes
        </Button>
        <Button variant="success" className="h-[46px] flex-[1_1_140px]" onClick={() => setDecision("approved")}>
          <Check strokeWidth={2.6} aria-hidden /> Approve milestone
        </Button>
      </div>
    </>
  );
}
