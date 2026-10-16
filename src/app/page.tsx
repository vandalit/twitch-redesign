'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ChevronLeft, 
  ChevronRight, 
  Users, 
  Play, 
  Flame, 
  Sparkles 
} from 'lucide-react';
import { MOCK_STREAMERS, MOCK_CATEGORIES } from '@/data/mock-data';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';

export default function HomePage() {
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const featuredStreams = MOCK_STREAMERS.filter(s => s.isLive);
  const currentFeatured = featuredStreams[featuredIndex] || featuredStreams[0];

  const handlePrev = () => {
    setFeaturedIndex((prev) => (prev > 0 ? prev - 1 : featuredStreams.length - 1));
  };

  const handleNext = () => {
    setFeaturedIndex((prev) => (prev < featuredStreams.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-8 select-none">
      {/* Hero Carousel Section */}
      <section className="relative rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[320px]">
          {/* Left: Video Preview Area with live HTML5 video */}
          <div className="lg:col-span-8 relative aspect-video lg:aspect-auto bg-black flex items-center justify-center group overflow-hidden">
            <video
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-75 transition-opacity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30 z-10" />
            
            <div className="text-center p-6 space-y-3 z-10">
              <Badge variant="live">EN VIVO</Badge>
              <p className="text-lg md:text-xl font-bold text-white tracking-tight drop-shadow-md">
                {currentFeatured.streamTitle}
              </p>
              <div className="flex items-center justify-center gap-2">
                <Link href={`/${currentFeatured.username}`}>
                  <Button variant="primary" size="md" className="gap-2 shadow-lg shadow-purple-900/40">
                    <Play className="w-4 h-4 fill-current" />
                    <span>Ver Transmisión</span>
                  </Button>
                </Link>
              </div>
            </div>

            {/* Video Controls Switchers */}
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/60 hover:bg-purple-600 text-white transition-colors"
              title="Stream anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/60 hover:bg-purple-600 text-white transition-colors"
              title="Siguiente stream"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Right: Streamer Info Panel */}
          <div className="lg:col-span-4 p-5 flex flex-col justify-between bg-zinc-950 border-t lg:border-t-0 lg:border-l border-zinc-800">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Link href={`/${currentFeatured.username}`}>
                  <Avatar
                    src={currentFeatured.avatar}
                    alt={currentFeatured.displayName}
                    size="lg"
                    isLive={currentFeatured.isLive}
                  />
                </Link>
                <div>
                  <Link 
                    href={`/${currentFeatured.username}`}
                    className="font-bold text-base text-zinc-100 hover:text-purple-400 transition-colors"
                  >
                    {currentFeatured.displayName}
                  </Link>
                  <p className="text-xs text-purple-400 font-medium">
                    <Link href={`/directory/game/${currentFeatured.categorySlug}`} className="hover:underline">
                      {currentFeatured.category}
                    </Link>
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400 mt-0.5">
                    <Users className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{currentFeatured.viewers.toLocaleString()} espectadores</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                {currentFeatured.bio || currentFeatured.streamTitle}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {currentFeatured.tags.map((tag) => (
                  <Badge key={tag} variant="tag">{tag}</Badge>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500">
              <span>Destacado {featuredIndex + 1} de {featuredStreams.length}</span>
              <div className="flex gap-1">
                {featuredStreams.map((_, i) => (
                  <span
                    key={i}
                    onClick={() => setFeaturedIndex(i)}
                    className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
                      i === featuredIndex ? 'bg-purple-500 w-4' : 'bg-zinc-700 hover:bg-zinc-500'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Live Channels Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-red-500" />
            <h2 className="text-lg font-bold tracking-tight text-zinc-100">
              Canales en vivo recomendados
            </h2>
          </div>
          <Link 
            href="/directory" 
            className="text-xs font-semibold text-purple-400 hover:text-purple-300 hover:underline"
          >
            Ver todos en Explorar →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {MOCK_STREAMERS.filter(s => s.isLive).map((streamer) => (
            <div 
              key={streamer.id}
              className="bg-zinc-900/60 border border-zinc-800 rounded-lg overflow-hidden group hover:border-zinc-700 hover:bg-zinc-900 transition-all flex flex-col"
            >
              {/* Card Thumbnail Area */}
              <Link href={`/${streamer.username}`} className="relative aspect-video bg-zinc-950 block overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity" />
                <div className="absolute top-2 left-2 z-20">
                  <Badge variant="live">EN VIVO</Badge>
                </div>
                <div className="absolute bottom-2 left-2 z-20 text-[11px] font-mono px-1.5 py-0.5 rounded bg-black/70 text-zinc-200">
                  {streamer.viewers.toLocaleString()} viewers
                </div>
                <div className="w-full h-full flex items-center justify-center text-zinc-700 group-hover:scale-105 transition-transform duration-300">
                  <Play className="w-10 h-10 text-zinc-600 group-hover:text-purple-400 transition-colors" />
                </div>
              </Link>

              {/* Card Metadata */}
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
                    title={streamer.streamTitle}
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

                  <div className="flex flex-wrap gap-1 mt-2">
                    {streamer.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top Categories Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg font-bold tracking-tight text-zinc-100">
              Categorías que podrían gustarte
            </h2>
          </div>
          <Link 
            href="/directory" 
            className="text-xs font-semibold text-purple-400 hover:text-purple-300 hover:underline"
          >
            Ver directorio completo →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {MOCK_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/directory/game/${cat.slug}`}
              className="group flex flex-col space-y-2"
            >
              <div className="relative aspect-[3/4] rounded-md overflow-hidden bg-zinc-800 border border-zinc-800 group-hover:border-purple-500 group-hover:shadow-lg group-hover:shadow-purple-950/50 transition-all">
                <Image
                  src={cat.boxArt}
                  alt={cat.name}
                  fill
                  sizes="200px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div>
                <p className="text-xs font-bold text-zinc-200 group-hover:text-purple-400 truncate transition-colors">
                  {cat.name}
                </p>
                <p className="text-[11px] text-zinc-500">
                  {(cat.viewers / 1000).toFixed(1)}k espectadores
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
