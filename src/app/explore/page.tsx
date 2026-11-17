import Link from "next/link";
import { ArrowRight, Search, SearchX } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { ProjectCover } from "@/components/project-cover";
import { Card } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { projects, researchAreas } from "@/lib/data";

type SearchParams = Promise<{ q?: string; area?: string | string[]; year?: string; sort?: string }>;

// FR-06: search by title, keyword or author; filter by research area and year
export default async function ExplorePage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const q = (params.q ?? "").trim();
  const areas = params.area ? (Array.isArray(params.area) ? params.area : [params.area]) : [];
  const year = params.year ?? "";
  const sort = params.sort ?? "relevant";

  const needle = q.toLowerCase();
  let results = projects.filter((p) => {
    const matchesQ =
      !needle ||
      p.title.toLowerCase().includes(needle) ||
      p.author.toLowerCase().includes(needle) ||
      p.keywords.some((k) => k.toLowerCase().includes(needle));
    const matchesArea = areas.length === 0 || areas.includes(p.area);
    const matchesYear = !year || String(p.year) === year;
    return matchesQ && matchesArea && matchesYear;
  });
  if (sort === "newest") results = [...results].sort((a, b) => b.year - a.year);
  if (sort === "title") results = [...results].sort((a, b) => a.title.localeCompare(b.title));

  const years = ["2026", "2025", "2024"];

  return (
    <>
      <SiteHeader active="/explore" />

      <form action="/explore">
        <section className="border-b border-border bg-surface">
          <div className="mx-auto max-w-[1200px] px-6 pb-8 pt-10">
            <h1 className="mb-2 text-4xl font-bold tracking-tight">Explore published projects</h1>
            <p className="mb-6 text-muted">Search finished theses and research projects to learn from past work.</p>
            <div role="search" className="flex flex-wrap gap-2.5">
              <label htmlFor="q" className="sr-only">
                Search projects
              </label>
              <div className="flex flex-[1_1_360px] items-center gap-2.5 rounded-xl border border-border-strong bg-surface px-3.5">
                <Search className="size-[18px] text-muted" aria-hidden />
                <input
                  id="q"
                  name="q"
                  type="search"
                  defaultValue={q}
                  placeholder="Search by title, keyword or author"
                  className="h-[46px] w-full bg-transparent text-[15px] outline-none placeholder:text-muted"
                />
              </div>
              <Button type="submit" size="lg" className="rounded-xl">
                Search
              </Button>
            </div>
          </div>
        </section>

        <div className="mx-auto flex max-w-[1200px] flex-wrap items-start gap-8 px-6 pb-16 pt-8">
          {/* Filters */}
          <Card className="w-full p-[22px] md:w-auto md:max-w-[280px] md:flex-[1_1_240px]">
            <div className="mb-[18px] flex items-center justify-between">
              <h2 className="font-semibold">Filters</h2>
              <Link href="/explore" className="flex min-h-11 items-center text-[13px] font-semibold text-primary">
                Clear all
              </Link>
            </div>

            <fieldset className="mb-[22px]">
              <legend className="mb-2.5 text-xs font-semibold uppercase tracking-[0.06em] text-muted">Research area</legend>
              {researchAreas.slice(0, 6).map((a) => (
                <label key={a.name} className="flex cursor-pointer items-center gap-2.5 py-[7px] text-sm">
                  <input
                    type="checkbox"
                    name="area"
                    value={a.name}
                    defaultChecked={areas.includes(a.name)}
                    className="size-[18px] accent-primary"
                  />
                  {a.name}
                </label>
              ))}
            </fieldset>

            <fieldset className="mb-[22px]">
              <legend className="mb-2.5 text-xs font-semibold uppercase tracking-[0.06em] text-muted">Year</legend>
              <div className="flex flex-wrap gap-2">
                {["", ...years].map((y) => (
                  <label key={y || "all"} className="cursor-pointer">
                    <input type="radio" name="year" value={y} defaultChecked={year === y} className="peer sr-only" />
                    <span className="flex h-9 items-center rounded-full border border-border-strong bg-surface px-3.5 text-[13px] font-semibold text-ink-2 peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-primary">
                      {y || "All"}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <label htmlFor="sort" className="mb-2.5 block text-xs font-semibold uppercase tracking-[0.06em] text-muted">
              Sort by
            </label>
            <select
              id="sort"
              name="sort"
              defaultValue={sort}
              className="h-11 w-full rounded-[10px] border border-border-strong bg-surface px-3 text-sm"
            >
              <option value="relevant">Most relevant</option>
              <option value="newest">Newest first</option>
              <option value="title">Title A–Z</option>
            </select>
            <Button type="submit" variant="dark" className="mt-4 w-full">
              Apply filters
            </Button>
          </Card>

          {/* Results */}
          <main className="min-w-0 flex-[999_1_560px]">
            <p className="mb-4 text-sm text-muted">
              <strong className="font-semibold text-ink">
                {results.length} {results.length === 1 ? "project" : "projects"}
              </strong>
              {q && <> match &ldquo;{q}&rdquo;</>}
              {areas.length > 0 && <> in {areas.join(", ")}</>}
              {year && <> · {year}</>}
            </p>

            {results.length === 0 ? (
              <Card className="flex flex-col items-center px-6 py-16 text-center">
                <SearchX className="size-10 text-muted" aria-hidden />
                <h2 className="mt-4 text-lg font-semibold">No results found</h2>
                <p className="mt-1 max-w-sm text-sm text-muted">
                  Try a different keyword, or clear some filters to see more projects.
                </p>
                <Link href="/explore" className={buttonVariants({ variant: "outline", className: "mt-5" })}>
                  Clear search
                </Link>
              </Card>
            ) : (
              <div className="flex flex-col gap-4">
                {results.map((r, i) => (
                  <Card key={r.id} className="flex flex-wrap gap-[22px] p-[22px]">
                    <div className="size-[132px] shrink-0 overflow-hidden rounded-xl">
                      <ProjectCover cover={r.cover} variant={i} />
                    </div>
                    <div className="flex min-w-0 flex-[1_1_360px] flex-col gap-2">
                      <div className="flex flex-wrap items-center gap-2.5 text-xs">
                        <span className="rounded-full bg-primary-soft px-2.5 py-1 font-semibold text-primary-fg">{r.area}</span>
                        <span className="font-mono text-muted">{r.year}</span>
                      </div>
                      <h2 className="text-[19px] font-semibold leading-snug tracking-tight">
                        <Link href={`/projects/${r.slug}`} className="hover:text-primary">
                          {r.title}
                        </Link>
                      </h2>
                      <p className="text-sm leading-relaxed text-muted">{r.abstract}</p>
                      <div className="mt-0.5 flex flex-wrap gap-1.5">
                        {r.keywords.map((k) => (
                          <span key={k} className="rounded-md bg-subtle px-2 py-1 text-xs text-ink-2">
                            {k}
                          </span>
                        ))}
                      </div>
                      <div className="mt-1.5 flex flex-wrap items-center justify-between gap-3 border-t border-[#F0F2F5] pt-3.5">
                        <span className="text-[13px] text-muted">
                          <strong className="font-semibold text-ink">{r.author}</strong> · Supervised by {r.supervisor}
                        </span>
                        <Link href={`/projects/${r.slug}`} className={buttonVariants({ variant: "outline", size: "sm" })}>
                          View Details <ArrowRight aria-hidden />
                        </Link>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </main>
        </div>
      </form>

      <SiteFooter />
    </>
  );
}
