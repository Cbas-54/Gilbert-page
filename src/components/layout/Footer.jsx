import { Facebook, Instagram, Twitter, Phone, Mail, Clock, MapPin, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contacto" className="relative bg-[#1A0F0D] text-parchment pt-24 pb-12 overflow-hidden">
      {/* Decorative Branding */}
      <div className="absolute top-0 right-0 p-20 opacity-[0.02] pointer-events-none select-none">
        <span className="font-serif italic text-[30vw] leading-none">G.</span>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-24">
          
          {/* Brand Identity - 5 Columns */}
          <div className="lg:col-span-5 space-y-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 border border-primary-600/30 flex items-center justify-center font-serif text-2xl italic text-primary-600">
                G.
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-serif tracking-tight text-white/90">Gilbert</span>
                <span className="text-[8px] font-sans font-black uppercase tracking-[0.4em] text-primary-600">Establecimiento</span>
              </div>
            </div>
            
            <h2 className="font-serif text-4xl md:text-5xl italic text-white/80 leading-tight max-w-md">
              Donde cada puntada es un compromiso con la <span className="text-primary-600">perdurabilidad</span>.
            </h2>

            <div className="flex items-center gap-6">
              {[
                { icon: <Instagram size={20} />, label: 'Instagram', href: 'https://instagram.com' },
                { icon: <Facebook size={20} />, label: 'Facebook', href: 'https://facebook.com' },
                { icon: <Twitter size={20} />, label: 'Twitter', href: 'https://twitter.com' }
              ].map((social) => (
                <a 
                  key={social.label} 
                  href={social.href} 
                  aria-label={social.label}
                  className="text-white/40 hover:text-primary-600 transition-colors duration-500"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Details - 7 Columns */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 pt-4">
            
            {/* Direct Line */}
            <div className="space-y-8">
              <span className="block font-sans text-[9px] font-black uppercase tracking-[0.3em] text-primary-600">Atención</span>
              <div className="space-y-6">
                <a href="tel:+542211234567" className="group block">
                  <span className="text-[8px] font-bold uppercase tracking-widest text-white/30 block mb-1">WhatsApp</span>
                  <span className="font-serif text-lg italic text-white/80 group-hover:text-primary-600 transition-colors">+54 221 123-4567</span>
                </a>
                <a href="mailto:info@gilbert.com" className="group block">
                  <span className="text-[8px] font-bold uppercase tracking-widest text-white/30 block mb-1">Email</span>
                  <span className="font-serif text-lg italic text-white/80 group-hover:text-primary-600 transition-colors">info@gilbert.com</span>
                </a>
              </div>
            </div>

            {/* Practical Info */}
            <div className="space-y-8">
              <span className="block font-sans text-[9px] font-black uppercase tracking-[0.3em] text-primary-600">El Taller</span>
              <div className="space-y-6">
                <div>
                  <span className="text-[8px] font-bold uppercase tracking-widest text-white/30 block mb-1">Horarios</span>
                  <p className="font-serif text-lg italic text-white/80 leading-relaxed">
                    Lunes a Viernes <br/>
                    09:00 — 18:00 HS
                  </p>
                </div>
              </div>
            </div>

            {/* Visit Us */}
            <div className="space-y-8 text-right lg:text-left">
              <span className="block font-sans text-[9px] font-black uppercase tracking-[0.3em] text-primary-600">Presencia</span>
              <div>
                <span className="text-[8px] font-bold uppercase tracking-widest text-white/30 block mb-1">Ubicación</span>
                <p className="font-serif text-lg italic text-white/80 leading-relaxed">
                  Calle 46 392 <br/>
                  La Plata, Arg.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <p className="text-[8px] font-sans font-bold tracking-[0.4em] uppercase text-white/20">
              © {new Date().getFullYear()} GILBERT ARTESANAL
            </p>
            <div className="hidden md:block w-px h-4 bg-white/5"></div>
            <button 
              onClick={scrollToTop}
              className="flex items-center gap-3 text-[8px] font-sans font-bold tracking-[0.4em] uppercase text-white/20 hover:text-primary-600 transition-colors"
            >
              Volver al inicio <ArrowUp size={10} />
            </button>
          </div>
          
          <div className="flex gap-8 text-[8px] font-sans font-bold uppercase tracking-[0.4em] text-white/10">
            <a href="#privacidad" className="hover:text-white transition-colors">Privacidad</a>
            <a href="#legal" className="hover:text-white transition-colors">Legal</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
