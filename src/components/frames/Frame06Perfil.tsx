import React, { useState } from 'react';
import {
  Package,
  Heart,
  MapPin,
  CreditCard,
  Settings,
  LogOut,
  ChevronRight,
  Sparkles,
  Award,
  Bell,
  HelpCircle,
  ArrowLeft,
} from 'lucide-react';
import { BoutiqueNavbar } from '../common/BoutiqueNavbar';
import { FrameId, UserProfile } from '../../types';
import { MOCK_USER } from '../../data/mockData';

interface Frame06PerfilProps {
  user?: UserProfile;
  onNavigate: (frame: FrameId) => void;
  cartCount: number;
  favoritesCount: number;
  onLogout: () => void;
}

export const Frame06Perfil: React.FC<Frame06PerfilProps> = ({
  user = MOCK_USER,
  onNavigate,
  cartCount,
  favoritesCount,
  onLogout,
}) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const menuOptions = [
    {
      id: 'orders',
      label: 'Mis pedidos',
      description: '3 pedidos completados • 1 en camino',
      icon: Package,
      badge: '1 activo',
      onClick: () => setActiveModal('orders'),
    },
    {
      id: 'favorites',
      label: 'Mis favoritos',
      description: `${favoritesCount} prendas guardadas`,
      icon: Heart,
      badge: favoritesCount > 0 ? `${favoritesCount}` : undefined,
      onClick: () => onNavigate('03_Inicio_Dashboard'),
    },
    {
      id: 'addresses',
      label: 'Direcciones',
      description: 'Av. Paseo de la Reforma #402, CDMX',
      icon: MapPin,
      onClick: () => setActiveModal('addresses'),
    },
    {
      id: 'payment',
      label: 'Métodos de pago',
      description: 'Visa terminada en •••• 4829',
      icon: CreditCard,
      onClick: () => setActiveModal('payment'),
    },
    {
      id: 'settings',
      label: 'Configuración',
      description: 'Notificaciones, idioma y privacidad',
      icon: Settings,
      onClick: () => setActiveModal('settings'),
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between bg-[#FAFAFA] text-[#1A1A1A] relative overflow-hidden">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* Header Bar */}
        <div className="bg-white px-5 pt-3 pb-4 border-b border-slate-100 sticky top-0 z-20 shadow-2xs">
          <div className="flex items-center justify-between mb-1.5">
            <button
              type="button"
              id="btn-perfil-back-dashboard"
              onClick={() => onNavigate('03_Inicio_Dashboard')}
              className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 hover:text-[#D81B60] transition-colors"
              aria-label="Volver a Inicio"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FCE4EC] text-[#D81B60] text-[9px] font-bold tracking-wider uppercase border border-[#F8BBD0]">
              Frame: 06_Perfil
            </span>

            <span className="text-[10px] text-[#C9A227] font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3 fill-[#C9A227]" />
              VIP Member
            </span>
          </div>

          <h1 className="font-display font-bold text-2xl text-[#1A1A1A]">Mi perfil</h1>
        </div>

        {/* Profile Card & Avatar */}
        <div className="p-4 space-y-4">
          <div className="bg-gradient-to-tr from-[#1A1A1A] via-[#2A1823] to-[#D81B60] rounded-3xl p-5 text-white shadow-md relative overflow-hidden">
            <div className="absolute right-0 top-0 w-32 h-32 bg-[#C9A227]/15 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center gap-4 relative z-10">
              {/* Circular Avatar */}
              <div className="relative">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/90 shadow-md">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#C9A227] text-white flex items-center justify-center text-xs shadow-xs">
                  <Award className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Name and Email */}
              <div className="flex-1 min-w-0">
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider mb-1">
                  <Sparkles className="w-2.5 h-2.5 text-[#C9A227]" />
                  {user.memberTier}
                </div>
                <h2 className="font-display font-bold text-lg leading-tight truncate">
                  {user.name}
                </h2>
                <p className="text-xs text-white/80 font-normal truncate">{user.email}</p>
              </div>
            </div>

            {/* Points info */}
            <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-xs">
              <span className="text-white/80">Puntos Diva Club:</span>
              <span className="font-display font-bold text-sm text-[#C9A227] flex items-center gap-1">
                {user.savedPoints} pts
              </span>
            </div>
          </div>

          {/* Menu Options List */}
          <div className="bg-white rounded-3xl p-2 border border-slate-100 shadow-2xs space-y-1">
            {menuOptions.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  type="button"
                  id={`menu-item-${item.id}`}
                  onClick={item.onClick}
                  className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-[#FCE4EC]/30 transition-colors text-left group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 group-hover:bg-[#FCE4EC] text-slate-700 group-hover:text-[#D81B60] flex items-center justify-center transition-colors shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-display font-semibold text-xs text-[#1A1A1A]">
                          {item.label}
                        </span>
                        {item.badge && (
                          <span className="px-2 py-0.5 rounded-full bg-[#D81B60] text-white text-[10px] font-bold">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#D81B60] transition-colors shrink-0 ml-2" />
                </button>
              );
            })}
          </div>

          {/* Logout Option */}
          <div className="bg-white rounded-3xl p-2 border border-slate-100 shadow-2xs">
            <button
              type="button"
              id="btn-logout"
              onClick={() => {
                onLogout();
                onNavigate('01_Login');
              }}
              className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-red-50 text-left text-red-600 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 group-hover:bg-red-100 flex items-center justify-center transition-colors">
                  <LogOut className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <span className="font-display font-semibold text-xs">Cerrar sesión</span>
                  <p className="text-[11px] text-red-400">Desconectar cuenta en este dispositivo</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-red-400" />
            </button>
          </div>

          {/* App Info Footer */}
          <div className="text-center pt-2 pb-1 text-[11px] text-slate-400">
            <p className="font-medium text-slate-500">Boutique Diva v2.4.0 (Build 2026)</p>
            <p className="mt-0.5">Actividad AA 10 • Prototipo Móvil iPhone 15 Pro</p>
          </div>
        </div>
      </div>

      {/* Modal Demo if clicked on sub-option */}
      {activeModal && (
        <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 max-w-xs w-full shadow-2xl border border-slate-100 text-center">
            <h3 className="font-display font-bold text-base text-[#1A1A1A] mb-1 capitalize">
              {activeModal === 'orders' && 'Mis Pedidos'}
              {activeModal === 'addresses' && 'Mis Direcciones'}
              {activeModal === 'payment' && 'Métodos de Pago'}
              {activeModal === 'settings' && 'Configuración'}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              {activeModal === 'orders' && 'Tienes 1 paquete en camino (Vestido Diva Rose - Est. mañana 3:00 PM).'}
              {activeModal === 'addresses' && 'Dirección Principal: Av. Reforma #402, Int. 5B, Juárez, CDMX.'}
              {activeModal === 'payment' && 'Tarjeta Visa Débito vinculada de forma segura.'}
              {activeModal === 'settings' && 'Notificaciones push y preferencias de tallas activas.'}
            </p>
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="w-full py-2.5 bg-[#D81B60] text-white font-bold text-xs uppercase tracking-wider rounded-xl"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <BoutiqueNavbar
        currentFrame="06_Perfil"
        onNavigate={onNavigate}
        cartCount={cartCount}
        favoritesCount={favoritesCount}
      />
    </div>
  );
};
