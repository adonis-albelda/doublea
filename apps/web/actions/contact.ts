"use server";

export interface ContactFormState {
  success: boolean;
  errors: {
    name?: string;
    email?: string;
    message?: string;
  };
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendContactMessage(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  const errors: ContactFormState["errors"] = {};

  if (!name) {
    errors.name = "Enter your name so we know who's reaching out.";
  }
  if (!email) {
    errors.email = "Enter your email so we can reply.";
  } else if (!EMAIL_RE.test(email)) {
    errors.email = "That email looks incomplete — check for a typo, like name@company.com.";
  }
  if (!message || message.length < 10) {
    errors.message = "Add a sentence or two about what you're building — at least 10 characters.";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  // TODO: set RESEND_API_KEY in the environment and swap this for a real
  // call, e.g.:
  //   const resend = new Resend(process.env.RESEND_API_KEY);
  //   await resend.emails.send({
  //     from: "Double A Digital Solutions <hello@doubleadigital.com>",
  //     to: "hello@doubleadigital.com",
  //     subject: `New project inquiry from ${name}`,
  //     text: `${name} <${email}>\n\n${message}`,
  //   });
  console.log("Contact form submission:", { name, email, message });

  return { success: true, errors: {} };
}
