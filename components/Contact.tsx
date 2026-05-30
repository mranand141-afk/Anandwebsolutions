"use client";

import { useState } from "react";
import { Mail } from "lucide-react";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSuccess(true);
        (e.target as HTMLFormElement).reset();
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      alert("Error sending message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-10 bg-[#050505]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
        <div className="flex-1">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">Start</h2>
          <p className="text-gray-400 mb-12 text-sm leading-relaxed max-w-sm">
            Have a project in mind? We'd love to hear about it. Send us a brief and we'll get back to you within 24 hours.
          </p>
          <div className="mt-auto pt-6 border-t border-white/10 max-w-sm">
            <div className="flex flex-col gap-4">
              <div className="opacity-40 flex items-center gap-1">
                <span className="text-[10px] font-bold tracking-widest uppercase text-white">mranand141@gmail.com</span>
              </div>
              <div className="opacity-40 flex items-center gap-1">
                <span className="text-[10px] font-bold tracking-widest uppercase text-white">+91 9341358458 / 8051862898</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-[#0a0a0a] p-8 md:p-12 border border-white/10">
          {success ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 bg-blue-600/10 text-blue-600 rounded-none border border-blue-600/20 flex items-center justify-center mb-6">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight mb-2">Brief Sent!</h3>
              <p className="text-gray-400 text-sm">Thank you for reaching out.</p>
              <button 
                onClick={() => setSuccess(false)}
                className="mt-8 text-[10px] font-bold uppercase tracking-widest text-blue-600 hover:text-white transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">First Name</label>
                  <input required name="name" type="text" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm focus:border-blue-600 outline-none transition-colors text-white" placeholder="John" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Phone</label>
                  <input name="phone" type="tel" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm focus:border-blue-600 outline-none transition-colors text-white" placeholder="+91 9876543210" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Email Address</label>
                <input required name="email" type="email" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm focus:border-blue-600 outline-none transition-colors text-white" placeholder="john@example.com" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Requirement</label>
                <textarea required name="message" rows={3} className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm focus:border-blue-600 outline-none transition-colors resize-none text-white" placeholder="Tell us about your project..."></textarea>
              </div>
              <button disabled={loading} type="submit" className="w-full bg-white text-black py-4 text-xs font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-colors mt-4 disabled:opacity-50">
                {loading ? "Sending..." : "Send Brief"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
