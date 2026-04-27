import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MegaMenu = ({ showMegaMenu, megaMenuData, setShowMegaMenu, handleNavigation }) => {
  const navigate = useNavigate();

  return (
    <div 
      className={`
        absolute top-full left-0 w-full bg-background border-t border-border shadow-2xl overflow-y-auto z-50 pt-10 md:pt-16 pb-12
        transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] will-change-[transform,opacity]
        ${showMegaMenu 
          ? 'opacity-100 translate-y-0 visible' 
          : 'opacity-0 -translate-y-4 invisible pointer-events-none'}
      `}
      onMouseEnter={() => setShowMegaMenu(true)}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-10 gap-x-8 lg:gap-10">
          {megaMenuData.map((section) => (
            <div key={section.title} className={`space-y-6 ${section.isSidebar ? 'pr-8 lg:border-r border-border' : ''}`}>
              {section.title === 'Explorar' ? (
                <h3 className={`text-[10px] font-black uppercase tracking-[0.3em] pb-2 border-b border-border ${section.isSidebar ? 'text-foreground' : 'text-primary-600'}`}>
                  {section.title}
                </h3>
              ) : (
                <button 
                  type="button"
                  onClick={() => {
                    navigate(`/productos?categoria=${section.title.toLowerCase()}`);
                    setShowMegaMenu(false);
                  }}
                  className={`w-full text-left flex items-center justify-between text-[10px] font-black uppercase tracking-[0.3em] pb-2 border-b border-border group cursor-pointer transition-colors ${section.isSidebar ? 'text-foreground' : 'text-primary-600 hover:text-foreground'}`}
                >
                  {section.title}
                  <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </button>
              )}
              <ul className="space-y-4">
                {section.items.map((item) => (
                  <li key={item.name}>
                    <button 
                      type="button"
                      onClick={(e) => { 
                        if (item.isAnchor) {
                          handleNavigation(e, { href: item.href, type: 'anchor' });
                        } else {
                          navigate(item.href); 
                          setShowMegaMenu(false); 
                        }
                      }}
                      className={`w-full text-left group flex items-center justify-between text-xs font-sans transition-colors cursor-pointer
                        ${item.bold ? 'font-black text-primary-600 hover:text-foreground tracking-wider underline decoration-primary-600/30 underline-offset-4' : 'font-bold text-muted-foreground hover:text-foreground'}
                      `}
                    >
                      {item.name}
                      {!section.isSidebar && <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary-600" />}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
