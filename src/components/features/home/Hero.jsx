import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import heroImage from '../../../assets/hero-workshop.png';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div id="home" className="relative w-full min-h-screen flex flex-col items-center lg:items-start justify-center pt-32 sm:pt-40 lg:pt-28 lg:pb-8 lg:pl-[10%] xl:pl-[15%] overflow-hidden bg-[#1a0f0d]">
      
      {/* Full Background Image */}
      <div className="absolute inset-0 w-full h-full bg-[#1a0f0d]">
        <img 
          src={heroImage} 
          alt="Taller artesanal de reparación de calzado" 
          fetchPriority="high"
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover object-center grayscale-[20%] brightness-[0.7] contrast-125 transition-all duration-[2000ms] ease-out hover:scale-105
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
          `}
        />
        {/* Subtle overlay */}
        <div className={`absolute inset-0 bg-dark-deep/20 mix-blend-multiply transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}></div>
      </div>

      {/* Floating Editorial Card (Floom Inspired) */}
      <div className="relative z-20 w-[95%] sm:w-[90%] max-w-lg lg:max-w-xl bg-card p-8 sm:p-10 md:p-14 lg:mt-0 shadow-2xl border border-border/50 animate-in fade-in slide-in-from-bottom-12 duration-1000 ease-[cubic-bezier(0.2,1,0.3,1)] will-change-[transform,opacity]">
        
        <div className="inline-flex items-center gap-4 mb-8">
          <div className="w-12 h-[1px] bg-primary-600"></div>
          <span className="font-sans text-[10px] font-black uppercase tracking-[0.3em] text-primary-600 opacity-90">
            Establecimiento La Plata
          </span>
        </div>

        {/* Serif Typography for Editorial Feel */}
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-foreground mb-6">
          Transformamos <br className="hidden sm:block" />
          cada <span className="italic text-primary-600 font-medium">paso que das</span>
        </h1>

        <p className="font-sans text-muted-foreground text-sm md:text-base leading-relaxed mb-12 max-w-sm tracking-wide">
          Convertimos el desgaste del tiempo en durabilidad eterna. Especialistas en reparación técnica de calzado y artículos de cuero.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
          <a 
            href="https://wa.me/5492215547353" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-4 bg-primary text-primary-foreground px-8 py-5 rounded-sm font-sans text-[10px] md:text-xs font-black uppercase tracking-[0.25em] transition-all duration-500 hover:bg-foreground w-full sm:w-auto"
          >
            Consultar Ahora
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          
        </div>
      </div>

      {/* Decorative Technical Trace / Signature */}
      <div className="absolute bottom-12 right-10 z-10 hidden lg:flex flex-col items-center gap-4 animate-in fade-in duration-1000 delay-500">
        <div className="w-[1px] h-24 bg-white/20"></div>
        <span 
          className="font-sans text-[8px] font-bold text-white/40 tracking-[0.5em] uppercase" 
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          El arte de restaurar
        </span>
      </div>
    </div>
  );
};

export default Hero;
