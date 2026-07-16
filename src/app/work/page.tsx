import type { Metadata } from "next";
import Link from "next/link";

import { ProjectMedia } from "@/components/projects/project-media";
import { Container } from "@/components/ui/container";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Evidence-led systems across AI agents, Web3 trust, on-chain intelligence, payments, and software reliability.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <main id="main-content">
      <section className="py-20 sm:py-28">
        <Container>
          <p className="font-mono text-xs font-semibold tracking-[0.1em] text-ember-700">
            WORK
          </p>
          <h1 className="display-balance mt-5 max-w-[12ch] font-display text-6xl leading-[0.96] font-[520] tracking-[-0.055em] sm:text-7xl lg:text-8xl">
            Systems built to leave evidence.
          </h1>
          <p className="mt-7 max-w-[44rem] text-xl leading-9 text-ink-600">
            Five projects spanning wallet intelligence, agentic payments, test recovery, and
            inspectable settlement. Each case study states the boundary as clearly as the result.
          </p>
        </Container>
      </section>

      <section className="pb-24 sm:pb-32">
        <Container className="space-y-20 lg:space-y-28">
          {projects.map((project, index) => (
            <article key={project.slug} className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
              <div className={index % 2 === 1 ? "lg:order-2 lg:col-span-7" : "lg:col-span-7"}>
                <ProjectMedia media={project.media[0]} />
              </div>
              <div className={index % 2 === 1 ? "lg:order-1 lg:col-span-5" : "lg:col-span-5"}>
                <p className="font-mono text-xs font-semibold text-ember-700">
                  {project.statusLabel}
                </p>
                <h2 className="mt-4 font-display text-5xl font-[520] tracking-[-0.05em]">
                  {project.title}
                </h2>
                <p className="mt-4 text-xl leading-8 text-ink-700">{project.oneLiner}</p>
                <p className="mt-5 leading-7 text-ink-600">{project.cardCopy}</p>
                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-600">
                  <span>{project.role}</span>
                  <span>{project.year}</span>
                </div>
                <Link
                  href={`/work/${project.slug}`}
                  className="mt-7 inline-flex min-h-11 items-center font-semibold text-ember-700 underline decoration-ember-500/40 underline-offset-8 hover:text-ink-900"
                >
                  Read case study
                </Link>
              </div>
            </article>
          ))}
        </Container>
      </section>
    </main>
  );
}
