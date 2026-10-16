'use client';

import React, { Suspense } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-[#0e0e10] text-zinc-100 antialiased font-sans">
      <Suspense fallback={<div className="h-14 w-full bg-zinc-950 border-b border-zinc-800" />}>
        <Navbar />
      </Suspense>
      <div className="flex flex-1 overflow-hidden">
        <Suspense fallback={<div className="w-60 bg-zinc-950 border-r border-zinc-800" />}>
          <Sidebar />
        </Suspense>
        <main className="flex-1 overflow-y-auto bg-[#0e0e10] relative">
          <Suspense fallback={<div className="p-8 text-zinc-500">Cargando contenido...</div>}>
            {children}
          </Suspense>
        </main>
      </div>
    </div>
  );
}
