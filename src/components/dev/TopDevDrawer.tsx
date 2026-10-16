'use client';

import React from 'react';
import { Zap, FlaskConical, X, Sparkles, Sliders } from 'lucide-react';
import { useSimulationStore } from '@/stores/simulation-store';

export function TopDevDrawer() {
  const { isDrawerOpen, toggleDrawer, openPanel, activePanel } = useSimulationStore();

  if (!isDrawerOpen) return null;

  return (
    <div className="relative z-50 w-full border-b border-purple-500/30 bg-zinc-950/95 backdrop-blur-md px-4 py-3 shadow-2xl transition-all animate-in slide-in-from-top-2 duration-200 select-none">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Left: Branding & Explanation */}
        <div className="flex items-center gap-2.5">
          <div className="p-1 rounded-md bg-purple-600/20 text-purple-400 border border-purple-500/40">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-white tracking-wide uppercase flex items-center gap-1.5">
              <span>Panel de Control de Arquitectura & Simulación</span>
              <span className="px-1.5 py-0.2 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-mono border border-purple-500/30">
                DEV
              </span>
            </span>
            <p className="text-[11px] text-zinc-400">
              Dispara eventos de prueba y regula la velocidad para evaluar el estrés del chat.
            </p>
          </div>
        </div>

        {/* Center: The Two Pills (Rayito & Lab) */}
        <div className="flex items-center gap-2.5">
          {/* Pill 1: ⚡ Sim (Rayito) */}
          <button
            onClick={() => openPanel('sim')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm ${
              activePanel === 'sim'
                ? 'bg-amber-500 text-black shadow-amber-500/30 ring-2 ring-amber-400'
                : 'bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20 hover:border-amber-400'
            }`}
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Simulador de Tráfico</span>
          </button>

          {/* Pill 2: 🧪 Lab (Frasco) */}
          <button
            disabled
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-zinc-900 text-zinc-500 border border-zinc-800 opacity-60 cursor-not-allowed"
            title="Próximamente en Fase 2: Toggles de chat por capas y filtros experimentales"
          >
            <FlaskConical className="w-3.5 h-3.5" />
            <span>Laboratorio UX</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400">Fase 2</span>
          </button>
        </div>

        {/* Right: Close drawer */}
        <button
          onClick={toggleDrawer}
          className="p-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          title="Cerrar panel superior"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
