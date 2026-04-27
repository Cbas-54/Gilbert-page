import { useState } from 'react';
import { Filter, ChevronRight } from 'lucide-react';
import { CATEGORIES, SUBCATEGORIES } from '../../../services/productService';

const ProductSidebar = ({ activeCategory, activeSubcategory, onSelectCategory }) => {
  return (
    <aside className="lg:col-span-3 space-y-12">
      <div className="bg-muted p-8 rounded-xl space-y-10 sticky top-32 border-none">
        {/* Category Filter */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-border">
            <Filter size={14} className="text-primary-600" />
            <span className="text-[10px] font-black uppercase tracking-widest text-foreground">Categorías</span>
          </div>
          <div className="flex flex-col gap-2">
            {CATEGORIES.map((cat) => {
              const hasSubcategories = SUBCATEGORIES[cat] && SUBCATEGORIES[cat].length > 0;
              const isCatActive = activeCategory === cat;
              
              return (
                <div key={cat} className="space-y-1">
                  <button
                    onClick={() => onSelectCategory(cat, null)}
                    className={`flex w-full items-center justify-between group py-2 text-left transition-all duration-300
                      ${isCatActive ? 'text-primary-600 pl-2' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    <span className="text-sm font-sans font-bold uppercase tracking-widest">{cat}</span>
                    <ChevronRight size={14} className={`transition-transform duration-300 ${isCatActive ? (hasSubcategories ? 'rotate-90 text-primary-600' : 'text-primary-600 opacity-100') : 'opacity-0 -translate-x-2'}`} />
                  </button>
                  
                  {/* Subcategories Rendering */}
                  {hasSubcategories && isCatActive && (
                    <div className="pl-4 flex flex-col gap-2 mt-2 border-l border-border ml-2 animate-in slide-in-from-top-2 fade-in duration-300">
                      {SUBCATEGORIES[cat].map(sub => {
                        const isSubActive = activeSubcategory && activeSubcategory.toLowerCase() === sub.toLowerCase();
                        
                        return (
                          <button
                            key={sub}
                            onClick={() => onSelectCategory(cat, sub)}
                            className={`text-[11px] text-left uppercase font-black tracking-[0.2em] transition-all duration-300
                              ${isSubActive ? 'text-foreground pl-1 before:content-["—"] before:mr-2 before:text-primary-600' : 'text-muted-foreground hover:text-foreground'}
                            `}
                          >
                            {sub}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ProductSidebar;
