import { Filter, ChevronRight } from 'lucide-react';
import { CATEGORIES } from '../../../services/productService';

const ProductSidebar = ({ activeCategory, setActiveCategory }) => {
  return (
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
  );
};

export default ProductSidebar;
