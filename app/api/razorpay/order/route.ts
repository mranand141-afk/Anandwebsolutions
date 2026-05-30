import Razorpay from "razorpay";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  try {
    const { amount, planName } = await req.json();
    if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json({ orderId: "fake_order_id_for_preview", amount: amount * 100 }, { status: 200 });
    }
    const razorpay = new Razorpay({ key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });
    const order = await razorpay.orders.create({ amount: amount * 100, currency: "INR", receipt: `rcpt_${Date.now()}` });
    return NextResponse.json({ orderId: order.id, amount: order.amount }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to create payment order" }, { status: 500 });
  }
}
