'use client';

import React, { useState } from 'react';
import { 
  Zap, 
  X, 
  Minus, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Trash2, 
  Sparkles, 
  Gift, 
  Flame, 
  Radio 
} from 'lucide-react';
import { useSimulationStore } from '@/stores/simulation-store';
import { useChatStore } from '@/stores/chat-store';

export function SimulationPanel() {
  const { 
    activePanel, 
    closePanel, 
    chatSpeed, 
    setChatSpeed, 
    isSimRunning, 
    toggleSimRunning,
    isSlowMode,
    slowModeSeconds,
    setSlowMode,
    enableSoundAlerts,
    setEnableSoundAlerts,
    triggerAlert
  } = useSimulationStore();

  const { clearMessages } = useChatStore();
  const [isMinimized, setIsMinimized] = useState(false);

  if (activePanel !== 'sim') return null;

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50 select-none">
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-2 px-3 py-2 rounded-full bg-amber-500 text-black font-bold text-xs shadow-2xl hover:bg-amber-400 transition-all ring-2 ring-amber-300 animate-bounce"
        >
          <Zap className="w-4 h-4 fill-current" />
          <span>Simulador ({chatSpeed} msg/s)</span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-88 sm:w-96 rounded-xl border border-amber-500/40 bg-zinc-950/95 backdrop-blur-xl p-4 text-zinc-100 shadow-2xl space-y-4 select-none animate-in fade-in slide-in-from-bottom-4 duration-200">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded bg-amber-500/20 text-amber-400">
            <Zap className="w-4 h-4 fill-current" />
          </div>
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-white">
              Simulation Studio
            </h3>
            <p className="text-[10px] text-zinc-400">Motor de estrés y flujo de eventos</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMinimized(true)}
            className="p-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-800"
            title="Minimizar panel"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={closePanel}
            className="p-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-800"
            title="Cerrar panel"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Speed Slider Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-zinc-300 flex items-center gap-1.5">
            <span>Velocidad del Chat:</span>
            <span className="font-mono text-amber-400 font-bold bg-amber-500/10 px-1.5 py-0.2 rounded border border-amber-500/20">
              {chatSpeed} msg/s
            </span>
          </span>

          <button
            onClick={toggleSimRunning}
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold transition-colors ${
              isSimRunning 
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                : 'bg-zinc-800 text-zinc-400'
            }`}
          >
            {isSimRunning ? <Pause className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current" />}
            <span>{isSimRunning ? 'Activo' : 'Pausado'}</span>
          </button>
        </div>

        <input
          type="range"
          min="0"
          max="35"
          step="1"
          value={chatSpeed}
          onChange={(e) => setChatSpeed(Number(e.target.value))}
          className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
        />

        {/* Quick Presets */}
        <div className="grid grid-cols-4 gap-1 text-[10px] font-semibold pt-0.5">
          <button
            onClick={() => setChatSpeed(1)}
            className="px-1.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800"
          >
            Chill (1)
          </button>
          <button
            onClick={() => setChatSpeed(5)}
            className="px-1.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800"
          >
            Medio (5)
          </button>
          <button
            onClick={() => setChatSpeed(15)}
            className="px-1.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800"
          >
            Hype (15)
          </button>
          <button
            onClick={() => setChatSpeed(30)}
            className="px-1.5 py-1 rounded bg-red-950/40 hover:bg-red-900/40 text-red-400 border border-red-800/50"
          >
            Caos (30)
          </button>
        </div>
      </div>

      {/* Slow Mode Section */}
      <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-900/60 border border-zinc-800 text-xs">
        <div>
          <p className="font-semibold text-zinc-200">Slow Mode</p>
          <p className="text-[10px] text-zinc-500">Restricción de envío para espectadores</p>
        </div>

        <div className="flex items-center gap-1.5">
          <select
            value={slowModeSeconds}
            onChange={(e) => setSlowMode(isSlowMode, Number(e.target.value))}
            className="bg-zinc-950 border border-zinc-700 rounded px-2 py-0.5 text-[11px] text-zinc-300 focus:outline-none"
          >
            <option value="3">3s</option>
            <option value="5">5s</option>
            <option value="10">10s</option>
            <option value="30">30s</option>
          </select>

          <button
            onClick={() => setSlowMode(!isSlowMode)}
            className={`px-2.5 py-1 rounded text-[11px] font-bold transition-colors ${
              isSlowMode
                ? 'bg-purple-600 text-white'
                : 'bg-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            {isSlowMode ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      {/* Event Triggers (OBS Alerts) */}
      <div className="space-y-1.5">
        <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
          Disparar Eventos en Pantalla
        </p>

        <div className="grid grid-cols-3 gap-1.5">
          <button
            onClick={() =>
              triggerAlert({
                type: 'bits',
                user: 'Gamer_Juan',
                amount: 500,
                message: '¡Toma esos 500 bits por la jugada! 💎',
              })
            }
            className="flex flex-col items-center justify-center p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 text-amber-300 transition-colors text-center"
          >
            <Sparkles className="w-3.5 h-3.5 mb-1 text-amber-400" />
            <span className="text-[10px] font-bold leading-none">500 Bits</span>
          </button>

          <button
            onClick={() =>
              triggerAlert({
                type: 'sub',
                user: 'Maria_Dev',
                message: '¡Se acaba de suscribir con Twitch Prime! ⭐',
              })
            }
            className="flex flex-col items-center justify-center p-2 rounded-lg bg-purple-500/10 border border-purple-500/30 hover:bg-purple-500/20 text-purple-300 transition-colors text-center"
          >
            <Gift className="w-3.5 h-3.5 mb-1 text-purple-400" />
            <span className="text-[10px] font-bold leading-none">Nueva Sub</span>
          </button>

          <button
            onClick={() =>
              triggerAlert({
                type: 'raid',
                user: 'Ibai',
                amount: 1850,
                message: '¡Viene con una raid de 1,850 espectadores! 🚀',
              })
            }
            className="flex flex-col items-center justify-center p-2 rounded-lg bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 text-red-300 transition-colors text-center"
          >
            <Flame className="w-3.5 h-3.5 mb-1 text-red-400" />
            <span className="text-[10px] font-bold leading-none">Raid 1.8k</span>
          </button>
        </div>
      </div>

      {/* Footer controls: Sounds and Clear */}
      <div className="flex items-center justify-between pt-2 border-t border-zinc-800 text-[11px]">
        <button
          onClick={() => setEnableSoundAlerts(!enableSoundAlerts)}
          className="flex items-center gap-1.5 text-zinc-400 hover:text-zinc-200 transition-colors"
        >
          {enableSoundAlerts ? <Volume2 className="w-3.5 h-3.5 text-amber-400" /> : <VolumeX className="w-3.5 h-3.5" />}
          <span>{enableSoundAlerts ? 'Sonidos alertas ON' : 'Sonidos OFF'}</span>
        </button>

        <button
          onClick={clearMessages}
          className="flex items-center gap-1 text-zinc-400 hover:text-red-400 transition-colors"
          title="Limpiar buffer de chat"
        >
          <Trash2 className="w-3 h-3" />
          <span>Vaciar chat</span>
        </button>
      </div>
    </div>
  );
}
