export interface Streamer {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  isLive: boolean;
  viewers: number;
  category: string;
  categorySlug: string;
  streamTitle: string;
  tags: string[];
  bannerUrl?: string;
  bio?: string;
  followers?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  viewers: number;
  tags: string[];
  boxArt: string;
  description?: string;
}

export interface ChatMessage {
  id: string;
  username: string;
  role: 'viewer' | 'sub' | 'vip' | 'mod' | 'broadcaster';
  badgeColor?: string;
  message: string;
  timestamp: string;
}

export const MOCK_CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'Just Chatting',
    slug: 'just-chatting',
    viewers: 284500,
    tags: ['IRL', 'Español', 'Charla'],
    boxArt: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=400&auto=format&fit=crop&q=80',
    description: 'Conversaciones en vivo, debates y momentos casuales con la comunidad.'
  },
  {
    id: 'cat-2',
    name: 'Valorant',
    slug: 'valorant',
    viewers: 145200,
    tags: ['FPS', 'Shooter', 'Competitivo'],
    boxArt: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&auto=format&fit=crop&q=80',
    description: 'Shooter táctico en primera persona 5v5 con personajes con habilidades únicas.'
  },
  {
    id: 'cat-3',
    name: 'Grand Theft Auto V',
    slug: 'gta-v',
    viewers: 112800,
    tags: ['Roleplay', 'Acción', 'Mundo Abierto'],
    boxArt: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&auto=format&fit=crop&q=80',
    description: 'Servidores de Roleplay de alto rendimiento y partidas comunitarias.'
  },
  {
    id: 'cat-4',
    name: 'League of Legends',
    slug: 'league-of-legends',
    viewers: 98300,
    tags: ['MOBA', 'Estrategia', 'Torneo'],
    boxArt: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&auto=format&fit=crop&q=80',
    description: 'El juego competitivo de arena de batalla multijugador por excelencia.'
  },
  {
    id: 'cat-5',
    name: 'Software and Game Development',
    slug: 'software-dev',
    viewers: 14200,
    tags: ['Programación', 'Next.js', 'TypeScript', 'Tech'],
    boxArt: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&auto=format&fit=crop&q=80',
    description: 'Desarrollo de software en vivo, code reviews y diseño de arquitectura.'
  },
  {
    id: 'cat-6',
    name: 'Minecraft',
    slug: 'minecraft',
    viewers: 64100,
    tags: ['Supervivencia', 'Construcción', 'Multijugador'],
    boxArt: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&auto=format&fit=crop&q=80',
    description: 'Aventuras en mundos infinitos, servidores comunitarios y retos survival.'
  }
];

export const MOCK_STREAMERS: Streamer[] = [
  {
    id: 's-1',
    username: 'ibai',
    displayName: 'Ibai',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    isLive: true,
    viewers: 72400,
    category: 'Just Chatting',
    categorySlug: 'just-chatting',
    streamTitle: 'CHARLANDO TRANQUILOS + REACCIONANDO A LOS MEJORES CLIPS DE LA SEMANA',
    tags: ['Español', 'Charla', 'Charla Chill', 'Comunidad'],
    followers: '15.4M',
    bio: 'Streamer y creador de contenido de KOI y La Velada.'
  },
  {
    id: 's-2',
    username: 'tarik',
    displayName: 'Tarik',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
    isLive: true,
    viewers: 32100,
    category: 'Valorant',
    categorySlug: 'valorant',
    streamTitle: 'VCT Watchparty + Ranked grinding to Radiant | SEN Tarik',
    tags: ['English', 'FPS', 'Radiant', 'VCT'],
    followers: '3.1M',
    bio: 'Major Winner. Content Creator for Sentinels.'
  },
  {
    id: 's-3',
    username: 'elxokas',
    displayName: 'ElXokas',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&auto=format&fit=crop&q=80',
    isLive: true,
    viewers: 21500,
    category: 'Grand Theft Auto V',
    categorySlug: 'gta-v',
    streamTitle: 'VUELVE EL MEJOR ROLERO DE MARBELLA VICE || DIA INTENSO',
    tags: ['Español', 'Roleplay', 'Hardcore'],
    followers: '3.8M',
    bio: 'El número uno de la noche y el más competitivo.'
  },
  {
    id: 's-4',
    username: 'midudev',
    displayName: 'Midudev',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    isLive: true,
    viewers: 3800,
    category: 'Software and Game Development',
    categorySlug: 'software-dev',
    streamTitle: '🔴 Live Coding: Rediseñando el Frontend de Twitch con Next.js y Tailwind',
    tags: ['Español', 'Programación', 'NextJS', 'Frontend'],
    followers: '210K',
    bio: 'Desarrollador web y divulgador de tecnología en español.'
  },
  {
    id: 's-5',
    username: 'illojuan',
    displayName: 'IlloJuan',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    isLive: false,
    viewers: 0,
    category: 'Just Chatting',
    categorySlug: 'just-chatting',
    streamTitle: 'Hoy no hay directo! Volvemos mañana a las 18:00',
    tags: ['Español', 'Comedia', 'Variedad'],
    followers: '4.2M',
    bio: 'Canal de variedades, risas y gameplay distendido.'
  },
  {
    id: 's-6',
    username: 'shroud',
    displayName: 'Shroud',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    isLive: true,
    viewers: 18400,
    category: 'Valorant',
    categorySlug: 'valorant',
    streamTitle: 'Testing the new patch with the boys | Aim Lab warmup first',
    tags: ['English', 'FPS', 'NoMicToStart'],
    followers: '10.8M',
    bio: 'Just playing games and having fun.'
  }
];

export const MOCK_CHAT_MESSAGES: ChatMessage[] = [
  { id: 'm-1', username: 'SuperMod_Alex', role: 'mod', message: '¡Bienvenidos al chat! Recuerden mantener el respeto en los comentarios.', timestamp: '21:04' },
  { id: 'm-2', username: 'GamerPro99', role: 'sub', message: 'VAMOOOS directo a Radiant hoy 🔥🔥', timestamp: '21:04' },
  { id: 'm-3', username: 'Clara_VIP', role: 'vip', message: '¿Viste la jugada de la ronda pasada? Qué locura jajaja', timestamp: '21:05' },
  { id: 'm-4', username: 'juanito_perez', role: 'viewer', message: 'Hola a todos desde Chile 🇨🇱', timestamp: '21:05' },
  { id: 'm-5', username: 'DevStreamer', role: 'sub', message: 'Esa arquitectura frontend modular está quedando impecable 👌', timestamp: '21:05' },
  { id: 'm-6', username: 'PixelMaster', role: 'viewer', message: '¿Con qué resolución estás jugando?', timestamp: '21:06' },
  { id: 'm-7', username: 'TechFanatic', role: 'vip', message: 'El chat por capas en la Fase 2 va a cambiar la forma de moderar totalmente', timestamp: '21:06' },
  { id: 'm-8', username: 'SuperMod_Alex', role: 'mod', message: 'Recuerden que tienen los comandos !redes y !horario disponibles en el chat.', timestamp: '21:07' }
];

export function getStreamerByUsername(username: string): Streamer | undefined {
  return MOCK_STREAMERS.find(s => s.username.toLowerCase() === username.toLowerCase());
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return MOCK_CATEGORIES.find(c => c.slug.toLowerCase() === slug.toLowerCase());
}
