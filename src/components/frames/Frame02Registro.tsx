import React, { useState } from 'react';
import { User, Mail, Phone, Lock, Sparkles, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { BoutiqueInput } from '../common/BoutiqueInput';
import { BoutiqueButton } from '../common/BoutiqueButton';
import { FrameId } from '../../types';

interface Frame02RegistroProps {
  onNavigate: (frame: FrameId) => void;
  onRegisterSuccess?: (userData: { name: string; email: string; phone: string }) => void;
}

export const Frame02Registro: React.FC<Frame02RegistroProps> = ({ onNavigate, onRegisterSuccess }) => {
  const [name, setName] = useState('María Diva');
  const [email, setEmail] = useState('maria@email.com');
  const [phone, setPhone] = useState('+52 55 8765 4321');
  const [password, setPassword] = useState('diva1234');
  const [confirmPassword, setConfirmPassword] = useState('diva1234');
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !password || !confirmPassword) {
      setError('Por favor completa todos los campos.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    if (!termsAccepted) {
      setError('Debes aceptar los términos y condiciones.');
      return;
    }

    setError('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (onRegisterSuccess) {
        onRegisterSuccess({ name, email, phone });
      }
      // Interaction 3: 02_Registro -> 03_Inicio_Dashboard (Push)
      onNavigate('03_Inicio_Dashboard');
    }, 450);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between bg-white text-[#1A1A1A] relative overflow-y-auto custom-scrollbar">
      {/* Decorative luxury gradient blurs */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-[#FCE4EC] rounded-full blur-2xl opacity-70 pointer-events-none -ml-10 -mt-10" />
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-[#FCE4EC] rounded-full blur-3xl opacity-60 pointer-events-none -mr-16 -mb-16" />

      {/* Top Bar with Back Button & Frame indicator */}
      <div className="relative z-10 pt-3 px-5 flex items-center justify-between">
        <button
          type="button"
          id="btn-back-to-login"
          onClick={() => onNavigate('01_Login')}
          className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:text-[#D81B60] hover:border-[#D81B60] transition-colors shadow-2xs"
          aria-label="Volver al Login"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FCE4EC] text-[#D81B60] text-[10px] font-bold tracking-wider uppercase border border-[#F8BBD0]">
          Frame: 02_Registro
        </div>

        <div className="w-9" />
      </div>

      {/* Header section */}
      <div className="relative z-10 px-6 pt-2 pb-1 text-left">
        <div className="flex items-center gap-1.5 mb-1 text-xs font-bold text-[#C9A227] uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 fill-[#C9A227]" />
          Únete al Club Diva
        </div>
        <h1 className="font-display font-bold text-2xl text-[#1A1A1A] tracking-tight">
          Crear una cuenta
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Regístrate para recibir ofertas exclusivas y novedades de temporada.
        </p>
      </div>

      {/* Form Fields - 16 to 24px margins */}
      <div className="relative z-10 px-6 py-2 flex-grow">
        <form onSubmit={handleRegister} className="space-y-3">
          <BoutiqueInput
            label="Nombre completo"
            id="register-name-input"
            type="text"
            placeholder="Ej. María Diva López"
            value={name}
            onChange={(e) => setName(e.target.value)}
            icon={<User className="w-4 h-4" />}
            required
          />

          <BoutiqueInput
            label="Correo electrónico"
            id="register-email-input"
            type="email"
            placeholder="maria@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<Mail className="w-4 h-4" />}
            required
          />

          <BoutiqueInput
            label="Número de teléfono"
            id="register-phone-input"
            type="tel"
            placeholder="+52 55 1234 5678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            icon={<Phone className="w-4 h-4" />}
            required
          />

          <BoutiqueInput
            label="Contraseña"
            id="register-password-input"
            isPassword
            placeholder="Mínimo 8 caracteres"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<Lock className="w-4 h-4" />}
            required
          />

          <BoutiqueInput
            label="Confirmar contraseña"
            id="register-confirm-password-input"
            isPassword
            placeholder="Repite tu contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            icon={<Lock className="w-4 h-4" />}
            required
          />

          {/* Terms checkbox */}
          <div className="pt-1 flex items-start gap-2.5">
            <input
              type="checkbox"
              id="terms-check"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded text-[#D81B60] focus:ring-[#D81B60] border-slate-300 accent-[#D81B60]"
            />
            <label htmlFor="terms-check" className="text-xs text-slate-600 leading-snug cursor-pointer select-none">
              Acepto los <span className="text-[#D81B60] font-semibold underline">términos de servicio</span> y la <span className="text-[#D81B60] font-semibold underline">política de privacidad</span> de Boutique Diva.
            </label>
          </div>

          {error && (
            <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 font-medium text-center">
              {error}
            </div>
          )}

          {/* Submit button */}
          <div className="pt-2">
            <BoutiqueButton
              id="btn-register-submit"
              type="submit"
              themeColor="pink"
              size="lg"
              showIcon={false}
              label={isLoading ? 'REGISTRANDO...' : 'REGISTRARME'}
              disabled={isLoading}
            >
              <div className="flex items-center justify-center gap-2">
                <span>{isLoading ? 'CREANDO CUENTA...' : 'REGISTRARME'}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </BoutiqueButton>
          </div>
        </form>
      </div>

      {/* Bottom link: ¿Ya tienes una cuenta? Iniciar sesión */}
      <div className="relative z-10 py-4 px-6 text-center border-t border-slate-100 bg-white/80 backdrop-blur-xs">
        <p className="text-xs text-slate-600">
          ¿Ya tienes una cuenta?{' '}
          <button
            type="button"
            id="link-go-to-login"
            onClick={() => onNavigate('01_Login')}
            className="font-bold text-[#D81B60] hover:text-[#AD1457] hover:underline underline-offset-2 transition-colors ml-1"
          >
            Iniciar sesión
          </button>
        </p>
      </div>
    </div>
  );
};
