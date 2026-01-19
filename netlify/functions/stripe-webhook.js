import Stripe from "stripe";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

export const handler = async (event) => {
  let stripeEvent;

  try {
    stripeEvent = JSON.parse(event.body);
  } catch (err) {
    return { statusCode: 400, body: "Invalid payload" };
  }

  if (stripeEvent.type === "checkout.session.completed") {
    const session = stripeEvent.data.object;

    const email = session.customer_details?.email;
    const amount = (session.amount_total / 100).toFixed(2);
    const lang = session.locale?.startsWith("fr") ? "FR" : "EN";

    if (!email) return { statusCode: 200, body: "No email" };

    const TEXT = {
      FR: {
        subject: "✅ Réservation confirmée – MasterTripTransfers",
        html: `
          <h2>Réservation confirmée</h2>
          <p>Merci pour votre paiement.</p>
          <p><b>Montant payé :</b> ${amount} €</p>
          <p>Notre équipe vous contactera très bientôt sur WhatsApp.</p>
          <p>— MasterTripTransfers</p>
        `
      },
      EN: {
        subject: "✅ Booking confirmed – MasterTripTransfers",
        html: `
          <h2>Booking confirmed</h2>
          <p>Thank you for your payment.</p>
          <p><b>Amount paid:</b> ${amount} €</p>
          <p>Our team will contact you shortly on WhatsApp.</p>
          <p>— MasterTripTransfers</p>
        `
      }
    };

    const T = TEXT[lang];

    await resend.emails.send({
      from: "MasterTripTransfers <noreply@mastertriptransfers.com>",
      to: email,
      subject: T.subject,
      html: T.html
    });

    // 📧 Email admin
    await resend.emails.send({
      from: "MasterTripTransfers <noreply@mastertriptransfers.com>",
      to: "contact@mastertriptransfers.com",
      subject: "💳 Nouveau paiement Stripe",
      html: `<p>Paiement reçu : <b>${amount} €</b><br>Email client : ${email}</p>`
    });
  }

  return { statusCode: 200, body: "OK" };
};
