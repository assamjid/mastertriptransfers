import nodemailer from "nodemailer";

export async function handler(event) {
  try {
    const { subject, message } = JSON.parse(event.body || "{}");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"MasterTripTransfers" <${process.env.EMAIL_USER}>`,
      to: "mastertrip2030@gmail.com",
      subject: subject || "Nouvelle réservation",
      text: message || "Test email"
    });

    return {
      statusCode: 200,
      body: "Email sent"
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: err.message
    };
  }
}
