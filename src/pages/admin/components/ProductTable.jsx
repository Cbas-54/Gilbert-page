import { Loader2, EyeOff, Eye, Pencil, Trash2 } from 'lucide-react';

const ProductTable = ({ 
  filteredProducts, 
  processingIds, 
  handleToggleStatus, 
  handleDelete, 
  setEditingProduct, 
  setShowForm 
}) => {
  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse table-fixed">
          <thead>
            <tr className="border-b border-white dark:border-white/5 bg-white dark:bg-zinc-800/80">
              <th className="w-[55%] md:w-[45%] px-3 md:px-4 py-5 text-[9px] font-black uppercase tracking-widest text-muted-foreground">Producto ({filteredProducts.length})</th>
              <th className="w-0 md:w-[20%] px-4 py-5 text-[9px] font-black uppercase tracking-widest text-muted-foreground hidden md:table-cell">Categoría</th>
              <th className="w-[25%] md:w-[15%] px-3 md:px-4 py-5 text-[9px] font-black uppercase tracking-widest text-muted-foreground text-center">Precio</th>
              <th className="w-[20%] md:w-[10%] px-3 md:px-4 py-5 text-[9px] font-black uppercase tracking-widest text-muted-foreground text-center">Estado</th>
              <th className="w-0 md:w-[10%] px-4 py-5 text-[9px] font-black uppercase tracking-widest text-muted-foreground text-right hidden md:table-cell"></th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((p) => (
              <tr 
                key={p.id} 
                onClick={() => { setEditingProduct(p); setShowForm(true); }}
                className="border-b border-white dark:border-white/5 hover:bg-muted/30 transition-colors group cursor-pointer"
              >
                <td className="px-3 md:px-4 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-muted rounded-lg overflow-hidden border border-border shrink-0">
                      {p.image ? (
                        <img src={p.image} alt="" className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[8px] font-black opacity-20">NO IMG</div>
                      )}
                    </div>
                    <div className="flex flex-col min-w-0 overflow-hidden">
                      <span className="font-serif text-sm md:text-lg text-foreground truncate">{p.name}</span>
                      <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60 md:hidden truncate">{p.subcategory || p.category}</span>
                      {p.subcategory && <span className="text-[9px] font-black uppercase tracking-widest text-primary-600/40 hidden md:block truncate">{p.subcategory}</span>}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-5 font-sans text-[10px] font-bold uppercase tracking-widest text-muted-foreground hidden md:table-cell">{p.category}</td>
                <td className="px-3 md:px-4 py-5 font-serif italic text-sm md:text-lg text-foreground text-center">${p.price.toLocaleString('es-AR')}</td>
                <td className="px-3 md:px-4 py-5 text-center">
                  {processingIds.has(p.id) ? (
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[7px] md:text-[8px] font-black uppercase tracking-widest bg-primary/5 text-primary-600 animate-pulse">
                      <div className="w-1 h-1 bg-primary-600 rounded-full animate-bounce" />
                      Procesando
                    </span>
                  ) : (
                    <span className={`px-2 py-1 rounded-full text-[7px] md:text-[8px] font-black uppercase tracking-widest ${p.status === 'Activo' ? 'bg-primary/20 text-primary-600 dark:bg-primary/30 dark:text-primary-400' : 'bg-muted text-muted-foreground dark:bg-zinc-800 dark:text-zinc-500'}`}>
                      {p.status === 'Activo' ? 'Activo' : 'Pausado'}
                    </span>
                  )}
                </td>
                <td className="px-4 py-5 hidden md:table-cell">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" onClick={(e) => e.stopPropagation()}>
                    <button 
                      onClick={() => handleToggleStatus(p)}
                      disabled={processingIds.has(p.id)}
                      title={p.status === 'Activo' ? 'Pausar' : 'Activar'}
                      className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-primary-600 disabled:opacity-50 cursor-pointer"
                    >
                      {processingIds.has(p.id) ? (
                        <Loader2 size={14} className="animate-spin text-primary-600" />
                      ) : (
                        p.status === 'Activo' ? <EyeOff size={14} /> : <Eye size={14} />
                      )}
                    </button>
                    <button 
                      onClick={() => handleDelete(p.id)}
                      title="Borrar"
                      className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-red-500 cursor-pointer"
                    >
                      <Trash2 size={14} />
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
  );
};

export default ProductTable;
