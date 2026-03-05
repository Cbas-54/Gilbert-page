import { ArrowRight, Wrench } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-white">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1594240751107-b089c8a92023?q=80&w=2070&auto=format&fit=crop" 
          alt="Artesano reparando calzado" 
          className="w-full h-full object-cover object-center animate-in zoom-in duration-1000 ease-out fill-mode-forwards opacity-90 grayscale-[30%]"
        />
        {/* Light overlay to make dark text readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start pt-20">
        
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 border border-primary-500/30 shadow-sm backdrop-blur-md mb-8 animate-in slide-in-from-bottom-4 fade-in duration-500 delay-150">
          <Wrench size={16} className="text-primary-600 mr-2" />
          <span className="text-sm font-bold tracking-wider text-dark-950 uppercase">Tradición & Precisión</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-dark-950 leading-tight mb-6 animate-in slide-in-from-bottom-8 fade-in duration-700 delay-300">
          Revive <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-700">
            Tus Pasos
          </span>
        </h1>
        
        <p className="max-w-xl text-lg md:text-xl text-neutral-600 mb-10 leading-relaxed font-medium animate-in slide-in-from-bottom-8 fade-in duration-700 delay-500 border-l-4 border-primary-500 pl-4">
          Más de 20 años de experiencia devolviendo la comodidad y el estilo a tus calzados, guantes y accesorios favoritos. Calidad artesanal garantizada.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 animate-in slide-in-from-bottom-8 fade-in duration-700 delay-700">
          <button className="group relative inline-flex items-center justify-center px-8 py-4 bg-dark-950 font-bold text-white rounded-lg overflow-hidden transition-all hover:bg-dark-800 shadow-[0_4px_14px_0_rgba(0,0,0,0.39)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.23)] hover:-translate-y-0.5">
            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-primary-600 rounded-full group-hover:w-56 group-hover:h-56 opacity-100 -z-10"></span>
            <span className="relative flex items-center z-10">
              Haz tu Consulta
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          
          <button className="px-8 py-4 bg-white/50 border-2 border-dark-950 text-dark-950 font-bold rounded-lg hover:bg-dark-950 hover:text-white transition-colors backdrop-blur-sm shadow-sm hover:shadow-md">
            Ver Servicios
          </button>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-primary-100/50 to-transparent blur-3xl pointer-events-none"></div>
    </div>
  );
};

export default Hero;
