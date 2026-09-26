import { ManualScreenDocs } from "../common/ManualScreenDocs";

import { AUTH_SCREENS, VERIFY_EMAIL_SCREEN } from "@/lib/pospro/auth-data";

export function VerifyEmailScreenDocs() {
  return <ManualScreenDocs doc={VERIFY_EMAIL_SCREEN} screens={AUTH_SCREENS} eyebrow="Mobile · Authentication" />;
}
