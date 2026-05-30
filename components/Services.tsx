const services = [
  {
    title: "UX/UI Engineering",
    description: "Websites that look perfect on any device.",
  },
  {
    title: "Performance First",
    description: "Lightning-fast load times to keep users engaged.",
  },
  {
    title: "SEO Optimization",
    description: "Built-in strategies to help you rank higher.",
  },
  {
    title: "E-Commerce Dev",
    description: "Built with modern, secure technologies.",
  },
  {
    title: "Global Reach",
    description: "Optimized for global audiences with CDN delivery.",
  },
  {
    title: "Custom API Design",
    description: "Unique, tailored designs that reflect your brand.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 px-10 border-b border-white/10 bg-[#050505]">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
        <div>
           <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">Services</h2>
          <p className="text-gray-400 max-w-sm text-sm leading-relaxed mb-4">
            We provide a complete suite of services to ensure your digital presence is modern, secure, and successful.
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="text-xs font-bold tracking-widest text-blue-600 uppercase italic">Selected Services</h3>
          <div className="grid grid-cols-1 gap-2">
            {services.map((service, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 border-b border-white/5 pb-4 hover:translate-x-2 transition-transform">
                <span className="text-[10px] font-black opacity-40 uppercase w-8">0{i + 1}</span>
                <div className="flex-1">
                  <h4 className="text-lg font-bold tracking-tight uppercase mb-1">{service.title}</h4>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
