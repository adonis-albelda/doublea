// Data for the POSPro One Backoffice manual (/pospro/manual/backoffice/**).
// Same shape and conventions as auth-data.ts — screen docs read from these
// objects instead of hardcoding copy.
//
// Screenshots: none captured yet, so each screen lists its screenshot slots
// with empty `paths` and ScreenshotPlaceholder renders a wireframe. To add a
// capture, drop it in app/pospro/manual/backoffice/<screen>/screenshots/,
// import it here, and set `paths: { phone: <import> }` on the matching slot.
// Email/illustration images go in .../<screen>/images/ (see `emailPreview`).
import type { AuthScreenDoc, ManualScreenLink } from "./auth-data";

const BASE_HREF = "/pospro/manual/backoffice";

export const BACKOFFICE_LOGIN_SCREEN: AuthScreenDoc = {
  id: "login",
  title: "Login",
  description: "Admin signs in to the POSPro One Backoffice to manage their business.",
  nextScreen: "change-password",

  overview: {
    purpose:
      "Authenticate an admin into the Backoffice, where business settings, locations, and account security are managed.",
    userFlow: [
      "Admin opens the Backoffice",
      "Enters their admin email and password",
      "Taps Sign In",
      "On success, the Backoffice loads the admin's business and lands on the dashboard",
    ],
    nextScreen: "Backoffice Dashboard",
  },

  components: [
    {
      name: "Email Address",
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
      errorMessages: ["Password is required", "Incorrect email or password"],
    },
    {
      name: "Sign In Button",
      type: "primary-button",
      notes: "Disabled until both fields are filled; shows a loading spinner while signing in.",
    },
    {
      name: "Forgot Password Link",
      type: "text-link",
      notes: "Starts the password reset flow for admin accounts.",
    },
  ],

  screenshots: [{ id: "login", title: "Backoffice Login", paths: {} }],
};

export const BACKOFFICE_CHANGE_PASSWORD_SCREEN: AuthScreenDoc = {
  id: "change-password",
  title: "Change Password",
  description: "Signed-in admin changes their account password from the Backoffice.",
  previousScreen: "login",
  nextScreen: "session-locked",

  overview: {
    purpose: "Let an admin who knows their current password replace it with a new one.",
    userFlow: [
      "Admin opens Change Password from the Backoffice",
      "Enters their current password",
      "Enters and confirms a new password",
      "Taps Save; the password is updated and other sessions are signed out",
    ],
  },

  components: [
    {
      name: "Current Password",
      type: "password-input",
      placeholder: "Enter your current password",
      validation: { required: true },
      errorMessages: ["Current password is incorrect"],
    },
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
      name: "Confirm New Password",
      type: "password-input",
      placeholder: "Type it again",
      validation: { required: true, matchesPassword: true },
      errorMessages: ["Passwords do not match"],
    },
    {
      name: "Save Button",
      type: "primary-button",
      notes: "Disabled until all fields are valid and the new passwords match.",
    },
  ],

  screenshots: [{ id: "change-password", title: "Change Password", paths: {} }],
};

export const BACKOFFICE_SESSION_LOCKED_SCREEN: AuthScreenDoc = {
  id: "session-locked",
  title: "Session Locked",
  description: "Backoffice locks after inactivity; the admin re-enters their password to continue.",
  previousScreen: "change-password",
  nextScreen: "account-details",

  overview: {
    purpose:
      "Protect an unattended Backoffice session without losing the admin's place — unlocking returns them to the screen they were on.",
    userFlow: [
      "Backoffice is left idle past the inactivity timeout",
      "Screen locks and shows the signed-in admin's account",
      "Admin enters their password and taps Unlock",
      "Backoffice resumes on the screen the admin was on",
    ],
  },

  components: [
    {
      name: "Locked Account Card",
      type: "info-banner",
      notes: "Shows which admin account is locked so the right person unlocks it.",
    },
    {
      name: "Password",
      type: "password-input",
      placeholder: "Enter your password",
      validation: { required: true },
      errorMessages: ["Incorrect password"],
    },
    {
      name: "Unlock Button",
      type: "primary-button",
      notes: "Shows a loading spinner while verifying the password.",
    },
    {
      name: "Sign Out Link",
      type: "text-link",
      notes: "Ends the session and returns to Login — for when a different admin needs to sign in.",
    },
  ],

  screenshots: [{ id: "session-locked", title: "Session Locked", paths: {} }],
};

