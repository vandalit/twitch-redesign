import React from 'react';
import Image from 'next/image';

interface AvatarProps {
  src?: string;
  alt: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  isLive?: boolean;
  className?: string;
}

export function Avatar({ src, alt, size = 'md', isLive = false, className = '' }: AvatarProps) {
  const sizeMap = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base',
    xl: 'w-20 h-20 text-lg'
  };

  const ringStyles = isLive ? 'ring-2 ring-purple-500 ring-offset-2 ring-offset-zinc-950' : '';

  return (
    <div className={`relative inline-block shrink-0 ${className}`}>
      <div className={`relative rounded-full overflow-hidden bg-zinc-800 flex items-center justify-center font-bold text-zinc-300 ${sizeMap[size]} ${ringStyles}`}>
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="80px"
            className="object-cover"
          />
        ) : (
          <span>{alt.slice(0, 2).toUpperCase()}</span>
        )}
      </div>
      {isLive && size !== 'xs' && (
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-1 py-0.2 bg-red-600 text-[9px] font-bold text-white rounded uppercase tracking-wider leading-none shadow-sm">
          LIVE
        </span>
      )}
    </div>
  );
}
