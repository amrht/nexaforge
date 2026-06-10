import { NextRequest, NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validations";
import { apiError } from "@/lib/api-error";

const subscribedEmails = new Set<string>();

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return apiError("Invalid JSON body", "INVALID_JSON", 400);
  }

  const parsed = newsletterSchema.safeParse(body);

  if (!parsed.success) {
    return apiError(
      parsed.error.issues[0]?.message || "Validation failed",
      "VALIDATION_ERROR",
      400,
    );
  }

  const { email } = parsed.data;
  const apiKey = process.env.CONVERTKIT_API_KEY;

  if (apiKey) {
    try {
      const res = await fetch("https://api.kit.com/v4/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Kit-Api-Key": apiKey,
        },
        body: JSON.stringify({
          email_address: email,
          state: "active",
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));

        if (res.status === 422 || data?.errors?.some?.((e: { code?: string }) => e.code === "duplicate")) {
          return apiError("You're already subscribed", "DUPLICATE_EMAIL", 409);
        }

        return apiError(
          data?.message || "Subscription failed",
          "SUBSCRIBE_FAILED",
          res.status,
        );
      }
    } catch {
      return apiError(
        "Subscription service unavailable",
        "SERVICE_ERROR",
        503,
      );
    }
  } else {
    if (subscribedEmails.has(email)) {
      return apiError("You're already subscribed", "DUPLICATE_EMAIL", 409);
    }

    subscribedEmails.add(email);
  }

  return NextResponse.json({
    success: true,
    email,
  });
}
