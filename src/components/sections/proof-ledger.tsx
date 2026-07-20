import { Container } from "@/components/ui/container";
import { proofLedger } from "@/content/site";

export function ProofLedger() {
  return (
    <section
      id="recognition"
      aria-labelledby="recognition-title"
      className="recognition-section border-y border-line-200 bg-paper-1/48"
    >
      <Container>
        <header className="recognition-section__header">
          <div className="recognition-section__title-group">
            <p className="recognition-section__eyebrow">SELECTED HIGHLIGHTS</p>
            <h2 id="recognition-title">
              A few moments <br className="recognition-section__title-break" />I&apos;m proud of.
            </h2>
          </div>
          <p className="recognition-section__deck">
            Team outcomes and project recognition, linked to the public source where available.
          </p>
        </header>

        <div className="recognition-grid proof-ledger-grid">
          {proofLedger.map((proof, index) => (
            <a
              key={proof.label}
              href={proof.href}
              target="_blank"
              rel="noreferrer"
              className="recognition-item group"
              aria-label={`${proof.value}: open public source in a new tab`}
            >
              <span className="recognition-item__index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="recognition-item__label">{proof.label}</span>
              <strong>{proof.value}</strong>
              <span className="recognition-item__context">{proof.context}</span>
              <span className="recognition-item__arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
