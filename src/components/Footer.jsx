import { Facebook, Instagram, Twitter, Phone, Mail, Clock, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contacto" className="bg-dark-deep text-white pt-24 pb-12 relative overflow-hidden">
      {/* Massive Background Watermark */}
      <div className="absolute -bottom-10 -left-10 text-[20vw] font-black text-white/[0.02] leading-none select-none pointer-events-none tracking-tighter">
        GILBERT
      </div>

      <div className="boutique-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          
          {/* Brand & Mission - 5 Columns */}
          <div className="lg:col-span-5 space-y-10">
            <div className="flex items-center gap-5 group">
              <div className="w-14 h-14 bg-white flex items-center justify-center text-dark-deep font-black text-3xl rounded-2xl transition-transform duration-500 group-hover:rotate-[360deg] shadow-xl">
                G
              </div>
              <div className="flex flex-col -space-y-1">
                <span className="text-3xl font-black uppercase tracking-tighter">Gilbert</span>
                <span className="text-[10px] font-black text-primary-600 uppercase tracking-[0.4em]">Est. 1990</span>
              </div>
            </div>
            
            <p className="text-xl md:text-2xl text-neutral-400 font-bold leading-tight max-w-md">
              Elevando el estándar de la compostura artesanal. 
              Donde cada puntada cuenta una historia de durabilidad.
            </p>

            <div className="flex gap-4">
              {[
                { icon: <Instagram size={22} />, label: 'Instagram' },
                { icon: <Facebook size={22} />, label: 'Facebook' },
                { icon: <Twitter size={22} />, label: 'Twitter' }
              ].map((social, idx) => (
                <a 
                  key={idx} 
                  href="#" 
                  aria-label={social.label}
                  className="w-14 h-14 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-primary-600 hover:border-primary-600 hover:-translate-y-2 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Info Grid - 7 Columns */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            
            {/* Contact Col */}
            <div className="space-y-8">
              <h4 className="text-xs font-black text-primary-600 tracking-[0.3em] uppercase">Contacto</h4>
              <ul className="space-y-6">
                <li className="group">
                  <a href="tel:+542211234567" className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-white/5 rounded-xl flex items-center justify-center group-hover:bg-white/10 transition-colors">
                      <Phone size={16} />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-black opacity-30 block mb-1">Teléfono</span>
                      <span className="text-sm font-bold block">+54 221 123-4567</span>
                    </div>
                  </a>
                </li>
                <li className="group">
                  <a href="mailto:info@composturasgilbert.com" className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-white/5 rounded-xl flex items-center justify-center group-hover:bg-white/10 transition-colors">
                      <Mail size={16} />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-black opacity-30 block mb-1">Email</span>
                      <span className="text-sm font-bold block">info@gilbert.com</span>
                    </div>
                  </a>
                </li>
              </ul>
            </div>

            {/* Hours Col */}
            <div className="space-y-8">
              <h4 className="text-xs font-black text-primary-600 tracking-[0.3em] uppercase">Taller</h4>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-white/5 rounded-xl flex items-center justify-center">
                  <Clock size={16} />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-black opacity-30 block mb-1">Horarios</span>
                  <div className="space-y-2">
                    <p className="text-sm font-bold whitespace-nowrap">LUN — VIE</p>
                    <p className="text-xs font-black opacity-50 tracking-widest">09:00 — 18:00 HS</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Address Col */}
            <div className="space-y-8">
              <h4 className="text-xs font-black text-primary-600 tracking-[0.3em] uppercase">Ubicación</h4>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-white/5 rounded-xl flex items-center justify-center">
                  <MapPin size={16} />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-black opacity-30 block mb-1">Dirección</span>
                  <p className="text-sm font-bold leading-tight">
                    CALLE 46 392 <br/>
                    LA PLATA, ARG.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <p className="text-[10px] font-black tracking-[0.3em] uppercase opacity-20">
              &copy; {new Date().getFullYear()} COMPOSTURAS GILBERT
            </p>
            <div className="w-1 h-1 bg-white/10 rounded-full hidden md:block"></div>
            <p className="text-[10px] font-black tracking-[0.3em] uppercase opacity-20 hover:opacity-100 transition-opacity cursor-pointer">
              Hecho con Pasión en Argentina
            </p>
          </div>
          
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.3em] opacity-20">
            <a href="#" className="hover:text-primary-600 hover:opacity-100 transition-all">Privacidad</a>
            <a href="#" className="hover:text-primary-600 hover:opacity-100 transition-all">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