export const BACKOFFICE_ACCOUNT_DETAILS_SCREEN: AuthScreenDoc = {
  id: "account-details",
  title: "Account Details",
  description: "Admin views and updates their personal profile information.",
  previousScreen: "session-locked",
  nextScreen: "company-info",

  overview: {
    purpose: "Keep the admin's own profile — name, email, and contact details — up to date.",
    userFlow: [
      "Admin opens Account Details from the Backoffice menu",
      "Reviews their current profile information",
      "Edits the fields that need changing",
      "Taps Save to apply the changes",
    ],
  },

  components: [
    {
      name: "Full Name",
      type: "text-input",
      placeholder: "Enter your full name",
      validation: { required: true },
      errorMessages: ["Name is required"],
    },
    {
      name: "Email Address",
      type: "text-input",
      placeholder: "admin@yourshop.com",
      validation: { required: true, format: "email" },
      errorMessages: ["Please enter a valid email"],
    },
    {
      name: "Phone Number",
      type: "text-input",
      placeholder: "Enter your phone number",
    },
    {
      name: "Save Button",
      type: "primary-button",
      notes: "Enabled once a field has changed; shows a confirmation when saved.",
    },
  ],

  screenshots: [{ id: "account-details", title: "Account Details", paths: {} }],
};

export const BACKOFFICE_COMPANY_INFO_SCREEN: AuthScreenDoc = {
  id: "company-info",
  title: "Company Info",
  description: "Admin manages the company profile used across receipts and documents.",
  previousScreen: "account-details",
  nextScreen: "ai-usage",

  overview: {
    purpose:
      "Maintain the company's legal and contact details in one place so they appear consistently on receipts, invoices, and reports.",
    userFlow: [
      "Admin opens Company Info from the Backoffice menu",
      "Reviews the company's current details",
      "Updates name, address, tax details, or logo",
      "Taps Save to apply the changes",
    ],
  },

  components: [
    {
      name: "Company Name",
      type: "text-input",
      placeholder: "Enter your company name",
      validation: { required: true },
      errorMessages: ["Company name is required"],
    },
    {
      name: "Company Logo",
      type: "image-upload",
      notes: "Shown on receipts and documents.",
    },
    {
      name: "Address",
      type: "text-input",
      placeholder: "Enter your company address",
    },
    {
      name: "Tax Identification Number",
      type: "text-input",
      placeholder: "Enter your TIN",
    },
    {
      name: "Contact Email & Phone",
      type: "text-input",
    },
    {
      name: "Save Button",
      type: "primary-button",
    },
  ],

  screenshots: [{ id: "company-info", title: "Company Info", paths: {} }],
};

export const BACKOFFICE_AI_USAGE_SCREEN: AuthScreenDoc = {
  id: "ai-usage",
  title: "AI Usage",
  description: "Admin monitors how much of the account's AI allowance has been used.",
  previousScreen: "company-info",
  nextScreen: "security",

  overview: {
    purpose: "Give the admin visibility into AI feature usage against their plan's allowance.",
    userFlow: [
      "Admin opens AI Usage from the Backoffice menu",
      "Reviews usage for the current billing period",
      "Checks the breakdown by feature",
    ],
  },

  components: [
    {
      name: "Usage Summary",
      type: "stat-card",
      notes: "Amount used vs. the plan allowance for the current billing period.",
    },
    {
      name: "Usage Breakdown",
      type: "list",
      notes: "Usage grouped by AI feature.",
    },
    {
      name: "Billing Period",
      type: "info-banner",
      notes: "Shows when the current period started and when usage resets.",
    },
  ],

  screenshots: [{ id: "ai-usage", title: "AI Usage", paths: {} }],
};

