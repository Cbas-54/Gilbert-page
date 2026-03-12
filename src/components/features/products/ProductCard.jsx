import { useState } from 'react';

const ProductImage = ({ product }) => {
  const [hasError, setHasError] = useState(false);

  if (!product.image || hasError) {
    return (
      <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black uppercase tracking-[0.3em] text-dark-deep/10 p-6 text-center">
        {product.name}
      </div>
    );
  }

  return (
    <div className="w-full h-full p-2 flex items-center justify-center">
      <img 
        src={product.image} 
        alt={product.name}
        onError={() => setHasError(true)}
        className="max-w-full max-h-full object-contain grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
      />
    </div>
  );
};

const ProductCard = ({ product }) => {
  return (
    <div className="group flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="aspect-square bg-dark-deep/5 rounded-sm overflow-hidden relative border border-dark-deep/5">
        <ProductImage product={product} />
        
        <div className="absolute inset-0 bg-dark-deep/0 transition-all duration-500 group-hover:bg-dark-deep/40 flex items-center justify-center">
          <button className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 bg-white text-dark-deep px-6 py-3 text-[9px] font-black uppercase tracking-widest transition-all duration-500 hover:bg-primary-600 hover:text-white">
            Ver Detalle
          </button>
        </div>
      </div>
      <div className="space-y-1">
        <span className="text-[8px] font-sans font-black uppercase tracking-widest text-primary-600">{product.tag || 'Calidad Guilberth'}</span>
        <h3 className="font-serif text-xl text-dark-deep">{product.name}</h3>
        <p className="font-serif text-lg italic text-dark-deep/60">${product.price.toLocaleString('es-AR')}</p>
      </div>
    </div>
  );
};

export default ProductCard;
