import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <main id="main-content" className="grid min-h-[70dvh] place-items-center py-20">
      <Container className="text-center">
        <p className="font-mono text-xs font-semibold text-ember-700">NOT FOUND</p>
        <h1 className="mt-5 font-display text-6xl font-[520] tracking-[-0.055em] sm:text-7xl">
          Looks like this page went missing.
        </h1>
        <p className="mx-auto mt-6 max-w-[34rem] text-lg leading-8 text-ink-600">
          The page may have moved, or it may no longer be available.
        </p>
        <div className="mt-8">
          <ButtonLink href="/work">View projects</ButtonLink>
        </div>
      </Container>
    </main>
  );
}
