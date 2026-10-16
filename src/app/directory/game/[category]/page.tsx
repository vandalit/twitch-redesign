import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Heart, Users, ArrowLeft, Radio } from 'lucide-react';
import { getCategoryBySlug, MOCK_CATEGORIES, MOCK_STREAMERS } from '@/data/mock-data';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';

export function generateStaticParams() {
  return MOCK_CATEGORIES.map((c) => ({
    category: c.slug,
  }));
}

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const categoryStreamers = MOCK_STREAMERS.filter(
    (s) => s.categorySlug.toLowerCase() === category.slug.toLowerCase()
  );

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-8 select-none">
      {/* Back button */}
      <div>
        <Link 
          href="/directory"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a Explorar</span>
        </Link>
      </div>

      {/* Category Hero Header */}
      <div className="flex flex-col sm:flex-row gap-6 items-start bg-zinc-900/40 p-6 rounded-xl border border-zinc-800">
        <div className="relative w-32 aspect-[3/4] shrink-0 rounded-lg overflow-hidden border border-zinc-700 shadow-xl">
          <Image
            src={category.boxArt}
            alt={category.name}
            fill
            sizes="160px"
            className="object-cover"
          />
        </div>

        <div className="flex-1 space-y-3">
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {category.name}
          </h1>

          <div className="flex items-center gap-3 text-sm text-zinc-400">
            <span className="flex items-center gap-1.5 font-semibold text-zinc-200">
              <Users className="w-4 h-4 text-purple-400" />
              {category.viewers.toLocaleString()} espectadores
            </span>
            <span>•</span>
            <span className="text-zinc-500 font-medium">Directorio de Videojuegos</span>
          </div>

          <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed">
            {category.description}
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            {category.tags.map((tag) => (
              <Badge key={tag} variant="tag">{tag}</Badge>
            ))}
          </div>

          <div className="pt-2">
            <Button variant="primary" size="sm" className="gap-2">
              <Heart className="w-4 h-4" />
              <span>Seguir categoría</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Streams in this Category */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
          <Radio className="w-5 h-5 text-red-500" />
          <span>Canales transmitiendo {category.name}</span>
        </h2>

        {categoryStreamers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {categoryStreamers.map((streamer) => (
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
                  <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                    <Radio className="w-8 h-8 text-zinc-600 group-hover:text-purple-400 transition-colors" />
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
                    <div className="flex flex-wrap gap-1 mt-2">
                      {streamer.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-lg border border-dashed border-zinc-800 text-center text-zinc-500">
            No hay canales transmitiendo esta categoría en este momento.
          </div>
        )}
      </div>
    </div>
  );
}
