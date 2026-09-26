import { ManualScreenDocs } from "../common/ManualScreenDocs";

import { AUTH_SCREENS, SIGN_IN_SCREEN } from "@/lib/pospro/auth-data";

export function SignInScreenDocs() {
  return <ManualScreenDocs doc={SIGN_IN_SCREEN} screens={AUTH_SCREENS} eyebrow="Mobile · Authentication" />;
}
