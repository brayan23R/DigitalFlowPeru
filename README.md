# Digital Flow Perú

Sitio web responsive para una empresa de tecnología, con contenido en español e inglés, reseñas, carruseles, robot animado, efectos de luz y tarjetas de tecnologías.

## Abrir sin instalar nada

1. Descarga y descomprime el proyecto.
2. Abre `index.html` en el navegador.
3. Para una prueba local más estable con iframes, ejecuta:

```bash
python3 -m http.server 4173
```

Luego abre `http://localhost:4173`.

## Estructura

- `index.html`: estructura y contenido.
- `styles.css`: responsive, colores, efectos y animaciones.
- `script.js`: menú, robot, carrusel, reseñas, selector por banderas español/inglés y modales de servicios.
- `assets/`: imágenes del robot y recursos visuales.
- `dist/`: copia lista para publicación estática.
- `docs/database.sql`: esquema MySQL para convertir reseñas y contactos en datos compartidos.
- `docs/ASTRO-REACT.md`: ruta recomendada para migrar a Astro con componentes React.
- `docs/SEO-GEO-ADS.md`: SEO técnico, GEO/local y pasos para conectar Google Ads.
- `docs/DEPLOY-CHECKLIST.md`: publicación, logos y mantenimiento.

## Reseñas

Las nuevas reseñas se guardan en `localStorage` con la clave `digitalFlowReviews`, por lo que permanecen disponibles en el mismo navegador. Para compartirlas entre todos los visitantes se debe conectar el formulario a una API y a la base MySQL descrita en `docs/database.sql`.

## Tecnologías y animaciones

La entrega publicada conserva la apertura directa sin instalación: usa HTML, CSS y JavaScript del navegador. Incluye animaciones de entrada por desplazamiento, halo morado, anillos, destellos, brillo de tarjetas, movimiento suave del robot, carrusel de reseñas y cambio completo de idioma.

## Publicar en un hosting estático

Sube al directorio público estos elementos manteniendo la misma estructura:

```text
index.html
styles.css
script.js
assets/
```

En cPanel o FTP, coloca `index.html` en `public_html/`. En Netlify, Cloudflare Pages o GitHub Pages, usa la carpeta raíz del proyecto como directorio publicado. No cambies los nombres de los archivos ni la carpeta `assets`.

El selector de idioma muestra banderas vectoriales de España y Reino Unido; el idioma accesible se conserva en `aria-label` y `title`.

Los logotipos de tecnologías se cargan como SVG oficiales de Devicon mediante jsDelivr. Si quieres que el proyecto funcione sin conexión, descarga esos SVG en `assets/technology/` y cambia cada atributo `src` de `index.html` a la ruta local correspondiente.

## SEO, GEO y Ads

La raíz incluye `robots.txt`, `sitemap.xml` y `llms.txt`. Los metadatos, canonical, Open Graph, datos estructurados y señales geográficas están en `index.html`. La integración de Ads queda preparada con eventos `generate_lead`; para activarla necesitas el ID real de Google Ads/Tag Manager. Consulta `docs/SEO-GEO-ADS.md`.
