'use client';

import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Settings, 
  Radio
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

interface VideoPlayerMockProps {
  streamerName: string;
  category: string;
  viewers: number;
  isLive: boolean;
}

export function VideoPlayerMock({ streamerName, category, viewers, isLive }: VideoPlayerMockProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  return (
    <div className="relative w-full aspect-video bg-zinc-950 rounded-lg overflow-hidden border border-zinc-800 shadow-xl group select-none">
      {/* Background Animated Video Canvas Simulation */}
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-tr from-zinc-950 via-purple-950/20 to-zinc-900">
        {isLive ? (
          <div className="text-center p-6 space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-600/20 border border-purple-500/30 text-purple-400">
              <Radio className="w-8 h-8 animate-pulse text-purple-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-300">
                Transmisión en Vivo de <span className="text-purple-400 font-bold">{streamerName}</span>
              </p>
              <p className="text-xs text-zinc-500 mt-1">
                Jugando a {category} • 1080p60 • Stream Mock Engine
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center p-6 text-zinc-500 space-y-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-zinc-800 text-zinc-400">
              <Radio className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium">El canal está desconectado</p>
            <p className="text-xs text-zinc-600">Revisa los clips y transmisiones anteriores abajo</p>
          </div>
        )}
      </div>

      {/* Top Overlay Badges */}
      <div className="absolute top-3 left-3 flex items-center gap-2 z-20">
        {isLive ? (
          <>
            <Badge variant="live">EN VIVO</Badge>
            <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-xs font-mono text-zinc-200 border border-white/10">
              {(viewers).toLocaleString()} espectadores
            </span>
          </>
        ) : (
          <Badge variant="outline">OFFLINE</Badge>
        )}
      </div>

      {/* Bottom Controls Bar (Visible on Hover or Pause) */}
      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 text-zinc-200 hover:text-white transition-colors"
            title={isPlaying ? 'Pausar' : 'Reproducir'}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
          </button>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-1.5 text-zinc-200 hover:text-white transition-colors"
            title={isMuted ? 'Activar sonido' : 'Silenciar'}
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-red-400" /> : <Volume2 className="w-5 h-5" />}
          </button>

          <span className="text-xs font-mono text-zinc-400">
            {isLive ? '02:44:12' : '00:00:00'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-1.5 text-zinc-200 hover:text-white transition-colors" title="Configuración de video">
            <Settings className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-zinc-200 hover:text-white transition-colors" title="Pantalla completa">
            <Maximize className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
