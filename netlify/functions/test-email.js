import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const handler = async () => {
  try {
    await resend.emails.send({
      from: "Test <onboarding@resend.dev>",
      to: "mastertrip2030@gmail.com",
      subject: "🧪 TEST EMAIL RESEND",
      html: "<p>Si tu lis ce message, Resend fonctionne.</p>",
    });

    return {
      statusCode: 200,
      body: "Email sent",
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err.message,
    };
  }
};
