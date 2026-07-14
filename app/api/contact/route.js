import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { name, email, subject, message } = await req.json();

  // Validate fields
  if (!name || !email || !subject || !message) {
    return NextResponsGmaile.json({ error: "All fields are required." }, { status: 400 });
  }

  // Create transporter using 
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,       // your Gmail address
      pass: process.env.GMAIL_APP_PASSWORD, // Gmail App Password (not your normal password)
    },
  });

  try {
    // Send email TO yourself (notification)
    await transporter.sendMail({
      from: `"Bookstore Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER, // You receive it
      replyTo: email,
      subject: `[Bookstore] ${subject} — from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af; border-bottom: 2px solid #1e40af; padding-bottom: 10px;">
            📬 New Contact Form Submission
          </h2>
          <table style="width:100%; border-collapse: collapse;">
            <tr><td style="padding:8px; font-weight:bold; color:#555;">Name:</td><td style="padding:8px;">${name}</td></tr>
            <tr style="background:#f9f9f9;"><td style="padding:8px; font-weight:bold; color:#555;">Email:</td><td style="padding:8px;">${email}</td></tr>
            <tr><td style="padding:8px; font-weight:bold; color:#555;">Subject:</td><td style="padding:8px;">${subject}</td></tr>
          </table>
          <h3 style="color:#555; margin-top:20px;">Message:</h3>
          <div style="background:#f4f4f4; padding:16px; border-radius:8px; white-space:pre-wrap;">${message}</div>
          <p style="color:#999; font-size:12px; margin-top:20px;">Sent from your Bookstore contact form</p>
        </div>
      `,
    });

    // Send confirmation email TO the user
    await transporter.sendMail({
      from: `"Premium Bookstore" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "We received your message! 📚",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af;">Hi ${name}, we got your message! 🚀</h2>
          <p style="color:#555; font-size:16px; line-height:1.6;">
            Thank you for reaching out to <strong>Premium Bookstore</strong>. 
            Our support team will get back to you within <strong>2 hours</strong>.
          </p>
          <div style="background:#f0fdf4; border-left:4px solid #22c55e; padding:16px; border-radius:8px; margin:20px 0;">
            <p style="margin:0; color:#166534; font-weight:bold;">Your message summary:</p>
            <p style="margin:8px 0 0; color:#555;"><strong>Subject:</strong> ${subject}</p>
            <p style="margin:8px 0 0; color:#555;"><strong>Message:</strong> ${message}</p>
          </div>
          <p style="color:#999; font-size:12px;">Premium Bookstore · Madurai, Tamil Nadu, India</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }
}