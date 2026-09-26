import { ManualScreenDocs } from "../common/ManualScreenDocs";

import { AUTH_SCREENS, CHANGE_PASSWORD_SCREEN } from "@/lib/pospro/auth-data";

export function ChangePasswordScreenDocs() {
  return <ManualScreenDocs doc={CHANGE_PASSWORD_SCREEN} screens={AUTH_SCREENS} eyebrow="Mobile · Authentication" />;
}
