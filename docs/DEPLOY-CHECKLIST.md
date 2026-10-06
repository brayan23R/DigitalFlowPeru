# Publicación y mantenimiento

## Antes de publicar

```bash
npm install
npm run test
npm run build
```

Publica `dist/` completo y verifica:

- `dist/index.html` carga en escritorio, tablet y móvil.
- `dist/assets/technology/` contiene los logos SVG locales.
- `dist/assets/robot-rest.webp` y `dist/assets/robot-greeting.webp` cargan correctamente.
- El selector usa banderas y cambia todo el contenido entre español e inglés.
- El refresh vuelve al Home.
- `robots.txt`, `sitemap.xml`, `llms.txt` y el favicon responden desde la raíz.
- La burbuja de soporte abre las opciones de WhatsApp y correo, y los enlaces de proyectos abren sus destinos.

## Mantenimiento

Las reseñas nuevas se guardan en `localStorage`. Para hacerlas compartidas entre visitantes, conecta el formulario a una API y a `docs/database.sql`. Reemplaza los correos de ejemplo únicamente por testimonios autorizados.
