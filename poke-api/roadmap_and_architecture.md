# 🗺️ Roadmap Profesional: Arquitectura y Testing

¡Felicidades por llegar hasta aquí! Convertimos una idea básica en un E-commerce E2E interactivo y potente. Ahora que la aplicación es funcional, el siguiente nivel para convertirte en un **Desarrollador Frontend Senior** es dominar la arquitectura del código y el testing automatizado.

Aquí tienes la ruta de aprendizaje ordenada, tal como la solicitaste, **sin ejecutar el código aún**, solo para que la asimiles y la planifiquemos.

---

## 🏗️ Fase 1: Arquitectura Limpia y Escalable

Actualmente estamos usando una **arquitectura basada en componentes y características simples**. Todo está agrupado en `/components` y el estado en `/context`. Funciona excelente para proyectos pequeños, pero para ser más profesionales migraremos hacia una **Feature-Sliced Design (FSD)** o una **Clean Architecture**.

### Tareas de Reestructuración (Refactoring)
1.  **Separación de Responsabilidades (Separation of Concerns):**
    *   Extraeremos toda la lógica de la PokeAPI (los `fetch` que hicimos) a una carpeta `src/services/pokeApi.ts`.
    *   Crearemos "Custom Hooks" (ej. `usePokemon.ts`) para separar la lógica de UI de la lógica de negocio.
2.  **Manejo de Estado Avanzado:**
    *   Reemplazaremos los Contextos básicos por herramientas de estado de nivel servidor como **React Query (TanStack Query)**. Esto manejará el caché de los Pokémon, estados de carga y reintentos automáticamente.
3.  **Modularización FSD (Feature-Sliced Design):**
    *   Reorganizaremos carpetas por "Dominios". Ej: `src/features/cart`, `src/features/pokemon`, `src/features/auth`.

---

## 🧪 Fase 2: Testing Unitario (Jest + React Testing Library)

El testing unitario sirve para probar **piezas individuales de código** (funciones o componentes) aisladas del resto de la aplicación, asegurando que un botón haga lo que debe sin importar si la API se cae.

### Tareas de Configuración e Implementación
1.  **Instalación del Entorno:**
    *   Configurar `Vitest` (es el equivalente moderno y rápido a Jest, ideal para Vite) y `React Testing Library`.
2.  **Pruebas de Utilidades (Lógica pura):**
    *   Escribir tests para probar que nuestro carrito suma correctamente los Pokédólares.
3.  **Pruebas de Componentes (UI pura):**
    *   Crear pruebas para asegurar que el `Navbar` muestre el avatar si el usuario está logueado, o muestre el botón de registro si no lo está.
    *   Aprender a "Mockear" (simular) llamadas a la PokeAPI para no gastar ancho de banda en los tests.

---

## 🤖 Fase 3: Testing End-to-End (Cypress / Playwright)

A diferencia de Jest, el testing E2E (End-to-End) **simula a un usuario humano real** utilizando un navegador automatizado (robot). Hará clic en botones, llenará formularios y comprobará que la página cambie correctamente.

### Tareas de Automatización de Usuario
1.  **Instalación:**
    *   Configurar **Cypress** o **Playwright**.
2.  **Creación de Flujos de Prueba (Test Suites):**
    *   **Flujo de Compra Completo:** Escribir un script que abra la página, añada a Pikachu al carrito, abra el Drawer, haga clic en "Ir a Pagar", llene el formulario de adopción y verifique que aparezca el mensaje de éxito.
    *   **Flujo de Autenticación:** Un robot que introduzca un correo y una contraseña en el modal del Navbar y verifique que la URL cambie al perfil del entrenador.
3.  **Integración Continua (CI/CD):**
    *   Aprenderemos a configurar *GitHub Actions* para que Cypress y Jest se ejecuten automáticamente **cada vez que hagas un push** al repositorio, bloqueando el código si algo se rompe.

---

## 📌 ¿Cómo procedemos?

Esta hoja de ruta está diseñada para ir paso a paso. Cuando estés listo para comenzar a programar, me lo dices y abriremos la **Fase 1**. Te explicaré el concepto de los *Custom Hooks* y lo refactorizaremos juntos. Luego saltaremos a Jest y finalmente a Cypress. 

¿Qué opinas del roadmap?
