# Estrategia Técnica & Arquitectura de Desarrollo

> **Documento:** Arquitectura de Software, Selección de Stack y Desacoplamiento  
> **Proyecto:** Twitch Redesign  
> **Índice Relacionado:** [Volver al PRD (Índice Maestro)](./prd.md)  

---

## 1. Benchmarking de Stack: Twitch vs. Kick vs. Nuestra Propuesta

Para construir un clon con valor comercial y escalabilidad futura hacia una plataforma de streaming propia, analizamos la ingeniería de las plataformas actuales:

| Dimensión | Twitch | Kick | Nuestra Propuesta (Fase 1 a 3) |
|---|---|---|---|
| **Frontend Framework** | React (SPA monolítico enriquecido) | Next.js (SSR / React) | **Next.js (App Router) o React + Vite** con TypeScript estricto |
| **Estilos & UI** | Core UI / Scaffold (Design System interno) | Tailwind CSS + Radix UI | **Tailwind CSS + Variables CSS semánticas** (fácil cambio de tema) |
| **Gestión de Estado** | Apollo Client / Redux / Custom Bus | Redux Toolkit / Zustand | **Zustand** (alto rendimiento, sin re-renders masivos en chat) |
| **Video Engine** | WebAssembly + HLS.js customizado | Amazon IVS Player (HLS) | **Video.js / HLS.js modularizado** en componente agnóstico |
| **Chat & Realtime** | Protocolo IRC sobre WebSockets + PubSub | Pusher Channels (WebSockets) | **Simulador Realtime con WebSockets Mock** (MSW / RxJS) |
| **Backend a Futuro** | Go / Ruby / AWS (Arquitectura masiva) | Laravel (PHP) + Node / Go microservicios | Node.js / Go / Supabase para streaming backend |

---

## 2. Recomendación de Stack para el Proyecto

### Opción Recomendada: **Next.js 14+ (App Router) con TypeScript y Tailwind CSS**
* **¿Por qué Next.js?**
  * Manejo óptimo de rutas anidadas complejas (`/[channel]`, `/directory/[category]`, `/settings`).
  * Facilidad para renderizado estático/SSR para páginas de directorio y SEO, y cliente puro (`'use client'`) para el reproductor y chat reactivos.
  * Estándar absoluto de la industria (utilizado directamente por Kick y equipos modernos).
* **Gestor de Estado: Zustand**
  * Es liviano (< 2kb) y permite suscribir componentes puntuales (como un badge de mensaje de mod o el buffer de mensajes) sin provocar renders en toda la jerarquía de la pantalla.
* **Componentes Base & Iconos:**
  * **Lucide React** (para iconografía limpia e idéntica a los estándares modernos).
  * **Radix UI Primitives** (para dropdowns accesibles, tooltips, modales y popovers sin estilos impuestos).

---

## 3. Arquitectura Modular y Desacoplamiento (Future-Proof Design)

Uno de los requerimientos clave del proyecto es que este clon **no sea una maqueta descartable**, sino el andamiaje sobre el cual se construirá una plataforma propia.

```
src/
├── app/                  # Rutas y páginas de la aplicación
├── components/
│   ├── ui/               # Design System base (Button, Avatar, Badge, Dropdown, Modal, Tooltip)
│   ├── layout/           # Navbar, Sidebar, ContentWrapper, MobileNav
│   ├── player/           # Reproductor de video encapsulado (Player, Controls, Overlay)
│   ├── chat/             # Chat Engine (MessageList, ChatInput, RolePill, LayerSelector)
│   ├── stream/           # Metadata del canal, paneles de información, banner
│   └── discovery/        # Tarjetas de stream, grilla de categorías, filtros dinámicos
├── hooks/                # Hooks reutilizables (useChatStream, useLiveStatus, useVideoPlayer)
├── stores/               # Stores de Zustand (chatStore, playerStore, navigationStore)
├── services/             # Abstracciones de datos (streamService, chatService, mockData)
└── types/                # Interfaces de TypeScript compartidas
```

### Principio de Inversión de Dependencias (Mock to Real API)
Todos los componentes consumirán interfaces abstractas:
* `ChatProvider` no sabrá si los mensajes vienen de un WebSocket de Twitch, de Pusher (Kick) o de un simulador local en TypeScript (`mockChatEngine.ts`).
* Para migrar de clon a plataforma propia, solo se sustituye el adaptador del servicio, manteniendo el 100% de los componentes de UI.

---

## 4. Estrategia para el Chat de Alta Concurrencia (High-Frequency Chat)

Uno de los principales cuellos de botella en Twitch es el colapso del DOM cuando entran decenas de mensajes por segundo. Para nuestro clon y rediseño se implementarán:

1. **Lista Virtualizada (Virtual Windowing):**
   * Uso de `@tanstack/react-virtual` para renderizar únicamente los mensajes visibles en el viewport (máximo 40-50 nodos en el DOM simultáneos, sin importar que existan 10,000 en el buffer).
2. **Buffer con Throttling:**
   * Los mensajes entrantes se acumulan en una cola y se vuelcan al estado en bloques de 100-250ms mediante `requestAnimationFrame`, evitando que React dispare renders por cada mensaje individual.
3. **Pausado Inteligente en Scroll:**
   * Si el usuario desplaza el scroll hacia arriba, se desacopla el auto-scroll hacia abajo y se muestra una píldora flotante *"Chat pausado por scroll (X nuevos mensajes)"*.

---

## 5. Diseño y "Theming" (De Twitch Morado a Marca Propia)

Para que el cambio de identidad visual en Fase 3 sea inmediato:
* Todos los colores se definirán en tokens CSS semánticos (`--bg-primary`, `--bg-secondary`, `--accent-primary`, `--text-highlight`, `--badge-mod`, `--badge-sub`).
* En Fase 1, estos tokens tendrán los valores del tema oscuro de Twitch (`#9146FF` para acento, `#0e0e10` para fondo base, `#18181b` para paneles).
* En Fase 3, bastará con cambiar un archivo de tokens de tema o añadir un selector de temas para transformar el clon en la plataforma propia sin tocar el código fuente de los componentes.
