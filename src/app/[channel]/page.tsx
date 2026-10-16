import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  Heart, 
  Star, 
  Share2, 
  MoreHorizontal, 
  Users, 
  Bell, 
  Sparkles 
} from 'lucide-react';
import { getStreamerByUsername, MOCK_STREAMERS } from '@/data/mock-data';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { VideoPlayerMock } from '@/components/player/VideoPlayerMock';
import { ChatColumn } from '@/components/chat/ChatColumn';

export function generateStaticParams() {
  return MOCK_STREAMERS.map((s) => ({
    channel: s.username,
  }));
}

interface ChannelPageProps {
  params: Promise<{ channel: string }>;
}

export default async function ChannelPage({ params }: ChannelPageProps) {
  const { channel: username } = await params;
  const streamer = getStreamerByUsername(username);

  if (!streamer) {
    notFound();
  }

  return (
    <div className="flex h-full w-full overflow-hidden select-none">
      {/* Left: Video Player & Stream Details (Scrollable) */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {/* Video Player */}
        <VideoPlayerMock
          streamerName={streamer.displayName}
          category={streamer.category}
          viewers={streamer.viewers}
          isLive={streamer.isLive}
        />

        {/* Channel Bar / Metadata */}
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4 border-b border-zinc-800/80 pb-6">
          <div className="flex items-start gap-4">
            <Avatar
              src={streamer.avatar}
              alt={streamer.displayName}
              size="lg"
              isLive={streamer.isLive}
            />

            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white tracking-tight">
                  {streamer.displayName}
                </h1>
                <Badge variant="outline" className="text-[10px]">
                  {streamer.followers || '100K'} seguidores
                </Badge>
              </div>

              <p className="text-sm font-semibold text-zinc-100 max-w-2xl leading-snug">
                {streamer.streamTitle}
              </p>

              <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400 pt-0.5">
                <Link
                  href={`/directory/game/${streamer.categorySlug}`}
                  className="font-medium text-purple-400 hover:underline hover:text-purple-300"
                >
                  {streamer.category}
                </Link>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-zinc-500" />
                  {streamer.viewers.toLocaleString()} espectadores
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {streamer.tags.map((tag) => (
                  <Badge key={tag} variant="tag">{tag}</Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            <Button variant="primary" size="sm" className="gap-1.5">
              <Heart className="w-4 h-4 fill-current" />
              <span>Seguir</span>
            </Button>

            <Button variant="secondary" size="sm" className="gap-1.5 bg-purple-950/60 border border-purple-800 text-purple-300 hover:bg-purple-900/60">
              <Star className="w-4 h-4 text-purple-400" />
              <span>Suscribirse</span>
            </Button>

            <Button variant="ghost" size="icon" title="Notificaciones">
              <Bell className="w-4 h-4" />
            </Button>

            <Button variant="ghost" size="icon" title="Compartir">
              <Share2 className="w-4 h-4" />
            </Button>

            <Button variant="ghost" size="icon" title="Más opciones">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* About Section / Baseline Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-3 bg-zinc-900/40 p-5 rounded-xl border border-zinc-800">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-300">
              Información sobre {streamer.displayName}
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {streamer.bio || 'Creador de contenido y streamer habitual. ¡Bienvenido a la comunidad!'}
            </p>
          </div>

          <div className="space-y-3 bg-zinc-900/40 p-5 rounded-xl border border-zinc-800">
            <h3 className="text-sm font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Redesign Case Study</span>
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              En la Fase 2, esta sección albergará el módulo <strong>Off-stream</strong> (carrusel de clips, comunidad asíncrona y calendario de directos).
            </p>
          </div>
        </div>
      </div>

      {/* Right: Collapsible Chat Column */}
      <ChatColumn channelName={streamer.displayName} />
    </div>
  );
}
