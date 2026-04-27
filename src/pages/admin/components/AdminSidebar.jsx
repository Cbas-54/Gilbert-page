import { ArrowLeft, LayoutGrid, ChevronRight, ShoppingBag, EyeOff } from 'lucide-react';
import { AnimatedThemeToggler } from '../../../components/ui/animated-theme-toggler';

const AdminSidebar = ({ 
  isSidebarOpen, 
  setIsSidebarOpen, 
  activeCategory, 
  setActiveCategory, 
  activeSubcategory, 
  setActiveSubcategory, 
  statusFilter, 
  setStatusFilter, 
  stats, 
  CATEGORIES, 
  SUBCATEGORIES, 
  navigate 
}) => {
  
  const SidebarContent = (isMobile = false) => (
    <>
      <div className="mb-10 px-2 flex items-center gap-3">
        <img src="/favicon.png" alt="Logo" className="w-9 h-9 object-contain" />
        <div className="flex flex-col">
          <h2 className="font-serif text-xl italic text-foreground leading-none">Administración</h2>
          <p className="text-[7px] font-bold uppercase tracking-[0.2em] text-primary-600/60 mt-1">Gestión de Catálogo</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto -mx-2 px-2">
        <div className="space-y-1">
          <p className="px-4 text-[9px] font-black uppercase tracking-widest text-muted-foreground/50 mb-3 mt-4">Navegar Categorías</p>
          {CATEGORIES.map(cat => (
            <div key={cat}>
              <button
                onClick={() => { 
                  setActiveCategory(cat); 
                  setActiveSubcategory(null); 
                  if (isMobile) setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-r-full transition-all duration-200 group
                  ${activeCategory === cat ? 'bg-primary/10 text-primary-600' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}
                `}
              >
                <div className="flex items-center gap-4">
                  {isMobile ? (
                    <LayoutGrid size={18} className={activeCategory === cat ? 'text-primary-600' : 'text-muted-foreground'} />
                  ) : (
                    <div className={`w-1.5 h-1.5 rounded-full ${activeCategory === cat ? 'bg-primary-600' : 'bg-border'}`} />
                  )}
                  <span className="text-xs font-bold uppercase tracking-widest">{cat}</span>
                </div>
                {activeCategory === cat && SUBCATEGORIES[cat] && <ChevronRight size={14} className="rotate-90 text-primary-600" />}
              </button>
              
              {activeCategory === cat && SUBCATEGORIES[cat] && (
                <div className={`${isMobile ? 'ml-10' : 'ml-8'} mt-1 mb-2 space-y-1 border-l-2 border-primary/10 pl-2`}>
                  {SUBCATEGORIES[cat].map(sub => (
                    <button
                      key={sub}
                      onClick={() => {
                        setActiveSubcategory(sub);
                        if (isMobile) setIsSidebarOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-[0.1em] transition-colors
                        ${activeSubcategory === sub ? 'text-primary-600 bg-primary/5' : 'text-muted-foreground/60 hover:text-foreground hover:bg-muted/50'}
                      `}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="pt-8 space-y-1">
          <p className="px-4 text-[9px] font-black uppercase tracking-widest text-muted-foreground/50 mb-3">Vistas de Inventario</p>
          {[
            { id: 'Todos', label: 'Ver Todo', icon: LayoutGrid, count: stats.total },
            { id: 'Activo', label: 'En Venta', icon: ShoppingBag, count: stats.active },
            { id: 'Suspendido', label: 'Suspendidos', icon: EyeOff, count: stats.suspended }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => {
                setStatusFilter(item.id);
                if (isMobile) setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-r-full transition-all duration-200 group
                ${statusFilter === item.id ? 'bg-muted text-foreground font-bold border-l-4 border-primary-600' : 'text-muted-foreground hover:bg-muted/50'}
              `}
            >
              <div className="flex items-center gap-4">
                <item.icon size={16} className={statusFilter === item.id ? 'text-primary-600' : 'text-muted-foreground/50'} />
                <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
              </div>
              <span className={`text-[10px] font-black ${statusFilter === item.id ? 'text-primary-600' : 'text-muted-foreground/40'}`}>
                {item.count}
              </span>
            </button>
          ))}
        </div>
      </nav>

      <div className="pt-6 border-t border-border mt-auto">
        <div className="flex items-center justify-between gap-3 px-2">
          <button 
            onClick={() => navigate('/productos')}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-muted/50 hover:bg-muted text-foreground text-[10px] font-black uppercase tracking-widest rounded-xl transition-colors border border-border/20"
          >
            <ArrowLeft size={14} />
            Tienda
          </button>
          <AnimatedThemeToggler />
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Aside */}
      <aside className="hidden md:flex w-72 flex-col border-r border-border bg-background p-6 h-full overflow-hidden shrink-0">
        {SidebarContent(false)}
      </aside>

      {/* Mobile Drawer */}
      <div className={`md:hidden fixed inset-0 z-[100] ${isSidebarOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <div 
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsSidebarOpen(false)}
        />
        <div className={`absolute top-0 left-0 bottom-0 w-[85%] max-w-[300px] bg-background border-r border-border transition-transform duration-300 ease-in-out flex flex-col p-6 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          {SidebarContent(true)}
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
