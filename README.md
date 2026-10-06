# Digital Flow Perú

Sitio responsive de Digital Flow Perú: software a medida, automatizaciones, inteligencia artificial, cloud computing y soporte para empresas de Perú, Sudamérica y clientes internacionales.

## Ejecutar y publicar

Requisitos: Node.js 22.12 o superior.

```bash
npm install
npm run dev
npm run build
npm run preview
```

El resultado publicable queda en `dist/`. Para abrirlo sin instalar nada, abre `dist/index.html` o sirve esa carpeta con:

```bash
python3 -m http.server 4173 --directory dist
```

La web publicada ya está configurada como sitio estático y mantiene el regreso al Home al recargar la página.

## Estructura

- `src/pages/index.astro`: página principal y contenido.
- `public/styles.css`: estilos responsive, tema berenjena, animaciones y accesibilidad.
- `public/script.js`: navegación, idioma por banderas, robot, carruseles, reseñas y modales.
- `public/assets/technology/`: logos SVG locales de tecnologías.
- `public/assets/robot-rest.webp` y `robot-greeting.webp`: robot optimizado para web.
- `astro.config.mjs`: configuración de Astro para salida estática.
- `scripts/finalize.mjs`: copia SEO, documentación y archivos públicos al build.
- `docs/`: despliegue, SEO/GEO/Ads, base de datos y mantenimiento.
- `tests/`: verificaciones automáticas de rutas, SEO, assets y comportamiento de carga.

## Reseñas

Las reseñas nuevas se guardan en `localStorage` con la clave `digitalFlowReviews`, por lo que permanecen disponibles en el mismo navegador. Para compartirlas entre visitantes se debe conectar el formulario a una API y a la base MySQL descrita en `docs/database.sql`.

El correo de contacto comercial es `digitalflowperu@gmail.com`.

## SEO, GEO y Ads

La salida incluye `robots.txt`, `sitemap.xml`, `llms.txt`, canonical, Open Graph, datos estructurados de Organization, área atendida en Perú, Sudamérica e internacional, y eventos `generate_lead` listos para Google Tag Manager. No se añadió un ID falso de Ads: la conexión requiere el ID real de la cuenta. Consulta `docs/SEO-GEO-ADS.md`.
