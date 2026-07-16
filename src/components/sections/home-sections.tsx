import Link from "next/link";

import { ProjectMedia } from "@/components/projects/project-media";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { selectedProjects, specheal, quorum } from "@/content/projects";
import { siteContent } from "@/content/site";

export function SelectedSystemsSection() {
  return (
    <section id="selected-systems" className="scroll-mt-24 py-24 sm:py-32">
      <Container>
        <div className="max-w-[54rem]">
          <h2 className="font-display text-5xl font-[520] tracking-[-0.05em] sm:text-6xl">
            {siteContent.selectedWork.title}
          </h2>
          <p className="copy-pretty mt-5 max-w-[44rem] text-lg leading-8 text-ink-600">
            {siteContent.selectedWork.intro}
          </p>
        </div>

        <div className="mt-16 space-y-20 lg:space-y-28">
          {selectedProjects.map((project, index) => (
            <article
              key={project.slug}
              className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12"
            >
              <div className={index === 1 ? "lg:order-2 lg:col-span-7" : "lg:col-span-7"}>
                <ProjectMedia media={project.media[0]} />
              </div>
              <div className={index === 1 ? "lg:order-1 lg:col-span-5" : "lg:col-span-5"}>
                <p className="font-mono text-xs font-semibold text-ember-700">{project.statusLabel}</p>
                <h3 className="mt-4 font-display text-4xl font-[520] tracking-[-0.045em] sm:text-5xl">
                  {project.title}
                </h3>
                <p className="mt-4 text-lg leading-8 text-ink-700">{project.oneLiner}</p>
                <p className="mt-5 text-base leading-7 text-ink-600">{project.cardCopy}</p>
                <Link
                  href={`/work/${project.slug}`}
                  className="mt-7 inline-flex min-h-11 items-center font-semibold text-ember-700 underline decoration-ember-500/40 underline-offset-8 hover:text-ink-900"
                >
                  Read case study
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-24 grid gap-7 border-t border-line-200 pt-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="font-mono text-xs font-semibold text-ember-700">RESEARCH PROTOTYPE</p>
            <h3 className="mt-3 font-display text-4xl font-[520] tracking-[-0.04em]">
              {specheal.title}
            </h3>
          </div>
          <div>
            <p className="max-w-[46rem] text-lg leading-8 text-ink-600">{specheal.cardCopy}</p>
            <Link
              href={`/work/${specheal.slug}`}
              className="mt-5 inline-flex min-h-11 items-center font-semibold text-ember-700 underline decoration-ember-500/40 underline-offset-8 hover:text-ink-900"
            >
              Inspect the offline prototype
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function ResearchSection() {
  return (
    <section id="research" className="scroll-mt-24 bg-paper-1/62 py-24 sm:py-32">
      <Container className="grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
        <h2 className="max-w-[10ch] font-display text-5xl leading-[0.98] font-[520] tracking-[-0.05em] sm:text-6xl">
          {siteContent.research.title}
        </h2>
        <div className="max-w-[47rem]">
          {siteContent.research.paragraphs.map((paragraph) => (
            <p key={paragraph} className="not-first:mt-6 text-xl leading-9 text-ink-700">
              {paragraph}
            </p>
          ))}
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {["Frame the risk", "Build the mechanism", "Expose the evidence", "Test the boundary"].map(
              (step) => (
                <div key={step} className="border-l-2 border-ember-500 pl-4 text-sm font-semibold text-ink-700">
                  {step}
                </div>
              ),
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

export function PrinciplesSection() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div className="max-w-[52rem]">
          <h2 className="font-display text-5xl font-[520] tracking-[-0.05em] sm:text-6xl">
            How I build autonomous systems
          </h2>
          <p className="mt-5 text-xl leading-8 text-ink-600">
            Autonomy is useful only when people can understand its limits.
          </p>
        </div>
        <div className="mt-16 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {siteContent.principles.map((principle) => (
            <article key={principle.title} className="border-t border-line-200 pt-6">
              <h3 className="text-xl font-semibold tracking-[-0.025em]">{principle.title}</h3>
              <p className="mt-3 max-w-[34rem] leading-7 text-ink-600">{principle.copy}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-24 pb-24 sm:pb-32">
      <Container>
        <div className="paper-surface relative overflow-hidden rounded-[1.75rem] border border-line-200 bg-paper-1 p-7 sm:p-10 lg:grid lg:grid-cols-[0.72fr_1.28fr] lg:gap-16 lg:p-14">
          <div>
            <h2 className="font-display text-4xl font-[520] tracking-[-0.045em] sm:text-5xl">
              Researcher. Builder. Systems thinker.
            </h2>
          </div>
          <div className="mt-8 lg:mt-0">
            <p className="text-xl leading-9 text-ink-700">{siteContent.about.short}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/about">Read more</ButtonLink>
              <ButtonLink href={siteContent.contact.github} variant="secondary">
                View GitHub
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function CurrentBuildSection() {
  return (
    <section className="bg-smoke-900 py-24 text-paper-0 sm:py-32">
      <Container className="grid gap-14 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-20">
        <div>
          <p className="font-mono text-xs font-semibold tracking-[0.1em] text-[#e18a62]">
            CURRENTLY BUILDING
          </p>
          <h2 className="mt-5 font-display text-6xl font-[520] tracking-[-0.055em] sm:text-7xl">
            {quorum.title}
          </h2>
          <p className="mt-5 max-w-[36rem] text-xl leading-8 text-paper-2">{quorum.oneLiner}</p>
          <p className="mt-6 max-w-[40rem] leading-7 text-paper-2/78">{quorum.cardCopy}</p>
          <Link
            href={`/work/${quorum.slug}`}
            className="mt-8 inline-flex min-h-11 items-center rounded-full border border-paper-2/28 px-5 text-sm font-semibold text-paper-0 hover:bg-paper-0 hover:text-ink-900"
          >
            Inspect Quorum
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {["Create", "Publish", "Checkout", "Pass", "Check-in", "Withdraw"].map((flow) => (
            <div
              key={flow}
              className="grid aspect-square place-items-center rounded-[1.25rem] border border-paper-2/14 bg-white/[0.035] p-4 text-center font-mono text-xs text-paper-2"
            >
              {flow}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-24 bg-smoke-900 pb-24 text-paper-0 sm:pb-32">
      <Container>
        <div className="border-t border-paper-2/18 pt-20">
          <h2 className="display-balance max-w-[11ch] font-display text-6xl leading-[0.95] font-[520] tracking-[-0.055em] sm:text-8xl">
            {siteContent.contact.title}
          </h2>
          <p className="mt-7 max-w-[43rem] text-lg leading-8 text-paper-2/78">
            {siteContent.contact.copy}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={`mailto:${siteContent.contact.email}`}
              className="inline-flex min-h-11 items-center rounded-full bg-paper-0 px-5 text-sm font-semibold text-ink-900 hover:bg-[#e18a62]"
            >
              Send me an email
            </a>
            <a
              href={siteContent.contact.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center rounded-full border border-paper-2/25 px-5 text-sm font-semibold hover:bg-paper-0 hover:text-ink-900"
            >
              View GitHub
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
