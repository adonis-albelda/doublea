// Data for the POSPro One mobile-app authentication manual
// (/pospro/manual/mobile/authentication/**). Screen doc components read
// from these objects instead of hardcoding copy, so updating a flow means
// editing data here, not the JSX.
//
// Screenshots live next to their page (app/.../<screen>/images/), not in
// public/ — imported here as static assets so Next optimizes them and the
// image lives beside the route it documents.
import type { StaticImageData } from "next/image";

import registerImage from "../../app/pospro/manual/mobile/authentication/register/screenshots/register.webp";
import verifyEmailImage from "../../app/pospro/manual/mobile/authentication/verify-email/images/verify-email.webp";
import verifyEmailScreenshotImage from "../../app/pospro/manual/mobile/authentication/verify-email/screenshots/verify-email.webp";
import signInImage from "../../app/pospro/manual/mobile/authentication/sign-in/screenshots/sign-in.webp";
import forgotPasswordImage from "../../app/pospro/manual/mobile/authentication/forgot-password/screenshots/forgot-password.webp";
import forgotPasswordEmailImage from "../../app/pospro/manual/mobile/authentication/forgot-password/images/forgot-password-email.webp";
import verifyPinImage from "../../app/pospro/manual/mobile/authentication/verify-pin/screenshots/verify-pin.webp";
import changePasswordImage from "../../app/pospro/manual/mobile/authentication/change-password/screenshots/change-password.webp";

export type ScreenComponentSpec = {
  name: string;
  type: string;
  placeholder?: string;
  validation?: Record<string, boolean | string | number>;
  requirements?: string[];
  showStrengthIndicator?: boolean;
  errorMessages?: string[];
  notes?: string;
};

export type ScreenLayout = {
  ascii: string;
  dimensions: { width: number; height: number };
  notes: string;
};

export type UserInteractionStep = {
  step: number;
  title: string;
  actions: string[];
  expected: string;
};

export type ScreenshotDevice = "phone" | "tablet";

export type ScreenshotSpec = {
  id: string;
  title: string;
  // Real capture per device. Both optional — ScreenshotPlaceholder falls
  // back to a wireframe for any device without a capture yet (no tablet
  // captures exist, and Backoffice screens are still awaiting phone ones).
  paths: { phone?: StaticImageData; tablet?: StaticImageData };
};

// A screenshot of the email a step sends, not an app screen — rendered
// directly in the doc's main column ("what happens next"), not in the
// phone/tablet screenshots rail.
export type EmailPreview = {
  title: string;
  path: StaticImageData;
};

export type ValidationRule = {
  field: string;
  clientSide: string[];
  serverSide: string[];
  errors: string[];
};

export type SecurityConsideration = {
  category: string;
  items: string[];
};

export type TestingScenario = {
  name: string;
  steps: string[];
  expected: string;
};

export type AuthScreenDoc = {
  id: string;
  title: string;
  description: string;
  previousScreen?: string;
  nextScreen?: string;
  overview: {
    purpose: string;
    userFlow: string[];
    nextScreen?: string;
  };
  components: ScreenComponentSpec[];
  screenshots: ScreenshotSpec[];
  emailPreview?: EmailPreview;
  // Rendered nowhere currently (screen docs show Overview, Components,
  // Screenshots, Email Preview only) — optional so new screens don't need to
  // fabricate content just to satisfy the type. Left populated on existing
  // screens in case these sections come back.
  validationRules?: ValidationRule[];
  layout?: ScreenLayout;
  userInteractions?: UserInteractionStep[];
  security?: SecurityConsideration[];
  testingScenarios?: TestingScenario[];
  implementationChecklist?: string[];
};

