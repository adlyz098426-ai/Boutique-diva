import React from 'react';
import { Home, LayoutGrid, Heart, ShoppingBag, User } from 'lucide-react';
import { FrameId } from '../../types';

interface BoutiqueNavbarProps {
  currentFrame: FrameId;
  onNavigate: (frame: FrameId) => void;
  cartCount: number;
  favoritesCount: number;
}

export const BoutiqueNavbar: React.FC<BoutiqueNavbarProps> = ({
  currentFrame,
  onNavigate,
  cartCount,
  favoritesCount,
}) => {
  const tabs = [
    {
      id: '03_Inicio_Dashboard' as FrameId,
      name: 'Inicio',
      icon: Home,
      isActive: currentFrame === '03_Inicio_Dashboard' || currentFrame === '04_Detalle_Producto',
    },
    {
      id: 'categories' as const,
      name: 'Categorías',
      icon: LayoutGrid,
      isActive: false,
      onClick: () => onNavigate('03_Inicio_Dashboard'),
    },
    {
      id: 'favorites' as const,
      name: 'Favoritos',
      icon: Heart,
      isActive: false,
      badge: favoritesCount > 0 ? favoritesCount : undefined,
      onClick: () => onNavigate('03_Inicio_Dashboard'),
    },
    {
      id: '05_Carrito' as FrameId,
      name: 'Carrito',
      icon: ShoppingBag,
      isActive: currentFrame === '05_Carrito',
      badge: cartCount > 0 ? cartCount : undefined,
    },
    {
      id: '06_Perfil' as FrameId,
      name: 'Perfil',
      icon: User,
      isActive: currentFrame === '06_Perfil',
    },
  ];

  return (
    <nav
      id="boutique-bottom-navbar"
      className="w-full bg-white/95 backdrop-blur-md border-t border-slate-100 px-4 py-2 flex items-center justify-around z-30 shrink-0"
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const active = tab.isActive;

        return (
          <button
            key={tab.name}
            type="button"
            id={`nav-tab-${tab.name.toLowerCase()}`}
            onClick={() => {
              if (tab.onClick) {
                tab.onClick();
              } else if (tab.id) {
                onNavigate(tab.id as FrameId);
              }
            }}
            className="group relative flex flex-col items-center justify-center py-1 px-2.5 transition-all duration-200"
          >
            <div className="relative">
              <Icon
                className={`w-5 h-5 transition-all duration-200 ${
                  active
                    ? 'text-[#D81B60] scale-110 stroke-[2.4]'
                    : 'text-slate-400 group-hover:text-[#D81B60]'
                }`}
              />
              {tab.badge !== undefined && (
                <span className="absolute -top-1.5 -right-2 min-w-4 h-4 px-1 rounded-full bg-[#D81B60] text-white text-[9px] font-bold flex items-center justify-center shadow-xs animate-scale">
                  {tab.badge}
                </span>
              )}
            </div>

            <span
              className={`text-[10px] mt-1 font-medium tracking-tight transition-colors ${
                active ? 'text-[#D81B60] font-bold' : 'text-slate-500 group-hover:text-[#1A1A1A]'
              }`}
            >
              {tab.name}
            </span>

            {/* Active pill dot */}
            {active && (
              <span className="w-1 h-1 rounded-full bg-[#D81B60] mt-0.5" />
            )}
          </button>
        );
      })}
    </nav>
  );
};
