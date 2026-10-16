'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Gamepad2, 
  Radio, 
  Search, 
  Sparkles,
  Users
} from 'lucide-react';
import { MOCK_CATEGORIES, MOCK_STREAMERS } from '@/data/mock-data';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';

export default function DirectoryPage() {
  const [activeTab, setActiveTab] = useState<'categories' | 'live'>('categories');
  const [filterTag, setFilterTag] = useState<string | null>(null);

  const allTags = ['Todos', 'FPS', 'IRL', 'Roleplay', 'Estrategia', 'Programación'];

  const filteredCategories = filterTag && filterTag !== 'Todos'
    ? MOCK_CATEGORIES.filter(c => c.tags.some(t => t.toLowerCase() === filterTag.toLowerCase()))
    : MOCK_CATEGORIES;

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6 select-none">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-black tracking-tight text-white">
          Explorar
        </h1>
        <p className="text-sm text-zinc-400 mt-1">
          Navega por las categorías más vistas y canales en directo del clon de Twitch.
        </p>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-6 border-b border-zinc-800 text-sm font-semibold">
        <button
          onClick={() => setActiveTab('categories')}
          className={`flex items-center gap-2 pb-3 transition-colors relative ${
            activeTab === 'categories'
              ? 'text-purple-400 border-b-2 border-purple-500'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Gamepad2 className="w-4 h-4" />
          <span>Categorías</span>
        </button>

        <button
          onClick={() => setActiveTab('live')}
          className={`flex items-center gap-2 pb-3 transition-colors relative ${
            activeTab === 'live'
              ? 'text-purple-400 border-b-2 border-purple-500'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Radio className="w-4 h-4 text-red-500" />
          <span>Canales en vivo</span>
        </button>
      </div>

      {/* Filter Tags Bar */}
      <div className="flex flex-wrap items-center gap-2">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setFilterTag(tag === 'Todos' ? null : tag)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
              (tag === 'Todos' && !filterTag) || filterTag === tag
                ? 'bg-purple-600 text-white'
                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Content based on Active Tab */}
      {activeTab === 'categories' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/directory/game/${cat.slug}`}
              className="group flex flex-col space-y-2"
            >
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800 group-hover:border-purple-500 group-hover:shadow-lg group-hover:shadow-purple-950/40 transition-all">
                <Image
                  src={cat.boxArt}
                  alt={cat.name}
                  fill
                  sizes="240px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div>
                <h3 className="text-sm font-bold text-zinc-100 group-hover:text-purple-400 truncate transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  {(cat.viewers / 1000).toFixed(1)}k espectadores
                </p>

                <div className="flex flex-wrap gap-1 mt-1.5">
                  {cat.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {MOCK_STREAMERS.filter(s => s.isLive).map((streamer) => (
            <div 
              key={streamer.id}
              className="bg-zinc-900/60 border border-zinc-800 rounded-lg overflow-hidden group hover:border-zinc-700 hover:bg-zinc-900 transition-all flex flex-col"
            >
              <Link href={`/${streamer.username}`} className="relative aspect-video bg-zinc-950 block overflow-hidden">
                <div className="absolute top-2 left-2 z-20">
                  <Badge variant="live">EN VIVO</Badge>
                </div>
                <div className="absolute bottom-2 left-2 z-20 text-[11px] font-mono px-1.5 py-0.5 rounded bg-black/70 text-zinc-200">
                  {streamer.viewers.toLocaleString()} viewers
                </div>
                <div className="w-full h-full flex items-center justify-center text-zinc-700 bg-zinc-900">
                  <Radio className="w-10 h-10 text-zinc-600 group-hover:text-purple-400 transition-colors" />
                </div>
              </Link>

              <div className="p-3 flex gap-3 flex-1">
                <Link href={`/${streamer.username}`}>
                  <Avatar
                    src={streamer.avatar}
                    alt={streamer.displayName}
                    size="md"
                    isLive={streamer.isLive}
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link 
                    href={`/${streamer.username}`}
                    className="text-sm font-semibold text-zinc-100 group-hover:text-purple-400 transition-colors line-clamp-1"
                  >
                    {streamer.streamTitle}
                  </Link>
                  <p className="text-xs text-zinc-400 mt-0.5 truncate">
                    {streamer.displayName}
                  </p>
                  <Link 
                    href={`/directory/game/${streamer.categorySlug}`}
                    className="text-xs text-zinc-500 hover:text-purple-400 hover:underline block truncate mt-0.5"
                  >
                    {streamer.category}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
