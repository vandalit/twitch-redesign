'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  Radio
} from 'lucide-react';
import { useLayout } from '@/context/layout-context';
import { MOCK_STREAMERS } from '@/data/mock-data';
import { Avatar } from '@/components/ui/Avatar';

export function Sidebar() {
  const pathname = usePathname();
  const { isSidebarCollapsed, toggleSidebar } = useLayout();

  const followedStreamers = MOCK_STREAMERS.slice(0, 4);
  const recommendedStreamers = MOCK_STREAMERS.slice(4);

  return (
    <aside 
      className={`relative z-40 flex flex-col border-r border-zinc-800 bg-zinc-950 transition-all duration-200 select-none ${
        isSidebarCollapsed ? 'w-14' : 'w-60'
      }`}
    >
      {/* Header with Collapse toggle */}
      <div className="flex h-12 items-center justify-between px-3 border-b border-zinc-800/80">
        {!isSidebarCollapsed && (
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            Para ti
          </span>
        )}
        <button
          onClick={toggleSidebar}
          className={`p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors ${
            isSidebarCollapsed ? 'mx-auto' : ''
          }`}
          title={isSidebarCollapsed ? 'Expandir barra lateral' : 'Contraer barra lateral'}
        >
          {isSidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden py-2 space-y-4">
        {/* Canales que sigues */}
        <div>
          {!isSidebarCollapsed && (
            <div className="flex items-center gap-1.5 px-3 mb-1 text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              <Heart className="h-3 w-3 text-purple-400" />
              <span>Canales que sigues</span>
            </div>
          )}

          <div className="space-y-0.5">
            {followedStreamers.map((streamer) => {
              const isActive = pathname === `/${streamer.username}`;
              return (
                <Link
                  key={streamer.id}
                  href={`/${streamer.username}`}
                  className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-md transition-colors group ${
                    isActive 
                      ? 'bg-purple-950/50 text-purple-300 font-semibold' 
                      : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'
                  }`}
                  title={`${streamer.displayName} - ${streamer.category}`}
                >
                  <Avatar
                    src={streamer.avatar}
                    alt={streamer.displayName}
                    size="sm"
                    isLive={streamer.isLive}
                  />

                  {!isSidebarCollapsed && (
                    <div className="flex flex-1 items-center justify-between min-w-0">
                      <div className="truncate">
                        <p className="text-xs font-medium leading-none truncate text-zinc-200 group-hover:text-white">
                          {streamer.displayName}
                        </p>
                        <p className="text-[11px] text-zinc-500 truncate mt-0.5">
                          {streamer.category}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 pl-1.5 shrink-0">
                        {streamer.isLive ? (
                          <>
                            <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                            <span className="text-xs font-mono text-zinc-400">
                              {(streamer.viewers / 1000).toFixed(1)}k
                            </span>
                          </>
                        ) : (
                          <span className="text-[11px] text-zinc-600">Off</span>
                        )}
                      </div>
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Canales recomendados */}
        <div>
          {!isSidebarCollapsed && (
            <div className="flex items-center gap-1.5 px-3 mb-1 text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              <Radio className="h-3 w-3 text-red-400" />
              <span>Recomendados</span>
            </div>
          )}

          <div className="space-y-0.5">
            {recommendedStreamers.map((streamer) => {
              const isActive = pathname === `/${streamer.username}`;
              return (
                <Link
                  key={streamer.id}
                  href={`/${streamer.username}`}
                  className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-md transition-colors group ${
                    isActive 
                      ? 'bg-purple-950/50 text-purple-300 font-semibold' 
                      : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'
                  }`}
                  title={`${streamer.displayName} - ${streamer.category}`}
                >
                  <Avatar
                    src={streamer.avatar}
                    alt={streamer.displayName}
                    size="sm"
                    isLive={streamer.isLive}
                  />

                  {!isSidebarCollapsed && (
                    <div className="flex flex-1 items-center justify-between min-w-0">
                      <div className="truncate">
                        <p className="text-xs font-medium leading-none truncate text-zinc-200 group-hover:text-white">
                          {streamer.displayName}
                        </p>
                        <p className="text-[11px] text-zinc-500 truncate mt-0.5">
                          {streamer.category}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 pl-1.5 shrink-0">
                        {streamer.isLive ? (
                          <>
                            <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                            <span className="text-xs font-mono text-zinc-400">
                              {(streamer.viewers / 1000).toFixed(1)}k
                            </span>
                          </>
                        ) : (
                          <span className="text-[11px] text-zinc-600">Off</span>
                        )}
                      </div>
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}
