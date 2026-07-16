import { LazyResearchCredential } from "@/components/credential/lazy-research-credential";
import { ResearchCredentialStatic } from "@/components/credential/research-credential-static";
import { Container } from "@/components/ui/container";
import { siteContent } from "@/content/site";

export function ResearchCredentialSection() {
  return (
    <section
      id="research-credential"
      data-credential-scene
      className="credential-section scroll-mt-24"
    >
      <div className="credential-signal" aria-hidden="true">
        <span data-credential-signal />
      </div>

      <Container className="credential-section__layout">
        <div className="credential-section__copy">
          <h2>{siteContent.credential.title}</h2>
          <p>{siteContent.credential.copy}</p>
          <dl>
            {siteContent.credential.details.map((detail) => (
              <div key={detail.term}>
                <dt>{detail.term}</dt>
                <dd>{detail.description}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div data-credential-gsap-stage className="credential-section__object">
          <span data-lanyard-anchor className="credential-anchor" aria-hidden="true" />
          <LazyResearchCredential
            aboutQrSrc="/about-qr"
            fallback={<ResearchCredentialStatic aboutQrSrc="/about-qr" />}
          />
        </div>
      </Container>
    </section>
  );
}
