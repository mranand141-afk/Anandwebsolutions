import { NextResponse } from "next/server";
import crypto from "crypto";
import { Resend } from "resend";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
export async function POST(req: Request) {
  try {
    const { razorpayPaymentId, razorpayOrderId, razorpaySignature, amount, planName } = await req.json();
    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (secret) {
      const generatedSignature = crypto.createHmac("sha256", secret).update(`${razorpayOrderId}|${razorpayPaymentId}`).digest("hex");
      if (generatedSignature !== razorpaySignature) return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }
    const paymentId = razorpayPaymentId || `mock_${Date.now()}`;
    await setDoc(doc(db, "payments", paymentId), {
      razorpayPaymentId: paymentId, razorpayOrderId: razorpayOrderId || "mock_order", razorpaySignature: razorpaySignature || "mock_sig",
      amount: amount || 0, planName: planName || "Unknown", customerName: "Guest", customerEmail: "guest@example.com",
      customerPhone: "0000000000", status: "success", createdAt: new Date().toISOString(),
    });
    if (process.env.RESEND_API_KEY && process.env.NOTIFICATION_EMAIL) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "payments@resend.dev", to: process.env.NOTIFICATION_EMAIL, subject: `New Payment Received: ${planName}`,
        html: `<h1>Payment Successful</h1><p><strong>Plan:</strong> ${planName}</p><p><strong>Amount:</strong> ₹${amount}</p><p><strong>Payment ID:</strong> ${paymentId}</p>`,
      });
    }
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
