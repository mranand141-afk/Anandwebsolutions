import { NextResponse } from "next/server";
import { Resend } from "resend";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

export async function POST(req: Request) {
  try {
    const { name, email, phone, message } = await req.json();
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const messageId = `msg_${Date.now()}`;
    try {
      await setDoc(doc(db, "contactMessages", messageId), {
        name, email, phone: phone || "", message, createdAt: new Date().toISOString()
      });
    } catch(e) { console.error("Firestore error:", e); }
    if (process.env.RESEND_API_KEY && process.env.NOTIFICATION_EMAIL) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "contact@resend.dev",
        to: process.env.NOTIFICATION_EMAIL,
        subject: `New Contact Request from ${name}`,
        html: `<h1>New Message</h1><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone}</p><p><strong>Message:</strong></p><p>${message}</p>`,
      });
    }
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Contact API Error:", error);
    return NextResponse.json({ error: "Failed to process message" }, { status: 500 });
  }
}
