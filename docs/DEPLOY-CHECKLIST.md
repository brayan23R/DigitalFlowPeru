# Publicación y mantenimiento

## Abrir sin instalar

Abre `index.html` directamente. Para probar previews y iframes con un servidor local:

```bash
python3 -m http.server 4173
```

## Hosting estático

Publica `index.html`, `styles.css`, `script.js`, `favicon.svg`, `robots.txt`, `sitemap.xml`, `llms.txt` y las carpetas `assets/` y `docs/`. Mantén las rutas relativas.

## Logos de tecnologías

Los logos usan SVG oficiales de Devicon a través de jsDelivr. Si necesitas un paquete totalmente offline, descarga las rutas indicadas en `index.html` dentro de `assets/technology/` y cambia cada `src` a su archivo local.

## Reseñas

Las reseñas nuevas se guardan en `localStorage` del navegador. Para hacerlas compartidas entre visitantes, conecta el formulario a una API y a `docs/database.sql`.
