import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <main id="main-content" className="grid min-h-[70dvh] place-items-center py-20">
      <Container className="text-center">
        <p className="font-mono text-xs font-semibold text-ember-700">NOT FOUND</p>
        <h1 className="mt-5 font-display text-6xl font-[520] tracking-[-0.055em] sm:text-7xl">
          This evidence trail ends here.
        </h1>
        <p className="mx-auto mt-6 max-w-[34rem] text-lg leading-8 text-ink-600">
          The page may have moved, or the project record is not public.
        </p>
        <div className="mt-8">
          <ButtonLink href="/work">Explore My Work</ButtonLink>
        </div>
      </Container>
    </main>
  );
}
