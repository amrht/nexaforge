import type { Metadata } from "next";
import Link from "next/link";
import { getCaseStudies } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "See how NexaForge helps enterprise teams transform their engineering stack.",
};

export const revalidate = 60;

export default async function CaseStudiesPage() {
  const studies = await getCaseStudies();

  return (
    <div className="px-6 py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
          Case Studies
        </span>
        <h1 className="mt-4 mb-4 text-4xl font-semibold text-white md:text-5xl">
          Proven results at scale
        </h1>
        <p className="mb-16 max-w-2xl text-muted">
          Real transformations from enterprise teams who partnered with NexaForge.
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          {studies.map((study) => (
            <Link
              key={study._id}
              href={`/case-studies/${study.slug}`}
              className="group rounded-2xl border border-border bg-surface p-8 transition-colors hover:border-accent/30"
              data-cursor="link"
            >
              <span className="text-xs font-medium uppercase tracking-wider text-accent">
                {study.industry}
              </span>
              <h2 className="mt-3 text-2xl font-semibold text-white transition-colors group-hover:text-accent">
                {study.title}
              </h2>
              <p className="mt-2 text-sm text-muted">{study.client}</p>
              {study.results && (
                <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-muted">
                  {study.results}
                </p>
              )}
              {study.metrics && (
                <div className="mt-6 flex gap-6">
                  {study.metrics.slice(0, 3).map((m) => (
                    <div key={m.label}>
                      <p className="text-xl font-semibold text-white">{m.value}</p>
                      <p className="text-xs text-muted">{m.label}</p>
                    </div>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
