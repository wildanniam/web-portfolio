import Link from "next/link";

import { ProjectMedia } from "@/components/projects/project-media";
import { Container } from "@/components/ui/container";
import { selectedProjects, specheal } from "@/content/projects";
import { siteContent } from "@/content/site";
import { SelectedSystemsSceneController } from "@/motion/selected-systems-scene";

const buildStages = siteContent.approach.steps.map((step, index) => ({
  step,
  principle: siteContent.principles[index],
}));

export function SelectedSystemsSection() {
  return (
    <section
      id="selected-work"
      aria-labelledby="selected-work-title"
      className="selected-work-section scroll-mt-24 py-24 sm:py-32"
    >
      <Container>
        <header className="selected-work-section__header max-w-[54rem]">
          <p className="font-mono text-xs font-semibold tracking-[0.12em] text-ember-700">
            SELECTED WORK / {String(selectedProjects.length).padStart(2, "0")}
          </p>
          <h2
            id="selected-work-title"
            className="font-display text-5xl font-[520] tracking-[-0.05em] sm:text-6xl"
          >
            {siteContent.selectedWork.title}
          </h2>
          <p className="copy-pretty mt-5 max-w-[44rem] text-lg leading-8 text-ink-600">
            {siteContent.selectedWork.intro}
          </p>
        </header>

        <div data-signature-scene="selected-systems">
          <div className="selected-systems-stage mt-14 sm:mt-16">
            {selectedProjects.map((project, index) => {
              const highlight =
                project.evidence.find((item) => item.scope === "team") ??
                project.evidence.find((item) => item.scope === "product") ??
                project.evidence[0];

              return (
                <article
                  key={project.slug}
                  data-system-panel
                  data-project-slug={project.slug}
                  data-project-index={String(index + 1).padStart(2, "0")}
                  className="selected-system-panel"
                >
                  <div data-system-surface className="selected-system-surface paper-surface">
                    <div data-system-content className="selected-system-content">
                      <div className="selected-system-main">
                        <div className="selected-system-media">
                          <ProjectMedia
                            media={project.media[0]}
                            sizes="(min-width: 1280px) 52vw, (min-width: 768px) 54vw, calc(100vw - 2.5rem)"
                          />
                        </div>
                        <div className="selected-system-copy">
                          <div className="selected-system-meta">
                            <span>{project.statusLabel}</span>
                            <span>{project.year}</span>
                          </div>
                          <h3>{project.title}</h3>
                          <p className="selected-system-one-liner">{project.oneLiner}</p>
                          <p className="selected-system-role">{project.role}</p>
                          <Link href={`/work/${project.slug}`}>Read case study</Link>
                        </div>
                      </div>

                      <dl className="selected-system-ledger">
                        <div>
                          <dt>My contribution</dt>
                          <dd>{project.contributions[0]}</dd>
                        </div>
                        <div>
                          <dt>Highlight</dt>
                          <dd>
                            {highlight.claim}{" "}
                            <a href={highlight.source.href} target="_blank" rel="noreferrer">
                              {highlight.source.label}
                            </a>
                          </dd>
                        </div>
                        <div>
                          <dt>Current state</dt>
                          <dd>{project.limitations[0]}</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          <SelectedSystemsSceneController />
        </div>

        <aside
          aria-label="More work"
          className="selected-work-section__archive mt-20 grid gap-7 border-t border-line-200 pt-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end"
        >
          <div>
            <p className="font-mono text-xs font-semibold text-ember-700">
              HACKATHON PROJECT · ARCHIVED
            </p>
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
              View the SpecHeal case study
            </Link>
          </div>
        </aside>
      </Container>
    </section>
  );
}

export function HowIBuildSection() {
  return (
    <section
      id="how-i-work"
      data-signature-scene="how-i-build"
      aria-labelledby="how-i-build-title"
      className="how-build-section scroll-mt-24"
    >
      <Container className="how-build-section__grid">
        <header className="how-build-section__intro">
          <p>HOW I BUILD</p>
          <h2 id="how-i-build-title">{siteContent.approach.title}</h2>
          <div>
            {siteContent.approach.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </header>

        <ol className="how-build-path">
          {buildStages.map(({ step, principle }, index) => (
            <li key={step} data-build-stage className="how-build-stage">
              <span className="how-build-stage__index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="how-build-stage__copy">
                <p>{step}</p>
                <h3>{principle.title}</h3>
                <span>{principle.copy}</span>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

export function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="contact-stage scroll-mt-24 bg-smoke-900 text-paper-0"
    >
      <Container>
        <div className="contact-stage__body">
          <div>
            <p className="contact-stage__eyebrow">LET&apos;S MAKE IT REAL</p>
            <h2 id="contact-title">{siteContent.contact.title}</h2>
          </div>

          <div className="contact-stage__invitation">
            <p>{siteContent.contact.copy}</p>
            <a
              href={`mailto:${siteContent.contact.email}`}
              className="contact-stage__email"
            >
              {siteContent.contact.email}
            </a>
          </div>
        </div>

        <div className="contact-stage__meta">
          <span>{siteContent.contact.location}</span>
          <span>AI / WEB3 / PRODUCT ENGINEERING</span>
          <a href={siteContent.contact.github} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
          <a href={siteContent.contact.instagram} target="_blank" rel="noreferrer">
            Instagram ↗
          </a>
          <a href="#main-content">Back to top ↑</a>
        </div>
      </Container>
    </section>
  );
}
