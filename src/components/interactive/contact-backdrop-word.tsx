import { Container } from "@/components/ui/container";
import { siteContent } from "@/content/site";

export function ContactBackdropWord() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="contact-stage"
    >
      <div className="contact-stage__word-frame" aria-hidden="true">
        <div className="contact-stage__word-motion">
          <span className="contact-stage__word">CONTACT</span>
        </div>
      </div>
      <Container className="contact-stage__container">
        <div className="contact-stage__panel">
          <p className="contact-stage__eyebrow">START A CONVERSATION</p>
          <div className="contact-stage__panel-grid">
            <h2 id="contact-title">{siteContent.contact.title}</h2>
            <div className="contact-stage__invitation">
              <p>{siteContent.contact.copy}</p>
              <a
                href={`mailto:${siteContent.contact.email}`}
                className="contact-stage__email"
              >
                <span>{siteContent.contact.email}</span>
                <span aria-hidden="true">↗</span>
              </a>
              <div className="contact-stage__links">
                <a href={siteContent.contact.github} target="_blank" rel="noreferrer">
                  GitHub ↗
                </a>
                <a href={siteContent.contact.instagram} target="_blank" rel="noreferrer">
                  Instagram ↗
                </a>
                <span>{siteContent.contact.location}</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
