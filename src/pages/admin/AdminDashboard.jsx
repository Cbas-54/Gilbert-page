import { useState, useEffect } from 'react';
import { Plus, Package, Eye, EyeOff, Trash2, Search, ArrowLeft, Pencil, Check, Loader2, Menu, X, Mail, Video, LayoutGrid, Tag, ShoppingBag, Moon, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fetchProducts, updateProduct, deleteProduct, CATEGORIES, SUBCATEGORIES } from '../../services/productService';
import ProductForm from './ProductForm';
import { ChevronRight, Filter } from 'lucide-react';
import { AnimatedThemeToggler } from '../../components/ui/animated-theme-toggler';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [statusFilter, setStatusFilter] = useState('Todos'); // 'Todos', 'Activo', 'Suspendido'
  const [processingIds, setProcessingIds] = useState(new Set());
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const loadData = async (isInitial = false) => {
    if (isInitial) setLoading(true);
    const data = await fetchProducts(true); // Include suspended
    setProducts(data);
    if (isInitial) setLoading(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token !== 'gilberth2026') {
      navigate('/admin/login');
    }
    loadData(true);
  }, [navigate]);

  // Lock body scroll when sidebar or form is open
  useEffect(() => {
    if (isSidebarOpen || showForm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSidebarOpen, showForm]);

  const handleToggleStatus = async (product) => {
    const newStatus = product.status === 'Activo' ? 'Suspendido' : 'Activo';
    
    // Track processing
    setProcessingIds(prev => new Set(prev).add(product.id));

    // Optimistic Update
    const previousProducts = [...products];
    setProducts(products.map(p => p.id === product.id ? { ...p, status: newStatus } : p));

    try {
      const res = await updateProduct(product.id, { estado: newStatus });
      if (!res.success) {
        setProducts(previousProducts);
        alert('Error al actualizar el estado: ' + (res.message || 'Error desconocido'));
      }
    } catch (err) {
      setProducts(previousProducts);
      alert('Error de conexión al actualizar el estado');
    } finally {
      setProcessingIds(prev => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto? Esta acción no se puede deshacer.')) {
      const res = await deleteProduct(id);
      if (res.success) {
        setProducts(products.filter(p => p.id !== id));
      }
    }
  };

  const filteredProducts = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = activeCategory === 'Todos' || p.category === activeCategory;
    const matchSubcategory = !activeSubcategory || (p.subcategory && p.subcategory.toLowerCase() === activeSubcategory.toLowerCase());
    const matchStatus = statusFilter === 'Todos' || p.status === statusFilter;
    
    return matchSearch && matchCategory && matchSubcategory && matchStatus;
  });

  const stats = {
    total: products.length,
    active: products.filter(p => p.status === 'Activo').length,
    suspended: products.filter(p => p.status === 'Suspendido').length
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="font-sans text-[10px] font-black uppercase tracking-widest text-muted-foreground">Cargando Tablero...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-background transition-colors duration-500 overflow-hidden flex flex-col md:flex-row">
      
      {/* Desktop Sidebar (Gmail Style) */}
      <aside className="hidden md:flex w-72 flex-col border-r border-border bg-background p-6">
        <div className="mb-10 px-2 flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <img src="/favicon.png" alt="Logo" className="w-8 h-8 object-contain" />
            <h2 className="font-serif text-2xl italic text-foreground leading-none">Administración</h2>
          </div>
          <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-primary-600/60 mt-2 px-1">Gestión de Catálogo</p>
        </div>

        <button 
          onClick={() => { setEditingProduct(null); setShowForm(true); }}
          className="flex items-center gap-4 bg-muted hover:bg-muted/80 text-foreground px-6 py-4 rounded-2xl mb-10 transition-all shadow-sm border border-border group"
        >
          <Plus size={20} className="text-primary-600 group-hover:scale-125 transition-transform" />
          <span className="text-xs font-black uppercase tracking-widest">Nuevo Producto</span>
        </button>

        <nav className="flex-1 space-y-1 overflow-y-auto -mx-2 px-2">
          <p className="px-4 text-[9px] font-black uppercase tracking-widest text-muted-foreground/50 mb-3 mt-4">Vistas Principales</p>
          {[
            { id: 'Todos', label: 'Ver Todo', icon: LayoutGrid, count: stats.total },
            { id: 'Activo', label: 'En Venta', icon: ShoppingBag, count: stats.active },
            { id: 'Suspendido', label: 'Suspendidos', icon: EyeOff, count: stats.suspended }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setStatusFilter(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-r-full transition-all duration-200 group
                ${statusFilter === item.id ? 'bg-primary/10 text-primary-600' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}
              `}
            >
              <div className="flex items-center gap-4">
                <item.icon size={18} className={statusFilter === item.id ? 'text-primary-600' : 'text-muted-foreground/50 group-hover:text-foreground'} />
                <span className="text-xs font-bold uppercase tracking-widest">{item.label}</span>
              </div>
              <span className={`text-[10px] font-black ${statusFilter === item.id ? 'text-primary-600' : 'text-muted-foreground/40'}`}>
                {item.count}
              </span>
            </button>
          ))}

          <div className="pt-8 space-y-1">
            <p className="px-4 text-[9px] font-black uppercase tracking-widest text-muted-foreground/50 mb-3">Categorías</p>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setActiveSubcategory(null); }}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-r-full text-xs font-sans transition-all
                  ${activeCategory === cat ? 'bg-muted text-foreground font-bold' : 'text-muted-foreground hover:bg-muted/50'}
                `}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${activeCategory === cat ? 'bg-primary-600' : 'bg-border'}`} />
                <span className="uppercase tracking-widest font-black text-[10px]">{cat}</span>
              </button>
            ))}
          </div>
        </nav>

        <div className="pt-6 border-t border-border space-y-4">
          <button 
            onClick={() => navigate('/productos')}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-full text-xs font-black uppercase tracking-widest text-muted-foreground hover:bg-muted transition-colors"
          >
            <ArrowLeft size={16} />
            Tienda
          </button>
          <div className="flex items-center justify-between px-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Tema</span>
            <AnimatedThemeToggler />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-background md:bg-muted/10 relative h-full overflow-hidden">
        
        {/* Mobile Gmail-style Header */}
        <div className="md:hidden sticky top-0 z-40 px-4 py-4 bg-background border-b border-border">
          <div className="bg-muted border border-border rounded-full h-14 px-4 flex items-center gap-3 shadow-lg shadow-black/5">
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

        {/* Desktop Header (Integrated Search) */}
        <header className="hidden md:flex items-center justify-between h-20 px-8 bg-background border-b border-border transition-colors duration-500 shrink-0">
          <div className="flex-1 max-w-2xl">
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40 group-focus-within:text-primary-600 transition-colors" />
              <input 
                type="text"
                placeholder="Buscar en el catálogo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-muted/30 border border-border/20 px-14 py-3 rounded-2xl font-sans text-sm focus:outline-none focus:bg-background focus:border-border/50 focus:shadow-md transition-all placeholder:text-muted-foreground/30"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 bg-muted/50 rounded-full border border-border">
              <span className="text-[10px] font-black uppercase tracking-widest text-primary-600">{stats.total} Productos</span>
            </div>
          </div>
        </header>

        {/* Scrollable List Container */}
        <div className={`flex-1 overflow-y-auto px-4 md:px-8 py-6 md:py-8 pb-32 md:pb-8 ${isSidebarOpen ? 'overflow-hidden' : ''}`}>
          <div className="max-w-[1400px] mx-auto">

            <div className="bg-background border border-border overflow-hidden shadow-sm rounded-sm md:rounded-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="px-4 py-5 text-[9px] font-black uppercase tracking-widest text-muted-foreground">Producto ({filteredProducts.length})</th>
                      <th className="px-4 py-5 text-[9px] font-black uppercase tracking-widest text-muted-foreground hidden md:table-cell">Categoría</th>
                      <th className="px-4 py-5 text-[9px] font-black uppercase tracking-widest text-muted-foreground">Precio</th>
                      <th className="px-4 py-5 text-[9px] font-black uppercase tracking-widest text-muted-foreground">Estado</th>
                      <th className="px-4 py-5 text-[9px] font-black uppercase tracking-widest text-muted-foreground text-right hidden md:table-cell">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((p) => (
                      <tr 
                        key={p.id} 
                        onClick={() => { setEditingProduct(p); setShowForm(true); }}
                        className="border-b border-border/50 hover:bg-muted/30 transition-colors group cursor-pointer"
                      >
                        <td className="px-3 md:px-4 py-5">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-muted rounded-lg overflow-hidden border border-border shrink-0">
                              {p.image ? (
                                <img src={p.image} alt="" className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-[8px] font-black opacity-20">NO IMG</div>
                              )}
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="font-serif text-base md:text-lg text-foreground truncate max-w-[150px] md:max-w-none">{p.name}</span>
                              <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60 md:hidden">{p.subcategory || p.category}</span>
                              {p.subcategory && <span className="text-[9px] font-black uppercase tracking-widest text-primary-600/40 hidden md:block">{p.subcategory}</span>}
                            </div>
                          </div>
                        </td>
                        <td className="px-3 md:px-4 py-5 font-sans text-[10px] font-bold uppercase tracking-widest text-muted-foreground hidden md:table-cell">{p.category}</td>
                        <td className="px-3 md:px-4 py-5 font-serif italic text-base md:text-lg text-foreground">${p.price.toLocaleString('es-AR')}</td>
                        <td className="px-3 md:px-4 py-5">
                          <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${p.status === 'Activo' ? 'bg-primary/20 text-primary-600' : 'bg-muted text-muted-foreground'}`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="px-4 py-5 hidden md:table-cell">
                          <div className="flex items-center justify-end gap-3" onClick={(e) => e.stopPropagation()}>
                            <button 
                              onClick={() => handleToggleStatus(p)}
                              disabled={processingIds.has(p.id)}
                              className="p-3 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-primary-600 disabled:opacity-50"
                            >
                              {processingIds.has(p.id) ? (
                                <Loader2 size={16} className="animate-spin text-primary-600" />
                              ) : (
                                p.status === 'Activo' ? <EyeOff size={16} /> : <Eye size={16} />
                              )}
                            </button>
                            <button 
                              onClick={() => { setEditingProduct(p); setShowForm(true); }}
                              className="p-3 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                            >
                              <Pencil size={16} />
                            </button>
                            <button 
                              onClick={() => handleDelete(p.id)}
                              className="p-3 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-red-500"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredProducts.length === 0 && (
                      <tr>
                        <td colSpan="5" className="px-6 py-20 text-center text-muted-foreground italic font-serif text-lg">No hay productos que coincidan con los filtros</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Navigation (Gmail Style) */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-xl border-t border-border z-50 px-6 py-3">
          <div className="flex items-center justify-around max-w-md mx-auto">
            {[
              { id: 'Todos', label: 'Todos', icon: LayoutGrid, count: stats.total },
              { id: 'Activo', label: 'Venta', icon: ShoppingBag, count: stats.active },
              { id: 'Suspendido', label: 'Pausa', icon: EyeOff, count: stats.suspended }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setStatusFilter(item.id)}
                className="flex flex-col items-center gap-1 relative group"
              >
                <div className={`px-5 py-1 rounded-full transition-all duration-300 ${statusFilter === item.id ? 'bg-primary/20' : 'group-hover:bg-muted'}`}>
                  <item.icon size={20} className={statusFilter === item.id ? 'text-primary-600' : 'text-muted-foreground'} />
                </div>
                <span className={`text-[10px] font-black uppercase tracking-tighter ${statusFilter === item.id ? 'text-foreground' : 'text-muted-foreground/60'}`}>
                  {item.label}
                </span>
                {item.count > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-background text-[8px] font-bold px-1 rounded-full min-w-[14px] text-center border-2 border-background">
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Mobile Side Drawer Overlay */}
      <div className={`md:hidden fixed inset-0 z-[100] ${isSidebarOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <div 
          className={`absolute inset-0 bg-dark-rich/60 backdrop-blur-sm transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsSidebarOpen(false)}
        />
        <div className={`absolute top-0 left-0 bottom-0 w-[85%] max-w-[300px] bg-background border-r border-border transition-transform duration-300 ease-in-out flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-6 border-b border-border">
            <h2 className="font-serif text-2xl italic text-foreground leading-none">Guilberth</h2>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-primary-600 mt-2">Catálogo Admin</p>
          </div>

          <div className="flex-1 overflow-y-auto py-4 px-2">
            <div className="px-3 mb-6">
              <p className="px-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4">Categorías</p>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setActiveSubcategory(null); setIsSidebarOpen(false); }}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-r-full text-sm font-sans transition-colors
                    ${activeCategory === cat ? 'bg-primary/10 text-primary-600 font-bold' : 'text-foreground hover:bg-muted'}
                  `}
                >
                  <LayoutGrid size={18} className={activeCategory === cat ? 'text-primary-600' : 'text-muted-foreground'} />
                  <span className="text-[10px] font-black uppercase tracking-widest">{cat}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 border-t border-border space-y-2">
            <button 
              onClick={() => { navigate('/productos'); setIsSidebarOpen(false); }}
              className="w-full flex items-center gap-4 px-4 py-3 rounded-full text-xs font-black uppercase tracking-widest text-muted-foreground hover:bg-muted transition-colors"
            >
              <ShoppingBag size={18} />
              Tienda
            </button>
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Tema</span>
              <AnimatedThemeToggler />
            </div>
          </div>
        </div>
      </div>

      {showForm && (
        <ProductForm 
          onClose={() => { setShowForm(false); setEditingProduct(null); }} 
          onSuccess={() => { setShowForm(false); loadData(false); }}
          initialData={editingProduct}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
