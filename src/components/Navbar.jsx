import { useState, useEffect } from 'react';
import { Menu, X, Search, ChevronRight } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
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
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-in-out ${isScrolled ? 'bg-neutral-beige/95 backdrop-blur-md border-b border-dark-deep/5 py-4 shadow-sm' : 'bg-transparent py-8 md:py-10'}`}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo - Editorial Style */}
          <div className="flex items-center gap-4 cursor-pointer group" onClick={(e) => scrollToSection(e, '#home')}>
            <div className={`w-10 h-10 flex items-center justify-center font-serif text-2xl italic transition-colors duration-500 ${isScrolled ? 'text-dark-deep' : 'text-white'}`}>
              G.
            </div>
            <div className="flex flex-col -space-y-0.5 mt-1">
              <span className={`text-xl md:text-2xl font-serif tracking-wide transition-colors duration-500 ${isScrolled ? 'text-dark-deep' : 'text-white'}`}>Gilbert</span>
              <span className={`text-[8px] font-sans font-bold uppercase tracking-[0.3em] leading-none transition-colors duration-500 ${isScrolled ? 'text-primary-600' : 'text-white/70'}`}>Composturas</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-16">
            <div className="flex items-center gap-10">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`text-[10px] font-sans font-bold uppercase tracking-[0.2em] transition-colors duration-300 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:transition-all after:duration-300 hover:after:w-full
                    ${isScrolled 
                      ? 'text-dark-deep/80 hover:text-dark-deep after:bg-primary-600' 
                      : 'text-white/80 hover:text-white after:bg-white'}
                  `}
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Action Bar */}
            <div className={`flex items-center gap-6 pl-10 border-l transition-colors duration-500 ${isScrolled ? 'border-dark-deep/10' : 'border-white/20'}`}>
              <div className="relative group/search cursor-pointer">
                <Search size={16} className={`transition-colors duration-300 hover:scale-110 ${isScrolled ? 'text-dark-deep' : 'text-white'}`} />
              </div>
              
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`w-10 h-10 rounded-sm flex items-center justify-center transition-all duration-500 group
                  ${isScrolled ? 'bg-dark-deep text-white hover:bg-primary-600' : 'bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-dark-deep border border-white/20'}
                `}
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Trigger */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden w-10 h-10 rounded-sm flex items-center justify-center transition-colors duration-500
              ${isScrolled ? 'bg-dark-deep text-white' : 'bg-white/10 backdrop-blur-sm text-white border border-white/20'}
            `}
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
