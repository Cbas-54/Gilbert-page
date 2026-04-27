import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Loader2 } from 'lucide-react';
import { fetchProducts, CATEGORIES } from '../services/productService';
import ProductCard from '../components/features/products/ProductCard';
import ProductSidebar from '../components/features/products/ProductSidebar';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlCategory = searchParams.get('categoria');
  const urlSub = searchParams.get('sub');
  
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Sync internal state when URL changes
  useEffect(() => {
    if (urlCategory) {
      const match = CATEGORIES.find(c => c.toLowerCase() === urlCategory.toLowerCase());
      if (match) setActiveCategory(match);
    } else {
      setActiveCategory('Todos');
    }
    
    if (urlSub) {
      setActiveSubcategory(urlSub.charAt(0).toUpperCase() + urlSub.slice(1).toLowerCase());
    } else {
      setActiveSubcategory(null);
    }
  }, [urlCategory, urlSub]);

  // Helper function to update URL and State
  const handleCategoryChange = (cat, sub = null) => {
    const params = new URLSearchParams(searchParams);
    if (cat === 'Todos') {
      params.delete('categoria');
      params.delete('sub');
    } else {
      params.set('categoria', cat.toLowerCase());
      if (sub) {
        params.set('sub', sub.toLowerCase());
      } else {
        params.delete('sub');
      }
    }
    setSearchParams(params, { replace: true });
  };

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
      const matchSub = !activeSubcategory || (product.subcategory && product.subcategory.toLowerCase() === activeSubcategory.toLowerCase());
      const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchCategory && matchSub && matchSearch;
    });
  }, [allProducts, activeCategory, activeSubcategory, searchQuery]);

  return (
    <div className="pt-32 pb-20 bg-card min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3">
              <div className="w-8 h-px bg-primary-600"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-600">Cuidado Artesanal & Equipamiento de Calidad</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif italic text-foreground leading-[0.9]">
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
                className="bg-muted border-none rounded-full py-4 px-8 pl-14 text-xs font-sans text-foreground w-full md:w-[250px] focus:ring-2 focus:ring-primary-600 transition-all outline-none"
              />
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary-600 transition-colors" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          <ProductSidebar 
            activeCategory={activeCategory} 
            activeSubcategory={activeSubcategory}
            onSelectCategory={handleCategoryChange} 
          />

          {/* Product Grid - Right (9 Columns) */}
          <main className="lg:col-span-9">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-40 gap-4">
                <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">Sincronizando Stock...</span>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center border-t border-border space-y-6">
                <h2 className="font-serif text-3xl italic text-muted-foreground">No encontramos lo que buscás</h2>
                <p className="text-sm font-sans text-muted-foreground uppercase tracking-[0.3em]">Intentá con otra categoría o palabra clave</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
