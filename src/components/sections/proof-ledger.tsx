import { Container } from "@/components/ui/container";
import { proofLedger } from "@/content/site";

export function ProofLedger() {
  return (
    <section aria-label="Selected public proof" className="border-y border-line-200 bg-paper-1/48">
      <Container className="grid md:grid-cols-3">
        {proofLedger.map((proof) => (
          <a
            key={proof.label}
            href={proof.href}
            target="_blank"
            rel="noreferrer"
            className="group py-7 md:px-7 md:first:pl-0 md:last:pr-0 md:not-last:border-r md:not-last:border-line-200"
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
