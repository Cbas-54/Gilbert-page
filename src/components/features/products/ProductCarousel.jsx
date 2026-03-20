import { useState } from 'react';
import { ArrowRight, CornerDownRight, Tag, Zap } from 'lucide-react';

// Specialized Assets
import imgClassic from '../../../assets/service-classic.png';
import imgBoots from '../../../assets/service-boots.png';
import imgRestoration from '../../../assets/service-restoration.png';
import imgAccessories from '../../../assets/service-accessories.png';

const services = [
  {
    id: '01',
    shortTitle: 'Clásicos',
    title: 'Clásicos Oxford',
    category: 'Reparación Premium',
    price: '$12.500',
    image: imgClassic,
    description: 'Restauración integral de calzado formal. Suelas de cuero, tapas y lustrado artesanal.'
  },
  {
    id: '02',
    shortTitle: 'Botas',
    title: 'Botas & Borceguíes',
    category: 'Restauración Técnica',
    price: '$15.800',
    image: imgBoots,
    description: 'Tratamiento especializado para cueros pesados y calzado de montaña o trabajo.'
  },
  {
    id: '03',
    shortTitle: 'Accesorios',
    title: 'Guantes & Detalles',
    category: 'Cuidado Especializado',
    price: '$8.200',
    image: imgRestoration,
    description: 'Costura invisible y nutrición de cueros finos para accesorios de alta gama.'
  },
  {
    id: '04',
    shortTitle: 'Equipaje',
    title: 'Mochilas & Bolsos',
    category: 'Mantenimiento Industrial',
    price: '$18.500',
    image: imgAccessories,
    description: 'Reparación de herrajes, cierres y refuerzos estructurales en piezas de viaje.'
  }
];

const ProductCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="servicios" className="relative bg-card pt-10 lg:pt-14 pb-16 lg:pb-20 transition-colors duration-500">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        
        {/* TABBED HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 lg:mb-8 gap-12 border-b border-border pb-4 transition-colors duration-500">
          <div className="flex flex-col gap-2">
            <h2 className="font-serif text-5xl md:text-7xl italic text-foreground tracking-wide leading-none transition-colors duration-500">
              Servicios
            </h2>
            <span className="font-sans text-[10px] font-black uppercase tracking-[0.3em] text-primary-600 ml-1">
              Atelier Archive // 2026
            </span>
          </div>

          {/* Navigation Tabs (Mini-titles) */}
          <nav className="flex flex-wrap items-center gap-2">
            {services.map((service, index) => (
              <button
                key={service.id}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                className={`group relative px-6 py-3 rounded-full transition-all duration-500 flex items-center gap-3
                  ${activeIndex === index 
                    ? 'bg-foreground text-background' 
                    : 'bg-transparent text-muted-foreground hover:text-foreground hover:bg-foreground/5'}
                `}
              >
                <span className="font-serif italic text-xs text-primary-600 group-hover:text-primary-400">
                  {service.id}
                </span>
                <span className="font-sans text-[10px] font-bold uppercase tracking-widest">
                  {service.shortTitle}
                </span>
                {activeIndex === index && (
                  <div className="w-1.5 h-1.5 bg-primary-600 rounded-full animate-pulse"></div>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* SHOWCASE AREA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-stretch min-h-[500px] lg:min-h-[600px]">
          
          {/* Left: Interactive Details */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            {services.map((service, index) => (
              <div 
                key={`details-${service.id}`}
                className={`transition-all duration-700 ease-in-out
                  ${activeIndex === index 
                    ? 'opacity-100 translate-x-0 relative' 
                    : 'opacity-0 -translate-x-8 absolute pointer-events-none'}
                `}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Tag className="w-4 h-4 text-primary-600" />
                  <span className="font-sans text-[9px] font-black uppercase tracking-widest text-neutral-400">
                    {service.category}
                  </span>
                </div>
                
                <h3 className="font-serif text-4xl md:text-6xl text-foreground leading-tight mb-8 transition-colors duration-500">
                  {service.title}
                </h3>
                
                <p className="font-sans text-muted-foreground text-base md:text-lg leading-relaxed mb-10 max-w-sm transition-colors duration-500">
                  {service.description}
                </p>

                <div className="grid grid-cols-2 gap-8 pt-8 border-t border-border max-w-sm transition-colors duration-500">
                  <div>
                    <span className="block font-sans text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-2 transition-colors duration-500">Precio Base</span>
                    <span className="font-serif text-2xl text-foreground italic transition-colors duration-500">{service.price}</span>
                  </div>
                  <div className="flex flex-col justify-end">
                    <button className="flex items-center gap-2 group/btn font-sans text-[10px] font-bold uppercase tracking-widest text-primary-600 hover:text-foreground transition-colors">
                      Personalizar <CornerDownRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Large Illustration */}
          <div className="lg:col-span-8 relative rounded-sm overflow-hidden shadow-2xl bg-muted/50 h-[350px] md:h-[450px] lg:h-auto transition-colors duration-500">
            {services.map((service, index) => (
              <div
                key={`img-showcase-${service.id}`}
                className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out
                  ${activeIndex === index ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0'}
                `}
              >
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover grayscale-[20%] brightness-[0.85] contrast-105 aspect-square lg:aspect-auto"
                />

              </div>
            ))}
            
            {/* Corner Accent */}
            <div className="absolute top-8 right-8 z-20 flex flex-col items-end sm:flex-row sm:items-center gap-4">
               <div className="hidden sm:block h-[1px] w-12 bg-white/30"></div>
               <span className="font-sans text-[8px] font-black uppercase tracking-[0.4em] text-white/50">
                 Guilberth Workshop Detail
               </span>
            </div>

            {/* Floating Technical Tag */}
            <div className="absolute bottom-8 left-8 z-20">
               <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-sm flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary-600" />
                    <span className="font-sans text-[9px] font-black uppercase tracking-widest text-white leading-none">
                      Procesado en 48hs
                    </span>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Unified Call-to-Action */}
        <div className="mt-12 lg:mt-16 flex justify-center">
          <a 
            href="https://wa.me/542211234567"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center gap-8 md:gap-12 px-8 md:px-12 py-8 md:py-10 bg-foreground text-background rounded-full overflow-hidden hover:pr-24 transition-all duration-500 max-w-full"
          >
            <div className="relative z-10 flex flex-col items-start gap-1">
              <span className="font-serif text-2xl md:text-3xl italic leading-none">Consultar Presupuesto</span>
              <span className="font-sans text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-primary-600 pr-10 md:pr-16">
                Atención Personalizada en La Plata
              </span>
            </div>
            <div className="absolute right-6 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-primary-600 group-hover:border-primary-600 transition-all duration-500">
               <ArrowRight className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:translate-x-1" />
            </div>
          </a>
        </div>

      </div>
    </section>
  );
};

export default ProductCarousel;
