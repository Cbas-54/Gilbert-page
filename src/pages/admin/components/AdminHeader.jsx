import { Search, Menu, Plus } from 'lucide-react';

const AdminHeader = ({ 
  searchQuery, 
  setSearchQuery, 
  setIsSidebarOpen, 
  setEditingProduct, 
  setShowForm 
}) => {
  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-40 px-4 py-4 bg-background border-b border-border">
        <div className="bg-[#FDF8F3] dark:bg-zinc-800/50 border border-primary-600/10 dark:border-white/10 rounded-full h-14 px-4 flex items-center gap-3 shadow-sm">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:bg-background/50 rounded-full transition-colors"
          >
            <Menu size={20} className="text-foreground" />
          </button>
          
          <div className="flex-1 flex items-center gap-2">
            <input 
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none focus:outline-none w-full text-sm font-sans"
            />
          </div>

          <button 
            onClick={() => { setEditingProduct(null); setShowForm(true); }}
            className="w-10 h-10 bg-foreground text-background rounded-full flex items-center justify-center shadow-md active:scale-95 transition-transform"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>

      {/* PC Header */}
      <header className="hidden md:flex items-center justify-between h-20 px-8 bg-background border-b border-border transition-colors duration-500 shrink-0">
        <div className="flex-1 max-w-2xl">
          <div className="relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40 group-focus-within:text-primary-600 transition-colors" />
            <input 
              type="text"
              placeholder="Buscar en el catálogo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FDF8F3] dark:bg-zinc-800/50 border border-primary-600/5 dark:border-white/10 px-14 py-3 rounded-2xl font-sans text-sm focus:outline-none focus:bg-background dark:focus:bg-zinc-800 focus:border-primary-600/20 focus:shadow-md transition-all placeholder:text-muted-foreground/30"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => { setEditingProduct(null); setShowForm(true); }}
            className="flex items-center gap-3 bg-foreground text-background px-5 py-2.5 rounded-xl transition-all shadow-sm hover:opacity-90 active:scale-95 group"
          >
            <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
            <span className="text-[10px] font-black uppercase tracking-widest">Nuevo Producto</span>
          </button>
        </div>
      </header>
    </>
  );
};

export default AdminHeader;
