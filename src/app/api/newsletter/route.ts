import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendWelcomeEmail } from "@/lib/email";

const subscribeSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

// Simple in-memory duplicate check (resets on server restart).
// Replace with a database lookup once persistent storage is wired up.
const subscribedEmails = new Set<string>();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const parsed = subscribeSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email } = parsed.data;
    const normalizedEmail = email.toLowerCase().trim();

    // Rate limit / duplicate guard
    if (subscribedEmails.has(normalizedEmail)) {
      return NextResponse.json(
        { success: false, message: "This email is already subscribed." },
        { status: 409 }
      );
    }

    // Persist in memory (placeholder until DB/audience integration)
    subscribedEmails.add(normalizedEmail);

    // TODO: Add to Resend audience or ConvertKit list here
    console.log(`[Newsletter] New subscriber: ${normalizedEmail}`);

    // Send welcome email
    const emailResult = await sendWelcomeEmail(normalizedEmail);
    if (!emailResult.success) {
      console.error(
        `[Newsletter] Welcome email failed for ${normalizedEmail}:`,
        emailResult.error
      );
      // Still count the signup as successful even if the email fails to send
    }

    return NextResponse.json(
      { success: true, message: "You're in! Watch your inbox." },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Newsletter] Unexpected error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
