import Link from "next/link";
import { cn } from "@/lib/utils";

export function SupervisorNav({ active }: { active: "dashboard" | "review" }) {
  const items = [
    { key: "dashboard", label: "Dashboard", href: "/supervisor" },
    { key: "students", label: "My students", href: "#" },
    { key: "review", label: "Review queue", href: "/supervisor/review", count: 5 },
    { key: "explore", label: "Explore", href: "/explore" },
  ];
  return (
    <nav aria-label="Supervisor" className="flex flex-1 flex-wrap gap-1">
      {items.map((i) => (
        <Link
          key={i.key}
          href={i.href}
          aria-current={active === i.key ? "page" : undefined}
          className={cn(
            "flex min-h-10 items-center gap-2 rounded-[9px] px-3.5 text-sm font-medium text-ink-2 hover:bg-subtle",
            active === i.key && "bg-subtle font-semibold text-ink"
          )}
        >
          {i.label}
          {i.count && (
            <span className="rounded-full bg-warning-soft px-2 py-px text-xs font-semibold text-warning-fg">{i.count}</span>
          )}
        </Link>
      ))}
    </nav>
  );
}
