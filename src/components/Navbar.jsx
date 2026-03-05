import { Search, Menu, X, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const categories = [
    { name: 'Zapatos', href: '#' },
    { name: 'Botines', href: '#' },
    { name: 'Guantes de Box', href: '#' },
    { name: 'Mochilas', href: '#' },
    { name: 'Pelotas', href: '#' },
    { name: 'Otros Accesorios', href: '#' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-neutral-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center group cursor-pointer border-l-4 border-primary-600 pl-3 transition-all duration-300 hover:border-dark-950">
            <Link to="/" className="flex flex-col">
              <span className="text-xl md:text-2xl font-black text-dark-950 uppercase tracking-wider group-hover:text-primary-600 transition-colors">
                Composturas
              </span>
              <span className="text-sm md:text-base font-bold text-primary-600 uppercase tracking-widest group-hover:text-dark-950 transition-colors">
                Gilbert
              </span>
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md items-center mx-8">
            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400 group-focus-within:text-primary-600 transition-colors">
                <Search size={18} />
              </div>
              <input 
                type="text" 
                placeholder="Buscar zapatos, mochilas..." 
                className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-full bg-neutral-100 text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-300"
              />
            </div>
          </div>

          {/* Actions - Desktop */}
          <div className="hidden md:flex items-center space-x-6 relative">
            
            {/* Hamburger Menu Trigger */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center space-x-2 text-neutral-700 hover:text-dark-950 transition-colors p-2 rounded-lg hover:bg-neutral-100 active:scale-95 duration-200"
            >
              <span className="font-semibold tracking-wide">Categorías</span>
              <div className="p-1.5 bg-dark-950 text-white rounded-md transition-colors hover:bg-primary-600">
                 {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </div>
            </button>

             {/* Mega Menu Dropdown */}
            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-4 w-64 bg-white border border-neutral-200 rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
                <div className="p-4 border-b border-neutral-100 flex items-center space-x-2 text-dark-950 bg-neutral-50">
                  <ShoppingBag size={18} className="text-primary-600" />
                  <span className="font-black uppercase text-sm tracking-wider">Productos</span>
                </div>
                <div className="py-2">
                  {categories.map((category) => (
                    <a
                      key={category.name}
                      href={category.href}
                      className="block px-6 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50 hover:text-primary-600 transition-colors relative group"
                    >
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-4 bg-primary-600 rounded-r transition-all duration-300 group-hover:w-1"></span>
                      {category.name}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-neutral-800 hover:text-primary-600 p-2"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white absolute w-full left-0 animate-in slide-in-from-top-2 duration-200 shadow-xl">
          <div className="px-4 pt-4 pb-6 space-y-4">
             <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                <Search size={18} />
              </div>
              <input 
                type="text" 
                placeholder="Buscar..." 
                className="block w-full pl-10 pr-3 py-3 border border-neutral-300 rounded-lg bg-neutral-50 text-neutral-900 focus:outline-none focus:border-primary-500"
              />
            </div>
            <div className="pt-2">
              <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3 px-2">Categorías</h3>
              <div className="space-y-1">
                {categories.map((category) => (
                  <a
                    key={category.name}
                    href={category.href}
                    className="block px-3 py-3 text-base font-semibold text-neutral-700 hover:bg-neutral-100 hover:text-primary-600 rounded-lg transition-colors border-l-2 border-transparent hover:border-primary-600"
                  >
                    {category.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
