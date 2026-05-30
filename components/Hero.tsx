import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-10 overflow-hidden relative border-b border-white/10 flex flex-col justify-between">
      <div className="max-w-7xl mx-auto w-full flex flex-col pt-10">
        <div className="mb-6">
           <h1 className="text-6xl md:text-8xl font-black leading-[0.85] tracking-tighter uppercase mb-6 text-white max-w-4xl">
            Modern Web<br className="hidden md:block" />
            Studio <span className="text-blue-600">15</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base max-w-md leading-relaxed mb-10">
            Expert development for high-performance websites. Fully responsive, SEO optimized, and ready for global scale on Vercel.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link href="#contact" className="px-8 py-4 bg-white text-black text-xs font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-colors w-full sm:w-auto text-center">
            Start Your Project
          </Link>
          <Link href="#pricing" className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-black uppercase tracking-widest transition-colors w-full sm:w-auto text-center">
            View Pricing
          </Link>
        </div>
        
        <div className="mt-16 flex flex-wrap gap-6 text-[10px] font-bold uppercase tracking-widest text-gray-500">
          <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600" /> Fast Loading</span>
          <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600" /> Mobile Responsive</span>
          <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600" /> SEO Optimized</span>
        </div>
      </div>
    </section>
  );
}
