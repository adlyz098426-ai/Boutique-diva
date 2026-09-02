import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BoutiqueHeader } from '../common/BoutiqueHeader';
import { Frame01Login } from '../frames/Frame01Login';
import { Frame02Registro } from '../frames/Frame02Registro';
import { Frame03Dashboard } from '../frames/Frame03Dashboard';
import { Frame04DetalleProducto } from '../frames/Frame04DetalleProducto';
import { Frame05Carrito } from '../frames/Frame05Carrito';
import { Frame06Perfil } from '../frames/Frame06Perfil';
import { CartItem, FrameId, Product, ProductColor, ProductSize, UserProfile } from '../../types';

interface IPhoneSimulatorProps {
  currentFrame: FrameId;
  previousFrame: FrameId | null;
  onNavigate: (frame: FrameId) => void;
  selectedProduct: Product;
  onSelectProduct: (product: Product) => void;
  cartItems: CartItem[];
  onAddToCart: (product: Product, size: ProductSize, color: ProductColor, quantity: number) => void;
  onUpdateCartQty: (id: string, qty: number) => void;
  onRemoveCartItem: (id: string) => void;
  onClearCart: () => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  user: UserProfile;
  onUpdateUser: (userData: Partial<UserProfile>) => void;
  onLogout: () => void;
  frameColor?: 'natural' | 'black' | 'gold' | 'rose';
  scale?: number;
}

