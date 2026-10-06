# SEO, GEO y Ads

## SEO técnico incluido

- `title`, descripción, canonical, robots y etiquetas Open Graph/Twitter.
- `robots.txt` y `sitemap.xml` en la raíz publicada.
- HTML semántico, idioma `es`, textos rastreables y navegación por anclas.
- Schema.org `Organization` con servicios, correo y área atendida en Lima y Perú.
- El cambio de idioma actualiza `lang`, título, textos y atributos accesibles.

## GEO / descubrimiento local y generativo

La página declara de forma verificable qué hace Digital Flow Perú, qué servicios ofrece y dónde atiende. Incluye `geo.region=PE`, `geo.placename=Perú`, `areaServed` para Perú, Sudamérica y clientes internacionales, y `llms.txt` como archivo auxiliar para agentes que lo soporten. Estos recursos mejoran la claridad de la entidad y su contexto geográfico; ningún archivo garantiza una posición concreta en buscadores.

## Google Ads

No se añadió un `gtag` falso. Google Ads necesita el ID real de la cuenta, el ID de conversión y la acción de conversión del propietario. La web deja eventos `generate_lead` listos para Google Tag Manager cuando exista `window.dataLayer`.

Para activarlo:

1. Crear o seleccionar una acción de conversión de contacto en Google Ads.
2. Copiar el Google tag y el fragmento de evento que entregue Ads.
3. Instalarlo mediante Google Tag Manager o agregarlo en `index.html`.
4. Configurar el disparador para clics en elementos con `data-conversion="lead"`.
5. Publicar, probar en Tag Assistant y verificar una conversión real.
6. Actualizar la política de privacidad y consentimiento antes de activar cookies publicitarias.
