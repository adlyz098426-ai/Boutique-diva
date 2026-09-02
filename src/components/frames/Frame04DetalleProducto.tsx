import React, { useState } from 'react';
import { ArrowLeft, Heart, Sparkles, Check, Truck, ShieldCheck, Clock, Share2, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BoutiqueButton } from '../common/BoutiqueButton';
import { SizeSelector } from '../common/SizeSelector';
import { ColorSelector } from '../common/ColorSelector';
import { QuantityControl } from '../common/QuantityControl';
import { Product, ProductColor, ProductSize, FrameId } from '../../types';

interface Frame04DetalleProductoProps {
  product: Product;
  onNavigate: (frame: FrameId) => void;
  onAddToCart: (product: Product, size: ProductSize, color: ProductColor, quantity: number) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const Frame04DetalleProducto: React.FC<Frame04DetalleProductoProps> = ({
  product,
  onNavigate,
  onAddToCart,
  isFavorite,
  onToggleFavorite,
}) => {
  const [selectedSize, setSelectedSize] = useState<ProductSize>(
    product.availableSizes[0] || 'M'
  );
  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    product.colors[0] || { name: 'Rosa Diva', hex: '#D81B60' }
  );
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [addedToast, setAddedToast] = useState(false);

  const images = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  const handleAddToCartClick = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setAddedToast(true);
    setTimeout(() => {
      setAddedToast(false);
      // Interaction 5: 04_Detalle_Producto -> 05_Carrito (Slide Out)
      onNavigate('05_Carrito');
    }, 450);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between bg-white text-[#1A1A1A] relative overflow-hidden">
      {/* Scrollable Product Details */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* Top Floating Action Bar */}
        <div className="absolute top-3 left-4 right-4 z-20 flex items-center justify-between">
          <button
            type="button"
            id="btn-detail-back"
            onClick={() => onNavigate('03_Inicio_Dashboard')}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center text-[#1A1A1A] hover:text-[#D81B60] transition-colors"
            aria-label="Volver al catálogo"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Frame Indicator Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#D81B60] text-[10px] font-bold uppercase tracking-wider shadow-md border border-[#F8BBD0]">
            Frame: 04_Detalle_Producto
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              id="btn-detail-share"
              onClick={() => alert('¡Enlace de la prenda copiado al portapapeles!')}
              className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center text-slate-700 hover:text-[#D81B60] transition-colors"
              aria-label="Compartir producto"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              type="button"
              id="btn-detail-fav"
              onClick={() => onToggleFavorite(product.id)}
              className={`w-10 h-10 rounded-full backdrop-blur-md shadow-md flex items-center justify-center transition-all ${
                isFavorite
                  ? 'bg-[#D81B60] text-white scale-105'
                  : 'bg-white/90 text-slate-700 hover:text-[#D81B60]'
              }`}
              aria-label="Añadir a favoritos"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Large Product Photography */}
        <div className="relative w-full aspect-[4/4.5] bg-slate-100 overflow-hidden">
          <motion.img
            key={activeImageIndex}
            initial={{ opacity: 0.6, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            src={images[activeImageIndex] || product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center"
          />

          {/* Bottom badge */}
          {product.badge && (
            <div className="absolute bottom-4 left-4 px-3 py-1 bg-[#1A1A1A]/85 text-white font-bold text-xs uppercase tracking-wider rounded-lg backdrop-blur-xs shadow-sm">
              {product.badge}
            </div>
          )}

          {/* Image Dots Indicator if gallery exists */}
          {images.length > 1 && (
            <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-full">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeImageIndex === idx ? 'bg-white w-4' : 'bg-white/50'
                  }`}
                  aria-label={`Ver foto ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Details Body */}
        <div className="p-5 space-y-5 bg-white rounded-t-3xl -mt-5 relative z-10 shadow-lg">
          {/* Title and Price */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-[#C9A227] uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 fill-[#C9A227]" />
                Colección Diva 2026
              </span>

              {/* Rating */}
              <div className="flex items-center gap-1 text-xs font-semibold text-slate-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                <Star className="w-3.5 h-3.5 fill-[#C9A227] text-[#C9A227]" />
                <span>{product.rating}</span>
                <span className="text-slate-400">({product.reviewsCount})</span>
              </div>
            </div>

            <h1 className="font-display font-bold text-2xl text-[#1A1A1A] leading-tight">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-2.5 mt-2">
              <span className="font-display font-extrabold text-2xl text-[#D81B60]">
                ${product.price.toFixed(2).replace('.', ',')}
              </span>
              {product.oldPrice && (
                <span className="text-sm text-slate-400 line-through">
                  ${product.oldPrice.toFixed(2).replace('.', ',')}
                </span>
              )}
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                Ahorras ${( (product.oldPrice || product.price * 1.3) - product.price ).toFixed(2).replace('.', ',')}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="border-t border-b border-slate-100 py-3.5">
            <h2 className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
              Descripción
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              “{product.description}”
            </p>
            {product.material && (
              <p className="text-[11px] text-slate-400 mt-2">
                <span className="font-semibold text-slate-600">Material:</span> {product.material}
              </p>
            )}
          </div>

          {/* Size Selector */}
          <div>
            <SizeSelector
              sizes={product.availableSizes}
              selectedSize={selectedSize}
              onChange={setSelectedSize}
            />
          </div>

          {/* Color Selector */}
          <div>
            <ColorSelector
              colors={product.colors}
              selectedColor={selectedColor}
              onChange={setSelectedColor}
            />
          </div>

          {/* Quantity Control Row */}
          <div className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <div>
              <span className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider block">
                Cantidad
              </span>
              <span className="text-[11px] text-slate-500">Unidades a comprar</span>
            </div>
            <QuantityControl
              quantity={quantity}
              onIncrease={() => setQuantity((q) => Math.min(99, q + 1))}
              onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
            />
          </div>

          {/* Trust Guarantees */}
          <div className="bg-[#FCE4EC]/40 rounded-2xl p-4 border border-[#F8BBD0]/60 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-slate-700 font-medium">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 font-bold">
                ✓
              </span>
              <span>
                <strong className="text-[#1A1A1A]">En stock</strong> — Listo para despacho inmediato
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-700 font-medium">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 font-bold">
                ✓
              </span>
              <span>
                <strong className="text-[#1A1A1A]">Envíos disponibles</strong> a todo el país (24-48 hrs)
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-700 font-medium">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 font-bold">
                ✓
              </span>
              <span>
                <strong className="text-[#1A1A1A]">Compra segura</strong> con garantía Boutique Diva
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action Bar with Big Add to Cart Button */}
      <div className="p-4 bg-white/95 backdrop-blur-md border-t border-slate-100 sticky bottom-0 z-20 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Total a pagar</span>
            <span className="font-display font-extrabold text-lg text-[#1A1A1A]">
              ${(product.price * quantity).toFixed(2).replace('.', ',')}
            </span>
          </div>

          <div className="flex-1">
            <BoutiqueButton
              id="btn-add-to-cart-main"
              onClick={handleAddToCartClick}
              themeColor="pink"
              size="lg"
              label="AGREGAR AL CARRITO"
            />
          </div>
        </div>
      </div>

      {/* Success Toast Notification */}
      <AnimatePresence>
        {addedToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute bottom-20 inset-x-6 z-50 bg-[#1A1A1A] text-white p-3.5 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-700"
          >
            <div className="w-8 h-8 rounded-full bg-[#D81B60] flex items-center justify-center shrink-0">
              <Check className="w-4 h-4 text-white stroke-[3]" />
            </div>
            <div className="text-xs">
              <p className="font-bold text-white">¡Añadido a tu carrito!</p>
              <p className="text-slate-300">
                {product.name} ({selectedSize}, {selectedColor.name}) x {quantity}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
