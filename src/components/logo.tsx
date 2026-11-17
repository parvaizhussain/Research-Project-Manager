import Link from "next/link";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <span className={cn("flex size-[34px] items-center justify-center rounded-[9px] bg-ink", className)}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="5" cy="18" r="2.5" fill="#FFFFFF" />
        <circle cx="12" cy="11" r="2.5" fill="#FFFFFF" />
        <circle cx="19" cy="5" r="2.5" fill="#7C9BFF" />
        <path d="M6.8 16.2l3.4-3.4M13.8 9.2l3.4-2.4" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export function Logo({ short = false, href = "/" }: { short?: boolean; href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-2.5 text-ink">
      <LogoMark />
      <span className="text-[15px] font-semibold tracking-tight sm:text-base">
        {short ? "Research PM" : "Research Project Manager"}
      </span>
    </Link>
  );
}
