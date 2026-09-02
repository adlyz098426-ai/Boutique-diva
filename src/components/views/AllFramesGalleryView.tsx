import React from 'react';
import { Sparkles, Maximize2, ExternalLink, ArrowRight, Layers } from 'lucide-react';
import { Frame01Login } from '../frames/Frame01Login';
import { Frame02Registro } from '../frames/Frame02Registro';
import { Frame03Dashboard } from '../frames/Frame03Dashboard';
import { Frame04DetalleProducto } from '../frames/Frame04DetalleProducto';
import { Frame05Carrito } from '../frames/Frame05Carrito';
import { Frame06Perfil } from '../frames/Frame06Perfil';
import { BoutiqueHeader } from '../common/BoutiqueHeader';
import { CartItem, FrameId, Product, ProductColor, ProductSize, UserProfile } from '../../types';

interface AllFramesGalleryViewProps {
  onNavigateToSimulator: (frame: FrameId) => void;
  selectedProduct: Product;
  onSelectProduct: (p: Product) => void;
  cartItems: CartItem[];
  onAddToCart: (product: Product, size: ProductSize, color: ProductColor, quantity: number) => void;
  onUpdateCartQty: (id: string, qty: number) => void;
  onRemoveCartItem: (id: string) => void;
  onClearCart: () => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  user: UserProfile;
}

