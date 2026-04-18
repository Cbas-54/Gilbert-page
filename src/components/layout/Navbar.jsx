import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';
import { fetchProducts, CATEGORIES } from '../../services/productService';
import MegaMenu from './MegaMenu';
import { AnimatedThemeToggler } from '../ui/animated-theme-toggler';

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

    // Load static data for Mega-menu with subcategories
    const loadMegaMenu = () => {
      const structuredData = [
        {
          title: 'Explorar',
          isSidebar: true,
          items: [
            { name: 'Ver Todos los Productos', href: '/productos', bold: true },
          ]
        },
        {
          title: 'Calzado',
          items: [
            { name: 'Mujer', href: '/productos?categoria=calzado&sub=mujer' },
            { name: 'Hombre', href: '/productos?categoria=calzado&sub=hombre' },
            { name: 'Niño', href: '/productos?categoria=calzado&sub=nino' },
            { name: 'Deportivas', href: '/productos?categoria=calzado&sub=deportivas' },
            { name: 'Botines', href: '/productos?categoria=calzado&sub=botines' },
            { name: 'Vestir', href: '/productos?categoria=calzado&sub=vestir' },
          ]
        },
        {
          title: 'Mochilas',
          items: [
            { name: 'Niños', href: '/productos?categoria=mochilas&sub=niños' },
            { name: 'Urbanas', href: '/productos?categoria=mochilas&sub=urbanas' },
          ]
        },
        {
          title: 'Deportes',
          items: [
            { name: 'Pelotas', href: '/productos?categoria=deportes&sub=pelotas' },
            { name: 'Guantes', href: '/productos?categoria=deportes&sub=guantes' },
            { name: 'Peras', href: '/productos?categoria=deportes&sub=peras' },
            { name: 'Accesorios', href: '/productos?categoria=deportes&sub=accesorios' },
          ]
        },
        {
          title: 'Cuero',
          items: [
            { name: 'Limpieza', href: '/productos?categoria=productos para cuero&sub=limpieza' },
            { name: 'Renovación', href: '/productos?categoria=productos para cuero&sub=renovacion' },
            { name: 'Tintas', href: '/productos?categoria=productos para cuero&sub=tintas' },
          ]
        }
      ];
      setMegaMenuData(structuredData);
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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-in-out ${shouldBeSolid ? 'bg-background/95 backdrop-blur-md py-4 shadow-sm border-b border-border' : 'bg-transparent py-8 md:py-10'}`}
      onMouseLeave={() => setShowMegaMenu(false)}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 relative">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <div 
            className="flex items-center gap-4 cursor-pointer group" 
            onClick={() => navigate('/')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && navigate('/')}
          >
            <div className={`w-10 h-10 flex items-center justify-center font-serif text-2xl italic transition-colors duration-500 ${shouldBeSolid ? 'text-foreground' : 'text-white'}`}>
              G.
            </div>
            <div className="flex flex-col -space-y-0.5 mt-1">
              <span className={`text-xl md:text-2xl font-serif tracking-wide transition-colors duration-500 ${shouldBeSolid ? 'text-foreground' : 'text-white'}`}>Guilberth</span>
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
                        ? 'text-foreground/80 hover:text-foreground after:bg-primary-600' 
                        : 'text-white/80 hover:text-white after:bg-white'}
                    `}
                  >
                    {link.name}
                  </a>
                </div>
              ))}
            </div>

            {/* Theme Toggler Desktop */}
            <AnimatedThemeToggler 
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-95
                ${shouldBeSolid 
                  ? 'text-foreground hover:bg-muted' 
                  : 'text-white hover:bg-white/10'}
              `}
            />
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-3 lg:hidden">
            <AnimatedThemeToggler 
              className={`w-10 h-10 rounded-sm flex items-center justify-center transition-colors duration-500
                ${shouldBeSolid 
                  ? 'text-foreground hover:bg-muted' 
                  : 'text-white hover:bg-white/10'}
              `}
            />
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className={`w-10 h-10 rounded-sm flex items-center justify-center transition-colors duration-500
                ${shouldBeSolid ? 'bg-foreground text-background shadow-md' : 'bg-white/10 backdrop-blur-sm text-white border border-white/20'}
              `}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>



        {/* MOBILE MENU */}
        <div className={`
          absolute right-0 mt-4 
          w-[280px] md:w-[320px]
          bg-background rounded-[2rem] border border-border shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] 
          transition-all duration-500 origin-top-right
          ${isOpen ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-4 invisible pointer-events-none'}
        `}>
          <div className="p-6 space-y-4">
            {visibleNavLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavigation(e, link)}
                className="group flex items-center justify-between p-4 rounded-2xl bg-muted/50 hover:bg-primary/10 transition-all border border-transparent hover:border-primary/20"
              >
                <span className="text-[10px] font-black uppercase tracking-widest text-foreground">
                  {link.name}
                </span>
                <ChevronRight size={14} className="text-primary-600 opacity-0 group-hover:opacity-100 transition-all" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <MegaMenu 
        showMegaMenu={showMegaMenu} 
        megaMenuData={megaMenuData} 
        setShowMegaMenu={setShowMegaMenu} 
        handleNavigation={handleNavigation} 
      />
    </nav>
  );
};

export default Navbar;
