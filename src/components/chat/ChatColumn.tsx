'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Send, 
  Smile, 
  Settings, 
  ShieldAlert,
  Users
} from 'lucide-react';
import { useLayout } from '@/context/layout-context';
import { MOCK_CHAT_MESSAGES, ChatMessage } from '@/data/mock-data';
import { Badge } from '@/components/ui/Badge';

interface ChatColumnProps {
  channelName: string;
}

export function ChatColumn({ channelName }: ChatColumnProps) {
  const { isChatCollapsed, toggleChat } = useLayout();
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_CHAT_MESSAGES);
  const [inputText, setInputText] = useState('');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new message
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      username: 'TuUsuario',
      role: 'sub',
      message: inputText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
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

        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
          Chat de la transmisión
        </h3>

        <div className="flex items-center gap-1">
          <button className="p-1.5 rounded text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors" title="Usuarios en el chat">
            <Users className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors" title="Ajustes de chat">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stream Messages List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 text-xs leading-relaxed select-text">
        <div className="p-2.5 rounded bg-purple-950/20 border border-purple-900/40 text-[11px] text-purple-300 mb-2">
          <p className="font-semibold flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5 text-purple-400" />
            Modo Baseline Activo
          </p>
          <p className="text-zinc-400 mt-0.5">
            Canal de {channelName}. En la Fase 2 este módulo incorporará el selector de capas y velocidad adaptativa.
          </p>
        </div>

        {messages.map((msg) => (
          <div key={msg.id} className="py-1 hover:bg-zinc-900/60 rounded px-1 -mx-1 transition-colors">
            <span className="text-[10px] text-zinc-500 font-mono mr-1.5 select-none">
              {msg.timestamp}
            </span>

            {msg.role !== 'viewer' && (
              <Badge variant="role" roleType={msg.role} className="mr-1.5 text-[10px] py-0 px-1">
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
        <div className="relative">
          <input
            type="text"
            placeholder="Enviar un mensaje..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
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
            Presiona Enter para enviar
          </span>
          <button
            type="submit"
            disabled={!inputText.trim()}
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
