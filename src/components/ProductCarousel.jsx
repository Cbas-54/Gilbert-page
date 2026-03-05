import { useReducer, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Star, ArrowRight } from 'lucide-react';

const products = [
  { id: 1, name: 'Zapatos de Vestir', category: 'Reparación Premium', price: 'Consultar', isHot: true },
  { id: 2, name: 'Botines de Trabajo', category: 'Suela Reforzada', price: 'Consultar' },
  { id: 3, name: 'Guantes de Box', category: 'Costura y Relleno', price: 'Consultar', isHot: true },
  { id: 4, name: 'Mochilas Escolares', category: 'Cambio de Cierres', price: 'Consultar' },
  { id: 5, name: 'Pelotas de Fútbol', category: 'Parche y Válvula', price: 'Consultar' },
  { id: 6, name: 'Zapatillas Deportivas', category: 'Pegado y Limpieza', price: 'Consultar', isHot: true },
  { id: 7, name: 'Carteras de Cuero', category: 'Limpieza y Teñido', price: 'Consultar' },
  { id: 8, name: 'Cinturones', category: 'Ajuste y Hebillas', price: 'Consultar' },
];

const cardsToShow = 4;

const carouselReducer = (state, action) => {
  switch (action.type) {
    case 'NEXT':
      return { currentIndex: (state.currentIndex + 1) % (products.length - cardsToShow + 1) };
    case 'PREV':
      return { 
        currentIndex: state.currentIndex === 0 
          ? products.length - cardsToShow 
          : state.currentIndex - 1 
      };
    default:
      return state;
  }
};

const ProductCarousel = () => {
  const [state, dispatch] = useReducer(carouselReducer, { currentIndex: 0 });

  const handleNext = useCallback(() => dispatch({ type: 'NEXT' }), []);
  const handlePrev = useCallback(() => dispatch({ type: 'PREV' }), []);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary-50 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-sm font-bold text-primary-600 uppercase tracking-widest mb-2 flex items-center">
              <span className="w-8 h-px bg-primary-600 mr-3"></span>
              Nuestra Especialidad
            </h2>
            <h3 className="text-3xl md:text-5xl font-black text-dark-950 font-serif">Servicios <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-700">Recomendados</span></h3>
          </div>
          
          {/* Navigation Controls Desktop */}
          <div className="hidden md:flex space-x-3">
            <button 
              onClick={handlePrev}
              disabled={state.currentIndex === 0}
              className={`p-3 rounded-full border transition-all ${
                state.currentIndex === 0 
                  ? 'border-neutral-200 text-neutral-400 cursor-not-allowed bg-neutral-50' 
                  : 'border-neutral-300 text-dark-950 bg-white hover:bg-primary-50 hover:border-primary-500 hover:text-primary-600 active:scale-95 shadow-sm'
              }`}
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={handleNext}
              disabled={state.currentIndex === products.length - cardsToShow}
              className={`p-3 rounded-full border transition-all ${
                state.currentIndex === products.length - cardsToShow 
                  ? 'border-neutral-200 text-neutral-400 cursor-not-allowed bg-neutral-50' 
                  : 'border-neutral-300 text-dark-950 bg-white hover:bg-primary-50 hover:border-primary-500 hover:text-primary-600 active:scale-95 shadow-sm'
              }`}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="overflow-hidden bg-neutral-50/50 border border-neutral-200 rounded-3xl p-6 shadow-xl shadow-neutral-200/50">
          <div 
            className="flex transition-transform duration-500 ease-out"
            style={{ 
              transform: `translateX(-${state.currentIndex * (100 / cardsToShow)}%)` 
            }}
          >
            {products.map((product) => (
              <div 
                key={product.id} 
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex-shrink-0 px-3"
              >
                <div className="group h-full bg-white border border-neutral-200 rounded-2xl overflow-hidden hover:border-primary-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-neutral-300/50 hover:-translate-y-1 relative flex flex-col">
                  
                  {/* Card Header Pattern (No Image) */}
                  <div className="h-48 bg-neutral-100 relative overflow-hidden flex items-center justify-center border-b border-neutral-100">
                    <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-300 via-neutral-100 to-white"></div>
                    <div className="w-16 h-16 rounded-full border border-neutral-300 flex items-center justify-center text-dark-950 group-hover:scale-110 transition-transform bg-white shadow-sm group-hover:shadow-md group-hover:text-primary-600 group-hover:border-primary-200">
                      <span className="font-bold text-2xl">{product.name.charAt(0)}</span>
                    </div>
                    {product.isHot && (
                      <div className="absolute top-3 right-3 bg-dark-950 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase flex items-center shadow-md">
                        <Star size={12} className="mr-1.5 fill-primary-500 text-primary-500" />
                        Destacado
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="text-xs font-bold text-primary-600 uppercase tracking-wider mb-2">{product.category}</div>
                    <h4 className="text-lg font-black text-dark-950 mb-4 group-hover:text-primary-600 transition-colors leading-tight">{product.name}</h4>
                    
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-neutral-100">
                      <span className="text-sm font-bold text-neutral-500">{product.price}</span>
                      <button className="text-dark-950 hover:text-white transition-colors p-2 bg-neutral-100 rounded-full group-hover:bg-primary-600">
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Mobile Navigation Controls */}
        <div className="flex justify-center mt-8 space-x-4 md:hidden">
            <button 
              onClick={handlePrev}
              disabled={state.currentIndex === 0}
              className={`p-4 rounded-full border transition-all ${
                state.currentIndex === 0 
                  ? 'border-neutral-200 text-neutral-400 cursor-not-allowed bg-neutral-50' 
                  : 'border-neutral-300 text-dark-950 bg-white active:scale-95 shadow-sm'
              }`}
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={handleNext}
              disabled={state.currentIndex === products.length - cardsToShow}
              className={`p-4 rounded-full border transition-all ${
                state.currentIndex === products.length - cardsToShow 
                  ? 'border-neutral-200 text-neutral-400 cursor-not-allowed bg-neutral-50' 
                  : 'border-neutral-300 text-dark-950 bg-white active:scale-95 shadow-sm'
              }`}
            >
              <ChevronRight size={24} />
            </button>
          </div>
      </div>
    </section>
  );
};

export default ProductCarousel;