export const REGISTER_SCREEN: AuthScreenDoc = {
  id: "register",
  title: "Register New Account",
  description: "Business owner creates a new POSPro One account from the mobile app.",
  nextScreen: "verify-email",

  overview: {
    purpose:
      "Let a new business owner create a POSPro One account and default business/location from the mobile app, without needing the web dashboard first.",
    userFlow: [
      "User opens app, taps \"Create Account\" on the welcome screen",
      "Enters email, password, and business name",
      "Accepts Terms of Service & Privacy Policy",
      "Submits form; account and default business are created server-side",
      "App navigates to Verify Email",
    ],
    nextScreen: "Account Verification",
  },

  components: [
    {
      name: "Email Address",
      type: "text-input",
      placeholder: "Enter your company or personal email",
      validation: { required: true, format: "email", unique: true },
      errorMessages: ["Please enter a valid email", "This email is already registered"],
    },
    {
      name: "Password",
      type: "password-input",
      placeholder: "Create a password",
      requirements: [
        "Minimum 8 characters",
        "At least 1 uppercase letter",
        "At least 1 number",
        "At least 1 special character",
      ],
      showStrengthIndicator: true,
    },
    {
      name: "Business Name",
      type: "text-input",
      placeholder: "Enter your business name",
      validation: { required: true, minLength: 2, maxLength: 120 },
      errorMessages: ["Business name is required"],
    },
    {
      name: "Terms Checkbox",
      type: "checkbox",
      validation: { required: true },
      errorMessages: ["You must accept the Terms of Service to continue"],
      notes: "Links open the POSPro One Terms of Service and Privacy Policy in-app.",
    },
    {
      name: "Create Account Button",
      type: "primary-button",
      notes: "Disabled until all fields are valid; shows a loading spinner while the request is in flight.",
    },
  ],

  layout: {
    ascii: `┌─────────────────────────────┐
│  < Create Account            │
├─────────────────────────────┤
│  Email Address                 │
│  [_______________________]    │
│                                │
│  Password                      │
│  [_______________________] ◎  │
│  Strength: ███░░░░░░ Fair      │
│                                │
│  Business Name                │
│  [_______________________]    │
│                                │
│  [ ] I agree to the Terms      │
│      of Service & Privacy      │
│                                │
│  [     Create Account     ]    │
│                                │
│  Already have an account?      │
│  Sign In                       │
└─────────────────────────────┘`,
    dimensions: { width: 375, height: 812 },
    notes: "Mobile-first, touch-friendly sizing (44pt minimum). Form scrolls under a fixed header when keyboard is open.",
  },

  userInteractions: [
    {
      step: 1,
      title: "Open Registration Screen",
      actions: ["User launches app", "Taps \"Create Account\" on the welcome screen"],
      expected: "Registration form appears with all fields empty",
    },
    {
      step: 2,
      title: "Enter Email",
      actions: ["User taps email field, types company or personal email address"],
      expected: "Real-time validation runs on blur; email uniqueness checked against the server",
    },
    {
      step: 3,
      title: "Create Password",
      actions: ["User types password", "Strength indicator updates live"],
      expected: "Create Account button stays disabled until the password meets all requirements",
    },
    {
      step: 4,
      title: "Enter Business Name",
      actions: ["User types the business name this account will operate under"],
      expected: "Real-time validation runs on blur",
    },
    {
      step: 5,
      title: "Accept Terms & Submit",
      actions: ["User checks the Terms checkbox", "Taps Create Account"],
      expected: "Loading state shows; on success, account is created and app navigates to Account Verification",
    },
  ],

  screenshots: [
    {
      id: "register",
      title: "Register Your Business",
      paths: { phone: registerImage },
    },
  ],

  validationRules: [
    {
      field: "Business Name",
      clientSide: ["Required", "2-120 characters"],
      serverSide: ["Trimmed and stored as the default business's display name"],
      errors: ["Business name is required"],
    },
    {
      field: "Email",
      clientSide: ["Required", "Valid email format", "Real-time validation"],
      serverSide: ["Unique across all POSPro One accounts", "Normalized to lowercase before storage"],
      errors: ["Please enter a valid email", "This email is already registered"],
    },
    {
      field: "Password",
      clientSide: ["Minimum 8 characters", "1 uppercase, 1 number, 1 special character"],
      serverSide: ["Re-validated against the same policy", "Hashed before storage, never logged"],
      errors: ["Password does not meet requirements"],
    },
  ],

  security: [
    {
      category: "Password Security",
      items: ["Password sent over HTTPS only", "Password never logged server-side", "Password hashed (bcrypt/argon2) before storage"],
    },
    {
      category: "Account Creation",
      items: ["Email uniqueness enforced server-side, not just client-side", "New account starts unverified until OTP is confirmed", "Rate-limited to prevent bulk account creation"],
    },
  ],

  testingScenarios: [
    {
      name: "Valid Registration",
      steps: ["Email: newuser@example.com", "Password: SecurePass123!", "Business Name: Ferretería Dela Cruz"],
      expected: "Account created, navigates to Verify Email screen",
    },
    {
      name: "Duplicate Email",
      steps: ["Email: existing@example.com"],
      expected: "Error \"This email is already registered\" shown inline, form not submitted",
    },
    {
      name: "Weak Password",
      steps: ["Password: abc123"],
      expected: "Create Account stays disabled; requirements checklist shows unmet items in red",
    },
    {
      name: "Terms Not Accepted",
      steps: ["Fill all fields correctly", "Leave Terms checkbox unchecked", "Tap Create Account"],
      expected: "Submission blocked with \"You must accept the Terms of Service to continue\"",
    },
  ],

  implementationChecklist: [
    "Business name input field with validation",
    "Email input field with validation + uniqueness check",
    "Password input with visibility toggle",
    "Password strength indicator + requirements checklist",
    "Confirm password field with match check",
    "Terms checkbox linking to Terms/Privacy",
    "Submit button disabled/loading/enabled states",
    "Inline error message display per field",
    "Navigation to Verify Email on success",
  ],
};

