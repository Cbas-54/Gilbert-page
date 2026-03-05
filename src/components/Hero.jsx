import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div id="home" className="relative w-full pt-32 pb-20 bg-neutral-soft">
      <div className="boutique-container">
        <div className="relative bg-white rounded-[3rem] overflow-hidden border border-neutral-200 shadow-2xl flex flex-col lg:flex-row min-h-[600px]">
          
          {/* Left: Content Side */}
          <div className="lg:w-1/2 p-10 md:p-16 flex flex-col justify-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-600 px-4 py-2 rounded-full mb-8 w-fit">
              <span className="w-2 h-2 bg-primary-600 rounded-full animate-pulse"></span>
              <span className="text-xs font-black uppercase tracking-widest">Taller de Compostura Gilbert</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] text-dark-deep uppercase tracking-tighter mb-8 transition-all hover:tracking-normal">
              REVIVE TU <br/>
              <span className="text-primary-600">PASIÓN</span>
            </h1>

            <p className="text-lg md:text-xl text-neutral-500 font-bold leading-tight max-w-md mb-12">
              Transformamos el desgaste del tiempo en durabilidad eterna. Especialistas en reparación de calzado y artículos de cuero.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href="https://wa.me/542211234567" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group px-10 py-5 bg-dark-deep text-white font-black text-sm uppercase tracking-widest rounded-2xl hover:bg-primary-600 transition-all duration-300 flex items-center gap-3"
              >
                Consultar Ahora
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right: Image Side */}
          <div className="lg:w-1/2 relative bg-neutral-100 overflow-hidden">
            <img 
              src="/src/assets/hero-workshop.png" 
              alt="Artesano reparando calzado en su taller" 
              className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-1000 scale-105 hover:scale-100"
            />
            {/* Soft overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>

          {/* Small Floating Label */}
          <div className="absolute top-10 right-10 bg-white/90 backdrop-blur px-6 py-3 rounded-2xl border border-neutral-200 hidden xl:block animate-bounce">
            <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Establecido en</p>
            <p className="text-sm font-black uppercase">La Plata, AR</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
