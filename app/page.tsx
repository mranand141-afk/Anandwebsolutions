import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import WhatsAppButton from "@/components/WhatsAppButton";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Header />
      <Hero />
      <Services />
      <Pricing />
      <Testimonials />
      <Contact />
      
      <WhatsAppButton />

      {/* Ticker Footer */}
      <div className="bg-blue-600 h-10 flex items-center overflow-hidden whitespace-nowrap mt-4 border-t border-white/10">
        <div className="animate-[marquee_20s_linear_infinite] flex gap-20 w-fit">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] shrink-0 text-white">
            Performance Driven • Fully Optimized • 24/7 Support • Ready for NextJS 15 • India's Leading Web Studio • 
          </span>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] shrink-0 text-white">
            Performance Driven • Fully Optimized • 24/7 Support • Ready for NextJS 15 • India's Leading Web Studio • 
          </span>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] shrink-0 text-white">
            Performance Driven • Fully Optimized • 24/7 Support • Ready for NextJS 15 • India's Leading Web Studio • 
          </span>
        </div>
      </div>
      
      <footer className="bg-[#050505] py-12 px-10 border-t border-white/10 flex justify-between items-center">
         <p className="text-[10px] font-bold tracking-widest uppercase text-gray-500">&copy; {new Date().getFullYear()} Anand Web Studio</p>
         <Link href="/admin" className="text-[10px] font-bold tracking-widest uppercase text-gray-500 hover:text-white transition-colors">Admin</Link>
      </footer>
    </main>
  );
}
