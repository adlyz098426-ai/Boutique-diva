import React from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

interface BoutiqueHeaderProps {
  darkText?: boolean;
  showDynamicIsland?: boolean;
}

export const BoutiqueHeader: React.FC<BoutiqueHeaderProps> = ({
  darkText = true,
  showDynamicIsland = true,
}) => {
  return (
    <div
      className={`w-full h-11 px-6 flex items-center justify-between text-xs select-none z-30 relative shrink-0 ${
        darkText ? 'text-[#1A1A1A]' : 'text-white'
      }`}
    >
      {/* Time */}
      <span className="font-semibold text-xs tracking-tight">9:41</span>

      {/* Dynamic Island pill representation */}
      {showDynamicIsland && (
        <div className="absolute left-1/2 -translate-x-1/2 top-2 w-28 h-6 bg-black rounded-full flex items-center justify-between px-2.5 shadow-inner">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700/50 flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-[#D81B60]/80 animate-pulse" />
          </div>
          <div className="w-2 h-2 rounded-full bg-slate-900 border border-slate-700/50" />
        </div>
      )}

      {/* System Icons */}
      <div className="flex items-center gap-1.5 font-medium">
        <Signal className="w-3.5 h-3.5" />
        <Wifi className="w-3.5 h-3.5" />
        <div className="flex items-center gap-0.5">
          <span className="text-[10px] font-bold">100%</span>
          <Battery className="w-4 h-4 fill-current stroke-current" />
        </div>
      </div>
    </div>
  );
};
