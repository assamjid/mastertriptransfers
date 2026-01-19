const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: "Method Not Allowed",
      };
    }

    const data = JSON.parse(event.body);

    const amount = parseInt(data.amount, 10); // en centimes
    const email = data.email;                 // email client (OBLIGATOIRE)

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

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],

      // 🔥 EMAIL CLIENT (clé du problème)
      customer_email: email,

      // 🔥 Stripe collecte bien les infos client
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

      success_url: "https://www.mastertriptransfers.com/success.html",
      cancel_url: "https://www.mastertriptransfers.com/cancel.html",
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };

  } catch (err) {
    console.error("Stripe checkout error:", err);

    return {
      statusCode: 500,
      body: "Stripe error",
    };
  }
};
