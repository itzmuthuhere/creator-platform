import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return NextResponse.json({ error: "Please enter your name" }, { status: 400 });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email" }, { status: 400 });
  }
  if (!message || typeof message !== "string" || message.trim().length < 10) {
    return NextResponse.json({ error: "Message must be at least 10 characters" }, { status: 400 });
  }

  const admin = (process.env.ADMIN_EMAIL || "").split(",").map((e) => e.trim())[0];
  if (!admin) {
    return NextResponse.json({ error: "Contact form is not configured" }, { status: 500 });
  }

  await sendEmail({
    to: admin,
    replyTo: email,
    subject: `Contact form: ${name.trim()}`,
    html: `
      <div style="font-family:sans-serif;max-width:500px;margin:0 auto;padding:20px">
        <h2 style="color:#7c3aed">New message from techpulzo.in</h2>
        <p><strong>Name:</strong> ${name.trim()}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space:pre-wrap">${message.trim()}</p>
      </div>
    `,
    text: `New message from techpulzo.in\n\nName: ${name.trim()}\nEmail: ${email}\n\n${message.trim()}`,
  });

  return NextResponse.json({ message: "Thanks — your message has been sent. We'll get back to you soon." });
}
