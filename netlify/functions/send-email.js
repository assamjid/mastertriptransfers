import nodemailer from "nodemailer";

export async function handler(event) {
  try {
    const { subject, message } = JSON.parse(event.body);

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER, // ton Gmail
        pass: process.env.EMAIL_PASS  // mot de passe app
      }
    });

    await transporter.sendMail({
      from: `"MasterTripTransfers" <${process.env.EMAIL_USER}>`,
      to: "mastertrip2030@gmail.com",
      subject: subject || "Nouvelle réservation MasterTripTransfers",
      text: message
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
}
