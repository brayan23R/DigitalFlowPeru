# Arquitectura Astro

La entrega usa Astro 7 con salida estática. Astro genera HTML rápido y conserva las interacciones en JavaScript del navegador, por lo que el sitio sigue siendo fácil de publicar en cualquier hosting estático.

## Flujo local

```bash
npm install
npm run dev
npm run build
npm run preview
```

La página vive en `src/pages/index.astro`. Los archivos públicos están en `public/` y el build queda en `dist/`.

No se añadió React porque esta página no necesita un runtime React completo: el robot, carruseles, idioma, modales y reseñas funcionan como interacciones ligeras del navegador. Si más adelante se necesita un panel complejo, Astro permite añadir componentes React aislados con `@astrojs/react` sin convertir toda la página.

Referencias:

- https://docs.astro.build/en/install-and-setup/
- https://docs.astro.build/en/guides/framework-components/
