import { ResearchCredential } from "@/components/credential/research-credential";
import { Container } from "@/components/ui/container";
import { siteContent } from "@/content/site";

export function ResearchCredentialSection() {
  return (
    <section
      id="about"
      aria-labelledby="builder-pass-title"
      className="builder-pass-section credential-section scroll-mt-24"
    >
      <Container className="builder-pass-section__layout credential-section__layout">
        <div className="builder-pass-section__copy credential-section__copy">
          <p className="builder-pass-section__eyebrow">BUILDER PASS / ABOUT</p>
          <h2 id="builder-pass-title">{siteContent.credential.title}</h2>
          <p className="builder-pass-section__intro">{siteContent.about.home}</p>
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

        <div
          data-credential-stage
          className="builder-pass-section__object credential-section__object"
        >
          <ResearchCredential instagramQrSrc="/instagram-qr" />
        </div>
      </Container>
    </section>
  );
}