export const VERIFY_EMAIL_SCREEN: AuthScreenDoc = {
  id: "verify-email",
  title: "Account Verification",
  description:
    "User confirms their email by tapping a link in the welcome email — the same email also contains the PIN used to unlock the POS.",
  previousScreen: "register",
  nextScreen: "sign-in",

  overview: {
    purpose:
      "Confirm the user owns the email they registered with, and hand them the PIN they'll use to unlock the POS terminal — there is no code to type in the app for this step.",
    userFlow: [
      "App shows a \"check your email\" notice right after registration",
      "User opens their inbox and taps \"Verify Email Address\" in the welcome email",
      "Tapping the link activates the account server-side",
      "The same email shows the user's POS PIN (e.g. \"Your PIN to sign in on the POS: 581723\")",
      "User reopens the POSPro One app, which signs them in automatically and continues to setup",
    ],
    nextScreen: "Sign-In",
  },

  components: [
    {
      name: "Check Your Email Notice",
      type: "info-banner",
      notes: "\"Check your email to verify your account\" + the address it was sent to + a reminder that the same email has the admin's POS PIN. No form field here — verification happens by tapping the link in the email, not by typing a code.",
    },
    {
      name: "Waiting for Verification Status",
      type: "info-banner",
      notes: "\"Waiting for verification — stay on this screen.\" App polls/listens for the account to flip to verified and auto-advances once it does.",
    },
    {
      name: "Resend Verification Email Link",
      type: "text-link",
      notes: "Re-sends the welcome/verification email if the user didn't receive it.",
    },
    {
      name: "Back to Sign In Link",
      type: "text-link",
      notes: "Lets the user leave this screen and sign in later once they've verified from their email.",
    },
  ],

  screenshots: [
    {
      id: "check-your-email",
      title: "Check Your Email",
      paths: { phone: verifyEmailScreenshotImage },
    },
  ],

  emailPreview: {
    title: "Welcome Email — Verify Link & POS PIN",
    path: verifyEmailImage,
  },

  validationRules: [
    {
      field: "Verification Link",
      clientSide: ["N/A — the user acts on this in their email client, not in the app"],
      serverSide: ["Single-use", "Expires after a fixed window", "Activates the account when followed"],
      errors: ["This verification link is invalid or has expired"],
    },
  ],
};

