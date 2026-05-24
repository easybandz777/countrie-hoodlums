import { Resend } from "resend";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key || key === "re_placeholder") {
    // Return instance with a dummy key for build time — won't actually send
    return new Resend("re_build_placeholder_key");
  }
  return new Resend(key);
}

const resend = getResend();

const FROM_ADDRESS = "Hoodlums Country Club <noreply@thehoodlumscountryclub.com>";

type EmailResult = { success: true } | { success: false; error: string };

export async function sendWelcomeEmail(email: string): Promise<EmailResult> {
  try {
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: email,
      subject: "Welcome to the Hoodlums Country Club fam!",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="text-align: center;">Welcome to Hoodlums Country Club</h1>
          <p>You're officially part of the family now.</p>
          <p>Get ready for exclusive drops, early access to new gear, and updates straight from the crew.</p>
          <p>Stay tuned &mdash; big things are coming.</p>
          <p style="margin-top: 2rem;">&mdash; Hoodlums Country Club Team</p>
        </div>
      `,
    });
    return { success: true };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error sending welcome email";
    return { success: false, error: message };
  }
}

export async function sendOrderConfirmation(
  email: string,
  orderDetails: any
): Promise<EmailResult> {
  try {
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: email,
      subject: `Order Confirmed - #${orderDetails.orderNumber ?? "N/A"}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1>Order Confirmed</h1>
          <p>Thanks for your order! We're getting it ready for you.</p>
          <p><strong>Order Number:</strong> ${orderDetails.orderNumber ?? "N/A"}</p>
          <p><strong>Total:</strong> $${orderDetails.total ?? "0.00"}</p>
          <p>We'll send you a shipping notification once your order is on the way.</p>
          <p style="margin-top: 2rem;">&mdash; Hoodlums Country Club Team</p>
        </div>
      `,
    });
    return { success: true };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error sending order confirmation";
    return { success: false, error: message };
  }
}

export async function sendShippingNotification(
  email: string,
  trackingNumber: string
): Promise<EmailResult> {
  try {
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: email,
      subject: "Your order is on the way!",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1>Your Order Has Shipped</h1>
          <p>Great news &mdash; your gear is on the way!</p>
          <p><strong>Tracking Number:</strong> ${trackingNumber}</p>
          <p>You can track your package using the number above with your carrier.</p>
          <p style="margin-top: 2rem;">&mdash; Hoodlums Country Club Team</p>
        </div>
      `,
    });
    return { success: true };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unknown error sending shipping notification";
    return { success: false, error: message };
  }
}

export { resend };
