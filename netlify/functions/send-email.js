import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function handler(event) {
  try {
    const { subject, message } = JSON.parse(event.body || "{}");

    if (!message) {
      return {
        statusCode: 400,
        body: "Message manquant"
      };
    }

    const data = await resend.emails.send({
      from: "MasterTripTransfers <onboarding@resend.dev>",
      to: ["mastertrip2030@gmail.com"],
      subject: subject || "📩 Nouvelle réservation MasterTripTransfers",
      text: message
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, data })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: err.message
    };
  }
}
