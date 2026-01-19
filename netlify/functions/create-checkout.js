const Stripe = require("stripe");

// 🔑 Clé Stripe (TEST ou LIVE selon ton mode)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  try {
    // 🔒 Autoriser uniquement POST
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: "Method Not Allowed",
      };
    }

    // 📥 Données reçues depuis le frontend
    const data = JSON.parse(event.body || "{}");

    const amount = parseInt(data.amount, 10); // en centimes
    const email = data.email;

    // 🔎 Vérifications obligatoires
    if (!amount || amount <= 0) {
      return {
        statusCode: 400,
        body: "Invalid amount",
      };
    }

    if (!email) {
      return {
        statusCode: 400,
        body: "Customer email required",
      };
    }

    // 💳 Création de la session Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      payment_method_types: ["card"],

      // ✅ Email client (clé pour le webhook + email auto)
      customer_email: email,

      // ✅ Stripe collecte les infos client
      billing_address_collection: "required",

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

      metadata: {
        source: "mastertrip-booking",
      },

      // 🔁 URLs retour
      success_url: "https://www.mastertriptransfers.com/success.html",
      cancel_url: "https://www.mastertriptransfers.com/cancel.html",
    });

    // 🚀 Réponse OK → redirection Stripe
    return {
      statusCode: 200,
      body: JSON.stringify({
        url: session.url,
      }),
    };

  } catch (err) {
    console.error("❌ Stripe create-checkout error:", err);

    return {
      statusCode: 500,
      body: "Stripe checkout error",
    };
  }
};
