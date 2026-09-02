import React, { useState } from 'react';
import { Bell, ShoppingBag, Search, Sparkles, ArrowRight, Filter, Flame } from 'lucide-react';
import { motion } from 'motion/react';
import { ProductCard } from '../common/ProductCard';
import { BoutiqueNavbar } from '../common/BoutiqueNavbar';
import { CategoryId, FrameId, Product } from '../../types';
import { CATEGORIES_LIST, PRODUCTS_CATALOG } from '../../data/mockData';

interface Frame03DashboardProps {
  onNavigate: (frame: FrameId) => void;
  onSelectProduct: (product: Product) => void;
  cartCount: number;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  userName?: string;
}

export const Frame03Dashboard: React.FC<Frame03DashboardProps> = ({
  onNavigate,
  onSelectProduct,
  cartCount,
  favorites,
  onToggleFavorite,
  userName = 'Diva',
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [hasUnreadNotification, setHasUnreadNotification] = useState(true);

  // Filter products
  const filteredProducts = PRODUCTS_CATALOG.filter((product) => {
    const matchesCategory = activeCategory === 'todos' || product.category === activeCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full h-full flex flex-col justify-between bg-[#FAFAFA] text-[#1A1A1A] relative overflow-hidden">
      {/* Scrollable Main Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* Top Header Bar */}
        <div className="bg-white px-5 pt-3 pb-3 border-b border-slate-100 sticky top-0 z-20 shadow-2xs">
          {/* Frame Indicator Pill */}
          <div className="flex items-center justify-between mb-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FCE4EC] text-[#D81B60] text-[9px] font-bold tracking-wider uppercase border border-[#F8BBD0]">
              Frame: 03_Inicio_Dashboard
            </span>
            <span className="text-[10px] text-[#C9A227] font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3 fill-[#C9A227]" />
              Boutique Diva App
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display font-bold text-xl text-[#1A1A1A] flex items-center gap-1.5 leading-tight">
                Hola, {userName} <span className="text-base">✨</span>
              </h1>
              <p className="text-xs text-slate-500 font-medium">Descubre tu nuevo estilo</p>
            </div>

            {/* Action Icons: Notification & Cart */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                id="btn-notifications"
                onClick={() => {
                  setHasUnreadNotification(false);
                  alert('¡Tienes un cupón de 20% de descuento en la colección de Vestidos: DIVA20!');
                }}
                className="relative w-9 h-9 rounded-full bg-slate-50 hover:bg-[#FCE4EC] border border-slate-200/80 flex items-center justify-center text-slate-700 hover:text-[#D81B60] transition-colors"
                aria-label="Notificaciones"
              >
                <Bell className="w-4 h-4" />
                {hasUnreadNotification && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#D81B60] border-2 border-white ring-1 ring-[#D81B60]/40 animate-pulse" />
                )}
              </button>

              <button
                type="button"
                id="btn-header-cart"
                onClick={() => onNavigate('05_Carrito')}
                className="relative w-9 h-9 rounded-full bg-slate-50 hover:bg-[#FCE4EC] border border-slate-200/80 flex items-center justify-center text-slate-700 hover:text-[#D81B60] transition-colors"
                aria-label="Ir al Carrito"
              >
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-[#D81B60] text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-3 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              id="dashboard-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar vestidos, blusas, chaquetas..."
              className="w-full bg-slate-100/80 focus:bg-white text-xs text-[#1A1A1A] placeholder:text-slate-400 rounded-xl pl-9 pr-8 py-2.5 border border-transparent focus:border-[#D81B60] focus:outline-none transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Content Section Container */}
        <div className="p-4 space-y-5">
          {/* Main Promotional Banner */}
          <div
            id="hero-promo-banner"
            className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#1A1A1A] via-[#2D1B28] to-[#D81B60] text-white p-5 shadow-md shadow-[#D81B60]/15"
          >
            {/* Ambient pattern overlay */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-25 bg-[radial-gradient(#C9A227_1px,transparent_1px)] [background-size:12px_12px]" />
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-[#D81B60] rounded-full blur-2xl opacity-60" />

            <div className="relative z-10 max-w-[230px]">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#C9A227]/90 text-white text-[9px] font-extrabold uppercase tracking-widest mb-1.5 shadow-xs">
                <Sparkles className="w-2.5 h-2.5" />
                NUEVA COLECCIÓN
              </span>

              <h2 className="font-display font-extrabold text-lg text-white leading-tight mb-1">
                Tendencias Diva 2026
              </h2>

              <p className="text-[11px] text-white/85 leading-snug mb-3">
                “Descubre las tendencias que están hechas para ti.”
              </p>

              <button
                type="button"
                id="btn-banner-shop-now"
                onClick={() => {
                  const featured = PRODUCTS_CATALOG.find((p) => p.name === 'Vestido Diva Rose') || PRODUCTS_CATALOG[0];
                  onSelectProduct(featured);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-[#D81B60] hover:bg-[#FCE4EC] font-bold text-xs uppercase tracking-wider shadow-md active:scale-95 transition-all"
              >
                <span>COMPRAR AHORA</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Categories Horizontal Selector */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <h3 className="font-display font-bold text-sm text-[#1A1A1A] uppercase tracking-wide">
                Categorías
              </h3>
              <span className="text-[11px] text-slate-400 font-medium">5 Secciones</span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4">
              {CATEGORIES_LIST.map((cat) => {
                const isSelected = activeCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    id={`category-pill-${cat.id}`}
                    onClick={() => setActiveCategory(cat.id as CategoryId)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 border shrink-0 ${
                      isSelected
                        ? 'bg-[#D81B60] text-white border-[#D81B60] shadow-sm shadow-[#D81B60]/30 scale-[1.02]'
                        : 'bg-white text-[#1A1A1A] border-slate-200/90 hover:border-[#D81B60]/40 hover:bg-[#FCE4EC]/30'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isSelected ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {cat.id === 'todos'
                        ? PRODUCTS_CATALOG.length
                        : PRODUCTS_CATALOG.filter((p) => p.category === cat.id).length}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Featured Products Header */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-[#D81B60] fill-[#D81B60]" />
                <h3 className="font-display font-bold text-sm text-[#1A1A1A] uppercase tracking-wide">
                  Productos Destacados
                </h3>
              </div>
              <span className="text-[11px] text-[#D81B60] font-semibold">
                {filteredProducts.length} prendas
              </span>
            </div>

            {/* Products Grid (2 columns) */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center border border-slate-100">
                <p className="text-sm font-semibold text-slate-700">No encontramos prendas en esta categoría</p>
                <p className="text-xs text-slate-400 mt-1">Prueba seleccionando "Todos" o cambiando tu búsqueda.</p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory('todos');
                    setSearchQuery('');
                  }}
                  className="mt-3 px-4 py-2 bg-[#FCE4EC] text-[#D81B60] font-bold text-xs rounded-xl"
                >
                  Ver todo el catálogo
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {filteredProducts.map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    isFavorite={favorites.includes(prod.id)}
                    onToggleFavorite={onToggleFavorite}
                    onSelectProduct={onSelectProduct}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BoutiqueNavbar
        currentFrame="03_Inicio_Dashboard"
        onNavigate={onNavigate}
        cartCount={cartCount}
        favoritesCount={favorites.length}
      />
    </div>
  );
};
