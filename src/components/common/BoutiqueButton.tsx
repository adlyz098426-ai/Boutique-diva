import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { ShoppingBag, Sparkles } from 'lucide-react';

export type ButtonVariantState = 'normal' | 'hover' | 'pressed' | 'disabled';

interface BoutiqueButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children?: React.ReactNode;
  variantState?: ButtonVariantState;
  showIcon?: boolean;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
  themeColor?: 'pink' | 'black' | 'gold' | 'outline';
  label?: string;
  badge?: string;
}

export const BoutiqueButton: React.FC<BoutiqueButtonProps> = ({
  children,
  variantState = 'normal',
  showIcon = true,
  fullWidth = true,
  size = 'lg',
  themeColor = 'pink',
  label = 'AGREGAR AL CARRITO',
  badge,
  className = '',
  disabled,
  onClick,
  ...rest
}) => {
  const isDisabled = disabled || variantState === 'disabled';

  // Size classes
  const sizeClasses = {
    sm: 'py-2 px-4 text-xs font-semibold tracking-wider rounded-xl',
    md: 'py-3 px-5 text-sm font-semibold tracking-wider rounded-2xl',
    lg: 'py-4 px-6 text-sm font-bold tracking-wider rounded-2xl',
  }[size];

  // Base theme classes
  const getThemeClasses = () => {
    if (isDisabled) {
      return 'bg-gray-300 text-gray-500 border border-gray-300 cursor-not-allowed shadow-none';
    }

    if (variantState === 'hover') {
      switch (themeColor) {
        case 'pink':
          return 'bg-[#C2185B] text-white border border-[#C2185B] shadow-lg shadow-[#D81B60]/30';
        case 'black':
          return 'bg-[#2d2d2d] text-white border border-[#2d2d2d] shadow-md';
        case 'gold':
          return 'bg-[#B28E1D] text-white border border-[#B28E1D] shadow-md';
        case 'outline':
          return 'bg-[#FCE4EC] text-[#D81B60] border border-[#D81B60] shadow-sm';
      }
    }

    if (variantState === 'pressed') {
      switch (themeColor) {
        case 'pink':
          return 'bg-[#AD1457] text-white/90 border border-[#AD1457] scale-95 shadow-inner';
        case 'black':
          return 'bg-[#000000] text-white/90 border border-black scale-95 shadow-inner';
        case 'gold':
          return 'bg-[#997711] text-white/90 border border-[#997711] scale-95 shadow-inner';
        case 'outline':
          return 'bg-[#F8BBD0] text-[#D81B60] border border-[#D81B60] scale-95';
      }
    }

    // Default 'normal'
    switch (themeColor) {
      case 'pink':
        return 'bg-[#D81B60] hover:bg-[#C2185B] text-white border border-[#D81B60] shadow-md shadow-[#D81B60]/20 active:bg-[#AD1457]';
      case 'black':
        return 'bg-[#1A1A1A] hover:bg-[#2d2d2d] text-white border border-[#1A1A1A] active:bg-black';
      case 'gold':
        return 'bg-[#C9A227] hover:bg-[#B28E1D] text-white border border-[#C9A227] shadow-md shadow-[#C9A227]/20 active:bg-[#997711]';
      case 'outline':
        return 'bg-white hover:bg-[#FCE4EC] text-[#D81B60] border-2 border-[#D81B60] active:bg-[#F8BBD0]';
    }
  };

  return (
    <motion.button
      type="button"
      id="boutique-cart-button"
      disabled={isDisabled}
      onClick={isDisabled ? undefined : onClick}
      whileHover={!isDisabled && variantState === 'normal' ? { scale: 1.015, transition: { duration: 0.15 } } : undefined}
      whileTap={!isDisabled && variantState === 'normal' ? { scale: 0.96, transition: { duration: 0.1 } } : undefined}
      className={`relative inline-flex items-center justify-center gap-2.5 transition-colors duration-200 uppercase font-sans ${
        fullWidth ? 'w-full' : ''
      } ${sizeClasses} ${getThemeClasses()} ${className}`}
      {...rest}
    >
      {showIcon && (
        <span className="shrink-0">
          {isDisabled ? (
            <ShoppingBag className="w-4 h-4 opacity-50" />
          ) : (
            <ShoppingBag className="w-4 h-4 text-current" />
          )}
        </span>
      )}
      <span className="truncate">{children || label}</span>
      {badge && (
        <span className="ml-1.5 px-2 py-0.5 text-[10px] bg-white/20 text-white rounded-full font-bold uppercase tracking-wider">
          {badge}
        </span>
      )}
    </motion.button>
  );
};