export const IPhoneSimulator: React.FC<IPhoneSimulatorProps> = ({
  currentFrame,
  previousFrame,
  onNavigate,
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
  onUpdateUser,
  onLogout,
  frameColor = 'natural',
  scale = 1,
}) => {
  // Determine animation transition style based on prototype specs
  const getTransitionVariants = () => {
    // 01_Login -> 02_Registro (Slide In)
    if (previousFrame === '01_Login' && currentFrame === '02_Registro') {
      return {
        initial: { x: '100%', opacity: 0.9 },
        animate: { x: 0, opacity: 1, transition: { duration: 0.35, ease: [0.32, 0.72, 0, 1] } },
        exit: { x: '-30%', opacity: 0.7, transition: { duration: 0.25 } },
      };
    }

    // 02_Registro -> 01_Login (Back)
    if (previousFrame === '02_Registro' && currentFrame === '01_Login') {
      return {
        initial: { x: '-100%', opacity: 0.9 },
        animate: { x: 0, opacity: 1, transition: { duration: 0.35, ease: [0.32, 0.72, 0, 1] } },
        exit: { x: '100%', opacity: 0.7, transition: { duration: 0.25 } },
      };
    }

    // 02_Registro -> 03_Inicio_Dashboard (Push)
    if (previousFrame === '02_Registro' && currentFrame === '03_Inicio_Dashboard') {
      return {
        initial: { y: '100%', opacity: 0.9 },
        animate: { y: 0, opacity: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
        exit: { opacity: 0, scale: 0.96, transition: { duration: 0.2 } },
      };
    }

    // 03_Inicio_Dashboard -> 04_Detalle_Producto (Slide In)
    if (previousFrame === '03_Inicio_Dashboard' && currentFrame === '04_Detalle_Producto') {
      return {
        initial: { x: '100%', opacity: 0.9 },
        animate: { x: 0, opacity: 1, transition: { duration: 0.35, ease: [0.32, 0.72, 0, 1] } },
        exit: { x: '-20%', opacity: 0.8, transition: { duration: 0.25 } },
      };
    }

    // 04_Detalle_Producto -> 05_Carrito (Slide Out / Transition)
    if (previousFrame === '04_Detalle_Producto' && currentFrame === '05_Carrito') {
      return {
        initial: { x: '100%', opacity: 0.9 },
        animate: { x: 0, opacity: 1, transition: { duration: 0.35, ease: [0.32, 0.72, 0, 1] } },
        exit: { x: '-100%', opacity: 0.7, transition: { duration: 0.25 } },
      };
    }

    // 04_Detalle_Producto -> 03_Inicio_Dashboard (Slide Out / Back)
    if (previousFrame === '04_Detalle_Producto' && currentFrame === '03_Inicio_Dashboard') {
      return {
        initial: { x: '-30%', opacity: 0.8 },
        animate: { x: 0, opacity: 1, transition: { duration: 0.35, ease: [0.32, 0.72, 0, 1] } },
        exit: { x: '100%', opacity: 0.8, transition: { duration: 0.25 } },
      };
    }

    // Default Smart Animate / Smooth Fade
    return {
      initial: { opacity: 0, scale: 0.98 },
      animate: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
      exit: { opacity: 0, scale: 0.98, transition: { duration: 0.2 } },
    };
  };

  const variants = getTransitionVariants();

  // Frame bezel color styling
  const bezelStyles = {
    natural: 'bg-[#2B2B2D] border-[#4A4A4E] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]',
    black: 'bg-[#151516] border-[#2A2A2D] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]',
    gold: 'bg-[#38332B] border-[#706450] shadow-[0_25px_60px_-15px_rgba(201,162,39,0.3)]',
    rose: 'bg-[#3A2A33] border-[#7D556C] shadow-[0_25px_60px_-15px_rgba(216,27,96,0.3)]',
  }[frameColor];

  return (
    <div
      className="relative select-none transition-transform duration-200"
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'top center',
      }}
    >
      {/* iPhone 15 Pro Physical Outer Bezel (Outer dimensions approx 414 x 868 for 390 x 844 screen) */}
      <div
        id="iphone-15-pro-chassis"
        className={`relative w-[414px] h-[868px] rounded-[52px] p-[12px] border-[4px] ${bezelStyles} transition-all duration-300`}
      >
        {/* Physical hardware side buttons */}
        {/* Action Button (left) */}
        <div className="absolute -left-[7px] top-[115px] w-[3px] h-[26px] bg-[#555] rounded-l-sm" />
        {/* Volume Up (left) */}
        <div className="absolute -left-[7px] top-[155px] w-[3px] h-[50px] bg-[#555] rounded-l-sm" />
        {/* Volume Down (left) */}
        <div className="absolute -left-[7px] top-[215px] w-[3px] h-[50px] bg-[#555] rounded-l-sm" />
        {/* Power Button (right) */}
        <div className="absolute -right-[7px] top-[175px] w-[3px] h-[75px] bg-[#555] rounded-r-sm" />

        {/* Inner Screen Area - STRICTLY 390 x 844 px */}
        <div
          id="iphone-screen-viewport"
          className="relative w-[390px] h-[844px] rounded-[42px] bg-white overflow-hidden shadow-inner flex flex-col justify-between"
          style={{ width: '390px', height: '844px' }}
        >
          {/* iOS Status Bar with Dynamic Island */}
          <BoutiqueHeader
            darkText={currentFrame !== '01_Login' || true}
            showDynamicIsland={true}
          />

          {/* Animated Screen Content Container */}
          <div className="relative flex-1 w-full overflow-hidden bg-white">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentFrame}
                initial={variants.initial}
                animate={variants.animate}
                exit={variants.exit}
                className="w-full h-full absolute inset-0"
              >
                {currentFrame === '01_Login' && (
                  <Frame01Login
                    onNavigate={onNavigate}
                    onLoginSuccess={(email) => onUpdateUser({ email })}
                  />
                )}

                {currentFrame === '02_Registro' && (
                  <Frame02Registro
                    onNavigate={onNavigate}
                    onRegisterSuccess={(data) =>
                      onUpdateUser({ name: data.name, email: data.email, phone: data.phone })
                    }
                  />
                )}

                {currentFrame === '03_Inicio_Dashboard' && (
                  <Frame03Dashboard
                    onNavigate={onNavigate}
                    onSelectProduct={(prod) => {
                      onSelectProduct(prod);
                      onNavigate('04_Detalle_Producto');
                    }}
                    cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                    favorites={favorites}
                    onToggleFavorite={onToggleFavorite}
                    userName={user.name.split(' ')[0]}
                  />
                )}

                {currentFrame === '04_Detalle_Producto' && (
                  <Frame04DetalleProducto
                    product={selectedProduct}
                    onNavigate={onNavigate}
                    onAddToCart={onAddToCart}
                    isFavorite={favorites.includes(selectedProduct.id)}
                    onToggleFavorite={onToggleFavorite}
                  />
                )}

                {currentFrame === '05_Carrito' && (
                  <Frame05Carrito
                    cartItems={cartItems}
                    onUpdateQuantity={onUpdateCartQty}
                    onRemoveItem={onRemoveCartItem}
                    onClearCart={onClearCart}
                    onNavigate={onNavigate}
                    favoritesCount={favorites.length}
                  />
                )}

                {currentFrame === '06_Perfil' && (
                  <Frame06Perfil
                    user={user}
                    onNavigate={onNavigate}
                    cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                    favoritesCount={favorites.length}
                    onLogout={onLogout}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* iOS Bottom Home Bar */}
          <div className="w-full h-6 bg-white flex items-center justify-center shrink-0 z-30">
            <div className="w-32 h-1 bg-[#1A1A1A] rounded-full opacity-80" />
          </div>
        </div>
      </div>
    </div>
  );
};
