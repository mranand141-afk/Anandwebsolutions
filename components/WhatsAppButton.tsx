import { MessageCircle } from "lucide-react";
import Link from "next/link";

export default function WhatsAppButton() {
  const phoneNumber = "919341358458";
  const message = encodeURIComponent("Hello Anand Web Studio, I want to discuss a project.");

  return (
    <Link
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-14 right-6 z-50 bg-green-500 text-black px-4 py-3 rounded-full text-xs font-black flex items-center gap-2 hover:bg-green-400 transition-colors shadow-2xl"
      aria-label="Chat on WhatsApp"
    >
      WHATSAPP <MessageCircle className="w-4 h-4 text-black" />
    </Link>
  );
}
