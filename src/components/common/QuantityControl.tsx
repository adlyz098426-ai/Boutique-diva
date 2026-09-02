import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantityControlProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
  className?: string;
  size?: 'sm' | 'md';
}

export const QuantityControl: React.FC<QuantityControlProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  min = 1,
  max = 99,
  className = '',
  size = 'md',
}) => {
  const isSm = size === 'sm';

  return (
    <div
      className={`inline-flex items-center justify-between bg-slate-100/90 rounded-xl border border-slate-200/80 p-1 ${
        isSm ? 'h-8 px-1' : 'h-11 px-1.5'
      } ${className}`}
    >
      <button
        type="button"
        id="qty-decrease-btn"
        disabled={quantity <= min}
        onClick={onDecrease}
        className={`flex items-center justify-center rounded-lg bg-white text-[#1A1A1A] transition-all hover:bg-[#FCE4EC] hover:text-[#D81B60] active:scale-95 disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-[#1A1A1A] shadow-xs ${
          isSm ? 'w-6 h-6' : 'w-8 h-8'
        }`}
        aria-label="Disminuir cantidad"
      >
        <Minus className={isSm ? 'w-3 h-3' : 'w-4 h-4'} />
      </button>

      <span
        className={`font-bold text-[#1A1A1A] text-center select-none ${
          isSm ? 'min-w-6 text-xs px-1' : 'min-w-10 text-sm px-2'
        }`}
      >
        {quantity}
      </span>

      <button
        type="button"
        id="qty-increase-btn"
        disabled={quantity >= max}
        onClick={onIncrease}
        className={`flex items-center justify-center rounded-lg bg-white text-[#1A1A1A] transition-all hover:bg-[#FCE4EC] hover:text-[#D81B60] active:scale-95 disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-[#1A1A1A] shadow-xs ${
          isSm ? 'w-6 h-6' : 'w-8 h-8'
        }`}
        aria-label="Aumentar cantidad"
      >
        <Plus className={isSm ? 'w-3 h-3' : 'w-4 h-4'} />
      </button>
    </div>
  );
};
