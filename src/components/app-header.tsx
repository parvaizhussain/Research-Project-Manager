import { Bell, Search } from "lucide-react";
import { Logo } from "./logo";
import { Avatar } from "./ui/card";

// Header for logged-in areas (student & supervisor)
export function AppHeader({
  name,
  role,
  initials,
  children,
}: {
  name: string;
  role: string;
  initials: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="border-b border-border bg-surface">
      <div className="flex flex-wrap items-center gap-5 px-4 py-3 md:px-6">
        <div className="md:w-[216px]">
          <Logo short href="/" />
        </div>
        {children ?? (
          <div className="hidden max-w-[480px] flex-[1_1_280px] items-center gap-2.5 rounded-[10px] border border-border bg-background px-3 md:flex">
            <Search className="size-4 text-muted" aria-hidden />
            <label htmlFor="app-q" className="sr-only">
              Search
            </label>
            <input
              id="app-q"
              type="search"
              placeholder="Search projects, files, comments"
              className="h-10 w-full bg-transparent text-sm outline-none placeholder:text-muted"
            />
          </div>
        )}
        <div className="ml-auto flex items-center gap-2.5">
          {/* FR-09: notifications */}
          <button
            type="button"
            aria-label="Notifications, 2 unread"
            className="relative flex size-11 items-center justify-center rounded-[10px] border border-border bg-surface hover:bg-subtle"
          >
            <Bell className="size-[18px] text-ink-2" aria-hidden />
            <span className="absolute right-[9px] top-2 size-2 rounded-full border-2 border-white bg-[#B42318]" />
          </button>
          <div className="flex items-center gap-2.5">
            <Avatar initials={initials} tone={role === "Supervisor" ? "dark" : "primary"} />
            <span className="hidden text-[13px] leading-tight sm:block">
              <span className="block font-semibold">{name}</span>
              <span className="text-muted">{role}</span>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
