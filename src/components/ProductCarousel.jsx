import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, CornerDownRight } from 'lucide-react';

const products = [
  { id: 1, name: 'Reparación de Botines', category: 'DEPORTE', price: 'Dsd $15k', icon: '⚽' },
  { id: 2, name: 'Cambio de Suelas', category: 'CLÁSICO', price: 'Dsd $25k', icon: '👞' },
  { id: 3, name: 'Restauración de Guantes', category: 'BOXEO', price: 'Dsd $12k', icon: '🥊' },
  { id: 4, name: 'Costura de Mochilas', category: 'ACCESORIOS', price: 'Dsd $10k', icon: '🎒' },
  { id: 5, name: 'Mantenimiento de Pelotas', category: 'DEPORTE', price: 'Dsd $8k', icon: '🥎' },
  { id: 6, name: 'Teñido de Cuero', category: 'CLÁSICO', price: 'Dsd $20k', icon: '🎨' },
  { id: 7, name: 'Cambio de Cierres', category: 'ACCESORIOS', price: 'Dsd $9k', icon: '🤐' },
  { id: 8, name: 'Limpieza Premium', category: 'ESTÉTICA', price: 'Dsd $15k', icon: '✨' },
];

const ProductCarousel = () => {
  const itemsToShow = 4;
  const extendedProducts = [
    ...products.slice(-itemsToShow),
    ...products,
    ...products.slice(0, itemsToShow),
  ];

  const [currentIndex, setCurrentIndex] = useState(itemsToShow);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [direction, setDirection] = useState(null);
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const containerRef = useRef(null);

  const handleNext = () => {
    if (direction) return;
    setDirection('next');
    setCurrentIndex(prev => prev + 1);
  };

  const handlePrev = () => {
    if (direction) return;
    setDirection('prev');
    setCurrentIndex(prev => prev - 1);
  };

  useEffect(() => {
    if (currentIndex === extendedProducts.length - itemsToShow) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(itemsToShow);
      }, 700);
    } else if (currentIndex === 0) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(products.length);
      }, 700);
    }
  }, [currentIndex, extendedProducts.length, itemsToShow, products.length]);

  useEffect(() => {
    if (!isTransitioning) {
      setTimeout(() => {
        setIsTransitioning(true);
        setDirection(null);
      }, 50);
    }
  }, [isTransitioning]);

  useEffect(() => {
    if (direction) {
      const timer = setTimeout(() => setDirection(null), 700);
      return () => clearTimeout(timer);
    }
  }, [direction]);

  return (
    <section id="servicios" className="py-20 md:py-32 bg-neutral-warm relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent opacity-30"></div>
      <div className="boutique-container relative">
        
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-black text-dark-deep uppercase tracking-[0.2em] leading-none mb-4">
            SERVICIOS
          </h2>
          <div className="w-16 h-1.5 bg-primary-600 mx-auto rounded-full"></div>
        </div>

        <div className="relative group mx-auto max-w-[1400px]">
          
          <button 
            onClick={handlePrev}
            disabled={!!direction}
            className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-30 w-16 h-16 bg-white border border-neutral-200 rounded-full flex items-center justify-center text-dark-deep hover:bg-dark-deep hover:text-white transition-all shadow-xl active:scale-95 disabled:opacity-50"
          >
            <ChevronLeft size={28} />
          </button>
          
          <button 
            onClick={handleNext}
            disabled={!!direction}
            className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-30 w-16 h-16 bg-white border border-neutral-200 rounded-full flex items-center justify-center text-dark-deep hover:bg-dark-deep hover:text-white transition-all shadow-xl active:scale-95 disabled:opacity-50"
          >
            <ChevronRight size={28} />
          </button>

          <div className="overflow-hidden p-6 -m-6">
            <div 
              ref={containerRef}
              className={`flex ${isTransitioning ? 'transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]' : ''}`}
              style={{ 
                transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
              }}
            >
              {extendedProducts.map((product, idx) => {
                const isLeaving = (direction === 'next' && idx === currentIndex - 1) || (direction === 'prev' && idx === currentIndex + itemsToShow);
                const isEntering = (direction === 'next' && idx === currentIndex + itemsToShow - 1) || (direction === 'prev' && idx === currentIndex);
                
                const isHovered = hoveredCardId === `${product.id}-${idx}`;
                const anyCardHovered = hoveredCardId !== null;

                return (
                  <div 
                    key={`${product.id}-${idx}`} 
                    onMouseEnter={() => setHoveredCardId(`${product.id}-${idx}`)}
                    onMouseLeave={() => setHoveredCardId(null)}
                    className={`min-w-full sm:min-w-[50%] lg:min-w-[25%] px-4 py-8 transition-all duration-700
                      ${isLeaving ? 'scale-50 opacity-0 blur-lg transition-all' : 'scale-100 opacity-100 blur-0'}
                      ${isEntering ? 'animate-in fade-in zoom-in-50 duration-700' : ''}
                      ${anyCardHovered && !isHovered ? 'opacity-30 scale-[0.95] blur-[2px]' : 'opacity-100 scale-100 blur-0'}
                    `}
                  >
                    <div className={`
                      bg-white h-full rounded-[3rem] p-10 border border-neutral-100 shadow-sm 
                      transition-all duration-500 group cursor-pointer relative overflow-hidden flex flex-col justify-between min-h-[340px]
                      ${isHovered ? 'shadow-[0_20px_60px_-15px_rgba(220,38,38,0.2)] border-primary-100 -translate-y-4' : ''}
                    `}>
                      {/* Premium Decorative Elements */}
                      <div className={`
                        absolute -right-6 -bottom-6 w-32 h-32 bg-neutral-50 rounded-full 
                        transition-all duration-700 blur-3xl group-hover:bg-primary-50 group-hover:scale-150
                      `}></div>
                      
                      {/* Floating Ghost Icon on Hover */}
                      <div className={`
                        absolute right-6 top-8 text-7xl opacity-0 transition-all duration-700 pointer-events-none rotate-12
                        ${isHovered ? 'opacity-5 translate-y-4 -rotate-12 scale-150' : ''}
                      `}>
                        {product.icon}
                      </div>

                      <div className="space-y-8 relative z-10">
                        {/* Icon Container with Glassmorphism */}
                        <div className={`
                          w-16 h-16 bg-neutral-50 rounded-2xl flex items-center justify-center text-3xl 
                          transition-all duration-500 shadow-inner group-hover:bg-white group-hover:shadow-lg group-hover:rotate-12 group-hover:scale-110
                          ${isHovered ? 'text-primary-600' : ''}
                        `}>
                          {product.icon}
                        </div>
                        
                        <div>
                          <div className="inline-block px-3 py-1 bg-neutral-50 rounded-full mb-3 group-hover:bg-primary-50 transition-colors">
                            <span className="text-[9px] font-black text-primary-600 tracking-[0.2em] uppercase opacity-70">
                              {product.category}
                            </span>
                          </div>
                          <h4 className="text-2xl font-black text-dark-deep leading-[1.1] uppercase tracking-tighter group-hover:text-primary-600 transition-colors">
                            {product.name}
                          </h4>
                        </div>
                      </div>

                      <div className="pt-8 border-t border-neutral-50 flex items-center justify-between mt-auto">
                        <div className="flex flex-col">
                          <span className="text-[9px] font-black text-neutral-400 uppercase tracking-widest mb-1">Precio base</span>
                          <span className="text-sm font-black text-dark-deep uppercase tracking-tighter">{product.price}</span>
                        </div>
                        <div className={`
                          w-12 h-12 rounded-2xl bg-dark-deep text-white flex items-center justify-center 
                          transition-all duration-500 transform
                          ${isHovered ? 'scale-110 bg-primary-600 rotate-0' : 'scale-50 opacity-0 -rotate-45'}
                        `}>
                          <CornerDownRight size={22} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <button className="text-[11px] font-black uppercase tracking-[0.5em] text-neutral-400 hover:text-primary-600 transition-all hover:tracking-[0.6em] group">
            <span className="relative">
              Ver catálogo completo
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-primary-600 transition-all group-hover:w-full"></span>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;
