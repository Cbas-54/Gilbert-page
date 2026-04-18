import { useState } from 'react';
import { X, Upload, Check, AlertCircle } from 'lucide-react';
import { CATEGORIES, SUBCATEGORIES, uploadImage, addProduct, updateProduct } from '../../services/productService';

const ProductForm = ({ onClose, onSuccess, initialData }) => {
  // Map internal product structure to form structure when editing
  const [formData, setFormData] = useState(initialData ? {
    nombre: initialData.name,
    categoria: initialData.category,
    subcategoria: initialData.subcategory,
    precio: initialData.price,
    tag: initialData.tag,
    imagenurl: initialData.image,
    estado: initialData.status
  } : {
    nombre: '',
    categoria: 'Calzado',
    subcategoria: '',
    precio: '',
    tag: '',
    imagenurl: '',
    estado: 'Activo'
  });
  
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    try {
      const url = await uploadImage(file);
      setFormData({ ...formData, imagenurl: url });
    } catch (err) {
      setError('Error al subir la imagen. Intenta de nuevo.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = initialData 
        ? await updateProduct(initialData.id, formData)
        : await addProduct(formData);
      
      if (res.success) {
        onSuccess();
      } else {
        setError(res.message || 'Error al guardar el producto');
      }
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-dark-rich/80 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="relative w-full max-w-2xl bg-background border border-border shadow-2xl p-8 md:p-12 overflow-y-auto max-h-[90vh]">
        <button onClick={onClose} className="absolute top-8 right-8 text-muted-foreground hover:text-foreground">
          <X size={24} />
        </button>

        <div className="mb-10">
          <h2 className="font-serif text-3xl italic">{initialData ? 'Editar Producto' : 'Nuevo Producto'}</h2>
          <p className="font-sans text-[9px] font-black uppercase tracking-widest text-primary-600 mt-2">Detalles del Catálogo</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Image Upload Area */}
          <div className="space-y-3">
            <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Fotografía del Producto</label>
            <div className={`relative aspect-video rounded-sm border-2 border-dashed transition-all flex flex-col items-center justify-center gap-4 bg-muted/20
              ${formData.imagenurl ? 'border-primary/50' : 'border-border hover:border-primary/30'}
            `}>
              {formData.imagenurl ? (
                <div className="absolute inset-0 p-2">
                   <img src={formData.imagenurl} alt="Preview" className="w-full h-full object-contain grayscale-[20%]" />
                   <button 
                    type="button"
                    onClick={() => setFormData({...formData, imagenurl: ''})}
                    className="absolute top-4 right-4 bg-background/80 hover:bg-background p-2 rounded-full text-red-500 shadow-sm"
                   >
                     <X size={14} />
                   </button>
                </div>
              ) : (
                <>
                  <Upload className={`w-8 h-8 ${uploading ? 'animate-bounce' : 'text-muted-foreground'}`} />
                  <div className="text-center">
                    <p className="text-xs font-bold uppercase tracking-widest text-foreground">
                      {uploading ? 'Subiendo...' : 'Soltar imagen o clic para subir'}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-1">PNG, JPG o WebP</p>
                  </div>
                  <input 
                    type="file" 
                    onChange={handleImageChange}
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    disabled={uploading}
                  />
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Nombre</label>
              <input 
                required
                type="text"
                placeholder="Nombre del modelo"
                value={formData.nombre}
                onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                className="w-full bg-background border-b border-border py-2 text-lg focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            
            <div className="space-y-3">
              <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Precio (Pesos)</label>
              <input 
                required
                type="number"
                placeholder="0"
                value={formData.precio}
                onChange={(e) => setFormData({...formData, precio: e.target.value})}
                className="w-full bg-background border-b border-border py-2 text-lg focus:outline-none focus:border-primary transition-colors font-serif italic"
              />
            </div>

            <div className="space-y-3">
              <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Categoría</label>
              <select 
                value={formData.categoria}
                onChange={(e) => setFormData({...formData, categoria: e.target.value, subcategoria: ''})}
                className="w-full bg-background border-b border-border py-2 text-sm focus:outline-none focus:border-primary transition-colors uppercase font-bold tracking-widest"
              >
                {CATEGORIES.filter(c => c !== 'Todos').map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Subcategoría</label>
              <select 
                value={formData.subcategoria}
                onChange={(e) => setFormData({...formData, subcategoria: e.target.value})}
                className="w-full bg-background border-b border-border py-2 text-sm focus:outline-none focus:border-primary transition-colors uppercase font-bold tracking-widest"
              >
                <option value="">Sin subcategoría</option>
                {SUBCATEGORIES[formData.categoria]?.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Etiqueta (Tag)</label>
            <input 
              type="text"
              placeholder="Ej: Nueva Temporada, Más Vendido"
              value={formData.tag}
              onChange={(e) => setFormData({...formData, tag: e.target.value})}
              className="w-full bg-background border-b border-border py-2 text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {error && (
            <div className="flex items-center gap-3 text-red-500 bg-red-500/10 p-4 rounded-sm">
              <AlertCircle size={18} />
              <span className="text-xs font-bold uppercase tracking-widest">{error}</span>
            </div>
          )}

          <div className="pt-6 flex flex-col md:flex-row gap-6">
            <button 
              type="submit" 
              disabled={loading || uploading}
              className="flex-1 bg-foreground text-background py-5 rounded-sm font-sans text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all flex items-center justify-center gap-4 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <><Check size={16} /> {initialData ? 'Guardar Cambios' : 'Crear Producto'}</>
              )}
            </button>
            <button 
              type="button" 
              onClick={onClose}
              className="md:px-12 py-5 rounded-sm font-sans text-[10px] font-black uppercase tracking-widest border border-border hover:bg-muted transition-all"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
