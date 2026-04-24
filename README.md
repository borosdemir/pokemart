# ⚡ Aura PokeMart

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Chakra UI](https://img.shields.io/badge/chakra-%234ED1C5.svg?style=for-the-badge&logo=chakraui&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer-Black?style=for-the-badge&logo=framer&logoColor=blue)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

<div align="center">
  <img src="./public/demo.webp?v=2" alt="Aura PokeMart Demo" width="800" />
</div>

Aura PokeMart es una plataforma interactiva, animada y 100% funcional orientada a la adopción y comercio de Pokémon. Construida utilizando tecnologías de vanguardia para lograr una experiencia de usuario (UX) inmersiva y transiciones nativas ultra-rápidas.

## ✨ Características Principales

- **Catálogo de la 1ra Generación (151 Pokémon):** Consumo asíncrono avanzado desde la [PokeAPI](https://pokeapi.co/) extrayendo los tipos originales y el "Official Artwork" en alta resolución.
- **Santuario Legendario:** Un enrutamiento paralelo privado donde yacen los Pokémon más raros con diseños de tarjeta holográficos.
- **Animaciones Físicas y Micro-interacciones:** Implementación experta de **Framer Motion** para otorgarle vida a cada botón y tarjeta con físicas de "resorte" (Spring).
- **View Transitions API:** Navegación entre vistas (Checkout, Perfil, Tienda) que se fusionan de forma fluida utilizando la API nativa CSS del navegador, eliminando los parpadeos bruscos de las SPA tradicionales.
- **Flujos E2E Completos:** 
  - Gestión de Carrito de Compras asíncrono (Context API).
  - Proceso completo de *Checkout*.
  - *Dashboard* de Perfil de Entrenador.
  - Sistema de contacto (Soporte).

## 🛠️ Arquitectura y Tecnologías

El proyecto fue migrado de un marketplace estático básico a un E-commerce React moderno utilizando una **Arquitectura Limpia (Separation of Concerns)**:
- **Core:** `React 18` + `Vite` (Rendimiento y velocidad de recarga).
- **Tipado Estricto:** `TypeScript` para asegurar el flujo de la data de la PokeAPI.
- **UI/UX:** Componentes de `Chakra UI v2`.
- **Físicas:** `framer-motion` envolviendo elementos nativos y de Chakra (`Box as={motion.div}`).
- **Routing:** Enrutamiento modular por estado impulsado por `document.startViewTransition()`.
- **Capa de Servicios:** Lógica de red aislada en `src/services/pokeApi.ts` para mantener la UI pura.
- **Custom Hooks:** Gestión de estados asíncronos mediante `usePokemon.ts`.
- **Estado Global:** `AuthContext` y `CartContext` gestionan sesiones persistentes (localStorage) y lógica de compras en tiempo real.
- **Caché Inteligente:** Almacenamiento en `localStorage` que garantiza cargas instantáneas (0ms) en visitas recurrentes, protegiendo los límites de uso de la PokeAPI.
- **Testing Unitario:** Pruebas matemáticas blindadas utilizando `Vitest` y `React Testing Library` para garantizar la estabilidad comercial de la pasarela.

## 🚀 Instalación y Uso

1. Clona el repositorio:
   ```bash
   git clone https://github.com/borosdemir/pokemart.git
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

---
*Construido para atraparlos a todos, al mejor precio.*
