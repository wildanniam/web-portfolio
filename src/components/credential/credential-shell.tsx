import Image from "next/image";

type CredentialFacesProps = {
  aboutQrSrc: string;
  isBackVisible: boolean;
};

export function CredentialLanyard() {
  return (
    <div className="credential-lanyard" aria-hidden="true">
      <div className="credential-lanyard__strap credential-lanyard__strap--left">
        <span>WILDAN / RESEARCH</span>
      </div>
      <div className="credential-lanyard__strap credential-lanyard__strap--right">
        <span>BUILD / VERIFY</span>
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
          <span>EMBER LAB / FIELD PASS</span>
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
            HUMAN CHECKPOINT
          </span>
        </div>

        <div className="credential-identity">
          <p>Wildan Syukri Niam</p>
          <strong>Researcher &amp; Builder</strong>
          <span>AI agents / Web3 trust / on-chain intelligence</span>
        </div>

        <div className="credential-face__footer">
          <span>PUBLIC PROFILE</span>
          <span>ISSUED 2026</span>
        </div>
      </div>

      <div className="credential-face credential-face--back" aria-hidden={!isBackVisible}>
        <div className="credential-back__header">
          <span>WORKING METHOD</span>
          <strong>Evidence before confidence.</strong>
        </div>

        <ol className="credential-method">
          <li>
            <span>01</span>
            <strong>Frame the risk</strong>
          </li>
          <li>
            <span>02</span>
            <strong>Build the mechanism</strong>
          </li>
          <li>
            <span>03</span>
            <strong>Expose the evidence</strong>
          </li>
          <li>
            <span>04</span>
            <strong>Test the boundary</strong>
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
            <span>FULL PROFILE</span>
            <strong>Scan to inspect the research trail.</strong>
          </div>
        </div>

        <p className="credential-boundary">
          Public claims stay scoped to inspectable artifacts, current status, and stated
          limitations.
        </p>
      </div>
    </>
  );
}
