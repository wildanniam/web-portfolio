import type { ReactNode } from "react";

export function ContactBackdropWord({ children }: { children: ReactNode }) {
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
      {children}
    </section>
  );
}