export const SIGN_IN_SCREEN: AuthScreenDoc = {
  id: "sign-in",
  title: "Sign-In",
  description: "Returning user logs into an existing, verified POSPro One account.",
  previousScreen: "verify-email",
  nextScreen: "forgot-password",

  overview: {
    purpose: "Authenticate a returning user and load their business/location context into the app.",
    userFlow: [
      "User opens app, lands on Sign-In (or taps Sign In from Register)",
      "Enters email and password",
      "Taps Sign In",
      "On success, app loads the user's business/location and lands on the home screen",
    ],
    nextScreen: "App Home / Dashboard",
  },

  components: [
    {
      name: "Email/Username",
      type: "text-input",
      placeholder: "admin@yourshop.com",
      validation: { required: true, format: "email" },
      errorMessages: ["Please enter a valid email"],
    },
    {
      name: "Password",
      type: "password-input",
      placeholder: "Enter your password",
      validation: { required: true },
      errorMessages: ["Password is required"],
    },
    {
      name: "Sign In Button",
      type: "primary-button",
      notes: "Disabled until both fields are non-empty; shows loading spinner during authentication.",
    },
    {
      name: "Forgot Password Link",
      type: "text-link",
      notes: "Navigates to Forgot Password, pre-filling the email if already entered.",
    },
    {
      name: "New to POSPro One? Link",
      type: "text-link",
      notes: "Navigates to Register for users without an account yet.",
    },
  ],

  layout: {
    ascii: `┌─────────────────────────────┐
│         POSPro One logo           │
├─────────────────────────────┤
│  Email Address                 │
│  [_______________________]    │
│                                │
│  Password                      │
│  [_______________________] ◎  │
│                                │
│  Forgot password?               │
│                                │
│  [        Sign In         ]    │
│                                │
│  Don't have an account?        │
│  Create Account                │
└─────────────────────────────┘`,
    dimensions: { width: 375, height: 812 },
    notes: "Centered logo and form; no back button (this is an entry screen).",
  },

  userInteractions: [
    {
      step: 1,
      title: "Open Sign-In",
      actions: ["User launches app with no active session, or taps \"Sign In\" from Register"],
      expected: "Sign-In form appears with empty fields",
    },
    {
      step: 2,
      title: "Enter Credentials",
      actions: ["User types email", "User types password"],
      expected: "Sign In button enables once both fields are filled",
    },
    {
      step: 3,
      title: "Submit",
      actions: ["User taps Sign In"],
      expected: "Loading state shows; on success, app loads business context and navigates to home",
    },
    {
      step: 4,
      title: "Handle Invalid Credentials",
      actions: ["User submits wrong email/password combination"],
      expected: "Inline error shown without revealing which field was wrong",
    },
  ],

  screenshots: [
    {
      id: "sign-in",
      title: "Terminal Setup Sign-In",
      paths: { phone: signInImage },
    },
  ],

  validationRules: [
    {
      field: "Email",
      clientSide: ["Required", "Valid email format"],
      serverSide: ["Looked up case-insensitively"],
      errors: ["Please enter a valid email"],
    },
    {
      field: "Password",
      clientSide: ["Required, no format check client-side"],
      serverSide: ["Compared against stored hash", "Failed attempts rate-limited"],
      errors: ["Incorrect email or password"],
    },
  ],

  security: [
    {
      category: "Credential Handling",
      items: [
        "Credentials sent over HTTPS only",
        "Generic \"incorrect email or password\" error — never reveals which field is wrong",
        "Failed login attempts rate-limited / backed off per account and per device",
      ],
    },
    {
      category: "Session",
      items: [
        "Auth token stored in secure, encrypted device storage (not plain AsyncStorage)",
        "Token scoped to the user's business/location context",
        "Session invalidated server-side on password reset",
      ],
    },
  ],

  testingScenarios: [
    {
      name: "Valid Login",
      steps: ["Email: user@example.com", "Password: correct password"],
      expected: "Signs in, navigates to home with correct business/location loaded",
    },
    {
      name: "Wrong Password",
      steps: ["Email: user@example.com", "Password: wrong password"],
      expected: "Generic \"Incorrect email or password\" error, password field cleared",
    },
    {
      name: "Unverified Account",
      steps: ["Email/password for an account that never completed Verify Email"],
      expected: "Blocked with a prompt to verify email; option to resend the code",
    },
  ],

  implementationChecklist: [
    "Email input field with validation",
    "Password input with visibility toggle",
    "Forgot password link",
    "Sign In button disabled/loading/enabled states",
    "Generic invalid-credentials error handling",
    "Unverified-account redirect to Verify Email",
    "Secure token storage on success",
    "Create Account link for new users",
  ],
};

