import React, { useState } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  MousePointer,
  ShoppingBag,
  Heart,
  Mail,
  Lock,
  Layers,
  Component as ComponentIcon,
} from 'lucide-react';
import { BoutiqueButton, ButtonVariantState } from '../common/BoutiqueButton';
import { BoutiqueInput } from '../common/BoutiqueInput';
import { SizeSelector } from '../common/SizeSelector';
import { ColorSelector } from '../common/ColorSelector';
import { QuantityControl } from '../common/QuantityControl';
import { ProductCard } from '../common/ProductCard';
import { BOUTIQUE_PALETTE, PRODUCTS_CATALOG } from '../../data/mockData';
import { ProductColor, ProductSize } from '../../types';

export const DesignSystemView: React.FC = () => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [activeButtonVariant, setActiveButtonVariant] = useState<ButtonVariantState>('normal');
  const [testSize, setTestSize] = useState<ProductSize>('M');
  const [testColor, setTestColor] = useState<ProductColor>({
    name: 'Rosa Diva',
    hex: '#D81B60',
  });
  const [testQty, setTestQty] = useState(1);
  const [testFav, setTestFav] = useState(true);

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const sampleProduct = PRODUCTS_CATALOG[0];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-10">
      {/* Header Banner */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-pink-100/90 text-[#1A1A1A] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-[#D81B60] text-white text-xs font-bold rounded-full uppercase tracking-wider shadow-xs">
              Sistema de Diseño • Boutique Diva
            </span>
            <span className="text-xs text-[#C9A227] font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 fill-[#C9A227]" />
              Identidad Visual & Variantes • Luxury Theme
            </span>
          </div>
          <h2 className="font-display font-extrabold text-2xl text-[#1A1A1A]">
            Componentes, Tipografía y Paleta de Colores
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl">
            Documentación interactiva de los componentes reutilizables, estados visuales y especificaciones requeridas para la actividad AA 10.
          </p>
        </div>

        <div className="bg-[#FCE4EC]/60 px-4 py-2.5 rounded-2xl border border-pink-200 text-xs">
          <span className="text-slate-500 block font-medium">Eslogan de Marca:</span>
          <span className="font-display font-bold text-sm text-[#D81B60] italic">
            “Tu estilo, tu esencia.”
          </span>
        </div>
      </div>

      {/* 1. PALETA DE COLORES OFICIAL */}
      <section className="bg-white/90 rounded-3xl p-6 border border-pink-100 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#D81B60]" />
              <h3 className="font-display font-extrabold text-xl text-[#1A1A1A]">
                1. Paleta de Colores Oficial
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              5 colores corporativos armonizados para una experiencia elegante, femenina y moderna.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {BOUTIQUE_PALETTE.map((color) => (
            <div
              key={color.hex}
              className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden group hover:border-[#D81B60]/50 hover:shadow-md transition-all flex flex-col"
            >
              {/* Color swatch box */}
              <div
                className="h-28 w-full relative flex items-end justify-between p-3 border-b border-black/10"
                style={{ backgroundColor: color.hex }}
              >
                <button
                  type="button"
                  onClick={() => copyToClipboard(color.hex)}
                  className="px-2.5 py-1 rounded-lg bg-black/40 hover:bg-black/70 backdrop-blur-xs text-white text-[11px] font-mono font-bold flex items-center gap-1 transition-all"
                >
                  {copiedHex === color.hex ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>¡Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>{color.hex}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Color details */}
              <div className="p-4 flex-1 flex flex-col justify-between bg-white">
                <div>
                  <h4 className="font-display font-bold text-sm text-[#1A1A1A]">{color.name}</h4>
                  <p className="font-mono text-xs text-[#D81B60] font-semibold mt-0.5">{color.hex}</p>
                </div>
                <p className="text-xs text-slate-500 mt-3 leading-relaxed">{color.usage}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. COMPONENTE OBLIGATORIO: BOTÓN "AGREGAR AL CARRITO" CON VARIANTES */}
      <section className="bg-white/90 rounded-3xl p-6 border border-pink-100 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#C9A227]" />
              <h3 className="font-display font-extrabold text-xl text-[#1A1A1A]">
                2. Componente con Variantes: Botón "Agregar al Carrito"
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Requerimiento de Sección 11: 4 estados visuales bien diferenciados (Normal, Hover, Pressed, Disabled).
            </p>
          </div>

          {/* Interactive Variant Tester */}
          <div className="flex items-center gap-1 bg-[#FCE4EC]/60 p-1.5 rounded-2xl border border-pink-200">
            <span className="text-xs text-slate-600 px-2 font-medium">Probar estado:</span>
            {(['normal', 'hover', 'pressed', 'disabled'] as ButtonVariantState[]).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setActiveButtonVariant(v)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                  activeButtonVariant === v
                    ? 'bg-[#D81B60] text-white shadow-sm'
                    : 'text-slate-600 hover:text-[#D81B60] hover:bg-white'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Variant Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 1. Normal State */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded-md bg-[#FCE4EC] text-[#D81B60] text-xs font-bold uppercase border border-[#F8BBD0]">
                  Variante: Normal
                </span>
                <span className="text-[11px] text-slate-500 font-mono">#D81B60</span>
              </div>
              <h4 className="font-display font-bold text-sm text-[#1A1A1A]">Estado Base</h4>
              <p className="text-xs text-slate-500 mt-1">
                Color rosa elegante #D81B60, sombra suave, texto mayúsculas e icono de bolsa de compras.
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <BoutiqueButton variantState="normal" label="AGREGAR AL CARRITO" />
            </div>
          </div>

          {/* 2. Hover State */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded-md bg-pink-100 text-[#C2185B] text-xs font-bold uppercase border border-pink-200">
                  Variante: Hover
                </span>
                <span className="text-[11px] text-slate-500 font-mono">#C2185B</span>
              </div>
              <h4 className="font-display font-bold text-sm text-[#1A1A1A]">Estado Hover</h4>
              <p className="text-xs text-slate-500 mt-1">
                Cambio sutil a rosa oscuro #C2185B, incremento de resplandor y sombra difuminada.
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <BoutiqueButton variantState="hover" label="AGREGAR AL CARRITO" />
            </div>
          </div>

          {/* 3. Pressed State */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded-md bg-pink-200 text-[#AD1457] text-xs font-bold uppercase border border-pink-300">
                  Variante: Pressed
                </span>
                <span className="text-[11px] text-slate-500 font-mono">Scale 95%</span>
              </div>
              <h4 className="font-display font-bold text-sm text-[#1A1A1A]">Estado Pressed / Activo</h4>
              <p className="text-xs text-slate-500 mt-1">
                Botón ligeramente reducido con feedback táctil (scale 0.95) y tono profundo #AD1457.
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <BoutiqueButton variantState="pressed" label="AGREGAR AL CARRITO" />
            </div>
          </div>

          {/* 4. Disabled State */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded-md bg-slate-200 text-slate-500 text-xs font-bold uppercase border border-slate-300">
                  Variante: Disabled
                </span>
                <span className="text-[11px] text-slate-500 font-mono">Gris #D1D5DB</span>
              </div>
              <h4 className="font-display font-bold text-sm text-[#1A1A1A]">Estado Deshabilitado</h4>
              <p className="text-xs text-slate-500 mt-1">
                Fondo grisáceo inactivo, cursor not-allowed y texto atenuado cuando no hay stock o selección.
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <BoutiqueButton variantState="disabled" label="AGREGAR AL CARRITO" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. REUSABLE COMPONENTS LIBRARY */}
      <section className="bg-white/90 rounded-3xl p-6 border border-pink-100 shadow-sm space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
            <h3 className="font-display font-extrabold text-xl text-[#1A1A1A]">
              3. Librería de Componentes Reutilizables
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Campos de texto con iconos, selectores de talla/color, controles de cantidad y tarjetas de catálogo.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Inputs */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
            <h4 className="font-display font-bold text-sm text-[#1A1A1A] pb-2 border-b border-slate-200 flex items-center justify-between">
              <span>Campos de Texto con Iconos</span>
              <span className="text-[10px] text-[#D81B60] font-mono font-bold">BoutiqueInput</span>
            </h4>

            <BoutiqueInput
              label="Correo Electrónico"
              type="email"
              placeholder="maria@email.com"
              defaultValue="maria@email.com"
              icon={<Mail className="w-4 h-4" />}
            />

            <BoutiqueInput
              label="Contraseña"
              isPassword
              placeholder="••••••••"
              defaultValue="diva1234"
              icon={<Lock className="w-4 h-4" />}
            />

            <BoutiqueInput
              label="Campo con Error"
              type="text"
              defaultValue="correo-invalido"
              error="Ingresa un formato de correo válido"
              icon={<Mail className="w-4 h-4" />}
            />
          </div>

          {/* Selectors */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-5">
            <h4 className="font-display font-bold text-sm text-[#1A1A1A] pb-2 border-b border-slate-200 flex items-center justify-between">
              <span>Selectores de Talla & Color</span>
              <span className="text-[10px] text-[#D81B60] font-mono font-bold">Selectors</span>
            </h4>

            <div className="bg-white p-3 rounded-xl border border-slate-200">
              <SizeSelector
                sizes={['XS', 'S', 'M', 'L', 'XL']}
                selectedSize={testSize}
                onChange={setTestSize}
              />
            </div>

            <div className="bg-white p-3 rounded-xl border border-slate-200">
              <ColorSelector
                colors={[
                  { name: 'Rosa Diva', hex: '#D81B60' },
                  { name: 'Negro Noche', hex: '#1A1A1A' },
                  { name: 'Rosa Pastel', hex: '#FCE4EC' },
                  { name: 'Oro Suave', hex: '#C9A227' },
                ]}
                selectedColor={testColor}
                onChange={setTestColor}
              />
            </div>

            <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-[#1A1A1A] uppercase">Control de Cantidad:</span>
              <QuantityControl
                quantity={testQty}
                onIncrease={() => setTestQty((q) => q + 1)}
                onDecrease={() => setTestQty((q) => Math.max(1, q - 1))}
              />
            </div>
          </div>

          {/* Product Card Showcase */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex flex-col justify-between">
            <h4 className="font-display font-bold text-sm text-[#1A1A1A] pb-2 border-b border-slate-200 flex items-center justify-between">
              <span>Tarjeta de Producto</span>
              <span className="text-[10px] text-[#D81B60] font-mono font-bold">ProductCard</span>
            </h4>

            <div className="max-w-[240px] mx-auto my-3">
              <ProductCard
                product={sampleProduct}
                isFavorite={testFav}
                onToggleFavorite={() => setTestFav(!testFav)}
                onSelectProduct={() => alert(`Prenda seleccionada: ${sampleProduct.name}`)}
              />
            </div>

            <p className="text-xs text-slate-500 text-center">
              Incluye fotografía, badge, precio con descuento, favorito y botón "Ver producto".
            </p>
          </div>
        </div>
      </section>

      {/* 4. TYPOGRAPHY */}
      <section className="bg-white/90 rounded-3xl p-6 border border-pink-100 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-3 h-3 rounded-full bg-[#C9A227]" />
          <h3 className="font-display font-extrabold text-xl text-[#1A1A1A]">4. Tipografía Oficial</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
            <span className="px-2.5 py-0.5 rounded-md bg-[#FCE4EC] text-[#D81B60] text-xs font-bold uppercase border border-[#F8BBD0]">
              Fuente para Títulos
            </span>
            <h4 className="font-display font-bold text-2xl text-[#1A1A1A] mt-2 mb-1">
              Google Fonts: Poppins
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed font-sans">
              Utilizada en logotipos, encabezados de pantallas, títulos de prendas y banners promocionales. Aporta presencia geométrica y refinamiento.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-200 text-sm font-display text-[#D81B60] space-y-1">
              <p className="font-extrabold text-lg">BOUTIQUE DIVA (Extrabold 800)</p>
              <p className="font-bold">Hola, Diva ✨ (Bold 700)</p>
              <p className="font-semibold text-[#1A1A1A]">Vestido Diva Rose - $39,99 (Semibold 600)</p>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
            <span className="px-2.5 py-0.5 rounded-md bg-[#FFF8E1] text-[#C9A227] text-xs font-bold uppercase border border-[#FFE082]">
              Fuente para Textos y Botones
            </span>
            <h4 className="font-sans font-bold text-2xl text-[#1A1A1A] mt-2 mb-1">
              Google Fonts: Inter
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Utilizada para textos de párrafos, etiquetas de campos, botones de acción y resúmenes de compra. Proporciona legibilidad óptima en interfaces móviles.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-200 text-sm font-sans text-slate-700 space-y-1">
              <p className="font-bold uppercase tracking-wider text-xs text-[#D81B60]">AGREGAR AL CARRITO (Bold 700 Uppercase)</p>
              <p className="font-normal text-xs text-slate-600 leading-relaxed">
                “Vestido femenino de diseño elegante, confeccionado con materiales cómodos y ligeros...”
              </p>
              <p className="font-medium text-xs text-emerald-600">✓ En stock • ✓ Envíos disponibles</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
