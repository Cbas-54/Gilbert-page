import { useState, useEffect } from 'react';
import { Plus, Package, Eye, EyeOff, Trash2, Search, ArrowLeft, Pencil, Check, Loader2 } from 'lucide-react';
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
    <div className="min-h-screen bg-background pt-20 pb-20 transition-colors duration-500">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 relative">
          <div className="flex items-start justify-between md:block">
            <div className="space-y-2">
              <h1 className="font-serif text-5xl italic text-foreground leading-none">Administración</h1>
              <p className="font-sans text-[10px] font-black uppercase tracking-[0.4em] text-primary-600">Gestión de Catálogo</p>
            </div>
            {/* Mobile Toggler */}
            <div className="md:hidden">
              <AnimatedThemeToggler />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => { setEditingProduct(null); setShowForm(true); }}
              className="group flex-1 md:flex-none flex items-center justify-center gap-3 bg-foreground text-background px-8 py-4 rounded-sm font-sans text-[10px] font-black uppercase tracking-widest transition-all hover:bg-primary"
            >
              <Plus size={16} /> Nuevo Producto
            </button>
            <button 
              onClick={() => navigate('/productos')}
              className="group flex-1 md:flex-none flex items-center justify-center gap-3 px-6 py-4 rounded-sm border border-border hover:bg-muted transition-all text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              <span className="text-[10px] font-black uppercase tracking-widest">Tienda</span>
            </button>
            {/* Desktop Toggler */}
            <div className="hidden md:block">
              <AnimatedThemeToggler />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Sidebar Filters */}
          <aside className="lg:col-span-3 space-y-10">
            <div className="bg-muted border border-border p-8 rounded-sm space-y-8 sticky top-24 transition-colors duration-500 shadow-sm">
              <div className="flex items-center gap-3 pb-4 border-b border-border transition-colors duration-500">
                <Filter size={14} className="text-primary-600" />
                <span className="text-[10px] font-black uppercase tracking-widest text-foreground transition-colors duration-500">Filtrar por</span>
              </div>

              <div className="flex flex-col gap-1">
                {CATEGORIES.map((cat) => {
                  const hasSubcategories = SUBCATEGORIES[cat] && SUBCATEGORIES[cat].length > 0;
                  const isCatActive = activeCategory === cat;
                  
                  return (
                    <div key={cat} className="space-y-1">
                      <button
                        onClick={() => {
                          setActiveCategory(cat);
                          setActiveSubcategory(null);
                        }}
                        className={`flex w-full items-center justify-between group py-2 text-left transition-all duration-300
                          ${isCatActive ? 'text-primary-600 pl-2' : 'text-muted-foreground hover:text-foreground'}`}
                      >
                        <span className="text-xs font-bold uppercase tracking-widest">{cat}</span>
                        <ChevronRight size={14} className={`transition-transform duration-300 ${isCatActive ? (hasSubcategories ? 'rotate-90 text-primary-600' : 'text-primary-600 opacity-100') : 'opacity-0 -translate-x-2'}`} />
                      </button>
                      
                      {hasSubcategories && isCatActive && (
                        <div className="pl-4 flex flex-col gap-2 py-2 border-l border-border ml-2 animate-in slide-in-from-top-2 fade-in duration-300">
                          {SUBCATEGORIES[cat].map(sub => {
                            const isSubActive = activeSubcategory && activeSubcategory.toLowerCase() === sub.toLowerCase();
                            
                            return (
                              <button
                                key={sub}
                                onClick={() => setActiveSubcategory(sub)}
                                className={`text-[10px] text-left uppercase font-black tracking-[0.2em] transition-all duration-300
                                  ${isSubActive ? 'text-foreground pl-1 before:content-["—"] before:mr-2 before:text-primary-600' : 'text-muted-foreground hover:text-foreground'}
                                `}
                              >
                                {sub}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-9 space-y-10">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { label: 'Total Productos', val: stats.total, icon: Package, id: 'Todos' },
                { label: 'En Venta', val: stats.active, icon: Eye, color: 'text-primary-600', id: 'Activo' },
                { label: 'Suspendidos', val: stats.suspended, icon: EyeOff, color: 'text-muted-foreground', id: 'Suspendido' }
              ].map((s, i) => (
                <button 
                  key={i} 
                  onClick={() => setStatusFilter(s.id)}
                  className={`bg-muted p-8 border transition-all duration-300 text-left flex items-center justify-between group hover:border-primary/50 relative overflow-hidden shadow-sm
                    ${statusFilter === s.id ? 'border-primary shadow-lg ring-1 ring-primary/20 bg-background/50' : 'border-border'}
                  `}
                >
                  {statusFilter === s.id && (
                    <div className="absolute top-0 right-0 w-8 h-8 bg-primary/10 rounded-bl-full animate-in slide-in-from-top-2 slide-in-from-right-2 duration-300">
                       <Check size={10} className="text-primary-600 absolute top-2 right-2" />
                    </div>
                  )}
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-1">{s.label}</p>
                    <p className={`text-4xl font-serif italic ${s.color || 'text-foreground'}`}>{s.val}</p>
                  </div>
                  <s.icon className={`w-8 h-8 transition-all duration-500 
                    ${statusFilter === s.id ? 'opacity-100 scale-110' : 'opacity-20 group-hover:opacity-100'} 
                    ${s.color || 'text-foreground'}`} 
                  />
                </button>
              ))}
            </div>

            {/* Search and Table */}
            <div className="space-y-6">
              <div className="relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type="text"
                  placeholder="Buscar por nombre..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-muted border border-border px-14 py-5 rounded-sm font-sans text-sm focus:outline-none focus:border-primary transition-colors shadow-sm"
                />
                {(activeCategory !== 'Todos' || activeSubcategory || statusFilter !== 'Todos') && (
                  <button 
                    onClick={() => { setActiveCategory('Todos'); setActiveSubcategory(null); setStatusFilter('Todos'); }}
                    className="absolute right-6 top-1/2 -translate-y-1/2 text-[9px] font-black uppercase tracking-widest text-primary-600 hover:underline"
                  >
                    Limpiar Filtros
                  </button>
                )}
              </div>

              <div className="bg-muted border border-border overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-border bg-muted/30">
                        <th className="px-6 py-5 text-[9px] font-black uppercase tracking-widest text-muted-foreground">Producto ({filteredProducts.length})</th>
                        <th className="px-6 py-5 text-[9px] font-black uppercase tracking-widest text-muted-foreground hidden md:table-cell">Categoría</th>
                        <th className="px-6 py-5 text-[9px] font-black uppercase tracking-widest text-muted-foreground">Precio</th>
                        <th className="px-6 py-5 text-[9px] font-black uppercase tracking-widest text-muted-foreground">Estado</th>
                        <th className="px-6 py-5 text-[9px] font-black uppercase tracking-widest text-muted-foreground text-right hidden md:table-cell">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((p) => (
                        <tr 
                          key={p.id} 
                          onClick={() => { setEditingProduct(p); setShowForm(true); }}
                          className="border-b border-border/50 hover:bg-background/40 transition-colors group cursor-pointer"
                        >
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 md:w-12 md:h-12 bg-muted/50 rounded-sm overflow-hidden border border-border shrink-0">
                                {p.image ? (
                                  <img src={p.image} alt="" className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-[8px] font-black opacity-20">NO IMG</div>
                                )}
                              </div>
                              <div className="flex flex-col min-w-0">
                                <span className="font-serif text-base md:text-lg text-foreground truncate max-w-[120px] md:max-w-none">{p.name}</span>
                                <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60 md:hidden">{p.category}</span>
                                {p.subcategory && <span className="text-[9px] font-black uppercase tracking-widest text-primary-600/40 hidden md:block">{p.subcategory}</span>}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-5 font-sans text-[10px] font-bold uppercase tracking-widest text-muted-foreground hidden md:table-cell">{p.category}</td>
                          <td className="px-6 py-5 font-serif text-base md:text-lg italic text-foreground shrink-0">${p.price.toLocaleString('es-AR')}</td>
                          <td className="px-6 py-5">
                            <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${p.status === 'Activo' ? 'bg-primary/20 text-primary-600' : 'bg-muted text-muted-foreground'}`}>
                              {p.status}
                            </span>
                          </td>
                          <td className="px-6 py-5 hidden md:table-cell">
                            <div className="flex items-center justify-end gap-3" onClick={(e) => e.stopPropagation()}>
                              <button 
                                onClick={() => handleToggleStatus(p)}
                                disabled={processingIds.has(p.id)}
                                title={p.status === 'Activo' ? 'Suspender' : 'Activar'}
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
                                title="Editar producto"
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
