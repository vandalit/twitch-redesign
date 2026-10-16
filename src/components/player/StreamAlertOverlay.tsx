'use client';

import React from 'react';
import { Sparkles, Gift, Flame } from 'lucide-react';
import { useSimulationStore } from '@/stores/simulation-store';

export function StreamAlertOverlay() {
  const { activeAlert, dismissAlert } = useSimulationStore();

  if (!activeAlert) return null;

  return (
    <div className="absolute inset-0 pointer-events-none flex items-start justify-center pt-8 z-30 overflow-hidden">
      <div 
        onClick={dismissAlert}
        className="pointer-events-auto cursor-pointer animate-in zoom-in-95 duration-300 max-w-sm mx-4 flex items-center gap-3.5 p-3.5 rounded-xl border bg-black/90 backdrop-blur-md shadow-2xl transition-all hover:scale-105"
        style={{
          borderColor: 
            activeAlert.type === 'bits' ? '#f59e0b' :
            activeAlert.type === 'sub' ? '#9333ea' : '#ef4444'
        }}
      >
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-lg"
          style={{
            backgroundColor:
              activeAlert.type === 'bits' ? 'rgba(245, 158, 11, 0.2)' :
              activeAlert.type === 'sub' ? 'rgba(147, 51, 234, 0.2)' : 'rgba(239, 68, 68, 0.2)',
            color:
              activeAlert.type === 'bits' ? '#f59e0b' :
              activeAlert.type === 'sub' ? '#c084fc' : '#f87171'
          }}
        >
          {activeAlert.type === 'bits' && <Sparkles className="w-6 h-6 animate-spin" />}
          {activeAlert.type === 'sub' && <Gift className="w-6 h-6 animate-bounce" />}
          {activeAlert.type === 'raid' && <Flame className="w-6 h-6 animate-pulse" />}
        </div>

        <div className="flex-1 min-w-0 text-left">
          <p className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-1.5">
            <span>{activeAlert.user}</span>
            {activeAlert.type === 'bits' && (
              <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono">
                +{activeAlert.amount} BITS
              </span>
            )}
            {activeAlert.type === 'raid' && (
              <span className="px-1.5 py-0.2 rounded bg-red-500/20 text-red-300 text-[10px] font-mono">
                {activeAlert.amount} VIEWERS
              </span>
            )}
          </p>

          <p className="text-xs text-zinc-300 mt-0.5 truncate">
            {activeAlert.message || '¡Gracias por el tremendo apoyo!'}
          </p>
        </div>
      </div>
    </div>
  );
}
