import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-2xl border border-border bg-surface", className)} {...props} />;
}

export function Avatar({
  initials,
  className,
  tone = "primary",
}: {
  initials: string;
  className?: string;
  tone?: "primary" | "dark" | "neutral";
}) {
  const tones = {
    primary: "bg-primary-soft text-primary-fg",
    dark: "bg-ink text-white",
    neutral: "bg-subtle text-ink-2",
  };
  return (
    <span
      className={cn(
        "flex size-[34px] shrink-0 items-center justify-center rounded-full text-xs font-semibold",
        tones[tone],
        className
      )}
    >
      {initials}
    </span>
  );
}
