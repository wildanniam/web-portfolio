import { Container } from "@/components/ui/container";
import { proofLedger } from "@/content/site";

export function ProofLedger() {
  return (
    <section aria-label="Selected public proof" className="border-y border-line-200 bg-paper-1/48">
      <Container className="proof-ledger-grid">
        {proofLedger.map((proof) => (
          <a
            key={proof.label}
            href={proof.href}
            target="_blank"
            rel="noreferrer"
            className="group py-6 md:px-7 xl:py-7 xl:first:pl-0 xl:last:pr-0"
          >
            <span className="font-mono text-[0.64rem] font-semibold tracking-[0.12em] text-ember-700">
              {proof.label}
            </span>
            <strong className="mt-3 block font-display text-2xl font-[520] tracking-[-0.035em] text-ink-900 group-hover:text-ember-700">
              {proof.value}
            </strong>
            <span className="mt-1 block text-sm leading-6 text-ink-600">{proof.context}</span>
          </a>
        ))}
      </Container>
    </section>
  );
}
