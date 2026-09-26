import { ManualScreenDocs } from "../common/ManualScreenDocs";

import { AUTH_SCREENS, VERIFY_PIN_SCREEN } from "@/lib/pospro/auth-data";

export function VerifyPinScreenDocs() {
  return <ManualScreenDocs doc={VERIFY_PIN_SCREEN} screens={AUTH_SCREENS} eyebrow="Mobile · Authentication" />;
}
