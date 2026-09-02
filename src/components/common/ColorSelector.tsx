import React from 'react';
import { Check } from 'lucide-react';
import { ProductColor } from '../../types';

interface ColorSelectorProps {
  colors: ProductColor[];
  selectedColor: ProductColor;
  onChange: (color: ProductColor) => void;
  className?: string;
}

export const ColorSelector: React.FC<ColorSelectorProps> = ({
  colors,
  selectedColor,
  onChange,
  className = '',
}) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">
          Color: <span className="text-[#D81B60] font-semibold">{selectedColor.name}</span>
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {colors.map((c) => {
          const isSelected = selectedColor.name === c.name;
          const isLight = c.hex === '#FFFFFF' || c.hex.toLowerCase() === '#fce4ec' || c.hex.toLowerCase() === '#f8bbd0' || c.hex.toLowerCase() === '#e0e0e0';

          return (
            <button
              key={c.name}
              type="button"
              id={`color-btn-${c.name.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => onChange(c)}
              className={`group relative flex items-center gap-2 p-1.5 pr-3 rounded-full border transition-all duration-200 ${
                isSelected
                  ? 'border-[#D81B60] bg-[#FCE4EC]/50 ring-2 ring-[#D81B60]/20 scale-105'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center border shadow-xs transition-transform group-hover:scale-110"
                style={{
                  backgroundColor: c.hex,
                  borderColor: c.border || (isLight ? '#e2e8f0' : c.hex),
                }}
              >
                {isSelected && (
                  <Check
                    className={`w-3 h-3 stroke-[3] ${
                      isLight ? 'text-[#1A1A1A]' : 'text-white'
                    }`}
                  />
                )}
              </span>
              <span className="text-xs font-medium text-[#1A1A1A]">{c.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
