import { useState } from 'react';

const ProductImage = ({ product }) => {
  const [hasError, setHasError] = useState(false);

  if (!product.image || hasError) {
    return (
      <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground p-6 text-center">
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
    <div className="group flex flex-col gap-4 bg-muted p-4 rounded-xl animate-in fade-in slide-in-from-bottom-4 duration-500 hover:shadow-lg transition-all border-none">
      <div className="aspect-square bg-background/30 rounded-lg overflow-hidden relative border-none">
        <ProductImage product={product} />
      </div>
      <div className="space-y-1">
        {product.tag && (
          <span className="text-[8px] font-sans font-black uppercase tracking-widest text-primary-600">
            {product.tag}
          </span>
        )}
        <h3 className="font-serif text-xl text-foreground">{product.name}</h3>
        <p className="font-serif text-3xl italic text-foreground">
          <span className="text-primary-600 not-italic mr-1">$</span>
          {product.price.toLocaleString('es-AR')}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
