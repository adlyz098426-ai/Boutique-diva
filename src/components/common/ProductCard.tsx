import React from 'react';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelectProduct: (product: Product) => void;
  compact?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isFavorite,
  onToggleFavorite,
  onSelectProduct,
  compact = false,
}) => {
  return (
    <motion.div
      id={`product-card-${product.id}`}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative bg-white rounded-2xl border border-slate-100/90 shadow-sm hover:shadow-md hover:border-[#FCE4EC] transition-all duration-300 overflow-hidden flex flex-col justify-between"
    >
      {/* Image container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.badge && (
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-[#1A1A1A]/85 text-white backdrop-blur-xs shadow-xs">
              {product.badge}
            </span>
          )}
          {product.oldPrice && (
            <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-[#D81B60] text-white shadow-xs">
              -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          type="button"
          id={`fav-btn-${product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(product.id);
          }}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-200 z-10 shadow-xs ${
            isFavorite
              ? 'bg-[#D81B60] text-white scale-105'
              : 'bg-white/85 text-slate-600 hover:text-[#D81B60] hover:bg-white'
          }`}
          aria-label="Guardar en favoritos"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current stroke-current' : ''}`} />
        </button>

        {/* Quick view button overlay */}
        <button
          type="button"
          onClick={() => onSelectProduct(product)}
          className="absolute inset-x-3 bottom-3 py-2 px-3 bg-white/95 hover:bg-[#D81B60] text-[#1A1A1A] hover:text-white font-semibold text-xs rounded-xl shadow-md backdrop-blur-xs flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0"
        >
          <span>Ver producto</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-3.5 flex flex-col flex-grow justify-between gap-2.5 bg-white">
        <div>
          <div className="flex items-center gap-1 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#C9A227] flex items-center gap-0.5">
              <Sparkles className="w-3 h-3 fill-[#C9A227]" />
              Boutique Diva
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-[10px] text-slate-500 capitalize">{product.category}</span>
          </div>

          <h3
            onClick={() => onSelectProduct(product)}
            className="font-display font-semibold text-[#1A1A1A] text-sm leading-snug line-clamp-1 hover:text-[#D81B60] cursor-pointer transition-colors"
          >
            {product.name}
          </h3>
        </div>

        <div className="flex items-center justify-between pt-1 border-t border-slate-100">
          <div className="flex items-baseline gap-1.5">
            <span className="font-display font-bold text-base text-[#D81B60]">
              ${product.price.toFixed(2).replace('.', ',')}
            </span>
            {product.oldPrice && (
              <span className="text-xs text-slate-400 line-through">
                ${product.oldPrice.toFixed(2).replace('.', ',')}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => onSelectProduct(product)}
            className="text-xs font-semibold text-[#1A1A1A] hover:text-[#D81B60] px-2.5 py-1 bg-[#FCE4EC]/50 hover:bg-[#FCE4EC] rounded-lg transition-colors"
          >
            Ver producto
          </button>
        </div>
      </div>
    </motion.div>
  );
};
