import { useState, useEffect } from 'react';
import { Menu, X, Search, ChevronRight } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Servicios', href: '#servicios' },
    { name: 'Ubicación', href: '#ubicacion' },
    { name: 'Contacto', href: '#contacto' },
  ];

  const categories = [
    'Reparación Calzado',
    'Cuidado Cuero',
    'Accesorios',
    'Teñido',
    'Bolsos y Maletas',
    'Catálogo Completo'
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 py-4 ${isScrolled ? 'md:px-12 lg:px-20' : ''}`}>
      <div className={`mx-auto bg-white/80 backdrop-blur-xl border border-neutral-200 shadow-lg rounded-full transition-all duration-500 ${isScrolled ? 'px-8 py-3' : 'px-10 py-5'}`}>
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={(e) => scrollToSection(e, '#home')}>
            <div className="w-10 h-10 bg-dark-deep rounded-2xl flex items-center justify-center text-white font-black text-xl group-hover:rotate-12 transition-transform duration-500">
              G
            </div>
            <div className="flex flex-col -space-y-1">
              <span className="text-xl font-black uppercase tracking-tighter text-dark-deep">Gilbert</span>
              <span className="text-[8px] font-black text-primary-600 uppercase tracking-widest leading-none">Composturas</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-12">
            <div className="flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-[11px] font-black uppercase tracking-[0.2em] text-dark-deep hover:text-primary-600 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Action Bar */}
            <div className="flex items-center gap-4 pl-8 border-l border-neutral-200">
              <div className="relative group/search">
                <input 
                  type="text" 
                  placeholder="BUSCAR..." 
                  className="bg-neutral-100 border-none rounded-full px-5 py-2 text-[10px] font-black tracking-widest focus:ring-1 focus:ring-primary-600 w-32 focus:w-48 transition-all"
                />
                <Search size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within/search:text-primary-600 transition-colors pointer-events-none" />
              </div>
              
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 bg-dark-deep text-white rounded-full flex items-center justify-center hover:bg-primary-600 hover:rotate-90 transition-all duration-500 shadow-md group"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Trigger */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-10 h-10 bg-dark-deep text-white rounded-full flex items-center justify-center"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* COMPACT RECTANGLE MEGAMENU - DROPDOWN STYLE */}
      <div className={`
        absolute right-6 md:right-12 lg:right-20 mt-4 
        w-[280px] md:w-[320px]
        bg-white rounded-[2rem] border border-neutral-200 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] 
        transition-all duration-500 origin-top-right
        ${isOpen ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-4 invisible pointer-events-none'}
      `}>
        <div className="p-6">
          <div className="grid grid-cols-1 gap-1">
            {categories.map((cat, idx) => (
              <a 
                key={idx} 
                href="#" 
                className={`
                  group flex items-center justify-between p-3.5 rounded-2xl hover:bg-neutral-50 transition-all
                  ${cat === 'Catálogo Completo' ? 'border-t border-neutral-100 mt-2 pt-5 bg-primary-50/50 text-primary-600' : 'text-neutral-500'}
                `}
              >
                <span className="text-xs font-black uppercase tracking-[0.1em] group-hover:text-dark-deep transition-colors">
                  {cat}
                </span>
                <ChevronRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary-600" />
              </a>
            ))}
          </div>

          {/* Mobile NavLinks in Menu */}
          <div className="lg:hidden mt-4 pt-4 border-t border-neutral-100 flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-[10px] font-black uppercase tracking-widest text-dark-deep py-3 px-4 bg-neutral-100 rounded-xl text-left flex justify-between items-center group"
              >
                {link.name}
                <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