export const AllFramesGalleryView: React.FC<AllFramesGalleryViewProps> = ({
  onNavigateToSimulator,
  selectedProduct,
  onSelectProduct,
  cartItems,
  onAddToCart,
  onUpdateCartQty,
  onRemoveCartItem,
  onClearCart,
  favorites,
  onToggleFavorite,
  user,
}) => {
  const framesList: {
    id: FrameId;
    title: string;
    description: string;
    tag: string;
    required: boolean;
    component: React.ReactNode;
  }[] = [
    {
      id: '01_Login',
      title: 'Pantalla 1: Inicio de Sesión',
      description: 'Logo Boutique Diva, eslogan, campos de email/pass, "¿Olvidaste tu contraseña?", botón "INICIAR SESIÓN", enlace "Crear cuenta".',
      tag: 'Frame 01',
      required: true,
      component: (
        <Frame01Login
          onNavigate={(f) => onNavigateToSimulator(f)}
          onLoginSuccess={() => {}}
        />
      ),
    },
    {
      id: '02_Registro',
      title: 'Pantalla 2: Registro de Cuenta',
      description: 'Título "Crear una cuenta", campos con iconos (Nombre, Correo, Teléfono, Contraseña, Confirmar), botón "REGISTRARME", márgenes 16-24px.',
      tag: 'Frame 02',
      required: true,
      component: (
        <Frame02Registro
          onNavigate={(f) => onNavigateToSimulator(f)}
          onRegisterSuccess={() => {}}
        />
      ),
    },
    {
      id: '03_Inicio_Dashboard',
      title: 'Pantalla 3: Dashboard / Inicio',
      description: 'Saludo "Hola, Diva ✨", banner "NUEVA COLECCIÓN", categorías horizontales, tarjetas de productos destacados y barra inferior.',
      tag: 'Frame 03',
      required: true,
      component: (
        <Frame03Dashboard
          onNavigate={(f) => onNavigateToSimulator(f)}
          onSelectProduct={(p) => {
            onSelectProduct(p);
            onNavigateToSimulator('04_Detalle_Producto');
          }}
          cartCount={cartItems.reduce((sum, i) => sum + i.quantity, 0)}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
          userName={user.name.split(' ')[0]}
        />
      ),
    },
    {
      id: '04_Detalle_Producto',
      title: 'Pantalla 4: Detalle del Producto',
      description: 'Hero fotografía grande, selector de tallas (XS a XL), colores, control (− 1 +), botón grande "AGREGAR AL CARRITO", badges de garantía.',
      tag: 'Frame 04',
      required: true,
      component: (
        <Frame04DetalleProducto
          product={selectedProduct}
          onNavigate={(f) => onNavigateToSimulator(f)}
          onAddToCart={onAddToCart}
          isFavorite={favorites.includes(selectedProduct.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ),
    },
    {
      id: '05_Carrito',
      title: 'Pantalla 5: Mi Carrito',
      description: 'Lista de prendas agregadas, control de cantidad, eliminar, desglose (Subtotal $64,98, Envío $3,00, Total), botón "FINALIZAR COMPRA".',
      tag: 'Frame 05',
      required: true,
      component: (
        <Frame05Carrito
          cartItems={cartItems}
          onUpdateQuantity={onUpdateCartQty}
          onRemoveItem={onRemoveCartItem}
          onClearCart={onClearCart}
          onNavigate={(f) => onNavigateToSimulator(f)}
          favoritesCount={favorites.length}
        />
      ),
    },
    {
      id: '06_Perfil',
      title: 'Pantalla 6: Perfil de Usuaria (Punto Extra)',
      description: 'Avatar circular, María Diva, maria@email.com, opciones con iconos (Mis pedidos, Favoritos, Direcciones, Pago, Ajustes, Cerrar sesión).',
      tag: 'Frame 06',
      required: false,
      component: (
        <Frame06Perfil
          user={user}
          onNavigate={(f) => onNavigateToSimulator(f)}
          cartCount={cartItems.reduce((sum, i) => sum + i.quantity, 0)}
          favoritesCount={favorites.length}
          onLogout={() => onNavigateToSimulator('01_Login')}
        />
      ),
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-pink-100/90 text-[#1A1A1A] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-[#D81B60] text-white text-xs font-bold rounded-full uppercase tracking-wider shadow-xs">
              AA 10: Prototipo Básico
            </span>
            <span className="text-xs text-[#C9A227] font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 fill-[#C9A227]" />
              Capítulo 10: Prototipos con aplicaciones web
            </span>
          </div>
          <h2 className="font-display font-extrabold text-2xl text-[#1A1A1A]">
            Vista General de Frames del Prototipo
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Exhibición completa de las 6 pantallas móviles en resolución estándar{' '}
            <strong className="text-[#D81B60]">iPhone 15 Pro (390 x 844 px)</strong>, listas para captura y evaluación de entrega.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-[#FCE4EC]/60 px-4 py-2.5 rounded-2xl border border-pink-200 text-xs">
            <span className="text-slate-500 block font-medium">Total de Pantallas:</span>
            <span className="font-display font-extrabold text-base text-[#D81B60]">6 Frames Completos</span>
          </div>
        </div>
      </div>

      {/* Grid of Frames */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center">
        {framesList.map((frame, index) => (
          <div
            key={frame.id}
            className="flex flex-col items-center group w-full max-w-[420px]"
          >
            {/* Frame Metadata Card */}
            <div className="w-full bg-white/95 rounded-2xl p-4 border border-pink-100 mb-4 shadow-2xs flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#FCE4EC] text-[#D81B60] font-mono text-xs font-bold border border-[#F8BBD0]">
                    {frame.id}
                  </span>
                  {!frame.required && (
                    <span className="px-2 py-0.5 rounded-md bg-[#FFF8E1] text-[#C9A227] text-[10px] font-bold border border-[#FFE082]">
                      Punto Extra
                    </span>
                  )}
                </div>
                <h3 className="font-display font-bold text-sm text-[#1A1A1A] mt-1">
                  {frame.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => onNavigateToSimulator(frame.id)}
                className="px-3.5 py-1.5 bg-[#D81B60] hover:bg-[#C2185B] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
              >
                <span>Probar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Simulated iPhone Frame Display (390 x 844 px) */}
            <div className="relative rounded-[46px] p-2.5 bg-[#2B2B2D] border-[3px] border-[#4A4A4E] shadow-xl transition-all duration-300 group-hover:border-[#D81B60]/80 group-hover:shadow-2xl">
              <div
                className="relative rounded-[36px] bg-white overflow-hidden shadow-inner flex flex-col justify-between"
                style={{ width: '370px', height: '780px' }}
              >
                {/* iOS Header */}
                <BoutiqueHeader darkText={true} showDynamicIsland={true} />

                {/* Frame Content */}
                <div className="relative flex-1 w-full overflow-hidden bg-white">
                  {frame.component}
                </div>

                {/* iOS Home Bar */}
                <div className="w-full h-5 bg-white flex items-center justify-center shrink-0 z-30">
                  <div className="w-28 h-1 bg-[#1A1A1A] rounded-full opacity-80" />
                </div>
              </div>
            </div>

            {/* Description footnote */}
            <p className="text-xs text-slate-500 text-center mt-3 max-w-[370px] leading-relaxed">
              {frame.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
