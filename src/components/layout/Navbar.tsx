'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Tv, 
  Compass, 
  Search, 
  Bell, 
  MessageSquare, 
  Crown, 
  MoreVertical,
  Gem
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/directory?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 flex h-14 w-full items-center justify-between border-b border-zinc-800 bg-zinc-950 px-4 text-zinc-100 select-none">
      {/* Left: Brand & Main Navigation */}
      <div className="flex items-center gap-6">
        <Link 
          href="/" 
          className="flex items-center gap-2 group hover:opacity-90 transition-opacity"
          title="Twitch Redesign Home"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-600 text-white font-black shadow-md group-hover:bg-purple-500 transition-colors">
            <Tv className="h-5 w-5" />
          </div>
          <span className="hidden font-bold tracking-tight text-lg text-white sm:inline-block">
            twitch<span className="text-purple-400 font-mono text-xs ml-1 font-semibold px-1.5 py-0.5 rounded bg-purple-950/80 border border-purple-800">CLONE</span>
          </span>
        </Link>

        <nav className="flex items-center gap-2">
          <Link 
            href="/directory"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-semibold transition-colors ${
              pathname.startsWith('/directory')
                ? 'text-purple-400 bg-purple-950/40 border border-purple-900/50'
                : 'text-zinc-300 hover:text-white hover:bg-zinc-800/80'
            }`}
          >
            <Compass className="h-4 w-4" />
            <span>Explorar</span>
          </Link>
        </nav>
      </div>

      {/* Center: Search Box Wireframe */}
      <div className="flex flex-1 max-w-md mx-4">
        <form onSubmit={handleSearch} className="flex w-full items-center">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Buscar categorías, canales o juegos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 rounded-l-md border border-zinc-700 bg-zinc-900 px-3.5 text-sm text-zinc-100 placeholder-zinc-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>
          <button
            type="submit"
            className="flex h-9 w-10 items-center justify-center rounded-r-md border border-l-0 border-zinc-700 bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white transition-colors"
            title="Buscar"
          >
            <Search className="h-4 w-4" />
          </button>
        </form>
      </div>

      {/* Right: User Status & Actions */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" title="Prime Gaming & Recompensas" className="hidden sm:inline-flex">
          <Crown className="h-4 w-4 text-amber-400" />
        </Button>

        <Button variant="ghost" size="icon" title="Notificaciones">
          <Bell className="h-4 w-4" />
        </Button>

        <Button variant="ghost" size="icon" title="Susurros">
          <MessageSquare className="h-4 w-4" />
        </Button>

        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-xs font-semibold text-purple-300">
          <Gem className="h-3.5 w-3.5 text-purple-400" />
          <span>350</span>
        </div>

        <div className="ml-1 pl-2 border-l border-zinc-800 flex items-center gap-2">
          <Link href="/ibai" title="Mi perfil de prueba">
            <Avatar 
              alt="Mi Usuario" 
              size="sm" 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
