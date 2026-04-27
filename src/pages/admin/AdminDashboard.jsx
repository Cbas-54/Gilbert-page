import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProducts, updateProduct, deleteProduct, CATEGORIES, SUBCATEGORIES } from '../../services/productService';
import ProductForm from './ProductForm';

// Specialized Components
import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader';
import ProductTable from './components/ProductTable';
import MobileBottomNav from './components/MobileBottomNav';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [statusFilter, setStatusFilter] = useState('Todos');
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
      
      <AdminSidebar 
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        activeSubcategory={activeSubcategory}
        setActiveSubcategory={setActiveSubcategory}
        expandedCategory={expandedCategory}
        setExpandedCategory={setExpandedCategory}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        stats={stats}
        CATEGORIES={CATEGORIES}
        SUBCATEGORIES={SUBCATEGORIES}
        navigate={navigate}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-background md:bg-muted/10 relative h-full overflow-hidden">
        
        <AdminHeader 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setIsSidebarOpen={setIsSidebarOpen}
          setEditingProduct={setEditingProduct}
          setShowForm={setShowForm}
        />

        {/* Scrollable List Container */}
        <div className={`flex-1 overflow-y-auto pb-32 md:pb-0 ${isSidebarOpen ? 'overflow-hidden' : ''}`}>
          <div className="w-full">
            <ProductTable 
              filteredProducts={filteredProducts}
              processingIds={processingIds}
              handleToggleStatus={handleToggleStatus}
              handleDelete={handleDelete}
              setEditingProduct={setEditingProduct}
              setShowForm={setShowForm}
            />
          </div>
        </div>

        <MobileBottomNav 
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          stats={stats}
        />
      </main>

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
