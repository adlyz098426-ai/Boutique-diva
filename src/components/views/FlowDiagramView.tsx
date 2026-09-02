import React from 'react';
import { ArrowRight, ArrowDown, Sparkles, Smartphone, CheckCircle, GitFork, Play } from 'lucide-react';
import { PROTOTYPE_INTERACTIONS } from '../../data/mockData';
import { FrameId } from '../../types';

interface FlowDiagramViewProps {
  onSelectFrame: (frame: FrameId) => void;
}

export const FlowDiagramView: React.FC<FlowDiagramViewProps> = ({ onSelectFrame }) => {
  const mainFlowNodes = [
    {
      id: '01_Login' as FrameId,
      step: '01',
      title: 'LOGIN',
      subtitle: 'Inicio de Sesión',
      actionToNext: 'Iniciar sesión (Smart Animate) o Crear cuenta',
      color: 'border-[#D81B60] bg-[#D81B60]/10 text-[#D81B60]',
    },
    {
      id: '02_Registro' as FrameId,
      step: '02',
      title: 'REGISTRO',
      subtitle: 'Crear una cuenta',
      actionToNext: 'Registrarme (Push)',
      color: 'border-pink-500 bg-pink-500/10 text-pink-400',
    },
    {
      id: '03_Inicio_Dashboard' as FrameId,
      step: '03',
      title: 'DASHBOARD',
      subtitle: 'Catálogo & Colección',
      actionToNext: 'Seleccionar prenda (Slide In)',
      color: 'border-[#C9A227] bg-[#C9A227]/10 text-[#C9A227]',
    },
    {
      id: '04_Detalle_Producto' as FrameId,
      step: '04',
      title: 'DETALLE DEL PRODUCTO',
      subtitle: 'Talla, Color & Stock',
      actionToNext: 'Agregar al carrito (Slide Out)',
      color: 'border-purple-500 bg-purple-500/10 text-purple-400',
    },
    {
      id: '05_Carrito' as FrameId,
      step: '05',
      title: 'CARRITO',
      subtitle: 'Resumen & Descuentos',
      actionToNext: 'Finalizar compra',
      color: 'border-emerald-500 bg-emerald-500/10 text-emerald-400',
    },
    {
      id: '03_Inicio_Dashboard' as FrameId,
      step: '06',
      title: 'FINALIZAR COMPRA',
      subtitle: 'Confirmación & Éxito',
      actionToNext: 'Retorno al Dashboard',
      color: 'border-cyan-500 bg-cyan-500/10 text-cyan-400',
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-10">
      {/* Header Banner */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-pink-100/90 text-[#1A1A1A] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-[#D81B60] text-white text-xs font-bold rounded-full uppercase tracking-wider shadow-xs">
              Flujo de Interacción • AA 10
            </span>
            <span className="text-xs text-[#C9A227] font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 fill-[#C9A227]" />
              Sección 10 y 13: Conexiones y Transiciones
            </span>
          </div>
          <h2 className="font-display font-extrabold text-2xl text-[#1A1A1A]">
            Diagrama de Navegación del Prototipo
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl">
            Representación visual del recorrido de usuario, triggers de eventos, animaciones y conexiones entre frames para iPhone 15 Pro.
          </p>
        </div>

        <div className="bg-[#FCE4EC]/60 px-4 py-2.5 rounded-2xl border border-pink-200 text-xs">
          <span className="text-slate-500 block font-medium">Dispositivo Base:</span>
          <span className="font-display font-bold text-sm text-[#D81B60]">iPhone 15 Pro (390 x 844 px)</span>
        </div>
      </div>

      {/* Primary Linear Flow Roadmap (Section 13) */}
      <section className="bg-white/90 rounded-3xl p-6 border border-pink-100 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <GitFork className="w-5 h-5 text-[#D81B60]" />
          <h3 className="font-display font-extrabold text-xl text-[#1A1A1A]">
            Flujo Principal de Compra (Sección 13)
          </h3>
        </div>

        {/* Linear Step Chain */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3 relative">
          {mainFlowNodes.map((node, idx) => (
            <div
              key={`${node.title}-${idx}`}
              className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex flex-col justify-between relative group hover:border-[#D81B60] hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center font-mono">
                    {node.step}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${node.color}`}>
                    {node.id}
                  </span>
                </div>

                <h4 className="font-display font-extrabold text-sm text-[#1A1A1A] mt-1">
                  {node.title}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">{node.subtitle}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-1">
                  Siguiente paso:
                </span>
                <p className="text-xs text-slate-700 font-medium">{node.actionToNext}</p>

                <button
                  type="button"
                  onClick={() => onSelectFrame(node.id)}
                  className="mt-3 w-full py-1.5 px-2 bg-white hover:bg-[#D81B60] text-slate-800 hover:text-white border border-slate-200 hover:border-[#D81B60] text-[11px] font-bold rounded-lg transition-colors flex items-center justify-center gap-1 shadow-2xs"
                >
                  <Play className="w-3 h-3" />
                  <span>Probar frame</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Secondary Branches Notes */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFF8E1] text-[#C9A227] border border-[#FFE082] flex items-center justify-center shrink-0 font-bold">
              ⇄
            </div>
            <div className="text-xs">
              <strong className="text-[#1A1A1A] block font-display">DASHBOARD ↔ PERFIL (Punto Extra)</strong>
              <p className="text-slate-500 mt-0.5">
                Navegación bidireccional mediante la pestaña "Perfil" en la barra inferior (Smart Animate).
              </p>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FCE4EC] text-[#D81B60] border border-[#F8BBD0] flex items-center justify-center shrink-0 font-bold">
              ⇄
            </div>
            <div className="text-xs">
              <strong className="text-[#1A1A1A] block font-display">DETALLE DEL PRODUCTO ↔ DASHBOARD</strong>
              <p className="text-slate-500 mt-0.5">
                Botón regresar en la esquina superior izquierda retorna sin vaciar el carrito (Slide Out).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactions Table (Section 10) */}
      <section className="bg-white/90 rounded-3xl p-6 border border-pink-100 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#D81B60]" />
              <h3 className="font-display font-extrabold text-xl text-[#1A1A1A]">
                Matriz de Conexiones e Interacciones (Sección 10)
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Especificación técnica de Origen, Destino, Trigger, Action y Transition.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                <th className="py-3 px-4">Interacción</th>
                <th className="py-3 px-4">Frame Origen</th>
                <th className="py-3 px-4">Frame Destino</th>
                <th className="py-3 px-4">Trigger</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Transition</th>
                <th className="py-3 px-4 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-sans">
              {PROTOTYPE_INTERACTIONS.map((int) => (
                <tr key={int.id} className="hover:bg-pink-50/50 transition-colors">
                  <td className="py-3 px-4 font-bold text-[#1A1A1A] font-display">
                    {int.title}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono border border-slate-200">
                      {int.origin}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-[#FCE4EC] text-[#D81B60] font-mono font-bold border border-[#F8BBD0]">
                      {int.destination}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600 font-medium">{int.trigger}</td>
                  <td className="py-3 px-4 text-slate-600 font-medium">{int.action}</td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-1 rounded-full bg-[#FFF8E1] text-[#C9A227] font-bold text-[11px] inline-flex items-center gap-1 border border-[#FFE082]">
                      <Sparkles className="w-3 h-3 fill-[#C9A227]" />
                      {int.transition}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => onSelectFrame(int.origin)}
                      className="px-3 py-1 bg-[#D81B60] hover:bg-[#C2185B] text-white font-bold rounded-lg transition-all shadow-xs"
                    >
                      Ejecutar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
