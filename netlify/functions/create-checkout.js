/*const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Method Not Allowed" }),
      };
    }

    const { amount } = JSON.parse(event.body || "{}");

    if (!amount || amount <= 0) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Invalid amount" }),
      };
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "MasterTripTransfers – Booking",
            },
            unit_amount: amount, // centimes
          },
          quantity: 1,
        },
      ],
      success_url: "https://www.mastertriptransfers.com/success.html",
      cancel_url: "https://www.mastertriptransfers.com/cancel.html",
      metadata: {
        source: "mastertrip-booking",
      },
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: session.url }),
    };

  } catch (err) {
    console.error("Stripe error:", err);

    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: err.message }),
    };
  }
};
*/

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Method Not Allowed" }),
      };
    }

    const { amount, email, lang } = JSON.parse(event.body || "{}");

    // 🔒 validations
    if (!amount || amount <= 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid amount" }),
      };
    }

    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Email required" }),
      };
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],

      // ✅ EMAIL CLIENT (OBLIGATOIRE POUR WEBHOOK)
      customer_email: email,

      // 🌍 Langue Stripe (FR / EN)
      locale: lang === "FR" ? "fr" : "en",

      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "MasterTripTransfers – Booking",
            },
            unit_amount: amount, // centimes
          },
          quantity: 1,
        },
      ],

      success_url: "https://www.mastertriptransfers.com/success.html",
      cancel_url: "https://www.mastertriptransfers.com/cancel.html",

      metadata: {
        source: "mastertrip-booking",
      },
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: session.url }),
    };

  } catch (err) {
    console.error("Stripe error:", err);

    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: err.message }),
    };
  }
};
