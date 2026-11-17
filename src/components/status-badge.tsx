import { Check } from "lucide-react";
import type { MilestoneStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

export const statusStyles: Record<
  MilestoneStatus,
  { label: string; badge: string; ring: string; fill: string; segment: string }
> = {
  completed: {
    label: "Completed",
    badge: "bg-success-soft text-success-fg",
    ring: "border-success",
    fill: "bg-success",
    segment: "bg-success",
  },
  in_progress: {
    label: "In progress",
    badge: "bg-primary-soft text-primary-fg",
    ring: "border-primary",
    fill: "bg-surface",
    segment: "bg-primary",
  },
  under_review: {
    label: "Under review",
    badge: "bg-warning-soft text-warning-fg",
    ring: "border-warning-ring",
    fill: "bg-surface",
    segment: "bg-warning",
  },
  not_started: {
    label: "Not started",
    badge: "bg-subtle text-[#4A5465]",
    ring: "border-[#C5CBD4]",
    fill: "bg-surface",
    segment: "bg-border",
  },
};

export function StatusBadge({ status, className }: { status: MilestoneStatus; className?: string }) {
  const s = statusStyles[status];
  return (
    <span className={cn("whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold", s.badge, className)}>
      {s.label}
    </span>
  );
}

export function StatusDot({ status, className }: { status: MilestoneStatus; className?: string }) {
  const s = statusStyles[status];
  return (
    <span
      className={cn(
        "flex size-6 shrink-0 items-center justify-center rounded-full border-2",
        s.ring,
        s.fill,
        className
      )}
    >
      {status === "completed" && <Check className="size-3 text-white" strokeWidth={3.5} aria-hidden />}
    </span>
  );
}
