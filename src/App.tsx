/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Smartphone,
  Layers,
  Palette,
  GitFork,
  RotateCcw,
  Sparkles,
  Crown,
  ChevronDown,
  Info,
  ZoomIn,
  ZoomOut,
  CheckCircle2,
  Share2,
} from 'lucide-react';
import { IPhoneSimulator } from './components/views/iPhoneSimulator';
import { AllFramesGalleryView } from './components/views/AllFramesGalleryView';
import { DesignSystemView } from './components/views/DesignSystemView';
import { FlowDiagramView } from './components/views/FlowDiagramView';
import { PRODUCTS_CATALOG, MOCK_USER } from './data/mockData';
import {
  CartItem,
  FrameId,
  Product,
  ProductColor,
  ProductSize,
  UserProfile,
  ViewMode,
} from './types';

export default function App() {
  // Navigation & View Mode State
  const [viewMode, setViewMode] = useState<ViewMode>('simulator');
  const [currentFrame, setCurrentFrame] = useState<FrameId>('01_Login');
  const [previousFrame, setPreviousFrame] = useState<FrameId | null>(null);

  // Simulator controls
  const [phoneScale, setPhoneScale] = useState<number>(0.92);
  const [bezelColor, setBezelColor] = useState<'natural' | 'black' | 'gold' | 'rose'>('natural');

  // Interactive App State
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS_CATALOG[0]); // Vestido Diva Rose
  const [favorites, setFavorites] = useState<string[]>(['prod-1', 'prod-2']);
  const [user, setUser] = useState<UserProfile>(MOCK_USER);

  // Initial cart items matching the requirements
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'cart-1',
      product: PRODUCTS_CATALOG[0], // Vestido Diva Rose ($39.99)
      selectedSize: 'M',
      selectedColor: { name: 'Rosa Diva', hex: '#D81B60' },
      quantity: 1,
    },
    {
      id: 'cart-2',
      product: PRODUCTS_CATALOG[1], // Blusa Elegance ($24.99)
      selectedSize: 'S',
      selectedColor: { name: 'Blanco Seda', hex: '#FFFFFF', border: '#e2e8f0' },
      quantity: 1,
    },
  ]);

  // Frame navigation handler with history tracking for realistic transitions
  const handleNavigate = (newFrame: FrameId) => {
    setPreviousFrame(currentFrame);
    setCurrentFrame(newFrame);
  };

  // Add to cart handler
  const handleAddToCart = (
    product: Product,
    size: ProductSize,
    color: ProductColor,
    quantity: number
  ) => {
    const newItem: CartItem = {
      id: `cart-${Date.now()}`,
      product,
      selectedSize: size,
      selectedColor: color,
      quantity,
    };
    setCartItems((prev) => [newItem, ...prev]);
  };

  // Update cart quantity
  const handleUpdateCartQty = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  // Remove cart item
  const handleRemoveCartItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  // Clear cart
  const handleClearCart = () => {
    setCartItems([]);
  };

  // Toggle favorite
  const handleToggleFavorite = (productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  // Reset prototype to starting state
  const handleRestartPrototype = () => {
    setPreviousFrame(null);
    setCurrentFrame('01_Login');
    setSelectedProduct(PRODUCTS_CATALOG[0]);
  };

  const framesOptions: { id: FrameId; label: string }[] = [
    { id: '01_Login', label: '01_Login (Inicio de Sesión)' },
    { id: '02_Registro', label: '02_Registro (Crear Cuenta)' },
    { id: '03_Inicio_Dashboard', label: '03_Inicio_Dashboard (Catálogo)' },
    { id: '04_Detalle_Producto', label: '04_Detalle_Producto (Prenda)' },
    { id: '05_Carrito', label: '05_Carrito (Mi Carrito)' },
    { id: '06_Perfil', label: '06_Perfil (Perfil Usuaria - Extra)' },
  ];

  return (
    <div className="min-h-screen bg-[#fdf2f5] text-[#1A1A1A] flex flex-col selection:bg-[#D81B60] selection:text-white relative overflow-x-hidden">
      {/* Subtle luxury ambient glows */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-[#FCE4EC] rounded-full blur-3xl opacity-70 pointer-events-none -mr-40 -mt-40 z-0" />
      <div className="fixed bottom-0 left-0 w-[450px] h-[450px] bg-[#FFF8E1] rounded-full blur-3xl opacity-60 pointer-events-none -ml-32 -mb-32 z-0" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FCE4EC]/40 rounded-full blur-3xl opacity-40 pointer-events-none z-0" />

      {/* Top Application Header with Luxury / Prestige Styling */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-pink-100/90 px-4 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4 shadow-sm relative">
        {/* Brand identity */}
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#D81B60] via-[#E91E63] to-[#C9A227] p-0.5 shadow-md shadow-[#D81B60]/20 flex items-center justify-center">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
              <Crown className="w-6 h-6 text-[#D81B60] fill-[#FCE4EC]" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="font-display font-extrabold text-xl tracking-tight text-[#D81B60] uppercase">
                BOUTIQUE <span className="text-[#1A1A1A]">DIVA</span>
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-[#FCE4EC] text-[#D81B60] text-[10px] font-bold tracking-wider uppercase border border-[#F8BBD0]">
                AA 10 • Prototipo
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FFF8E1] text-[#C9A227] text-[10px] font-bold border border-[#FFE082]">
                <Sparkles className="w-3 h-3 fill-[#C9A227]" />
                Luxury / Prestige
              </span>
            </div>
            <p className="text-xs uppercase tracking-widest font-semibold text-[#C9A227] mt-0.5 flex items-center gap-2">
              <span>“Tu estilo, tu esencia.”</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500 font-normal capitalize">iPhone 15 Pro (390 x 844 px)</span>
            </p>
          </div>
        </div>

        {/* View Mode Tabs */}
        <div className="flex items-center bg-[#FCE4EC]/60 p-1 rounded-2xl border border-pink-200/80 shadow-2xs">
          <button
            type="button"
            id="tab-mode-simulator"
            onClick={() => setViewMode('simulator')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'simulator'
                ? 'bg-[#D81B60] text-white shadow-md shadow-[#D81B60]/25'
                : 'text-slate-600 hover:text-[#D81B60] hover:bg-white/60'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Simulador Móvil</span>
          </button>

          <button
            type="button"
            id="tab-mode-all-frames"
            onClick={() => setViewMode('all_frames')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'all_frames'
                ? 'bg-[#D81B60] text-white shadow-md shadow-[#D81B60]/25'
                : 'text-slate-600 hover:text-[#D81B60] hover:bg-white/60'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Todos los Frames</span>
          </button>

          <button
            type="button"
            id="tab-mode-design-system"
            onClick={() => setViewMode('design_system')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'design_system'
                ? 'bg-[#D81B60] text-white shadow-md shadow-[#D81B60]/25'
                : 'text-slate-600 hover:text-[#D81B60] hover:bg-white/60'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>Sistema & Variantes</span>
          </button>

          <button
            type="button"
            id="tab-mode-flow-diagram"
            onClick={() => setViewMode('flow_diagram')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'flow_diagram'
                ? 'bg-[#D81B60] text-white shadow-md shadow-[#D81B60]/25'
                : 'text-slate-600 hover:text-[#D81B60] hover:bg-white/60'
            }`}
          >
            <GitFork className="w-4 h-4" />
            <span>Diagrama de Flujo</span>
          </button>
        </div>

        {/* Global Action Tools & Palette Preview Swatches */}
        <div className="flex items-center gap-3">
          {/* Palette Swatches */}
          <div className="hidden xl:flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-2xl border border-pink-100 shadow-2xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 mr-1">Paleta:</span>
            <span className="w-4 h-4 rounded-full bg-[#D81B60] border border-black/10" title="Rosa Principal: #D81B60" />
            <span className="w-4 h-4 rounded-full bg-[#FCE4EC] border border-black/10" title="Rosa Claro: #FCE4EC" />
            <span className="w-4 h-4 rounded-full bg-[#1A1A1A] border border-black/10" title="Negro Sofisticado: #1A1A1A" />
            <span className="w-4 h-4 rounded-full bg-[#C9A227] border border-black/10" title="Oro/Dorado: #C9A227" />
            <span className="w-4 h-4 rounded-full bg-[#FFFFFF] border border-slate-300" title="Blanco Puro: #FFFFFF" />
          </div>

          {viewMode === 'simulator' && (
            <div className="flex items-center gap-2">
              {/* Quick Frame Switcher Dropdown */}
              <div className="relative">
                <select
                  id="frame-selector-dropdown"
                  value={currentFrame}
                  onChange={(e) => handleNavigate(e.target.value as FrameId)}
                  aria-label="Seleccionar Frame del prototipo"
                  className="bg-white text-xs font-semibold text-[#1A1A1A] border border-pink-200 rounded-xl px-3 py-1.5 focus:border-[#D81B60] focus:ring-1 focus:ring-[#D81B60] focus:outline-none cursor-pointer shadow-2xs"
                >
                  {framesOptions.map((opt) => (
                    <option key={opt.id} value={opt.id} className="bg-white text-[#1A1A1A]">
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Restart flow button */}
              <button
                type="button"
                id="btn-restart-prototype"
                onClick={handleRestartPrototype}
                className="p-2 bg-white hover:bg-[#FCE4EC] text-slate-700 hover:text-[#D81B60] border border-pink-200 rounded-xl transition-colors shadow-2xs"
                title="Reiniciar flujo desde 01_Login"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content Render Area */}
      <main className="flex-1 flex flex-col justify-start relative z-10">
        {viewMode === 'simulator' && (
          <div className="w-full flex-1 flex flex-col items-center py-6 px-4">
            {/* Simulator Control Toolbar */}
            <div className="w-full max-w-xl mb-6 bg-white/90 backdrop-blur-md rounded-2xl p-3 border border-pink-100 flex flex-wrap items-center justify-between gap-3 text-xs shadow-sm">
              {/* Current Active Frame Badge */}
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D81B60] animate-ping" />
                <span className="text-slate-500 font-medium">Frame Activo:</span>
                <span className="font-mono font-bold text-[#D81B60] bg-[#FCE4EC] px-2.5 py-0.5 rounded-md text-[11px] border border-[#F8BBD0]">
                  {currentFrame}
                </span>
              </div>

              {/* Bezel Finish selector */}
              <div className="flex items-center gap-2">
                <span className="text-slate-500 text-[11px] font-medium">Acabado iPhone:</span>
                <div className="flex items-center gap-1.5">
                  {(['natural', 'black', 'gold', 'rose'] as const).map((clr) => (
                    <button
                      key={clr}
                      type="button"
                      onClick={() => setBezelColor(clr)}
                      className={`w-4 h-4 rounded-full border transition-all ${
                        bezelColor === clr ? 'ring-2 ring-[#D81B60] scale-110 shadow-xs' : 'opacity-70 hover:opacity-100'
                      } ${
                        clr === 'natural'
                          ? 'bg-[#8F8A83] border-slate-400'
                          : clr === 'black'
                          ? 'bg-[#2A2A2D] border-slate-600'
                          : clr === 'gold'
                          ? 'bg-[#C9A227] border-amber-300'
                          : 'bg-[#E7A1B0] border-pink-300'
                      }`}
                      title={`iPhone 15 Pro: ${clr}`}
                    />
                  ))}
                </div>
              </div>

              {/* Scale Zoom Controls */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setPhoneScale((s) => Math.max(0.7, Number((s - 0.05).toFixed(2))))}
                  className="p-1.5 text-slate-500 hover:text-[#D81B60] hover:bg-[#FCE4EC] rounded-lg transition-colors"
                  title="Reducir zoom"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="font-mono text-[11px] font-semibold text-slate-700 min-w-10 text-center">
                  {Math.round(phoneScale * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => setPhoneScale((s) => Math.min(1.15, Number((s + 0.05).toFixed(2))))}
                  className="p-1.5 text-slate-500 hover:text-[#D81B60] hover:bg-[#FCE4EC] rounded-lg transition-colors"
                  title="Aumentar zoom"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Interactive iPhone 15 Pro Mockup with Luxury Shadows */}
            <div className="flex justify-center items-center w-full py-2">
              <IPhoneSimulator
                currentFrame={currentFrame}
                previousFrame={previousFrame}
                onNavigate={handleNavigate}
                selectedProduct={selectedProduct}
                onSelectProduct={setSelectedProduct}
                cartItems={cartItems}
                onAddToCart={handleAddToCart}
                onUpdateCartQty={handleUpdateCartQty}
                onRemoveCartItem={handleRemoveCartItem}
                onClearCart={handleClearCart}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                user={user}
                onUpdateUser={(data) => setUser((u) => ({ ...u, ...data }))}
                onLogout={() => {
                  setUser(MOCK_USER);
                  handleNavigate('01_Login');
                }}
                frameColor={bezelColor}
                scale={phoneScale}
              />
            </div>

            {/* Interaction navigation quick instructions */}
            <div className="mt-4 max-w-lg text-center text-xs text-slate-600 bg-white/80 p-3.5 rounded-2xl border border-pink-100 shadow-2xs">
              <p className="flex items-center justify-center gap-1.5 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-[#C9A227] fill-[#C9A227]" />
                Flujo interactivo activo: Haz clic en los botones de la pantalla móvil o utiliza el selector superior para saltar entre frames.
              </p>
            </div>
          </div>
        )}

        {viewMode === 'all_frames' && (
          <AllFramesGalleryView
            onNavigateToSimulator={(frame) => {
              handleNavigate(frame);
              setViewMode('simulator');
            }}
            selectedProduct={selectedProduct}
            onSelectProduct={setSelectedProduct}
            cartItems={cartItems}
            onAddToCart={handleAddToCart}
            onUpdateCartQty={handleUpdateCartQty}
            onRemoveCartItem={handleRemoveCartItem}
            onClearCart={handleClearCart}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            user={user}
          />
        )}

        {viewMode === 'design_system' && <DesignSystemView />}

        {viewMode === 'flow_diagram' && (
          <FlowDiagramView
            onSelectFrame={(frame) => {
              handleNavigate(frame);
              setViewMode('simulator');
            }}
          />
        )}
      </main>

      {/* Footer with Luxury / Prestige Styling */}
      <footer className="bg-white/90 border-t border-pink-100 px-6 py-4 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2 relative z-10">
        <div className="flex items-center gap-2">
          <span className="font-display font-extrabold text-[#D81B60] uppercase tracking-wider">
            BOUTIQUE DIVA
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-600">Actividad AA 10: Prototipo Básico – Capítulo 10: Prototipos con aplicaciones web</span>
        </div>

        <div className="flex items-center gap-3 text-[11px] font-medium text-slate-600">
          <span className="text-[#D81B60] font-bold">Tema: Luxury / Prestige</span>
          <span className="text-slate-300">•</span>
          <span>iPhone 15 Pro (390 x 844 px)</span>
        </div>
      </footer>
    </div>
  );
}
