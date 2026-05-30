import Link from "next/link";

export default function Header() {
  return (
    <nav className="flex justify-between items-center px-10 py-6 border-b border-white/10 bg-[#050505]/80 backdrop-blur fixed top-0 w-full z-50">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 rounded-sm"></div>
        <span className="text-xl font-black tracking-tighter uppercase">Anand Studio</span>
      </div>
      <div className="hidden md:flex items-center gap-8">
        <Link href="#services" className="text-xs font-bold tracking-[0.2em] uppercase opacity-60 hover:opacity-100 transition-opacity">Services</Link>
        <Link href="#pricing" className="text-xs font-bold tracking-[0.2em] uppercase opacity-60 hover:opacity-100 transition-opacity">Pricing</Link>
        <Link href="#reviews" className="text-xs font-bold tracking-[0.2em] uppercase opacity-60 hover:opacity-100 transition-opacity">Reviews</Link>
        <Link href="#contact" className="text-xs font-bold tracking-[0.2em] uppercase opacity-60 hover:opacity-100 transition-opacity">Contact</Link>
      </div>
    </nav>
  );
}
