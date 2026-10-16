# 🎮 Twitch Redesign & Streaming Platform Engine

> Un estudio de caso de UX y desarrollo frontend que comienza como un **clon funcional de alta fidelidad de Twitch (baseline)**, evoluciona hacia una **propuesta de rediseño innovadora** (chat por capas y descubrimiento dinámico) y sienta las bases arquitectónicas para una **plataforma propia de streaming**.

---

## 📌 Visión del Proyecto

La mayoría de los rediseños en portafolios se limitan a maquetas estáticas en Figma que no enfrentan los desafíos reales de rendimiento y usabilidad. 

Este proyecto sigue una metodología rigurosa de tres etapas:

1. **Fase 1 (Etapa Actual — Clon Frontend):** Construir una réplica funcional y navegable de Twitch con arquitectura profesional. Sirve de *línea base (baseline)* técnica y de usabilidad para medir la experiencia actual.
2. **Fase 2 (Rediseño UX):** Implementar sobre ese mismo andamiaje soluciones reales a los tres grandes dolores del streaming en vivo:
   * **Chat por Capas & Control de Velocidad:** Separación de roles (mods, VIPs, subs, viewers) y buffer inteligente para evitar el caos ilegible en canales masivos.
   * **Descubrimiento Contextual:** Superar los directorios lineales estáticos mediante previsualizaciones vivas y filtros de afinidad/vibra.
   * **Experiencia Off-Stream Activa:** Transformar canales fuera de línea en centros de comunidad dinámicos (clips, debates, programación).
3. **Fase 3 (Plataforma Propia / Producto Escalable):** Desacoplar la identidad visual y los adaptadores de datos para convertir el motor en un producto propio listo para fullstack o vendible a competidores de la industria (p. ej. Kick u otros).

---

## 📚 Documentación del Proyecto (`/docs`)

La documentación técnica y de diseño ha sido completamente modularizada, utilizando el **PRD** como índice maestro:

* 📑 **[PRD & Índice Maestro (docs/prd.md)](./docs/prd.md):** Especificación completa de requerimientos de producto, análisis de usuarios y criterios de aceptación.
* 💡 **[Propuesta de Innovación UX (docs/propuesta-ux.md)](./docs/propuesta-ux.md):** Detalle conceptual del chat por capas, control de velocidad, motor de descubrimiento y ecosistema off-stream.
* ⚙️ **[Estrategia Técnica & Arquitectura (docs/estrategia-desarrollo.md)](./docs/estrategia-desarrollo.md):** Comparativa tecnológica (Twitch vs. Kick vs. Propuesta), arquitectura modular orientada a Design System y optimización para chat de alta concurrencia.
* 🗺️ **[Roadmap por Etapas & Entregables (docs/roadmap.md)](./docs/roadmap.md):** Hitos detallados, checklist de tareas y backlog de desarrollo.

---

## 🛠️ Stack Tecnológico Propuesto

* **Framework:** Next.js (App Router) + TypeScript
* **Estilos & Theming:** Tailwind CSS con tokens de diseño semánticos (facilitando el rebranding en Fase 3)
* **Gestión de Estado:** Zustand (para manejo ultra-rápido de eventos de chat sin renders innecesarios)
* **Primitivas UI:** Radix UI + Lucide React
* **Motor de Chat & Simulación:** Virtualización con `@tanstack/react-virtual` y generador mock de eventos en tiempo real

---

## 🚦 Estado Actual

* [x] Definición conceptual y PRD
* [x] Modularización de la documentación
* [ ] Inicialización del proyecto frontend e instalación de dependencias
* [ ] Construcción del Design System atómico (Twitch Dark Theme)
* [ ] Maquetación del Shell de navegación (Navbar + Sidebar)
* [ ] Página de canal con player y chat en vivo