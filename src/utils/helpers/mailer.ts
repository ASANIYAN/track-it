import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

import User from "@/models/user";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // Create a hash token based on the user's ID
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    // Update the user document in the database with the generated token and expiry time
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    // Create a nodemailer transport
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.NODEMAILER_TRANSPORT_USER,
        pass: process.env.NODEMAILER_TRANSPORT_PASS,
      },
    });

    // Compose email options
    const mailOptions = {
      from: process.env.NODEMAILER_TRANSPORT_USER,
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${process.env.domain}/${
        emailType === "VERIFY"
          ? `verify-email?verifyToken=${hashedToken}`
          : `reset-password?resetToken=${hashedToken}`
      }">here</a> to 
                ${
                  emailType === "VERIFY"
                    ? "Verify your email"
                    : "Reset your password"
                }</p>`,
    };

    // Send the email
    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};