export const BACKOFFICE_SECURITY_SCREEN: AuthScreenDoc = {
  id: "security",
  title: "Security",
  description: "Admin reviews account security settings and active sessions.",
  previousScreen: "ai-usage",
  nextScreen: "businesses",

  overview: {
    purpose: "Let the admin keep their account secure — manage sign-in settings and sign out devices they don't recognize.",
    userFlow: [
      "Admin opens Security from the Backoffice menu",
      "Reviews security settings and signed-in devices",
      "Signs out any device they don't recognize",
      "Opens Change Password if the password needs updating",
    ],
  },

  components: [
    {
      name: "Change Password Link",
      type: "text-link",
      notes: "Opens the Change Password screen.",
    },
    {
      name: "POS PIN",
      type: "setting-row",
      notes: "Manage the PIN used to unlock the POS terminal.",
    },
    {
      name: "Active Sessions",
      type: "list",
      notes: "Devices currently signed in to the account, with a Sign Out action on each.",
    },
  ],

  screenshots: [{ id: "security", title: "Security", paths: {} }],
};

export const BACKOFFICE_BUSINESSES_SCREEN: AuthScreenDoc = {
  id: "businesses",
  title: "Businesses",
  description: "Admin views and manages the businesses under their account.",
  previousScreen: "security",
  nextScreen: "locations",

  overview: {
    purpose: "Manage every business the admin operates from one POSPro One account.",
    userFlow: [
      "Admin opens Businesses from the Backoffice menu",
      "Reviews the list of businesses on the account",
      "Adds a new business or opens an existing one to edit it",
      "Saves the changes",
    ],
  },

  components: [
    {
      name: "Business List",
      type: "list",
      notes: "Each business the account owns, with its name and number of locations.",
    },
    {
      name: "Add Business Button",
      type: "primary-button",
      notes: "Opens the form to create a new business.",
    },
    {
      name: "Business Name",
      type: "text-input",
      placeholder: "Enter your business name",
      validation: { required: true, minLength: 2, maxLength: 120 },
      errorMessages: ["Business name is required"],
    },
  ],

  screenshots: [{ id: "businesses", title: "Businesses", paths: {} }],
};

export const BACKOFFICE_LOCATIONS_SCREEN: AuthScreenDoc = {
  id: "locations",
  title: "Locations",
  description: "Admin manages the store locations under each business.",
  previousScreen: "businesses",

  overview: {
    purpose: "Set up and maintain the physical locations where each business sells.",
    userFlow: [
      "Admin opens Locations from the Backoffice menu",
      "Selects the business to manage",
      "Adds a new location or opens an existing one to edit it",
      "Saves the changes",
    ],
  },

  components: [
    {
      name: "Business Selector",
      type: "dropdown",
      notes: "Filters the list to one business's locations.",
    },
    {
      name: "Location List",
      type: "list",
      notes: "Each location with its name and address.",
    },
    {
      name: "Add Location Button",
      type: "primary-button",
      notes: "Opens the form to create a new location.",
    },
    {
      name: "Location Name",
      type: "text-input",
      placeholder: "Enter the location name",
      validation: { required: true },
      errorMessages: ["Location name is required"],
    },
    {
      name: "Address",
      type: "text-input",
      placeholder: "Enter the location address",
    },
  ],

  screenshots: [{ id: "locations", title: "Locations", paths: {} }],
};

// Sidebar/index order — also the prev/next reading order.
export const BACKOFFICE_SCREEN_DOCS: AuthScreenDoc[] = [
  BACKOFFICE_LOGIN_SCREEN,
  BACKOFFICE_CHANGE_PASSWORD_SCREEN,
  BACKOFFICE_SESSION_LOCKED_SCREEN,
  BACKOFFICE_ACCOUNT_DETAILS_SCREEN,
  BACKOFFICE_COMPANY_INFO_SCREEN,
  BACKOFFICE_AI_USAGE_SCREEN,
  BACKOFFICE_SECURITY_SCREEN,
  BACKOFFICE_BUSINESSES_SCREEN,
  BACKOFFICE_LOCATIONS_SCREEN,
];

export const BACKOFFICE_INDEX_HREF = BASE_HREF;

export const BACKOFFICE_SCREENS: ManualScreenLink[] = BACKOFFICE_SCREEN_DOCS.map((doc) => ({
  id: doc.id,
  href: `${BASE_HREF}/${doc.id}`,
  title: doc.title,
  description: doc.description,
}));
