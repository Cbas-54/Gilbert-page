import { ArrowRight } from 'lucide-react';
import heroImage from '../../../assets/hero-workshop.png';

const Hero = () => {
  return (
    <div id="home" className="relative w-full min-h-screen flex flex-col items-center lg:items-start justify-center pt-32 sm:pt-40 lg:pt-28 lg:pb-8 lg:pl-[10%] xl:pl-[15%] overflow-hidden bg-dark-rich">
      
      {/* Full Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={heroImage} 
          alt="Taller artesanal de reparación de calzado" 
          fetchpriority="high"
          width="1920"
          height="1080"
          className="w-full h-full object-cover object-center grayscale-[20%] brightness-[0.7] contrast-125 transition-transform duration-[20s] ease-out hover:scale-105"
        />
        {/* Subtle overlay to ensure text legibility if card was transparent, and add mood */}
        <div className="absolute inset-0 bg-dark-deep/20 mix-blend-multiply"></div>
      </div>

      {/* Floating Editorial Card (Floom Inspired) */}
      <div className="relative z-20 w-[95%] sm:w-[90%] max-w-lg lg:max-w-xl bg-neutral-beige p-8 sm:p-10 md:p-14 lg:mt-0 shadow-2xl border border-white/50 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        
        <div className="inline-flex items-center gap-4 mb-8">
          <div className="w-12 h-[1px] bg-primary-600"></div>
          <span className="font-sans text-[10px] font-black uppercase tracking-[0.3em] text-primary-600 opacity-90">
            Establecimiento La Plata
          </span>
        </div>

        {/* Serif Typography for Editorial Feel */}
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-dark-deep mb-6">
          Revive tu <br className="hidden sm:block" />
          <span className="italic text-primary-600 font-medium">pasión</span>
        </h1>

        <p className="font-sans text-neutral-600 text-sm md:text-base leading-relaxed mb-12 max-w-sm tracking-wide">
          Transformamos el desgaste del tiempo en durabilidad eterna. Especialistas en reparación técnica de calzado y artículos de cuero.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
          <a 
            href="https://wa.me/542211234567" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-4 bg-primary-600 text-neutral-soft px-8 py-5 rounded-sm font-sans text-[10px] md:text-xs font-black uppercase tracking-[0.25em] transition-all duration-500 hover:bg-dark-deep w-full sm:w-auto"
          >
            Consultar Ahora
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          
          <div className="hidden sm:flex flex-col items-start px-2">
            <span className="font-sans text-[9px] font-black uppercase tracking-widest text-neutral-400">Desde</span>
            <span className="font-serif text-lg italic text-dark-rich leading-none">2026</span>
          </div>
        </div>
      </div>

      {/* Decorative Technical Trace / Signature */}
      <div className="absolute bottom-12 right-10 z-10 hidden lg:flex flex-col items-center gap-4 animate-in fade-in duration-1000 delay-500">
        <div className="w-[1px] h-24 bg-white/20"></div>
        <span 
          className="font-sans text-[8px] font-bold text-white/40 tracking-[0.5em] uppercase" 
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          Artisanal Trace // 01
        </span>
      </div>
    </div>
  );
};

export default Hero;
