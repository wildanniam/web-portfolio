import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProjectMedia } from "@/components/projects/project-media";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { getProjectBySlug, projects } from "@/content/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return {};

  return {
    title: project.title,
    description: project.oneLiner,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.title} | Wildan Syukri Niam`,
      description: project.oneLiner,
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const projectIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.oneLiner,
    creator: { "@type": "Person", name: "Wildan Syukri Niam" },
    url: `/work/${project.slug}`,
    dateModified: project.lastVerifiedAt,
  };

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectJsonLd).replaceAll("<", "\\u003c"),
        }}
      />
      <article>
        <header className="py-16 sm:py-24">
          <Container>
            <Link href="/work" className="text-sm font-semibold text-ember-700 hover:text-ink-900">
              Back to work
            </Link>
            <div className="mt-10 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end lg:gap-16">
              <div>
                <p className="font-mono text-xs font-semibold text-ember-700">
                  {project.statusLabel}
                </p>
                <h1 className="mt-4 font-display text-7xl leading-[0.94] font-[520] tracking-[-0.06em] sm:text-8xl">
                  {project.title}
                </h1>
                <p className="mt-6 max-w-[38rem] text-xl leading-8 text-ink-700">
                  {project.oneLiner}
                </p>
              </div>
              <dl className="grid grid-cols-2 gap-x-8 gap-y-6 border-t border-line-200 pt-6 text-sm sm:grid-cols-3">
                <div>
                  <dt className="text-ink-600">Role</dt>
                  <dd className="mt-2 font-semibold text-ink-900">{project.role}</dd>
                </div>
                <div>
                  <dt className="text-ink-600">Year</dt>
                  <dd className="mt-2 font-semibold text-ink-900">{project.year}</dd>
                </div>
                <div>
                  <dt className="text-ink-600">State</dt>
                  <dd className="mt-2 font-semibold text-ink-900">{project.liveStatus}</dd>
                </div>
              </dl>
            </div>
            <div className="mt-12">
              <ProjectMedia media={project.media[0]} />
            </div>
          </Container>
        </header>

        <section className="border-y border-line-200 bg-paper-1/52 py-20 sm:py-24">
          <Container className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
            <div>
              <h2 className="font-display text-5xl font-[520] tracking-[-0.05em]">
                The question
              </h2>
              <p className="mt-6 text-xl leading-9 text-ink-700">{project.problem}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-ink-900">Built for</h3>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {project.audience.map((audience) => (
                  <p key={audience} className="border-l-2 border-ember-500 pl-4 leading-7 text-ink-600">
                    {audience}
                  </p>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section className="py-20 sm:py-28">
          <Container className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <h2 className="font-display text-5xl font-[520] tracking-[-0.05em]">
                How the system works
              </h2>
              <ol className="mt-10 space-y-6">
                {project.mechanism.map((step, index) => (
                  <li key={step} className="grid grid-cols-[2rem_1fr] gap-4">
                    <span className="font-mono text-xs font-semibold text-ember-700">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="leading-7 text-ink-700">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h2 className="font-display text-5xl font-[520] tracking-[-0.05em]">
                My contribution
              </h2>
              <div className="mt-10 space-y-6">
                {project.contributions.map((contribution) => (
                  <p key={contribution} className="border-t border-line-200 pt-5 leading-7 text-ink-700">
                    {contribution}
                  </p>
                ))}
              </div>
              <p className="mt-9 rounded-[1.25rem] bg-paper-1 p-6 text-sm leading-7 text-ink-600">
                {project.teamAttribution}
              </p>
            </div>
          </Container>
        </section>

        <section className="border-y border-line-200 bg-paper-1/52 py-20 sm:py-24">
          <Container>
            <h2 className="font-display text-5xl font-[520] tracking-[-0.05em]">
              Decisions and tradeoffs
            </h2>
            <div className="mt-12 grid gap-7 md:grid-cols-2">
              {project.decisions.map((decision) => (
                <article key={decision.title} className="rounded-[1.25rem] border border-line-200 bg-paper-0 p-7">
                  <h3 className="text-xl font-semibold tracking-[-0.025em]">{decision.title}</h3>
                  <p className="mt-4 leading-7 text-ink-700">{decision.rationale}</p>
                  <p className="mt-4 text-sm leading-7 text-ink-600">Tradeoff: {decision.tradeoff}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="py-20 sm:py-28">
          <Container className="grid gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <div>
              <h2 className="font-display text-5xl font-[520] tracking-[-0.05em]">
                Evidence ledger
              </h2>
              <div className="mt-10 space-y-8">
                {project.evidence.map((evidence) => (
                  <article key={evidence.id} className="border-t border-line-200 pt-6">
                    <div className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[0.66rem] text-ink-600">
                      <span>{evidence.scope.toUpperCase()}</span>
                      <span>{evidence.state.toUpperCase()}</span>
                      <span>{evidence.asOf}</span>
                    </div>
                    <p className="mt-4 text-lg leading-8 text-ink-700">{evidence.claim}</p>
                    <a
                      href={evidence.source.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-ember-700 underline decoration-ember-500/40 underline-offset-8 hover:text-ink-900"
                    >
                      {evidence.source.label}
                    </a>
                  </article>
                ))}
              </div>
            </div>
            <aside className="rounded-[1.5rem] border border-line-200 bg-paper-1 p-7 sm:p-9">
              <h2 className="font-display text-4xl font-[520] tracking-[-0.045em]">
                Scope boundaries
              </h2>
              <div className="mt-8 space-y-5">
                {project.limitations.map((limitation) => (
                  <p key={limitation} className="border-l-2 border-bronze-500 pl-4 leading-7 text-ink-600">
                    {limitation}
                  </p>
                ))}
              </div>
            </aside>
          </Container>
        </section>

        <footer className="border-t border-line-200 py-16 sm:py-20">
          <Container className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
            <div>
              <p className="text-sm text-ink-600">Next system</p>
              <Link
                href={`/work/${nextProject.slug}`}
                className="mt-2 block font-display text-5xl font-[520] tracking-[-0.05em] hover:text-ember-700"
              >
                {nextProject.title}
              </Link>
            </div>
            <div className="flex flex-wrap gap-3">
              {project.links.map((link, index) => (
                <ButtonLink key={link.href} href={link.href} variant={index === 0 ? "primary" : "secondary"}>
                  {link.label}
                </ButtonLink>
              ))}
            </div>
          </Container>
        </footer>
      </article>
    </main>
  );
}
