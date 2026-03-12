import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight, ArrowRight } from 'lucide-react';
import { fetchProducts, CATEGORIES } from '../../services/productService';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [megaMenuData, setMegaMenuData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Load dynamic data for Mega-menu
    const loadMegaMenu = async () => {
      try {
        const allProducts = await fetchProducts();
        const mainCategories = CATEGORIES.filter(c => c !== 'Todos').slice(0, 3);
        
        const structuredData = [
          {
            title: 'Explorar',
            isSidebar: true,
            items: [
              { name: 'Ver Todos los Productos', href: '/productos', bold: true },
              { name: 'Lo Más Vendido', href: '/productos', bold: false },
              { name: 'Nuevos Ingresos', href: '/productos', bold: false },
              { name: 'Servicios de Taller', href: '#servicios', isAnchor: true },
            ]
          },
          ...mainCategories.map(cat => ({
            title: cat,
            items: allProducts
              .filter(p => p.category === cat)
              .slice(0, 5)
              .map(p => ({ name: p.name, href: '/productos' }))
          }))
        ];
        setMegaMenuData(structuredData);
      } catch (error) {
        console.error("Error loading mega menu:", error);
      }
    };
    loadMegaMenu();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Productos', href: '/productos', type: 'route' },
    { name: 'Servicios', href: '#servicios', type: 'anchor' },
    { name: 'Contacto', href: '#ubicacion', type: 'anchor' },
  ];

  const visibleNavLinks = navLinks.filter(link => 
    !(link.href === '/productos' && location.pathname === '/productos')
  );

  const handleNavigation = (e, link) => {
    e.preventDefault();
    if (link.type === 'anchor') {
      if (location.pathname !== '/') {
        navigate('/' + link.href);
      } else {
        const element = document.querySelector(link.href);
        if (element) {
          const offset = 72;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }
    } else {
      navigate(link.href);
    }
    setIsOpen(false);
    setShowMegaMenu(false);
  };

  const isHome = location.pathname === '/';
  const shouldBeSolid = isScrolled || showMegaMenu || !isHome;

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-in-out ${shouldBeSolid ? 'bg-neutral-beige/95 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-8 md:py-10'}`}
      onMouseLeave={() => setShowMegaMenu(false)}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 relative">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-4 cursor-pointer group" onClick={() => navigate('/')}>
            <div className={`w-10 h-10 flex items-center justify-center font-serif text-2xl italic transition-colors duration-500 ${shouldBeSolid ? 'text-dark-deep' : 'text-white'}`}>
              G.
            </div>
            <div className="flex flex-col -space-y-0.5 mt-1">
              <span className={`text-xl md:text-2xl font-serif tracking-wide transition-colors duration-500 ${shouldBeSolid ? 'text-dark-deep' : 'text-white'}`}>Gilbert</span>
              <span className={`text-[8px] font-sans font-bold uppercase tracking-[0.3em] leading-none transition-colors duration-500 ${shouldBeSolid ? 'text-primary-600' : 'text-white/70'}`}>Composturas</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-16">
            <div className="flex items-center gap-10">
              {visibleNavLinks.map((link) => (
                <div 
                  key={link.name}
                  className="relative py-2"
                  onMouseEnter={() => link.name === 'Productos' ? setShowMegaMenu(true) : setShowMegaMenu(false)}
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleNavigation(e, link)}
                    className={`text-[10px] font-sans font-bold uppercase tracking-[0.2em] transition-colors duration-300 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:transition-all after:duration-300 hover:after:w-full
                      ${shouldBeSolid
                        ? 'text-dark-deep/80 hover:text-dark-deep after:bg-primary-600' 
                        : 'text-white/80 hover:text-white after:bg-white'}
                    `}
                  >
                    {link.name}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Menu Trigger */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden w-10 h-10 rounded-sm flex items-center justify-center transition-colors duration-500
              ${shouldBeSolid ? 'bg-dark-deep text-white' : 'bg-white/10 backdrop-blur-sm text-white border border-white/20'}
            `}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* MEGAMENU */}
        <div 
          className={`
            absolute top-full left-0 w-full bg-white border-t border-dark-deep/5 shadow-2xl overflow-hidden transition-all duration-500 ease-in-out
            ${showMegaMenu ? 'max-h-[600px] opacity-100 py-12' : 'max-h-0 opacity-0 pointer-events-none py-0'}
          `}
          style={{ top: 'calc(100% - 1px)' }}
          onMouseEnter={() => setShowMegaMenu(true)}
        >
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20">
              {megaMenuData.map((section, idx) => (
                <div key={idx} className={`space-y-6 ${section.isSidebar ? 'pr-12 lg:border-r border-dark-deep/5' : ''}`}>
                  <h3 className={`text-[10px] font-black uppercase tracking-[0.3em] pb-2 border-b border-dark-deep/5 ${section.isSidebar ? 'text-dark-deep' : 'text-primary-600'}`}>
                    {section.title}
                  </h3>
                  <ul className="space-y-4">
                    {section.items.map((item, i) => (
                      <li key={i}>
                        <a 
                          href={item.href} 
                          onClick={(e) => { 
                            if (item.isAnchor) {
                              handleNavigation(e, { href: item.href, type: 'anchor' });
                            } else {
                              e.preventDefault(); 
                              navigate(item.href); 
                              setShowMegaMenu(false); 
                            }
                          }}
                          className={`group flex items-center justify-between text-xs font-sans transition-colors
                            ${item.bold ? 'font-black text-dark-deep tracking-wider' : 'font-bold text-dark-deep/60 hover:text-dark-deep'}
                          `}
                        >
                          {item.name}
                          {!section.isSidebar && <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary-600" />}
                        </a>
                      </li>
                    ))}
                  </ul>
                  {section.isSidebar && (
                    <div className="pt-4">
                      <div className="bg-primary-600/5 p-6 rounded-sm border border-primary-600/10">
                        <p className="text-[10px] font-bold text-primary-600 uppercase tracking-widest leading-relaxed">
                          Sorteos Mensuales <br/> 
                          <span className="text-dark-deep/40 text-[8px] font-medium tracking-normal mt-1 block">Para clientes del taller</span>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div className={`
          absolute right-0 mt-4 
          w-[280px] md:w-[320px]
          bg-white rounded-[2rem] border border-neutral-200 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] 
          transition-all duration-500 origin-top-right
          ${isOpen ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-4 invisible pointer-events-none'}
        `}>
          <div className="p-6 space-y-4">
            {visibleNavLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavigation(e, link)}
                className="group flex items-center justify-between p-4 rounded-2xl bg-neutral-50 hover:bg-primary-50 transition-all"
              >
                <span className="text-[10px] font-black uppercase tracking-widest text-dark-deep">
                  {link.name}
                </span>
                <ChevronRight size={14} className="text-primary-600 opacity-0 group-hover:opacity-100 transition-all" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