export const FORGOT_PASSWORD_SCREEN: AuthScreenDoc = {
  id: "forgot-password",
  title: "Forgot Password",
  description: "Admin requests a password reset link for a POSPro One account.",
  previousScreen: "sign-in",
  nextScreen: "verify-pin",

  overview: {
    purpose: "Let an admin who can't remember their password start recovery without contacting support.",
    userFlow: [
      "User taps \"Forgot password?\" on Sign-In",
      "Enters their admin email address",
      "Taps Send Reset Link",
      "Opens the email and finds a 6-digit reset code (\"Your password reset code\")",
      "Enters that code on the Verify PIN screen",
    ],
    nextScreen: "Verify PIN",
  },

  components: [
    {
      name: "Admin Email Address",
      type: "text-input",
      placeholder: "admin@yourshop.com",
      validation: { required: true, format: "email" },
      errorMessages: ["Please enter a valid email"],
    },
    {
      name: "Send Reset Link Button",
      type: "primary-button",
      notes: "Shows a generic confirmation regardless of whether the email exists, to avoid leaking account existence.",
    },
  ],

  screenshots: [
    {
      id: "forgot-password",
      title: "Reset Password",
      paths: { phone: forgotPasswordImage },
    },
  ],

  emailPreview: {
    title: "Password Reset Code Email",
    path: forgotPasswordEmailImage,
  },

  validationRules: [
    {
      field: "Admin Email Address",
      clientSide: ["Required", "Valid email format"],
      serverSide: [
        "Restricted to admin accounts — matches the \"Password resets are for admin accounts only\" note on the screen",
        "Does not reveal whether the email is registered (generic response either way)",
      ],
      errors: ["Please enter a valid email"],
    },
  ],
};

export const VERIFY_PIN_SCREEN: AuthScreenDoc = {
  id: "verify-pin",
  title: "Verify PIN",
  description: "User confirms the reset request with the same 6-digit code screen used during account verification.",
  previousScreen: "forgot-password",
  nextScreen: "change-password",

  overview: {
    purpose: "Confirm the password-reset request is coming from the account owner before letting them set a new password.",
    userFlow: [
      "App opens on Verify PIN after the reset-link email is opened",
      "User enters the 6-digit code emailed for this reset request",
      "App verifies the code with the server",
      "On success, app navigates to Change Password",
    ],
    nextScreen: "Change Password",
  },

  components: [
    {
      name: "6-Digit Code",
      type: "otp-input",
      placeholder: "000000",
      validation: { required: true, length: 6, numeric: true },
      errorMessages: ["Enter the code sent to your email", "That code is incorrect or has expired"],
    },
    {
      name: "Verify Code Button",
      type: "primary-button",
      notes: "Disabled until 6 digits are entered; shows loading spinner during verification.",
    },
    {
      name: "Change Email Link",
      type: "text-link",
      notes: "Returns to Forgot Password with the entered email pre-filled.",
    },
    {
      name: "Resend Code Link",
      type: "text-link",
      notes: "Disabled with a countdown after a code is sent; re-enables once the countdown ends.",
    },
  ],

  screenshots: [
    {
      id: "verify-pin",
      title: "Check Your Email",
      paths: { phone: verifyPinImage },
    },
  ],

  validationRules: [
    {
      field: "6-Digit Code",
      clientSide: ["Required", "Exactly 6 numeric digits"],
      serverSide: [
        "Code must match the one issued for this reset request",
        "Code expires after a fixed window",
        "Limited verify attempts before requiring a resend",
      ],
      errors: ["Enter the code sent to your email", "That code is incorrect or has expired"],
    },
  ],
};

