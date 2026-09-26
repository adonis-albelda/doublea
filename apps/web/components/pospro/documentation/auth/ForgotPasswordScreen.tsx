import { ManualScreenDocs } from "../common/ManualScreenDocs";

import { AUTH_SCREENS, FORGOT_PASSWORD_SCREEN } from "@/lib/pospro/auth-data";

export function ForgotPasswordScreenDocs() {
  return <ManualScreenDocs doc={FORGOT_PASSWORD_SCREEN} screens={AUTH_SCREENS} eyebrow="Mobile · Authentication" />;
}
