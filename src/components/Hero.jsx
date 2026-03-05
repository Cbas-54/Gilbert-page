import { ArrowRight } from 'lucide-react';
import heroImage from '../assets/hero-workshop.png';

const Hero = () => {
  return (
    <div id="home" className="relative w-full min-h-screen bg-dark-rich flex flex-col lg:flex-row overflow-hidden">
      
      {/* Left side: Content (Cinematic Dark) */}
      <div className="lg:w-1/2 flex flex-col justify-center p-8 md:p-20 relative z-10 bg-dark-rich">
        {/* Decorative Technical Line */}
        <div className="absolute left-0 top-1/4 w-1 h-32 bg-primary-600 hidden lg:block"></div>
        
        <div className="max-w-xl mx-auto lg:mx-0">
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="w-10 h-[2px] bg-primary-600"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-500">
              Establecimiento La Plata
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.85] text-white uppercase tracking-tighter mb-8">
            REVIVE TU <br/>
            <span className="text-primary-600">PASIÓN</span>
          </h1>

          <p className="text-lg md:text-xl text-neutral-400 font-bold leading-snug max-w-md mb-12">
            Transformamos el desgaste del tiempo en durabilidad eterna. Especialistas en reparación de calzado y artículos de cuero.
          </p>
          
          <div className="flex flex-wrap gap-6 items-center">
            <a 
              href="https://wa.me/542211234567" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group px-12 py-6 bg-primary-600 text-white font-black text-sm uppercase tracking-widest rounded-full hover:bg-white hover:text-dark-deep transition-all duration-500 flex items-center gap-4 shadow-2xl shadow-primary-600/20"
            >
              Consultar Ahora
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </a>
            
            <div className="hidden sm:flex items-center gap-4 text-neutral-500">
              <div className="w-12 h-12 rounded-full border border-neutral-800 flex items-center justify-center">
                <span className="text-[10px] font-black">2026</span>
              </div>
              <p className="text-[9px] font-black uppercase tracking-widest leading-none">
                CALIDAD <br/> CERTIFICADA
              </p>
            </div>
          </div>
        </div>

        {/* Ambient watermark */}
        <div className="absolute bottom-10 left-10 opacity-5 pointer-events-none hidden lg:block">
          <p className="text-[120px] font-black leading-none text-white select-none translate-y-20">GILBERT</p>
        </div>
      </div>

      {/* Right side: Visual (Full-bleed) */}
      <div className="lg:w-1/2 relative min-h-[50vh] lg:min-h-screen">
        <img 
          src={heroImage} 
          alt="Artesano reparando calzado en su taller" 
          className="absolute inset-0 w-full h-full object-cover object-center grayscale brightness-75 contrast-125 transition-all duration-1000"
        />
        {/* Dramatic Shadow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark-rich via-transparent to-transparent hidden lg:block"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark-rich via-transparent to-transparent lg:hidden"></div>
        
        {/* Studio Identifier */}
        <div className="absolute bottom-12 right-12 border-l border-neutral-500 pl-6 hidden md:block">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 mb-1">C_LOCATION / 01</p>
          <p className="text-sm font-black text-white uppercase tracking-tighter">Boutique de Composturas</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
