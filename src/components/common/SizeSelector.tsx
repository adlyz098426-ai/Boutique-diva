import React from 'react';
import { ProductSize } from '../../types';

interface SizeSelectorProps {
  sizes: ProductSize[];
  selectedSize: ProductSize;
  onChange: (size: ProductSize) => void;
  className?: string;
}

export const SizeSelector: React.FC<SizeSelectorProps> = ({
  sizes,
  selectedSize,
  onChange,
  className = '',
}) => {
  const allPossibleSizes: ProductSize[] = ['XS', 'S', 'M', 'L', 'XL'];

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">
          Talla seleccionada: <span className="text-[#D81B60]">{selectedSize}</span>
        </span>
        <button
          type="button"
          onClick={() => alert('Guía de tallas: XS (32-34), S (36), M (38), L (40), XL (42)')}
          className="text-[11px] text-slate-500 hover:text-[#D81B60] underline underline-offset-2 transition-colors font-medium"
        >
          Guía de tallas
        </button>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {allPossibleSizes.map((size) => {
          const isAvailable = sizes.includes(size);
          const isSelected = selectedSize === size;

          return (
            <button
              key={size}
              type="button"
              id={`size-btn-${size.toLowerCase()}`}
              disabled={!isAvailable}
              onClick={() => isAvailable && onChange(size)}
              className={`py-2.5 rounded-xl font-bold text-xs transition-all duration-200 flex items-center justify-center border ${
                !isAvailable
                  ? 'bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed line-through'
                  : isSelected
                  ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-md shadow-black/10 scale-[1.02]'
                  : 'bg-white text-[#1A1A1A] border-slate-200 hover:border-[#D81B60] hover:text-[#D81B60] hover:bg-[#FCE4EC]/40'
              }`}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
};
