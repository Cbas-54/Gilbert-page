import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, CornerDownRight } from 'lucide-react';

const products = [
  { id: 1, name: 'Reparación de Botines', category: 'DEPORTE', price: 'Desde $15k', icon: '⚽' },
  { id: 2, name: 'Cambio de Suelas', category: 'CLÁSICO', price: 'Desde $25k', icon: '👞' },
  { id: 3, name: 'Restauración de Guantes', category: 'BOXEO', price: 'Desde $12k', icon: '🥊' },
  { id: 4, name: 'Costura de Mochilas', category: 'ACCESORIOS', price: 'Desde $10k', icon: '🎒' },
  { id: 5, name: 'Mantenimiento de Pelotas', category: 'DEPORTE', price: 'Desde $8k', icon: '🥎' },
  { id: 6, name: 'Teñido de Cuero', category: 'CLÁSICO', price: 'Desde $20k', icon: '🎨' },
  { id: 7, name: 'Cambio de Cierres', category: 'ACCESORIOS', price: 'Desde $9k', icon: '🤐' },
  { id: 8, name: 'Limpieza Premium', category: 'ESTÉTICA', price: 'Desde $15k', icon: '✨' },
];

const DEFAULT_ICON = '👞';

const ProductCard = ({ product, isHovered, onHover, onLeave, anyCardHovered, isEntering, isLeaving }) => {
  const icon = product.icon ? product.icon : DEFAULT_ICON;
  
  return (
    <div 
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`h-full transition-all duration-700
        ${isLeaving ? 'scale-90 opacity-0' : 'scale-100 opacity-100'}
        ${isEntering ? 'animate-in fade-in zoom-in-[0.98] duration-700' : ''}
        ${anyCardHovered && !isHovered ? 'opacity-40 scale-[0.98]' : 'opacity-100 scale-100'}
      `}
    >
      <div className={`
        bg-white h-full rounded-sm p-8 md:p-12 border transition-all duration-500 group cursor-pointer relative overflow-hidden flex flex-col justify-between min-h-[320px] md:min-h-[400px]
        ${isHovered ? 'shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border-neutral-200 -translate-y-2' : 'border-transparent shadow-sm'}
      `}>
        {/* Subtle background gradient on hover */}
        <div className={`
          absolute inset-0 bg-gradient-to-br from-neutral-50 to-transparent opacity-0 transition-opacity duration-700 pointer-events-none
          ${isHovered ? 'opacity-100' : ''}
        `}></div>
        
        <div className={`
          absolute right-4 md:right-8 top-8 md:top-10 text-6xl md:text-8xl transition-all duration-700 pointer-events-none rotate-12
          ${isHovered ? 'opacity-[0.03] translate-y-4 -rotate-6 scale-125' : 'opacity-[0.01]'}
        `}>
          {icon}
        </div>

        <div className="space-y-6 md:space-y-10 relative z-10">
          <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 text-3xl md:text-4xl opacity-50 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110">
            {icon}
          </div>
          
          <div>
            <div className="mb-3 md:mb-4">
              <span className="font-sans text-[8px] md:text-[9px] font-bold text-primary-600 tracking-[0.3em] uppercase opacity-80">
                {product.category}
              </span>
            </div>
            <h4 className="font-serif text-2xl md:text-3xl text-dark-deep leading-[1.1] transition-colors duration-500 group-hover:text-primary-700">
              {product.name}
            </h4>
          </div>
        </div>

        <div className="pt-6 md:pt-10 border-t border-neutral-100 flex items-center justify-between mt-8 relative z-10">
          <div className="flex flex-col">
            <span className="font-sans text-[8px] md:text-[9px] font-bold text-neutral-400 uppercase tracking-[0.2em] mb-1">Precio base</span>
            <span className="font-serif text-sm md:text-base italic text-dark-deep tracking-wide">{product.price}</span>
          </div>
          <div className={`
            w-8 h-8 md:w-10 md:h-10 rounded-full border flex items-center justify-center transition-all duration-500
            ${isHovered ? 'bg-primary-600 border-primary-600 text-white translate-x-1' : 'bg-transparent border-neutral-200 text-neutral-400'}
          `}>
            <CornerDownRight size={16} className={`transition-transform duration-500 ${isHovered ? 'rotate-0' : '-rotate-45'}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

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
    <section id="servicios" className="relative bg-neutral-warm pb-24 md:pb-40 overflow-hidden">
      <div className="bg-grain"></div>
      
      {/* CREATIVE TRANSITION DIVIDER */}
      <div className="relative h-20 md:h-28 bg-dark-rich overflow-hidden">
        <div className="absolute inset-0 opacity-10 flex items-center justify-around whitespace-nowrap select-none pointer-events-none">
          {Array(10).fill('RESTAURACIÓN TÉCNICA · PRECISIÓN ARTESANAL · ').map((text, i) => (
            <span key={i} className="font-sans text-white text-[10px] font-bold uppercase tracking-[0.6em]">{text}</span>
          ))}
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary-700/50 to-transparent"></div>
      </div>

      <div className="boutique-container relative mt-24 md:mt-32">
        <div className="text-center mb-20 md:mb-32 flex flex-col items-center">
          <span className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-primary-600 mb-6 block">
            El Catálogo
          </span>
          <h2 className="font-serif text-5xl md:text-7xl italic text-dark-deep tracking-wide leading-none mb-8">
            Servicios
          </h2>
          <div className="w-[1px] h-16 bg-dark-deep/20 mx-auto"></div>
        </div>

        {/* MOBILE GRID LAYOUT (2 Columns) */}
        <div className="md:hidden grid grid-cols-2 gap-4 px-2">
          {products.map((product) => (
            <div key={product.id} className="h-full">
              <ProductCard 
                product={product}
                isHovered={hoveredCardId === product.id}
                onHover={() => setHoveredCardId(product.id)}
                onLeave={() => setHoveredCardId(null)}
                anyCardHovered={hoveredCardId !== null}
              />
            </div>
          ))}
        </div>

        {/* DESKTOP CAROUSEL LAYOUT */}
        <div className="hidden md:block relative group mx-auto max-w-[1400px]">
          <button 
            onClick={handlePrev}
            disabled={!!direction}
            className="absolute -left-12 top-1/2 -translate-y-1/2 z-30 w-16 h-16 bg-white border border-neutral-200 rounded-full flex items-center justify-center text-dark-deep hover:bg-dark-deep hover:text-white transition-all shadow-xl active:scale-95 disabled:opacity-50"
          >
            <ChevronLeft size={28} />
          </button>
          
          <button 
            onClick={handleNext}
            disabled={!!direction}
            className="absolute -right-12 top-1/2 -translate-y-1/2 z-30 w-16 h-16 bg-white border border-neutral-200 rounded-full flex items-center justify-center text-dark-deep hover:bg-dark-deep hover:text-white transition-all shadow-xl active:scale-95 disabled:opacity-50"
          >
            <ChevronRight size={28} />
          </button>

          <div className="overflow-hidden p-6 -m-6">
            <div 
              ref={containerRef}
              className={`flex ${isTransitioning ? 'transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]' : ''}`}
              style={{ 
                transform: `translateX(-${currentIndex * 25}%)`,
              }}
            >
              {extendedProducts.map((product, idx) => {
                const id = `${product.id}-${idx}`;
                const isLeaving = (direction === 'next' && idx === currentIndex - 1) || (direction === 'prev' && idx === currentIndex + itemsToShow);
                const isEntering = (direction === 'next' && idx === currentIndex + itemsToShow - 1) || (direction === 'prev' && idx === currentIndex);
                
                return (
                  <div key={id} className="min-w-[25%] px-4 py-8">
                    <ProductCard 
                      product={product}
                      isHovered={hoveredCardId === id}
                      onHover={() => setHoveredCardId(id)}
                      onLeave={() => setHoveredCardId(null)}
                      anyCardHovered={hoveredCardId !== null}
                      isEntering={isEntering}
                      isLeaving={isLeaving}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;
