# Roadmap de Desarrollo por Etapas & Entregables

> **Documento:** Plan de Trabajo, Hitos y Backlog Priorizado  
> **Proyecto:** Twitch Redesign  
> **Índice Relacionado:** [Volver al PRD (Índice Maestro)](./prd.md)  

---

## Resumen del Calendario por Fases

| Fase | Enfoque Principal | Entregable Clave | Estado |
|---|---|---|---|
| **Fase 1** | **Clon Frontend Baseline de Twitch** | App navegable idéntica a Twitch, con chat simulado y player funcional. | 🟡 **En Definición / Inicio** |
| **Fase 2** | **Capa de Rediseño & UX Innovations** | Chat por capas/velocidad, directorio dinámico y canal off-stream interactivo. | ⚪ Planificado |
| **Fase 3** | **Desacoplamiento & Plataforma Propia** | UI Kit propio, cambio de branding, integración fullstack y pitch comercial. | ⚪ Futuro |

---

## Desglose Detallado de Hitos

### 🚀 FASE 1: Clon Baseline de Twitch (Frontend)

El objetivo de esta fase es contar con un producto idéntico y navegable para medir la experiencia actual de Twitch.

* [ ] **Hito 1.1: Inicialización de Proyecto & Design System Base**
  * [ ] Configuración del proyecto con Next.js (App Router), TypeScript y Tailwind CSS.
  * [ ] Configuración de tokens de color, tipografía y variables de Twitch Dark Theme.
  * [ ] Componentes atómicos: Botones (`Primary`, `Secondary`, `Ghost`), Avatares con indicador de estado (Live), Badges de roles (Mod, VIP, Sub, Verified), Tooltips y Dropdowns.

* [ ] **Hito 1.2: Shell de Navegación & Layout**
  * [ ] **Navbar Superior:** Logo, buscador reactivo, iconos de notificaciones, saldo de puntos de canal y avatar de usuario.
  * [ ] **Sidebar Izquierdo:**
    * Modo colapsado (solo avatares + punto rojo de live + conteo al hacer hover).
    * Modo expandido (nombre del streamer, categoría actual y número de espectadores).
    * Lista de "Canales que sigues" y "Canales recomendados".

* [ ] **Hito 1.3: Pantalla Principal (Home)**
  * [ ] Carrusel de transmisiones destacadas (Hero carousel) con vista previa de video y switch automático/manual.
  * [ ] Filas de recomendaciones organizadas por categorías ("Canales en vivo que te pueden gustar", "Categorías populares").

* [ ] **Hito 1.4: Página de Canal / Live Stream (`/[channel]`)**
  * [ ] **Player de Video:** Contenedor responsivo 16:9 con controles de reproducción (play/pause, volumen, calidad mock, fullscreen y modo teatro).
  * [ ] **Información del Stream:** Título del directo, categoría clickable, etiquetas (tags), avatar del streamer, botón de Seguir/Suscribirse y contador de espectadores en vivo.
  * [ ] **Módulo de Chat en Tiempo Real:**
    * Simulación de flujo de mensajes con generador aleatorio de eventos (mensajes normales, mensajes de mods con insignias, alertas de sub).
    * Formulario de envío de mensajes en la parte inferior con selector de emotes mock.
    * Auto-scroll suave con pausa al interactuar.

* [ ] **Hito 1.5: Directorio y Exploración (`/directory`)**
  * [ ] Grilla de categorías de juegos/conversación con carátulas oficiales, etiquetas y número de espectadores totales.
  * [ ] Filtros básicos por etiquetas e idiomas.

---

### 🎨 FASE 2: Innovación UX & Rediseño

Sobre la base del clon anterior, se introducen las propuestas de diseño:

* [ ] **Hito 2.1: El "Chat por Capas" (Layered Chat)**
  * [ ] Interruptor de modo de chat: *Modo Clásico* vs. *Modo por Capas*.
  * [ ] Canal dedicado de VIPs / Suscriptores con persistencia de lectura garantizada.
  * [ ] Ticker / Carrito horizontal de mensajes de alta prioridad.
  * [ ] Algoritmo de "Smart Slowdown" para agrupar emotes masivos repetidos (`Pog x150`).

* [ ] **Hito 2.2: Rediseño del Directorio & Discovery**
  * [ ] Tarjetas con reproducción previa de 5 segundos al hacer hover (Hover Video Previews).
  * [ ] Filtros multidimensionales (Mood/Vibe, tamaño de audiencia, ritmo de juego).

* [ ] **Hito 2.3: Experiencia Off-Stream Interactiva**
  * [ ] Transformación de la pantalla de canal desconectado a un "Centro Comunitario".
  * [ ] Carrusel de mejores clips y VODs por capítulos temáticos.
  * [ ] Pestaña de debate comunitario asíncrono y calendario con cuenta regresiva.

---

### 💼 FASE 3: Desacoplamiento & Pitch de Plataforma Propia

* [ ] **Hito 3.1: Switcher de Marca (Rebranding Engine)**
  * [ ] Adaptador de temas globales (posibilidad de alternar entre tema "Twitch", tema "Kick" y tema "Plataforma Propia").
  * [ ] Sustitución de iconografía y componentes propietarios por el Design System independiente.

* [ ] **Hito 3.2: Integración de Backend & Realtime**
  * [ ] Reemplazo del simulador de chat mock por servidor WebSockets real (Node / Supabase Realtime).
  * [ ] Integración de streams HLS reales (usando streams de prueba públicos de Big Buck Bunny / Mux / Cloudflare Stream).

* [ ] **Hito 3.3: Preparación del Case Study & Pitch Deck**
  * [ ] Documentación interactiva de antes vs. después con métricas de usabilidad.
  * [ ] Grabación de demostraciones en video para portafolio o presentación a inversores.
