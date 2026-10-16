import { create } from 'zustand';
import { ChatMessage, MOCK_CHAT_MESSAGES } from '@/data/mock-data';

interface ChatStore {
  messages: ChatMessage[];
  addMessage: (msg: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  clearMessages: () => void;
  generateRandomMessage: () => void;
}

const SAMPLE_USERS = [
  { username: 'Alex_Gamer', role: 'viewer' as const },
  { username: 'Clara_VIP', role: 'vip' as const },
  { username: 'NicoSub99', role: 'sub' as const },
  { username: 'Mod_Valen', role: 'mod' as const },
  { username: 'Sofi_Pixel', role: 'sub' as const },
  { username: 'Diego_Speed', role: 'viewer' as const },
  { username: 'Matu_dev', role: 'vip' as const },
  { username: 'Laura_Ch', role: 'viewer' as const },
  { username: 'Keko_TTV', role: 'sub' as const },
  { username: 'Fran_Pro', role: 'viewer' as const },
];

const SAMPLE_TEXTS = [
  'VAMOOOS directo a la final 🔥',
  '¿Vieron esa jugada? Que locura jajaja',
  'PogChamp PogChamp PogChamp',
  'LUL x100 no te lo puedo creer',
  '¿A qué hora termina el stream hoy?',
  'GG WP a todos!',
  'Esa ulti estuvo perfecta hermano',
  'Kekw tremendo missplay',
  'Salúdame por favor! Te sigo desde 2021',
  'Buenísima la nueva interfaz, mucho más limpia',
  '¿Van a jugar ranked después de esto?',
  'BibleThump F en el chat',
  'Modo tryhard activado señores',
  '10/10 esa definición',
  '¿Cuál es tu setup actual?',
];

export const useChatStore = create<ChatStore>((set) => ({
  messages: MOCK_CHAT_MESSAGES,

  addMessage: (msgData) => {
    const newMsg: ChatMessage = {
      ...msgData,
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    set((state) => ({
      // Keep last 120 messages in memory to avoid DOM bloating
      messages: [...state.messages.slice(-119), newMsg],
    }));
  },

  clearMessages: () => set({ messages: [] }),

  generateRandomMessage: () => {
    const randomUser = SAMPLE_USERS[Math.floor(Math.random() * SAMPLE_USERS.length)];
    const randomText = SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)];

    const newMsg: ChatMessage = {
      id: `sim-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      username: randomUser.username,
      role: randomUser.role,
      message: randomText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    set((state) => ({
      messages: [...state.messages.slice(-119), newMsg],
    }));
  },
}));
