import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCaseStudy, getCaseStudies } from "@/lib/cms";
import MagneticButton from "@/components/ui/MagneticButton";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const studies = await getCaseStudies();
  return studies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) return { title: "Case Study Not Found" };

  return {
    title: study.title,
    description: study.results,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) notFound();

  return (
    <article className="px-6 py-32 md:px-12">
      <div className="mx-auto max-w-4xl">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
          {study.industry}
        </span>
        <h1 className="mt-4 text-4xl font-semibold text-white md:text-5xl">
          {study.title}
        </h1>
        <p className="mt-4 text-lg text-muted">{study.client}</p>

        {study.metrics && (
          <div className="mt-12 grid grid-cols-3 gap-6 rounded-2xl border border-border bg-surface p-8">
            {study.metrics.map((m) => (
              <div key={m.label} className="text-center">
                <p className="text-3xl font-semibold text-accent">{m.value}</p>
                <p className="mt-1 text-sm text-muted">{m.label}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 space-y-12">
          {study.challenge && (
            <section>
              <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-white/40">
                Challenge
              </h2>
              <p className="text-lg leading-relaxed text-muted">{study.challenge}</p>
            </section>
          )}
          {study.solution && (
            <section>
              <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-white/40">
                Solution
              </h2>
              <p className="text-lg leading-relaxed text-muted">{study.solution}</p>
            </section>
          )}
          {study.results && (
            <section>
              <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-white/40">
                Results
              </h2>
              <p className="text-lg leading-relaxed text-muted">{study.results}</p>
            </section>
          )}
        </div>

        <div className="mt-16">
          <MagneticButton href="/contact" variant="primary">
            Start Your Transformation
          </MagneticButton>
        </div>
      </div>
    </article>
  );
}
