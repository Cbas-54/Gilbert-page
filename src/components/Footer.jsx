import { Facebook, Instagram, Twitter, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contacto" className="bg-dark-deep text-white pt-20 pb-10">
      <div className="boutique-container">
        <div className="bg-white/5 backdrop-blur-lg rounded-[2.5rem] p-10 md:p-16 border border-white/10 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
            
            {/* Left: Brand Identity */}
            <div className="space-y-8">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-white flex items-center justify-center text-dark-deep font-black text-2xl rounded-2xl group-hover:rotate-12 transition-transform">
                  G
                </div>
                <h2 className="text-4xl font-black uppercase tracking-tighter">Gilbert</h2>
              </div>
              <p className="text-lg text-neutral-400 font-bold max-w-sm leading-snug">
                Pasión por la artesanía. Calidad garantizada en cada reparación de calzado y cuero en La Plata.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-primary-600 transition-all"><Instagram size={20} /></a>
                <a href="#" className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-primary-600 transition-all"><Facebook size={20} /></a>
                <a href="#" className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-primary-600 transition-all"><Twitter size={20} /></a>
              </div>
            </div>

            {/* Right: Info Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <h4 className="text-xs font-black text-primary-600 tracking-widest uppercase">CONTACTO</h4>
                <ul className="space-y-4 text-sm font-bold opacity-80">
                  <li className="flex items-center gap-3">
                    <Phone size={16} className="text-primary-600" />
                    <span>+54 221 123-4567</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail size={16} className="text-primary-600" />
                    <span>info@composturasgilbert.com</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-6">
                <h4 className="text-xs font-black text-primary-600 tracking-widest uppercase">HORARIOS</h4>
                <div className="space-y-1">
                  <p className="font-black uppercase tracking-tighter">Lunes - Viernes</p>
                  <p className="text-sm opacity-60">09:00 — 18:00 HS</p>
                </div>
                <div className="space-y-1 opacity-20">
                  <p className="font-black uppercase tracking-tighter">Fines de Semana</p>
                  <p className="text-sm">Cerrado</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar Inside the rounded box */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] font-black tracking-widest uppercase opacity-40">
              &copy; {new Date().getFullYear()} COMPOSTURAS GILBERT. ALL RIGHTS RESERVED.
            </p>
            <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest opacity-40">
              <a href="#" className="hover:text-white transition-colors">Privacidad</a>
              <a href="#" className="hover:text-white transition-colors">Términos</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
