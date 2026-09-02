import React, { useState } from 'react';
import { ArrowLeft, Trash2, ShieldCheck, Sparkles, ShoppingBag, CheckCircle, Gift, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';
import { BoutiqueButton } from '../common/BoutiqueButton';
import { QuantityControl } from '../common/QuantityControl';
import { BoutiqueNavbar } from '../common/BoutiqueNavbar';
import { CartItem, FrameId } from '../../types';

interface Frame05CarritoProps {
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  onNavigate: (frame: FrameId) => void;
  favoritesCount: number;
}

export const Frame05Carrito: React.FC<Frame05CarritoProps> = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onNavigate,
  favoritesCount,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipping = cartItems.length > 0 ? 3.0 : 0.0;
  const discountAmount = (subtotal * discountPercent) / 100;
  const total = Math.max(0, subtotal - discountAmount + shipping);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase().trim() === 'DIVA20') {
      setDiscountPercent(20);
      setCouponApplied(true);
      setCouponError('');
    } else if (couponCode.toUpperCase().trim() === 'DIVA10') {
      setDiscountPercent(10);
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError('Cupón no válido. Prueba con DIVA20');
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    setIsCheckingOut(true);

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#D81B60', '#C9A227', '#FCE4EC', '#1A1A1A'],
      });
    } catch {
      // safe fallback
    }

    setTimeout(() => {
      setIsCheckingOut(false);
      setShowSuccessModal(true);
    }, 600);
  };

  const handleFinishPurchaseFlow = () => {
    setShowSuccessModal(false);
    onClearCart();
    onNavigate('03_Inicio_Dashboard');
  };

  return (
    <div className="w-full h-full flex flex-col justify-between bg-[#FAFAFA] text-[#1A1A1A] relative overflow-hidden">
      {/* Scrollable Cart Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* Top Header */}
        <div className="bg-white px-5 pt-3 pb-3 border-b border-slate-100 sticky top-0 z-20 shadow-2xs">
          <div className="flex items-center justify-between mb-1.5">
            {/* Interaction 6: Return to Dashboard */}
            <button
              type="button"
              id="btn-cart-back-dashboard"
              onClick={() => onNavigate('03_Inicio_Dashboard')}
              className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 hover:text-[#D81B60] transition-colors"
              aria-label="Volver a Inicio"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FCE4EC] text-[#D81B60] text-[9px] font-bold tracking-wider uppercase border border-[#F8BBD0]">
              Frame: 05_Carrito
            </span>

            <span className="text-xs text-slate-400 font-medium">
              {cartItems.length} {cartItems.length === 1 ? 'artículo' : 'artículos'}
            </span>
          </div>

          <h1 className="font-display font-bold text-2xl text-[#1A1A1A]">Mi carrito</h1>
        </div>

        {/* Cart Items List */}
        <div className="p-4 space-y-4">
          {cartItems.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 text-center border border-slate-100 shadow-2xs my-6">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-[#FCE4EC] text-[#D81B60] flex items-center justify-center">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h2 className="font-display font-bold text-base text-[#1A1A1A]">Tu carrito está vacío</h2>
              <p className="text-xs text-slate-500 mt-1 mb-4">
                Explora nuestras colecciones y descubre prendas exclusivas para ti.
              </p>
              <button
                type="button"
                onClick={() => onNavigate('03_Inicio_Dashboard')}
                className="px-5 py-2.5 bg-[#D81B60] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md"
              >
                Explorar Colección
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-2xs flex gap-3.5 items-center relative group"
                >
                  {/* Product Thumbnail */}
                  <div className="w-20 h-24 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <div>
                        <h3 className="font-display font-bold text-sm text-[#1A1A1A] truncate">
                          {item.product.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500">
                          <span className="bg-slate-100 px-1.5 py-0.5 rounded font-semibold text-[#1A1A1A]">
                            Talla: {item.selectedSize}
                          </span>
                          <span className="flex items-center gap-1">
                            <span
                              className="w-2.5 h-2.5 rounded-full border border-slate-300"
                              style={{ backgroundColor: item.selectedColor.hex }}
                            />
                            {item.selectedColor.name}
                          </span>
                        </div>
                      </div>

                      {/* Delete Button */}
                      <button
                        type="button"
                        id={`btn-remove-${item.id}`}
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        aria-label="Eliminar producto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Price and Quantity Stepper */}
                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-50">
                      <span className="font-display font-extrabold text-sm text-[#D81B60]">
                        ${(item.product.price * item.quantity).toFixed(2).replace('.', ',')}
                      </span>

                      <QuantityControl
                        size="sm"
                        quantity={item.quantity}
                        onIncrease={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        onDecrease={() => {
                          if (item.quantity > 1) {
                            onUpdateQuantity(item.id, item.quantity - 1);
                          } else {
                            onRemoveItem(item.id);
                          }
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {cartItems.length > 0 && (
            <>
              {/* Coupon Code Accordion */}
              <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-2xs">
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Código de cupón (ej. DIVA20)"
                    className="flex-1 bg-slate-50 text-xs px-3 py-2 rounded-xl border border-slate-200 focus:border-[#D81B60] focus:outline-none uppercase"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-[#1A1A1A] text-white text-xs font-bold rounded-xl hover:bg-black transition-colors"
                  >
                    Aplicar
                  </button>
                </form>
                {couponApplied && (
                  <p className="text-xs text-emerald-600 font-semibold mt-1.5 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    ¡Cupón aplicado! 20% de descuento
                  </p>
                )}
                {couponError && <p className="text-xs text-red-500 mt-1.5">{couponError}</p>}
              </div>

              {/* Purchase Summary (Exact specs) */}
              <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-2xs space-y-2.5">
                <h3 className="font-display font-bold text-xs uppercase tracking-wider text-[#1A1A1A] pb-2 border-b border-slate-100">
                  Resumen de compra
                </h3>

                <div className="flex justify-between text-xs text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#1A1A1A]">
                    ${subtotal.toFixed(2).replace('.', ',')}
                  </span>
                </div>

                {discountPercent > 0 && (
                  <div className="flex justify-between text-xs text-emerald-600 font-semibold">
                    <span>Descuento ({discountPercent}%)</span>
                    <span>-${discountAmount.toFixed(2).replace('.', ',')}</span>
                  </div>
                )}

                <div className="flex justify-between text-xs text-slate-600">
                  <span>Envío estándar</span>
                  <span className="font-semibold text-[#1A1A1A]">
                    ${shipping.toFixed(2).replace('.', ',')}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-100 flex justify-between items-baseline">
                  <span className="font-display font-bold text-sm text-[#1A1A1A]">Total</span>
                  <span className="font-display font-extrabold text-lg text-[#D81B60]">
                    ${total.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>

              {/* Finalize Purchase Button */}
              <div className="space-y-2.5 pt-1">
                <BoutiqueButton
                  id="btn-finalize-purchase"
                  onClick={handleCheckout}
                  themeColor="pink"
                  size="lg"
                  disabled={isCheckingOut}
                  label={isCheckingOut ? 'PROCESANDO...' : 'FINALIZAR COMPRA'}
                >
                  <div className="flex items-center justify-center gap-2">
                    <span>{isCheckingOut ? 'PROCESANDO...' : 'FINALIZAR COMPRA'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </BoutiqueButton>

                {/* Secure Purchase Message */}
                <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 font-medium text-center">
                  <ShieldCheck className="w-4 h-4 text-[#C9A227]" />
                  <span>Compra segura y protegida</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-6 text-center max-w-xs w-full shadow-2xl border border-slate-100"
            >
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
                <CheckCircle className="w-10 h-10" />
              </div>

              <span className="text-[10px] font-bold text-[#C9A227] uppercase tracking-wider">
                Pedido #BD-2026-8942
              </span>

              <h2 className="font-display font-bold text-xl text-[#1A1A1A] mt-0.5 mb-1">
                ¡Gracias por tu compra!
              </h2>

              <p className="text-xs text-slate-500 mb-4">
                Hemos enviado los detalles y número de rastreo a{' '}
                <strong className="text-slate-800">maria@email.com</strong>.
              </p>

              <div className="bg-[#FCE4EC]/50 p-3 rounded-2xl mb-4 text-left text-xs space-y-1 border border-[#F8BBD0]/50">
                <div className="flex justify-between font-bold text-[#1A1A1A]">
                  <span>Total cobrado:</span>
                  <span className="text-[#D81B60]">${total.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="text-[11px] text-slate-500">
                  Entrega estimada: 2 a 3 días hábiles
                </div>
              </div>

              <button
                type="button"
                id="btn-modal-back-dashboard"
                onClick={handleFinishPurchaseFlow}
                className="w-full py-3 bg-[#D81B60] hover:bg-[#AD1457] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all"
              >
                Volver a la tienda
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <BoutiqueNavbar
        currentFrame="05_Carrito"
        onNavigate={onNavigate}
        cartCount={cartItems.length}
        favoritesCount={favoritesCount}
      />
    </div>
  );
};
