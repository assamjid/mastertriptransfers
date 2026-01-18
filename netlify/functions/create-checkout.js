const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const data = JSON.parse(event.body);

    if (!data.amount || data.amount <= 0) {
      return { statusCode: 400, body: "Montant invalide" };
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [{
        price_data: {
          currency: "eur",
          product_data: {
            name: "MasterTripTransfers – Réservation",
          },
          unit_amount: data.amount,
        },
        quantity: 1,
      }],
      success_url: "https://www.mastertriptransfers.com/success.html",
      cancel_url: "https://www.mastertriptransfers.com/cancel.html",
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: err.message,
    };
  }
};
