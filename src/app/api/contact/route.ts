import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/validations";
import { apiError } from "@/lib/api-error";
import { rateLimit } from "@/lib/rate-limit";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const { success, remaining } = await rateLimit(ip);
  if (!success) {
    return apiError(
      "Too many requests. Please try again later.",
      "RATE_LIMIT_EXCEEDED",
      429,
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError("Invalid JSON body", "INVALID_JSON", 400);
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return apiError(
      parsed.error.issues[0]?.message || "Validation failed",
      "VALIDATION_ERROR",
      400,
    );
  }

  const { name, email, company, message } = parsed.data;

  if (resend && process.env.CONTACT_EMAIL_TO) {
    try {
      await resend.emails.send({
        from: process.env.CONTACT_EMAIL_FROM || "onboarding@resend.dev",
        to: process.env.CONTACT_EMAIL_TO || "ar.hayat7@gmail.com",
        subject: `NexaForge Contact: ${name} from ${company}`,
        text: `Name: ${name}\nEmail: ${email}\nCompany: ${company}\n\n${message}`,
      });
    } catch {
      return apiError("Failed to send email", "EMAIL_SEND_FAILED", 500);
    }
  }

  return NextResponse.json(
    { success: true, remaining },
    {
      status: 200,
      headers: {
        "X-RateLimit-Remaining": String(remaining),
      },
    },
  );
}
