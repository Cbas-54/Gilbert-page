import { useState, useMemo, useEffect } from 'react';
import { Search, Filter, ChevronRight, Loader2 } from 'lucide-react';
import { CATEGORIES, fetchProducts } from '../services/productService';

const ProductsPage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const data = await fetchProducts();
      setAllProducts(data);
      setIsLoading(false);
    };
    loadData();
  }, []);

  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      const matchCategory = activeCategory === 'Todos' || product.category === activeCategory;
      const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [allProducts, activeCategory, searchQuery]);

  return (
    <div className="pt-32 pb-20 bg-neutral-beige min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3">
              <div className="w-8 h-px bg-primary-600"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-600">Tienda Multi-rubro & Deportes</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif italic text-dark-deep leading-[0.9]">
              Nuestra Tienda
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Buscar producto..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-dark-deep/5 border-none rounded-full py-4 px-8 pl-14 text-xs font-sans text-dark-deep w-full md:w-[250px] focus:ring-2 focus:ring-primary-600 transition-all outline-none"
              />
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-deep/30 group-focus-within:text-primary-600 transition-colors" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Sidebar Filter - Left (3 Columns) */}
          <aside className="lg:col-span-3 space-y-12">
            <div className="bg-white/50 backdrop-blur-sm border border-dark-deep/5 p-8 rounded-sm space-y-10 sticky top-32">
              
              {/* Category Filter */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-dark-deep/5">
                  <Filter size={14} className="text-primary-600" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-dark-deep">Categorías</span>
                </div>
                <div className="flex flex-col gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`flex items-center justify-between group py-2 text-left transition-all duration-300
                        ${activeCategory === cat ? 'text-primary-600 pl-2' : 'text-dark-deep/50 hover:text-dark-deep'}`}
                    >
                      <span className="text-sm font-sans font-bold uppercase tracking-widest">{cat}</span>
                      <ChevronRight size={14} className={`transition-all duration-300 ${activeCategory === cat ? 'opacity-100' : 'opacity-0 -translate-x-2'}`} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid - Right (9 Columns) */}
          <main className="lg:col-span-9">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-40 gap-4">
                <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-dark-deep/40">Sincronizando Stock...</span>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="group flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="aspect-[3/4] bg-dark-deep/5 rounded-sm overflow-hidden relative border border-dark-deep/5">
                      {product.image ? (
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black uppercase tracking-[0.3em] text-dark-deep/10 p-6 text-center">
                          {product.name}
                        </div>
                      )}
                      
                      <div className="absolute inset-0 bg-dark-deep/0 transition-all duration-500 group-hover:bg-dark-deep/40 flex items-center justify-center">
                        <button className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 bg-white text-dark-deep px-6 py-3 text-[9px] font-black uppercase tracking-widest transition-all duration-500 hover:bg-primary-600 hover:text-white">
                          Ver Detalle
                        </button>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[8px] font-sans font-black uppercase tracking-widest text-primary-600">{product.tag || 'Calidad Gilbert'}</span>
                      <h3 className="font-serif text-xl text-dark-deep">{product.name}</h3>
                      <p className="font-serif text-lg italic text-dark-deep/60">${product.price.toLocaleString('es-AR')}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center border-t border-dark-deep/5 space-y-6">
                <h2 className="font-serif text-3xl italic text-dark-deep/30">No encontramos lo que buscás</h2>
                <p className="text-sm font-sans text-dark-deep/40 uppercase tracking-[0.3em]">Intentá con otra categoría o palabra clave</p>
              </div>
            )}
            
            {!isLoading && (
              <div className="mt-20 py-20 border-t border-dark-deep/5 text-center space-y-6">
                <h2 className="font-serif text-3xl italic text-dark-deep/30">Nuevas piezas próximamente</h2>
                <p className="text-sm font-sans text-dark-deep/40 uppercase tracking-[0.3em]">Cargando catálogo completo de 2026</p>
              </div>
            )}
          </main>

        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
