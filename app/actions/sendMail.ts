"use server";

import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  message?: string;
};

type SendMailResult = {
  ok: boolean;
  error?: string;
};

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const getValue = (input: ContactPayload | FormData, key: keyof ContactPayload) => {
  if (input instanceof FormData) {
    const value = input.get(key);
    return typeof value === "string" ? value.trim() : "";
  }

  return input[key]?.trim() ?? "";
};

export async function sendMail(
  input: ContactPayload | FormData,
): Promise<SendMailResult> {
  const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL;
  const senderEmail =
    process.env.CONTACT_SENDER_EMAIL ??
    process.env.DIRECT_MAIL_FROM ??
    "no-reply@localhost";

  if (!receiverEmail) {
    console.error(
      "[direct-mail] CONTACT_RECEIVER_EMAIL is missing. Email was not sent.",
    );
    return { ok: false, error: "Email receiver is not configured." };
  }

  const name = getValue(input, "name");
  const email = getValue(input, "email");
  const phone = getValue(input, "phone");
  const company = getValue(input, "company");
  const message = getValue(input, "message");

  if (!name || !email || !message || !isValidEmail(email)) {
    return {
      ok: false,
      error: "Name, valid email, and message are required.",
    };
  }

  const transportOptions: SMTPTransport.Options & { direct: true } = {
    direct: true,
    host: "localhost",
    port: 25,
  };

  const transporter = nodemailer.createTransport(transportOptions);

  try {
    await transporter.sendMail({
      from: `ClickMasters Website <${senderEmail}>`,
      to: receiverEmail,
      replyTo: email,
      subject: `New contact form submission from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || "Not provided"}`,
        `Company: ${company || "Not provided"}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>
        <p><strong>Company:</strong> ${escapeHtml(company || "Not provided")}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      `,
    });

    return { ok: true };
  } catch (error) {
    console.error(
      "[direct-mail] Failed to send email using direct MX lookup through localhost:25. Port 25 may be blocked by the hosting/server environment.",
      error,
    );

    return {
      ok: false,
      error: "Email could not be sent from this server environment.",
    };
  }
}
