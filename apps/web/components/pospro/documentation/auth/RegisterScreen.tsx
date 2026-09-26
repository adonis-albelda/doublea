import { ManualScreenDocs } from "../common/ManualScreenDocs";

import { AUTH_SCREENS, REGISTER_SCREEN } from "@/lib/pospro/auth-data";

export function RegisterScreenDocs() {
  return <ManualScreenDocs doc={REGISTER_SCREEN} screens={AUTH_SCREENS} eyebrow="Mobile · Authentication" />;
}
