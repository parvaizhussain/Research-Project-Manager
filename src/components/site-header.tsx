import Link from "next/link";
import { Logo } from "./logo";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/explore", label: "Explore projects" },
  { href: "/#featured", label: "Featured" },
  { href: "/#areas", label: "Research areas" },
  { href: "/#how", label: "How it works" },
];

// Public header for guests (FR-01: login / sign-up entry points)
export function SiteHeader({ active }: { active?: string }) {
  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-x-8 gap-y-3 px-6 py-3.5">
        <Logo />
        <nav aria-label="Main" className="flex flex-1 flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn("text-ink-2 hover:text-ink", active === l.href && "font-semibold text-ink")}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2.5">
          <Link href="/login" className={buttonVariants({ variant: "ghost" })}>
            Log in
          </Link>
          <Link href="/signup" className={buttonVariants()}>
            Create account
          </Link>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-[1200px] flex-wrap justify-between gap-4 px-6 py-7 text-sm text-muted">
        <span>© 2026 Research Project Manager</span>
        <nav aria-label="Footer" className="flex flex-wrap gap-5">
          {["About", "Help centre", "Privacy", "Contact research office"].map((l) => (
            <Link key={l} href="#" className="hover:text-ink">
              {l}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
