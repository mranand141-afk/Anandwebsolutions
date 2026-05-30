import { NextResponse } from "next/server";
import { Resend } from "resend";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

export async function POST(req: Request) {
  try {
    const { name, email, rating, reviewText } = await req.json();
    if (!name || !email || !reviewText || !rating) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const reviewId = `rev_${Date.now()}`;
    await setDoc(doc(db, "reviews", reviewId), {
      name, email, rating: Number(rating), reviewText, status: "pending", createdAt: new Date().toISOString()
    });
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "reviews@resend.dev",
        to: "mranand141@gmail.com",
        subject: `New Review Received from ${name}`,
        html: `<h1>New Review</h1><p><strong>Name:</strong> ${name}</p><p><strong>Rating:</strong> ${rating}/5</p><p><strong>Review:</strong> ${reviewText}</p><p>Review is pending approval. Please check your admin dashboard.</p>`,
      });
    }
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Review API Error:", error);
    return NextResponse.json({ error: "Failed to submit review" }, { status: 500 });
  }
}
