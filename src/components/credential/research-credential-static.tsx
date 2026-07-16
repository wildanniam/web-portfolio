import Link from "next/link";

import {
  CredentialFaces,
  CredentialLanyard,
} from "@/components/credential/credential-shell";

export function ResearchCredentialStatic({ aboutQrSrc }: { aboutQrSrc: string }) {
  return (
    <div className="credential-rig" aria-label="Research credential">
      <div className="credential-swing">
        <CredentialLanyard />
        <div className="credential-tilt">
          <div
            data-testid="research-credential-fallback"
            data-face="front"
            className="credential-card credential-card--static"
          >
            <CredentialFaces aboutQrSrc={aboutQrSrc} isBackVisible={false} />
          </div>
        </div>
      </div>

      <div className="credential-controls">
        <Link href="/about">Open full profile</Link>
      </div>
    </div>
  );
}
