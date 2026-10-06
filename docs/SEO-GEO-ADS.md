# SEO, GEO y Ads

## SEO técnico incluido

- `title`, descripción, canonical, robots y etiquetas Open Graph/Twitter.
- `robots.txt`, `sitemap.xml` y `llms.txt` en la raíz publicada.
- HTML semántico, idioma `es`, textos rastreables y navegación por anclas.
- Schema.org `Organization` con servicios, correo y área atendida en Perú.
- El cambio de idioma actualiza `lang`, título, textos y atributos accesibles.
- Assets críticos locales y optimizados; los logos de tecnología se sirven como SVG y el robot como WebP.

## GEO / descubrimiento local y generativo

La web declara de forma verificable qué hace Digital Flow Perú, qué servicios ofrece y dónde atiende. Incluye `geo.region=PE`, `geo.placename=Perú`, `areaServed` para Perú, Sudamérica y clientes internacionales, además de `llms.txt`. Estos recursos mejoran la claridad de la entidad y su contexto geográfico; ningún archivo garantiza una posición concreta en buscadores.

## Google Ads

No se añadió un `gtag` falso. Google Ads necesita el ID real de la cuenta, el ID de conversión y la acción de conversión del propietario. La web deja eventos `generate_lead` listos para Google Tag Manager cuando exista `window.dataLayer`.

Para activarlo:

1. Crea o selecciona una acción de conversión de contacto en Google Ads.
2. Copia el Google tag y el fragmento de evento que entregue Ads.
3. Instálalo mediante Google Tag Manager o agrégalo en la página.
4. Configura el disparador para elementos con `data-conversion="lead"`.
5. Prueba en Tag Assistant y verifica una conversión real.
6. Actualiza política de privacidad y consentimiento antes de activar cookies publicitarias.
