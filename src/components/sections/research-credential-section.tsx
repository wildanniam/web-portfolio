import QRCode from "qrcode";

import { ResearchCredential } from "@/components/credential/research-credential";
import { Container } from "@/components/ui/container";
import { siteContent } from "@/content/site";
import { getSiteUrl } from "@/lib/seo/site-url";

export async function ResearchCredentialSection() {
  const aboutUrl = new URL("/about", getSiteUrl()).toString();
  const aboutQrDataUrl = await QRCode.toDataURL(aboutUrl, {
    errorCorrectionLevel: "M",
    margin: 1,
    width: 216,
    color: {
      dark: "#1A1714FF",
      light: "#F5F0E8FF",
    },
  });

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
          <ResearchCredential aboutQrDataUrl={aboutQrDataUrl} />
        </div>
      </Container>
    </section>
  );
}
