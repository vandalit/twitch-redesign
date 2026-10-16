import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'live' | 'role' | 'tag' | 'category' | 'outline' | 'default';
  roleType?: 'broadcaster' | 'mod' | 'vip' | 'sub' | 'viewer';
  className?: string;
}

export function Badge({ children, variant = 'default', roleType, className = '' }: BadgeProps) {
  if (variant === 'live') {
    return (
      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-bold uppercase tracking-wider rounded bg-red-600 text-white select-none ${className}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        {children || 'EN VIVO'}
      </span>
    );
  }

  if (variant === 'role' && roleType) {
    const roleColors: Record<string, string> = {
      broadcaster: 'bg-red-500/20 text-red-400 border border-red-500/30',
      mod: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
      vip: 'bg-pink-500/20 text-pink-400 border border-pink-500/30',
      sub: 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
      viewer: 'bg-zinc-800 text-zinc-400 border border-zinc-700'
    };
    return (
      <span className={`inline-flex items-center px-1.5 py-0.5 text-[11px] font-semibold rounded uppercase tracking-wide ${roleColors[roleType] || ''} ${className}`}>
        {children}
      </span>
    );
  }

  if (variant === 'tag') {
    return (
      <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-colors cursor-pointer ${className}`}>
        {children}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded bg-zinc-800 text-zinc-200 border border-zinc-700/60 ${className}`}>
      {children}
    </span>
  );
}
