'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Send, 
  Smile, 
  Settings, 
  Users, 
  Zap, 
  Clock 
} from 'lucide-react';
import { useLayout } from '@/context/layout-context';
import { useChatStore } from '@/stores/chat-store';
import { useSimulationStore } from '@/stores/simulation-store';
import { Badge } from '@/components/ui/Badge';

interface ChatColumnProps {
  channelName: string;
}

export function ChatColumn({ channelName }: ChatColumnProps) {
  const { isChatCollapsed, toggleChat } = useLayout();
  const { messages, addMessage, generateRandomMessage } = useChatStore();
  const { chatSpeed, isSimRunning, isSlowMode, slowModeSeconds, openPanel } = useSimulationStore();

  const [inputText, setInputText] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Dynamic simulation traffic loop based on chatSpeed
  useEffect(() => {
    if (!isSimRunning || chatSpeed <= 0) return;

    // Interval based on messages per second
    const intervalMs = Math.max(25, Math.floor(1000 / chatSpeed));
    const intervalId = setInterval(() => {
      generateRandomMessage();
    }, intervalMs);

    return () => clearInterval(intervalId);
  }, [isSimRunning, chatSpeed, generateRandomMessage]);

  // Auto-scroll to bottom unless user is hovering/reading
  useEffect(() => {
    if (!isHovered) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isHovered]);

  // Cooldown countdown for slow mode
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || cooldown > 0) return;

    addMessage({
      username: 'TuUsuario',
      role: 'sub',
      message: inputText.trim(),
    });

    setInputText('');

    if (isSlowMode) {
      setCooldown(slowModeSeconds);
    }
  };

  if (isChatCollapsed) {
    return (
      <div className="w-10 border-l border-zinc-800 bg-zinc-950 flex flex-col items-center py-3 select-none">
        <button
          onClick={toggleChat}
          className="p-1.5 rounded text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          title="Abrir chat"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span 
          className="writing-mode-vertical text-xs font-semibold text-zinc-500 mt-6 tracking-widest uppercase cursor-pointer hover:text-zinc-300"
          onClick={toggleChat}
          style={{ writingMode: 'vertical-rl' }}
        >
          Chat en vivo
        </span>
      </div>
    );
  }

  return (
    <aside className="w-80 lg:w-88 border-l border-zinc-800 bg-zinc-950 flex flex-col h-full select-none shrink-0">
      {/* Chat Header */}
      <div className="h-12 border-b border-zinc-800 px-3 flex items-center justify-between text-zinc-200">
        <button
          onClick={toggleChat}
          className="p-1.5 rounded text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          title="Ocultar chat"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
            Chat en vivo
          </h3>
          {/* Active speed indicator */}
          <button
            onClick={() => openPanel('sim')}
            className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20"
            title="Ajustar velocidad de simulación"
          >
            <Zap className="w-3 h-3 fill-current" />
            <span>{chatSpeed} m/s</span>
          </button>
        </div>

        <div className="flex items-center gap-1">
          <button className="p-1.5 rounded text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors" title="Usuarios en el chat">
            <Users className="w-4 h-4" />
          </button>
          <button 
            onClick={() => openPanel('sim')} 
            className="p-1.5 rounded text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors" 
            title="Ajustes de simulación"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stream Messages List */}
      <div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex-1 overflow-y-auto p-3 space-y-1.5 text-xs leading-relaxed select-text relative"
      >
        {isHovered && (
          <div className="sticky top-0 inset-x-0 z-10 py-1 px-2.5 rounded bg-zinc-900/90 backdrop-blur-sm border border-zinc-700/80 text-[10px] text-amber-300 font-semibold text-center shadow-lg">
            Chat en pausa por cursor (leyendo)
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className="py-0.5 hover:bg-zinc-900/60 rounded px-1 -mx-1 transition-colors">
            <span className="text-[10px] text-zinc-500 font-mono mr-1.5 select-none">
              {msg.timestamp}
            </span>

            {msg.role !== 'viewer' && (
              <Badge variant="role" roleType={msg.role} className="mr-1.5 text-[9px] py-0 px-1">
                {msg.role}
              </Badge>
            )}

            <span className={`font-semibold mr-1.5 ${
              msg.role === 'mod' ? 'text-emerald-400' :
              msg.role === 'vip' ? 'text-pink-400' :
              msg.role === 'sub' ? 'text-purple-400' : 'text-zinc-300'
            }`}>
              {msg.username}:
            </span>

            <span className="text-zinc-200 break-words">
              {msg.message}
            </span>
          </div>
        ))}
        <div ref={chatBottomRef} />
      </div>

      {/* Chat Input Box */}
      <form onSubmit={handleSendMessage} className="p-3 border-t border-zinc-800 bg-zinc-900/50 space-y-2">
        {isSlowMode && (
          <div className="flex items-center gap-1.5 text-[10px] text-purple-300 font-medium">
            <Clock className="w-3 h-3 text-purple-400" />
            <span>Modo lento activo ({slowModeSeconds}s entre mensajes)</span>
          </div>
        )}

        <div className="relative">
          <input
            type="text"
            placeholder={cooldown > 0 ? `Espera ${cooldown}s para volver a escribir...` : "Enviar un mensaje..."}
            value={inputText}
            disabled={cooldown > 0}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 disabled:opacity-50"
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
            title="Insertar emoticonos"
          >
            <Smile className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[11px] text-zinc-500">
            {cooldown > 0 ? `Enfriando: ${cooldown}s` : 'Presiona Enter para enviar'}
          </span>
          <button
            type="submit"
            disabled={!inputText.trim() || cooldown > 0}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-purple-600 hover:bg-purple-700 active:bg-purple-800 disabled:opacity-40 disabled:pointer-events-none text-xs font-semibold text-white transition-colors"
          >
            <span>Chat</span>
            <Send className="w-3 h-3" />
          </button>
        </div>
      </form>
    </aside>
  );
}
