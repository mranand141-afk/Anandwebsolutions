"use client";

import Script from "next/script";
import { useState } from "react";

const plans = [
  {
    name: "Starter",
    price: 9999,
    description: "Perfect for startups & personal brands",
    features: ["1 Page Website", "Mobile Responsive", "Contact Form", "Basic SEO", "1 Month Support"],
  },
  {
    name: "Professional",
    price: 17999,
    popular: true,
    description: "Advanced SEO & Custom Modules",
    features: ["Up to 5 Pages", "Custom Design", "SEO Optimized", "Content Management System", "Payment Gateway"],
  },
  {
    name: "Premium",
    price: 19999,
    description: "Enterprise grade with ongoing support",
    features: ["Up to 10 Pages", "Advanced SEO", "Admin Dashboard", "E-commerce Ready", "6 Months Support"],
  },
];

export default function Pricing() {
  const [loading, setLoading] = useState<string | null>(null);

  const handlePayment = async (plan: typeof plans[0]) => {
    setLoading(plan.name);
    try {
      const response = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planName: plan.name, amount: plan.price }),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: "INR",
        name: "Anand Web Studio",
        description: `${plan.name} Plan`,
        order_id: data.orderId,
        handler: async function (res: any) {
          // Verify payment
          await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpayPaymentId: res.razorpay_payment_id,
              razorpayOrderId: res.razorpay_order_id,
              razorpaySignature: res.razorpay_signature,
              amount: plan.price,
              planName: plan.name,
            }),
          });
          alert("Payment successful! We will contact you shortly.");
        },
        prefill: { name: "", email: "", contact: "" },
        theme: { color: "#2563eb" },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", function (res: any) {
        alert("Payment failed. Please try again.");
      });
      rzp.open();
    } catch (e: any) {
      alert("Error: " + e.message);
    } finally {
      setLoading(null);
    }
  };

  return (
    <section id="pricing" className="py-24 px-10 bg-[#050505] border-b border-white/10">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16">
        <div className="md:w-1/3">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">Plans</h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-8">
            Choose the perfect plan for your business needs. Transparent pricing with no hidden fees.
          </p>
          <div className="mt-8 hidden md:block">
            <h4 className="text-[10px] font-black uppercase text-gray-500 mb-4 tracking-widest">Trusted By</h4>
            <p className="text-lg italic serif text-gray-300">"The fastest build we've ever launched. Anand Studio is unmatched."</p>
            <p className="text-[10px] font-bold mt-2 uppercase tracking-widest text-gray-500">— RAHUL VERMA</p>
          </div>
        </div>

        <div className="md:w-2/3 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`p-6 flex flex-col ${
                plan.popular ? "bg-blue-600 rounded-xl shadow-xl shadow-blue-900/20" : "bg-white/5 rounded-xl border border-white/5"
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className={`text-xs font-bold uppercase tracking-widest ${plan.popular ? "text-white" : "opacity-60 text-white"}`}>{plan.name}</span>
              </div>
              <p className={`text-[10px] mb-6 min-h-[30px] font-medium tracking-wide uppercase ${plan.popular ? "text-blue-100" : "text-gray-500"}`}>{plan.description}</p>
              
              <div className="mb-8">
                <span className="text-2xl font-black tracking-tighter">₹{plan.price.toLocaleString()}</span>
              </div>
              
              <ul className="mb-8 space-y-3 flex-1">
                {plan.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs font-bold uppercase tracking-wider">
                    <span className={`w-1 h-1 rounded-full mt-1.5 shrink-0 ${plan.popular ? "bg-white" : "bg-blue-600"}`} />
                    <span className={plan.popular ? "text-white/90" : "text-gray-400"}>{feat}</span>
                  </li>
                ))}
              </ul>
              
              <button
                onClick={() => handlePayment(plan)}
                disabled={loading === plan.name}
                className={`w-full py-4 text-xs font-black uppercase tracking-widest transition-colors ${
                  plan.popular
                    ? "bg-white text-blue-900 hover:bg-gray-100 disabled:opacity-50"
                    : "bg-white/10 hover:bg-white/20 text-white disabled:opacity-50"
                }`}
              >
                {loading === plan.name ? "Processing..." : "Select Plan"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
