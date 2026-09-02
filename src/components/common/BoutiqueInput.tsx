import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface BoutiqueInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  isPassword?: boolean;
  error?: string;
  hint?: string;
}

export const BoutiqueInput: React.FC<BoutiqueInputProps> = ({
  label,
  icon,
  isPassword = false,
  error,
  hint,
  id,
  className = '',
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <div className="w-full text-left">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-semibold text-[#1A1A1A] mb-1.5 uppercase tracking-wider"
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none transition-colors">
            {icon}
          </div>
        )}

        <input
          id={inputId}
          type={isPassword ? (showPassword ? 'text' : 'password') : rest.type || 'text'}
          className={`w-full bg-[#FFFFFF] text-[#1A1A1A] placeholder:text-slate-400 text-sm rounded-xl border transition-all duration-200 focus:outline-none ${
            icon ? 'pl-10' : 'pl-4'
          } ${isPassword ? 'pr-11' : 'pr-4'} py-3.5 ${
            error
              ? 'border-red-500 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
              : 'border-slate-200 focus:border-[#D81B60] focus:ring-2 focus:ring-[#D81B60]/20 hover:border-slate-300'
          } ${className}`}
          {...rest}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#D81B60] transition-colors p-1"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      {hint && !error && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
    </div>
  );
};
