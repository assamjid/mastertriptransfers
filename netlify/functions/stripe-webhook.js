/*const Stripe = require("stripe");
const { Resend } = require("resend");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

exports.handler = async (event) => {
  const sig = event.headers["stripe-signature"];
  let stripeEvent;

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature error:", err.message);
    return {
      statusCode: 400,
      body: `Webhook Error: ${err.message}`
    };
  }

  // ✅ Paiement confirmé
  if (stripeEvent.type === "checkout.session.completed") {
    const session = stripeEvent.data.object;

    const email = session.customer_details?.email;
    const amount = (session.amount_total / 100).toFixed(2);
    const lang = session.locale?.startsWith("fr") ? "FR" : "EN";

    if (!email) {
      return { statusCode: 200, body: "No customer email" };
    }

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

    // 📧 Email client
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
      html: `
        <p><b>Paiement Stripe reçu</b></p>
        <p>Montant : <b>${amount} €</b></p>
        <p>Email client : ${email}</p>
      `
    });
  }

  return {
    statusCode: 200,
    body: "OK"
  };
};

*/

import Stripe from "stripe";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

export const handler = async (event) => {
  const sig = event.headers["stripe-signature"];

  if (!sig) {
    return { statusCode: 400, body: "Missing stripe signature" };
  }

  let stripeEvent;

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("❌ Webhook signature failed", err.message);
    return { statusCode: 400, body: "Webhook Error" };
  }

  // ✅ Événement CONFIRMÉ
  if (stripeEvent.type === "checkout.session.completed") {
    const session = stripeEvent.data.object;

    const email = session.customer_email || session.customer_details?.email;
    const amount = (session.amount_total / 100).toFixed(2);
    const locale = session.locale || "en";
    const lang = locale.startsWith("fr") ? "FR" : "EN";

    if (!email) {
      console.warn("⚠️ No customer email in session");
      return { statusCode: 200, body: "No email" };
    }

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

    // 📧 EMAIL CLIENT
    await resend.emails.send({
  from: "MasterTripTransfers <onboarding@resend.dev>",
  to: email,
  subject: T.subject,
  html: T.html
});

    // 📧 EMAIL ADMIN
 await resend.emails.send({
  from: "MasterTripTransfers <onboarding@resend.dev>",
  to: "mastertrip2030@gmail.com",
  subject: "💳 Nouveau paiement Stripe",
  html: `<p>Paiement reçu : <b>${amount} €</b><br>Email client : ${email}</p>`
});
  }

  return { statusCode: 200, body: "OK" };
};
