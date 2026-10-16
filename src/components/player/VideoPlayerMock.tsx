'use client';

import React, { useState, useRef, useEffect } from 'react';
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
import { StreamAlertOverlay } from './StreamAlertOverlay';

interface VideoPlayerMockProps {
  streamerName: string;
  category: string;
  viewers: number;
  isLive: boolean;
}

export function VideoPlayerMock({ streamerName, category, viewers, isLive }: VideoPlayerMockProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true); // Default muted to allow browser autoplay
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Free high quality public video loop (Big Buck Bunny sample)
  const videoSource = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  useEffect(() => {
    if (videoRef.current && isLive) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {
          // Autoplay policy might pause until user interaction
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, isLive]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-video bg-black rounded-lg overflow-hidden border border-zinc-800 shadow-2xl group select-none"
    >
      {/* OBS Alerts Overlay (Bits, Subs, Raids) */}
      <StreamAlertOverlay />

      {/* HTML5 Live Video Element */}
      {isLive ? (
        <video
          ref={videoRef}
          src={videoSource}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-950 text-zinc-500 space-y-2">
          <div className="text-center p-6 space-y-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-zinc-800 text-zinc-400">
              <Radio className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-zinc-300">El canal está actualmente desconectado</p>
            <p className="text-xs text-zinc-500">Revisa los clips y directos anteriores abajo</p>
          </div>
        </div>
      )}

      {/* Top Overlay Badges */}
      <div className="absolute top-3 left-3 flex items-center gap-2 z-20">
        {isLive ? (
          <>
            <Badge variant="live">EN VIVO</Badge>
            <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-xs font-mono text-zinc-200 border border-white/10 shadow-sm">
              {viewers.toLocaleString()} espectadores
            </span>
          </>
        ) : (
          <Badge variant="outline">OFFLINE</Badge>
        )}
      </div>

      {/* Bottom Controls Bar (Visible on Hover or when paused) */}
      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={togglePlay}
            className="p-1.5 text-zinc-200 hover:text-white transition-colors"
            title={isPlaying ? 'Pausar (Espacio)' : 'Reproducir (Espacio)'}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
          </button>

          <button
            onClick={toggleMute}
            className="p-1.5 text-zinc-200 hover:text-white transition-colors"
            title={isMuted ? 'Activar sonido (M)' : 'Silenciar (M)'}
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-red-400" /> : <Volume2 className="w-5 h-5" />}
          </button>

          <span className="text-xs font-mono text-zinc-300">
            {streamerName} • {category} (1080p60)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-1.5 text-zinc-200 hover:text-white transition-colors" title="Configuración de video">
            <Settings className="w-4 h-4" />
          </button>
          <button 
            onClick={toggleFullscreen} 
            className="p-1.5 text-zinc-200 hover:text-white transition-colors" 
            title="Pantalla completa"
          >
            <Maximize className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