export const CHANGE_PASSWORD_SCREEN: AuthScreenDoc = {
  id: "change-password",
  title: "Change Password",
  description: "User sets a new password after the reset request is verified.",
  previousScreen: "verify-pin",

  overview: {
    purpose: "Let the user finish password recovery by choosing a new password for their account.",
    userFlow: [
      "App navigates here after Verify PIN succeeds",
      "User enters and confirms a new password",
      "Taps Reset Password",
      "Password is updated server-side; all existing sessions are revoked",
      "User signs in again with the new password",
    ],
    nextScreen: "Sign-In",
  },

  components: [
    {
      name: "New Password",
      type: "password-input",
      placeholder: "At least 8 characters",
      requirements: [
        "Minimum 8 characters",
        "At least 1 uppercase letter",
        "At least 1 number",
        "At least 1 special character",
      ],
      showStrengthIndicator: true,
    },
    {
      name: "Confirm Password",
      type: "password-input",
      placeholder: "Type it again",
      validation: { required: true, matchesPassword: true },
      errorMessages: ["Passwords do not match"],
    },
    {
      name: "Reset Password Button",
      type: "primary-button",
      notes: "Disabled until both fields are valid and match; shows a loading spinner while the request is in flight.",
    },
  ],

  screenshots: [
    {
      id: "change-password",
      title: "Create a New Password",
      paths: { phone: changePasswordImage },
    },
  ],

  validationRules: [
    {
      field: "New Password",
      clientSide: ["Minimum 8 characters", "1 uppercase, 1 number, 1 special character", "Confirm must match"],
      serverSide: ["Re-validated against the same policy", "Cannot equal the current password"],
      errors: [
        "Password does not meet requirements",
        "Passwords do not match",
        "New password must be different from your current password",
      ],
    },
  ],
};

export type ManualScreenLink = {
  id: string;
  href: string;
  title: string;
  description: string;
};

export const AUTH_SCREENS: ManualScreenLink[] = [
  {
    id: REGISTER_SCREEN.id,
    href: "/pospro/manual/mobile/authentication/register",
    title: REGISTER_SCREEN.title,
    description: REGISTER_SCREEN.description,
  },
  {
    id: VERIFY_EMAIL_SCREEN.id,
    href: "/pospro/manual/mobile/authentication/verify-email",
    title: VERIFY_EMAIL_SCREEN.title,
    description: VERIFY_EMAIL_SCREEN.description,
  },
  {
    id: SIGN_IN_SCREEN.id,
    href: "/pospro/manual/mobile/authentication/sign-in",
    title: SIGN_IN_SCREEN.title,
    description: SIGN_IN_SCREEN.description,
  },
  {
    id: FORGOT_PASSWORD_SCREEN.id,
    href: "/pospro/manual/mobile/authentication/forgot-password",
    title: FORGOT_PASSWORD_SCREEN.title,
    description: FORGOT_PASSWORD_SCREEN.description,
  },
  {
    id: VERIFY_PIN_SCREEN.id,
    href: "/pospro/manual/mobile/authentication/verify-pin",
    title: VERIFY_PIN_SCREEN.title,
    description: VERIFY_PIN_SCREEN.description,
  },
  {
    id: CHANGE_PASSWORD_SCREEN.id,
    href: "/pospro/manual/mobile/authentication/change-password",
    title: CHANGE_PASSWORD_SCREEN.title,
    description: CHANGE_PASSWORD_SCREEN.description,
  },
];

export function getScreenHref(id?: string, screens: ManualScreenLink[] = AUTH_SCREENS): string | undefined {
  return screens.find((screen) => screen.id === id)?.href;
}
