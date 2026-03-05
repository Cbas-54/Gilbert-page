import { MapPin, Phone, Clock, Mail, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark-950 border-t-4 border-primary-600 pt-16 pb-8 relative overflow-hidden text-neutral-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4 border-l-4 border-primary-600 pl-4 h-fit">
            <div>
              <h3 className="text-xl font-black text-white uppercase tracking-wider">
                Composturas
              </h3>
              <p className="text-lg font-bold text-primary-500 uppercase tracking-widest">
                Gilbert
              </p>
            </div>
            <p className="text-neutral-400 text-sm max-w-xs leading-relaxed">
              Especialistas en la reparación integral de calzados y artículos de cuero. Devolvemos la vida a tus productos favoritos con precisión y durabilidad.
            </p>
            <div className="flex space-x-4 pt-2">
               <a href="#" className="w-10 h-10 rounded-full bg-dark-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:bg-primary-600 hover:text-white hover:border-primary-500 transition-all duration-300 group">
                <Facebook size={18} className="group-hover:scale-110 transition-transform" />
               </a>
               <a href="#" className="w-10 h-10 rounded-full bg-dark-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:bg-primary-600 hover:text-white hover:border-primary-500 transition-all duration-300 group">
                <Instagram size={18} className="group-hover:scale-110 transition-transform" />
               </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-6 flex items-center">
              Contacto
              <span className="ml-3 w-12 h-px bg-primary-600/50"></span>
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-neutral-300 text-sm hover:text-white transition-colors cursor-pointer">Av. Ficticia 1234, Barrio Norte<br />Ciudad Autónoma, CP 1000</span>
              </li>
              <li className="flex items-center group cursor-pointer">
                <Phone size={20} className="text-primary-500 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-neutral-300 text-sm group-hover:text-white transition-colors">+54 9 11 1234-5678</span>
              </li>
              <li className="flex items-center group cursor-pointer">
                <Mail size={20} className="text-primary-500 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-neutral-300 text-sm group-hover:text-white transition-colors">info@composturasgilbert.com</span>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-6 flex items-center">
              Horarios
              <span className="ml-3 w-12 h-px bg-primary-600/50"></span>
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center justify-between text-sm py-2 border-b border-light-white/5 border-neutral-800">
                <div className="flex items-center text-neutral-400">
                  <Clock size={16} className="text-primary-500 mr-2" />
                  Lunes - Viernes
                </div>
                <span className="text-white font-medium">09:00 - 18:00</span>
              </li>
              <li className="flex items-center justify-between text-sm py-2 border-b border-light-white/5 border-neutral-800">
                <div className="flex items-center text-neutral-400">
                  <Clock size={16} className="text-primary-500 mr-2" />
                  Sábados
                </div>
                <span className="text-white font-medium">09:00 - 13:00</span>
              </li>
              <li className="flex items-center justify-between text-sm py-2 text-primary-500">
                <div className="flex items-center">
                  <Clock size={16} className="mr-2" />
                  Domingos
                </div>
                <span className="font-bold">Cerrado</span>
              </li>
            </ul>
          </div>
          
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-neutral-800/80 flex flex-col md:flex-row justify-between items-center bg-dark-950">
          <p className="text-xs text-neutral-400 text-center md:text-left">
            &copy; {new Date().getFullYear()} Composturas de Calzado Gilbert. Todos los derechos reservados.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0 text-xs text-neutral-400">
            <a href="#" className="hover:text-primary-500 transition-colors">Términos</a>
            <a href="#" className="hover:text-primary-500 transition-colors">Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
