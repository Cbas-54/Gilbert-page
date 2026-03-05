import { Search, Menu, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const categories = [
    { name: 'Zapatos', href: '#' },
    { name: 'Botines', href: '#' },
    { name: 'Guantes de Box', href: '#' },
    { name: 'Mochilas', href: '#' },
    { name: 'Pelotas', href: '#' },
    { name: 'Otros Accesorios', href: '#' },
  ];

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToSection = (id) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 120; // Clearance for floating navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-7xl">
      <div className="bg-white/80 backdrop-blur-xl border border-neutral-200 rounded-[2rem] shadow-lg px-6 md:px-10 h-20 flex items-center justify-between relative">
        
        {/* Compact Logo */}
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3 group text-left">
          <div className="w-10 h-10 bg-dark-deep flex items-center justify-center text-white font-black text-xl rounded-xl transition-all group-hover:bg-primary-600 group-hover:rotate-12">
            G
          </div>
          <div className="flex flex-col -space-y-1">
            <span className="text-xl font-black text-dark-deep uppercase tracking-tighter">
              Gilbert
            </span>
            <span className="text-[9px] font-black text-primary-600 uppercase tracking-widest">
              Composturas
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-10">
          <nav className="flex items-center gap-8">
            <button 
              onClick={() => scrollToSection('servicios')} 
              className="text-[11px] font-black uppercase tracking-widest text-dark-deep hover:text-primary-600 transition-colors"
            >
              Servicios
            </button>
            <button 
              onClick={() => scrollToSection('ubicacion')} 
              className="text-[11px] font-black uppercase tracking-widest text-dark-deep hover:text-primary-600 transition-colors"
            >
              Ubicación
            </button>
            <button 
              onClick={() => scrollToSection('contacto')} 
              className="text-[11px] font-black uppercase tracking-widest text-dark-deep hover:text-primary-600 transition-colors"
            >
              Contacto
            </button>
          </nav>
          
          <div className="w-px h-6 bg-neutral-200"></div>

          {/* Search */}
          <div className="relative group">
            <input 
              type="text" 
              placeholder="BUSCAR..." 
              className="w-32 bg-neutral-50 border border-neutral-200 rounded-full py-2 px-4 text-[10px] font-black uppercase tracking-widest outline-none transition-all focus:w-48 focus:border-primary-500/50"
            />
            <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary-600 transition-colors" />
          </div>

          {/* Hamburger Menu Trigger for Dropdown */}
          <div className="relative" ref={menuRef}>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-12 h-12 bg-dark-deep text-white rounded-2xl flex items-center justify-center hover:bg-primary-600 transition-all duration-300 relative overflow-hidden"
            >
              <div className={`transition-all duration-500 ${isMenuOpen ? '-translate-y-10 rotate-180 opacity-0' : 'translate-y-0 opacity-100'}`}>
                <Menu size={20} />
              </div>
              <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isMenuOpen ? 'translate-y-0 opacity-100 rotate-0' : 'translate-y-10 rotate-180 opacity-0'}`}>
                <X size={20} />
              </div>
            </button>

            {/* Compact Dropdown Rectangle */}
            {isMenuOpen && (
              <div className="absolute top-14 right-0 w-64 bg-white border border-neutral-200 rounded-2xl shadow-2xl py-4 animate-in fade-in zoom-in-95 duration-200 origin-top-right z-[60]">
                <nav className="flex flex-col">
                  {categories.map((cat, idx) => (
                    <a 
                      key={idx} 
                      href={cat.href} 
                      className="px-6 py-3 text-[11px] font-black text-dark-deep hover:text-primary-600 hover:bg-neutral-50 transition-all uppercase tracking-widest flex items-center gap-3 group"
                    >
                      <span className="w-1.5 h-1.5 bg-neutral-200 rounded-full group-hover:bg-primary-600 transition-colors shrink-0"></span>
                      {cat.name}
                    </a>
                  ))}
                </nav>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-3 bg-neutral-50 rounded-xl text-dark-deep"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-24 left-0 w-full bg-white/95 backdrop-blur-2xl rounded-3xl border border-neutral-200 shadow-2xl p-6 animate-in slide-in-from-top-10 duration-500">
          <nav className="flex flex-col gap-2">
            {categories.map((cat, idx) => (
              <a 
                key={idx} 
                href={cat.href} 
                className="text-[11px] font-black text-dark-deep hover:text-primary-600 transition-all uppercase tracking-widest flex items-center gap-4 group bg-neutral-50 p-4 rounded-xl border border-transparent hover:border-neutral-200"
              >
                <span className="w-1.5 h-1.5 bg-neutral-300 rounded-full group-hover:bg-primary-600 transition-colors"></span>
                {cat.name}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
