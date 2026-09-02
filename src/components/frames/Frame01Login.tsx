import React, { useState } from 'react';
import { Mail, Lock, Sparkles, Crown, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { BoutiqueInput } from '../common/BoutiqueInput';
import { BoutiqueButton } from '../common/BoutiqueButton';
import { FrameId } from '../../types';

interface Frame01LoginProps {
  onNavigate: (frame: FrameId) => void;
  onLoginSuccess?: (email: string) => void;
}

export const Frame01Login: React.FC<Frame01LoginProps> = ({ onNavigate, onLoginSuccess }) => {
  const [email, setEmail] = useState('maria@email.com');
  const [password, setPassword] = useState('diva1234');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Por favor completa todos los campos.');
      return;
    }
    setError('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (onLoginSuccess) onLoginSuccess(email);
      onNavigate('03_Inicio_Dashboard');
    }, 400);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between bg-white text-[#1A1A1A] relative overflow-hidden">
      {/* Decorative luxury gradient blurs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#FCE4EC] rounded-full blur-3xl opacity-80 pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-10 left-0 w-48 h-48 bg-[#FCE4EC] rounded-full blur-2xl opacity-60 pointer-events-none -ml-16" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#FFF8E1] rounded-full blur-3xl opacity-30 pointer-events-none" />

      {/* Top Header / Branding */}
      <div className="relative z-10 pt-4 px-6 text-center">
        {/* Frame Name Indicator */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FCE4EC] text-[#D81B60] text-[10px] font-bold tracking-wider uppercase mb-4 border border-[#F8BBD0]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D81B60] animate-ping" />
          Frame: 01_Login
        </div>

        {/* Fashion Icon Badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-tr from-[#D81B60] to-[#E91E63] p-0.5 shadow-lg shadow-[#D81B60]/25 flex items-center justify-center"
        >
          <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
            <Crown className="w-8 h-8 text-[#D81B60] fill-[#FCE4EC]" />
          </div>
        </motion.div>

        {/* Brand Name */}
        <h1 className="font-display font-extrabold text-2xl tracking-wider text-[#1A1A1A] uppercase">
          BOUTIQUE <span className="text-[#D81B60]">DIVA</span>
        </h1>

        {/* Slogan */}
        <p className="text-xs text-slate-500 font-medium italic mt-0.5 flex items-center justify-center gap-1">
          <Sparkles className="w-3 h-3 text-[#C9A227] fill-[#C9A227]" />
          “Tu estilo, tu esencia.”
          <Sparkles className="w-3 h-3 text-[#C9A227] fill-[#C9A227]" />
        </p>
      </div>

      {/* Login Form */}
      <div className="relative z-10 px-6 py-2 flex-grow flex flex-col justify-center max-w-sm mx-auto w-full">
        <form onSubmit={handleLogin} className="space-y-3.5">
          <div>
            <BoutiqueInput
              label="Correo electrónico"
              id="login-email-input"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="w-4 h-4" />}
              required
            />
          </div>

          <div>
            <BoutiqueInput
              label="Contraseña"
              id="login-password-input"
              isPassword
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock className="w-4 h-4" />}
              required
            />

            <div className="text-right mt-1.5">
              <button
                type="button"
                id="forgot-password-btn"
                onClick={() => alert('Enlace de recuperación enviado a tu correo.')}
                className="text-xs text-slate-500 hover:text-[#D81B60] transition-colors font-medium hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          </div>

          {error && (
            <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 font-medium text-center">
              {error}
            </div>
          )}

          {/* Main Action Button */}
          <div className="pt-2">
            <BoutiqueButton
              id="btn-login-submit"
              type="submit"
              themeColor="pink"
              size="lg"
              showIcon={false}
              label={isLoading ? 'INGRESANDO...' : 'INICIAR SESIÓN'}
              disabled={isLoading}
            >
              <div className="flex items-center justify-center gap-2">
                <span>{isLoading ? 'INGRESANDO...' : 'INICIAR SESIÓN'}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </BoutiqueButton>
          </div>

          {/* Quick Demo Credentials */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => {
                setEmail('maria@email.com');
                setPassword('diva1234');
              }}
              className="w-full text-center text-[11px] text-slate-400 hover:text-[#C9A227] transition-colors"
            >
              Demo: <span className="font-semibold text-slate-600">maria@email.com</span> / <span className="font-semibold text-slate-600">diva1234</span>
            </button>
          </div>
        </form>
      </div>

      {/* Footer / Create Account link */}
      <div className="relative z-10 pb-6 px-6 text-center border-t border-slate-100 pt-3">
        <p className="text-xs text-slate-600">
          ¿No tienes una cuenta?{' '}
          <button
            type="button"
            id="link-go-to-register"
            onClick={() => onNavigate('02_Registro')}
            className="font-bold text-[#D81B60] hover:text-[#AD1457] hover:underline underline-offset-2 transition-colors ml-1"
          >
            Crear cuenta
          </button>
        </p>

        <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-[#C9A227]" />
          <span>Acceso seguro • Boutique Diva Oficial</span>
        </div>
      </div>
    </div>
  );
};
