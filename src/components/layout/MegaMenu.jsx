import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MegaMenu = ({ showMegaMenu, megaMenuData, setShowMegaMenu, handleNavigation }) => {
  const navigate = useNavigate();

  return (
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
          {megaMenuData.map((section) => (
            <div key={section.title} className={`space-y-6 ${section.isSidebar ? 'pr-12 lg:border-r border-dark-deep/5' : ''}`}>
              <h3 className={`text-[10px] font-black uppercase tracking-[0.3em] pb-2 border-b border-dark-deep/5 ${section.isSidebar ? 'text-dark-deep' : 'text-primary-600'}`}>
                {section.title}
              </h3>
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
                      className={`w-full text-left group flex items-center justify-between text-xs font-sans transition-colors
                        ${item.bold ? 'font-black text-dark-deep tracking-wider' : 'font-bold text-dark-deep/60 hover:text-dark-deep'}
                      `}
                    >
                      {item.name}
                      {!section.isSidebar && <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary-600" />}
                    </button>
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
  );
};

export default MegaMenu;
