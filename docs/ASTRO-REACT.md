# Ruta Astro + React

La versión publicada está preparada para abrirse directamente desde `index.html`, porque ese era el requisito de uso sin instalación. Para convertirla en un proyecto Astro con componentes React:

```bash
npm create astro@latest digital-flow-astro
cd digital-flow-astro
npx astro add react
npm install
npm run dev
```

Después:

1. Mueve las secciones de `index.html` a componentes `.astro`.
2. Convierte el carrusel de reseñas y el selector de idioma en componentes React con estado.
3. Conserva `styles.css` y `assets/` dentro de `src/` o `public/`.
4. Usa las animaciones nativas de Astro View Transitions para navegar entre páginas.
5. Conecta el formulario a una API que use `docs/database.sql`.

Referencias oficiales:

- Astro: https://docs.astro.build/en/install-and-setup/
- Astro View Transitions: https://docs.astro.build/en/guides/view-transitions/
- Integración de frameworks en Astro: https://docs.astro.build/en/guides/framework-components/
- React: https://react.dev/learn/installation
