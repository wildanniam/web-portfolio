import Image from "next/image";

type CredentialFacesProps = {
  aboutQrSrc: string;
  isBackVisible: boolean;
};

export function CredentialLanyard() {
  return (
    <div className="credential-lanyard" aria-hidden="true">
      <div className="credential-lanyard__strap">
        <span>WILDAN / FULL-STACK BUILDER</span>
      </div>
      <div className="credential-lanyard__keeper" />
      <div className="credential-lanyard__clasp">
        <span />
      </div>
    </div>
  );
}

export function CredentialFaces({ aboutQrSrc, isBackVisible }: CredentialFacesProps) {
  return (
    <>
      <div className="credential-face credential-face--front" aria-hidden={isBackVisible}>
        <div className="credential-face__topline">
          <span>WN / BUILDER PASS</span>
          <span>WN—01</span>
        </div>

        <div className="credential-portrait">
          <Image
            src="/media/profile/wildan-credential.jpg"
            alt="Wildan Syukri Niam at a technology event, wearing a maroon blazer."
            fill
            sizes="(min-width: 768px) 22rem, 78vw"
            className="object-cover"
            priority={false}
          />
          <span className="credential-portrait__index" aria-hidden="true">
            AI / WEB3 / PRODUCT
          </span>
        </div>

        <div className="credential-identity">
          <p>Wildan Syukri Niam</p>
          <strong>Full-Stack Builder</strong>
          <span>AI / Web3 / Product Engineering</span>
        </div>

        <div className="credential-face__footer">
          <span>PUBLIC PROFILE</span>
          <span>ISSUED 2026</span>
        </div>
      </div>

      <div className="credential-face credential-face--back" aria-hidden={!isBackVisible}>
        <div className="credential-back__header">
          <span>HOW I WORK</span>
          <strong>From idea to product.</strong>
        </div>

        <ol className="credential-method">
          <li>
            <span>01</span>
            <strong>Understand the problem</strong>
          </li>
          <li>
            <span>02</span>
            <strong>Shape the product</strong>
          </li>
          <li>
            <span>03</span>
            <strong>Build the core</strong>
          </li>
          <li>
            <span>04</span>
            <strong>Test and improve</strong>
          </li>
        </ol>

        <div className="credential-qr-row">
          <div className="credential-qr">
            {/* The static QR route encodes this deployment's absolute /about URL. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={aboutQrSrc}
              alt="QR code linking to Wildan's about page."
              loading="lazy"
            />
          </div>
          <div>
            <span>MORE ABOUT ME</span>
            <strong>Scan to learn more about me.</strong>
          </div>
        </div>

      </div>
    </>
  );
}
